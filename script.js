/**
 * Sheetal Bajaj Portfolio Script
 * Dynamic interactions, terminal, project simulations, and theme management.
 */

// ==========================================
// CENTRAL USER CONFIGURATION
// Edit these values to configure your portfolio links and certificate files instantly!
// ==========================================
const USER_CONFIG = {
    profile: {
        name: "Sheetal Bajaj",
        email: "sheetalbajaj2025@gmail.com",
        location: "Kolkata, West Bengal, India",
        avatar: "1.webp", // Place your profile picture here (e.g. "avatar.jpg" or "1.webp")
        linkedin: "https://www.linkedin.com/in/sheetal-bajaj-s06091009/", // Replace with your original LinkedIn link
        github: "https://github.com/Sheetal-cell", // Replace with your original GitHub link
        gfg: "https://www.geeksforgeeks.org/profile/sheetal_bajaj", // Replace with your original GeeksforGeeks link
        kaggle: "https://www.kaggle.com/sheetalbajaj" // Replace with your original Kaggle link
    },
    projects: {
        vyomdarpan: {
            codeLink: "https://github.com/Sheetal-cell/SIH25156", // Replace with original VyomDarpan repository link
            demoLink: "https://vyomdarpan.vercel.app/"
        },
        sakshya: {
            codeLink: "https://github.com/Sheetal-cell/SAKSHYA-frontend", // Replace with original SAKSHYA repository link
            demoLink: "https://sakshya-frontend.vercel.app/"
        },
        instantbi: {
            codeLink: "https://github.com/Sheetal-cell/Instant-BI", // Replace with original InstantBI repository link
            demoLink: "https://instant-bi.vercel.app/"
        },
        medimitra: {
            codeLink: "https://github.com/Sheetal-cell/MediMitra", // Replace with original MediMitra repository link
            demoLink: "https://medi-mitra-two.vercel.app/"
        },
        ekasruti: {
            codeLink: "https://github.com/Sheetal-cell/Ekasruti-Main-Landing", // Replace with original EkaSruti repository link
            demoLink: "https://ekasruti-bigbugs.vercel.app/"
        }
    },
    certificates: {
        ecwoc26: {
            fileLink: "certificates/ecwoc2026.jpg", // Place your original certificate file in a 'certificates' folder and link here
            // Replace with original verification link
        },
        iitm25: {
            fileLink: "certificates/iitm-foundation.jpg",

        },
        fcc25: {
            fileLink: "certificates/fcc25.pdf",

        },
        postman25: {
            fileLink: "certificates/postman25.pdf",

        },
        cisco25: {
            fileLink: "certificates/cisco25.jpg",

        },
        google24: {
            fileLink: "certificates/google24.pdf",

        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dynamic configuration injection
    function injectUserConfig() {
        const avatarEl = document.getElementById('profile-avatar-img');
        if (avatarEl && USER_CONFIG.profile.avatar) {
            avatarEl.src = USER_CONFIG.profile.avatar;
        }

        const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
        linkedinLinks.forEach(a => a.href = USER_CONFIG.profile.linkedin);

        const githubLinks = document.querySelectorAll('a[href*="github.com"]');
        githubLinks.forEach(a => a.href = USER_CONFIG.profile.github);

        const gfgLinks = document.querySelectorAll('a[href*="geeksforgeeks.org"]');
        gfgLinks.forEach(a => a.href = USER_CONFIG.profile.gfg);

        const kaggleLinks = document.querySelectorAll('a[href*="kaggle.com"]');
        kaggleLinks.forEach(a => a.href = USER_CONFIG.profile.kaggle);

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(a => {
            a.href = `mailto:${USER_CONFIG.profile.email}`;
            if (a.textContent.includes('@')) {
                a.textContent = USER_CONFIG.profile.email;
            }
        });

        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(a => {
            a.href = `tel:${USER_CONFIG.profile.phone.replace(/\s+/g, '')}`;
            a.textContent = USER_CONFIG.profile.phone;
        });

        Object.entries(USER_CONFIG.projects).forEach(([projId, config]) => {
            if (projectsData[projId]) {
                projectsData[projId].link = config.demoLink;
            }
            const cardLink = document.querySelector(`.project-card[data-project-id="${projId}"] .proj-link-btn`);
            if (cardLink && config.demoLink) {
                cardLink.href = config.demoLink;
                cardLink.target = "_blank";
            }
        });
    }

    // Particle background network inside Hero Section
    function initHeroParticles() {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const heroSection = document.getElementById('hero');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.size = Math.random() * 2 + 1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#00f2fe';
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = this.x - mouse.x;
                    let dy = this.y - mouse.y;
                    let dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        let angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 2;
                        this.y += Math.sin(angle) * force * 2;
                    }
                }
            }
        }

        const count = Math.min(Math.floor(canvas.width / 15), 80);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb') || '0, 242, 254'}, 0.08)`;
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.hypot(dx, dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    // 3D Card tilt effect on hover
    function initCardTilt() {
        const tiltElements = document.querySelectorAll('.project-card, .achievement-card');
        tiltElements.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const angleX = (yc - y) / 12;
                const angleY = (x - xc) / 12;
                el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)';
            });
        });
    }

    // Dynamic highlights linkage
    function initConnectedHighlighting() {
        const skillProjectMap = {
            python: ['sakshya', 'ekasruti', 'instantbi', 'vyomdarpan'],
            cpp: [],
            c: [],
            datascience: ['vyomdarpan', 'sakshya'],
            dataanalysis: ['instantbi'],
            dbms: ['instantbi'],
            webdev: ['sakshya', 'instantbi'],
            apis: ['sakshya'],
            dsa: []
        };

        const skillCardsList = document.querySelectorAll('.skill-card');
        skillCardsList.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const skillId = card.getAttribute('data-skill-id');
                const matchingProjects = skillProjectMap[skillId] || [];
                matchingProjects.forEach(projId => {
                    const projCard = document.querySelector(`.project-card[data-project-id="${projId}"]`);
                    if (projCard) projCard.classList.add('highlight-pulse');
                });
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll('.project-card').forEach(p => p.classList.remove('highlight-pulse'));
            });
        });

        const projectCardsList = document.querySelectorAll('.project-card');
        projectCardsList.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const projId = card.getAttribute('data-project-id');
                Object.entries(skillProjectMap).forEach(([skillId, projects]) => {
                    if (projects.includes(projId)) {
                        const skillCard = document.querySelector(`.skill-card[data-skill-id="${skillId}"]`);
                        if (skillCard) skillCard.classList.add('highlight-pulse');
                    }
                });
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll('.skill-card').forEach(s => s.classList.remove('highlight-pulse'));
            });
        });
    }

    // Run dynamic systems
    setTimeout(() => {
        injectUserConfig();
        initHeroParticles();
        initCardTilt();
        initConnectedHighlighting();
    }, 100);

    // 2. Data Stores
    const projectsData = {
        vyomdarpan: {
            title: "VyomDarpan",
            category: "Astronomical Calculation",
            tags: ["Astronomy", "Math Modeling", "Python", "Algorithms"],
            description: "VyomDarpan is a computational project designed to align primary structural elements of astronomical layouts (Yantras) based on local latitude coordinates. By automating complex trigonometry calculations, it calculates exact angular offsets and shadow ratios required for solar and stellar alignment.",
            tech: ["Python", "Trigonometric Formulations", "Matplotlib", "Data Pipelines"],
            link: "https://vyomdarpan.vercel.app/",
            simulator: "vyomdarpan"
        },
        sakshya: {
            title: "SAKSHYA",
            category: "AI Legal Assistant",
            tags: ["LLM Processing", "AI Security", "LegalTech", "Full Stack"],
            description: "SAKSHYA is an intelligent legal analysis system designed for judicial officers and legal executives. It processes court judgment PDFs, extracting key directives, compliance requirements, timelines, risk percentages, and appeal advisories utilizing state-of-the-art Large Language Model embeddings.",
            tech: ["Python", "LLM APIs", "PDF Parsing", "JavaScript", "HTML5/CSS3"],
            link: "https://github.com",
            simulator: "sakshya"
        },
        instantbi: {
            title: "InstantBI",
            category: "NLP Dashboard",
            tags: ["Data Analytics", "SQL Engine", "Dashboard", "Natural Language"],
            description: "InstantBI bridges the gap between raw data and decision makers. It allows users to upload any CSV or Excel file and write analytical questions in plain conversational English. The engine parses the query, converts it to highly-optimized SQL, queries the dataset, and renders beautiful interactive charts.",
            tech: ["SQL (DBMS)", "Python", "Data Analysis", "Chart.js", "CSV Parser"],
            link: "https://github.com",
            simulator: "instantbi"
        },
        medimitra: {
            title: "MediMitra",
            category: "Mobile Health",
            tags: ["Flutter", "Firebase", "Push Alert", "UX Design"],
            description: "MediMitra is a cross-platform mobile application built to enhance medical adherence. Integrating Flutter and Firebase, it handles medication calendars, schedules, and sends real-time push alerts to patients for dosage compliance.",
            tech: ["Flutter (Dart)", "Firebase Firestore", "Cloud Messaging", "Local Notifications"],
            link: "https://github.com",
            simulator: "medimitra"
        },
        ekasruti: {
            title: "EkaSruti",
            category: "Speech Translation",
            tags: ["Speech AI", "NLP Pipeline", "Multilingual", "Real-time"],
            description: "EkaSruti translates spoken audio into live multilingual captions. It leverages custom audio capture pipelines and NLP models to align speech structures and present readable transcriptions dynamically across web portals.",
            tech: ["Speech-to-Text APIs", "Node.js Backend", "WebSocket Streams", "NLP Translators"],
            link: "https://github.com",
            simulator: "ekasruti"
        }
    };

    const certData = {
        ecwoc26: {
            title: "Elite Coders Winter of Code '26",
            issuer: "Elite Coders Organization",
            date: "March 2026",
            id: "ECWOC-2026-94821",
            desc: "Awarded for exceptional algorithmic problem-solving and application development during the Winter of Code 2026. Ranked 14th out of hundreds of participants."
        },
        iitm25: {
            title: "Programming & Data Science",
            issuer: "IIT Madras Academic Senate",
            date: "December 2025",
            id: "IITM-DS-774012",
            desc: "Verifies completion of intermediate and advanced computational algorithms, data structures, and database applications on large-scale datasets."
        },
        fcc25: {
            title: "Responsive Web Design",
            issuer: "freeCodeCamp Developer Curriculum",
            date: "February 2025",
            id: "FCC-RWD-9921",
            desc: "Demonstrates mastery in modern web architecture, CSS custom properties, grid layouts, flexbox, media queries, accessibility parameters, and responsive design systems."
        },
        postman25: {
            title: "Postman API Fundamentals Student Expert",
            issuer: "Postman Academy",
            date: "March 2025",
            id: "POSTMAN-SE-883",
            desc: "Validates expertise in designing, testing, mock-building, documenting, and executing RESTful API calls and schemas within modern microservices."
        },
        cisco25: {
            title: "Data Analytics Essentials",
            issuer: "Cisco Networking Academy",
            date: "October 2025",
            id: "CISCO-DA-4410",
            desc: "Covers data discovery, cleansing procedures, SQL operations, dashboard creation, and statistical analysis processes for business intelligence."
        },
        google24: {
            title: "Technical Support Fundamentals",
            issuer: "Google Career Certificates",
            date: "November 2024",
            id: "GOOGLE-TS-32104",
            desc: "Validates knowledge of computer networking, hardware assembly, operating systems administration, system security, and troubleshooting pipelines."
        }
    };

    // 3. Custom Cursor Interaction
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover classes
        const hoverables = document.querySelectorAll('a, button, .project-card, .cert-card, input, textarea');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
                cursor.style.borderColor = 'rgba(var(--accent-rgb), 0.8)';
                cursor.style.background = 'rgba(var(--accent-rgb), 0.05)';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.background = 'transparent';
            });
        });
    }

    // 4. Typing Effect (Hero Section)
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            "AI & Machine Learning Developer",
            "Data Science & Analytics Student",
            "Full Stack Software Engineer",
            "IT Dual-Degree Track Undergraduate"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Delay before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400; // Pause before typing next
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }

    // 5. Scroll Shrink Header & Active Links
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // 6. Scroll Reveal Animations (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    const scrollReveals = document.querySelectorAll('.scroll-reveal, .timeline-item, .project-card, .cert-card, .achievement-card');
    scrollReveals.forEach(el => {
        el.classList.add('scroll-reveal'); // Ensure class exists
        revealObserver.observe(el);
    });

    // 7. Theme Panel & Light/Dark Mode Switcher
    const themeBtn = document.getElementById('theme-panel-btn');
    const themePanel = document.getElementById('theme-customizer');
    const closeThemeBtn = document.getElementById('close-theme-panel');
    const themeOptBtns = document.querySelectorAll('.theme-opt-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (themeBtn && themePanel && closeThemeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themePanel.classList.toggle('active');
        });

        closeThemeBtn.addEventListener('click', () => {
            themePanel.classList.remove('active');
        });

        // Close panel on outside click
        document.addEventListener('click', (e) => {
            if (!themePanel.contains(e.target) && e.target !== themeBtn) {
                themePanel.classList.remove('active');
            }
        });

        themeOptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const themeName = btn.getAttribute('data-theme');
                document.documentElement.setAttribute('data-theme', themeName);

                themeOptBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Generate visual variables updates
                let hexColor = '#00f2fe';
                if (themeName === 'purple') hexColor = '#a855f7';
                else if (themeName === 'emerald') hexColor = '#10b981';
                else if (themeName === 'sunset') hexColor = '#f97316';

                createToast(`Theme Accent Changed to ${themeName.toUpperCase()}`, 'palette');
            });
        });

        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('light-mode');
                createToast('Dark Space Mode Activated', 'moon');
            } else {
                document.body.classList.add('light-mode');
                createToast('Light Cyber Mode Activated', 'sun');
            }
        });
    }

    // 8. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileMenuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });

        // Close menu on nav item click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // 9. Skills Category Filtering
    const skillTabBtns = document.querySelectorAll('.skills-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCats = card.getAttribute('data-category').split(' ');
                if (category === 'all' || cardCats.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 10. Projects Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projCards.forEach(card => {
                const cardCats = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || cardCats.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 11. Projects Side Drawer + Interactive Simulators
    const projectDrawer = document.getElementById('project-details-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop-el');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const closeDrawerAction = document.getElementById('drawer-close-action');
    const drawerLinkAction = document.getElementById('drawer-link-action');

    const dTitle = document.getElementById('drawer-title');
    const dCategory = document.getElementById('drawer-category');
    const dTags = document.getElementById('drawer-tags-list');
    const dFullDesc = document.getElementById('drawer-full-desc');
    const dTechList = document.getElementById('drawer-tech-list');
    const dSimulator = document.getElementById('drawer-simulator');

    projCards.forEach(card => {
        card.addEventListener('click', () => {
            const projId = card.getAttribute('data-project-id');
            const data = projectsData[projId];
            if (data) {
                openProjectDrawer(data);
            }
        });
    });

    if (closeDrawerBtn && drawerBackdrop && closeDrawerAction) {
        [closeDrawerBtn, drawerBackdrop, closeDrawerAction].forEach(el => {
            el.addEventListener('click', () => {
                projectDrawer.classList.remove('active');
            });
        });
    }

    function openProjectDrawer(data) {
        dTitle.textContent = data.title;
        dCategory.textContent = data.category;
        dFullDesc.textContent = data.description;

        // Tags
        dTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            dTags.appendChild(span);
        });

        // Tech specs
        dTechList.innerHTML = '';
        data.tech.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t;
            dTechList.appendChild(li);
        });

        // External Link
        drawerLinkAction.onclick = () => {
            window.open(data.link, '_blank');
        };

        // Render project simulator
        renderSimulator(data.simulator);

        // Open drawer
        projectDrawer.classList.add('active');
        lucide.createIcons();
    }

    function renderSimulator(simType) {
        dSimulator.innerHTML = '';

        if (simType === 'sakshya') {
            dSimulator.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>SAKSHYA Legal Assistant</span>
                        <span style="color:#ef4444; font-weight:bold; font-size:0.75rem; border:1px solid #ef4444; padding:2px 6px; border-radius:4px;">PROT_ACTIVE</span>
                    </div>
                    <button class="btn btn-secondary" id="sim-upload-btn" style="padding:8px 12px; font-size:0.8rem; justify-content:center;">
                        <i data-lucide="upload" style="width:14px; height:14px;"></i> Upload Court Judgment PDF
                    </button>
                    <div id="sim-output" style="max-height:150px; overflow-y:auto; padding:10px; background:rgba(0,0,0,0.6); border-radius:6px; font-size:0.75rem; color:#10b981; line-height:1.4;">
                        Waiting for document upload...
                    </div>
                </div>
            `;

            setTimeout(() => {
                const uploadBtn = document.getElementById('sim-upload-btn');
                const simOutput = document.getElementById('sim-output');

                if (uploadBtn && simOutput) {
                    uploadBtn.addEventListener('click', () => {
                        uploadBtn.disabled = true;
                        uploadBtn.innerHTML = '<span>Processing Document NLP...</span>';
                        simOutput.innerHTML = 'Connecting to SAKSHYA Local Host...<br>[1] Extracting PDF Content...';

                        let steps = [
                            "[2] Querying embedding database (148 chunks matched)...",
                            "[3] Compiling legal risk variables...",
                            "[4] LLM Summary Complete!<br><br><strong>Analysis Result:</strong><br>- <strong>Judgment Status:</strong> APPEAL RECOMMENDATION HIGH<br>- <strong>Critical Compliance Directives:</strong> Section 143(a) compliance directive mandatory within 30 days.<br>- <strong>Identified Risks:</strong> 84% Liability exposure detected in Clause 9.2.<br>- <strong>Action Items:</strong> File motion of appeal, schedule executive briefing."
                        ];

                        let idx = 0;
                        function showStep() {
                            if (idx < steps.length) {
                                simOutput.innerHTML += '<br>' + steps[idx];
                                simOutput.scrollTop = simOutput.scrollHeight;
                                idx++;
                                setTimeout(showStep, 1000);
                            } else {
                                uploadBtn.disabled = false;
                                uploadBtn.innerHTML = '<i data-lucide="upload" style="width:14px; height:14px;"></i> Upload Another PDF';
                                lucide.createIcons();
                            }
                        }
                        setTimeout(showStep, 1000);
                    });
                }
            }, 50);

        } else if (simType === 'instantbi') {
            dSimulator.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>InstantBI SQL NLP Terminal</span>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <input type="text" id="sim-query-input" placeholder="e.g. show sales by region" style="flex-grow:1; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); color:white; padding:6px 10px; border-radius:6px; font-size:0.8rem;">
                        <button id="sim-query-btn" style="padding:6px 12px; background:var(--accent); border:none; color:black; font-weight:bold; border-radius:6px; font-size:0.8rem;">Execute</button>
                    </div>
                    <div id="sim-chart-output" style="min-height:100px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:rgba(0,0,0,0.6); border-radius:6px; font-size:0.75rem; color:#64748b; padding:10px;">
                        Enter a query query to build interactive visual analytics.
                    </div>
                </div>
            `;

            setTimeout(() => {
                const qInput = document.getElementById('sim-query-input');
                const qBtn = document.getElementById('sim-query-btn');
                const qOut = document.getElementById('sim-chart-output');

                if (qBtn && qInput && qOut) {
                    qBtn.addEventListener('click', () => {
                        const val = qInput.value.trim().toLowerCase();
                        if (!val) return;

                        qOut.innerHTML = 'Parsing natural language...<br>Compiling SQLite Schema...';

                        setTimeout(() => {
                            qOut.innerHTML = `
                                <div style="width:100%; text-align:left; color:#38bdf8; margin-bottom:8px;">
                                    <strong>Query:</strong> SELECT Region, SUM(Sales) FROM orders GROUP BY Region ORDER BY Sales DESC;
                                </div>
                                <div style="display:flex; gap:10px; align-items:flex-end; height:70px; border-bottom:1px solid #334155; width:100%; padding-bottom:4px; margin-bottom:4px;">
                                    <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                                        <div style="width:100%; background:var(--accent); height:60px; border-radius:3px 3px 0 0;"></div>
                                        <span style="font-size:0.6rem; margin-top:2px;">North</span>
                                    </div>
                                    <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                                        <div style="width:100%; background:var(--accent); height:45px; border-radius:3px 3px 0 0;"></div>
                                        <span style="font-size:0.6rem; margin-top:2px;">West</span>
                                    </div>
                                    <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                                        <div style="width:100%; background:var(--accent); height:30px; border-radius:3px 3px 0 0;"></div>
                                        <span style="font-size:0.6rem; margin-top:2px;">East</span>
                                    </div>
                                    <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                                        <div style="width:100%; background:var(--accent); height:15px; border-radius:3px 3px 0 0;"></div>
                                        <span style="font-size:0.6rem; margin-top:2px;">South</span>
                                    </div>
                                </div>
                                <div style="display:flex; justify-content:space-between; width:100%; font-size:0.65rem; color:#64748b;">
                                    <span>SQL Records: 4</span>
                                    <span>Execution: 1.4ms</span>
                                </div>
                            `;
                        }, 800);
                    });
                }
            }, 50);

        } else if (simType === 'vyomdarpan') {
            dSimulator.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>Yantra Latitude Alignment Calculator</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:0.75rem; color:#94a3b8; display:flex; justify-content:space-between;">
                            <span>Current Latitude Coordinates</span>
                            <strong id="lat-val">22.57° N (Kolkata)</strong>
                        </label>
                        <input type="range" id="lat-slider" min="8" max="36" value="22" style="width:100%; cursor:pointer;">
                    </div>
                    <div id="sim-math-out" style="background:rgba(0,0,0,0.6); padding:10px; border-radius:6px; font-size:0.75rem; text-align:left; color:#fbbf24;">
                        Calculating celestial solar angle offsets...
                    </div>
                </div>
            `;

            setTimeout(() => {
                const slider = document.getElementById('lat-slider');
                const latVal = document.getElementById('lat-val');
                const mathOut = document.getElementById('sim-math-out');

                function calculate(val) {
                    latVal.textContent = val + '.00° N';
                    // Formulas simulation
                    const offsetAngle = (90 - parseFloat(val)).toFixed(2);
                    const zenithOffset = (parseFloat(val) * 1.082).toFixed(3);

                    mathOut.innerHTML = `
                        <strong>Solar Zenith Angle at Solstice:</strong> ${offsetAngle}°<br>
                        <strong>Calculated Gnomon Height Ratio:</strong> 1 : ${(Math.tan((offsetAngle * Math.PI) / 180)).toFixed(4)}<br>
                        <strong>Yantra Structural Shift Factor:</strong> ${zenithOffset}mm offset<br>
                        <span style="color:#10b981; font-weight:bold; font-size:0.7rem; display:block; margin-top:4px;">[CALCULATION STABLE FOR PILING WORK]</span>
                    `;
                }

                if (slider && latVal && mathOut) {
                    slider.addEventListener('input', (e) => {
                        calculate(e.target.value);
                    });
                    calculate(slider.value);
                }
            }, 50);

        } else if (simType === 'medimitra') {
            dSimulator.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>MediMitra Flutter Mobile Panel</span>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <input type="text" id="med-name" placeholder="Aspirin / Multi-Vit" style="flex-grow:1; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); color:white; padding:6px 10px; border-radius:6px; font-size:0.8rem;">
                        <input type="time" id="med-time" value="08:00" style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); color:white; padding:6px 6px; border-radius:6px; font-size:0.8rem;">
                        <button id="add-med-btn" style="padding:6px 12px; background:var(--accent); border:none; color:black; font-weight:bold; border-radius:6px; font-size:0.8rem;">Schedule</button>
                    </div>
                    <div id="med-list-sim" style="background:rgba(0,0,0,0.6); padding:10px; border-radius:6px; font-size:0.75rem; text-align:left; color:#f1f5f9; min-height:80px; display:flex; flex-direction:column; gap:6px;">
                        <div style="color:#64748b;">No active schedule pipeline. Add a dosage reminder.</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const medName = document.getElementById('med-name');
                const medTime = document.getElementById('med-time');
                const addBtn = document.getElementById('add-med-btn');
                const medList = document.getElementById('med-list-sim');

                if (addBtn && medName && medTime && medList) {
                    let first = true;
                    addBtn.addEventListener('click', () => {
                        const name = medName.value.trim();
                        const time = medTime.value;
                        if (!name) return;

                        if (first) {
                            medList.innerHTML = '';
                            first = false;
                        }

                        const div = document.createElement('div');
                        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:6px 10px; border-radius:4px;";
                        div.innerHTML = `
                            <span><strong>${name}</strong> at ${time}</span>
                            <span style="color:#10b981; font-weight:bold; font-size:0.65rem; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#10b981; border-radius:50%;"></span> ACTIVE</span>
                        `;
                        medList.appendChild(div);

                        medName.value = '';
                        createToast(`Scheduled medicine reminder: ${name}`, 'bell');
                    });
                }
            }, 50);

        } else if (simType === 'ekasruti') {
            dSimulator.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>EkaSruti Audio Translation Bus</span>
                    </div>
                    <button class="btn btn-secondary" id="rec-btn" style="padding:8px 12px; font-size:0.8rem; justify-content:center;">
                        <i data-lucide="mic" style="width:14px; height:14px; color:#ef4444;"></i> Start Recording Speech
                    </button>
                    <div id="subtitle-out" style="height:100px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:rgba(0,0,0,0.6); border-radius:6px; font-size:0.75rem; color:#64748b; padding:10px; text-align:center; line-height:1.5;">
                        Click mic to stream audio captions translation.
                    </div>
                </div>
            `;

            setTimeout(() => {
                const recBtn = document.getElementById('rec-btn');
                const subOut = document.getElementById('subtitle-out');

                if (recBtn && subOut) {
                    let active = false;
                    let capIndex = 0;
                    let capTimer = null;
                    const captions = [
                        { en: "Hello, thank you for checking my project portfolio.", hi: "नमस्ते, मेरी परियोजना पोर्टफोलियो देखने के लिए धन्यवाद।" },
                        { en: "I focus on developing backend engines and Machine Learning solutions.", hi: "मैं बैकएंड इंजन और मशीन लर्निंग समाधान विकसित करने पर ध्यान केंद्रित करती हूँ।" },
                        { en: "EkaSruti transforms speech to multilingual captions instantly.", hi: "एकास्रुति भाषण को तुरंत बहुभाषी उपशीर्षक में बदल देता है।" }
                    ];

                    recBtn.addEventListener('click', () => {
                        if (active) {
                            // Stop
                            clearInterval(capTimer);
                            active = false;
                            recBtn.innerHTML = '<i data-lucide="mic" style="width:14px; height:14px; color:#ef4444;"></i> Start Recording Speech';
                            subOut.innerHTML = 'Speech processing closed.';
                            subOut.style.color = '#64748b';
                            lucide.createIcons();
                        } else {
                            // Start
                            active = true;
                            recBtn.innerHTML = '<span>Streaming Audio...</span>';
                            subOut.style.color = 'white';
                            subOut.innerHTML = '<i>Listening... Speak now...</i>';
                            capIndex = 0;

                            function showCaps() {
                                if (capIndex < captions.length) {
                                    subOut.innerHTML = `
                                        <div style="font-size:0.85rem; margin-bottom:6px; color:var(--accent);">
                                            <strong>[EN]:</strong> "${captions[capIndex].en}"
                                        </div>
                                        <div style="font-size:0.85rem; color:#fbbf24;">
                                            <strong>[HI]:</strong> "${captions[capIndex].hi}"
                                        </div>
                                    `;
                                    capIndex++;
                                } else {
                                    capIndex = 0; // Loop
                                }
                            }
                            // Show first immediately
                            setTimeout(showCaps, 800);
                            capTimer = setInterval(showCaps, 3000);
                        }
                    });
                }
            }, 50);
        }
    }

    // 12. Digital Credentials Verification Modal
    const certModal = document.getElementById('certificate-modal');
    const modalBackdrop = document.getElementById('modal-backdrop-el');
    const closeModalBtn = document.getElementById('close-modal');
    const printCertBtn = document.getElementById('modal-print-btn');
    const shareCertBtn = document.getElementById('modal-share-btn');
    const certViewEl = document.getElementById('modal-certificate-view');

    const certButtons = document.querySelectorAll('.cert-btn-verify');

    certButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const card = this.closest(".cert-card");
            if (!card) return;

            const certId = card.dataset.certId;
            const cert = USER_CONFIG.certificates[certId];

            if (cert?.fileLink) {
                window.location.href = cert.fileLink;
            }
        });
    });
    





    if (closeModalBtn && modalBackdrop) {
        [closeModalBtn, modalBackdrop].forEach(el => {
            el.addEventListener('click', () => {
                certModal.classList.remove('active');
            });
        });
    }






    function executeTerminalCommand(cmdText) {
        // Echo input
        writeLineToTerminal(`guest@sheetal-pc:~$ ${cmdText}`, 'output-line');

        const parts = cmdText.split(' ');
        const mainCmd = parts[0].toLowerCase();
        const arg = parts[1] ? parts[1].toLowerCase() : null;

        switch (mainCmd) {
            case 'help':
                writeLineToTerminal(`Available Commands:
- <span class="term-highlight">about</span> : Output a summary of Sheetal's details.
- <span class="term-highlight">skills</span> : Show programming and data science skills.
- <span class="term-highlight">projects</span> : List key engineering projects.
- <span class="term-highlight">education</span> : Show chronological academic details.
- <span class="term-highlight">clear</span> : Clear history screens.
- <span class="term-highlight">theme &lt;accent&gt;</span> : Switch theme accent (cyan, purple, emerald, sunset).
- <span class="term-highlight">light / dark</span> : Switch screen theme mode.
- <span class="term-highlight">login &lt;passcode&gt;</span> : Authenticate admin session (default: admin123).
- <span class="term-highlight">logout</span> : Terminate admin session.
- <span class="term-highlight">messages</span> : Fetch inbox submissions (Admin session required).
- <span class="term-highlight">analytics</span> : Display contact data metrics (Admin session required).
- <span class="term-highlight">matrix</span> : Starts retro green digital cascade.`, 'system-line');
                break;

            case 'about':
                writeLineToTerminal(`Sheetal Bajaj | AI & Data Science Developer
B.Tech IT (MAKAUT) Dual Track & B.S. Data Science (IIT Madras) Student.
Current Location: Kolkata, West Bengal, India.
Contact: sheetalbajaj2025@gmail.com | +91 8252128606`, 'system-line');
                break;

            case 'skills':
                writeLineToTerminal(`Sheetal's Skills Matrix:
- Programming: Python, C++, C
- Data Systems: Data Science, Data Analysis, SQL, Data Structures
- Web Eng: HTML, CSS, JavaScript, APIs & Integrations`, 'system-line');
                break;

            case 'projects':
                writeLineToTerminal(`Key Projects:
1. VyomDarpan: Astronomical alignment trigonometry modeler.
2. SAKSHYA: Legal judgment PDF parsing & AI analysis.
3. InstantBI: Plain English NLP database dashboard.
4. MediMitra: Flutter/Firebase medicine alert client.
5. EkaSruti: Multilingual speech audio transcription translation.`, 'system-line');
                break;

            case 'education':
                writeLineToTerminal(`Education Timelines:
1. IIT Madras (B.S. Data Science) [2025 - Present]
2. MAKAUT (B.Tech IT) [2024 - Present] -> Current CGPA: 9.68
3. STS Computer Education (Diploma) [2022 - 2023] -> Grade: 84%
4. Diksha International School (XII) [2022 - 2024] -> Grade: 85.8%
5. Bethel Mission School (X) [2009 - 2022] -> Grade: 96.4%`, 'system-line');
                break;

            case 'clear':
                termScreen.innerHTML = '';
                break;

            case 'theme':
                if (['cyan', 'purple', 'emerald', 'sunset'].includes(arg)) {
                    document.documentElement.setAttribute('data-theme', arg);
                    // Match select button
                    themeOptBtns.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('data-theme') === arg) btn.classList.add('active');
                    });
                    writeLineToTerminal(`Accent theme changed to: ${arg.toUpperCase()}`, 'system-line');
                    createToast(`Accent changed to ${arg}`, 'palette');
                } else {
                    writeLineToTerminal(`Error: theme must be one of: cyan, purple, emerald, sunset`, 'error-line');
                }
                break;

            case 'light':
                document.body.classList.add('light-mode');
                darkModeToggle.checked = false;
                writeLineToTerminal(`Light Cyber Mode activated.`, 'system-line');
                break;

            case 'dark':
                document.body.classList.remove('light-mode');
                darkModeToggle.checked = true;
                writeLineToTerminal(`Dark Space Mode activated.`, 'system-line');
                break;

            case 'login':
                if (!arg) {
                    writeLineToTerminal(`Error: Passcode required. Usage: login &lt;passcode&gt;`, 'error-line');
                    break;
                }
                if (isLockedOut()) {
                    const timeLeft = Math.ceil((lockoutTime - Date.now()) / 1000);
                    writeLineToTerminal(`Authentication locked. Try again in ${timeLeft}s.`, 'error-line');
                    break;
                }
                if (verifyPasscode(arg)) {
                    writeLineToTerminal(`AUTHENTICATION SUCCESSFUL. Admin CLI session established. Type <span class="term-highlight">messages</span> or <span class="term-highlight">analytics</span>.`, 'system-line');
                    createToast('Logged in via CLI', 'unlock');
                } else {
                    writeLineToTerminal(`ACCESS DENIED. Invalid passcode.`, 'error-line');
                    if (isLockedOut()) {
                        writeLineToTerminal(`System Locked Out for 30s (3 failed attempts).`, 'error-line');
                        startLockoutInterval();
                    }
                }
                break;

            case 'logout':
                if (isAdminAuthenticated()) {
                    sessionStorage.removeItem('admin_authenticated');
                    if (inboxSection) inboxSection.classList.add('hidden');
                    writeLineToTerminal(`Admin session terminated.`, 'system-line');
                    createToast('Logged out via CLI', 'lock');
                } else {
                    writeLineToTerminal(`No active session to terminate.`, 'error-line');
                }
                break;

            case 'analytics':
            case 'stats':
                if (!isAdminAuthenticated()) {
                    writeLineToTerminal(`ACCESS REJECTED. Admin authentication required. Please type: login &lt;passcode&gt;`, 'error-line');
                    break;
                }
                const statMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                let hiring = 0, collab = 0, general = 0;
                statMsgs.forEach(msg => {
                    const subj = (msg.subject || '').toLowerCase();
                    if (subj.includes('hire') || subj.includes('job') || subj.includes('offer') || subj.includes('position') || subj.includes('work')) {
                        hiring++;
                    } else if (subj.includes('collab') || subj.includes('partner') || subj.includes('project') || subj.includes('build')) {
                        collab++;
                    } else {
                        general++;
                    }
                });

                const uniqueEmails = new Set(statMsgs.map(m => m.email)).size;
                writeLineToTerminal(`========================================
ADMIN INBOX ANALYTICS METRICS SUMMARY
========================================
Total Received Messages: ${statMsgs.length}
Unique Contacts Count:   ${uniqueEmails}

SUBJECT CATEGORIES BREAKDOWN:
- Hiring/Job Proposals:  ${hiring}
- Collaborations:       ${collab}
- General Inquiries:    ${general}

CLI METRIC CHARTS DISPLAY:
Hiring:  [${'#'.repeat(Math.min(10, hiring))}${'-'.repeat(Math.max(0, 10 - hiring))}]
Collab:  [${'#'.repeat(Math.min(10, collab))}${'-'.repeat(Math.max(0, 10 - collab))}]
General: [${'#'.repeat(Math.min(10, general))}${'-'.repeat(Math.max(0, 10 - general))}]
========================================`, 'system-line');
                break;

            case 'messages':
                if (!isAdminAuthenticated()) {
                    writeLineToTerminal(`ACCESS REJECTED. Authentication required.<br>Please run: <span class="term-highlight">login &lt;passcode&gt;</span> to initialize admin access.`, 'error-line');
                    break;
                }
                const msgList = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                if (msgList.length === 0) {
                    writeLineToTerminal(`No messages received yet. Submit the contact form first!`, 'system-line');
                } else {
                    writeLineToTerminal(`System Message Database (${msgList.length} total entries):`, 'system-line');
                    msgList.forEach((msg, idx) => {
                        writeLineToTerminal(`[#${idx + 1}] At ${msg.time} | Sender: ${msg.name} (${msg.email})
Subject: "${msg.subject}"
Message: "${msg.message}"
----------------------------------------`, 'system-line');
                    });
                    // Trigger full visual dashboard display as well
                    const inboxSection = document.getElementById('inbox-dashboard-section');
                    if (inboxSection) {
                        inboxSection.classList.remove('hidden');
                        renderInboxMessages();
                        renderAdminAnalytics();
                        inboxSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                break;

            case 'matrix':
                startMatrixRain();
                break;

            default:
                writeLineToTerminal(`Command not found: "${cmdText}". Type "help" for active listings.`, 'error-line');
                break;
        }

        termScreen.scrollTop = termScreen.scrollHeight;
    }

    function writeLineToTerminal(text, className = '') {
        const p = document.createElement('p');
        p.className = `terminal-line ${className}`;
        p.innerHTML = text;
        termScreen.appendChild(p);
    }

    function startMatrixRain() {
        writeLineToTerminal(`Initializing neon stream overlay... Press Clear or type clear to reset.`, 'system-line');
        // Create canvas over screen
        let canvas = document.getElementById('matrix-overlay');
        if (canvas) canvas.remove();

        canvas = document.createElement('canvas');
        canvas.id = 'matrix-overlay';
        canvas.style.cssText = "position:fixed; top:80px; left:0; width:100vw; height:100vh; pointer-events:none; z-index:9; opacity:0.12;";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / 20) + 1;
        const yPositions = Array(columns).fill(0);

        function step() {
            if (!document.getElementById('matrix-overlay')) return; // Exit if cleared

            ctx.fillStyle = 'rgba(7, 9, 19, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Get current accent color in hex
            const theme = document.documentElement.getAttribute('data-theme') || 'cyan';
            let color = '#00f2fe';
            if (theme === 'purple') color = '#a855f7';
            else if (theme === 'emerald') color = '#10b981';
            else if (theme === 'sunset') color = '#f97316';

            ctx.fillStyle = color;
            ctx.font = '15px monospace';

            yPositions.forEach((y, index) => {
                const text = String.fromCharCode(33 + Math.random() * 93);
                const x = index * 20;
                ctx.fillText(text, x, y);

                if (y > 100 + Math.random() * 10000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + 20;
                }
            });

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);

        // Listen for next clear
        const orgClear = executeTerminalCommand;
        // Intercept to clean up matrix canvas
        const orgClearCmd = mainCmd => {
            if (mainCmd === 'clear') {
                const c = document.getElementById('matrix-overlay');
                if (c) c.remove();
            }
        };

        // Setup clean hook
        document.addEventListener('keydown', function cleanMatrix(e) {
            if (e.key === 'Enter') {
                const val = termInput.value.trim().toLowerCase();
                if (val === 'clear' || val === 'matrix') {
                    const c = document.getElementById('matrix-overlay');
                    if (c) c.remove();
                    document.removeEventListener('keydown', cleanMatrix);
                }
            }
        });
    }

    // 14. Contact Form Validation, Persistence & Hidden Messages Dashboard
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validations
            const nameEl = document.getElementById('form-name');
            const emailEl = document.getElementById('form-email');
            const subjectEl = document.getElementById('form-subject');
            const msgEl = document.getElementById('form-message');

            let isValid = true;

            // Name validation
            if (!nameEl.value.trim()) {
                setError(nameEl, true);
                isValid = false;
            } else {
                setError(nameEl, false);
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailEl.value.trim() || !emailRegex.test(emailEl.value.trim())) {
                setError(emailEl, true);
                isValid = false;
            } else {
                setError(emailEl, false);
            }

            // Subject validation
            if (!subjectEl.value.trim()) {
                setError(subjectEl, true);
                isValid = false;
            } else {
                setError(subjectEl, false);
            }

            // Message validation
            if (!msgEl.value.trim()) {
                setError(msgEl, true);
                isValid = false;
            } else {
                setError(msgEl, false);
            }

            if (isValid) {
                // Save Message to localStorage
                const newMessage = {
                    name: nameEl.value.trim(),
                    email: emailEl.value.trim(),
                    subject: subjectEl.value.trim(),
                    message: msgEl.value.trim(),
                    time: new Date().toLocaleString()
                };

                const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                existingMessages.push(newMessage);
                localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));

                // Success Feedback
                createConfettiBlast();
                createToast('Message Sent Successfully!', 'send');

                // Clear Form
                contactForm.reset();

                // Print command tip in terminal if terminal is open
                writeLineToTerminal(`System: Message received from ${newMessage.name}. Type <span class="term-highlight">messages</span> to inspect.`, 'system-line');
            }
        });

        function setError(inputEl, isError) {
            const group = inputEl.closest('.form-group');
            if (isError) {
                group.classList.add('has-error');
            } else {
                group.classList.remove('has-error');
            }
        }
    }

    // 15. Easter Egg: Double Click Avatar Profile to reveal messages dashboard
    const profileAvatar = document.getElementById('profile-avatar-img');
    const avatarFallback = document.getElementById('avatar-fallback');
    const inboxSection = document.getElementById('inbox-dashboard-section');
    const closeInboxBtn = document.getElementById('close-inbox-btn');

    if (profileAvatar) {
        profileAvatar.addEventListener('dblclick', toggleInboxDashboard);
    }
    if (avatarFallback) {
        avatarFallback.addEventListener('dblclick', toggleInboxDashboard);
    }

    if (closeInboxBtn && inboxSection) {
        closeInboxBtn.addEventListener('click', () => {
            inboxSection.classList.add('hidden');
        });
    }

    // --- AUTHENTICATION & SECURITY STATE ---
    const DEFAULT_PASSCODE_HASH = "b922a9675276e0388d1d86d63503cb358c213271d47155700832049d5bf1531e"; // SHA-256 for "admin123"
    let failedAttempts = parseInt(localStorage.getItem('admin_failed_attempts') || '0');
    let lockoutTime = parseInt(localStorage.getItem('admin_lockout_time') || '0');
    let lockoutInterval = null;

    // Standard pure JS SHA-256 implementation
    function sha256(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j;
        var result = '';
        var words = [];
        var asciiLength = ascii[lengthProperty];
        var hash = sha256.h = sha256.h || [];
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = candidate;
                }
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }
        ascii += '\x80';
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return;
            words[i >> 2] |= j << ((3 - i % 4) * 8);
        }
        words[words[lengthProperty]] = ((asciiLength * 8) / maxWord) | 0;
        words[words[lengthProperty]] = (asciiLength * 8) | 0;

        var hashCopy = hash.slice(0);
        for (j = 0; j < words[lengthProperty]; j += 16) {
            var w = words.slice(j, j + 16);
            var oldHash = hash.slice(0);
            for (i = 0; i < 64; i++) {
                var wItem = w[i];
                if (i >= 16) {
                    var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                    var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                    wItem = w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
                }
                var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
                var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
                var temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + wItem) | 0;
                var temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj) | 0;
                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
                hash.length = 8;
            }
            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }
        for (i = 0; i < 8; i++) {
            var val = hashCopy[i] = (hashCopy[i] + hash[i]) | 0;
            if (val < 0) val += maxWord;
            var hex = val.toString(16);
            while (hex[lengthProperty] < 8) hex = '0' + hex;
            result += hex;
        }
        return result;
    }

    function isLockedOut() {
        if (lockoutTime > 0) {
            const now = Date.now();
            if (now < lockoutTime) {
                return true;
            } else {
                localStorage.removeItem('admin_lockout_time');
                localStorage.setItem('admin_failed_attempts', '0');
                failedAttempts = 0;
                lockoutTime = 0;
                return false;
            }
        }
        return false;
    }

    function isAdminAuthenticated() {
        return sessionStorage.getItem('admin_authenticated') === 'true';
    }

    function verifyPasscode(input) {
        if (isLockedOut()) return false;

        const inputHash = sha256(input);
        const savedHash = localStorage.getItem('admin_passcode_hash') || DEFAULT_PASSCODE_HASH;

        if (inputHash === savedHash) {
            localStorage.setItem('admin_failed_attempts', '0');
            failedAttempts = 0;
            sessionStorage.setItem('admin_authenticated', 'true');
            return true;
        } else {
            failedAttempts++;
            localStorage.setItem('admin_failed_attempts', failedAttempts.toString());
            if (failedAttempts >= 3) {
                const blockTime = Date.now() + 30000; // 30s lockout
                localStorage.setItem('admin_lockout_time', blockTime.toString());
                lockoutTime = blockTime;
            }
            return false;
        }
    }

    // Modal UI selectors
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasscodeField = document.getElementById('admin-passcode');
    const togglePassVisibility = document.getElementById('toggle-login-pass-visibility');
    const eyeIconLogin = document.getElementById('eye-icon-login');
    const loginErrorMsg = document.getElementById('login-error-msg');
    const lockoutBanner = document.getElementById('lockout-banner');
    const lockoutTimeLeft = document.getElementById('lockout-time-left');
    const loginSubmitBtn = document.getElementById('login-submit-btn');
    const closeLoginBtn = document.getElementById('close-login-modal');

    // Show/hide passcode input
    if (togglePassVisibility && adminPasscodeField) {
        togglePassVisibility.addEventListener('click', () => {
            if (adminPasscodeField.type === 'password') {
                adminPasscodeField.type = 'text';
                eyeIconLogin.setAttribute('data-lucide', 'eye-off');
            } else {
                adminPasscodeField.type = 'password';
                eyeIconLogin.setAttribute('data-lucide', 'eye');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    function updateLockoutUI() {
        if (isLockedOut()) {
            const timeLeft = Math.ceil((lockoutTime - Date.now()) / 1000);
            if (timeLeft > 0) {
                if (lockoutBanner) lockoutBanner.style.display = 'flex';
                if (lockoutTimeLeft) lockoutTimeLeft.textContent = `Locked out. Retry in ${timeLeft}s`;
                if (adminPasscodeField) adminPasscodeField.disabled = true;
                if (loginSubmitBtn) loginSubmitBtn.disabled = true;
                if (loginErrorMsg) loginErrorMsg.style.display = 'none';
                return;
            }
        }
        if (lockoutBanner) lockoutBanner.style.display = 'none';
        if (adminPasscodeField) adminPasscodeField.disabled = false;
        if (loginSubmitBtn) loginSubmitBtn.disabled = false;
        if (lockoutInterval) {
            clearInterval(lockoutInterval);
            lockoutInterval = null;
        }
    }

    function startLockoutInterval() {
        if (lockoutInterval) clearInterval(lockoutInterval);
        updateLockoutUI();
        if (isLockedOut()) {
            lockoutInterval = setInterval(updateLockoutUI, 1000);
        }
    }

    // Run lockout initialization check
    startLockoutInterval();

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = adminPasscodeField.value;
            if (verifyPasscode(input)) {
                if (adminLoginModal) adminLoginModal.classList.remove('active');
                adminPasscodeField.value = '';
                if (loginErrorMsg) loginErrorMsg.style.display = 'none';

                if (inboxSection) {
                    inboxSection.classList.remove('hidden');
                    renderInboxMessages();
                    renderAdminAnalytics();
                    inboxSection.scrollIntoView({ behavior: 'smooth' });
                }
                createToast('Authentication successful!', 'unlock');
            } else {
                const card = adminLoginModal.querySelector('.modal-content');
                if (card) {
                    card.classList.add('shake');
                    setTimeout(() => card.classList.remove('shake'), 400);
                }
                if (loginErrorMsg) loginErrorMsg.style.display = 'block';
                if (isLockedOut()) {
                    startLockoutInterval();
                }
            }
        });
    }

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            if (adminLoginModal) adminLoginModal.classList.remove('active');
        });
    }

    // Toggle Admin Dashboard
    function toggleInboxDashboard() {
        if (isAdminAuthenticated()) {
            if (inboxSection) {
                inboxSection.classList.toggle('hidden');
                if (!inboxSection.classList.contains('hidden')) {
                    renderInboxMessages();
                    renderAdminAnalytics();
                    inboxSection.scrollIntoView({ behavior: 'smooth' });
                    createToast('Admin Message Dashboard unlocked!', 'unlock');
                }
            }
        } else {
            if (adminLoginModal) {
                adminLoginModal.classList.add('active');
                if (loginErrorMsg) loginErrorMsg.style.display = 'none';
                startLockoutInterval();
            }
        }
    }

    // --- TAB SWITCHING SYSTEM ---
    const tabBtns = document.querySelectorAll('.dashboard-tab-btn');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Render specific components on tab focus
            if (targetTab === 'tab-analytics') {
                renderAdminAnalytics();
            } else if (targetTab === 'tab-logs') {
                renderInboxMessages();
            }
        });
    });

    // --- MESSAGES LOG LOGIC (WITH SEARCH/FILTERS/EXPORTS) ---
    const searchInput = document.getElementById('log-search-input');
    const categoryFilter = document.getElementById('log-category-filter');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');

    if (searchInput) {
        searchInput.addEventListener('input', renderInboxMessages);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', renderInboxMessages);
    }
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('admin_authenticated');
            if (inboxSection) inboxSection.classList.add('hidden');
            createToast('Logged out successfully.', 'lock');
        });
    }

    function renderInboxMessages() {
        const listEl = document.getElementById('inbox-messages-list');
        const noticeEl = document.getElementById('empty-inbox-notice');

        if (!listEl) return;

        let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');

        // Category filtering
        const filterVal = categoryFilter ? categoryFilter.value : 'all';
        if (filterVal !== 'all') {
            messages = messages.filter(msg => {
                const subj = (msg.subject || '').toLowerCase();
                const isHiring = subj.includes('hire') || subj.includes('job') || subj.includes('offer') || subj.includes('position') || subj.includes('work');
                const isCollab = subj.includes('collab') || subj.includes('partner') || subj.includes('project') || subj.includes('build');

                if (filterVal === 'hiring') return isHiring;
                if (filterVal === 'collaboration') return isCollab;
                if (filterVal === 'general') return !isHiring && !isCollab;
                return true;
            });
        }

        // Search filtering
        const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (searchVal) {
            messages = messages.filter(msg => {
                return (msg.name || '').toLowerCase().includes(searchVal) ||
                    (msg.email || '').toLowerCase().includes(searchVal) ||
                    (msg.subject || '').toLowerCase().includes(searchVal) ||
                    (msg.message || '').toLowerCase().includes(searchVal);
            });
        }

        listEl.innerHTML = '';

        if (messages.length === 0) {
            if (noticeEl) {
                noticeEl.style.display = 'flex';
                noticeEl.querySelector('p').textContent = 'No messages matching filters found.';
            }
            return;
        }

        if (noticeEl) noticeEl.style.display = 'none';

        messages.forEach((msg, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${msg.time}</td>
                <td><strong>${escapeHTML(msg.name)}</strong></td>
                <td><a href="mailto:${msg.email}" style="color:var(--accent);">${escapeHTML(msg.email)}</a></td>
                <td>${escapeHTML(msg.subject)}</td>
                <td style="max-width:300px; word-break:break-all;">${escapeHTML(msg.message)}</td>
                <td>
                    <button class="inbox-action-delete" data-index="${idx}" title="Delete entry">
                        <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
                    </button>
                </td>
            `;
            listEl.appendChild(tr);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Delete handlers (mapped back to master logs array)
        const deleteButtons = listEl.querySelectorAll('.inbox-action-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const masterMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                const targetMsg = messages[idx];

                const masterIdx = masterMsgs.findIndex(m =>
                    m.time === targetMsg.time &&
                    m.email === targetMsg.email &&
                    m.message === targetMsg.message
                );

                if (masterIdx !== -1) {
                    masterMsgs.splice(masterIdx, 1);
                    localStorage.setItem('portfolio_messages', JSON.stringify(masterMsgs));
                    renderInboxMessages();
                    renderAdminAnalytics();
                    createToast('Message entry deleted.', 'trash-2');
                }
            });
        });
    }

    // --- DATA SCIENCE ANALYTICS CHART GENERATION ---
    function renderAdminAnalytics() {
        const totalEl = document.getElementById('kpi-total-messages');
        const uniqueEl = document.getElementById('kpi-unique-senders');
        const topCatEl = document.getElementById('kpi-top-category');
        const catContainer = document.getElementById('category-chart-container');
        const domContainer = document.getElementById('domain-chart-container');

        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');

        // Metrics calculation
        if (totalEl) totalEl.textContent = messages.length;

        const uniqueEmails = new Set(messages.map(m => (m.email || '').toLowerCase().trim()));
        if (uniqueEl) uniqueEl.textContent = uniqueEmails.size;

        let hiringCount = 0, collabCount = 0, generalCount = 0;
        messages.forEach(msg => {
            const subj = (msg.subject || '').toLowerCase();
            if (subj.includes('hire') || subj.includes('job') || subj.includes('offer') || subj.includes('position') || subj.includes('work')) {
                hiringCount++;
            } else if (subj.includes('collab') || subj.includes('partner') || subj.includes('project') || subj.includes('build')) {
                collabCount++;
            } else {
                generalCount++;
            }
        });

        let topCat = 'N/A';
        if (messages.length > 0) {
            const maxVal = Math.max(hiringCount, collabCount, generalCount);
            if (maxVal === hiringCount) topCat = 'Hiring';
            else if (maxVal === collabCount) topCat = 'Collaboration';
            else topCat = 'General';
        }
        if (topCatEl) topCatEl.textContent = topCat;

        // Subject categories vertical bar chart
        if (catContainer) {
            if (messages.length === 0) {
                catContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">No message data available</span>`;
            } else {
                const categories = [
                    { name: 'Hiring', count: hiringCount },
                    { name: 'Collaboration', count: collabCount },
                    { name: 'General', count: generalCount }
                ];
                const maxCount = Math.max(...categories.map(c => c.count)) || 1;
                const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#00f2fe';

                let svgHtml = `<svg viewBox="0 0 400 180" style="width:100%; height:100%;">`;
                categories.forEach((cat, idx) => {
                    const y = 30 + idx * 50;
                    const percentWidth = (cat.count / maxCount) * 220;

                    svgHtml += `
                        <text x="10" y="${y + 15}" fill="var(--text-secondary)" font-size="12" font-weight="500">${cat.name}</text>
                        <rect x="110" y="${y}" width="220" height="20" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
                        <rect x="110" y="${y}" width="${percentWidth}" height="20" rx="4" fill="${accentColor}" />
                        <text x="${120 + percentWidth}" y="${y + 14}" fill="var(--text-primary)" font-size="11" font-weight="bold">${cat.count}</text>
                    `;
                });
                svgHtml += `</svg>`;
                catContainer.innerHTML = svgHtml;
            }
        }

        // Email domains donut chart
        if (domContainer) {
            if (messages.length === 0) {
                domContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">No message data available</span>`;
            } else {
                const domains = {};
                messages.forEach(msg => {
                    const email = msg.email || '';
                    const parts = email.split('@');
                    if (parts.length > 1) {
                        const domain = parts[1].toLowerCase().trim();
                        domains[domain] = (domains[domain] || 0) + 1;
                    }
                });

                const domainList = Object.entries(domains).map(([domain, count]) => ({ domain, count }));
                domainList.sort((a, b) => b.count - a.count);

                const chartData = [];
                let otherCount = 0;
                domainList.forEach((d, idx) => {
                    if (idx < 3) chartData.push(d);
                    else otherCount += d.count;
                });
                if (otherCount > 0) chartData.push({ domain: 'others', count: otherCount });

                const totalCount = messages.length;
                const colors = ['var(--accent)', '#a855f7', '#10b981', '#fbbf24'];

                let svgHtml = `<svg viewBox="0 0 320 200" style="width:100%; height:100%;">`;
                const cx = 100, cy = 100, r = 50, strokeWidth = 14;
                const circ = 2 * Math.PI * r;
                let currentOffset = 0;

                chartData.forEach((d, idx) => {
                    const percent = d.count / totalCount;
                    const strokeDasharray = `${percent * circ} ${circ}`;
                    const strokeDashoffset = -currentOffset;
                    const strokeColor = colors[idx % colors.length];

                    svgHtml += `
                        <circle cx="${cx}" cy="${cy}" r="${r}" 
                            fill="transparent" 
                            stroke="${strokeColor}" 
                            stroke-width="${strokeWidth}" 
                            stroke-dasharray="${strokeDasharray}" 
                            stroke-dashoffset="${strokeDashoffset}"
                            transform="rotate(-90 ${cx} ${cy})" />
                    `;
                    currentOffset += percent * circ;

                    const legendY = 40 + idx * 30;
                    svgHtml += `
                        <circle cx="190" cy="${legendY - 4}" r="5" fill="${strokeColor}" />
                        <text x="205" y="${legendY}" fill="var(--text-secondary)" font-size="11">${d.domain}</text>
                        <text x="280" y="${legendY}" fill="var(--text-muted)" font-size="11" font-weight="bold">${d.count}</text>
                    `;
                });

                svgHtml += `
                    <text x="${cx}" y="${cy + 4}" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">${totalCount}</text>
                    <text x="${cx}" y="${cy + 15}" fill="var(--text-muted)" font-size="8" text-anchor="middle">messages</text>
                </svg>`;
                domContainer.innerHTML = svgHtml;
            }
        }
    }

    // --- DATA EXPORT ACTIONS & DB RESET ---
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');
    const clearDbBtn = document.getElementById('clear-all-messages-btn');

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            if (messages.length === 0) {
                createToast('No message records to export.', 'info');
                return;
            }
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Timestamp,Sender,Email,Subject,Message\n";
            messages.forEach(msg => {
                const row = [
                    `"${(msg.time || '').replace(/"/g, '""')}"`,
                    `"${(msg.name || '').replace(/"/g, '""')}"`,
                    `"${(msg.email || '').replace(/"/g, '""')}"`,
                    `"${(msg.subject || '').replace(/"/g, '""')}"`,
                    `"${(msg.message || '').replace(/"/g, '""')}"`
                ].join(",");
                csvContent += row + "\n";
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `portfolio_messages_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            createToast('Messages exported to CSV.', 'download');
        });
    }

    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => {
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            if (messages.length === 0) {
                createToast('No message records to export.', 'info');
                return;
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
            const link = document.createElement("a");
            link.setAttribute("href", dataStr);
            link.setAttribute("download", `portfolio_messages_${Date.now()}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            createToast('Messages exported to JSON.', 'download');
        });
    }

    if (clearDbBtn) {
        clearDbBtn.addEventListener('click', () => {
            if (confirm('Verify: Clear ALL database message records permanently?')) {
                localStorage.setItem('portfolio_messages', '[]');
                renderInboxMessages();
                renderAdminAnalytics();
                createToast('Database cleared.', 'trash-2');
            }
        });
    }

    // --- SECURITY PASSCODE CONFIGURATION ---
    const changePasscodeForm = document.getElementById('change-passcode-form');
    const oldPasscodeField = document.getElementById('old-passcode');
    const newPasscodeField = document.getElementById('new-passcode');
    const confirmPasscodeField = document.getElementById('confirm-passcode');
    const oldPassError = document.getElementById('old-passcode-error');
    const newPassError = document.getElementById('new-passcode-error');
    const confirmPassError = document.getElementById('confirm-passcode-error');

    if (changePasscodeForm) {
        changePasscodeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (oldPassError) oldPassError.style.display = 'none';
            if (newPassError) newPassError.style.display = 'none';
            if (confirmPassError) confirmPassError.style.display = 'none';

            const oldVal = oldPasscodeField.value;
            const newVal = newPasscodeField.value;
            const confirmVal = confirmPasscodeField.value;

            const savedHash = localStorage.getItem('admin_passcode_hash') || DEFAULT_PASSCODE_HASH;
            if (sha256(oldVal) !== savedHash) {
                if (oldPassError) oldPassError.style.display = 'block';
                return;
            }
            if (newVal.length < 6) {
                if (newPassError) newPassError.style.display = 'block';
                return;
            }
            if (newVal !== confirmVal) {
                if (confirmPassError) confirmPassError.style.display = 'block';
                return;
            }

            const newHash = sha256(newVal);
            localStorage.setItem('admin_passcode_hash', newHash);
            oldPasscodeField.value = '';
            newPasscodeField.value = '';
            confirmPasscodeField.value = '';
            createToast('Security passcode updated!', 'save');
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Toast notifications utility
    function createToast(msg, iconName = 'bell') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i data-lucide="${iconName}"></i>
            <span class="toast-msg">${msg}</span>
        `;
        container.appendChild(toast);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        setTimeout(() => {
            toast.style.animation = 'none'; // Clear animation
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';

            // Fade out
            setTimeout(() => {
                toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-20px)';
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        }, 10);
    }

    // Custom pure CSS/JS Confetti blast
    function createConfettiBlast() {
        const canvas = document.createElement('div');
        canvas.style.cssText = "position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden;";
        document.body.appendChild(canvas);

        const colors = ['#00f2fe', '#a855f7', '#10b981', '#f97316', '#fbbf24', '#ec4899'];

        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 8 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                left: 50%;
                bottom: 0%;
                opacity: 1;
                transform: translate(-50%, 0) rotate(0deg);
                transition: transform 1.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.5s ease-out;
            `;

            canvas.appendChild(particle);

            // Trigger blast coordinates
            const angle = (Math.random() * 120 + 30) * Math.PI / 180; // 30deg to 150deg
            const velocity = Math.random() * 600 + 400; // speed
            const dx = Math.cos(angle) * velocity;
            const dy = -Math.sin(angle) * velocity;
            const rotation = Math.random() * 720 - 360;

            setTimeout(() => {
                particle.style.transform = `translate(calc(-50% + ${dx}px), ${dy}px) rotate(${rotation}deg)`;
                particle.style.opacity = '0';
            }, 50);
        }

        setTimeout(() => {
            canvas.remove();
        }, 2000);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});