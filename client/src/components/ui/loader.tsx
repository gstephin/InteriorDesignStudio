
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
}
