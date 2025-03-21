import { formatUnits as baseFormatUnit, maxInt128 } from "viem";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 6,
});

const toBigInt = (value: number | bigint | string) => {
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
};

export function NumberFormatter({
  value,
  decimals = 0,
}: {
  value: number | bigint | string | null | undefined;
  decimals?: number;
}) {
  if (value === null) return "--";
  if (value === undefined) return "--";
  const bigIntValue = toBigInt(value);
  if (bigIntValue > maxInt128) return "∞"; // TODO: change to maxInt256 when API returns a proper bigint not truncated
  return (
    <span title={value.toString()} className="font-mono">
      {formatter.format(parseFloat(baseFormatUnit(bigIntValue, decimals)))}
    </span>
  );
}
