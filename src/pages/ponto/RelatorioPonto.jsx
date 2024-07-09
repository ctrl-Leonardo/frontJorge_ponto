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
    //  chamada para buscar os registros do backend
  
    const dataExemplo = [
      { funcionario: 'João', cargo: 'Desenvolvedor', hora: '08:00', data: '2023-01-01' },
      { funcionario: 'Maria', cargo: 'Designer', hora: '09:30', data: '2023-01-01' },
      { funcionario: 'José', cargo: 'Analista', hora: '11:15', data: '2023-01-01' },
     
        { funcionario: 'Patrick', cargo: 'Tester', hora: '08:00', data: '2023-01-01' },
        { funcionario: 'Alice', cargo: 'Desenvolvedora', hora: '09:00', data: '2023-01-02' },
        { funcionario: 'Carlos', cargo: 'Gerente', hora: '07:30', data: '2023-01-03' },
        { funcionario: 'Beatriz', cargo: 'Designer', hora: '08:45', data: '2023-01-04' },
        { funcionario: 'David', cargo: 'Analista', hora: '09:15', data: '2023-01-05' },
        { funcionario: 'Eduarda', cargo: 'Tester', hora: '10:00', data: '2023-01-06' },
        { funcionario: 'Fernando', cargo: 'Desenvolvedor', hora: '07:50', data: '2023-01-07' },
        { funcionario: 'Gabriela', cargo: 'Gerente', hora: '08:30', data: '2023-01-08' },
        { funcionario: 'Henrique', cargo: 'Analista', hora: '09:20', data: '2023-01-09' },
        { funcionario: 'Isabela', cargo: 'Desenvolvedora', hora: '08:10', data: '2023-01-10' },
        { funcionario: 'João', cargo: 'Tester', hora: '07:40', data: '2023-01-11' },
        { funcionario: 'Laura', cargo: 'Designer', hora: '09:50', data: '2023-01-12' },
        { funcionario: 'Marcos', cargo: 'Gerente', hora: '08:00', data: '2023-01-13' },
        { funcionario: 'Natália', cargo: 'Analista', hora: '08:25', data: '2023-01-14' },
        { funcionario: 'Otávio', cargo: 'Desenvolvedor', hora: '08:35', data: '2023-01-15' },
        { funcionario: 'Paula', cargo: 'Designer', hora: '09:10', data: '2023-01-16' },
        { funcionario: 'Ricardo', cargo: 'Gerente', hora: '07:45', data: '2023-01-17' },
        { funcionario: 'Sofia', cargo: 'Tester', hora: '08:05', data: '2023-01-18' },
        { funcionario: 'Thiago', cargo: 'Analista', hora: '09:30', data: '2023-01-19' },
       
      ];
      
    setRegistros(dataExemplo); // Substitua por setRegistros(data) quando usar dados reais
  };

  const gerarXML = () => {
    const registrosXML = registros.map(registro => `
      <registro>
        <funcionario>${registro.funcionario}</funcionario>
        <cargo>${registro.cargo}</cargo>
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
      <div>
        <label>Selecionar Data:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <button onClick={gerarXML} className="botao-xml">Baixar XML</button>
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
