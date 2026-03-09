document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    loadProjects();
    initContactForm();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

/* --- TEMA (DARK/LIGHT) --- */
function initThemeManager() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Checa preferência salva ou usa dark como default
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        // Pequena animação no botão
        themeBtn.style.transform = 'scale(0.8)';
        setTimeout(() => themeBtn.style.transform = 'scale(1)', 150);
    });
}

/* --- MOBILE MENU --- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);

        // Toggle mobile nav class (precisamos adicionar a classe 'active' no css)
        nav.classList.toggle('active');

        // Anim hamburger lines
        if (!isExpanded) {
            hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    });

    // Fecha o menu ao clicar num link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                hamburger.click();
            }
        });
    });
}

/* --- SCROLLING PLÁCIDO & HEADER --- */
function initSmoothScrolling() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --- SCROLL ANIMATIONS --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Aplica as classes a elementos que queremos animar on scroll
    document.querySelectorAll('.section-header, .about-content, .contact-info, .contact-form-wrapper').forEach(el => {
        el.classList.add('scroll-hidden');
        observer.observe(el);
    });
}

/* --- CARREGAR PROJETOS DA API --- */
async function loadProjects() {
    const container = document.getElementById('projects-container');

    try {
        const projects = await window.PortfolioAPI.fetchProjects();

        if (projects.length === 0) {
            container.innerHTML = '<p>Nenhum projeto encontrado no momento.</p>';
            return;
        }

        container.innerHTML = ''; // Limpa estado de 'loading'

        projects.forEach((proj, index) => {
            const delay = index * 0.1; // Staggered animation
            const card = document.createElement('div');
            card.className = `project-card scroll-hidden`;
            card.style.transitionDelay = `${delay}s`;

            const tagsHtml = proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-img">
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                    <div class="project-overlay">
                        <a href="${proj.link}" class="icon-link" aria-label="Ver Projeto" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                        <a href="${proj.github}" class="icon-link" aria-label="Código Fonte" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Força reflow e aplica a classe in-view para ativar transição, ou usa observer
        });

        // Observa novos cards para animar no scroll
        const newObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    newObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => newObserver.observe(card));

    } catch (error) {
        container.innerHTML = '<p class="error-msg">Erro ao carregar os projetos. Tente novamente mais tarde.</p>';
    }
}

/* --- CONTACT FORM --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Estado de Loading
        submitBtn.disabled = true;
        btnText.style.opacity = '0.5';
        spinner.classList.remove('hidden');
        formMessage.className = 'form-message'; // Remove classes anteriores
        formMessage.textContent = '';

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        try {
            const response = await window.PortfolioAPI.sendContactMessage(data);

            formMessage.textContent = response.message;
            formMessage.classList.add('success');
            form.reset(); // Limpa o formulário
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.classList.add('error');
        } finally {
            // Restaura o botão
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            spinner.classList.add('hidden');

            // Oculta msg após 5s
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.style.opacity = '1';
                    formMessage.className = 'form-message';
                }, 300);
            }, 5000);
        }
    });
}
