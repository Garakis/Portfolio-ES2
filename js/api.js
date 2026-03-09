// Configuração da API (Agora Estática)
const API_URL = './data/projects.json';

/**
 * Busca a lista de projetos do JSON estático
 * @returns {Promise<Array>} Lista de projetos
 */
async function fetchProjects() {
    try {
        // Usa caminhos relativos para garantir que funcione no GitHub Pages
        // dependendo de onte está rodando (na raiz ou em um subdiretório)
        const response = await fetch('./data/projects.json');
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
 * Envia mensagem de contato simulando um backend
 * @param {Object} data { name, email, message }
 * @returns {Promise<Object>} Resposta da API
 */
async function sendContactMessage(data) {
    return new Promise((resolve, reject) => {
        // Validação básica do lado do cliente
        if (!data.name || !data.email || !data.message) {
            return reject(new Error('Todos os campos são obrigatórios.'));
        }

        console.log(`[Formulário de Contato Simulado] Nova mensagem de ${data.name} (${data.email}): ${data.message}`);

        // Simula delay de rede de 1 segundo e responde sucesso
        setTimeout(() => {
            resolve({ success: true, message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' });
        }, 1000);
    });
}

// Exporta as funções globalmente ou para uso no main.js
window.PortfolioAPI = { fetchProjects, sendContactMessage };
