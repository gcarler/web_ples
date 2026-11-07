import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ples.com.co';
  const now = new Date();

  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/ples-crea', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ples-tic', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ples-catastro', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ples-consulting', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/forms', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/porque-somos-innovacion', priority: 0.8, changeFrequency: 'monthly' as const },
    
    // PLES TIC Services
    { url: '/ples-tic/ciberseguridad', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ples-tic/desarrollo-software', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ples-tic/soluciones-cloud', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ples-tic/analisis-datos-bi', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ples-tic/automatizacion-ia', priority: 0.8, changeFrequency: 'monthly' as const },

    // PLES Consulting Services
    { url: '/ples-consulting/gestion-agil', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-consulting/design-thinking', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-consulting/marco-logico', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-consulting/analisis-datos', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-consulting/investigacion-accion', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-consulting/facilitacion-estrategica', priority: 0.7, changeFrequency: 'monthly' as const },

    // PLES Catastro Services
    { url: '/ples-catastro/actualizacion-mantenimiento', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-catastro/avaluos', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-catastro/levantamiento-predial', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ples-catastro/ordenamiento-territorial', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
