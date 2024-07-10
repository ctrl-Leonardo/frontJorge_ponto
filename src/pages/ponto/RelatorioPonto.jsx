import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RelatorioPonto.css'; 

export default function RelatorioPonto() {
  const [registros, setRegistros] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [mensagemSemRegistros, setMensagemSemRegistros] = useState('');

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/espelhofuncionario', {
        params: {
          funcionario: selectedFuncionario,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      setRegistros(response.data);
      setMensagemSemRegistros('');
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setRegistros([]);
      setMensagemSemRegistros('Nenhum registro encontrado.');
    }
  };

  const gerarXML = () => {
    const registrosXML = registros.map(registro => `
      <registro>
        <funcionario>${registro.funcionario}</funcionario>
        <tipo>${registro.tipo}</tipo>
        <hora>${registro.hora}</hora>
        <data>${registro.data}</data>
      </registro>
    `).join('');

    const xmlContent = `
      <registros>
        ${registrosXML}
      </registros>
    `;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registros.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relatorio-ponto-container">
      <h2>Relatório de Ponto</h2>
      <div className="filtros-container">
        <div>
          <label>Selecionar Funcionário:</label>
          <select
            value={selectedFuncionario}
            onChange={(e) => setSelectedFuncionario(e.target.value)}
          >
            <option value="">Todos</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Data Inicial:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label>Data Final:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <button onClick={fetchRegistros} className="botao-pesquisar">Pesquisar</button>
      </div>
      {mensagemSemRegistros && (
        <p className="mensagem-sem-registros">{mensagemSemRegistros}</p>
      )}
      <button onClick={gerarXML} className="botao-xml">Baixar XML</button>
      <div>
        <h3>Histórico de Registros</h3>
        <table className="registro-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Tipo</th>
              <th>Hora</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.funcionario}</td>
                <td>{registro.tipo}</td>
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
