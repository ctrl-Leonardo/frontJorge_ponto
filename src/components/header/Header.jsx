import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';


export default function Header() {
  const [headerClicked, setHeaderClicked] = useState(false);

  const handleIconClick = () => {
    setHeaderClicked(!headerClicked);
  };

  return (
    <>
      <div className={`${styles.icon} ${headerClicked ? styles.iconActive : ''}`} onClick={handleIconClick}>
        {headerClicked ? <IoClose /> : <RxHamburgerMenu />}
      </div>
      <header className={headerClicked ? `${styles.header} ${styles.headerTransform}` : styles.header}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/colaboradores">Colaboradores</NavLink>
        <NavLink to="/admissao">Admissão</NavLink>
        <NavLink to="/demissao">Demissão</NavLink>
        
        <div className={styles.dropdown}>
          <span className={styles.dropdownToggle}>Ponto</span>
          <div className={styles.dropdownContent}>
            <NavLink to="/ponto/registro-ponto">Registro de ponto</NavLink>
            <NavLink to="/ponto/relatorio-ponto">Relatório de ponto</NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
