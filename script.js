/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC (Industrial Cyberpunk Redesign)
   Aesthetic: Telemetry + Interactive Blueprints + Particle Nodes
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Project Details Database (for Modal) ---
  const projectsData = {
    creditguard: {
      title: "CreditGuard",
      badge: "Deep Learning / Anomaly Detection",
      desc: "Developed an end-to-end anomaly detection pipeline pairing a supervised classifier with a PyTorch Autoencoder. Engineered features from high-dimensional transaction logs to achieve high precision in real-time fraud forecasting.",
      bullets: [
        "Built a hybrid fraud detection pipeline pairing XGBoost classification with a PyTorch deep autoencoder.",
        "Applied cost-sensitive learning weights and SMOTE oversampling to solve extreme class imbalance.",
        "Engineered a low-latency C++ (STL-based) scoring module for sub-millisecond edge inference, integrated into Python via pybind11.",
        "Tracked experiments via MLflow, saved model states in MySQL, and served real-time predictions via FastAPI and Docker."
      ],
      stack: ["Python", "C++", "PyTorch", "MySQL", "FastAPI", "Docker", "MLflow", "Power BI"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [85, 92, 89, 96, 94, 98, 99]
    },
    predictai: {
      title: "PredictAI",
      badge: "LSTM / Predictive Maintenance",
      desc: "Built a Time-Series Predictive Maintenance engine using LSTM networks to analyze multi-sensor telemetry data streams. Implemented rolling window feature extraction to predict mechanical component failures before downtime occurs.",
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
      analytics: [42, 58, 67, 73, 79, 84, 88]
    },
    pulseboard: {
      title: "PulseBoard",
      badge: "NLP / Business Intelligence",
      desc: "Engineered a text analytics dashboard transforming raw multilingual feedback into structured sentiment insights using Hugging Face pipelines. Designed automated MySQL extract-transform-load (ETL) pipelines integrated with interactive Power BI analytical dashboards.",
      bullets: [
        "Built an NLP feedback pipeline using Hugging Face transformers and NLTK for sentiment and theme extraction.",
        "Designed a MySQL-backed data warehouse schema optimized for aggregated sentiment trend queries.",
        "Exposed real-time inference routes via FastAPI and automated Excel reports for stakeholders.",
        "Created interactive Power BI and Tableau dashboards highlighting regional customer churn risks."
      ],
      stack: ["Python", "Hugging Face", "NLTK", "MySQL", "FastAPI", "Power BI", "Tableau", "Excel"],
      repo: "https://github.com/Kharshith9999/Portfolio-Website",
      notebook: "#",
      analytics: [15, 30, 48, 62, 70, 75, 82]
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
      analytics: [60, 75, 81, 88, 92, 95, 97]
    }
  };


  // --- 1. Theme Manager (Accent Selector & Dark/Light Mode Toggle) ---
  const themeToggle = document.getElementById('theme-toggle');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // 1.1 Accent Switcher
  const savedAccent = localStorage.getItem('portfolio-accent') || 'orange';
  if (savedAccent === 'green') {
    body.classList.remove('accent-orange');
    body.classList.add('accent-green');
  } else {
    body.classList.remove('accent-green');
    body.classList.add('accent-orange');
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('accent-orange')) {
      body.classList.remove('accent-orange');
      body.classList.add('accent-green');
      localStorage.setItem('portfolio-accent', 'green');
    } else {
      body.classList.remove('accent-green');
      body.classList.add('accent-orange');
      localStorage.setItem('portfolio-accent', 'orange');
    }
  });

  // 1.2 Dark/Light Mode Switcher
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }


  // --- 2. Floating Navbar Hide/Show on Scroll ---
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
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
      lineMid.style.opacity = '1';
      lineTop.style.transform = 'none';
      lineBot.style.transform = 'none';
      navMenu.removeAttribute('style');
    }
  });

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
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- 6. Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.97) translateY(10px)';
        
        setTimeout(() => {
          const cardCategory = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCategory === filterVal) {
            card.style.display = 'flex';
            card.offsetHeight; // Reflow
            card.style.opacity = '1';
            card.style.transform = 'none';
          } else {
            card.style.display = 'none';
          }
        }, 200);
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

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const project = projectsData[projectKey];

      if (!project) return;

      modalBadge.textContent = project.badge;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      
      modalBullets.innerHTML = '';
      project.bullets.forEach(bullet => {
        const li = document.createElement('li');
        li.textContent = bullet;
        modalBullets.appendChild(li);
      });

      modalStack.innerHTML = '';
      project.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = tech;
        modalStack.appendChild(span);
      });

      modalRepoLink.href = project.repo;
      modalRepoLink.classList.remove('disabled');
      
      if (project.notebook !== '#') {
        modalIpynbLink.href = project.notebook;
        modalIpynbLink.classList.remove('disabled');
      } else {
        modalIpynbLink.removeAttribute('href');
        modalIpynbLink.classList.add('disabled');
      }

      drawMockChart(project.analytics);
      resetModalTabs();

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
    });
  });

  function resetModalTabs() {
    const tabs = modal.querySelectorAll('.panel-tab-btn');
    const panes = modal.querySelectorAll('.tab-pane');
    
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    
    tabs[0].classList.add('active');
    panes[0].classList.add('active');
  }

  function drawMockChart(values) {
    mockChart.innerHTML = '';
    const maxVal = Math.max(...values);
    values.forEach(val => {
      const heightPercent = (val / maxVal) * 80;
      const bar = document.createElement('div');
      bar.className = 'mock-bar';
      bar.setAttribute('data-val', val);
      bar.style.height = '0%';
      mockChart.appendChild(bar);
      
      setTimeout(() => {
        bar.style.height = `${heightPercent}%`;
      }, 100);
    });
  }

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = 'auto';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

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

  // Contact Form Payload Signal Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Transmitting...</span>';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('SIGNAL DECODED: Thank you for establishing contact. Payload received successfully.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
      }, 1200);
    });
  }


  // ==========================================================================
  // --- 8. Interactive Hero Canvas Network Graph ---
  // ==========================================================================
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = window.innerWidth);
    let height = (heroCanvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    
    // Mouse coords
    let mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = heroCanvas.width = window.innerWidth;
      height = heroCanvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
      }

      update() {
        // Bounce on borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Mouse attraction/interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Attract slightly
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
            this.radius = this.baseRadius * (1 + force * 1.5);
          } else {
            this.radius = this.baseRadius;
          }
        } else {
          this.radius = this.baseRadius;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Get active theme primary color
        const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
        ctx.fillStyle = accentColor;
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Loop
    function animateHero() {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections (thin grid lines)
      const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < 120) {
            const alpha = (120 - dist) / 120 * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accentColor.replace('#', 'rgba('); // Convert hex to rgba helper
            // We can just draw it using hex with globalAlpha
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      requestAnimationFrame(animateHero);
    }
    animateHero();
  }


  // ==========================================================================
  // --- 9. Skills Tech Stack Blueprint Connections ---
  // ==========================================================================
  const blueprintSvg = document.getElementById('blueprint-svg');
  const skillTags = document.querySelectorAll('.skill-tag');
  const nodes = document.querySelectorAll('.blueprint-node');
  
  // Custom links: tech hover triggers highlighting in another node cluster
  // e.g. Hovering LangGraph highlights PyTorch and FastAPI
  const techConnections = {
    langgraph: ['pytorch', 'fastapi', 'github'],
    langchain: ['python', 'rag', 'mcp'],
    rag: ['python', 'scikit', 'mysql'],
    mcp: ['python', 'fastapi', 'docker'],
    pytorch: ['python', 'tensorflow', 'scikit', 'numpy'],
    tensorflow: ['python', 'pytorch', 'scikit'],
    fastapi: ['python', 'cpp', 'docker', 'powerbi'],
    cpp: ['python', 'docker', 'ansys'],
    ansys: ['numpy', 'docker'],
    powerbi: ['mysql', 'excel', 'tableau']
  };

  function drawConnections(activeTag) {
    if (!blueprintSvg) return;
    blueprintSvg.innerHTML = '';
    const activeTech = activeTag.getAttribute('data-tech');
    const connectedTechs = techConnections[activeTech];

    if (!connectedTechs) return;

    const svgRect = blueprintSvg.getBoundingClientRect();
    const activeRect = activeTag.getBoundingClientRect();
    
    // Center point of active tag
    const x1 = activeRect.left - svgRect.left + activeRect.width / 2;
    const y1 = activeRect.top - svgRect.top + activeRect.height / 2;

    const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();

    connectedTechs.forEach(targetTech => {
      const targetTag = document.querySelector(`.skill-tag[data-tech="${targetTech}"]`);
      if (!targetTag) return;

      // Highlight target tag
      targetTag.style.borderColor = accentColor;
      targetTag.style.color = '#FFFFFF';
      targetTag.style.boxShadow = `0 0 8px var(--color-glow)`;

      const targetRect = targetTag.getBoundingClientRect();
      const x2 = targetRect.left - svgRect.left + targetRect.width / 2;
      const y2 = targetRect.top - svgRect.top + targetRect.height / 2;

      // Create SVG line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', accentColor);
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '5,5');
      line.setAttribute('opacity', '0.6');
      
      // Animate line drawing
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'stroke-dashoffset');
      animate.setAttribute('values', '50;0');
      animate.setAttribute('dur', '1.5s');
      animate.setAttribute('repeatCount', 'indefinite');
      line.appendChild(animate);

      blueprintSvg.appendChild(line);

      // Highlight parent node box
      const parentNode = targetTag.closest('.blueprint-node');
      if (parentNode) {
        parentNode.classList.add('connected-node');
      }
    });
  }

  function clearConnections() {
    if (!blueprintSvg) return;
    blueprintSvg.innerHTML = '';
    skillTags.forEach(tag => {
      tag.style.borderColor = '';
      tag.style.color = '';
      tag.style.boxShadow = '';
    });
    nodes.forEach(node => {
      node.classList.remove('connected-node');
    });
  }

  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => drawConnections(tag));
    tag.addEventListener('mouseleave', clearConnections);
  });


  // ==========================================================================
  // --- 10. Card Canvases Live Telemetry Simulations ---
  // ==========================================================================
  
  // A helper to initialize canvas scaling for sharp retina renders
  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width: rect.width, height: rect.height };
  }

  // Common animation configurations
  let animFrameIds = {};
  
  // -- 10.1 PredictAI: Scrolling Sine Wave (Vibration Stream) --
  const canvasPredict = document.getElementById('canvas-predictai');
  if (canvasPredict) {
    const { ctx, width, height } = setupCanvas(canvasPredict);
    let offset = 0;
    let hoverState = false;

    canvasPredict.addEventListener('mouseenter', () => hoverState = true);
    canvasPredict.addEventListener('mouseleave', () => hoverState = false);

    function drawPredictWaves() {
      const canvasBg = getComputedStyle(document.body).getPropertyValue('--color-canvas-bg').trim() || '#0b0e14';
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Grid backing
      ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-card-border').trim() || '#182030';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;

      // Dynamically modulate frequency/amplitude based on hover
      const speed = hoverState ? 0.28 : 0.08;
      const amplitude1 = hoverState ? 24 : 15;
      const frequency1 = hoverState ? 0.04 : 0.02;

      // Draw primary wave
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * frequency1 + offset) * amplitude1;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary harmonics (noise overlay)
      ctx.strokeStyle = accentColor === '#ff6b00' ? '#ff9100' : '#34d399';
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * (frequency1 * 2) - offset * 1.5) * (amplitude1 * 0.4) + Math.cos(x * 0.08) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      offset += speed;
      animFrameIds.predict = requestAnimationFrame(drawPredictWaves);
    }
    drawPredictWaves();
  }

  // -- 10.2 CreditGuard: Real-Time Anomaly Pulse (Spikes) --
  const canvasCredit = document.getElementById('canvas-creditguard');
  if (canvasCredit) {
    const { ctx, width, height } = setupCanvas(canvasCredit);
    let dataPoints = Array(40).fill(height / 2 + 10);
    let hoverState = false;

    canvasCredit.addEventListener('mouseenter', () => hoverState = true);
    canvasCredit.addEventListener('mouseleave', () => hoverState = false);

    function drawCreditSpikes() {
      const canvasBg = getComputedStyle(document.body).getPropertyValue('--color-canvas-bg').trim() || '#0b0e14';
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Backing grid
      ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-card-border').trim() || '#182030';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      // Roll data points left
      dataPoints.shift();
      
      // Determine if spike happens (higher chance on hover)
      const threshold = hoverState ? 0.90 : 0.98;
      if (Math.random() > threshold) {
        // Spike anomaly!
        const spikeHeight = Math.random() * (height * 0.6) + 10;
        dataPoints.push(spikeHeight);
      } else {
        // Stable baseline with noise
        dataPoints.push(height / 2 + 15 + (Math.random() - 0.5) * 8);
      }

      const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
      const secondaryColor = getComputedStyle(document.body).getPropertyValue('--color-secondary').trim();

      // Render line
      ctx.beginPath();
      const colWidth = width / dataPoints.length;
      for (let i = 0; i < dataPoints.length; i++) {
        const x = i * colWidth;
        const y = dataPoints[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw red alert dots on high spikes (anomalies)
      for (let i = 0; i < dataPoints.length; i++) {
        if (dataPoints[i] < height / 2 - 10) {
          ctx.beginPath();
          ctx.arc(i * colWidth, dataPoints[i], 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ff5f56';
          ctx.fill();
        }
      }

      setTimeout(() => {
        animFrameIds.credit = requestAnimationFrame(drawCreditSpikes);
      }, 60); // Constrain FPS to look like telemetry refresh
    }
    drawCreditSpikes();
  }

  // -- 10.3 PulseBoard: Sentiment Flow Volume Columns --
  const canvasPulse = document.getElementById('canvas-pulseboard');
  if (canvasPulse) {
    const { ctx, width, height } = setupCanvas(canvasPulse);
    let columns = Array(25).fill(0).map(() => ({
      val: Math.random() * (height * 0.5) + 15,
      type: Math.random() > 0.4 ? 'positive' : 'negative'
    }));
    let hoverState = false;

    canvasPulse.addEventListener('mouseenter', () => hoverState = true);
    canvasPulse.addEventListener('mouseleave', () => hoverState = false);

    function drawPulseSentiment() {
      const canvasBg = getComputedStyle(document.body).getPropertyValue('--color-canvas-bg').trim() || '#0b0e14';
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Backing grid
      ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-card-border').trim() || '#182030';
      ctx.lineWidth = 0.5;
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Roll columns
      columns.shift();
      columns.push({
        val: Math.random() * (height * (hoverState ? 0.8 : 0.5)) + 15,
        type: Math.random() > 0.4 ? 'positive' : 'negative'
      });

      const colWidth = width / columns.length;
      const positiveColor = '#10b981'; // Green
      const negativeColor = '#ff5f56'; // Red

      for (let i = 0; i < columns.length; i++) {
        const x = i * colWidth + 2;
        const colHeight = columns[i].val;
        const color = columns[i].type === 'positive' ? positiveColor : negativeColor;

        ctx.fillStyle = color;
        ctx.globalAlpha = hoverState ? 0.8 : 0.4;
        ctx.fillRect(x, height - colHeight, colWidth - 4, colHeight);
      }
      ctx.globalAlpha = 1.0;

      setTimeout(() => {
        animFrameIds.pulse = requestAnimationFrame(drawPulseSentiment);
      }, hoverState ? 80 : 160);
    }
    drawPulseSentiment();
  }

  // -- 10.4 AgentIQ: Active RAG Traversing Node Network --
  const canvasAgent = document.getElementById('canvas-agentiq');
  if (canvasAgent) {
    const { ctx, width, height } = setupCanvas(canvasAgent);
    let hoverState = false;

    canvasAgent.addEventListener('mouseenter', () => hoverState = true);
    canvasAgent.addEventListener('mouseleave', () => hoverState = false);

    // Structure RAG node network coordinates
    const nodesLayout = [
      { x: width * 0.15, y: height * 0.5, name: 'Q' },
      { x: width * 0.45, y: height * 0.25, name: 'V1' },
      { x: width * 0.45, y: height * 0.5, name: 'V2' },
      { x: width * 0.45, y: height * 0.75, name: 'Web' },
      { x: width * 0.8, y: height * 0.5, name: 'LLM' }
    ];

    let pulseOffset = 0;
 
    function varAccentBorderColor() {
      return getComputedStyle(document.body).getPropertyValue('--color-card-border').trim();
    }

    function drawAgentRAG() {
      const canvasBg = getComputedStyle(document.body).getPropertyValue('--color-canvas-bg').trim() || '#0b0e14';
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, width, height);

      const accentColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
      const secondaryColor = getComputedStyle(document.body).getPropertyValue('--color-secondary').trim();

      // Draw connection lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-card-border').trim() || '#182030';
      
      // Question -> vectors / web
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(nodesLayout[0].x, nodesLayout[0].y);
        ctx.lineTo(nodesLayout[i].x, nodesLayout[i].y);
        ctx.stroke();
      }
      // vectors / web -> LLM
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(nodesLayout[i].x, nodesLayout[i].y);
        ctx.lineTo(nodesLayout[4].x, nodesLayout[4].y);
        ctx.stroke();
      }

      // Draw active telemetry flow pulse along lines
      const speed = hoverState ? 0.05 : 0.015;
      pulseOffset = (pulseOffset + speed) % 1.0;

      ctx.fillStyle = accentColor;
      // Pulse 1: Q -> V2
      const px1 = nodesLayout[0].x + (nodesLayout[2].x - nodesLayout[0].x) * pulseOffset;
      const py1 = nodesLayout[0].y + (nodesLayout[2].y - nodesLayout[0].y) * pulseOffset;
      ctx.beginPath(); ctx.arc(px1, py1, 4, 0, Math.PI * 2); ctx.fill();

      // Pulse 2: V2 -> LLM
      const px2 = nodesLayout[2].x + (nodesLayout[4].x - nodesLayout[2].x) * ((pulseOffset + 0.5) % 1.0);
      const py2 = nodesLayout[2].y + (nodesLayout[4].y - nodesLayout[2].y) * ((pulseOffset + 0.5) % 1.0);
      ctx.beginPath(); ctx.arc(px2, py2, 4, 0, Math.PI * 2); ctx.fill();

      // Draw static node dots
      nodesLayout.forEach((node, idx) => {
        const isHoveredNode = hoverState && (idx === 0 || idx === 2 || idx === 4);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHoveredNode ? 8 : 6, 0, Math.PI * 2);
        ctx.fillStyle = isHoveredNode ? secondaryColor : '#171d2b';
        ctx.strokeStyle = isHoveredNode ? accentColor : varAccentBorderColor();
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.font = '9px monospace';
        ctx.fillStyle = '#8b9bb4';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y - 12);
      });

      animFrameIds.agent = requestAnimationFrame(drawAgentRAG);
    }

    drawAgentRAG();
  }

});
