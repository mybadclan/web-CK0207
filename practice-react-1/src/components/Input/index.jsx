import { useMemo, useState } from "react";
import styles from "./styles.module.scss";

const getId = () => (Math.random() + 1).toString(36).substring(7)

export function Input({ label, value, onChange }) {
  const [labelClassName, setLabelClassName] = useState('');

  const id = useMemo(() => getId(), []);

  function handleFocus() {
    if (value === '') {
      setLabelClassName(styles.active);
    }
  }

  function handleBur() {
    if(value === '') {
      setLabelClassName('');
    }
  }

  return (
    <div className={`${styles.player} ${labelClassName}`}>
      <label htmlFor={`player_${id}`}>{label}</label>
      <input
        id={`player_${id}`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBur}
      />
    </div>
  );
}
