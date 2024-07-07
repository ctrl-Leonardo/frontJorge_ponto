import React, { useState, useEffect } from 'react';


export default function RegistroPonto() {
  const [registros, setRegistros] = useState([]);
  const [horaAtual, setHoraAtual] = useState(new Date().toLocaleTimeString());
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');

  useEffect(() => {
    // Fetch data from the backend (replace with actual API calls)
    fetchFuncionarios();
    fetchCargos();
  }, []);

  const fetchFuncionarios = async () => {
    // Fetch funcionarios from the backend (replace with actual API call)
    const response = await fetch('/api/funcionarios');
    const data = await response.json();
    setFuncionarios(data);
  };

  const fetchCargos = async () => {
    // Fetch cargos from the backend (replace with actual API call)
    const response = await fetch('/api/cargos');
    const data = await response.json();
    setCargos(data);
  };

  const registrarEntrada = () => {
    const novoRegistro = {
      tipo: 'Entrada',
      hora: new Date().toLocaleTimeString(),
      funcionario: selectedFuncionario,
      cargo: selectedCargo
    };
    setRegistros([...registros, novoRegistro]);
  };

  const registrarSaida = () => {
    const novoRegistro = {
      tipo: 'Saída',
      hora: new Date().toLocaleTimeString(),
      funcionario: selectedFuncionario,
      cargo: selectedCargo
    };
    setRegistros([...registros, novoRegistro]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraAtual(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="registro-ponto-container">
      <div className="label-selecionar">
        <div>
          <label>Funcionário:</label>
          <select value={selectedFuncionario} onChange={(e) => setSelectedFuncionario(e.target.value)}>
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.nome}>{funcionario.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Cargo:</label>
          <select value={selectedCargo} onChange={(e) => setSelectedCargo(e.target.value)}>
            <option value="">Selecione um cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.nome}>{cargo.nome}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="botoes-centrais">
        <button onClick={registrarEntrada} className="botao-entrada">Registrar Entrada</button>
        <button onClick={registrarSaida} className="botao-saida">Registrar Saída</button>
      </div>
      <div className="historia-registros">
        <h3>Histórico de Registros</h3>
        <ul>
          {registros.map((registro, index) => (
            <li key={index}>
              {registro.tipo} às {registro.hora} - {registro.funcionario} ({registro.cargo})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
