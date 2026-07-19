/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC (Vanilla JS)
   Style: Motion-Driven Micro-interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Project Details Database (for Modal) ---
  const projectsData = {
    creditguard: {
      title: "CreditGuard",
      badge: "Deep Learning / Anomaly Detection",
      desc: "A hybrid real-time fraud detection and anomaly intelligence system designed for financial security. It combines supervised classifiers with a PyTorch-based autoencoder to capture subtle, non-linear fraud patterns and zero-day anomalies.",
      bullets: [
        "Built a hybrid fraud detection pipeline pairing XGBoost classification with a PyTorch deep autoencoder.",
        "Applied cost-sensitive learning weights and SMOTE oversampling to solve extreme class imbalance.",
        "Engineered a low-latency C++ (STL-based) scoring module for sub-millisecond edge inference, integrated into Python via pybind11.",
        "Tracked experiments via MLflow, saved model states in MySQL, and served real-time predictions via FastAPI and Docker."
      ],
      stack: ["Python", "C++", "PyTorch", "MySQL", "FastAPI", "Docker", "MLflow", "Power BI"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [85, 92, 89, 96, 94, 98, 99] // Simulated telemetry values (e.g., accuracy % over epochs)
    },
    predictai: {
      title: "PredictAI",
      badge: "LSTM / Predictive Maintenance",
      desc: "An industrial equipment health monitoring system that leverages deep learning to predict failures. By analyzing multivariate sensor streams, it forecasts remaining-useful-life (RUL) and outputs proactive maintenance schedules to avoid costly equipment downtime.",
      bullets: [
        "Built a deep LSTM model to predict equipment failure states from noisy, multivariate sensor time-series data.",
        "Engineered time-series features using rolling statistics and FFT-based frequency components to isolate degradation cues.",
        "Created an scalable preprocessing pipeline using NumPy, Pandas, and SciPy to process raw sensor feeds.",
        "Used MLflow for experiment registry and DVC (Data Version Control) for dataset tracking across training cycles.",
        "Deployed an interactive Streamlit dashboard simulating live sensor streams with automated remaining-useful-life (RUL) alerts."
      ],
      stack: ["Python", "TensorFlow", "NumPy", "Pandas", "SciPy", "Streamlit", "DVC", "MLflow"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [42, 58, 67, 73, 79, 84, 88] // Simulated values (e.g., remaining useful life hours prediction confidence)
    },
    pulseboard: {
      title: "PulseBoard",
      badge: "NLP / Business Intelligence",
      desc: "A customer feedback analytics intelligence platform. It collects multilingual customer feedback, extracts emotional categories and overall sentiment scores via NLP transformers, and feeds a MySQL data warehouse connected to Power BI dashboards.",
      bullets: [
        "Built an NLP feedback pipeline using Hugging Face transformers and NLTK for sentiment and theme extraction.",
        "Designed a MySQL-backed data warehouse schema optimized for aggregated sentiment trend queries.",
        "Exposed real-time inference routes via FastAPI and automated Excel reports for stakeholders.",
        "Created interactive Power BI and Tableau dashboards highlighting regional customer churn risks."
      ],
      stack: ["Python", "Hugging Face", "NLTK", "MySQL", "FastAPI", "Power BI", "Tableau", "Excel"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [15, 30, 48, 62, 70, 75, 82] // Simulated values (e.g., feedback ingestion volumes / min)
    },
    agentiq: {
      title: "AgentIQ",
      badge: "LangGraph / Corrective RAG",
      desc: "A highly autonomous agentic assistant built using LangGraph. It handles multi-step reasoning, schedules document retrieval over vector + keyword databases, evaluates document relevance, and calls web search APIs when information is insufficient.",
      bullets: [
        "Developed a multi-step agent using LangGraph to orchestrate reasoning, vector searches, and tool operations.",
        "Implemented Corrective RAG: agent grades document chunks and automatically queries web search if confidence is low.",
        "Exposed external local tools (calculator, SQL explorer, web search) via MCP (Model Context Protocol).",
        "Created an automated evaluation pipeline using RAGAS to measure answer faithfulness and context precision."
      ],
      stack: ["Python", "LangGraph", "LangChain", "RAGAS", "MCP", "JupyterLab", "Rest APIs"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [60, 75, 81, 88, 92, 95, 97] // Simulated values (e.g., retrieval precision % over test set iterations)
    }
  };


  // --- 1. Theme Manager (Light / Dark Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve theme preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
  } else {
    // Default to dark mode as recommended by style guide
    body.classList.add('dark-mode');
  }

  // Toggle Action
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const activeTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', activeTheme);
  });


  // --- 2. Floating Navbar Hide/Show on Scroll ---
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    // Don't hide navbar if close to top
    if (currentScrollY < 100) {
      navbar.classList.remove('nav-hidden');
    } else if (currentScrollY > lastScrollY) {
      navbar.classList.add('nav-hidden'); // Scrolling down
    } else {
      navbar.classList.remove('nav-hidden'); // Scrolling up
    }
    lastScrollY = currentScrollY;
  });


  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const lineMid = document.getElementById('line-mid');
  const lineTop = document.getElementById('line-top');
  const lineBot = document.getElementById('line-bot');

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('mobile-open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      // Animate hamburger to X
      lineMid.style.opacity = '0';
      lineTop.style.transform = 'translateY(6px) rotate(45deg)';
      lineBot.style.transform = 'translateY(-6px) rotate(-45deg)';
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.backgroundColor = 'var(--color-glass-bg)';
      navMenu.style.padding = '2rem';
      navMenu.style.borderBottom = '1px solid var(--color-glass-border)';
      navMenu.style.backdropFilter = 'blur(16px)';
      navMenu.style.webkitBackdropFilter = 'blur(16px)';
    } else {
      // Reset hamburger
      lineMid.style.opacity = '1';
      lineTop.style.transform = 'none';
      lineBot.style.transform = 'none';
      navMenu.removeAttribute('style');
    }
  });

  // Close mobile menu when clicking a link
  navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link') && navMenu.classList.contains('mobile-open')) {
      navMenu.classList.remove('mobile-open');
      lineMid.style.opacity = '1';
      lineTop.style.transform = 'none';
      lineBot.style.transform = 'none';
      navMenu.removeAttribute('style');
    }
  });


  // --- 4. Interactive Bento Card Mouse Tracking Hover ---
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // --- 5. Scroll Reveal Animation via IntersectionObserver ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating once to prevent repeated triggers on scroll
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- 6. Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from other buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Fade out transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(15px)';
        
        setTimeout(() => {
          const cardCategory = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCategory === filterVal) {
            card.style.display = 'flex';
            // Trigger redraw/reflow
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'none';
          } else {
            card.style.display = 'none';
          }
        }, 200); // Matches transitions
      });
    });
  });


  // --- 7. Project Details Modal Logic ---
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = modal.querySelector('.modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  
  const modalBadge = document.getElementById('modal-project-badge');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalBullets = document.getElementById('modal-project-bullets');
  const modalStack = document.getElementById('modal-project-stack');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const modalIpynbLink = document.getElementById('modal-ipynb-link');
  const mockChart = document.getElementById('modal-mock-chart');

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Get parent project card or attribute
      const card = btn.closest('.project-card');
      const projectKey = btn.getAttribute('data-project');
      const project = projectsData[projectKey];

      if (!project) return;

      // Populate details
      modalBadge.textContent = project.badge;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      
      // Bullets
      modalBullets.innerHTML = '';
      project.bullets.forEach(bullet => {
        const li = document.createElement('li');
        li.textContent = bullet;
        modalBullets.appendChild(li);
      });

      // Technical Stack Tags
      modalStack.innerHTML = '';
      project.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = tech;
        modalStack.appendChild(span);
      });

      // Links (set structure/placeholder paths)
      modalRepoLink.href = project.repo;
      modalRepoLink.classList.remove('disabled');
      
      if (project.notebook !== '#') {
        modalIpynbLink.href = project.notebook;
        modalIpynbLink.classList.remove('disabled');
      } else {
        modalIpynbLink.removeAttribute('href');
        modalIpynbLink.classList.add('disabled');
      }

      // Draw Mock Telemetry Charts
      drawMockChart(project.analytics);

      // Open tab resets to github repo
      resetModalTabs();

      // Show Modal overlay
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden'; // Disable scroll on body
    });
  });

  // Reset tab active states inside modal panel
  function resetModalTabs() {
    const tabs = modal.querySelectorAll('.panel-tab-btn');
    const panes = modal.querySelectorAll('.tab-pane');
    
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    
    tabs[0].classList.add('active');
    panes[0].classList.add('active');
  }

  // Draw simulated telemetry bar graph
  function drawMockChart(values) {
    mockChart.innerHTML = '';
    const maxVal = Math.max(...values);
    values.forEach(val => {
      const heightPercent = (val / maxVal) * 80; // Scale down so labels fit above
      const bar = document.createElement('div');
      bar.className = 'mock-bar';
      bar.setAttribute('data-val', val);
      bar.style.height = '0%'; // Start at 0% for transition trigger
      mockChart.appendChild(bar);
      
      // Animate height render
      setTimeout(() => {
        bar.style.height = `${heightPercent}%`;
      }, 100);
    });
  }

  // Close Modal Actions
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = 'auto'; // Re-enable body scroll
  };

  modalCloseBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key listener to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // --- 8. Tab Toggles in Modal Panel ---
  const tabBtns = modal.querySelectorAll('.panel-tab-btn');
  const tabPanes = modal.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabId = `tab-${btn.getAttribute('data-tab')}`;
      document.getElementById(tabId).classList.add('active');
    });
  });

  // --- 9. Form Submission Handling (Mocked Contact Form) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Simulate network request delays
      setTimeout(() => {
        alert('Thank you for reaching out! This message is mock-transmitted successfully.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
      }, 1200);
    });
  }

});
