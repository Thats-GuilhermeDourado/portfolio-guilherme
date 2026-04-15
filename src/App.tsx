import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Moon, Sun, ArrowRight, Github, Linkedin, Mail, FileText, ChevronRight, Layers, Cpu, Globe, Code2, X } from 'lucide-react';
import { Project, TechStackItem } from './types';


const PROJECTS: Project[] = [
  {
    id: 'gamemanager',
    title: 'Tactical Combat Engine',
    description: 'Real-time tactical combat with 3D dice, AI-generated NPCs, and live campaign synchronization.',
    tags: ['React', 'Firebase', 'Three.js', 'Gemini AI'],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70860-536967727_large.mp4',
    posterUrl: '/portfolio-guilherme/images/project1.png',
    caseLink: 'https://github.com/Thats-GuilhermeDourado/Tactical-Combat-Engine'
  },
  {
    id: 'integration',
    title: 'Cinematic UI Library',
    description: 'A reactive carousel component with glassmorphism aesthetics and signal-based state management.',
    tags: ['Angular 20', 'TypeScript', 'Swiper.js', 'SCSS'],
    videoUrl: 'https://cdn.pixabay.com/video/2020/11/04/54434-470656641_large.mp4',
    posterUrl: '/portfolio-guilherme/images/project2.png',
    caseLink: 'https://github.com/Thats-GuilhermeDourado/Cinematic-UI-Library'
  },
  {
    id: 'brand',
    title: 'Brand Identity System',
    description: 'A fully interactive portfolio experience simulating a Windows XP-style operating system, built entirely without frameworks.',
    tags: ['HTML/CSS/JS', 'Web Audio API'],
    videoUrl: 'https://cdn.pixabay.com/video/2022/01/18/104648-666355447_large.mp4',
    posterUrl: '/portfolio-guilherme/images/project3.png',
    caseLink: 'https://github.com/Thats-GuilhermeDourado/BrandIdentitySystem'
  }
];

