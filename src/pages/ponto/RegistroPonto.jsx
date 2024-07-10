import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./RelatorioPonto.css";

export default function RegistroPonto() {
  const [registros, setRegistros] = useState([]);
  const [horaAtual, setHoraAtual] = useState(new Date().toLocaleTimeString());
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('Entrada');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      setError("Erro ao buscar os funcionários: " + error.message);
      console.error("Erro ao buscar os funcionários:", error);
    }
  };

  const registrarPonto = async () => {
    const novoRegistro = {
      tipo: selectedTipo,
      hora: new Date().toLocaleTimeString(),
      funcionarioId: selectedFuncionarioId,
      data: new Date().toLocaleDateString()
    };

    console.log('Tentando registrar o seguinte ponto:', novoRegistro); // Debug para verificar o objeto sendo enviado

    try {
      const response = await axios.post('http://localhost:8080/api/registroponto', novoRegistro, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRegistros([...registros, response.data]);
      setError(null);
    } catch (error) {
      setError("Erro ao registrar o ponto: " + error.message);
      console.error("Erro ao registrar o ponto:", error);
    }
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
          <select value={selectedFuncionarioId} onChange={(e) => setSelectedFuncionarioId(e.target.value)}>
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
        </div>
      </div>
      <div className="botoes-centrais">
        <button onClick={registrarPonto} className="botao-entrada">Registrar Ponto</button>
      </div>
      <div className="historico-registros">
        <h3>Histórico de Registros</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className="registro-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Funcionário</th>
              <th>ID</th>
              <th>Hora</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.tipo}</td>
                <td>{funcionarios.find(f => f.id === registro.funcionarioId)?.nome}</td>
                <td>{registro.funcionarioId}</td>
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
