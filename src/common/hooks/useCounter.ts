/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

type CountDown = {
  count: { minutes: string; seconds: string };
  counter: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const useCounter: (total: number, ms?: number) => CountDown = (
  total: number,
  ms: number = 1000
) => {
  const [counter, setCountDown] = useState(total);
  const [startCountDown, setStartCountDown] = useState(false);
  // Store the created interval
  const intervalId = useRef<any>();
  const start: () => void = () => setStartCountDown(true);
  const pause: () => void = () => setStartCountDown(false);
  const reset: () => void = () => {
    clearInterval(intervalId.current);
    setStartCountDown(false);
    setCountDown(total);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      startCountDown && counter > 0 && setCountDown((counter) => counter - 1);
    }, ms);
    // Clear interval when count to zero
    if (counter === 0) clearInterval(intervalId.current);
    // Clear interval when unmount
    return () => clearInterval(intervalId.current);
  }, [startCountDown, counter, ms]);

  const getReturnValues = (countDown: number) => {
    // calculate time left

    const minute = Math.floor(countDown / 60).toString();
    const minutes =
      minute.toString().length === 1 ? `0${minute}` : minute.toString();
    const second = Math.floor(countDown % 60);
    const seconds =
      second.toString().length === 1 ? `0${second}` : second.toString();

    return { minutes, seconds };
  };

  const count = getReturnValues(counter);

  return { count, counter, start, pause, reset };
};

export default useCounter;
