// src/lib/translations.ts
import { type HeroStatement } from './models/content';

interface Translations {
  [key: string]: {
    Header: {
      about: string;
      login: string;
    };
    HomePage: {
      heroStatements: HeroStatement[];
    };
  };
}

export const translations: Translations = {
  en: {
    Header: {
      about: "About Us",
      login: "Login"
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
      ]
    }
  },
  es: {
    Header: {
      about: "Sobre Nosotros",
      login: "Iniciar sesión"
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
      ]
    }
  }
};
