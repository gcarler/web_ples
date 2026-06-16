import { Building, CheckCircle, Database, UsersRound, Globe, Server, HomeIcon, Lightbulb, Handshake, Users, BrainCircuit, Code, CloudCog, Lock, BarChart3, Brain, Settings, Search, DraftingCompass, KanbanSquare, FlaskConical, GitPullRequestArrow, ShoppingCart, Rocket, Layers, Zap, MessageSquare, MapPin, Scale, Home, Edit3, MonitorPlay, Clock, Target, ShieldCheck, Eye, Info, HeartPulse, Shield } from 'lucide-react';

export const translations = {
  en: {
    Header: {
      about: "About Us",
      login: "Login",
      plesCrea: "PLES CREA",
      plesTic: "PLES TIC",
      plesCatastro: "PLES Catastro",
      plesConsulting: "PLES Consulting"
    },
    Footer: {
        slogan: "We are Science, Technology, and Innovation.",
        linksTitle: "Links",
        home: "Home",
        about: "About Us",
        services: "Services",
        contact: "Contact Us",
        contactTitle: "Contact",
        followUs: "Follow Us",
        rights: "All rights reserved."
    },
    HomePage: {
      heroStatements: [
        {
          title: "Data, engineering, and purpose for development",
          description: "From idea to action: we help governments and companies generate real impact.",
          ctaText: "Start Today",
          ctaLink: "/forms",
          ctaIconName: "Send",
          ctaVariant: 'accent',
          order: 1,
        },
        {
          title: "Innovation that Impacts, Strategies that Last",
          description: "We create custom solutions that drive progress and build a sustainable legacy for your organization.",
          ctaText: "Learn How",
          ctaLink: "/porque-somos-innovacion",
          ctaIconName: "BookOpen",
          ctaVariant: 'accent',
          order: 2,
        },
        {
          title: "Comprehensive Solutions for Complex Challenges",
          description: "Technology, data, and strategy at the service of your goals.",
          ctaText: "Explore Services",
          ctaLink: "/#nuestras-marcas",
          ctaIconName: "Layers",
          ctaVariant: 'accent',
          order: 3,
        }
      ],
      experienceTitle: "THE INTELLIGENT USE OF EXPERIENCE",
      metrics: [
        [
          { icon: CheckCircle, text: "+15 projects executed" },
          { icon: Lightbulb, text: "+5000 consulting hours" },
        ],
        [
          { icon: Database, text: "42 information systems developed" },
          { icon: Building, text: "10+ sectors impacted" },
        ],
        [
          { icon: UsersRound, text: "8 academic and community alliances" },
          { icon: BrainCircuit, text: "+20 AI solutions implemented" },
        ]
      ],
      knowMore: "Know More",
      missionTitle: "Our Mission",
      missionDescription: "We are a company dedicated to offering innovative and efficient solutions that drive the growth and digital transformation of our clients. We believe in the power of technology to simplify processes and create value.",
      missionCTA: "Explore our Mission",
      brandsTitle: "Our Brands",
      brands: [
        { title: 'Ples CREA', description: 'Cartography and geospatial design.', icon: Globe, href: "/ples-crea" },
        { title: 'Ples TIC', description: 'Information technologies.', icon: Server, href: "/ples-tic" },
        { title: 'Ples Catastro', description: 'Cadastre and land management.', icon: HomeIcon, href: "/ples-catastro" },
        { title: 'Ples Consulting', description: 'Strategic consulting.', icon: Lightbulb, href: "/ples-consulting" },
      ],
      viewDetails: "View Details",
      audienceTitle: "Our Target Audience",
      audiences: [
          { icon: Building, title: 'Public Sector', description: 'We offer solutions adapted to the needs of government entities and public administrations, improving efficiency and transparency.'},
          { icon: Handshake, title: 'Private Sector', description: 'We boost business competitiveness with technological tools and strategic consulting to optimize their operations.'},
          { icon: Users, title: 'Social and Community Sector', description: 'We collaborate with non-profit organizations and communities to strengthen their social impact through technology and innovation.'},
      ],
      readyTitle: "Ready to Transform your Organization?",
      readyDescription: "Contact us today to discover how our solutions can help you achieve your goals.",
      readyCTA: "Contact Us Now",
    },
    AboutPage: {
        hero: {
            title: "About PLES",
            description: "We merge global vision and a multidisciplinary approach to build a legacy of impact and sustainability.",
            badges: ["#GlobalVision", "#Innovation", "#Sustainability"],
            cta: "Our Story"
        },
        identity: {
            title: "Our Identity",
            description: "With a global vision and a multidisciplinary approach, our team converges diverse talents and knowledge to achieve transcendent objectives. At PLES, we value the richness of each perspective, cultivating a space where disruptive and innovative ideas flourish, allowing for strategic and insightful interventions in any scenario.",
            sections: [
              { title: 'Our Essence', content: 'Understanding who we are.', link: '/about/esencia', icon: 'HeartPulse' },
              { title: 'Our Purpose', content: 'Exploring what drives us.', link: '/about/proposito', icon: 'Target' },
              { title: 'Global Collaboration', content: 'Learn how we work.', link: '/about/colaboracion', icon: 'Globe' },
              { title: 'Our Mission', content: 'Guiding our actions.', link: '/about/mision', icon: 'Rocket' },
              { title: 'Our Vision', content: 'Defining our horizon.', link: '/about/vision', icon: 'Eye' },
            ],
        },
        coreValues: [
            { id: 'collaboration', name: 'COLLABORATION', iconName: 'UsersIcon', explanation: "Collaboration is the essence of our actions. We foster synergy between multidisciplinary teams and promote strategic alliances to co-create comprehensive solutions that exceed expectations and generate a lasting impact." },
            { id: 'innovation', name: 'INNOVATION', iconName: 'Lightbulb', explanation: "As the engine of our progress, innovation drives us to challenge the status quo and constantly explore new technologies and methodologies. We turn bold ideas into practical solutions that provide tangible and sustainable value to our clients." },
            { id: 'integrity', name: 'INTEGRITY', iconName: 'Shield', explanation: "We act with honesty, transparency, and professional ethics in every interaction. Integrity is the pillar of the trust we build with our clients, partners, and the community, ensuring that our actions are always aligned with our principles." },
        ],
        integrityPhrases: [
            "We act with honesty,", "transparency, and professional", "ethics in every interaction.",
            "Integrity is the pillar", "of the trust we build", "with our clients, partners,", "and the community, ensuring", "that our actions", "are always aligned", "with our principles."
        ],
        innovationDescription: `As the engine of our progress, <strong>innovation</strong> drives us to <strong>challenge the status quo</strong> and constantly explore <strong>new technologies and methodologies</strong>. We turn <strong>bold ideas</strong> into practical solutions that provide <strong>tangible and sustainable value</strong> to our clients.`,
        collaborationPhrases: [
            "Collaboration", "is the essence", "of our actions.",
            "We foster synergy", "between multidisciplinary", "teams",
            "and promote", "strategic alliances", "to co-create",
            "comprehensive solutions", "that exceed", "expectations",
            "and generate", "a lasting", "impact."
        ],
        pillars: {
            title: "Our Fundamental Pillars",
            items: [
                { id: 'science', title: 'Science', description: 'Methodological rigor as a pillar of trust and effectiveness.', link: '/porque-somos-innovacion', iconName: 'FlaskConical' },
                { id: 'technology', title: 'Technology', description: 'Cutting-edge tools as catalysts for efficiency and scale.', link: '/porque-somos-innovacion', iconName: 'Cpu' },
                { id: 'innovation', title: 'Innovation', description: 'Creativity and disruptive thinking to generate sustainable value.', link: '/porque-somos-innovacion', iconName: 'Lightbulb' },
            ],
            cta: "Learn More",
        },
        closingStatement: "These values are manifested in our unwavering commitment to environmental resilience and gender equity, seeking to generate a significant and lasting legacy in every community we embrace."
    },
    PlesTic: {
        title: "PLES TIC",
        subtitle: "Technological Innovation and Digital Strategy for the Present",
        description: "At PLES TIC, we combine technical expertise with business vision to develop robust, scalable, and secure IT solutions that drive your growth and operational efficiency.",
        badges: ["#SoftwareDevelopment", "#CloudSolutions", "#Cybersecurity", "#AIAutomation", "#DataAnalysis"],
        cta: "Discover Our Solutions",
        whyChooseTitle: "Why Choose PLES TIC?",
        whyChooseDesc: "We focus on tangible results, building long-term technological alliances for your organization's success.",
        propositions: [
            { icon: Settings, title: "Custom Solutions", description: "We develop software and systems specifically tailored to your needs and strategic goals." },
            { icon: Lightbulb, title: "Cutting-edge Innovation", description: "We apply the latest technologies and methodologies to guarantee modern, efficient, and future-ready solutions." },
            { icon: ShieldCheck, title: "Comprehensive Security", description: "We protect your digital assets with proactive and robust cybersecurity strategies adapted to your environment." },
            { icon: TrendingUp, title: "Optimization and Efficiency", description: "We automate and optimize your workflows to improve productivity, reduce costs, and power growth." }
        ],
        servicesTitle: "Our Key Technological Services",
        services: [
            { icon: Code, title: "Custom Software Development", description: "We create custom web, mobile, and enterprise applications, from conception to deployment and ongoing maintenance.", details: ["Systems Analysis and Design", "Full-Stack Development (Frontend/Backend)", "API and External Service Integration", "Agile Methodologies (Scrum/Kanban)"], cta: "More about Custom Development" },
            { icon: CloudCog, title: "Cloud Solutions and DevOps", description: "We design, implement, and manage secure, scalable, and cost-efficient cloud infrastructures (AWS, Azure, GCP).", details: ["Strategic Cloud Migration", "Serverless and Microservices Architectures", "Infrastructure as Code (IaC)", "CI/CD and DevOps Automation"], cta: "Discover Cloud Solutions" },
            { icon: Lock, title: "Advanced Cybersecurity", description: "We protect your information and systems against cyber threats with audits, consulting, and state-of-the-art security solutions.", details: ["Vulnerability Analysis and Ethical Pentesting", "Identity and Access Management (IAM/IGA)", "Network and Endpoint Security (EDR/XDR)", "Incident Response Plans (IRP)"], cta: "Strengthen Your Security" },
            { icon: BarChart3, title: "Data Analysis and Business Intelligence (BI)", description: "We transform your data into valuable information for strategic decision-making through interactive dashboards and reports.", details: ["Data Modeling and Warehousing", "Data Visualization (Tableau, Power BI, Looker)", "Predictive Analysis and ML Fundamentals", "ETL/ELT Processes and Data Quality"], cta: "Explore Business Intelligence" },
            { icon: Brain, title: "Intelligent Automation with AI", description: "We power your business with custom AI solutions that optimize processes, extract value from your data, and improve decision-making.", details: ["AI Opportunity Analysis and Diagnosis", "ML and Deep Learning Model Development", "Intelligent Chatbot and Virtual Assistant Implementation", "NLP and Computer Vision"], cta: "Learn Our AI Capabilities" }
        ],
        approachTitle: "Our Collaborative Approach",
        approachDesc: "We work closely with you at every stage, from initial idea to ongoing support, ensuring solutions that really work.",
        approachSteps: [
            { icon: Search, title: "Understanding and Diagnosis", description: "We analyze your needs, goals, and current technological environment." },
            { icon: DraftingCompass, title: "Design and Strategic Planning", description: "We define the architecture, technologies, and project roadmap." },
            { icon: KanbanSquare, title: "Agile Development and Implementation", description: "We build the solution with a focus on quality and incremental deliveries." },
            { icon: FlaskConical, title: "Exhaustive Testing and Deployment", description: "We perform rigorous testing to guarantee functionality and security." },
            { icon: GitPullRequestArrow, title: "Support and Continuous Evolution", description: "We offer post-implementation support and continuous maintenance plans." }
        ],
        techTitle: "Technologies and Platforms We Master",
        techDesc: "We use a modern and flexible tech stack to build robust, scalable, and secure solutions adapted to your industry's challenges.",
        projectsTitle: "Featured Projects",
        ctaSectionTitle: "Boost Your Business with Tomorrow's Technology",
        ctaSectionDesc: "Discover how PLES TIC's custom solutions can transform your organization, optimize your operations, and open new growth opportunities.",
        ctaSectionBtn: "Request Technological Advice"
    },
    PlesCatastro: {
        title: "PLES Catastro",
        subtitle: "Experts in territorial and cadastral management with a multipurpose approach.",
        description: "We modernize territorial administration by applying cutting-edge technology and scientific methodologies to guarantee legal security and sustainable development.",
        badges: ["#MultipurposeCadastre", "#TerritorialManagement", "#GIS"],
        cta: "Let's Talk About Your Territory",
        servicesTitle: "Our Services",
        services: [
            { slug: "levantamiento-predial", title: "Multipurpose Property Survey", description: "Accurate cadastral surveys (urban and rural) for fiscal, legal, and economic purposes." },
            { slug: "actualizacion-mantenimiento", title: "Cadastral Update and Maintenance", description: "Continuous and automated processes to keep cadastral information updated and reliable." },
            { slug: "avaluos", title: "Mass and Specific Appraisals", description: "Property valuations with robust methodologies for a fair tax base." },
            { slug: "ordenamiento-territorial", title: "Land Use Planning (POT)", description: "Strategic plans that guide sustainable growth and efficient territory occupation." }
        ],
        loading: "Loading..."
    },
    PlesConsulting: {
        title: "PLES Consulting",
        subtitle: "Strategic allies for innovation and transformation.",
        description: "We collaborate with organizations to design and implement solutions that generate a positive and lasting impact.",
        badges: ["#OrganizationalStrategy", "#InnovationWithPurpose", "#SustainableDevelopment"],
        cta: "Let's Talk About Your Challenges",
        expertiseTitle: "Our Areas of Expertise",
        expertiseDesc: "From strategic planning to digital transformation, we offer a range of services designed to power your organization's growth and efficiency.",
        differentiatorsTitle: "Our Differential Value",
        processTitle: "How We Work: Our Collaborative Process",
        processDesc: "We believe in a participatory approach tailored to your needs, ensuring relevant and sustainable solutions.",
        methodologiesTitle: "Methodologies and Tools that Power Success",
        methodologiesDesc: "We apply a diverse set of proven methodologies and innovative tools to address your challenges from multiple perspectives.",
        ctaSectionTitle: "Let's Power Your Organization's Next Stage Together",
        ctaSectionDesc: "If you are looking for a strategic ally to navigate complexity, innovate with purpose, and achieve extraordinary results, PLES Consulting is your ideal partner.",
        ctaSectionBtn: "Contact Our Experts"
    },
    PlesCrea: {
        title: "PLES CREA",
        subtitle: "We transform geospatial data into visual knowledge.",
        description: "We design maps and 3D models that reveal patterns, optimize decisions, and shape the future.",
        badges: ["#Geospatial", "#DigitalCartography", "#3DInnovation"],
        cta: "Start Your Geospatial Project",
        servicesTitle: "Our Geospatial Services",
        servicesDesc: "We offer a complete portfolio of services to cover all phases of a geospatial project, from data capture to advanced analysis.",
        processTitle: "Our Collaborative Process",
        processDesc: "We apply a rigorous methodological approach to guarantee the highest quality and precision in every project.",
        ctaSectionTitle: "Visualize Your World. Transform Your Decisions.",
        ctaSectionDesc: "Let us show you how geospatial intelligence can reveal new opportunities and optimize your operations.",
        ctaSectionBtn: "Talk to an Expert"
    }
  },
  es: {
    Header: {
      about: "Sobre Nosotros",
      login: "Iniciar Sesión",
      plesCrea: "PLES CREA",
      plesTic: "PLES TIC",
      plesCatastro: "PLES Catastro",
      plesConsulting: "PLES Consulting"
    },
    Footer: {
        slogan: "Somos Ciencia, Tecnología e Innovación.",
        linksTitle: "Enlaces",
        home: "Inicio",
        about: "Sobre Nosotros",
        services: "Servicios",
        contact: "Contáctenos",
        contactTitle: "Contacto",
        followUs: "Síguenos",
        rights: "Todos los derechos reservados."
    },
    HomePage: {
      heroStatements: [
        {
          title: "Datos, ingeniería y propósito para el desarrollo",
          description: "De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.",
          ctaText: "Empieza hoy",
          ctaLink: "/forms",
          ctaIconName: "Send",
          ctaVariant: 'accent',
          order: 1,
        },
        {
          title: "Innovación que Impacta, Estrategias que Perduran",
          description: "Creamos soluciones a medida que impulsan el progreso y construyen un legado sostenible para su organización.",
          ctaText: "Conoce cómo",
          ctaLink: "/porque-somos-innovacion",
          ctaIconName: "BookOpen",
          ctaVariant: 'accent',
          order: 2,
        },
        {
          title: "Soluciones Integrales para Desafíos Complejos",
          description: "Tecnología, datos y estrategia al servicio de tus metas.",
          ctaText: "Explora Servicios",
          ctaLink: "/#nuestras-marcas",
          ctaIconName: "Layers",
          ctaVariant: 'accent',
          order: 3,
        }
      ],
      experienceTitle: "EL USO INTELIGENTE DE LA EXPERIENCIA",
      metrics: [
        [
          { icon: CheckCircle, text: "+15 proyectos ejecutados" },
          { icon: Lightbulb, text: "+5000 horas de consultoría" },
        ],
        [
          { icon: Database, text: "42 sistemas de información desarrollados" },
          { icon: Building, text: "10+ sectores impactados" },
        ],
        [
          { icon: UsersRound, text: "8 alianzas académicas y comunitarias" },
          { icon: BrainCircuit, text: "+20 soluciones de IA implementadas" },
        ]
      ],
      knowMore: "Saber Más",
      missionTitle: "Nuestra Misión",
      missionDescription: "Somos una empresa dedicada a ofrecer soluciones innovadoras y eficientes que impulsan el crecimiento y la transformación digital de nuestros clientes. Creemos en el poder de la tecnología para simplificar procesos y crear valor.",
      missionCTA: "Explora nuestra Misión",
      brandsTitle: "Nuestras Marcas",
      brands: [
        { title: 'Ples CREA', description: 'Cartografía y diseño geoespacial.', icon: Globe, href: "/ples-crea" },
        { title: 'Ples TIC', description: 'Tecnologías de la información.', icon: Server, href: "/ples-tic" },
        { title: 'Ples Catastro', description: 'Catastro y gestión territorial.', icon: HomeIcon, href: "/ples-catastro" },
        { title: 'Ples Consulting', description: 'Consultoría estratégica.', icon: Lightbulb, href: "/ples-consulting" },
      ],
      viewDetails: "Ver Detalles",
      audienceTitle: "Nuestro Público Objetivo",
      audiences: [
          { icon: Building, title: 'Sector Público', description: 'Ofrecemos soluciones adaptadas a las necesidades de entidades gubernamentales y administraciones públicas, mejorando la eficiencia y transparencia.'},
          { icon: Handshake, title: 'Sector Privado', description: 'Impulsamos la competitividad de las empresas con herramientas tecnológicas y consultoría estratégica para optimizar sus operaciones.'},
          { icon: Users, title: 'Sector Social y Comunitario', description: 'Colaboramos con organizaciones sin fines de lucro y comunidades para fortalecer su impacto social a través de la tecnología y la innovación.'},
      ],
      readyTitle: "¿Listo para Transformar su Organización?",
      readyDescription: "Contáctenos hoy mismo para descubrir cómo nuestras soluciones pueden ayudarle a alcanzar sus objetivos.",
      readyCTA: "Contactar Ahora",
    },
    AboutPage: {
        hero: {
            title: "Sobre PLES",
            description: "Fusionamos visión global y enfoque multidisciplinario para construir un legado de impacto y sostenibilidad.",
            badges: ["#VisiónGlobal", "#Innovación", "#Sostenibilidad"],
            cta: "Nuestra Historia"
        },
        identity: {
            title: "Nuestra Identidad",
            description: "Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.",
            sections: [
              { title: 'Nuestra Esencia', content: 'Comprendiendo quienes somos.', link: '/about/esencia', icon: 'HeartPulse' },
              { title: 'Nuestro Propósito', content: 'Explorando nuestro motor.', link: '/about/proposito', icon: 'Target' },
              { title: 'Colaboración Global', content: 'Conoce cómo trabajamos.', link: '/about/colaboracion', icon: 'Globe' },
              { title: 'Nuestra Misión', content: 'Guiando nuestras acciones.', link: '/about/mision', icon: 'Rocket' },
              { title: 'Nuestra Visión', content: 'Definiendo nuestro horizonte.', link: '/about/vision', icon: 'Eye' },
            ],
        },
        coreValues: [
            { id: 'colaboracion', name: 'COLABORACIÓN', iconName: 'UsersIcon', explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos la sinergia entre equipos multidisciplinarios y promovemos alianzas estratégicas para co-crear soluciones integrales que superan las expectativas y generan un impacto duradero." },
            { id: 'innovacion', name: 'INNOVACIÓN', iconName: 'Lightbulb', explanation: "Como motor de nuestro progreso, la innovación nos impulsa a desafiar el status quo y a explorar constantemente nuevas tecnologías y metodologías. Convertimos ideas audaces en soluciones prácticas que aportan un valor tangible y sostenible a nuestros clientes." },
            { id: 'integridad', name: 'INTEGRIDAD', iconName: 'Shield', explanation: "Actuamos con honestidad, transparencia y ética profesional en cada interacción. La integridad es el pilar de la confianza que construimos con nuestros clientes, socios y la comunidad, garantizando que nuestras acciones siempre están alineadas con nuestros principios." },
        ],
        integrityPhrases: [
            "Actuamos con honestidad,", "transparencia y ética", "profesional en cada interacción.",
            "La integridad es el pilar", "de la confianza que construimos", "con nuestros clientes, socios", "y la comunidad, garantizando", "que nuestras acciones", "siempre estén alineadas", "con nuestros principios."
        ],
        innovationDescription: `Como motor de nuestro progreso, la <strong>innovación</strong> nos impulsa a <strong>desafiar el status quo</strong> y a explorar constantemente <strong>nuevas tecnologías y metodologíass</strong>. Convertimos <strong>ideas audaces</strong> en soluciones prácticas que aportan un <strong>valor tangible y sostenible</strong> a nuestros clientes.`,
        collaborationPhrases: [
            "La colaboración", "es la esencia", "de nuestro accionar.",
            "Fomentamos la sinergia", "entre equipos", "multidisciplinarios",
            "y promovemos", "alianzas estratégicas", "para co-crear",
            "soluciones integrales", "que superan", "las expectativas",
            "y generan", "un impacto", "duradero."
        ],
        pillars: {
            title: "Nuestros Pilares Fundamentales",
            items: [
                { id: 'ciencia', title: 'Ciencia', description: 'El rigor metodológico como pilar de la confianza y la efectividad.', link: '/porque-somos-innovacion', iconName: 'FlaskConical' },
                { id: 'tecnologia', title: 'Tecnología', description: 'Herramientas de vanguardia como catalizadores de la eficiencia y la escala.', link: '/porque-somos-innovacion', iconName: 'Cpu' },
                { id: 'innovacion', title: 'Innovación', description: 'La creatividad y el pensamiento disruptivo para generar valor sostenible.', link: '/porque-somos-innovacion', iconName: 'Lightbulb' },
            ],
            cta: "Saber Más",
        },
        closingStatement: "Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos."
    },
    PlesTic: {
        title: "PLES TIC",
        subtitle: "Innovación Tecnológica y Estrategia Digital para el Presente",
        description: "En PLES TIC, combinamos experticia técnica con visión de negocio para desarrollar soluciones de TI robustas, escalables y seguras que impulsan su crecimiento y eficiencia operativa.",
        badges: ["#DesarrolloDeSoftware", "#SolucionesCloud", "#Ciberseguridad", "#AutomatizacionIA", "#AnalisisDeDatos"],
        cta: "Descubra Nuestras Soluciones",
        whyChooseTitle: "¿Por Qué Elegir PLES TIC?",
        whyChooseDesc: "Nos enfocamos en resultados tangibles, construyendo alianzas tecnológicas a largo plazo para el éxito de su organización.",
        propositions: [
            { icon: Settings, title: "Soluciones a Medida", description: "Desarrollamos software y sistemas adaptados específicamente a sus necesidades y objetivos estratégicos." },
            { icon: Lightbulb, title: "Innovación y Vanguardia", description: "Aplicamos las últimas tecnologías y metodologías para garantizar soluciones modernas, eficientes y preparadas para el futuro." },
            { icon: ShieldCheck, title: "Seguridad Integral", description: "Protegemos sus activos digitales con estrategias de ciberseguridad proactivas y robustas adaptadas a su entorno." },
            { icon: TrendingUp, title: "Optimización y Eficiencia", description: "Automatizamos y optimizamos sus flujos de trabajo para mejorar la productividad, reducir costos y potenciar el crecimiento." }
        ],
        servicesTitle: "Nuestros Servicios Tecnológicos Clave",
        services: [
            { icon: Code, title: "Desarrollo de Software a Medida", description: "Creamos aplicaciones web, móviles y empresariales personalizadas, desde la concepción hasta el despliegue y mantenimiento continuo.", details: ["Análisis y Diseño de Sistemas", "Desarrollo Full-Stack (Frontend/Backend)", "Integración de APIs y Servicios Externos", "Metodologías Ágiles (Scrum/Kanban)"], cta: "Más sobre Desarrollo a Medida" },
            { icon: CloudCog, title: "Soluciones Cloud y DevOps", description: "Diseñamos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes (AWS, Azure, GCP).", details: ["Migración Estratégica a la Nube", "Arquitecturas Serverless y Microservicios", "Infraestructura como Código (IaC)", "CI/CD y Automatización DevOps"], cta: "Descubra Soluciones Cloud" },
            { icon: Lock, title: "Ciberseguridad Avanzada", description: "Protegemos su información y sistemas contra amenazas cibernéticas con auditorías, consultoría y soluciones de seguridad de última generación.", details: ["Análisis de Vulnerabilidades y Pentesting Ético", "Gestión de Identidad y Acceso (IAM/IGA)", "Seguridad de Redes y Endpoints (EDR/XDR)", "Planes de Respuesta a Incidentes (IRP)"], cta: "Fortalezca su Seguridad" },
            { icon: BarChart3, title: "Análisis de Datos e Inteligencia de Negocio (BI)", description: "Transformamos sus datos en información valiosa para la toma de decisiones estratégicas, mediante dashboards y reportes interactivos.", details: ["Modelado y Almacenamiento de Datos (Data Warehousing)", "Visualización de Datos (Tableau, Power BI, Looker)", "Análisis Predictivo y Fundamentos de Machine Learning", "Procesos ETL/ELT y Calidad de Datos"], cta: "Explore Inteligencia de Negocio" },
            { icon: Brain, title: "Automatización Inteligente con IA", description: "Potenciamos su negocio con soluciones de IA personalizadas que optimizan procesos, extraen valor de sus datos y mejoran la toma de decisiones.", details: ["Análisis y Diagnóstico de Oportunidades de IA", "Desarrollo de Modelos de Machine Learning y Deep Learning", "Implementación de Chatbots y Asistentes Virtuales Inteligentes", "NLP y Visión por Computadora"], cta: "Conozca Nuestras Capacidades en IA" }
        ],
        approachTitle: "Nuestro Enfoque Colaborativo",
        approachDesc: "Trabajamos de cerca con usted en cada etapa, desde la idea inicial hasta el soporte continuo, asegurando soluciones que realmente funcionan.",
        approachSteps: [
            { icon: Search, title: "Entendimiento y Diagnóstico", description: "Analizamos sus necesidades, objetivos y entorno tecnológico actual." },
            { icon: DraftingCompass, title: "Diseño y Planificación Estratégica", description: "Definimos la arquitectura, tecnologías y hoja de ruta del proyecto." },
            { icon: KanbanSquare, title: "Desarrollo Ágil e Implementación", description: "Construimos la solución con enfoque en calidad y entregas incrementales." },
            { icon: FlaskConical, title: "Pruebas Exhaustivas y Despliegue", description: "Realizamos pruebas rigurosas para garantizar funcionalidad y seguridad." },
            { icon: GitPullRequestArrow, title: "Soporte y Evolución Continua", description: "Ofrecemos soporte post-implementación y planes de mantenimiento continuo." }
        ],
        techTitle: "Tecnologías y Plataformas que Dominamos",
        techDesc: "Utilizamos un stack tecnológico moderno y flexible para construir soluciones robustas, escalables y seguras, adaptadas a los desafíos de su industria.",
        projectsTitle: "Proyectos Destacados",
        ctaSectionTitle: "Impulse su Negocio con la Tecnología del Mañana",
        ctaSectionDesc: "Descubra cómo las soluciones personalizadas de PLES TIC pueden transformar su organización, optimizar sus operaciones y abrir nuevas oportunidades de crecimiento.",
        ctaSectionBtn: "Solicitar Asesoría Tecnológica"
    },
    PlesCatastro: {
        title: "PLES Catastro",
        subtitle: "Expertos en gestión territorial y catastral con enfoque multipropósito.",
        description: "Modernizamos la administración del territorio aplicando tecnología de vanguardia y metodologías científicas para garantizar la seguridad jurídica y el desarrollo sostenible.",
        badges: ["#CatastroMultipropósito", "#GestiónTerritorial", "#SIG"],
        cta: "Hablemos de su Territorio",
        servicesTitle: "Nuestros Servicios",
        services: [
            { slug: "levantamiento-predial", title: "Levantamiento Predial Multipropósito", description: "Levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos y económicos." },
            { slug: "actualizacion-mantenimiento", title: "Actualización y Mantenimiento Catastral", description: "Procesos continuos y automatizados para mantener la información catastral actualizada y confiable." },
            { slug: "avaluos", title: "Avalúos Masivos y Puntuales", description: "Valoraciones de propiedades con metodologías robustas para una base imponible justa." },
            { slug: "ordenamiento-territorial", title: "Planes de Ordenamiento Territorial (POT)", description: "Planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio." }
        ],
        loading: "Cargando..."
    },
    PlesConsulting: {
        title: "PLES Consulting",
        subtitle: "Aliados estratégicos para la innovación y la transformación.",
        description: "Colaboramos con organizaciones para diseñar e implementar soluciones que generan un impacto positivo y duradero.",
        badges: ["#EstrategiaOrganizacional", "#InnovacionConProposito", "#DesarrolloSostenible"],
        cta: "Conversemos Sobre sus Desafíos",
        expertiseTitle: "Nuestras Áreas de Expertise",
        expertiseDesc: "Desde la planificación estratégica hasta la transformación digital, ofrecemos un abanico de servicios diseñados para potenciar el crecimiento y la eficiencia de su organización.",
        differentiatorsTitle: "Nuestro Valor Diferencial",
        processTitle: "Cómo Trabajamos: Nuestro Proceso Colaborativo",
        processDesc: "Creemos en un enfoque participativo y adaptado a sus necesidades, asegurando soluciones pertinentes y sostenibles.",
        methodologiesTitle: "Metodologías y Herramientas que Potencian el Éxito",
        methodologiesDesc: "Aplicamos un conjunto diverso de metodologías probadas y herramientas innovadoras para abordar sus desafíos desde múltiples perspectivas.",
        ctaSectionTitle: "Impulsemos Juntos la Próxima Etapa de su Organización",
        ctaSectionDesc: "Si busca un aliado estratégico para navegar la complejidad, innovar con propósito y alcanzar resultados extraordinarios, PLES Consulting es su socio ideal.",
        ctaSectionBtn: "Contacte con Nuestros Expertos"
    },
    PlesCrea: {
        title: "PLES CREA",
        subtitle: "Transformamos datos geoespaciales en conocimiento visual.",
        description: "Diseñamos mapas y modelos 3D que revelan patrones, optimizan decisiones y dan forma al futuro.",
        badges: ["#Geoespacial", "#CartografíaDigital", "#Innovación3D"],
        cta: "Inicie su Proyecto Geoespacial",
        servicesTitle: "Nuestros Servicios Geoespaciales",
        servicesDesc: "Ofrecemos un portafolio completo de servicios para cubrir todas las fases de un proyecto geoespacial, desde la captura de datos hasta el análisis avanzado.",
        processTitle: "Nuestro Proceso Colaborativo",
        processDesc: "Aplicamos un enfoque metodológico riguroso para garantizar resultados de la más alta calidad y precisión en cada proyecto.",
        ctaSectionTitle: "Visualice su Mundo. Transforme sus Decisiones.",
        ctaSectionDesc: "Permítanos mostrarle cómo la inteligencia geoespacial puede revelar nuevas oportunidades y optimizar sus operaciones.",
        ctaSectionBtn: "Hable con un Experto"
    }
  }
};
