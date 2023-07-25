import styles from './Header.module.css';
import logo from '../assets/rocket.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo da to-do list em formato de foguete" />
      <p>to<span>do</span></p>
    </header>
  );
}