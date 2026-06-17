'use server';

import { HeroStatement, CoreValue, Pillar } from '@/lib/models/content';
import { db } from '@/db';
import { heroStatements, coreValues, pillars } from '@/db/schema';
import { eq } from 'drizzle-orm';

const defaultHeroStatements = [
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

export async function getHeroStatements(): Promise<HeroStatement[]> {
    try {
        const statements = await db.select().from(heroStatements).orderBy(heroStatements.order);
        if (statements.length === 0) {
            // Seed DB
            await db.insert(heroStatements).values(defaultHeroStatements);
            return defaultHeroStatements as any;
        }
        return statements as any;
    } catch (e) {
        console.error('Database Error:', e);
        return defaultHeroStatements as any;
    }
}

export async function updateHeroStatement(
    id: string,
    data: any
): Promise<{ success: boolean; message: string | null }> {
    try {
        await db.update(heroStatements).set(data).where(eq(heroStatements.id, parseInt(id)));
        return { success: true, message: 'Hero statement updated successfully.' };
    } catch (e) {
        return { success: false, message: 'Database Error updating hero statement.' };
    }
}

const defaultCoreValues = [
    { id: 'colaboracion', name: 'COLABORACIÓN', iconName: 'UsersIcon', explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos la sinergia entre equipos multidisciplinarios y promovemos alianzas estratégicas para co-crear soluciones integrales que superan las expectativas y generan un impacto duradero.", order: 0 },
    { id: 'innovacion', name: 'INNOVACIÓN', iconName: 'Lightbulb', explanation: "Como motor de nuestro progreso, la innovación nos impulsa a desafiar el status quo y a explorar constantemente nuevas tecnologías y metodologías. Convertimos ideas audaces en soluciones prácticas que aportan un valor tangible y sostenible a nuestros clientes.", order: 1 },
    { id: 'integridad', name: 'INTEGRIDAD', iconName: 'Shield', explanation: "Actuamos con honestidad, transparencia y ética profesional en cada interacción. La integridad es el pilar de la confianza que construimos con nuestros clientes, socios y la comunidad, garantizando que nuestras acciones siempre estén alineadas con nuestros principios.", order: 2 },
];

export async function getCoreValues(): Promise<CoreValue[]> {
    try {
        const values = await db.select().from(coreValues).orderBy(coreValues.order);
        if (values.length === 0) {
            await db.insert(coreValues).values(defaultCoreValues);
            return defaultCoreValues;
        }
        return values;
    } catch (e) {
        return defaultCoreValues;
    }
}

export async function updateCoreValue(id: string, data: any): Promise<{ success: boolean; message: string | null }> {
    try {
        await db.update(coreValues).set(data).where(eq(coreValues.id, id));
        return { success: true, message: 'Core value updated.' };
    } catch (e) {
        return { success: false, message: 'Database Error updating core value.' };
    }
}

const defaultPillars = [
    { id: 'ciencia', title: 'Ciencia', description: 'El rigor metodológico como pilar de la confianza y la efectividad.', link: '/porque-somos-ciencia', iconName: 'FlaskConical', order: 0 },
    { id: 'tecnologia', title: 'Tecnología', description: 'Herramientas de vanguardia como catalizadores de la eficiencia y la escala.', link: '/porque-somos-tecnologia', iconName: 'Cpu', order: 1 },
    { id: 'innovacion', title: 'Innovación', description: 'La creatividad y el pensamiento disruptivo para generar valor sostenible.', link: '/porque-somos-innovacion', iconName: 'Lightbulb', order: 2 },
];

export async function getPillars(): Promise<Pillar[]> {
    try {
        const data = await db.select().from(pillars).orderBy(pillars.order);
        if (data.length === 0) {
            await db.insert(pillars).values(defaultPillars);
            return defaultPillars;
        }
        return data;
    } catch (e) {
        return defaultPillars;
    }
}

export async function updatePillar(id: string, data: any): Promise<{ success: boolean; message: string | null }> {
    try {
        await db.update(pillars).set(data).where(eq(pillars.id, id));
        return { success: true, message: 'Pillar updated.' };
    } catch (e) {
        return { success: false, message: 'Database Error updating pillar.' };
    }
}
