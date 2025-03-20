import { XCircleIcon } from "lucide-react";

export default function TgeClosed() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
      <XCircleIcon className="mb-4 h-12 w-12 text-muted-foreground/60" />
      <h2 className="text-2xl font-bold">Sale Closed</h2>
      <p className="text-muted-foreground">
        Thank you for your interest.
        <br /> The sale is now closed.
      </p>
    </div>
  );
}
