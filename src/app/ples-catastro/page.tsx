// src/app/ples-catastro/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowRight,
  CheckCircle2,
  Crosshair,
  Layers,
  Scale,
  Building2,
  MapPin,
  Landmark,
  FileCheck2,
  ShieldCheck,
  Compass,
  FileText,
  Database,
  Sparkles,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Eye,
  FolderGit2,
  HomeIcon,
  MousePointerClick,
  SlidersHorizontal,
  Send,
  Loader,
  Orbit,
  Printer,
  Download,
  Copy,
  Check,
  Radio,
  Navigation2,
  Satellite,
  Info,
  Award,
  Calendar,
  Hash
} from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/language-selector';

export default function PlesCatastroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground font-mono text-sm">Cargando PLES Catastro...</div>}>
      <PlesCatastroContent />
    </Suspense>
  );
}

function PlesCatastroContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // 3 Distinct Exploration Modes: Circular Ecosystem (default), Live GIS Console, and Official Cadastral Sheet
  const [activeView, setActiveView] = useState<'ecosystem' | 'console' | 'sheet'>('ecosystem');
  const [selectedSlug, setSelectedSlug] = useState<string>('levantamiento-predial');
  const [copiedCuv, setCopiedCuv] = useState(false);

  // In-situ Modal State for Institutional Consultation
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteEntityType, setQuoteEntityType] = useState('Alcaldía / Municipio');
  const [quoteScale, setQuoteScale] = useState('500 - 3.000 predios');
  const [quoteName, setQuoteName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  // GIS Interactive Simulator state
  const [activeLayers, setActiveLayers] = useState({
    vertices: true,
    deeds: true,
    valuation: false,
    zoning: false,
    flightGrid: false,
  });
  const [selectedParcelId, setSelectedParcelId] = useState<number>(1);
  const [hoveredParcel, setHoveredParcel] = useState<number | null>(null);
  const [liveCoords, setLiveCoords] = useState({
    lat: '10° 24\' 38.4" N',
    lon: '75° 30\' 14.2" W',
    elevation: '18.4 m s.n.m.',
    northing: '4.892.120 N',
    easting: '2.140.350 E',
  });

  // Handle map cursor coordinate tracking
  const handleMapMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const latBase = 10.4106 + (y / 100) * 0.005;
    const lonBase = 75.5039 + (x / 100) * 0.006;
    const northBase = 4892000 + Math.round(y * 2.8);
    const eastBase = 2140000 + Math.round(x * 3.4);

    setLiveCoords({
      lat: `${latBase.toFixed(5)}° N`,
      lon: `${lonBase.toFixed(5)}° W`,
      elevation: `${(15 + (x + y) * 0.1).toFixed(1)} m s.n.m.`,
      northing: `${northBase.toLocaleString()} N`,
      easting: `${eastBase.toLocaleString()} E`,
    });
  };

  // Sync initial slug with query params
  useEffect(() => {
    const slugParam = searchParams.get('service');
    if (slugParam && ['levantamiento-predial', 'actualizacion-mantenimiento', 'avaluos', 'ordenamiento-territorial'].includes(slugParam)) {
      setSelectedSlug(slugParam);
      if (slugParam === 'avaluos') {
        setActiveLayers(prev => ({ ...prev, valuation: true }));
      } else if (slugParam === 'ordenamiento-territorial') {
        setActiveLayers(prev => ({ ...prev, zoning: true }));
      }
    }
  }, [searchParams]);

  const handleSelectService = (slug: string) => {
    setSelectedSlug(slug);
    if (slug === 'avaluos') {
      setActiveLayers(prev => ({ ...prev, valuation: true, zoning: false }));
    } else if (slug === 'ordenamiento-territorial') {
      setActiveLayers(prev => ({ ...prev, valuation: false, zoning: true }));
    } else if (slug === 'actualizacion-mantenimiento') {
      setActiveLayers(prev => ({ ...prev, vertices: true, deeds: true }));
    } else {
      setActiveLayers(prev => ({ ...prev, vertices: true, deeds: true }));
    }
    router.push(`/ples-catastro?service=${slug}`, { scroll: false });
  };

  const handleOpenConsultation = (slug?: string) => {
    if (slug) setSelectedSlug(slug);
    setIsQuoteModalOpen(true);
  };

  const handleCopyCuv = (cuv: string) => {
    navigator.clipboard.writeText(cuv);
    setCopiedCuv(true);
    toast({
      title: "CUV Copiado",
      description: "El Código Único de Validación ha sido copiado al portapapeles.",
    });
    setTimeout(() => setCopiedCuv(false), 2500);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleExportGeoJson = () => {
    const activeParcel = parcels.find(p => p.id === selectedParcelId) || parcels[0];
    const geojsonData = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: { name: "EPSG:9377" }
      },
      features: [
        {
          type: "Feature",
          properties: {
            id: activeParcel.id,
            name: activeParcel.name,
            fmi: activeParcel.fmi,
            codigoPredialNacional: activeParcel.codigoPredial,
            areaM2: activeParcel.area,
            avaluoCatastral: activeParcel.val,
            avaluoComercial: activeParcel.valComercial,
            destinoEconomico: activeParcel.destino,
            estrato: activeParcel.estrato,
            titular: activeParcel.titular,
            estadoJuridico: "Saneado / Sin Gravamen",
            estandar: "ISO 19152 LADM-COL",
            origenCoordenadas: "MAGNA-SIRGAS Origen Nacional"
          },
          geometry: {
            type: "Polygon",
            coordinates: [activeParcel.coordsGeo]
          }
        }
      ]
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `LADM-COL_${activeParcel.fmi.replace('-', '_')}.geojson`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Modelo LADM-COL Exportado",
      description: `Archivo GeoJSON generado para ${activeParcel.name} (EPSG:9377).`,
    });
  };

  const handleSendConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail) {
      toast({
        title: currentUi.requiredFields,
        description: currentUi.requiredFieldsDesc,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmittingQuote(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));

    toast({
      title: currentUi.consultationSuccessTitle,
      description: `${currentUi.consultationSuccessDesc} "${currentService.title}".`,
    });

    setIsSubmittingQuote(false);
    setIsQuoteModalOpen(false);
    setQuoteNotes('');
  };

  // Multilingual UI Labels (100% complete across es, en, fr, pt, de, it)
  const uiI18n: Record<Language, any> = {
    es: {
      badgeEco: "Ecosistema Científico-Territorial LADM-COL",
      titleEco: "Ejes del Conocimiento y Gestión Predial",
      descEco: "Las cuatro dimensiones interconectadas que sustentan la administración moderna del territorio. Explore la constelación orbital de competencias técnicas, o interactúe con el simulador geoespacial y la ficha catastral oficial.",
      tabEcosystem: "Ecosistema Orbital",
      tabConsole: "Consola GIS en Vivo",
      tabSheet: "Ficha Catastral Oficial",
      btnConsult: "Consultar Alcance Institucional",
      btnSimulator: "Ver en Simulador GIS",
      btnSheet: "Ficha Catastral",
      colScientific: "Fundamento Científico & Normativo",
      colGovernance: "Gobernanza Territorial & Impacto",
      colScope: "Protocolos Operativos & Fases",
      deliverablesTitle: "Entregables Oficiales:",
      layerTitle: "Capas Espaciales Activas",
      simActive: "SISTEMA GNSS EN LÍNEA",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Pase el cursor para inspeccionar atributos; haga clic en un predio para ver su expediente LADM-COL.",
      consultScope: "Consultar Alcance",
      dimensionsTitle: "Desglose Tridimensional del Catastro",
      phasesTitle: "Fases de Ejecución Operativa",
      deliverablesCertified: "Entregables Certificados y Formatos Oficiales",
      complianceTitle: "Rigor Normativo y Cumplimiento de Estándares",
      complianceDesc: "Todos nuestros proyectos catastrales se desarrollan bajo el marco legal colombiano y estándares espaciales internacionales (ISO 19152, CONPES 3958).",
      bottomCtaTitle: "¿Listo para Modernizar la Gestión de su Territorio?",
      bottomCtaDesc: "Tanto si representa a una administración municipal que busca actualizar su censo fiscal, como si es una organización privada que requiere avalúos o levantamientos certificados, PLES SAS es su aliado estratégico.",
      bottomCtaBtn: "Consultar con un Perito Catastral",
      aboutPles: "Conocer Más Sobre PLES",
      dialogBadge: "Consulta Técnica Institucional",
      dialogDesc: "Indique los parámetros preliminares de su territorio o predio para que nuestro equipo formule un concepto técnico institucional.",
      requiredFields: "Campos requeridos",
      requiredFieldsDesc: "Por favor ingrese su nombre y correo para remitir la consulta técnica.",
      consultationSuccessTitle: "¡Consulta técnica remitida!",
      consultationSuccessDesc: "Hemos registrado su consulta para",
      cuvLabel: "Código Único de Validación (CUV)",
      certTitle: "Certificado Catastral Multipropósito LADM-COL",
      certSubtitle: "República de Colombia — Sistema de Administración del Territorio",
      dateIssued: "Fecha de Expedición:",
      validity: "Vigencia Oficial:",
      inspectorTitle: "Expediente del Predio Seleccionado",
      inspectorSubtitle: "Atributos alfanuméricos y geográficos vinculados",
      exportGeoJson: "Exportar GeoJSON LADM-COL",
      printCert: "Imprimir Certificado Oficial",
      kpiPrec: "Precisión GNSS",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Sincronía Registral",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Eficiencia Fiscal",
      kpiTaxVal: "+42% Base",
      kpiPot: "Horizonte POT",
      kpiPotVal: "12 Años",
    },
    en: {
      badgeEco: "LADM-COL Scientific-Territorial Ecosystem",
      titleEco: "Territorial Knowledge & Cadastral Pillars",
      descEco: "The four interconnected dimensions underpinning modern land administration. Explore the orbital constellation of competencies, or interact with the live geospatial simulator and official cadastral sheet.",
      tabEcosystem: "Orbital Ecosystem",
      tabConsole: "Live GIS Console",
      tabSheet: "Official Cadastral Sheet",
      btnConsult: "Request Institutional Scope",
      btnSimulator: "View in GIS Simulator",
      btnSheet: "Cadastral Sheet",
      colScientific: "Scientific & Legal Framework",
      colGovernance: "Territorial Governance & Impact",
      colScope: "Operational Protocols & Phases",
      deliverablesTitle: "Official Deliverables:",
      layerTitle: "Active Spatial Layers",
      simActive: "GNSS SYSTEM ONLINE",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Hover to inspect coordinates; click any parcel to inspect its full LADM-COL dossier.",
      consultScope: "Inquire Scope",
      dimensionsTitle: "Three-Dimensional Cadastre Breakdown",
      phasesTitle: "Operational Execution Phases",
      deliverablesCertified: "Certified Deliverables & Official Formats",
      complianceTitle: "Strict Regulatory Compliance & Standards",
      complianceDesc: "All our cadastral projects are developed under Colombian national legislation and ISO 19152 spatial standards.",
      bottomCtaTitle: "Ready to Modernize Your Territorial Management?",
      bottomCtaDesc: "Whether representing a municipal administration seeking to update its fiscal census or a private entity requiring certified surveys or appraisals, PLES SAS is your strategic ally.",
      bottomCtaBtn: "Consult a Cadastral Expert",
      aboutPles: "About PLES",
      dialogBadge: "Institutional Technical Inquiry",
      dialogDesc: "Provide initial parameters of your jurisdiction or property to receive an institutional technical concept.",
      requiredFields: "Required fields",
      requiredFieldsDesc: "Please enter your name and email to submit the technical inquiry.",
      consultationSuccessTitle: "Technical inquiry submitted!",
      consultationSuccessDesc: "We have recorded your inquiry for",
      cuvLabel: "Unique Validation Code (CUV)",
      certTitle: "LADM-COL Multipurpose Cadastral Certificate",
      certSubtitle: "Republic of Colombia — Land Administration System",
      dateIssued: "Issuance Date:",
      validity: "Official Validity:",
      inspectorTitle: "Selected Parcel Dossier",
      inspectorSubtitle: "Linked alphanumeric and spatial attributes",
      exportGeoJson: "Export LADM-COL GeoJSON",
      printCert: "Print Official Certificate",
      kpiPrec: "GNSS Precision",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Registry Sync",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Fiscal Efficiency",
      kpiTaxVal: "+42% Base",
      kpiPot: "POT Horizon",
      kpiPotVal: "12 Years",
    },
    fr: {
      badgeEco: "Écosystème Scientifique & Territorial LADM-COL",
      titleEco: "Piliers de la Connaissance et Gestion Foncière",
      descEco: "Les quatre dimensions interconnectées qui soutiennent l'administration moderne du territoire. Explorez la constellation orbitale ou interagissez avec le simulateur SIG et la fiche cadastrale officielle.",
      tabEcosystem: "Écosystème Orbital",
      tabConsole: "Console SIG en Direct",
      tabSheet: "Fiche Cadastrale Officielle",
      btnConsult: "Consulter la Portée Institutionnelle",
      btnSimulator: "Voir dans le Simulateur SIG",
      btnSheet: "Fiche Cadastrale",
      colScientific: "Fondement Scientifique & Légal",
      colGovernance: "Gouvernance Territoriale & Impact",
      colScope: "Protocoles Opérationnels & Phases",
      deliverablesTitle: "Livrables Officiels :",
      layerTitle: "Couches Spatiales Actives",
      simActive: "SYSTÈME GNSS EN LIGNE",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Survolez pour inspecter; cliquez sur une parcelle pour charger son dossier LADM-COL.",
      consultScope: "Consulter la Portée",
      dimensionsTitle: "Ventilation des 3 Dimensions Cadastrales",
      phasesTitle: "Phases d'Exécution Opérationnelle",
      deliverablesCertified: "Livrables Certifiés & Formats Officiels",
      complianceTitle: "Rigueur Normative et Conformité aux Normes",
      complianceDesc: "Tous nos projets cadastraux respectent la législation en vigueur et les normes ISO 19152.",
      bottomCtaTitle: "Prêt à Moderniser la Gestion de Votre Territoire ?",
      bottomCtaDesc: "PLES SAS est votre partenaire stratégique pour tout recensement fiscal ou délimitation foncière certifiée.",
      bottomCtaBtn: "Consulter un Expert Cadastral",
      aboutPles: "En savoir plus sur PLES",
      dialogBadge: "Consultation Technique Institutionnelle",
      dialogDesc: "Renseignez les données préliminaires de votre zone pour recevoir un avis technique officiel.",
      requiredFields: "Champs obligatoires",
      requiredFieldsDesc: "Veuillez renseigner votre nom et votre adresse e-mail.",
      consultationSuccessTitle: "Demande technique transmise !",
      consultationSuccessDesc: "Nous avons bien enregistré votre demande pour",
      cuvLabel: "Code Unique de Validation (CUV)",
      certTitle: "Certificat Cadastral Polyvalent LADM-COL",
      certSubtitle: "République de Colombie — Système d'Administration du Territoire",
      dateIssued: "Date d'Émission :",
      validity: "Validité Officielle :",
      inspectorTitle: "Dossier de la Parcelle Sélectionnée",
      inspectorSubtitle: "Attributs alphanumériques et géométriques liés",
      exportGeoJson: "Exporter GeoJSON LADM-COL",
      printCert: "Imprimer le Certificat Officiel",
      kpiPrec: "Précision GNSS",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Sync. Registre",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Efficience Fiscale",
      kpiTaxVal: "+42% Base",
      kpiPot: "Horizon POT",
      kpiPotVal: "12 Ans",
    },
    pt: {
      badgeEco: "Ecossistema Científico-Territorial LADM-COL",
      titleEco: "Pilares do Conhecimento e Gestão Fundiária",
      descEco: "As quatro dimensões interligadas que sustentam a administração moderna do território. Explore a constelação orbital ou interaja com o simulador geoespacial e a ficha cadastral oficial.",
      tabEcosystem: "Ecossistema Orbital",
      tabConsole: "Console GIS em Tempo Real",
      tabSheet: "Ficha Cadastral Oficial",
      btnConsult: "Consultar Escopo Institucional",
      btnSimulator: "Ver no Simulador GIS",
      btnSheet: "Ficha Cadastral",
      colScientific: "Fundamento Científico & Normativo",
      colGovernance: "Governança Territorial & Impacto",
      colScope: "Protocolos Operacionais & Fases",
      deliverablesTitle: "Entregáveis Oficiais:",
      layerTitle: "Camadas Espaciais Ativas",
      simActive: "SISTEMA GNSS ONLINE",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Passe o cursor para inspecionar; clique no imóvel para abrir o dossiê LADM-COL.",
      consultScope: "Consultar Escopo",
      dimensionsTitle: "Divisão Tridimensional do Cadastro",
      phasesTitle: "Fases de Execução Operacional",
      deliverablesCertified: "Entregáveis Certificados e Formatos Oficiais",
      complianceTitle: "Rigor Normativo e Conformidade Técnica",
      complianceDesc: "Nossos projetos são elaborados sob o marco legal territorial e padrões internacionais ISO 19152.",
      bottomCtaTitle: "Pronto para Modernizar a Gestão do seu Território?",
      bottomCtaDesc: "PLES SAS é seu parceiro estratégico para atualização cadastral e avaliações periciais.",
      bottomCtaBtn: "Consultar Perito Cadastral",
      aboutPles: "Conhecer a PLES",
      dialogBadge: "Consulta Técnica Institucional",
      dialogDesc: "Indique os parâmetros do seu imóvel para formularmos um parecer técnico.",
      requiredFields: "Campos obrigatórios",
      requiredFieldsDesc: "Por favor informe seu nome e e-mail institucional.",
      consultationSuccessTitle: "Consulta técnica enviada!",
      consultationSuccessDesc: "Registramos sua consulta para",
      cuvLabel: "Código Único de Validação (CUV)",
      certTitle: "Certidão Cadastral Multipropósito LADM-COL",
      certSubtitle: "República da Colômbia — Sistema de Administração do Território",
      dateIssued: "Data de Emissão:",
      validity: "Validade Oficial:",
      inspectorTitle: "Dossiê do Imóvel Selecionado",
      inspectorSubtitle: "Atributos alfanuméricos e geográficos integrados",
      exportGeoJson: "Exportar GeoJSON LADM-COL",
      printCert: "Imprimir Certidão Oficial",
      kpiPrec: "Precisão GNSS",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Sincronia Registral",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Eficiência Fiscal",
      kpiTaxVal: "+42% Base",
      kpiPot: "Horizonte POT",
      kpiPotVal: "12 Anos",
    },
    de: {
      badgeEco: "LADM-COL Wissenschaftlich-Territoriales Ökosystem",
      titleEco: "Säulen des Katasterwissens & Raummanagements",
      descEco: "Die vier vernetzten Dimensionen moderner Landadministration. Erkunden Sie die orbitale Konstellation oder nutzen Sie den Live-GIS-Simulator und das offizielle Katasterblatt.",
      tabEcosystem: "Orbitales Ökosystem",
      tabConsole: "Live-GIS-Konsole",
      tabSheet: "Offizielles Katasterblatt",
      btnConsult: "Institutionellen Umfang anfragen",
      btnSimulator: "Im GIS-Simulator ansehen",
      btnSheet: "Katasterblatt",
      colScientific: "Wissenschaftliche & Rechtliche Basis",
      colGovernance: "Raumordnung & Öffentlicher Nutzen",
      colScope: "Betriebsprotokolle & Phasen",
      deliverablesTitle: "Offizielle Endergebnisse:",
      layerTitle: "Aktive Kartenebenen",
      simActive: "GNSS-SYSTEM ONLINE",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Mit der Maus über Parzellen fahren; klicken für das vollständige LADM-COL-Dossier.",
      consultScope: "Umfang anfragen",
      dimensionsTitle: "Dreidimensionale Katastergliederung",
      phasesTitle: "Operative Durchführungsphasen",
      deliverablesCertified: "Zertifizierte Daten & Offizielle Formate",
      complianceTitle: "Strenge Einhaltung Gesetzlicher Normen",
      complianceDesc: "Alle Katasterprojekte entsprechen den kolumbianischen Gesetzen und ISO 19152.",
      bottomCtaTitle: "Bereit für Modernes Katastermanagement?",
      bottomCtaDesc: "PLES SAS ist Ihr strategischer Partner für Katastererneuerung und Gutachten.",
      bottomCtaBtn: "Katasterexperten konsultieren",
      aboutPles: "Über PLES erfahren",
      dialogBadge: "Institutionelle Technische Beratung",
      dialogDesc: "Geben Sie Vorabparameter ein, um eine fundierte Ausarbeitung zu erhalten.",
      requiredFields: "Pflichtfelder",
      requiredFieldsDesc: "Bitte Name und E-Mail-Adresse angeben.",
      consultationSuccessTitle: "Anfrage erfolgreich übermittelt!",
      consultationSuccessDesc: "Wir haben Ihre Anfrage erfasst für",
      cuvLabel: "Eindeutiger Validierungscode (CUV)",
      certTitle: "Mehrzweck-Katasterzertifikat LADM-COL",
      certSubtitle: "Republik Kolumbien — Raumadministrationssystem",
      dateIssued: "Ausstellungsdatum:",
      validity: "Offizielle Gültigkeit:",
      inspectorTitle: "Dossier der Ausgewählten Parzelle",
      inspectorSubtitle: "Verknüpfte Sach- und Geometriedaten",
      exportGeoJson: "LADM-COL GeoJSON Exportieren",
      printCert: "Offizielles Zertifikat Drucken",
      kpiPrec: "GNSS-Präzision",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Grundbuch-Sync",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Steuereffizienz",
      kpiTaxVal: "+42% Basis",
      kpiPot: "POT-Horizont",
      kpiPotVal: "12 Jahre",
    },
    it: {
      badgeEco: "Ecosistema Scientifico-Territoriale LADM-COL",
      titleEco: "Pilastri della Conoscenza e Gestione Catastale",
      descEco: "Le quattro dimensioni interconnesse che sostengono la moderna amministrazione del territorio. Esplora la costellazione orbitale o interagisci con il simulatore GIS e la scheda catastale ufficiale.",
      tabEcosystem: "Ecosistema Orbitale",
      tabConsole: "Console GIS in Tempo Reale",
      tabSheet: "Scheda Catastale Ufficiale",
      btnConsult: "Richiedi Ambito Istituzionale",
      btnSimulator: "Visualizza nel Simulatore GIS",
      btnSheet: "Scheda Catastale",
      colScientific: "Fondamento Scientifico & Legale",
      colGovernance: "Governance Territoriale & Impatto",
      colScope: "Protocolli Operativi & Fasi",
      deliverablesTitle: "Elaborati Ufficiali:",
      layerTitle: "Livelli Spaziali Attivi",
      simActive: "SISTEMA GNSS ONLINE",
      origin: "MAGNA-SIRGAS (EPSG:9377)",
      mapHint: "Passa il mouse per coordinate; clicca su una particella per caricare il fascicolo LADM-COL.",
      consultScope: "Consulta Ambito",
      dimensionsTitle: "Dettaglio Tridimensionale del Catasto",
      phasesTitle: "Fasi di Esecuzione Operativa",
      deliverablesCertified: "Elaborati Certificati e Formati Ufficiali",
      complianceTitle: "Rigoroso Rispetto delle Normative",
      complianceDesc: "Tutti i nostri progetti catastali rispettano gli standard legali e geospaziali ISO 19152.",
      bottomCtaTitle: "Pronto a Modernizzare la Gestione del Territorio?",
      bottomCtaDesc: "PLES SAS è il partner strategico per il censimento fiscale e perizie certificate.",
      bottomCtaBtn: "Consulta un Esperto Catastale",
      aboutPles: "Scopri di più su PLES",
      dialogBadge: "Consulenza Tecnica Istituzionale",
      dialogDesc: "Inserisci i parametri preliminari per ricevere una relazione tecnica ufficiale.",
      requiredFields: "Campi obbligatori",
      requiredFieldsDesc: "Inserisci nome ed email per inviare la richiesta.",
      consultationSuccessTitle: "Richiesta tecnica inviata!",
      consultationSuccessDesc: "Abbiamo registrato la richiesta per",
      cuvLabel: "Codice Univoco di Validazione (CUV)",
      certTitle: "Certificato Catastale Polivalente LADM-COL",
      certSubtitle: "Repubblica di Colombia — Sistema di Amministrazione del Territorio",
      dateIssued: "Data di Rilascio:",
      validity: "Validità Ufficiale:",
      inspectorTitle: "Fascicolo della Particella Selezionata",
      inspectorSubtitle: "Attributi alfanumerici e geometrici integrati",
      exportGeoJson: "Esporta GeoJSON LADM-COL",
      printCert: "Stampa Certificato Ufficiale",
      kpiPrec: "Precisione GNSS",
      kpiPrecVal: "RMSE ≤ 2.5 cm",
      kpiSync: "Sincronia Registrale",
      kpiSyncVal: "99.8% SNR",
      kpiTax: "Efficienza Fiscale",
      kpiTaxVal: "+42% Base",
      kpiPot: "Orizzonte POT",
      kpiPotVal: "12 Anni",
    }
  };

  const currentUi = uiI18n[language] || uiI18n.es;

  // Localized Services Data
  const getServicesData = (lang: Language) => {
    const isSpanish = lang === 'es';
    const isFrench = lang === 'fr';
    const isPortuguese = lang === 'pt';
    const isGerman = lang === 'de';

    return [
      {
        slug: 'levantamiento-predial',
        roman: 'I',
        icon: Crosshair,
        tag: isSpanish ? "Dimensión Físico-Geodésica" : isFrench ? "Dimension Physico-Géodésique" : isPortuguese ? "Dimensão Físico-Geodésica" : isGerman ? "Physisch-Geodätische Dimension" : "Physical-Geodetic Dimension",
        shortLabel: isSpanish ? "Topología Geodésica" : isFrench ? "Topologie Géodésique" : isPortuguese ? "Topologia Geodésica" : isGerman ? "Geodätische Topologie" : "Geodetic Topology",
        subLabel: isSpanish ? "Levantamiento Predial & LADM-COL" : isFrench ? "Levé Parcellaire & LADM-COL" : isPortuguese ? "Levantamento Predial & LADM-COL" : isGerman ? "Katastervermessung & LADM-COL" : "Property Survey & LADM-COL",
        badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        accentGlow: "from-blue-500/25 via-blue-500/5 to-transparent",
        accentBorder: "border-blue-500/50",
        ringColor: "stroke-blue-500",
        title: isSpanish ? "Levantamiento Predial Multipropósito" : isFrench ? "Levé Parcellaire Polyvalent" : isPortuguese ? "Levantamento Predial Multipropósito" : isGerman ? "Mehrzweck-Grundstücksvermessung" : "Multipurpose Property Survey",
        subtitle: isSpanish
          ? "Barrido predial masivo con georreferenciación centimétrica GNSS y censo predial estructurado en LADM-COL."
          : isFrench
          ? "Levé cadastral de masse avec géoréférencement GNSS centimétrique et recensement foncier LADM-COL."
          : isPortuguese
          ? "Varredura predial massiva com georreferenciamento centimétrico GNSS e cadastro LADM-COL."
          : isGerman
          ? "Massen-Katasteraufnahme mit zentimetergenauer GNSS-Georeferenzierung und LADM-COL-Struktur."
          : "Mass cadastral sweep with centimeter GNSS georeferencing and LADM-COL structured census.",
        scientificRationale: isSpanish
          ? "Conforme a la norma ISO 19152 (modelo conceptual LADM-COL) y Resolución IGAC 471/2020, el levantamiento físico constituye el cimiento geométrico del territorio. Se ejecutan mediciones geodésicas directas e indirectas enlazadas a la red de estaciones permanentes MAGNA-SIRGAS con receptores GNSS de doble frecuencia en modo RTK/PPK."
          : "Aligned with ISO 19152 (LADM-COL model) and national cartographic standards, geodetic surveys form the geometric foundation of land administration, deploying dual-frequency GNSS receivers in RTK/PPK tied to national datum networks.",
        institutionalImpact: isSpanish
          ? "Otorga certeza jurídica indisputable sobre límites prediales, elimina la superposición histórica de linderos y documenta la realidad de tenencia (propiedad formal y posesión) requerida para la titulación de tierras y saneamiento fiscal."
          : "Provides geometric certainty over property boundaries, resolves overlapping claims, and documents informal tenure for land titling and municipal fiscal registry consolidation.",
        technicalScope: isSpanish
          ? "Georreferenciación centimétrica de vértices, encuestas socioeconómicas multipropósito, deslinde comunitario participativo y estructuración de capas espaciales directamente en geodatabases LADM-COL."
          : "Centimeter georeferencing of boundary vertices, multipurpose socioeconomic interviews, participatory boundary reconciliation, and direct database structuring.",
        dimensions: {
          physical: { pct: 95, label: isSpanish ? "Físico: Linderos y construcciones con GNSS RTK" : "Physical: Boundaries and buildings via GNSS RTK" },
          legal: { pct: 90, label: isSpanish ? "Jurídico: Titularidad, posesión y cruce FMI con SNR" : "Legal: Ownership, tenure, and registry deed matching" },
          economic: { pct: 75, label: isSpanish ? "Económico: Caracterización tipológica para valuación" : "Economic: Typology classification for appraisal base" },
        },
        deliverables: isSpanish
          ? ["Geodatabase LADM-COL validada (INTERLIS/GDB)", "Fichas prediales digitales con firma pericial", "Ortofotomosaicos UAV de alta resolución (GSD < 5cm)", "Matriz de inconsistencias jurídicas catastral-registral"]
          : ["Validated LADM-COL Geodatabase (INTERLIS/GDB)", "Digital Multipurpose Property Dossiers", "High-Resolution UAV Orthophotomosaics (GSD < 5cm)", "Cadastre-Registry Legal Inconsistency Matrix"],
        phases: [
          { step: "01", title: isSpanish ? "Planificación y Vuelo UAV" : "Planning & UAV Flight", desc: isSpanish ? "Análisis de insumos registrales y captura fotogramétrica con drones." : "Registry intake and high-resolution aerial mapping." },
          { step: "02", title: isSpanish ? "Operación de Campo GNSS" : "GNSS Field Operations", desc: isSpanish ? "Levantamiento de vértices centimétricos y encuesta predial." : "Boundary vertex survey and household socio-economic interviews." },
          { step: "03", title: isSpanish ? "Control de Calidad LADM-COL" : "LADM-COL Quality Control", desc: isSpanish ? "Validación topológica, consistencia espacial y cruce SNR." : "Topological validation, spatial consistency, and registry audit." },
          { step: "04", title: isSpanish ? "Adopción y Entrega Oficial" : "Institutional Handover", desc: isSpanish ? "Cargue oficial al gestor catastral con certificados CUV." : "Official database handover to operator with CUV validation." }
        ]
      },
      {
        slug: 'actualizacion-mantenimiento',
        roman: 'II',
        icon: Layers,
        tag: isSpanish ? "Dimensión Jurídico-Registral" : isFrench ? "Dimension Juridique & Foncière" : isPortuguese ? "Dimensão Jurídico-Registral" : isGerman ? "Rechtlich-Grundbuchliche Dimension" : "Legal-Registry Dimension",
        shortLabel: isSpanish ? "Conservación Dinámica" : isFrench ? "Conservation Dynamique" : isPortuguese ? "Conservação Dinâmica" : isGerman ? "Dynamische Fortführung" : "Dynamic Maintenance",
        subLabel: isSpanish ? "Mantenimiento & Interoperabilidad SNR" : isFrench ? "Mise à Jour & Interopérabilité Foncière" : isPortuguese ? "Manutenção & Interoperabilidade Registral" : isGerman ? "Fortführung & Grundbuch-Sync" : "Maintenance & Registry Interoperability",
        badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        accentGlow: "from-emerald-500/25 via-emerald-500/5 to-transparent",
        accentBorder: "border-emerald-500/50",
        ringColor: "stroke-emerald-500",
        title: isSpanish ? "Actualización y Conservación Catastral" : isFrench ? "Mise à Jour et Conservation Cadastrale" : isPortuguese ? "Atualização e Manutenção Cadastral" : isGerman ? "Katasteraktualisierung und Fortführung" : "Cadastral Update & Continuous Maintenance",
        subtitle: isSpanish
          ? "Gestión continua de mutaciones de primera a quinta clase, manteniendo el inventario predial 100% vigente."
          : "Ongoing management of 1st through 5th class cadastral mutations, ensuring an accurate, real-time land inventory.",
        scientificRationale: isSpanish
          ? "Implementamos metodologías de conservación dinámica basadas en la sincronización sistemática entre el Catastro y el Registro de la Propiedad Inmobiliaria (SNR). Esto garantiza que cualquier cambio físico o traslación de dominio se refleje en tiempo real."
          : "Dynamic maintenance based on systematic synchronization between cadastre and public property registration registries, preventing physical or fiscal obsolescence.",
        institutionalImpact: isSpanish
          ? "Garantiza un censo predial vivo que refleja subdivisiones, englobes, ventas y nuevas construcciones, erradicando el rezago fiscal y fortaleciendo el impuesto predial unificado."
          : "Maintains a living cadastre that captures subdivisions, merges, transfers, and new developments, eradicating fiscal backlog.",
        technicalScope: isSpanish
          ? "Tramitación de mutaciones, detección temprana de expansiones con drones, depuración de discrepancias y armonización con Folios de Matrícula (FMI)."
          : "Mutation processing, drone-assisted change detection, data cleansing, and alignment with property registration records.",
        dimensions: {
          physical: { pct: 85, label: isSpanish ? "Físico: Detección de mejoras y subdivisiones" : "Physical: Tracking building improvements and splits" },
          legal: { pct: 95, label: isSpanish ? "Jurídico: Cambios de titularidad y saneamiento" : "Legal: Ownership updates and deed reconciliation" },
          economic: { pct: 85, label: isSpanish ? "Económico: Incorporación de nuevo valor imponible" : "Economic: Incorporation of updated taxable values" },
        },
        deliverables: isSpanish
          ? ["Base de datos catastral depurada y actualizada", "Expedientes y trazabilidad de mutaciones 1ª a 5ª clase", "Capas espaciales interoperables en PostGIS / GeoPackage", "Reporte de concordancia catastral-registral SNR"]
          : ["Cleansed and Updated Cadastral Database", "Certified Mutation Dossiers & Audit Trails", "Spatial Layers in PostGIS / GeoPackage", "Cadastre-Registry Concordance Report"],
        phases: [
          { step: "01", title: isSpanish ? "Radicación y Detección" : "Intake & Detection", desc: isSpanish ? "Ingreso de solicitudes o detección con ortofotos satelitales." : "Filing intake or satellite/drone change detection." },
          { step: "02", title: isSpanish ? "Inspección Técnica Pericial" : "Field Technical Inspection", desc: isSpanish ? "Verificación en terreno y cotejo de escrituras públicas." : "Ground verification and deed registry cross-check." },
          { step: "03", title: isSpanish ? "Modificación Geométrica" : "Geometric & Fiscal Edit", desc: isSpanish ? "Ajuste geométrico de polígonos y actualización del valor catastral." : "Polygon geometry adjustment and tax valuation recalculation." },
          { step: "04", title: isSpanish ? "Sincronización SNR" : "Registry Harmonization", desc: isSpanish ? "Notificación y cruce con el Folio de Matrícula Inmobiliaria." : "Public registry synchronization and notification." }
        ]
      },
      {
        slug: 'avaluos',
        roman: 'III',
        icon: Scale,
        tag: isSpanish ? "Dimensión Geoeconómica" : isFrench ? "Dimension Géo-économique" : isPortuguese ? "Dimensão Geoeconômica" : isGerman ? "Geoökonomische Dimension" : "Geoeconomic Dimension",
        shortLabel: isSpanish ? "Modelación Espacial" : isFrench ? "Modélisation Spatiale" : isPortuguese ? "Modelagem Espacial" : isGerman ? "Räumliche Modellierung" : "Spatial Modeling",
        subLabel: isSpanish ? "Avalúos Masivos & Zonas Homogéneas" : isFrench ? "Évaluations Massives & Zones ZHG" : isPortuguese ? "Avaliações Massivas & Zonas ZHG" : isGerman ? "Massenbewertung & ZHG-Zonen" : "Mass Appraisals & Geoeconomic Zones",
        badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        accentGlow: "from-amber-500/25 via-amber-500/5 to-transparent",
        accentBorder: "border-amber-500/50",
        ringColor: "stroke-amber-500",
        title: isSpanish ? "Avalúos Masivos y Avalúos Comerciales" : isFrench ? "Évaluations Massives et Commerciales" : isPortuguese ? "Avaliações Massivas e Comerciais" : isGerman ? "Massen- und Gewerbebewertungen" : "Mass Appraisals & Commercial Valuations",
        subtitle: isSpanish
          ? "Determinación técnica del valor del suelo y las edificaciones mediante econometría espacial y normatividad IGAC/RAA."
          : "Scientific property valuation using spatial econometrics, geoeconomic homogeneous zones, and certified appraiser standards.",
        scientificRationale: isSpanish
          ? "La valoración masiva se estructura sobre modelos econométricos de precios hedónicos y delimitación de Zonas Homogéneas Geoeconómicas (ZHG) y Físicas (ZHF), correlacionando variables territoriales, vías, servicios públicos y dinámicas reales de mercado."
          : "Mass valuation is structured around hedonic regression models and geoeconomic homogeneous zones (ZHG), analyzing real market transactions against spatial accessibility and infrastructure indices.",
        institutionalImpact: isSpanish
          ? "Dota a la administración municipal de una base gravable equitativa, transparente y técnicamente defendible para el recaudo tributario del impuesto predial unificado."
          : "Empowers local governments with a fair, equitable, and technically defended tax base for local property taxation.",
        technicalScope: isSpanish
          ? "Estudios de Zonas Geoeconómicas, tablas de valores unitarios de terreno y tipologías constructivas, y avalúos periciales certificados RAA."
          : "Geoeconomic zone studies, unit value tables, and certified commercial appraisals for infrastructure and private assets.",
        dimensions: {
          physical: { pct: 75, label: isSpanish ? "Físico: Clasificación de tipologías y acabados" : "Physical: Building typology and quality inspection" },
          legal: { pct: 70, label: isSpanish ? "Jurídico: Afectaciones, servidumbres y restricciones" : "Legal: Easements, public rights-of-way, restrictions" },
          economic: { pct: 100, label: isSpanish ? "Económico: Precios hedónicos y curvas de valor" : "Economic: Hedonic pricing and spatial value curves" },
        },
        deliverables: isSpanish
          ? ["Estudio de Zonas Geoeconómicas y curvas de isovalor", "Tablas de valores unitarios de terreno y construcción", "Base de datos liquidable de avalúos municipales", "Dictámenes periciales certificados con registro RAA"]
          : ["Geoeconomic Zones Study & Value Curves", "Unit Value Tables for Land and Buildings", "Municipal Unified Property Tax Billing Base", "Certified RAA Valuation Reports"],
        phases: [
          { step: "01", title: isSpanish ? "Investigación Inmobiliaria" : "Market Research", desc: isSpanish ? "Recolección y depuración estadística de ofertas y escrituras." : "Gathering and econometric vetting of real estate transactions." },
          { step: "02", title: isSpanish ? "Zonificación Espacial (ZHG)" : "Spatial Zoning (ZHG)", desc: isSpanish ? "Delimitación de zonas homogéneas geoeconómicas y físicas." : "Delimitation of homogeneous physical and geoeconomic zones." },
          { step: "03", title: isSpanish ? "Calibración Econométrica" : "Econometric Calibration", desc: isSpanish ? "Ajuste de modelos hedónicos, depreciación y tablas de valor." : "Hedonic regression calibration, depreciation curves, and unit values." },
          { step: "04", title: isSpanish ? "Liquidación y Adopción" : "Tax Base Handover", desc: isSpanish ? "Generación de base de datos predial lista para facturación." : "Issuance of certified value tables and billing tax base." }
        ]
      },
      {
        slug: 'ordenamiento-territorial',
        roman: 'IV',
        icon: Building2,
        tag: isSpanish ? "Dimensión Estratégica del Suelo" : isFrench ? "Dimension Stratégie du Sol" : isPortuguese ? "Dimensão Estratégica do Solo" : isGerman ? "Raumplanerische Dimension" : "Land Strategy Dimension",
        shortLabel: isSpanish ? "Planificación Territorial" : isFrench ? "Planification Territoriale" : isPortuguese ? "Planejamento Territorial" : isGerman ? "Raumordnung" : "Spatial Planning",
        subLabel: isSpanish ? "Instrumentos POT, PBOT y EOT" : isFrench ? "Instruments d'Urbanisme & POT" : isPortuguese ? "Instrumentos de Ordenamento POT" : isGerman ? "Flächennutzungspläne (POT)" : "Land Use Planning (POT/PBOT)",
        badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
        accentGlow: "from-purple-500/25 via-purple-500/5 to-transparent",
        accentBorder: "border-purple-500/50",
        ringColor: "stroke-purple-500",
        title: isSpanish ? "Planes de Ordenamiento Territorial (POT)" : isFrench ? "Plans d'Aménagement du Territoire (POT)" : isPortuguese ? "Planos de Ordenamento Territorial (POT)" : isGerman ? "Flächennutzungs- und Raumordnungspläne (POT)" : "Territorial Planning Instruments (POT)",
        subtitle: isSpanish
          ? "Formulación y ajuste de instrumentos de planeación municipal articulando el catastro multipropósito con la sostenibilidad ambiental."
          : "Formulation and monitoring of municipal land planning instruments linking multipurpose cadastre with environmental sustainability.",
        scientificRationale: isSpanish
          ? "El ordenamiento territorial traduce las dinámicas socioeconómicas y los determinantes ambientales en normas vinculantes sobre el uso del suelo, sustentadas con rigor cartográfico predio a predio en el catastro multipropósito."
          : "Spatial planning translates socio-environmental dynamics into binding zoning bylaws, anchored parcel-by-parcel in multipurpose cadastre data.",
        institutionalImpact: isSpanish
          ? "Orienta el crecimiento ordenado a 12 años, blinda las reservas hídricas y ambientales, y reglamenta instrumentos de plusvalía y reparto equitativo de cargas y beneficios."
          : "Guides 12-year municipal growth, secures environmental protection reserves, and regulates land value capture mechanisms.",
        technicalScope: isSpanish
          ? "Diagnóstico biofísico, clasificación del suelo (urbano, expansión, rural, protección), cartografía de amenazas y visores web IDE territoriales."
          : "Biophysical diagnosis, soil classification (urban, expansion, rural, protected), risk hazard mapping, and web SDI geoportals.",
        dimensions: {
          physical: { pct: 85, label: isSpanish ? "Físico: Geomorfología, determinantes y riesgo" : "Physical: Geomorphology, environmental factors, risk" },
          legal: { pct: 90, label: isSpanish ? "Jurídico: Régimen del suelo y acuerdos municipales" : "Legal: Land regimes, statutory urban bylaws, council acts" },
          economic: { pct: 80, label: isSpanish ? "Económico: Plusvalía, reparto equitativo y viabilidad" : "Economic: Plusvalia capture, urban burdens, viability" },
        },
        deliverables: isSpanish
          ? ["Documento Técnico de Soporte (DTS)", "Geodatabase oficial de cartografía normativa", "Proyectos de Acuerdo Municipal y cartilla ciudadana", "Visor geográfico interactivo de zonificación IDE"]
          : ["Technical Support Document (DTS)", "Official Spatial Normative Geodatabase", "Municipal Council Bills & Summary Citizen Guide", "Interactive Web GIS Zoning Geoportal"],
        phases: [
          { step: "01", title: isSpanish ? "Diagnóstico Integral Territorial" : "Comprehensive Diagnosis", desc: isSpanish ? "Evaluación de demografía, amenazas naturales y usos actuales." : "Evaluation of demographic, environmental, and infrastructure shifts." },
          { step: "02", title: isSpanish ? "Formulación Estratégica" : "Strategic Formulation", desc: isSpanish ? "Definición del modelo territorial a 12 años y normas de uso." : "Territorial model definition and land use bylaws formulation." },
          { step: "03", title: isSpanish ? "Concertación Ambiental" : "Interagency Concertation", desc: isSpanish ? "Concertación formal con Corporaciones Autónomas Regionales." : "Formal conciliation with environmental regional authorities (CAR)." },
          { step: "04", title: isSpanish ? "Adopción y Socialización" : "Statutory Enactment", desc: isSpanish ? "Aprobación ante Concejo e implementación de visor web IDE." : "Council approval and Web GIS portal launch for citizens." }
        ]
      }
    ];
  };

  const services = getServicesData(language);
  const currentService = services.find(s => s.slug === selectedSlug) || services[0];
  const CurrentIcon = currentService.icon;

  const trustBadges = [
    {
      title: "LADM-COL (ISO 19152)",
      subtitle: language === 'en' ? "Official territorial administration model" : "Modelo oficial de administración del territorio",
      icon: Database
    },
    {
      title: language === 'en' ? "IGAC Guidelines" : "Metodología IGAC",
      subtitle: language === 'en' ? "Regulatory cadastral survey framework" : "Marco regulatorio de barrido y conservación",
      icon: ShieldCheck
    },
    {
      title: language === 'en' ? "SNR Interoperability" : "Interoperabilidad SNR",
      subtitle: language === 'en' ? "Real estate registry synchronization" : "Sincronización con el folio de matrícula",
      icon: Landmark
    },
    {
      title: language === 'en' ? "Certified RAA Appraisers" : "Peritos RAA",
      subtitle: language === 'en' ? "Open Valuer Registry compliance" : "Registro Abierto de Avaluadores de Colombia",
      icon: Scale
    }
  ];

  // SVG Cadastral parcel simulation definitions with deep attributes
  const parcels = [
    {
      id: 1,
      name: 'PREDIO #0012',
      codigoPredial: '05001-01-02-0000-0012-0001-9-00-00-0001',
      fmi: '060-149201',
      area: '1.450 m²',
      areaConstruida: '320 m²',
      destino: 'Habitacional / Residencial',
      estrato: 'Estrato 4',
      val: '$520.000.000 COP',
      valComercial: '$710.000.000 COP',
      titular: 'Fiducia Inmobiliaria del Norte S.A.',
      points: '80,60 210,40 230,130 90,150',
      color: 'fill-blue-500/20 stroke-blue-500',
      coordsGeo: [[-75.5039, 10.4106], [-75.5022, 10.4111], [-75.5019, 10.4089], [-75.5037, 10.4084], [-75.5039, 10.4106]],
      verticesList: [
        { id: 'V-01', n: '4.892.140', e: '2.140.320', z: '18.2 m' },
        { id: 'V-02', n: '4.892.185', e: '2.140.480', z: '18.6 m' },
        { id: 'V-03', n: '4.892.070', e: '2.140.510', z: '18.1 m' },
        { id: 'V-04', n: '4.892.025', e: '2.140.350', z: '17.9 m' },
      ]
    },
    {
      id: 2,
      name: 'PREDIO #0013',
      codigoPredial: '05001-01-02-0000-0013-0001-9-00-00-0001',
      fmi: '060-149202',
      area: '980 m²',
      areaConstruida: '650 m²',
      destino: 'Comercial Corredor Urbano',
      estrato: 'Comercial C-2',
      val: '$380.000.000 COP',
      valComercial: '$590.000.000 COP',
      titular: 'Inversiones y Almacenes de la Costa',
      points: '210,40 340,30 360,110 230,130',
      color: 'fill-emerald-500/20 stroke-emerald-500',
      coordsGeo: [[-75.5022, 10.4111], [-75.5005, 10.4113], [-75.5002, 10.4094], [-75.5019, 10.4089], [-75.5022, 10.4111]],
      verticesList: [
        { id: 'V-05', n: '4.892.185', e: '2.140.480', z: '18.6 m' },
        { id: 'V-06', n: '4.892.210', e: '2.140.640', z: '19.1 m' },
        { id: 'V-07', n: '4.892.115', e: '2.140.670', z: '18.8 m' },
        { id: 'V-08', n: '4.892.070', e: '2.140.510', z: '18.1 m' },
      ]
    },
    {
      id: 3,
      name: 'PREDIO #0014',
      codigoPredial: '05001-01-02-0000-0014-0001-9-00-00-0001',
      fmi: '060-149203',
      area: '2.100 m²',
      areaConstruida: '1.200 m²',
      destino: 'Mixto Densidad Media',
      estrato: 'Estrato 5',
      val: '$740.000.000 COP',
      valComercial: '$1.050.000.000 COP',
      titular: 'Constructora del Valle SAS',
      points: '90,150 230,130 250,230 110,250',
      color: 'fill-amber-500/20 stroke-amber-500',
      coordsGeo: [[-75.5037, 10.4084], [-75.5019, 10.4089], [-75.5016, 10.4065], [-75.5034, 10.4060], [-75.5037, 10.4084]],
      verticesList: [
        { id: 'V-09', n: '4.892.025', e: '2.140.350', z: '17.9 m' },
        { id: 'V-10', n: '4.892.070', e: '2.140.510', z: '18.1 m' },
        { id: 'V-11', n: '4.891.950', e: '2.140.540', z: '17.7 m' },
        { id: 'V-12', n: '4.891.905', e: '2.140.380', z: '17.4 m' },
      ]
    },
    {
      id: 4,
      name: 'PREDIO #0015',
      codigoPredial: '05001-01-02-0000-0015-0001-9-00-00-0001',
      fmi: '060-149204',
      area: '1.750 m²',
      areaConstruida: '890 m²',
      destino: 'Equipamiento Institucional',
      estrato: 'Institucional Público',
      val: '$610.000.000 COP',
      valComercial: '$880.000.000 COP',
      titular: 'Municipio de Jurisdicción Territorial',
      points: '230,130 360,110 390,210 250,230',
      color: 'fill-purple-500/20 stroke-purple-500',
      coordsGeo: [[-75.5019, 10.4089], [-75.5002, 10.4094], [-75.4998, 10.4070], [-75.5016, 10.4065], [-75.5019, 10.4089]],
      verticesList: [
        { id: 'V-13', n: '4.892.070', e: '2.140.510', z: '18.1 m' },
        { id: 'V-14', n: '4.892.115', e: '2.140.670', z: '18.8 m' },
        { id: 'V-15', n: '4.891.990', e: '2.140.710', z: '18.3 m' },
        { id: 'V-16', n: '4.891.950', e: '2.140.540', z: '17.7 m' },
      ]
    },
    {
      id: 5,
      name: 'RESERVA PROTEGIDA',
      codigoPredial: '05001-00-00-0000-0000-0000-0-00-00-0000',
      fmi: '060-000000',
      area: '12.4 Ha (124.000 m²)',
      areaConstruida: '0 m²',
      destino: 'Suelo de Protección Ambiental',
      estrato: 'No Aplica (Protegido)',
      val: 'Inalienable e Inembargable',
      valComercial: 'Suelo de Conservación Hídrica',
      titular: 'Reserva Ecológica & Cuenca Hidrográfica',
      points: '360,110 470,90 490,240 390,210',
      color: 'fill-teal-500/25 stroke-teal-400',
      coordsGeo: [[-75.5002, 10.4094], [-75.4984, 10.4098], [-75.4981, 10.4062], [-75.4998, 10.4070], [-75.5002, 10.4094]],
      verticesList: [
        { id: 'V-17', n: '4.892.115', e: '2.140.670', z: '18.8 m' },
        { id: 'V-18', n: '4.892.160', e: '2.140.830', z: '19.4 m' },
        { id: 'V-19', n: '4.891.920', e: '2.140.870', z: '18.5 m' },
        { id: 'V-20', n: '4.891.990', e: '2.140.710', z: '18.3 m' },
      ]
    },
  ];

  const activeParcel = parcels.find(p => p.id === selectedParcelId) || parcels[0];

  return (
    <div className="space-y-16">
      {/* HERO SECTION ORIGINAL (INTOCABLE - RESTAURADO EXACTO) */}
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center">
                    <HomeIcon className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                {t.PlesCatastro.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.PlesCatastro.subtitle} {t.PlesCatastro.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {t.PlesCatastro.badges.map((badge: string) => (
                  <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">{badge}</Badge>
                ))}
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-catastro`}>
                  <span className="flex items-center">
                    {t.PlesCatastro.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL: ECOSISTEMA TERRITORIAL SOFISTICADO (ANCHO COMPLETO) */}
      <section id="nuestros-servicios" className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 py-6 scroll-mt-20">
        
        {/* Header Institucional de Máxima Sofisticación */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-border/70 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider">
                <Orbit className="h-3.5 w-3.5 text-accent animate-spin" style={{ animationDuration: '14s' }} />
                <span>{currentUi.badgeEco}</span>
              </div>
              <LanguageSelector variant="compact" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {currentUi.titleEco}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
              {currentUi.descEco}
            </p>
          </div>

          {/* Selector de Modos de Exploración */}
          <div className="shrink-0">
            <Tabs value={activeView} onValueChange={(val) => setActiveView(val as any)} className="w-full sm:w-[460px]">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/80 backdrop-blur-md border border-border rounded-2xl h-12 shadow-inner">
                <TabsTrigger value="ecosystem" className="text-xs font-bold rounded-xl flex items-center gap-1.5 data-[state=active]:shadow-md">
                  <Orbit className="h-3.5 w-3.5" />
                  {currentUi.tabEcosystem}
                </TabsTrigger>
                <TabsTrigger value="console" className="text-xs font-bold rounded-xl flex items-center gap-1.5 data-[state=active]:shadow-md">
                  <Eye className="h-3.5 w-3.5" />
                  {currentUi.tabConsole}
                </TabsTrigger>
                <TabsTrigger value="sheet" className="text-xs font-bold rounded-xl flex items-center gap-1.5 data-[state=active]:shadow-md">
                  <FileText className="h-3.5 w-3.5" />
                  {currentUi.tabSheet}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VISTA 1: ECOSISTEMA ORBITAL (DISEÑO CIRCULAR CIENTÍFICO)      */}
        {/* ============================================================ */}
        {activeView === 'ecosystem' && (
          <div className="space-y-12 animate-fade-in w-full">
            
            {/* Núcleo Geodésico y Constelación Circular */}
            <div className="relative w-full rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-background/80 backdrop-blur-xl p-8 sm:p-12 shadow-2xl overflow-hidden">
              
              {/* Retícula de Fondo Cartográfico */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

              {/* Tira Superior de Estado de Georreferenciación */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border/60 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-foreground font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-emerald-500 font-bold uppercase tracking-wider">MATRIZ TERRITORIAL ACTIVA</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">EPSG:9377 ORIGEN NACIONAL</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>RES. IGAC 471 / 2020</span>
                  <span>•</span>
                  <span>NORMA ISO 19152 (LADM-COL)</span>
                  <span>•</span>
                  <span className="text-primary font-bold">4 EJES SINCRONIZADOS</span>
                </div>
              </div>

              {/* Constelación de 4 Esferas Orbitales Geodésicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 justify-items-center w-full py-4 relative z-10">
                {services.map((service) => {
                  const SIcon = service.icon;
                  const isSelected = selectedSlug === service.slug;

                  return (
                    <div
                      key={service.slug}
                      onClick={() => handleSelectService(service.slug)}
                      className="flex flex-col items-center group cursor-pointer w-full max-w-[280px]"
                    >
                      {/* El Círculo Orbital con dial de teodolito */}
                      <div
                        className={`w-60 h-60 sm:w-64 sm:h-64 xl:w-72 xl:h-72 rounded-full relative flex flex-col items-center justify-center p-6 text-center transition-all duration-500 select-none ${
                          isSelected
                            ? `ring-4 ring-primary/50 shadow-[0_0_65px_rgba(56,189,248,0.3)] scale-105 bg-gradient-to-b ${service.accentGlow} border-2 ${service.accentBorder}`
                            : 'border border-border/70 hover:border-primary/50 bg-card/60 backdrop-blur-md hover:shadow-xl hover:scale-[1.02]'
                        }`}
                      >
                        {/* Dial Azimutal Graduado (Estilo Teodolito / Brújula Geodésica) */}
                        <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none" viewBox="0 0 200 200">
                          <circle
                            cx="100"
                            cy="100"
                            r="96"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray={isSelected ? "3 3" : "1 6"}
                            className={`${isSelected ? service.ringColor : 'text-border'} opacity-50`}
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="82"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.8"
                            className="text-border/40"
                          />
                          {/* Marcas de los 4 Cuadrantes Azimutales (0°, 90°, 180°, 270°) */}
                          <line x1="100" y1="4" x2="100" y2="12" stroke="currentColor" strokeWidth="1.5" className={isSelected ? 'text-primary' : 'text-muted-foreground/50'} />
                          <line x1="100" y1="188" x2="100" y2="196" stroke="currentColor" strokeWidth="1.5" className={isSelected ? 'text-primary' : 'text-muted-foreground/50'} />
                          <line x1="4" y1="100" x2="12" y2="100" stroke="currentColor" strokeWidth="1.5" className={isSelected ? 'text-primary' : 'text-muted-foreground/50'} />
                          <line x1="188" y1="100" x2="196" y2="100" stroke="currentColor" strokeWidth="1.5" className={isSelected ? 'text-primary' : 'text-muted-foreground/50'} />
                        </svg>

                        {/* Contenido Central de la Esfera */}
                        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                          {/* Ícono de la Dimensión con aura */}
                          <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 p-3 ${
                            isSelected
                              ? 'bg-primary text-primary-foreground shadow-lg scale-110 ring-2 ring-primary/40'
                              : 'bg-primary/10 text-primary group-hover:scale-105'
                          }`}>
                            <SIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                          </div>

                          {/* Indicador Romano */}
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest font-extrabold text-muted-foreground uppercase">
                            DIMENSIÓN {service.roman}
                          </span>

                          {/* Nombre del Eje */}
                          <h3 className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors px-2 leading-tight ${
                            isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}>
                            {service.shortLabel}
                          </h3>

                          {/* Subtítulo Discreto */}
                          <p className="text-[11px] text-muted-foreground font-medium px-4 line-clamp-2">
                            {service.subLabel}
                          </p>
                        </div>

                        {/* Micro-luz de Estado en la Base del Círculo */}
                        <div className="absolute bottom-4 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                          <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                            {isSelected ? 'ACTIVO' : 'EXPLORAR'}
                          </span>
                        </div>
                      </div>

                      {/* Etiqueta Inferior de la Esfera */}
                      <div className="mt-4 text-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm transition-all ${
                          isSelected ? service.badgeColor : 'border-border/60 text-muted-foreground bg-muted/20'
                        }`}>
                          {service.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tira de Métricas Clave de la Constelación (KPI Bar) */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/60 text-center">
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">{currentUi.kpiPrec}</span>
                  <span className="text-base sm:text-lg font-black text-foreground font-mono">{currentUi.kpiPrecVal}</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">{currentUi.kpiSync}</span>
                  <span className="text-base sm:text-lg font-black text-emerald-500 font-mono">{currentUi.kpiSyncVal}</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">{currentUi.kpiTax}</span>
                  <span className="text-base sm:text-lg font-black text-amber-500 font-mono">{currentUi.kpiTaxVal}</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">{currentUi.kpiPot}</span>
                  <span className="text-base sm:text-lg font-black text-purple-500 font-mono">{currentUi.kpiPotVal}</span>
                </div>
              </div>

            </div>

            {/* Dossier Institucional de la Dimensión Seleccionada (Editorial & Sofisticado) */}
            <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-10 shadow-xl w-full space-y-8">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs font-mono uppercase ${currentService.badgeColor}`}>
                      DIMENSIÓN {currentService.roman}: {currentService.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      LADM-COL / IGAC / SNR
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {currentService.title}
                  </h3>
                  <p className="text-sm text-primary font-medium max-w-3xl">
                    {currentService.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Button
                    size="default"
                    variant="accent"
                    onClick={() => handleOpenConsultation()}
                    className="font-bold shadow-md"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {currentUi.btnConsult}
                  </Button>

                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => setActiveView('console')}
                    className="font-semibold"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {currentUi.btnSimulator}
                  </Button>

                  <Button
                    size="default"
                    variant="ghost"
                    onClick={() => setActiveView('sheet')}
                    className="font-semibold"
                  >
                    <FileText className="mr-1.5 h-4 w-4" />
                    {currentUi.btnSheet}
                  </Button>
                </div>
              </div>

              {/* 3 Bloques Editoriales de Profundidad Técnica */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                
                {/* Columna 1: Fundamento Científico */}
                <div className="space-y-3 bg-muted/20 p-5 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-mono">
                    <Database className="h-4 w-4" />
                    {currentUi.colScientific}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {currentService.scientificRationale}
                  </p>
                </div>

                {/* Columna 2: Impacto Territorial */}
                <div className="space-y-3 bg-muted/20 p-5 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider font-mono">
                    <Landmark className="h-4 w-4" />
                    {currentUi.colGovernance}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {currentService.institutionalImpact}
                  </p>
                </div>

                {/* Columna 3: Alcance y Protocolo */}
                <div className="space-y-3 bg-muted/20 p-5 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider font-mono">
                    <Compass className="h-4 w-4" />
                    {currentUi.colScope}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {currentService.technicalScope}
                  </p>
                </div>

              </div>

              {/* Fases Operativas (Timeline Paso a Paso) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                  <Navigation2 className="h-4 w-4 text-primary" />
                  {currentUi.phasesTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentService.phases.map((ph, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-border/70 bg-card relative flex flex-col justify-between shadow-sm hover:border-primary/40 transition-colors">
                      <div>
                        <div className="text-2xl font-black text-primary/30 font-mono mb-1">
                          {ph.step}
                        </div>
                        <h5 className="font-bold text-foreground text-sm mb-1">{ph.title}</h5>
                        <p className="text-xs text-muted-foreground leading-relaxed">{ph.desc}</p>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 opacity-50" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pills de Entregables Oficiales */}
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-muted-foreground uppercase font-bold mr-2 flex items-center gap-1.5">
                  <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                  {currentUi.deliverablesTitle}
                </span>
                {currentService.deliverables.map((item, i) => (
                  <span key={i} className="bg-muted/50 border border-border/70 px-3 py-1 rounded-xl text-foreground font-medium flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* VISTA 2: CONSOLA GIS EN VIVO (SIMULADOR GEOESPACIAL INTERACTIVO) */}
        {/* ============================================================ */}
        {activeView === 'console' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full animate-fade-in items-start">
            
            {/* Panel Izquierdo: Selector de Ejes & Capas */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="p-4 rounded-3xl border border-border bg-card shadow-sm space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                  {currentUi.layerTitle}
                </span>

                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveLayers(prev => ({ ...prev, vertices: !prev.vertices }))}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      activeLayers.vertices ? 'bg-blue-500/15 border-blue-500/40 text-blue-600 dark:text-blue-400' : 'bg-muted/40 border-border text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Crosshair className="h-3.5 w-3.5" /> Vértices Geodésicos RTK
                    </span>
                    <span className="text-[10px] font-mono">{activeLayers.vertices ? 'ACTIVO' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setActiveLayers(prev => ({ ...prev, deeds: !prev.deeds }))}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      activeLayers.deeds ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5" /> Folios de Matrícula SNR
                    </span>
                    <span className="text-[10px] font-mono">{activeLayers.deeds ? 'ACTIVO' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setActiveLayers(prev => ({ ...prev, valuation: !prev.valuation }))}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      activeLayers.valuation ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400' : 'bg-muted/40 border-border text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5" /> Isovalores Geoeconómicos ($/m²)
                    </span>
                    <span className="text-[10px] font-mono">{activeLayers.valuation ? 'ACTIVO' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setActiveLayers(prev => ({ ...prev, zoning: !prev.zoning }))}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      activeLayers.zoning ? 'bg-purple-500/15 border-purple-500/40 text-purple-600 dark:text-purple-400' : 'bg-muted/40 border-border text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" /> Usos del Suelo POT
                    </span>
                    <span className="text-[10px] font-mono">{activeLayers.zoning ? 'ACTIVO' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setActiveLayers(prev => ({ ...prev, flightGrid: !prev.flightGrid }))}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      activeLayers.flightGrid ? 'bg-teal-500/15 border-teal-500/40 text-teal-600 dark:text-teal-400' : 'bg-muted/40 border-border text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Satellite className="h-3.5 w-3.5" /> Malla de Vuelo UAV / Dron
                    </span>
                    <span className="text-[10px] font-mono">{activeLayers.flightGrid ? 'ACTIVO' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* Inspector Predial en Vivo del Predio Seleccionado */}
              <div className="p-5 rounded-3xl border border-border bg-card shadow-md space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/70">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      {currentUi.inspectorTitle}
                    </span>
                    <h4 className="text-base font-extrabold text-foreground">
                      {activeParcel.name}
                    </h4>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {activeParcel.fmi}
                  </Badge>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Cédula Catastral:</span>
                    <span className="font-mono text-foreground font-semibold text-[11px]">{activeParcel.codigoPredial}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Área Terreno:</span>
                    <span className="font-semibold text-foreground">{activeParcel.area}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Área Construida:</span>
                    <span className="font-semibold text-foreground">{activeParcel.areaConstruida}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Destino Económico:</span>
                    <span className="font-semibold text-foreground">{activeParcel.destino}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Avalúo Catastral:</span>
                    <span className="font-mono font-bold text-amber-500">{activeParcel.val}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Avalúo Comercial Ref.:</span>
                    <span className="font-mono font-bold text-emerald-500">{activeParcel.valComercial}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Titular / Poseedor:</span>
                    <span className="font-semibold text-foreground truncate max-w-[170px]">{activeParcel.titular}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportGeoJson}
                    className="w-full text-xs font-semibold h-9"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    {currentUi.exportGeoJson}
                  </Button>

                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => setActiveView('sheet')}
                    className="w-full text-xs font-bold h-9 shadow-sm"
                  >
                    <FileText className="mr-1.5 h-3.5 w-3.5" />
                    {currentUi.btnSheet}
                  </Button>
                </div>
              </div>

            </div>

            {/* Panel Derecho: Visor Cartográfico SVG Interactivo */}
            <div className="lg:col-span-8 space-y-4">
              <Card className="border-2 border-primary/30 shadow-2xl overflow-hidden bg-card rounded-3xl">
                
                {/* HUD Superior: Barra de Estado GNSS */}
                <div className="bg-muted/70 p-3.5 border-b border-border/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {currentUi.simActive}
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">{currentUi.origin}</span>
                  </div>

                  <div className="flex items-center gap-3 text-foreground font-semibold">
                    <Compass className="h-4 w-4 text-primary" />
                    <span>{liveCoords.lat}</span>
                    <span>{liveCoords.lon}</span>
                    <span className="text-xs text-muted-foreground">({liveCoords.elevation})</span>
                  </div>
                </div>

                {/* Lienzo Cartográfico SVG Interactivo */}
                <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-950 overflow-hidden flex items-center justify-center cursor-crosshair select-none group">
                  
                  {/* Cuadrícula Geodésica UTM */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b25_1px,transparent_1px),linear-gradient(to_bottom,#1e293b25_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
                  
                  {/* Malla de Vuelo Fotogramétrico UAV Simulada */}
                  {activeLayers.flightGrid && (
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#0d948818_1px,transparent_1px),linear-gradient(-45deg,#0d948818_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none animate-pulse" />
                  )}

                  <svg
                    viewBox="0 0 540 300"
                    className="w-full h-full relative z-10"
                    onMouseMove={handleMapMouseMove}
                  >
                    {/* Polígonos de Predios */}
                    {parcels.map((p) => {
                      const isHovered = hoveredParcel === p.id;
                      const isSelected = selectedParcelId === p.id;
                      let fillClass = p.color;

                      if (activeLayers.valuation && p.id !== 5) {
                        fillClass = 'fill-amber-500/35 stroke-amber-400';
                      } else if (activeLayers.zoning && p.id === 5) {
                        fillClass = 'fill-teal-500/50 stroke-teal-300';
                      }

                      return (
                        <g
                          key={p.id}
                          onClick={() => setSelectedParcelId(p.id)}
                          onMouseEnter={() => setHoveredParcel(p.id)}
                          onMouseLeave={() => setHoveredParcel(null)}
                          className="cursor-pointer transition-all duration-200"
                        >
                          <polygon
                            points={p.points}
                            strokeWidth={isSelected ? "3" : isHovered ? "2.5" : "1.5"}
                            strokeDasharray={p.id === 5 ? "4,4" : "none"}
                            className={`${fillClass} ${
                              isSelected
                                ? 'filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] stroke-sky-400'
                                : isHovered
                                ? 'filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                                : ''
                            }`}
                          />

                          <text
                            x={
                              p.id === 1 ? 140 :
                              p.id === 2 ? 280 :
                              p.id === 3 ? 160 :
                              p.id === 4 ? 300 : 420
                            }
                            y={
                              p.id === 1 ? 95 :
                              p.id === 2 ? 80 :
                              p.id === 3 ? 190 :
                              p.id === 4 ? 175 : 160
                            }
                            fill="#f8fafc"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="pointer-events-none drop-shadow"
                          >
                            {p.name}
                          </text>

                          {activeLayers.valuation && (
                            <text
                              x={
                                p.id === 1 ? 140 :
                                p.id === 2 ? 280 :
                                p.id === 3 ? 160 :
                                p.id === 4 ? 300 : 420
                              }
                              y={
                                p.id === 1 ? 112 :
                                p.id === 2 ? 97 :
                                p.id === 3 ? 207 :
                                p.id === 4 ? 192 : 177
                              }
                              fill="#fde047"
                              fontSize="9"
                              fontFamily="monospace"
                              textAnchor="middle"
                              className="pointer-events-none font-bold"
                            >
                              {p.val}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Vértices Geodésicos RTK */}
                    {activeLayers.vertices && (
                      <g className="pointer-events-none">
                        {[
                          [80, 60], [210, 40], [230, 130], [90, 150],
                          [340, 30], [360, 110], [250, 230], [110, 250],
                          [390, 210], [470, 90], [490, 240]
                        ].map(([vx, vy], i) => (
                          <g key={i}>
                            <circle cx={vx} cy={vy} r="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                            <circle cx={vx} cy={vy} r="7" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
                          </g>
                        ))}
                      </g>
                    )}

                    {/* Rosa de los Vientos (North Arrow) */}
                    <g transform="translate(500, 35)" className="pointer-events-none opacity-80">
                      <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                      <polygon points="0,-12 4,0 0,-2" fill="#ef4444" />
                      <polygon points="0,12 4,0 0,-2" fill="#94a3b8" />
                      <polygon points="0,-12 -4,0 0,-2" fill="#dc2626" />
                      <polygon points="0,12 -4,0 0,-2" fill="#64748b" />
                      <text x="0" y="-14" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
                    </g>

                    {/* Escala Gráfica Métrica */}
                    <g transform="translate(30, 275)" className="pointer-events-none text-white font-mono opacity-80">
                      <rect x="0" y="0" width="80" height="3" fill="#f8fafc" />
                      <rect x="0" y="0" width="40" height="3" fill="#0284c7" />
                      <text x="0" y="-4" fill="#f8fafc" fontSize="8">0</text>
                      <text x="40" y="-4" fill="#f8fafc" fontSize="8">25m</text>
                      <text x="80" y="-4" fill="#f8fafc" fontSize="8">50m</text>
                    </g>
                  </svg>

                  {/* Tooltip Flotante */}
                  {hoveredParcel && (
                    <div className="absolute top-4 left-4 bg-slate-900/95 border border-primary/60 backdrop-blur-md rounded-2xl p-3.5 text-xs text-white shadow-2xl space-y-1.5 pointer-events-none animate-in fade-in zoom-in-95">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-bold font-mono text-sm">{parcels.find(p => p.id === hoveredParcel)?.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Área: <span className="font-semibold text-white">{parcels.find(p => p.id === hoveredParcel)?.area}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        FMI: <span className="font-mono text-emerald-400 font-semibold">{parcels.find(p => p.id === hoveredParcel)?.fmi}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Avalúo: <span className="font-semibold text-amber-300">{parcels.find(p => p.id === hoveredParcel)?.val}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 text-[10px] text-slate-300 font-mono flex items-center gap-2">
                    <MousePointerClick className="h-3.5 w-3.5 text-primary animate-bounce" />
                    {currentUi.mapHint}
                  </div>
                </div>

                {/* Pie del Visor */}
                <div className="p-4 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border">
                  <div>
                    <h4 className="text-base font-extrabold text-foreground">
                      {currentService.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentService.subtitle}
                    </p>
                  </div>

                  <Button
                    size="default"
                    variant="accent"
                    onClick={() => handleOpenConsultation()}
                    className="font-bold shrink-0 shadow-sm"
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    {currentUi.consultScope}
                  </Button>
                </div>

              </Card>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* VISTA 3: FICHA CATASTRAL OFICIAL (CERTIFICADO GUBERNAMENTAL)  */}
        {/* ============================================================ */}
        {activeView === 'sheet' && (
          <div className="space-y-8 animate-fade-in w-full">
            
            {/* Barra de Acciones del Documento Oficial */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{currentUi.certTitle}</h4>
                  <p className="text-xs text-muted-foreground">{currentUi.certSubtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrintCertificate}
                  className="text-xs font-semibold h-9"
                >
                  <Printer className="mr-1.5 h-3.5 w-3.5" />
                  {currentUi.printCert}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExportGeoJson}
                  className="text-xs font-semibold h-9"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  {currentUi.exportGeoJson}
                </Button>

                <Button
                  size="sm"
                  variant="accent"
                  onClick={() => handleOpenConsultation()}
                  className="text-xs font-bold h-9 shadow-sm"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  {currentUi.btnConsult}
                </Button>
              </div>
            </div>

            {/* Documento Certificado Oficial Estilo Expediente LADM-COL */}
            <div className="rounded-3xl border-2 border-border/80 shadow-2xl bg-card overflow-hidden">
              
              {/* Encabezado Oficial con Guilloche y CUV */}
              <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 sm:p-10 border-b border-border space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-xs font-mono">
                        LADM-COL ISO 19152
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        MAGNA-SIRGAS ORIGEN NACIONAL
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                      {activeParcel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary font-mono font-bold">
                      CÉDULA CATASTRAL: {activeParcel.codigoPredial}
                    </p>
                  </div>

                  {/* Caja CUV (Código Único de Validación) con botón de copiar */}
                  <div className="p-3.5 rounded-2xl bg-background/80 border-2 border-primary/30 shadow-inner space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-muted-foreground block">
                      {currentUi.cuvLabel}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs font-black text-primary">
                      <span>CUV-2026-IGAC-9377-{activeParcel.fmi.replace('-', '')}</span>
                      <button
                        onClick={() => handleCopyCuv(`CUV-2026-IGAC-9377-${activeParcel.fmi.replace('-', '')}`)}
                        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Copiar CUV"
                      >
                        {copiedCuv ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <Link
                        href={`/verificar?cuv=CUV-2026-IGAC-9377-${activeParcel.fmi.replace('-', '')}`}
                        target="_blank"
                        className="p-1 rounded hover:bg-muted text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                        title="Verificar Autenticidad en Línea"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Metadatos de Expedición */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono text-muted-foreground">
                  <div>
                    <span className="block opacity-70">{currentUi.dateIssued}</span>
                    <span className="font-bold text-foreground">05 NOV 2026</span>
                  </div>
                  <div>
                    <span className="block opacity-70">{currentUi.validity}</span>
                    <span className="font-bold text-emerald-500">VIGENTE (ACTUALIZADO)</span>
                  </div>
                  <div>
                    <span className="block opacity-70">MATRÍCULA INMOBILIARIA:</span>
                    <span className="font-bold text-foreground">{activeParcel.fmi}</span>
                  </div>
                  <div>
                    <span className="block opacity-70">GESTOR CATASTRAL:</span>
                    <span className="font-bold text-foreground">PLES SAS / IGAC</span>
                  </div>
                </div>

              </div>

              {/* Contenido en 3 Dimensiones Oficiales */}
              <div className="p-6 sm:p-10 space-y-10">
                
                {/* Desglose Tridimensional */}
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    {currentUi.dimensionsTitle}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Físico */}
                    <div className="bg-muted/30 border border-border/70 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Dimensión Física</span>
                        <span className="text-sm font-bold text-foreground">95% Topología</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex justify-between"><span>Área de Terreno:</span> <span className="font-bold text-foreground">{activeParcel.area}</span></div>
                        <div className="flex justify-between"><span>Área Construida:</span> <span className="font-bold text-foreground">{activeParcel.areaConstruida}</span></div>
                        <div className="flex justify-between"><span>Tipología:</span> <span className="font-bold text-foreground">Pórticos Concreto</span></div>
                        <div className="flex justify-between"><span>Estado Conservación:</span> <span className="font-bold text-emerald-500">Bueno (88 pts)</span></div>
                      </div>
                    </div>

                    {/* Jurídico */}
                    <div className="bg-muted/30 border border-border/70 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dimensión Jurídica</span>
                        <span className="text-sm font-bold text-foreground">100% Saneado</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex justify-between"><span>Matrícula FMI:</span> <span className="font-bold font-mono text-foreground">{activeParcel.fmi}</span></div>
                        <div className="flex justify-between"><span>Modo Adquisición:</span> <span className="font-bold text-foreground">Escritura Pública</span></div>
                        <div className="flex justify-between"><span>Afectaciones:</span> <span className="font-bold text-emerald-500">Sin Gravamen</span></div>
                        <div className="flex justify-between"><span>Cruce SNR:</span> <span className="font-bold text-emerald-500">Conciliado</span></div>
                      </div>
                    </div>

                    {/* Económico */}
                    <div className="bg-muted/30 border border-border/70 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Dimensión Económica</span>
                        <span className="text-sm font-bold text-foreground">Base Fiscal</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex justify-between"><span>Avalúo Catastral:</span> <span className="font-bold font-mono text-amber-500">{activeParcel.val}</span></div>
                        <div className="flex justify-between"><span>Avalúo Comercial:</span> <span className="font-bold font-mono text-emerald-500">{activeParcel.valComercial}</span></div>
                        <div className="flex justify-between"><span>Destino:</span> <span className="font-bold text-foreground">{activeParcel.destino}</span></div>
                        <div className="flex justify-between"><span>Tarifa Predial:</span> <span className="font-bold text-foreground">8.5 ‰ Anual</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabla de Vértices Geodésicos Oficiales EPSG:9377 */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-primary" />
                    Cuadro Oficial de Coordenadas Geodésicas MAGNA-SIRGAS (EPSG:9377)
                  </h4>
                  <div className="border border-border rounded-2xl overflow-hidden bg-card">
                    <div className="grid grid-cols-4 bg-muted/60 p-3 text-xs font-mono font-bold text-muted-foreground border-b border-border">
                      <span>VÉRTICE</span>
                      <span>NORTE (m)</span>
                      <span>ESTE (m)</span>
                      <span>ELEVACIÓN (Z)</span>
                    </div>
                    {activeParcel.verticesList.map((vert, idx) => (
                      <div key={idx} className="grid grid-cols-4 p-3 text-xs font-mono text-foreground border-b border-border/40 hover:bg-muted/30 transition-colors">
                        <span className="font-bold text-primary">{vert.id}</span>
                        <span>{vert.n} N</span>
                        <span>{vert.e} E</span>
                        <span className="text-muted-foreground">{vert.z}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sello de Seguridad y Validación */}
                <div className="p-5 rounded-2xl bg-muted/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Certificación Valida y Conforme a Estándares Nacionales</p>
                      <p className="text-muted-foreground text-[11px]">Expedido por PLES SAS en calidad de Operador Catastral Certificado con firma digital pericial.</p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => handleOpenConsultation()}
                    className="font-bold shrink-0"
                  >
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    {currentUi.btnConsult}
                  </Button>
                </div>

              </div>

            </div>

          </div>
        )}

      </section>

      {/* Normatividad y Estándares Oficiales */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 py-8 border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {currentUi.complianceTitle}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {currentUi.complianceDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {trustBadges.map((badge, idx) => {
            const BIcon = badge.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start gap-4 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                  <BIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Banner CTA Inferior */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary/95 to-accent text-primary-foreground p-8 sm:p-12 md:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mx-auto border border-primary-foreground/25">
              <Landmark className="h-7 w-7 text-primary-foreground" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {currentUi.bottomCtaTitle}
            </h2>

            <p className="text-base sm:text-lg text-primary-foreground/90 font-normal leading-relaxed">
              {currentUi.bottomCtaDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="xl" variant="accent" onClick={() => handleOpenConsultation()} className="text-base px-10 py-4 shadow-xl w-full sm:w-auto font-bold">
                <Sparkles className="mr-2 h-5 w-5" />
                {currentUi.bottomCtaBtn}
              </Button>

              <Button size="xl" variant="outline" className="text-base px-8 py-4 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto font-semibold" asChild>
                <Link href="/about">
                  <span>{currentUi.aboutPles}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODAL IN-SITU DE CONSULTA TÉCNICA INSTITUCIONAL              */}
      {/* ============================================================ */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-xl p-6 sm:p-8 rounded-3xl bg-card border-2 border-primary/40 shadow-2xl">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[11px] px-2.5 py-0.5">
                {currentService.tag}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">{currentUi.dialogBadge}</span>
            </div>
            <DialogTitle className="text-2xl font-extrabold text-foreground">
              {currentService.title}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {currentUi.dialogDesc}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendConsultation} className="space-y-4 pt-2">
            
            {/* Sector / Entity Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tipo de Entidad u Organización
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['Alcaldía / Municipio', 'Gestor Catastral', 'Empresa / Constructora', 'Particular'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setQuoteEntityType(type)}
                    className={`p-2 rounded-xl border text-center font-semibold transition-all ${
                      quoteEntityType === type
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Scale */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Escala Aproximada del Proyecto
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['1 - 500 predios', '500 - 3.000 predios', '+3.000 / Municipio'].map(scale => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setQuoteScale(scale)}
                    className={`p-2 rounded-xl border text-center font-medium transition-all ${
                      quoteScale === scale
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Nombre y Cargo *
                </label>
                <Input
                  placeholder="Ej. Ing. Carlos Mendoza"
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  className="rounded-xl h-10 text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Correo Electrónico *
                </label>
                <Input
                  type="email"
                  placeholder="correo@entidad.gov.co"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  className="rounded-xl h-10 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Teléfono / WhatsApp Institucional
              </label>
              <Input
                placeholder="+57 300 000 0000"
                value={quotePhone}
                onChange={(e) => setQuotePhone(e.target.value)}
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Municipio y Alcance Técnico Preliminar
              </label>
              <Textarea
                placeholder="Indique el municipio, metas de actualización o particularidades jurídicas/topográficas..."
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                className="rounded-xl text-xs min-h-[70px]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button type="submit" className="w-full sm:flex-1 h-11 font-bold shadow-lg" disabled={isSubmittingQuote}>
                {isSubmittingQuote ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Procesando Consulta...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Remitir Consulta Técnica
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href={`/forms?service=ples-catastro&subservice=${currentService.slug}`}>
                  <span>Formulario Oficial</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Respaldo pericial RAA e IGAC
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Confidencialidad territorial
              </span>
            </div>

          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
