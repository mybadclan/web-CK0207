import { useMemo } from "react";
import styles from "./styles.module.css";

const getId = () => (Math.random() + 1).toString(36).substring(7);

export function Checkbox({ label = "", checked = false, onClick = () => {} }) {
  const id = useMemo(() => getId(), []);
  return (
    <div class={styles.checkboxContainer}>
      {label !== "" && <label htmlFor={`checkbox_${id}`}>{label}</label>}
      <input
        type="checkbox"
        id={`checkbox_${id}`}
        name={`checkbox_${id}`}
        checked={checked}
        onClick={(e) => onClick(e.target.checked)}
      />
    </div>
  );
}
