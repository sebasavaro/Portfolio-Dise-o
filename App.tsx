
import React, { useState, useEffect } from 'react';
import { Project, Skill } from './types';

// Función de utilidad para convertir enlaces de Google Drive a enlaces directos de imagen
const getDriveDirectLink = (url: string) => {
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/\/file\/d\/(.+?)\//)?.[1] || url.match(/id=(.+?)(&|$)/)?.[1];
    return fileId ? `https://lh3.googleusercontent.com/u/0/d/${fileId}` : url;
  }
  return url;
};

// Componente de Cabecera de Sección
const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12 border-b-4 border-white pb-4">
    <h2 className="text-4xl md:text-6xl font-display font-black text-impact">{title}</h2>
    {subtitle && <p className="mt-2 text-lg text-zinc-400 font-semibold uppercase">{subtitle}</p>}
  </div>
);

// Componente de Galería / Página de Proyecto
const ProjectGallery: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto animate-in fade-in duration-500">
      <nav className="sticky top-0 z-[60] bg-black/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <span className="font-display font-black text-xs md:text-sm tracking-tighter uppercase truncate mr-4 text-zinc-500">
          Proyecto / {project.title}
        </span>
        <button 
          onClick={onClose}
          className="bg-white text-black px-4 py-2 font-display font-black text-[10px] uppercase hover:bg-zinc-200 transition-colors flex-shrink-0"
        >
          Cerrar [ESC]
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-20">
          <div className="lg:w-3/5 flex flex-col justify-start">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-[1] mb-10 tracking-tighter break-words">
              {project.title.split(':').map((part, i) => (
                <span key={i} className={i === 1 ? "text-[#0061FF] block mt-2" : "block"}>
                  {part.trim()}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light italic border-l-4 border-[#0061FF] pl-6 max-w-xl">
              {project.concept}
            </p>
          </div>

          <div className="lg:w-2/5">
            <div className="bg-zinc-900/80 p-6 md:p-10 border-t-4 border-white lg:sticky lg:top-28">
              <h3 className="font-display font-bold uppercase mb-8 text-xs tracking-[0.2em] text-zinc-500">
                Data Sheet del Proyecto
              </h3>
              <ul className="space-y-8">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="text-sm md:text-base text-zinc-400 leading-snug border-b border-zinc-800/50 pb-6 last:border-0 last:pb-0">
                    <span className="text-[#0061FF] font-black block mb-2 uppercase text-[10px] tracking-widest">Especificación 0{idx + 1}</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {project.gallery?.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden bg-zinc-900 border border-zinc-800">
              <img 
                src={getDriveDirectLink(img)} 
                alt={`${project.title} view ${idx}`} 
                className="w-full h-auto object-cover transition-all duration-1000"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-mono tracking-widest border border-zinc-700">
                Asset_Capture_0{idx + 1}.png
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center pb-32 border-t border-zinc-900 pt-20">
          <button 
            onClick={onClose}
            className="text-2xl md:text-4xl font-display font-black uppercase hover:text-[#0061FF] transition-all border-b-4 border-white hover:border-[#0061FF] pb-4 inline-block tracking-tighter"
          >
            ← Volver al Índice
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Tarjeta de Proyecto
const ProjectCard: React.FC<{ project: Project; onOpen: (p: Project) => void }> = ({ project, onOpen }) => {
  const projectColors: Record<string, string> = {
    'breaking-news': '#FF0000',
    'youtube-ctr': '#FFCC00',
    'rar-automotores': '#0061FF'
  };

  const accentColor = projectColors[project.id] || '#0061FF';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={() => onOpen(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-white transition-all duration-300 flex flex-col md:flex-row gap-8 p-6 md:p-8 cursor-pointer"
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
            {project.category}
          </span>
          <span 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ 
              backgroundColor: accentColor,
              boxShadow: `0 0 12px ${accentColor}` 
            }}
          ></span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-bold leading-none uppercase tracking-tighter">{project.title}</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-400 text-lg leading-relaxed line-clamp-3">{project.concept}</p>
        </div>
        <div className="pt-4">
          <span 
            className="text-[10px] font-display font-black uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: isHovered ? accentColor : 'inherit' }}
          >
            Explorar Caso de Estudio →
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative aspect-video overflow-hidden transition-all duration-700 bg-zinc-800">
          <img 
            src={getDriveDirectLink(project.image)} 
            alt={project.title}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'breaking-news',
      category: 'Redes Sociales',
      title: 'Breaking News: Pulso Digital',
      concept: 'Diseño de un sistema de placas informativas optimizadas para la inmediatez del ecosistema periodístico digital.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format',
        'https://images.unsplash.com/photo-1585829365234-781fcd0d434b?q=80&w=1200&auto=format',
        'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=1200&auto=format'
      ],
      details: [
        'Tipografía: Uso de Archivo Black por su peso visual.',
        'Paleta: Alto contraste (Rojo #FF0000, Blanco, Negro).',
        'Retícula: Diseño modular para edición ultra-rápida.'
      ]
    },
    {
      id: 'youtube-ctr',
      category: 'Miniaturas de YouTube',
      title: 'Arquitectura del Click',
      concept: 'Creación de thumbnails diseñadas para maximizar el Click-Through Rate (CTR) en un mercado saturado.',
      image: 'https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format',
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200&auto=format'
      ],
      details: [
        'Jerarquía: Equilibrio de rostros con texto contundente.',
        'Psicología Visual: Iluminación dramática y contornos.',
        'Legibilidad: Textos optimizados para pantallas móviles.'
      ]
    },
    {
      id: 'rar-automotores',
      category: 'Branding / Estrategia',
      title: 'RAR Automotores: Ingeniería Visual',
      concept: 'Desarrollo de la identidad integral para una concesaionaria líder. Se posicionó a la marca como un referente moderno a través de un lenguaje visual basado en la aerodinámica.',
      image: 'https://drive.google.com/file/d/12N-LLBBmuOettsBSgYuPRXNUZ2-9xobx/view?usp=sharing',
      gallery: [
        'https://drive.google.com/file/d/12N-LLBBmuOettsBSgYuPRXNUZ2-9xobx/view?usp=sharing',
        'https://images.unsplash.com/photo-1562141982-c1a1a44099e1?q=80&w=1200&auto=format',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format'
      ],
      details: [
        'Concepto: "Velocidad y Precisión" basado en aerodinámica.',
        'Cromática: Negro Base, Azul Eléctrico (#0061FF) y Blanco.',
        'Tipografía: Sans-serif expandida para estabilidad institucional.',
        'Expansión: Adaptación omnicanal de digital a señalética física.'
      ]
    }
  ];

  const skills: Skill[] = [
    {
      category: 'Técnicas / Software',
      items: ['Adobe Photoshop (Experto)', 'Adobe Illustrator (Branding)', 'Adobe Premiere Pro', 'Figma (UI/UX)', 'After Effects (Motion)']
    },
    {
      category: 'Criterio / Soft Skills',
      items: ['Entrega bajo presión', 'Edición en tiempo real', 'Criterio editorial agudo', 'Adaptabilidad 24/7', 'Dirección de arte']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-12 lg:px-24 selection:bg-[#0061FF] selection:text-white">
      {selectedProject && (
        <ProjectGallery 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <header className="max-w-6xl mx-auto mb-32 mt-12 md:mt-24">
        <div className="flex flex-col gap-10">
          <h1 className="text-7xl md:text-9xl font-display font-black leading-[0.85] text-impact tracking-tighter">
            SEBASTIAN<br/>AVARO.
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl md:text-3xl font-semibold text-zinc-400 border-l-8 border-white pl-8 py-2 leading-tight italic">
              "Diseñador gráfico enfocado en comunicación de alto impacto. Transformo la urgencia en piezas visuales audaces y directas."
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mb-32">
        <SectionHeader title="Casos de Estudio" subtitle="Proyectos estratégicos" />
        <div className="space-y-16">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-32 grid md:grid-cols-2 gap-20">
        <div>
           <SectionHeader title="Habilidades" subtitle="Arsenal Técnico" />
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skills.map((group, i) => (
                <div key={i}>
                  <h4 className="text-[#0061FF] font-display font-bold text-[10px] mb-6 uppercase tracking-[0.3em]">{group.category}</h4>
                  <ul className="space-y-4">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-zinc-400 group cursor-default">
                        <span className="w-4 h-px bg-zinc-700 group-hover:bg-white group-hover:w-8 transition-all duration-300"></span>
                        <span className="text-sm font-bold group-hover:text-white transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="bg-zinc-900 p-8 md:p-14 border-l-8 border-[#0061FF]">
            <h3 className="text-3xl md:text-5xl font-display font-black mb-6 uppercase leading-none tracking-tighter">¿Impulsamos tu visión visual?</h3>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium">
              Especializado en diseño editorial y branding para el entorno digital moderno.
            </p>
            <a 
              href="mailto:hola@tuemail.com" 
              className="inline-block bg-white text-black px-10 py-5 text-lg font-display font-black hover:bg-[#0061FF] hover:text-white transition-all uppercase tracking-tighter w-full text-center"
            >
              Iniciar un proyecto
            </a>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto pt-16 pb-24 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">
          © 2024 VISUAL IMPACT — BRANDING & EDITORIAL STRATEGY
        </p>
        <div className="flex gap-10">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase font-black tracking-widest">LinkedIn</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs uppercase font-black tracking-widest">Behance</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
