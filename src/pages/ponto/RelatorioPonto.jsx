import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RelatorioPonto.css'; // Importe o arquivo CSS de estilos

export default function RelatorioPonto() {
  const [registros, setRegistros] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchRegistros();
  }, [selectedDate]);

  const fetchRegistros = async () => {
    // Aqui você faria a chamada para buscar os registros do backend
    // Simulando com dados de exemplo
    const dataExemplo = [
      { funcionario: 'João', cargo: 'Desenvolvedor', hora: '08:00', data: '2023-01-01' },
      { funcionario: 'Maria', cargo: 'Designer', hora: '09:30', data: '2023-01-01' },
      { funcionario: 'José', cargo: 'Analista', hora: '11:15', data: '2023-01-01' },
    ];
    setRegistros(dataExemplo); // Substitua por setRegistros(data) quando usar dados reais
  };

  return (
    <div className="relatorio-ponto-container">
      <h2>Relatório de Ponto</h2>
      <div>
        <label>Selecionar Data:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="mm/dd/yyyy"
        />
      </div>
      <div>
        <h3>Histórico de Registros</h3>
        <table className="registro-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Cargo</th>
              <th>Hora</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.funcionario}</td>
                <td>{registro.cargo}</td>
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
