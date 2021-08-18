import React from 'react';
import {
  useColorModeValue,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DESKTOP_BP } from '@/consts';
import {
  factorial,
  divideBigInt,
  powBigInt,
} from '@/utils/bigint';

function C(n: number, r: number): bigint {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function getSingleProbTable(probPercent: number) {
  const prob = probPercent / 100;
  type ProbRow = {
    trial: number,
    probPercent: number,
  };
  let trial = 1;
  // Initial case
  let currProbPercent = (1 - (1 - prob) ** trial) * 100;
  const ret: ProbRow[] = [{
    trial,
    probPercent: currProbPercent,
  }];
  let recordThreshold = 10.00;
  while (currProbPercent < 99.00) {
    trial += 1;
    currProbPercent = (1 - (1 - prob) ** trial) * 100;
    if (currProbPercent > recordThreshold) {
      ret.push({
        trial,
        probPercent: currProbPercent,
      });
      if (recordThreshold < 90.00) recordThreshold += 10.00;
      else if (recordThreshold < 95.00) recordThreshold = 95.00;
      else recordThreshold = 99.00;
    }
  }
  return ret;
}

// probPercent has precision 2, i.e., 0.01% ~ 100.00% => 1/10000 ~ 10000/10000
function getMultiGachaTable(probPercent: number, trial: number) {
  const precision = 6; // Will show to 5th digit, so calculate till 6th digit
  type Row = {
    itemCount: number,
    probPercent: number,
    accProbPercent: number,
  };
  const probNumerator = probPercent * 100;
  const denominator = powBigInt(BigInt(10000), trial);
  let itemCount = 0;
  // Initial case: nC0 * (1 - p)^n
  let currProbPercent = divideBigInt(
    C(trial, itemCount) * powBigInt(BigInt(10000 - probNumerator), trial) * BigInt(100),
    denominator,
    precision,
  );
  let accProbPercent = currProbPercent;
  const ret: Row[] = [{
    itemCount,
    probPercent: currProbPercent,
    accProbPercent,
  }];
  while (itemCount < Math.min(trial, 10)) {
    itemCount += 1;
    // nCr * p^r * (1 - p)^r
    currProbPercent = divideBigInt(
      C(trial, itemCount)
        * powBigInt(BigInt(probNumerator), itemCount)
        * powBigInt(BigInt(10000 - probNumerator), trial - itemCount)
        * BigInt(100),
      denominator,
      precision,
    );
    accProbPercent += currProbPercent;
    ret.push({
      itemCount,
      probPercent: currProbPercent,
      accProbPercent,
    });
  }
  return ret;
}

function GachaNormal() {
  const helperTextColor = useColorModeValue('gray.600', 'gray.400');
  const [probPercentInputStr, setProbPercentInputStr] = React.useState('1.00');
  const [probPercentInputNum, setProbPercentInputNum] = React.useState(1);
  const [trialInputStr, setTrialInputStr] = React.useState('1');
  const [trialInputNum, setTrialInputNum] = React.useState(1);
  const probPercent = (() => {
    if (Number.isNaN(probPercentInputNum)) return 0.01;
    if (probPercentInputNum < 0.01) return 0.01;
    if (probPercentInputNum > 100) return 100;
    return Math.floor(probPercentInputNum * 100) / 100;
  })();
  const trial = (() => {
    if (Number.isNaN(trialInputNum)) return 1;
    if (trialInputNum < 1) return 1;
    if (trialInputNum > 10000) return 10000;
    return Math.floor(trialInputNum);
  })();
  const singleProbTable = getSingleProbTable(probPercent);
  const multiGachaTable = getMultiGachaTable(probPercent, trial);
  return (
    <Stack spacing={6}>
      <Heading size="lg">가챠 확률 계산기</Heading>
      <Stack>
        <Text>가챠 뽑기와 관련된 각종 확률을 계산합니다.</Text>
        <Text>모든 뽑기는 복원 추출임을 가정합니다.</Text>
      </Stack>
      <FormControl id="probability">
        <FormLabel>가챠 1회의 확률</FormLabel>
        <HStack>
          <NumberInput
            min={0.01}
            max={100}
            precision={2}
            step={0.01}
            value={probPercentInputStr}
            onChange={(s, n) => {
              setProbPercentInputStr(s);
              setProbPercentInputNum(n);
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>%</Text>
        </HStack>
        <FormHelperText>1회의 가챠에서 원하는 아이템이 나올 확률입니다.</FormHelperText>
      </FormControl>
      <Divider />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', [DESKTOP_BP]: 'repeat(2, 1fr)' }}
        gap={4}
      >
        <GridItem>
          <Stack spacing={6}>
            <Heading size="lg">1개 뽑기 계산 결과</Heading>
            <Stat>
              <StatLabel>시행 기대 횟수</StatLabel>
              <StatNumber>{`${(100 / probPercent).toFixed(2)}회`}</StatNumber>
            </Stat>
            <Stack>
              <Heading size="md">1개 이상 뽑기 확률표 (99%까지)</Heading>
              <Text color={helperTextColor}>(가챠 횟수)번 가챠를 시도하면 (확률) 확률로 1개 이상 뽑을 수 있습니다.</Text>
            </Stack>
            <Table>
              <Thead>
                <Tr>
                  <Th>가챠 횟수</Th>
                  <Th isNumeric>확률</Th>
                </Tr>
              </Thead>
              <Tbody>
                {singleProbTable.map((v) => {
                  return (
                    <Tr key={v.trial}>
                      <Td>{`${v.trial}회`}</Td>
                      <Td isNumeric>{`${v.probPercent.toFixed(5)}%`}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing={6}>
            <Heading size="lg">다회 가챠 계산 결과</Heading>
            <FormControl id="trial-count">
              <FormLabel>가챠 시도 횟수</FormLabel>
              <HStack>
                <NumberInput
                  min={1}
                  max={10000}
                  step={1}
                  value={trialInputStr}
                  onChange={(s, n) => {
                    setTrialInputStr(s);
                    setTrialInputNum(n);
                  }}
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
            <Stack>
              <Heading size="md">뽑기 갯수 확률표 (10개까지)</Heading>
              <Text color={helperTextColor}>주어진 횟수만큼 가챠를 시도하면 (뽑은 갯수)개 뽑을 확률이 (확률)입니다.</Text>
            </Stack>
            <Table>
              <Thead>
                <Tr>
                  <Th>뽑은 갯수</Th>
                  <Th isNumeric>확률</Th>
                  <Th isNumeric>누적 확률</Th>
                </Tr>
              </Thead>
              <Tbody>
                {multiGachaTable.map((v) => {
                  return (
                    <Tr key={v.itemCount}>
                      <Td>{`${v.itemCount}개`}</Td>
                      <Td isNumeric>{`${v.probPercent.toFixed(5)}%`}</Td>
                      <Td isNumeric>{`${v.accProbPercent.toFixed(5)}%`}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
}

export default GachaNormal;
