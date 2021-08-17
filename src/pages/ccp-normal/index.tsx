import React from 'react';
import {
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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

function powBigInt(base: bigint, power: number): bigint {
  // 'target' option is not set to 'es2016' or later. Create custom exponent
  return new Array<bigint>(power).fill(base).reduce((acc, curr) => acc * curr, BigInt(1));
}
function divideBigInt(a: bigint, b: bigint, decimalPrecision: number): number {
  return Number(((a * (powBigInt(BigInt(10), decimalPrecision))) / b)) / (10 ** decimalPrecision);
}

type Cache = {
  [key: string]: bigint,
};
const STIRLING_CACHE: Cache = {};
function S(n: number, k: number): bigint {
  if (n === 0 && k === 0) return BigInt(1);
  if (n === 0 || k === 0) return BigInt(0);
  const cacheKey = `${n}-${k}`;
  const cache = STIRLING_CACHE[cacheKey];
  if (cache !== undefined) return cache;
  const val = BigInt(k) * S(n - 1, k) + S(n - 1, k - 1);
  STIRLING_CACHE[cacheKey] = val;
  return val;
}

function getExpectation(itemCount: number) {
  const harmonic = new Array(itemCount).fill(null).map((_, idx) => 1 / (idx + 1)).reduce((acc, curr) => acc + curr, 0);
  return itemCount * harmonic;
}

function getProbTable(itemCount: number) {
  const precision = 6; // Will show to 5th digit, so calculate till 6th digit
  type ProbRow = {
    trial: number,
    accProbPercent: number,
  };
  const nFactorial = new Array(itemCount).fill(null).map(
    (_, idx) => BigInt(idx + 1),
  ).reduce((acc, curr) => acc * curr, BigInt(1));
  let denominator = powBigInt(BigInt(itemCount), itemCount);
  let trial = itemCount;
  // Initial case
  let accProbPercent = divideBigInt(nFactorial * BigInt(100), denominator, precision);
  const ret: ProbRow[] = [{
    trial,
    accProbPercent,
  }];
  let recordThreshold = 5.00;
  while (accProbPercent < 99.00) {
    denominator *= BigInt(itemCount);
    trial += 1;
    accProbPercent = divideBigInt(nFactorial * S(trial, itemCount) * BigInt(100), denominator, precision);
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
  const itemCount = (() => {
    if (Number.isNaN(inputNum)) return 1;
    if (inputNum < 1) return 1;
    if (inputNum > 100) return 100;
    return inputNum;
  })();
  const probTable = getProbTable(itemCount);
  return (
    <Stack spacing={6}>
      <Heading size="lg">컴플리트 가챠 계산기</Heading>
      <Stack>
        <Text>모든 아이템이 뽑힐 확률이 균등할 때, 복원 추출로 몇 회를 뽑아야 모든 아이템을 모을 수 있을지 계산하는 계산기입니다.</Text>
        <Text>대표적으로 캔뱃지 컴플리트 확률 계산 등에 쓰일 수 있습니다.</Text>
      </Stack>
      <FormControl id="item-count">
        <FormLabel>전체 아이템 갯수 (최대 100)</FormLabel>
        <Stack>
          <NumberInput
            min={1}
            max={100}
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
          <Slider
            focusThumbOnChange={false}
            value={inputNum}
            onChange={(value) => {
              setInputNum(value);
              setInputStr(String(value));
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Stack>
        <FormHelperText>가챠에서 나올 수 있는 아이템의 갯수입니다. 모든 아이템은 균등 확률로 뽑힘을 가정합니다.</FormHelperText>
      </FormControl>
      <Divider />
      <Heading size="lg">{`${itemCount}개 아이템에 대한 계산 결과`}</Heading>
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
