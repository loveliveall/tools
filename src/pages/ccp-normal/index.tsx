import React from 'react';
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';

type Cache = {
  [key: string]: number,
};
const STIRLING_CACHE: Cache = {};
function S(n: number, k: number): number {
  if (n === 0 && k === 0) return 1;
  if (n === 0 || k === 0) return 0;
  const cacheKey = `${n}-${k}`;
  const cache = STIRLING_CACHE[cacheKey];
  if (cache !== undefined) return cache;
  const val = k * S(n - 1, k) + S(n - 1, k - 1);
  STIRLING_CACHE[cacheKey] = val;
  return val;
}

function getExpectation(itemCount: number) {
  const harmonic = new Array(itemCount).fill(null).map((_, idx) => 1 / (idx + 1)).reduce((acc, curr) => acc + curr, 0);
  return itemCount * harmonic;
}

function getProbTable(itemCount: number) {
  type ProbRow = {
    trial: number,
    accProbPercent: number,
  };
  let trial = itemCount;
  // Initial case
  let accProbPercent = new Array(trial).fill(null).map(
    (_, idx) => (idx + 1) / itemCount,
  ).reduce((acc, curr) => acc * curr, 1) * 100;
  const ret: ProbRow[] = [{
    trial,
    accProbPercent,
  }];
  let recordThreshold = 5.00;
  while (accProbPercent < 99.00) {
    accProbPercent *= (1 + S(trial, itemCount - 1) / S(trial, itemCount) / itemCount);
    trial += 1;
    if (accProbPercent > recordThreshold) {
      ret.push({
        trial,
        accProbPercent,
      });
      if (recordThreshold < 90) recordThreshold += 5;
      else recordThreshold += 1;
    }
  }
  return ret;
}

function CCPNormal() {
  const [inputStr, setInputStr] = React.useState('9');
  const [inputNum, setInputNum] = React.useState(9);
  const [itemCount, setItemCount] = React.useState(9);
  const probTable = getProbTable(itemCount);
  return (
    <Stack spacing={6}>
      <Heading size="lg">컴플리트 가챠 계산기</Heading>
      <Stack>
        <Text>모든 아이템이 뽑힐 확률이 균등할 때, 복원 추출로 몇 회를 뽑아야 모든 아이템을 모을 수 있을지 계산하는 계산기입니다.</Text>
        <Text>대표적으로 캔뱃지 컴플리트 확률 계산 등에 쓰일 수 있습니다.</Text>
      </Stack>
      <FormControl id="item-count">
        <FormLabel>전체 아이템 갯수 (최대 29)</FormLabel>
        <NumberInput
          min={1}
          max={29}
          value={inputStr}
          onChange={(s, n) => {
            setInputStr(s);
            setInputNum(n);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>가챠에서 나올 수 있는 아이템의 갯수입니다. 모든 아이템은 균등 확률로 뽑힘을 가정합니다.</FormHelperText>
      </FormControl>
      <Center>
        <Button onClick={() => setItemCount(Number.isNaN(inputNum) ? 0 : inputNum)}>
          계산하기
        </Button>
      </Center>
      <Divider />
      <Heading size="lg">계산 결과</Heading>
      <Stat>
        <StatLabel>시행 기대 횟수</StatLabel>
        <StatNumber>{`${getExpectation(itemCount).toFixed(2)}회`}</StatNumber>
      </Stat>
      <Heading size="md">전체 확률표 (99%까지)</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>뽑기 횟수</Th>
            <Th isNumeric>컴플리트 확률</Th>
          </Tr>
        </Thead>
        <Tbody>
          {probTable.map((v) => {
            return (
              <Tr key={v.trial}>
                <Td>{`${v.trial}회`}</Td>
                <Td isNumeric>{`${v.accProbPercent.toFixed(5)}%`}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Stack>
  );
}

export default CCPNormal;
