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
  Wrap,
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

// probPercent has precision 2, i.e., 0.01% ~ 100.00% => 1/10000 ~ 10000/10000
function binomialPercent(n: number, r: number, probPercent: number, precision: number) {
  // In n times of trial, what is the probability of r draw?
  const probNumerator = Math.round(probPercent * 100); // rounding reason: 1.09 * 100 = 109.00000000000001 and 1.13 * 100 = 112.99999999999999
  const denominator = powBigInt(BigInt(10000), n);
  // nCr * p^r * (1-p)^(n-r)
  return divideBigInt(
    C(n, r)
      * powBigInt(BigInt(probNumerator), r)
      * powBigInt(BigInt(10000 - probNumerator), n - r)
      * BigInt(100),
    denominator,
    precision,
  );
}

// probPercent has precision 2, i.e., 0.01% ~ 100.00% => 1/10000 ~ 10000/10000
function cumulativeBinomialPercent(n: number, r: number, probPercent: number, precision: number) {
  // In n times of trial, what is the probability of at least r draw?
  if (n < r) return NaN;
  if (r < n / 2) {
    // Subtraction is better
    let accProbPercent = 0;
    for (let i = 0; i < r; i += 1) {
      accProbPercent += binomialPercent(n, i, probPercent, precision);
    }
    return 100 - accProbPercent;
  }
  // Addition is better
  let accProbPercent = 0;
  for (let i = r; i <= n; i += 1) {
    accProbPercent += binomialPercent(n, i, probPercent, precision);
  }
  return accProbPercent;
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
  let itemCount = 0;
  // Initial case: nC0 * (1 - p)^n
  let currProbPercent = binomialPercent(trial, itemCount, probPercent, precision);
  let accProbPercent = currProbPercent;
  const ret: Row[] = [{
    itemCount,
    probPercent: currProbPercent,
    accProbPercent,
  }];
  while (itemCount < Math.min(trial, 10)) {
    itemCount += 1;
    // nCr * p^r * (1 - p)^r
    currProbPercent = binomialPercent(trial, itemCount, probPercent, precision);
    accProbPercent += currProbPercent;
    ret.push({
      itemCount,
      probPercent: currProbPercent,
      accProbPercent,
    });
  }
  return ret;
}

const COUNT_MAX = 1000;
function GachaNormal() {
  const helperTextColor = useColorModeValue('gray.600', 'gray.400');
  const [probPercentInputStr, setProbPercentInputStr] = React.useState('1.00');
  const [probPercentInputNum, setProbPercentInputNum] = React.useState(1);
  const [trialInputStr, setTrialInputStr] = React.useState('1');
  const [trialInputNum, setTrialInputNum] = React.useState(1);
  const [targetInputStr, setTargetInputStr] = React.useState('1');
  const [targetInputNum, setTargetInputNum] = React.useState(1);
  const [targetProbPercentStr, setTargetProbPercentStr] = React.useState('99.99');
  const [targetProbPercentNum, setTargetProbPercentNum] = React.useState(99.99);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const probPercent = (() => {
    if (Number.isNaN(probPercentInputNum)) return 0.01;
    if (probPercentInputNum < 0.01) return 0.01;
    if (probPercentInputNum > 100) return 100;
    return Math.floor(probPercentInputNum * 100) / 100;
  })();
  const trial = (() => {
    if (Number.isNaN(trialInputNum)) return 1;
    if (trialInputNum < 1) return 1;
    if (trialInputNum > COUNT_MAX) return COUNT_MAX;
    return Math.floor(trialInputNum);
  })();
  const target = (() => {
    if (Number.isNaN(targetInputNum)) return 1;
    if (targetInputNum < 1) return 1;
    if (targetInputNum > COUNT_MAX) return COUNT_MAX;
    return Math.floor(targetInputNum);
  })();
  const targetProbPercent = (() => {
    if (Number.isNaN(targetProbPercentNum)) return 0.01;
    if (targetProbPercentNum < 0.01) return 0.01;
    if (targetProbPercentNum > 99.99) return 99.99;
    return Math.floor(targetProbPercentNum * 100) / 100;
  })();
  const singleProbTable = getSingleProbTable(probPercent);
  const multiGachaTable = getMultiGachaTable(probPercent, trial);
  const cumulativeProbPercent = cumulativeBinomialPercent(trial, target, probPercent, 6);
  const targetProbTrial = Math.ceil(Math.log(1 - targetProbPercent / 100) / Math.log(1 - probPercent / 100));
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
            <Heading size="lg">n회 뽑기에서 m개 이상 뽑을 확률</Heading>
            <Wrap shouldWrapChildren spacing={6}>
              <FormControl id="trial-count-2">
                <FormLabel>가챠 시도 횟수 (최대 1000회)</FormLabel>
                <HStack>
                  <NumberInput
                    min={1}
                    max={COUNT_MAX}
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
              <FormControl id="target-count">
                <FormLabel>목표 갯수 (최대 1000회)</FormLabel>
                <HStack>
                  <NumberInput
                    min={1}
                    max={COUNT_MAX}
                    step={1}
                    value={targetInputStr}
                    onChange={(s, n) => {
                      setTargetInputStr(s);
                      setTargetInputNum(n);
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
            </Wrap>
            <Stat>
              <StatNumber>{`${cumulativeProbPercent.toFixed(5)}%`}</StatNumber>
            </Stat>
            <Divider />
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing={6}>
            <Heading size="lg">n% 이상 확률로 뽑기 위한 최소 시도 횟수</Heading>
            <FormControl id="target-prob">
              <FormLabel>목표 확률 (최대 99.99%)</FormLabel>
              <HStack>
                <NumberInput
                  min={0.01}
                  max={99.99}
                  precision={2}
                  step={0.01}
                  value={targetProbPercentStr}
                  onChange={(s, n) => {
                    setTargetProbPercentStr(s);
                    setTargetProbPercentNum(n);
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
            </FormControl>
            <Stat>
              <StatNumber>{`${targetProbTrial}회`}</StatNumber>
            </Stat>
            <Divider />
          </Stack>
        </GridItem>
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
              <FormLabel>가챠 시도 횟수 (최대 1000회)</FormLabel>
              <HStack>
                <NumberInput
                  min={1}
                  max={1000}
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
