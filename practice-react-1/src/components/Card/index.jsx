import styles from './styles.module.scss';

export function Card({ children, className }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  )
}