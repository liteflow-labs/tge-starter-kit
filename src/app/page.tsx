import Tge from "@/components/tge";

export default function Home() {
  const chainId = process.env.NEXT_PUBLIC_TGE_CHAIN_ID
    ? parseInt(process.env.NEXT_PUBLIC_TGE_CHAIN_ID, 10)
    : null;
  const address = process.env.NEXT_PUBLIC_TGE_CONTRACT_ADDRESS ?? "";
  if (!chainId) throw new Error("Missing tge chain ID");
  if (!address) throw new Error("Missing tge contract address");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <Tge chainId={chainId} address={address} />
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Liteflow. All rights reserved.</p>
      </footer>
    </div>
  );
}
