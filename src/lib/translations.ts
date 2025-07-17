// src/lib/translations.ts
import { type HeroStatement } from './models/content';
import { Building, CheckCircle, Database, UsersRound, Globe, Server, HomeIcon, Lightbulb, Handshake, Users, BrainCircuit } from 'lucide-react';

interface Translations {
  [key: string]: {
    Header: {
      about: string;
      login: string;
      plesCrea: string;
      plesTic: string;
      plesCatastro: string;
      plesConsulting: string;
    };
    HomePage: {
      heroStatements: HeroStatement[];
      experienceTitle: string;
      metrics: { icon: React.ElementType; text: string; dataAiHint: string }[][];
      knowMore: string;
      missionTitle: string;
      missionDescription: string;
      missionCTA: string;
      brandsTitle: string;
      brands: { title: string; description: string; icon: React.ElementType; href: string }[];
      viewDetails: string;
      audienceTitle: string;
      audiences: { title: string; description: string; icon: React.ElementType }[];
      readyTitle: string;
      readyDescription: string;
      readyCTA: string;
    };
    AboutPage: {
        hero: {
            title: string;
            description: string;
            badges: string[];
            cta: string;
        },
        identity: {
            title: string;
            description: string;
            sections: { title: string; content: string; link: string; icon: string }[];
        },
        values: {
            integrityPhrases: string[];
            innovationDescription: string;
            collaborationPhrases: string[];
        },
        pillars: {
            title: string;
            cta: string;
        },
        closingStatement: string;
    }
  };
}

export const translations: Translations = {
  en: {
    Header: {
      about: "About Us",
      login: "Login",
      plesCrea: "PLES CREA",
      plesTic: "PLES TIC",
      plesCatastro: "PLES Catastro",
      plesConsulting: "PLES Consulting"
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
          ctaLink: "/innovacion-estrategias",
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
          { icon: CheckCircle, text: "+15 projects executed", dataAiHint:"projects checkmark" },
          { icon: Lightbulb, text: "+5000 consulting hours", dataAiHint:"consulting lightbulb" },
        ],
        [
          { icon: Database, text: "42 information systems developed", dataAiHint:"database systems" },
          { icon: Building, text: "10+ sectors impacted", dataAiHint:"building sectors" },
        ],
        [
          { icon: UsersRound, text: "8 academic and community alliances", dataAiHint:"community alliance" },
          { icon: BrainCircuit, text: "+20 AI solutions implemented", dataAiHint:"ai solutions brain" },
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
        values: {
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
        },
        pillars: {
            title: "Our Fundamental Pillars",
            cta: "Learn More",
        },
        closingStatement: "These values are manifested in our unwavering commitment to environmental resilience and gender equity, seeking to generate a significant and lasting legacy in every community we embrace."
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
          ctaLink: "/innovacion-estrategias",
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
          { icon: CheckCircle, text: "+15 proyectos ejecutados", dataAiHint:"projects checkmark" },
          { icon: Lightbulb, text: "+5000 horas de consultoría", dataAiHint:"consulting lightbulb" },
        ],
        [
          { icon: Database, text: "42 sistemas de información desarrollados", dataAiHint:"database systems" },
          { icon: Building, text: "10+ sectores impactados", dataAiHint:"building sectors" },
        ],
        [
          { icon: UsersRound, text: "8 alianzas académicas y comunitarias", dataAiHint:"community alliance" },
          { icon: BrainCircuit, text: "+20 soluciones de IA implementadas", dataAiHint:"ai solutions brain" },
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
            ]
        },
        values: {
            integrityPhrases: [
              "Actuamos con honestidad,", "transparencia y ética", "profesional en cada interacción.",
              "La integridad es el pilar", "de la confianza que construimos", "con nuestros clientes, socios", "y la comunidad, garantizando", "que nuestras acciones", "siempre estén alineadas", "con nuestros principios."
            ],
            innovationDescription: `Como motor de nuestro progreso, la <strong>innovación</strong> nos impulsa a <strong>desafiar el status quo</strong> y a explorar constantemente <strong>nuevas tecnologías y metodologías</strong>. Convertimos <strong>ideas audaces</strong> en soluciones prácticas que aportan un <strong>valor tangible y sostenible</strong> a nuestros clientes.`,
            collaborationPhrases: [
              "La colaboración", "es la esencia", "de nuestro accionar.",
              "Fomentamos la sinergia", "entre equipos", "multidisciplinarios",
              "y promovemos", "alianzas estratégicas", "para co-crear",
              "soluciones integrales", "que superan", "las expectativas",
              "y generan", "un impacto", "duradero."
            ]
        },
        pillars: {
            title: "Nuestros Pilares Fundamentales",
            cta: "Saber Más",
        },
        closingStatement: "Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos."
    }
  }
};
