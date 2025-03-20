"use client";

import { CountdownTimer } from "@/components/countdown-timer";
import { NumberFormatter } from "@/components/number-formatter";
import TgeClosed from "@/components/tge/tge-closed";
import TgeComingSoon from "@/components/tge/tge-coming-soon";
import TgeForm from "@/components/tge/tge-form";
import TgeState from "@/components/tge/tge-state";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTge from "@/hooks/useTge";
import { LoaderPinwheelIcon } from "lucide-react";
import Image from "next/image";

export default function Tge({
  chainId,
  address,
}: {
  chainId: number;
  address: string;
}) {
  const tge = useTge(chainId, address);

  if (tge.isLoading)
    return (
      <LoaderPinwheelIcon className="size-20 animate-spin text-muted-foreground" />
    );
  if (tge.error)
    return <p className="text-destructive">Error: {tge.error.message}</p>;
  if (!tge.data) return <p>No data</p>;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl">
              <h1>{tge.data.name}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a demo using the Token Generation Event (TGE) tool from
              Liteflow. This sale is running on the testnet and involves a
              testnet token that is not meant for real-world use. You can play
              with it to understand how the TGE tool works and how it can be
              used to create your token sale.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2">
            <TgeState
              tge={tge.data}
              notStarted={
                <>
                  <h3 className="text-xl">Starts in:</h3>
                  <CountdownTimer targetDate={tge.data.startDate} />
                </>
              }
              inProgress={
                <>
                  <h3 className="text-xl">Ends in:</h3>
                  <CountdownTimer targetDate={tge.data.endDate} />
                </>
              }
              ended={<h3 className="text-xl">Ended</h3>}
            />
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image
                src={tge.data.token.image}
                alt={tge.data.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-lg">{tge.data.token.name}</div>
              <span className="text-muted-foreground">
                ({tge.data.token.symbol})
              </span>
              <span className="flex-1" />
              <span>Price:</span>
              <div className="font-semibold">
                <NumberFormatter
                  value={tge.data.price}
                  decimals={tge.data.currency.decimals}
                />{" "}
                {tge.data.currency.symbol}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full space-y-6">
            <TgeState
              tge={tge.data}
              notStarted={<TgeComingSoon />}
              inProgress={<TgeForm tge={tge.data} />}
              ended={<TgeClosed />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
