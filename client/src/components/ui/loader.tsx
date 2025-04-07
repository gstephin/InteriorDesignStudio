
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(33);
    }, 200);

    const timer2 = setTimeout(() => {
      setProgress(66);
    }, 500);

    const timer3 = setTimeout(() => {
      setProgress(100);
    }, 750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <div className="w-full max-w-xl mx-auto">
        <Progress value={progress} className="w-full h-2" />
      </div>
    </div>
  );
}
