import React, { useState, useEffect } from 'react';
import "./RelatorioPonto.css";

export default function RegistroPonto() {
  const [registros, setRegistros] = useState([]);
  const [horaAtual, setHoraAtual] = useState(new Date().toLocaleTimeString());
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');

  useEffect(() => {
    fetchFuncionarios();
    fetchCargos();
  }, []);

  const fetchFuncionarios = async () => {
    const response = await fetch('/api/funcionarios');
    const data = await response.json();
    setFuncionarios(data);
  };

  const fetchCargos = async () => {
    const response = await fetch('/api/cargos');
    const data = await response.json();
    setCargos(data);
  };

  const horaEntrada = () => {
    const novoRegistro = {
      tipo: 'Entrada',
      hora: new Date().toLocaleTimeString(),
      funcionario: selectedFuncionario,
      cargo: selectedCargo,
      data: new Date().toLocaleDateString()
    };
    setRegistros([...registros, novoRegistro]);
  };

  const horaSaida = () => {
    const novoRegistro = {
      tipo: 'Saída',
      hora: new Date().toLocaleTimeString(),
      funcionario: selectedFuncionario,
      cargo: selectedCargo,
      data: new Date().toLocaleDateString()
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
        <button onClick={horaEntrada} className="botao-entrada">Registrar Entrada</button>
        <button onClick={horaSaida} className="botao-saida">Registrar Saída</button>
        
      </div>
      <div className="histor-registros">
        <h3>Histórico de Registros</h3>
        <table className="registro-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Hora</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.funcionario}</td>
                <td>{registro.hora}</td>
                <td>{registro.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
