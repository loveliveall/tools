import React from 'react';
import {
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

function getSingleProbTable(prob: number) {
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
      else recordThreshold += 1.00;
    }
  }
  return ret;
}

function GachaNormal() {
  const [probInputStr, setProbInputStr] = React.useState('1.00');
  const [probInputNum, setProbInputNum] = React.useState(1);
  const prob = (() => {
    if (Number.isNaN(probInputNum)) return 0.01;
    if (probInputNum < 0.01) return 0.01;
    if (probInputNum > 100) return 100;
    return probInputNum;
  })() / 100;
  const singleProbTable = getSingleProbTable(prob);
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
            value={probInputStr}
            onChange={(s, n) => {
              setProbInputStr(s);
              setProbInputNum(n);
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
      >
        <GridItem>
          <Stack spacing={6}>
            <Heading size="lg">1개 뽑기 계산 결과</Heading>
            <Stat>
              <StatLabel>시행 기대 횟수</StatLabel>
              <StatNumber>{`${(1 / prob).toFixed(2)}회`}</StatNumber>
            </Stat>
            <Table>
              <Thead>
                <Tr>
                  <Th>뽑기 횟수</Th>
                  <Th isNumeric>1개 이상 뽑을 확률</Th>
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
      </Grid>
    </Stack>
  );
}

export default GachaNormal;
