import styles from "./Button.module.css";

export default function Button({ onClick, loading }) {
  return (
    <button className={styles.btn} disabled={loading} onClick={onClick}>
      Upload
    </button>
  );
}
