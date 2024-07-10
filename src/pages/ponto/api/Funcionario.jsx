import api from './http://localhost:8080/api/funcionarios';

export const listarFuncionarios = async () => {
  try {
    const response = await api.get('/funcionarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    throw error;
  }
};

export const adicionarFuncionario = async (funcionarioDTO) => {
  try {
    const response = await api.post('/funcionarios', funcionarioDTO);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar funcionário:', error);
    throw error;
  }
};