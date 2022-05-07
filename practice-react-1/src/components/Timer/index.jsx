import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const { format } = new Intl.NumberFormat('pt-BR', {
  minimumIntegerDigits: 2,
})

export function Timer({ className, stopped }) {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(-1);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds(current => current + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, []);

  useEffect(() => {
    if (stopped) {
      clearInterval(timerRef.current);
    }

    if (!stopped && timerRef.current === -1) {
      timerRef.current = setInterval(() => {
        setSeconds(current => current + 1);
      }, 1000);
    }
  }, [stopped]);

  const hour = parseInt(seconds / 3600, 10);
  const hourRest = seconds % 3600;
  const minute = parseInt(hourRest / 60, 10);
  const second = seconds % 60;

  const hourFormatted = format(hour);
  const minuteFormatted = format(minute);
  const secondFormatted = format(second);


  return (
    <span className={`${styles.timer} ${className}`}>
      {hourFormatted} : {minuteFormatted} : {secondFormatted}
    </span>
  );
}
