import { Pedometer } from "expo-sensors";
import { useEffect, useRef } from "react";
import { useAddStepsMutation } from "../redux/services/trackingSteps";

export const usePedometer = () => {
  const [addSteps] = useAddStepsMutation();
  const lastSteps = useRef<number>(0);

  useEffect(() => {
    let sub: any;

    Pedometer.isAvailableAsync().then((available) => {
      if (!available) return;

      sub = Pedometer.watchStepCount((result) => {
        const diff = result.steps - lastSteps.current;
        if (diff > 0) {
          addSteps({ steps: diff });
          lastSteps.current = result.steps;
        }
      });
    });

    return () => sub?.remove();
  }, []);
};
