import { ClockIcon } from "lucide-react";

export default function TgeComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
      <ClockIcon className="w-12 h-12 text-muted-foreground/60 mb-4" />
      <h2 className="text-2xl font-bold">Coming Soon</h2>
      <p className="text-muted-foreground">
        The sale will start soon. Stay tuned!
      </p>
    </div>
  );
}
