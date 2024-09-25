import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import Decimal from "decimal.js";
import React, { useEffect, useRef, useState } from "react";
import { BiPlay, BiStop } from "react-icons/bi";
import { MessageFromWorker, MessageToWorker } from "./simulator.type";
import { MAX_PRECISION, MULTIPLIER } from "./simulator.const";
import { getItemId } from "./simulator.service";

const DEFAULT_SIMUL_COUNT = 1000;
const CATEGORICAL_COLOR = [
  "#3366cc",
  "#dc3912",
  "#ff9900",
  "#109618",
  "#990099",
  "#0099c6",
  "#dd4477",
  "#66aa00",
  "#b82e2e",
  "#316395",
  "#994499",
  "#22aa99",
  "#aaaa11",
  "#6633cc",
  "#e67300",
  "#8b0707",
  "#651067",
  "#329262",
  "#5574a6",
  "#3b3eac",
];
function getColor(idx: number) {
  return CATEGORICAL_COLOR[idx % CATEGORICAL_COLOR.length]!;
}

type ItemIndicatorProps = {
  groupIdx: number;
  checked?: boolean;
};
const ItemIndicator = React.forwardRef<HTMLDivElement, ItemIndicatorProps>(
  ({ groupIdx, checked = false, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        {...rest}
        sx={{
          width: "12px",
          height: "12px",
          borderRadius: "2px",
          background: getColor(groupIdx),
          opacity: checked ? 1 : 0.5,
        }}
      />
    );
  }
);

type ItemGroupInfo = {
  /** This value is multiplied by multiplier, so that the value becomes a integer. */
  normalizedProb: number;
  quantity: number;
};
function parseItemGroupList(str: string): [ItemGroupInfo[], string | null] {
  const result: ItemGroupInfo[] = [];
  const lines = str.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const [percentStr, quantityStr] = lines[i]!.split(/\s+/);
    if (!percentStr) {
      continue;
    }
    const percent = (() => {
      try {
        return new Decimal(percentStr);
      } catch {
        return null;
      }
    })();
    if (!percent || percent.isNaN()) {
      return [[], `${i + 1}번째 줄: 추출 확률은 숫자여야 합니다.`];
    }
    if (percent.lte(0)) {
      return [[], `${i + 1}번째 줄: 추출 확률은 양수여야 합니다.`];
    }
    // Avoid floating-point problem
    const normalizedProb = percent.mul(MULTIPLIER).floor().toNumber();
    const quantity = quantityStr ? Math.floor(Number(quantityStr)) : 1;
    if (Number.isNaN(quantity)) {
      return [[], `${i + 1}번째 줄: 수량은 숫자여야 합니다.`];
    }
    if (quantity < 1) {
      return [[], `${i + 1}번째 줄: 수량은 1보다 큰 숫자여야 합니다.`];
    }
    result.push({ normalizedProb, quantity });
  }
  if (
    result.reduce(
      (acc, { normalizedProb, quantity }) => acc + normalizedProb * quantity,
      0
    ) >
    100 * MULTIPLIER
  ) {
    return [[], `추출 확률의 합은 100%를 넘을 수 없습니다.`];
  }
  return [result, null];
}

type TrialInfo = {
  totalPickCount: number;
  itemFirstSeenPickCount: {
    [itemId: string]: number | undefined;
  };
};

