import liteflow from "@/lib/liteflow";
import { useQuery } from "@tanstack/react-query";

export default function useTge(chainId: number, address: string) {
  return useQuery({
    queryFn: async () => {
      const res = await liteflow.tge.retrieve(chainId, address);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    queryKey: ["tge", { chainId, address }],
  });
}
