document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initMobileMenu();
    renderCourses();
    renderProjects();
    initContactForm();
    applyGreetingRules();

    document.getElementById('year').textContent = new Date().getFullYear();
});

/* =========================================
   REQUISITO: ESTRUTURA DE DECISÃO (IF/ELSE)
   ========================================= */
function applyGreetingRules() {
    const greetingElement = document.getElementById('dynamic-greeting');
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greetingText = "";

    // If/Else de validação do horário
    if (currentHour >= 5 && currentHour < 12) {
        greetingText = "☀️ Bom dia! Bem-vindo ao meu Portfólio.";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingText = "🌤️ Boa tarde! Bem-vindo ao meu Portfólio.";
    } else {
        greetingText = "🌙 Boa noite! Bem-vindo ao meu Portfólio.";
    }

    greetingElement.textContent = greetingText;
}

/* =========================================
   REQUISITO: ARRAYS DE DADOS
   ========================================= */
const portfolioData = {
    courses: [
        { name: "Análise e Desenvolvimento de Sistemas", institution: "FATEC São José dos Campos", period: "2023 - 2026", type: "academic" },
        { name: "React e TypeScript", institution: "Rocketseat", period: "2024", type: "extra" },
        { name: "Engenharia de Prompt e IA Aplicada", institution: "Alura", period: "2024", type: "extra" },
        { name: "Clean Architecture & SOLID", institution: "Udemy", period: "2023", type: "extra" }
    ],
    projects: [
        {
            title: "Zenix Deep Dive (ZDD)",
            description: "Plataforma focada em análise gerencial e otimização de frotas e seguros corporativos, usando arquitetura limpa.",
            tags: ["React", "Node.js", "Arquitetura"],
            link: "#",
            github: "#"
        },
        {
            title: "IA Condominial",
            description: "Sistema autônomo baseado em IA para gerenciamento de ocorrências, aprovação de verbas e balancetes em condomínios.",
            tags: ["AI", "Python", "Dashboard"],
            link: "#",
            github: "#"
        },
        {
            title: "Gestão FATEC",
            description: "Projeto acadêmico de alta complexidade contendo backlog dinâmico e gestão de sprints integrados com APIs abertas.",
            tags: ["Vanilla JS", "HTML", "CSS"],
            link: "#",
            github: "#"
        }
    ]
};

/* =========================================
   REQUISITOS: REPETIÇÃO (FOR) E FUNÇÕES
   ========================================= */
function renderCourses() {
    const container = document.getElementById('courses-container');
    if (!container) return;
    container.innerHTML = '';

    // Uso do FOR para renderizar cursos do array
    for (let i = 0; i < portfolioData.courses.length; i++) {
        const course = portfolioData.courses[i];

        const card = document.createElement('div');
        card.className = 'course-card glass-card';
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Instituição:</strong> ${course.institution}</p>
            <p><strong>Período:</strong> ${course.period}</p>
        `;
        container.appendChild(card);
    }
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = '';

    // Uso do REPETIDOR para renderizar projetos do array
    for (let i = 0; i < portfolioData.projects.length; i++) {
        const proj = portfolioData.projects[i];

        // Simulador de Forzinho em tags
        let tagsHtml = '';
        for (let j = 0; j < proj.tags.length; j++) {
            tagsHtml += `<span class="tag">${proj.tags[j]}</span>`;
        }

        const card = document.createElement('div');
        card.className = 'project-card glass-card';
        card.innerHTML = `
            <div class="project-info">
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

/* =========================================
   FUNÇÕES ADICIONAIS: FORMULÁRIO E ESTADO
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const msgBox = document.getElementById('form-message');

        // REQUISITO: DECISÃO (VALIDAÇÃO IF/ELSE)
        if (name === '' || email === '' || message === '') {
            msgBox.innerHTML = '<span style="color: #ff4a4a;">Por favor, preencha todos os campos!</span>';
        } else if (!email.includes('@')) {
            msgBox.innerHTML = '<span style="color: #ff4a4a;">Por favor, insira um e-mail válido!</span>';
        } else {
            msgBox.innerHTML = '<span style="color: #4aff8a;">Mensagem enviada com sucesso! Logo entrarei em contato.</span>';
            form.reset();
        }

        setTimeout(() => msgBox.innerHTML = '', 4000);
    });
}

function initThemeManager() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    htmlElement.setAttribute('data-theme', 'dark');

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}
