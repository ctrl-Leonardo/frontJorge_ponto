import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Listagem = () => {
  const [funcionarios, setFuncionario] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    nome: '',
    cpf: '',
    id: '',
  });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFuncionario();
  }, []);

  const fetchFuncionario = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('/api/funcionarios'); // URL da sua API
      setFuncionario(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisaChange = (e) => {
    const { name, value } = e.target;
    setPesquisa({
      ...pesquisa,
      [name]: value,
    });
  };

  const handlePesquisar = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('/api/funcionarios', {
        params: pesquisa,
      });
      setFuncionario(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

 

  

  return (
    <Container className="mt-5">
      <Row className="justify-content-between mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por ID"
            name="id"
            value={pesquisa.id}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por Nome"
            name="nome"
            value={pesquisa.nome}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por Cargo"
            name="cargo"
            value={pesquisa.cargo}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handlePesquisar} variant="botao-pesquisar">
            Pesquisar
          </Button>
        </Col>
        <Col md={1}>
          <Button variant="success" onClick={() => navigate('/cadastro')}>
            Novo
          </Button>
        </Col>
      </Row>
      {carregando ? (
        <div>Carregando...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Funcionario</th>
              <th>Hora</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
           {/*} {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.funcionario}</td>
                <td>{funcionario.hora}</td>
                <td>{funcionario.data}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => history.push(`/editar/${funcionario.id}`)}
                  >
                    Editar
                  </Button>
            
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Listagem;