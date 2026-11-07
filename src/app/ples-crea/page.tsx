// src/app/ples-crea/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Map,
  Box,
  Camera,
  Layers,
  Plane,
  Crosshair,
  Timer,
  Maximize2,
  Mountain,
  Compass,
  CheckCircle2,
  Building2,
  Pickaxe,
  TreePine,
  Wheat,
  FileCheck2,
  Radar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function PlesCreaPage() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const content = t?.PlesCrea || (translations.es as any)?.PlesCrea;

  const [activeSpecTab, setActiveSpecTab] = useState<'aero' | 'sensors' | 'accuracy'>('aero');

  const services = [
    {
      icon: Map,
      title: isEn ? "Digital & Thematic Cartography" : "Cartografía Digital y Temática",
      description: isEn
        ? "Production of custom high-precision maps (topographic, urban, environmental, cadastral, and zoning)."
        : "Producción de planos y mapas personalizados de alta precisión (topográficos, urbanos, ambientales, prediales y de zonificación).",
      features: isEn
        ? [
            "Centimeter-accuracy vector topology",
            "Regulatory zoning & territorial POT compliance",
            "Multi-format export (SHP, GeoJSON, CAD, Geopackage)",
            "Web GIS layers ready for spatial analysis"
          ]
        : [
            "Topología vectorial con precisión centimétrica",
            "Compatibilidad con normas POT y cartografía oficial",
            "Exportación multiformato (SHP, GeoJSON, CAD, Geopackage)",
            "Capas SIG web listas para análisis espacial"
          ],
    },
    {
      icon: Box,
      title: isEn ? "3D Modeling & Digital Twins" : "Modelado 3D y Gemelos Digitales",
      description: isEn
        ? "Dense photorealistic 3D mesh and terrain surface generation from LiDAR and multi-angle drone photogrammetry."
        : "Generación de mallas 3D y representaciones de superficies a partir de nubes de puntos LiDAR y fotogrametría aérea.",
      features: isEn
        ? [
            "Dense point clouds with RGB and intensity classification",
            "Digital Surface & Terrain Models (DSM / DTM)",
            "BIM and structural interference inspection",
            "Photorealistic 3D interactive web visualization"
          ]
        : [
            "Nubes de puntos densas con clasificación RGB e intensidad",
            "Modelos Digitales de Superficie y Terreno (MDS / MDT)",
            "Interoperabilidad con entornos BIM e infraestructura",
            "Visualización web 3D interactiva y gemelos virtuales"
          ],
    },
    {
      icon: Camera,
      title: isEn ? "Aerial Photogrammetry & Remote Sensing" : "Fotogrametría Aérea y Teledetección",
      description: isEn
        ? "High-resolution multispectral and RGB imagery acquisition with automated orthomosaic stitching."
        : "Adquisición de imágenes de ultra-alta resolución con sensores RGB y multiespectrales para ortomosaicos continuos.",
      features: isEn
        ? [
            "Ground Sampling Distance (GSD) from 3 to 4 cm/pixel",
            "NDVI, NDRE and vegetation stress index mapping",
            "Thermal inspection & environmental monitoring",
            "Radiometrically calibrated raw sensor datasets"
          ]
        : [
            "Resolución de píxel en tierra (GSD) de 3 a 4 cm",
            "Mapas de índices de vegetación (NDVI, NDRE, SAVI)",
            "Monitoreo térmico e inspección de cuencas hídricas",
            "Conjuntos de datos radiométricamente calibrados"
          ],
    },
    {
      icon: Layers,
      title: isEn ? "Advanced GIS & Spatial Analytics" : "Análisis Espacial Avanzado y SIG",
      description: isEn
        ? "Strategic territorial insights through mathematical modeling, volumetric calculation, and slope risk modeling."
        : "Modelado matemático territorial, cálculo volumétrico en canteras y análisis predictivo de pendientes y escorrentías.",
      features: isEn
        ? [
            "Cut & fill stockpile volume calculation (mining & earthworks)",
            "Hydrographic catchment basins and flood risk modeling",
            "Optimal corridor routing for civil infrastructure",
            "Interactive dashboards and spatial decision portals"
          ]
        : [
            "Cálculo volumétrico de corte y relleno (minería y obras)",
            "Modelado de cuencas hidrográficas y riesgo de inundación",
            "Trazado óptimo de corredores viales y ductos",
            "Dashboards interactivos y visores geográficos corporativos"
          ],
    },
  ];

  const droneSpecs = [
    {
      icon: Timer,
      value: "150 min",
      label: isEn ? "Flight Autonomy" : "Autonomía de Vuelo",
      desc: isEn ? "Continuous coverage up to 20 km² per flight" : "Cobertura de hasta 20 km² en una sola misión",
    },
    {
      icon: Crosshair,
      value: "RTK / PPK",
      label: isEn ? "Centimeter Precision" : "Precisión Centimétrica",
      desc: isEn ? "High accuracy GNSS without mandatory ground GCPs" : "Módulos GNSS de alta gama sin necesidad de puntos GCP",
    },
    {
      icon: Plane,
      value: "VTOL 4x4m",
      label: isEn ? "Vertical Takeoff" : "Despegue Vertical",
      desc: isEn ? "Zero runways needed; safe operations anywhere" : "Despegue y aterrizaje en espacios reducidos sin pistas",
    },
    {
      icon: Maximize2,
      value: "3 - 4 cm",
      label: isEn ? "Ground Resolution (GSD)" : "Resolución de Terreno",
      desc: isEn ? "Survey-grade detail for engineering and CAD" : "Nivel de detalle sub-decimétrico para ingeniería",
    },
    {
      icon: Mountain,
      value: "6.000 m",
      label: isEn ? "Service Ceiling" : "Techo de Operación",
      desc: isEn ? "Fully capable in high mountain Andean conditions" : "Operación estable en alta montaña y vientos hasta 43 km/h",
    },
    {
      icon: Radar,
      value: "Multi-Payload",
      label: isEn ? "Modular Sensors" : "Carga Útil Modular",
      desc: isEn ? "Compatible with 42MP Full-Frame & Light LiDAR" : "Bahía compatible con cámaras Full-Frame y sensores LiDAR",
    },
  ];

  const industries = [
    {
      icon: Building2,
      title: isEn ? "Civil Infrastructure & Roads" : "Infraestructura y Vías",
      desc: isEn
        ? "Right-of-way surveys, asset inspection, alignment corridors, and construction progress tracking."
        : "Levantamiento de franjas de servidumbre, seguimiento de obras civiles, diseño de alineamientos y cálculo de tierras.",
    },
    {
      icon: Pickaxe,
      title: isEn ? "Mining & Earthmoving" : "Minería y Movimiento de Tierras",
      desc: isEn
        ? "High-frequency pit volume quantification, bench stability, tailing dams, and stockpile inventory."
        : "Cuantificación precisa de pilas de acopio, estabilidad de taludes, tajos a cielo abierto y control de inventarios.",
    },
    {
      icon: TreePine,
      title: isEn ? "Environment & Watersheds" : "Medio Ambiente y Cuencas",
      desc: isEn
        ? "Coastal erosion mapping, mangrove ecosystem monitoring, forest inventory, and water body delineations."
        : "Monitoreo de erosión costera, manglares, cobertura vegetal, modelado de cuencas y planes de contingencia ambiental.",
    },
    {
      icon: Wheat,
      title: isEn ? "Precision Agriculture" : "Agricultura de Precisión",
      desc: isEn
        ? "Crop health assessment via multispectral NDVI analysis, drainage design, and yield optimization."
        : "Diagnóstico de vigor vegetativo con sensores multiespectrales, zonificación por estrés hídrico y optimización de drenajes.",
    },
    {
      icon: Compass,
      title: isEn ? "Urban Planning & Cadastre" : "Planificación Territorial y Catastro",
      desc: isEn
        ? "Sub-centimeter land parcel mapping, municipal POT zoning, informal settlement regularization, and master plans."
        : "Actualización de cartografía predial para POT, regularización territorial y planos base para gobiernos locales.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: isEn ? "Flight Planning & Mission Design" : "Planificación de Vuelo y Parámetros",
      desc: isEn
        ? "Definition of GSD, flight lines, overlap ratios, weather analysis, and aeronautical airspace permits."
        : "Configuración de altura de vuelo, traslape longitudinal y transversal, análisis orográfico y permisos de espacio aéreo.",
    },
    {
      step: "02",
      title: isEn ? "VTOL Aerial Capture & Telemetry" : "Captura Aérea y Adquisición Multi-Sensor",
      desc: isEn
        ? "Autonomous mission deployment with CHCNAV P330 Pro VTOL using RTK differential corrections in real-time."
        : "Despliegue autónomo con el dron VTOL y registro de telemetría geodésica con corrección diferencial en tiempo real.",
    },
    {
      step: "03",
      title: isEn ? "Photogrammetric Cloud Processing" : "Procesamiento y Nubes de Puntos",
      desc: isEn
        ? "Structure from Motion (SfM) computation, point cloud densification, orthorectification, and radiometric calibration."
        : "Cálculo de Structure from Motion (SfM), densificación de nube de puntos, ortorrectificación y calibración de bandas.",
    },
    {
      step: "04",
      title: isEn ? "Cartographic Delivery & Digital Twin" : "Cartografía Inteligente y Entrega SIG",
      desc: isEn
        ? "Vectorization, 3D mesh generation, QA/QC geodetic verification, and ready-to-use GIS portal delivery."
        : "Vectorización temática, generación de mallas 3D, control de calidad geodésico y entrega de capas interoperables.",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden border-b border-border/40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <GlobeIllustration />
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Crosshair className="h-3.5 w-3.5" />
                <span>{isEn ? "Geospatial Intelligence Division" : "División de Inteligencia Geoespacial"}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <strong className="text-primary">{content.subtitle}</strong> {content.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {content.badges.map((badge: string) => (
                  <Badge key={badge} variant="outline" className="text-sm px-3 py-1.5 border-primary/30 text-foreground bg-card">
                    {badge}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-sm px-3 py-1.5 border-primary/30 text-foreground bg-card">
                  #DronVTOL
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1.5 border-primary/30 text-foreground bg-card">
                  #LiDAR
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" variant="accent" className="text-base px-8 py-3 w-full sm:w-auto shadow-md" asChild>
                  <Link href={`/forms?service=ples-crea`}>
                    <span className="flex items-center justify-center">
                      {content.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-6 py-3 w-full sm:w-auto border-border" asChild>
                  <a href="#tecnologia-dron">
                    <span className="flex items-center justify-center">
                      <Plane className="mr-2 h-4 w-4 text-primary" />
                      {isEn ? "Drone Technology" : "Tecnología Dron"}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            {content.servicesTitle}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {content.servicesDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border border-border/60 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2 text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="border-t border-border/50 pt-4">
                    <ul className="space-y-2.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm text-foreground/90">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2.5 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-accent font-medium text-sm group" asChild>
                      <Link href={`/forms?service=ples-crea&subject=${encodeURIComponent(service.title)}`}>
                        <span className="flex items-center">
                          {isEn ? "Request this service" : "Solicitar cotización"}
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Drone Technology Showcase */}
      <section id="tecnologia-dron" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-muted/40 border-y border-border/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                <Plane className="h-3.5 w-3.5" />
                <span>{isEn ? "Flagship Aerial Platform" : "Plataforma Aérea Insignia"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                CHCNAV P330 Pro VTOL
              </h2>
              <p className="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed">
                {isEn
                  ? "A military-grade fixed-wing UAS engineered for massive survey coverage, high-altitude stability, and centimeter geodetic accuracy with vertical takeoff and landing."
                  : "Sistema aéreo no tripulado (UAS) de ala fija con despegue y aterrizaje vertical, concebido para mapeo de gran escala y precisión geodésica sin necesidad de pistas."}
              </p>
            </div>
            <div>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                <Link href="/forms?service=ples-crea&subject=Consulta%20Dron%20P330%20Pro">
                  <span className="flex items-center">
                    {isEn ? "Inquire Platform Specs" : "Consultar Capacidad Operativa"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {droneSpecs.map((spec, index) => {
              const SpecIcon = spec.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border/60 rounded-xl p-4 text-center hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 border border-primary/20">
                    <SpecIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {spec.value}
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">
                      {spec.label}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-tight">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Architecture Details */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  {isEn ? "Aerodynamics & Endurance" : "Aerodinámica y Autonomía"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isEn
                    ? "Hybrid 4+1 motor configuration provides vertical lift in restricted 4x4m clearings with cruise transition to 75.6 km/h, reaching up to 150 minutes of continuous survey time."
                    : "Su configuración híbrida 4+1 permite despegar verticalmente en claros de 4x4 metros y realizar la transición a vuelo de crucero a 75.6 km/h, alcanzando hasta 150 minutos en el aire."}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Crosshair className="h-5 w-5 text-primary" />
                  {isEn ? "Geodetic GNSS RTK / PPK" : "Geodesia GNSS RTK / PPK"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isEn
                    ? "Eliminates the logistical burden of ground control points (GCPs). Embedded multi-frequency GNSS guarantees sub-centimeter camera position recording at every shutter trigger."
                    : "Elimina la necesidad obligatoria de puntos de control en tierra (GCP). Su receptor multifrecuencia registra la posición precisa de cada disparo fotográfico en tiempo real."}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Radar className="h-5 w-5 text-primary" />
                  {isEn ? "Interchangeable Payloads" : "Cargas Útiles de Vanguardia"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isEn
                    ? "Supports 42-61 MP full-frame photogrammetric cameras, 5-band multispectral sensors for precision agriculture, and lightweight topographic LiDAR scanners."
                    : "Bahía modular adaptable a cámaras fotogramétricas de alta resolución (42-61 MP), sensores multiespectrales de 5 bandas y escáneres LiDAR topográficos aerotransportados."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Industries / Applications */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
              {isEn ? "Sectors & Application Domains" : "Sectores y Casos de Aplicación"}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {isEn
                ? "Geospatial data transformed into strategic intelligence for enterprise operations and public administration."
                : "Datos geoespaciales convertidos en decisiones estratégicas para empresas de ingeniería, energía y gobiernos locales."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, index) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                      <IndIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border/40 mt-6">
                    <Link
                      href={`/forms?service=ples-crea&subject=${encodeURIComponent(ind.title)}`}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary hover:text-accent group"
                    >
                      <span>{isEn ? "Explore Use Case" : "Ver Solución"}</span>
                      <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Collaborative Workflow */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-muted/20 border-t border-border/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
              {content.processTitle}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {content.processDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf, index) => (
              <div
                key={index}
                className="bg-card border border-border/60 rounded-xl p-6 relative hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-primary/30 font-comfortaa mb-4">
                    {wf.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {wf.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mt-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="text-center py-20 bg-primary text-primary-foreground">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6 border border-primary-foreground/20">
            <Map className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {content.ctaSectionTitle}
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed font-normal">
            {content.ctaSectionDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="accent" className="text-lg px-10 py-4 shadow-xl w-full sm:w-auto" asChild>
              <Link href={`/forms?service=ples-crea`}>
                <span className="flex items-center justify-center">
                  {content.ctaSectionBtn} <ArrowRight className="ml-3 h-5 w-5" />
                </span>
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="text-lg px-8 py-4 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto" asChild>
              <Link href="/about">
                <span>{isEn ? "About PLES" : "Conocer PLES"}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
