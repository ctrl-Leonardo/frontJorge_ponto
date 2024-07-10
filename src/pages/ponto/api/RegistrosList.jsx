import React, { useEffect, useState } from 'react';
import { listarRegistrosPonto } from 'http://localhost:8080/api/registroponto';

const RegistrosList = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    async function fetchRegistros() {
      try {
        const data = await listarRegistrosPonto();
        setRegistros(data);
      } catch (error) {
        console.error('Erro ao buscar registros de ponto:', error);
      }
    }
    fetchRegistros();
  }, []);

  return (
    <div>
      <h2>Lista de Registros de Ponto</h2>
      <ul>
        {registros.map(registro => (
          <li key={registro.id}>
            <strong>Data/Hora:</strong> {new Date(registro.horaPonto).toLocaleString()} |
            <strong> Tipo:</strong> {registro.tipoRegistro} |
            <strong> Funcionário:</strong> {registro.funcionarioDTO.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrosList;