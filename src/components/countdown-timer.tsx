"use client";

import { useCallback, useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex items-center gap-2">
      {time.days > 0 && (
        <>
          <div className="flex flex-col items-center">
            <div className="font-mono text-4xl font-bold">{pad(time.days)}</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="mb-5 text-4xl font-bold">:</div>
        </>
      )}
      <div className="flex flex-col items-center">
        <div className="font-mono text-4xl font-bold">{pad(time.hours)}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="mb-5 text-4xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="font-mono text-4xl font-bold">{pad(time.minutes)}</div>
        <div className="text-xs">Mins</div>
      </div>
      <div className="mb-5 text-4xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className="font-mono text-4xl font-bold">{pad(time.seconds)}</div>
        <div className="text-xs">Secs</div>
      </div>
    </div>
  );
}
