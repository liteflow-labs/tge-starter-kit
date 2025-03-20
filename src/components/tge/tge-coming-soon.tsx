import { ClockIcon } from "lucide-react";

export default function TgeComingSoon() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
      <ClockIcon className="mb-4 h-12 w-12 text-muted-foreground/60" />
      <h2 className="text-2xl font-bold">Coming Soon</h2>
      <p className="text-muted-foreground">
        The sale will start soon. Stay tuned!
      </p>
    </div>
  );
}
