export function powBigInt(base: bigint, power: number): bigint {
  // 'target' option is not set to 'es2016' or later. Create custom exponent
  return new Array<bigint>(power).fill(base).reduce((acc, curr) => acc * curr, BigInt(1));
}

export function divideBigInt(a: bigint, b: bigint, decimalPrecision: number): number {
  return Number(((a * (powBigInt(BigInt(10), decimalPrecision))) / b)) / (10 ** decimalPrecision);
}

export function factorial(n: number): bigint {
  if (n === 0) return BigInt(1);
  return new Array(n).fill(null).map(
    (_, idx) => BigInt(idx + 1),
  ).reduce((acc, curr) => acc * curr, BigInt(1));
}
