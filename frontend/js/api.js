// Configuração da API
const API_URL = 'http://localhost:3000/api';

/**
 * Busca a lista de projetos do backend
 * @returns {Promise<Array>} Lista de projetos
 */
async function fetchProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) {
            throw new Error('Falha na resposta da API');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        return []; // Retorna array vazio em caso de erro para não quebrar a UI
    }
}

/**
 * Envia mensagem de contato para o backend
 * @param {Object} data { name, email, message }
 * @returns {Promise<Object>} Resposta da API
 */
async function sendContactMessage(data) {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Erro ao enviar mensagem');
        }

        return result;
    } catch (error) {
        console.error('Erro no envio de contato:', error);
        throw error;
    }
}

// Exporta as funções globalmente ou para uso no main.js
window.PortfolioAPI = { fetchProjects, sendContactMessage };
