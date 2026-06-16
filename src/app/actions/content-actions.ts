'use server';

import { HeroStatement, CoreValue, Pillar } from '@/lib/models/content';

/**
 * Fetches hero statements. 
 * Since Firebase is disabled, it returns default statements.
 */
export async function getHeroStatements(): Promise<HeroStatement[]> {
  return [
      {
        title: "Datos, ingeniería y propósito \n para el {{word}}",
        description: "De la idea a la acción: acompañamos a gobiernos y empresas a generar impacto real.",
        ctaText: "Empieza hoy",
        ctaLink: "/forms",
        ctaIconName: "Send",
        ctaVariant: 'accent',
        order: 1,
      },
      {
        title: "Innovación que Impacta, \n Estrategias que {{word}}",
        description: "Creamos soluciones a medida que impulsan el progreso y construyen un legado sostenible para su organización.",
        ctaText: "Conoce cómo",
        ctaLink: "/innovacion-estrategias",
        ctaIconName: "BookOpen",
        ctaVariant: 'accent',
        order: 2,
      },
      {
        title: "Soluciones {{word}} \n para Desafíos Complejos",
        description: "Tecnología, datos y estrategia al servicio de tus metas.",
        ctaText: "Explora Servicios",
        ctaLink: "/#nuestras-marcas",
        ctaIconName: "Layers",
        ctaVariant: 'accent',
        order: 3,
      },
    ];
}

export async function updateHeroStatement(
    id: string,
    data: any
): Promise<{ success: boolean; message: string | null }> {
    return { success: true, message: 'Hero statement updated successfully (Mock).' };
}


// --- Core Values Actions ---
export async function getCoreValues(): Promise<CoreValue[]> {
    return [
        { id: 'colaboracion', name: 'COLABORACIÓN', iconName: 'UsersIcon', explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos la sinergia entre equipos multidisciplinarios y promovemos alianzas estratégicas para co-crear soluciones integrales que superan las expectativas y generan un impacto duradero.", order: 0 },
        { id: 'innovacion', name: 'INNOVACIÓN', iconName: 'Lightbulb', explanation: "Como motor de nuestro progreso, la innovación nos impulsa a desafiar el status quo y a explorar constantemente nuevas tecnologías y metodologías. Convertimos ideas audaces en soluciones prácticas que aportan un valor tangible y sostenible a nuestros clientes.", order: 1 },
        { id: 'integridad', name: 'INTEGRIDAD', iconName: 'Shield', explanation: "Actuamos con honestidad, transparencia y ética profesional en cada interacción. La integridad es el pilar de la confianza que construimos con nuestros clientes, socios y la comunidad, garantizando que nuestras acciones siempre estén alineadas con nuestros principios.", order: 2 },
    ];
}

export async function updateCoreValue(id: string, data: any): Promise<{ success: boolean; message: string | null }> {
    return { success: true, message: 'Core value updated (Mock).' };
}


// --- Pillars Actions ---
export async function getPillars(): Promise<Pillar[]> {
    return [
        { id: 'ciencia', title: 'Ciencia', description: 'El rigor metodológico como pilar de la confianza y la efectividad.', link: '/porque-somos-ciencia', iconName: 'FlaskConical', order: 0 },
        { id: 'tecnologia', title: 'Tecnología', description: 'Herramientas de vanguardia como catalizadores de la eficiencia y la escala.', link: '/porque-somos-tecnologia', iconName: 'Cpu', order: 1 },
        { id: 'innovacion', title: 'Innovación', description: 'La creatividad y el pensamiento disruptivo para generar valor sostenible.', link: '/porque-somos-innovacion', iconName: 'Lightbulb', order: 2 },
    ];
}

export async function updatePillar(id: string, data: any): Promise<{ success: boolean; message: string | null }> {
    return { success: true, message: 'Pillar updated (Mock).' };
}