function CCPSimulation() {
  const helperTextColor = useColorModeValue("gray.600", "gray.400");
  const workerRef = useRef<Worker>();
  const [workerStatus, setWorkerStatus] = useState<
    "idle" | "running" | "aborting"
  >("idle");

  // Simulation configuration
  const [simulCountStr, setSimulCountStr] = useState(
    String(DEFAULT_SIMUL_COUNT)
  );
  const [simulCountNum, setSimulCountNum] = useState(DEFAULT_SIMUL_COUNT);
  const [itemGroupListStr, setItemGroupListStr] = useState(
    "11.11111 8\n11.11112"
  );
  const [itemGroupList, itemGroupListError] =
    parseItemGroupList(itemGroupListStr);

  // Simulation result
  const [simulationTargetItemList, setSimulationTargetItemList] = useState<
    { groupIndex: number; entityIndex: number }[]
  >([]);
  const [simulationStatus, setSimulationStatus] = useState<{
    currentTrial: TrialInfo | null;
    finishedLog: TrialInfo[];
  }>({
    currentTrial: null,
    finishedLog: [],
  });

  const totalProb = itemGroupList.reduce(
    (acc, curr) => acc + curr.normalizedProb * curr.quantity,
    0
  );

  useEffect(() => {
    workerRef.current = new Worker(new URL("./simulator.ts", import.meta.url));
    workerRef.current.onmessage = ({
      data,
    }: MessageEvent<MessageFromWorker>) => {
      if (data.type === "update-current-trial") {
        setSimulationStatus((prev) => {
          return {
            currentTrial: {
              totalPickCount: data.detail.pickCount,
              itemFirstSeenPickCount: {
                ...prev.currentTrial?.itemFirstSeenPickCount,
                [getItemId(
                  data.detail.itemGroupIndex,
                  data.detail.itemEntityIndex
                )]: data.detail.pickCount,
              },
            },
            finishedLog: prev.finishedLog,
          };
        });
      }
      if (data.type === "end-current-trial") {
        setSimulationStatus((prev) => {
          if (prev.currentTrial === null)
            throw new Error(
              "end-current-trial signal must happen after update-current-trial"
            );
          return {
            currentTrial: null,
            finishedLog: [...prev.finishedLog, prev.currentTrial],
          };
        });
      }
      if (data.type === "done") {
        setWorkerStatus("idle");
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const sortedSimulationData = simulationStatus.finishedLog
    .map(({ totalPickCount }) => totalPickCount)
    .toSorted();

  return (
    <Stack spacing={6} paddingBottom={8}>
      <Heading size="lg">컴플리트 가챠 시뮬레이션</Heading>
      <Stack>
        <Text>
          다양한 조건에서의 컴플리트 가챠를 시뮬레이션 하는 페이지입니다.
        </Text>
        <Text>모든 아이템은 복원 추출됨을 가정합니다.</Text>
      </Stack>
      <Stack spacing={0.5}>
        <Heading size="md">아이템 목록</Heading>
        <Text>
          한 줄에 하나씩 추출 대상 아이템의 확률을 % 값으로 입력해주세요.
        </Text>
        <Text>
          동일 확률 아이템이 여러개 있을 경우, 같은 줄 내에서 한 칸 띄고 수량을
          입력하면 됩니다.
        </Text>
        <Text>
          예를 들어, 0.5% 확률로 나타나는 아이템이 20개 있을 경우, "0.5 20" 으로
          입력하면 됩니다.
        </Text>
        <Text color={helperTextColor}>
          아이템 추출 확률은 소수점 이하 {MAX_PRECISION}자리까지 지원합니다.
        </Text>
      </Stack>
      <Wrap shouldWrapChildren>
        <Textarea
          value={itemGroupListStr}
          onChange={(ev) => setItemGroupListStr(ev.target.value)}
          isDisabled={workerStatus !== "idle"}
        />
        {itemGroupListError ? (
          <Text color="red">{itemGroupListError}</Text>
        ) : (
          <Table size="sm">
            <Thead>
              <Tr>
                <Th colSpan={2}>ID</Th>
                <Th isNumeric>추출 확률</Th>
                <Th isNumeric>수량</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemGroupList.map((itemGroup, groupIdx) => {
                return (
                  <Tr key={groupIdx}>
                    <Td sx={{ paddingRight: "4px" }}>
                      <ItemIndicator groupIdx={groupIdx} />
                    </Td>
                    <Td sx={{ paddingLeft: "4px" }}>등급 {groupIdx + 1}</Td>
                    <Td isNumeric>
                      {(itemGroup.normalizedProb / MULTIPLIER).toFixed(5)}%
                    </Td>
                    <Td isNumeric>{itemGroup.quantity}</Td>
                  </Tr>
                );
              })}
              {100 * MULTIPLIER - totalProb > 0 && (
                <Tr>
                  <Td colSpan={2}>컴플리트 대상 외</Td>
                  <Td isNumeric colSpan={2}>
                    {((100 * MULTIPLIER - totalProb) / MULTIPLIER).toFixed(5)}%
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </Wrap>
      <FormControl id="simul-count">
        <FormLabel>시뮬레이션 횟수</FormLabel>
        <HStack>
          <NumberInput
            min={1}
            max={10000000}
            precision={0}
            step={1}
            value={simulCountStr}
            onChange={(s, n) => {
              setSimulCountStr(s);
              setSimulCountNum(n);
            }}
            isDisabled={workerStatus !== "idle"}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>회</Text>
        </HStack>
      </FormControl>
      <HStack>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<BiPlay />}
          isDisabled={
            itemGroupListError !== null ||
            itemGroupList.length === 0 ||
            workerStatus !== "idle"
          }
          onClick={() => {
            setWorkerStatus("running");
            setSimulationTargetItemList(
              itemGroupList.flatMap((item, groupIndex) =>
                Array.from({ length: item.quantity }, (_, entityIndex) => ({
                  groupIndex,
                  entityIndex,
                }))
              )
            );
            setSimulationStatus({
              currentTrial: null,
              finishedLog: [],
            });
            const message: MessageToWorker = {
              type: "start-simulation",
              simulationCount: simulCountNum,
              itemGroupList,
            };
            workerRef.current?.postMessage(message);
          }}
        >
          시뮬레이션 시작
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          leftIcon={<BiStop />}
          isDisabled={workerStatus !== "running"}
          onClick={() => {
            setWorkerStatus("aborting");
            const message: MessageToWorker = {
              type: "abort-simulation",
            };
            workerRef.current?.postMessage(message);
          }}
        >
          시뮬레이션 중지
        </Button>
      </HStack>
      <Divider />
      {workerStatus !== "idle" && (
        <>
          <HStack>
            <Spinner size="sm" />
            <Text>시뮬레이션 진행 중....</Text>
          </HStack>
          <Stack>
            <Stack spacing={0.5}>
              <Heading size="sm">시뮬레이션 진행 상황</Heading>
              <Text color={helperTextColor} fontSize="small">
                박스에 마우스를 올려 상세를 볼 수 있습니다.
              </Text>
            </Stack>
            <Text>시뮬레이션 #{simulationStatus.finishedLog.length + 1}</Text>
            <Wrap shouldWrapChildren>
              {simulationTargetItemList.map((item) => {
                const itemId = getItemId(item.groupIndex, item.entityIndex);
                const firstSeen =
                  simulationStatus.currentTrial?.itemFirstSeenPickCount[itemId];
                return (
                  <Tooltip
                    key={itemId}
                    label={`등급 ${item.groupIndex + 1}의 아이템 ${
                      item.entityIndex + 1
                    }: ${
                      firstSeen ? `${firstSeen}번째 뽑기에서 획득` : "미획득"
                    }`}
                  >
                    <ItemIndicator
                      groupIdx={item.groupIndex}
                      checked={!!firstSeen}
                    />
                  </Tooltip>
                );
              })}
            </Wrap>
          </Stack>
        </>
      )}
      {simulationStatus.finishedLog.length > 0 && (
        <Stack>
          <Stack spacing={0.5}>
            <Heading size="md">시뮬레이션 간단 요약</Heading>
            <Text>뽑기 횟수 최소값: {sortedSimulationData.at(0)}회</Text>
            <Text>뽑기 횟수 최대값: {sortedSimulationData.at(-1)}회</Text>
            <Text>
              뽑기 횟수 중앙값:{" "}
              {sortedSimulationData.length % 2 === 0
                ? (sortedSimulationData.at(
                    sortedSimulationData.length / 2 - 1
                  )! +
                    sortedSimulationData.at(sortedSimulationData.length / 2)!) /
                  2
                : sortedSimulationData.at(
                    (sortedSimulationData.length - 1) / 2
                  )}
              회
            </Text>
            <Text>
              뽑기 횟수 평균값:{" "}
              {(
                sortedSimulationData.reduce((acc, curr) => acc + curr, 0) /
                sortedSimulationData.length
              ).toFixed(2)}
              회
            </Text>
          </Stack>
          <Stack spacing={0.5}>
            <Heading size="md">시뮬레이션 전체 기록</Heading>
            <Text>{sortedSimulationData.join(", ")}</Text>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default CCPSimulation;
