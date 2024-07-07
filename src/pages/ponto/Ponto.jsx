import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


export default function Ponto() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="ponto-container">
      
      <div className="dropdown">
        
        {dropdownOpen && (
          <div className="dropdown-content">
            <NavLink to="/ponto/registro-ponto">Registro de ponto</NavLink>
            <NavLink to="/ponto/relatorio-ponto">Relatório de ponto</NavLink>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
