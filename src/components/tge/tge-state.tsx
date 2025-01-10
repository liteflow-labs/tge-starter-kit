"use client";

import useNow from "@/hooks/useNow";
import { GetTgesByChainIdByAddressResponse } from "@liteflow/sdk/dist/client";

export default function TgeState({
  tge,
  notStarted,
  inProgress,
  ended,
}: {
  tge: GetTgesByChainIdByAddressResponse;
  notStarted: JSX.Element;
  inProgress: JSX.Element;
  ended: JSX.Element;
}) {
  const now = useNow();
  if (now < tge.startDate) return notStarted;
  if (now < tge.endDate) return inProgress;
  return ended;
}
