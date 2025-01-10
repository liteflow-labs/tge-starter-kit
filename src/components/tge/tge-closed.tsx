import { XCircleIcon } from "lucide-react";

export default function TgeClosed() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
      <XCircleIcon className="w-12 h-12 text-muted-foreground/60 mb-4" />
      <h2 className="text-2xl font-bold">Sale Closed</h2>
      <p className="text-muted-foreground">
        Thank you for your interest.
        <br /> The sale is now closed.
      </p>
    </div>
  );
}