const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const HexagonalDiagram = () => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      {/* Outer Hexagon (Adapters) */}
      <div className="absolute inset-0 border-2 border-black/10 dark:border-white/10 rounded-[20%] rotate-45 flex items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-black/10 dark:border-white/10">UI / API</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-black px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-black/10 dark:border-white/10">Database</div>
      </div>
      
      {/* Middle Hexagon (Ports) */}
      <div className="absolute inset-[15%] border-2 border-electric-blue/30 rounded-[20%] rotate-45 flex items-center justify-center">
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-electric-blue/30 text-electric-blue">Ports</div>
      </div>

      {/* Inner Core (Domain) */}
      <div className="absolute inset-[30%] bg-electric-blue text-white rounded-[20%] rotate-45 flex items-center justify-center shadow-2xl shadow-electric-blue/20">
        <div className="-rotate-45 flex flex-col items-center">
          <Layers size={24} className="mb-2" />
          <span className="text-[10px] font-black tracking-widest uppercase">Domain Core</span>
        </div>
      </div>

      {/* Connection Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-12 bg-black/10 dark:bg-white/10 rotate-45" />
        <div className="absolute top-1/4 right-1/4 w-px h-12 bg-black/10 dark:border-white/10 -rotate-45" />
      </div>
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerCarouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (carouselRef.current && innerCarouselRef.current) {
      setDragWidth(innerCarouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (carouselRef.current && innerCarouselRef.current) {
        setDragWidth(innerCarouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass h-16 flex items-center justify-between px-6 md:px-12">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-black text-sm tracking-tight uppercase"
        >
          Guilherme Dourado
        </motion.span>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest opacity-60">
            <a href="#works" className="hover:opacity-100 transition-opacity">Works</a>
            <a href="#architecture" className="hover:opacity-100 transition-opacity">Architecture</a>
            <a href="#stack" className="hover:opacity-100 transition-opacity">Stack</a>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-full"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 block opacity-40">
              Full-Stack Developer & Designer
            </span>
            <h1 className="title-fluid mb-8">
              Sleek<br />Engineering.
            </h1>
            <p className="text-xl md:text-2xl font-medium text-black/40 dark:text-white/40 max-w-2xl mx-auto leading-tight">
              Crafting high-performance systems with a focus on clean architecture and minimalist aesthetics.
            </p>
          </motion.div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-black/5 dark:border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-black/5 dark:border-white/5 rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-black/40 to-transparent dark:from-white/40" />
          </motion.div>
        </section>

        {/* Selected Works - Horizontal Scroll Prints */}
        <section id="works" className="py-24 md:py-40 overflow-hidden">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="px-6 md:px-12 mb-16"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Visual Showcase.</h2>
          </motion.div>

          <motion.div 
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div 
              ref={innerCarouselRef}
              drag="x"
              dragConstraints={{ right: 0, left: -dragWidth }}
              dragElastic={0.05}
              dragTransition={{ power: 0.1, timeConstant: 200 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="flex gap-8 px-6 md:px-12 pb-12"
            >
              {PROJECTS.map((project) => (
                <motion.div 
                  key={project.id}
                  variants={revealVariants}
                  whileHover={{ y: -10 }}
                  className="flex-shrink-0 w-[85vw] md:w-[60vw]"
                >
                  <div className="relative aspect-[16/10] bg-white dark:bg-black border border-black/5 dark:border-white/10 overflow-hidden group">
                  <img 
                    src={project.posterUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">{project.tags.join(' / ')}</span>
                    <h3 className="text-white text-3xl font-black tracking-tight mb-4">{project.title}</h3>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all w-fit"
                    >
                      View Project <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Hexagonal Architecture Section */}
        <section id="architecture" className="py-24 md:py-40 bg-snow dark:bg-almost-black border-y border-black/5 dark:border-white/5">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 block">System Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-8">Hexagonal<br />Architecture.</h2>
              <p className="text-xl text-black/60 dark:text-white/60 leading-relaxed mb-12">
                I build systems that are clean, testable, and quick to adapt. By keeping business rules independent from UI, databases, or APIs, I ensure code that lasts and scales with confidence.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-electric-blue">
                    <Cpu size={18} />
                    <span className="font-bold text-sm uppercase tracking-widest">Decoupled</span>
                  </div>
                  <p className="text-sm text-black/60 dark:text-white/60">Logic remains pure and independent of external frameworks.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-electric-blue">
                    <Globe size={18} />
                    <span className="font-bold text-sm uppercase tracking-widest">Adaptable</span>
                  </div>
                  <p className="text-sm text-black/60 dark:text-white/60">Easily swap databases or APIs without touching the core.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="relative"
            >
              <HexagonalDiagram />
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric-blue/5 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* The Engine / Stack */}
        <section id="stack" className="py-24 md:py-40">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
            >
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 block">The Engine</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Technical Stack.</h2>
              </div>
              <p className="text-black/60 dark:text-white/60 font-mono text-sm max-w-xs text-right">
                // Optimized for performance<br />
                // Scalable by design
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-1"
            >
              <motion.div variants={revealVariants} className="p-12 border border-black/5 dark:border-white/5 bg-white dark:bg-black/20 hover:bg-snow dark:hover:bg-white/5 transition-colors group">
                <Code2 className="mb-8 text-electric-blue" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Languages</h3>
                <div className="text-2xl font-black tracking-tight leading-tight">
                  PHP / PYTHON / JS<br />TYPESCRIPT
                </div>
              </motion.div>
              
              <motion.div variants={revealVariants} className="p-12 border border-black/5 dark:border-white/5 bg-white dark:bg-black/20 hover:bg-snow dark:hover:bg-white/5 transition-colors group">
                <Layers className="mb-8 text-electric-blue" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Databases</h3>
                <div className="text-2xl font-black tracking-tight leading-tight">
                  MYSQL / FIREBASE<br />FIRESTORE
                </div>
              </motion.div>

              <motion.div variants={revealVariants} className="p-12 border border-black/5 dark:border-white/5 bg-white dark:bg-black/20 hover:bg-snow dark:hover:bg-white/5 transition-colors group">
                <Globe className="mb-8 text-electric-blue" size={32} />
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Design & Tools</h3>
                <div className="text-2xl font-black tracking-tight leading-tight">
                  FIGMA / ADOBE SUITE<br />BOOTSTRAP / GIT / GITHUB
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white dark:bg-black text-almost-black dark:text-white border-t border-black/5 dark:border-white/5 py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="grid md:grid-cols-2 gap-20 mb-24"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase mb-8">Let's build<br />something.</h2>
              <a href="mailto:hello@guilherme.dev" className="text-2xl md:text-3xl font-medium text-electric-blue hover:underline decoration-2 underline-offset-8">
                guidouradosilva2004@gmail.com
              </a>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end gap-8">
              <div className="flex gap-8">
                <a href="https://github.com/Thats-GuilhermeDourado" target="_blank" rel="noopener noreferrer" className="text-[11px] font-black uppercase tracking-widest hover:text-electric-blue transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/guilherme-silva-28b190332/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-black uppercase tracking-widest hover:text-electric-blue transition-colors">LinkedIn</a>
                <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-electric-blue transition-colors">Instagram</a>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Available for new projects — Portugal
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-between items-center pt-12 border-t border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <span>© 2025 Guilherme Dourado</span>
            <span>Built with precision</span>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white dark:bg-almost-black overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 h-64 md:h-auto bg-black overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={selectedProject.posterUrl}
                  className="w-full h-full object-cover"
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                </video>
              </div>

              <div className="w-full md:w-1/3 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col bg-white dark:bg-almost-black text-almost-black dark:text-white border-l border-black/5 dark:border-white/5">
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-electric-blue mb-2 block">Project Detail</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4 text-almost-black dark:text-white break-words">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-almost-black dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <a 
                    href={selectedProject.caseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-electric-blue text-white text-center font-black uppercase tracking-widest text-xs hover:bg-electric-blue/90 transition-colors block"
                  >
                    More Information
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-4 border border-black/10 dark:border-white/10 font-black uppercase tracking-widest text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-almost-black dark:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
