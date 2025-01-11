"use client";

import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GetTgesByChainIdByAddressResponse } from "@liteflow/sdk/dist/client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Address, erc20Abi, formatUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useBalance,
  useClient,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

const abi = [
  {
    inputs: [
      { internalType: "address", name: "_receiver", type: "address" },
      { internalType: "uint256", name: "_quantity", type: "uint256" },
      { internalType: "address", name: "_currency", type: "address" },
      {
        internalType: "uint256",
        name: "_pricePerToken",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "quantityLimitPerWallet",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pricePerToken",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        internalType: "struct IDropSinglePhase.AllowlistProof",
        name: "_allowlistProof",
        type: "tuple",
      },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export default function TgeForm({
  tge,
}: {
  tge: GetTgesByChainIdByAddressResponse;
}) {
  const [quantity, setQuantity] = useState("");
  const account = useAccount();
  const modal = useConnectModal();
  const isNative = tge.currency.address === null;
  const nativeBalance = useBalance({
    query: { enabled: isNative },
    chainId: tge.chainId,
    address: account.address as Address,
  });
  const data = useReadContracts({
    query: { enabled: !!account.address && !isNative },
    contracts: [
      {
        abi: erc20Abi,
        chainId: tge.chainId,
        address: tge.currency.address as Address,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        abi: erc20Abi,
        chainId: tge.chainId,
        address: tge.currency.address as Address,
        functionName: "allowance",
        args: [account.address as Address, tge.contractAddress as Address],
      },
    ],
  });
  const [tokenBalance, allowance] = data.data || [];
  const balance = isNative ? nativeBalance.data?.value : tokenBalance?.result;

  const price = useMemo(() => {
    try {
      return BigInt(quantity) * BigInt(tge.price);
    } catch {
      return BigInt(0);
    }
  }, [quantity, tge.price]);

  const requireAllowance = useMemo(() => {
    if (isNative) return false;
    if (!allowance?.result) return true;
    return allowance.result < price;
  }, [allowance, price, isNative]);

  const client = useClient({ chainId: tge.chainId });
  const chain = useSwitchChain();

  const approveTx = useWriteContract();
  const approve = useMutation({
    mutationFn: async () => {
      if (!client) throw new Error("Client not found");
      await chain.switchChainAsync({ chainId: tge.chainId });
      const hash = await approveTx.writeContractAsync({
        chainId: tge.chainId,
        abi: erc20Abi,
        address: tge.currency.address as Address,
        functionName: "approve",
        args: [tge.contractAddress as Address, price],
      });
      await waitForTransactionReceipt(client, { hash });
      await data.refetch();
    },
  });

  const claimTx = useWriteContract();
  const claim = useMutation({
    mutationFn: async () => {
      if (!client) throw new Error("Client not found");
      await chain.switchChainAsync({ chainId: tge.chainId });
      const currency =
        (tge.currency.address as Address) ||
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
      const hash = await claimTx.writeContractAsync({
        chainId: tge.chainId,
        abi,
        address: tge.contractAddress as Address,
        functionName: "claim",
        args: [
          account.address as Address,
          BigInt(quantity) * BigInt(10 ** tge.token.decimals),
          currency,
          BigInt(tge.price),
          {
            proof: [],
            quantityLimitPerWallet: BigInt(tge.limitPerWallet),
            pricePerToken: BigInt(tge.price),
            currency: currency,
          },
          "0x",
        ],
        value: isNative ? price : BigInt(0),
      });
      await waitForTransactionReceipt(client, { hash });
      await data.refetch();
    },
  });

  const ActionButton = useMemo(() => {
    if (account.isDisconnected)
      return (
        <Button
          className="w-full"
          onClick={modal.openConnectModal}
          isLoading={modal.connectModalOpen}
          size="lg"
        >
          Connect Wallet
        </Button>
      );
    if (requireAllowance)
      return (
        <Button
          isLoading={approve.isPending}
          className="w-full"
          onClick={() => approve.mutate()}
          size="lg"
        >
          Approve {tge.currency.symbol}
        </Button>
      );
    if (
      Number(quantity) >
      Number(formatUnits(BigInt(tge.limitPerWallet), tge.token.decimals))
    )
      return (
        <Button className="w-full" disabled size="lg">
          Quantity exceeds limit
        </Button>
      );
    if (balance && balance < price)
      return (
        <Button className="w-full" disabled size="lg">
          Insufficient balance
        </Button>
      );
    return (
      <Button
        isLoading={claim.isPending}
        className="w-full"
        onClick={() => claim.mutate()}
        size="lg"
      >
        Buy now
      </Button>
    );
  }, [
    account,
    requireAllowance,
    quantity,
    balance,
    price,
    approve,
    claim,
    tge,
    modal,
  ]);

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Hard cap:</span>
          <span>
            <NumberFormatter
              value={tge.hardCap}
              decimals={tge.token.decimals}
            />{" "}
            {tge.token.symbol}
          </span>
        </div>
        {tge.limitPerWallet > 0 && (
          <div className="flex justify-between text-sm">
            <span>Limit per wallet:</span>
            <span>
              <NumberFormatter
                value={tge.limitPerWallet}
                decimals={tge.token.decimals}
              />{" "}
              {tge.token.symbol}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Enter quantity</span>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="pr-16"
            placeholder={`100 ${tge.token.symbol}`}
            min="0"
            max={
              tge.limitPerWallet > 0
                ? formatUnits(
                    BigInt(tge.limitPerWallet),
                    tge.token.decimals || 18
                  )
                : undefined
            }
          />
          {tge.limitPerWallet && (
            <Button
              variant="outline"
              size="sm"
              className="absolute right-[1px] top-1/2 -translate-y-1/2 scale-90"
              onClick={() =>
                setQuantity(
                  formatUnits(
                    BigInt(tge.limitPerWallet),
                    tge.token.decimals || 18
                  )
                )
              }
            >
              Max
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{tge.currency.symbol} Balance:</span>
          <span>
            <NumberFormatter value={balance} decimals={tge.currency.decimals} />{" "}
            {tge.currency.symbol}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Price:</span>
          <span>
            <NumberFormatter value={price} decimals={tge.currency.decimals} />{" "}
            {tge.currency.symbol}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>You will receive:</span>
          <span>
            <NumberFormatter value={quantity} /> {tge.token.symbol}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {ActionButton}
    </>
  );
}
