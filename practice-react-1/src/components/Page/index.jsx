import styles from "./styles.module.scss";

export function Page({ children, className }) {
  return (
    <div>
      <div className={`${styles.container} ${className}`}>{children}</div>
    </div>
  );
}
