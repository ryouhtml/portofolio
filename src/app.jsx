import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useAnimationFrame, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Instagram, Youtube, Download, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import archive from './data/projects.json';
import brands from './data/brands.json';
import './styles.css';

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];
const categories = ['Semua', 'Web App', 'API', 'Frontend', 'Fullstack', 'Tool'];
const featured = archive.filter(p => p.featured).slice(0, 3);
const experiences = [
  { date: '2024 · SEKARANG', title: 'Freelance Web Developer', place: 'React & Next.js Projects', text: 'Membangun web app dan platform digital menggunakan React, Next.js, TypeScript, dan Tailwind CSS. Dari desain UI sampai deployment di Vercel.' },
  { date: '2024', title: 'Full-Stack Developer', place: 'KiraStream Platform', text: 'Mengembangkan KiraStream, platform streaming anime/manga/novel berbasis Next.js 14 PWA. Fitur pencarian, bookmark, history, dan installable sebagai progressive web app.' },
  { date: '2024', title: 'API Developer', place: 'animasu-api', text: 'Membangun REST API scraper untuk konten anime dan manga menggunakan Node.js, Cheerio, dan Axios. Di-deploy dengan Vercel serverless functions.' },
  { date: '2024', title: 'Frontend Developer', place: 'JCC Lensa Skensa', text: 'Membuat website open recruitment untuk klub jurnalistik sekolah SMKN 1 Kedungwuni menggunakan React, TypeScript, dan Vite.' },
  { date: '2023 · SEKARANG', title: 'Vibe Coder', place: 'Open Source & Side Projects', text: 'Eksperimen coding, membuat tools kecil, dan terus belajar hal baru di dunia web development. GitHub: github.com/ryouhtml' },
];
const certificates = [];
const awards = [
  {year:'2024',title:'KiraStream Launch',event:'Next.js PWA — Anime Streaming Platform'},
  {year:'2024',title:'animasu-api',event:'Node.js REST API — Public Release'},
  {year:'2024',title:'JCC Lensa Skensa',event:'React + TypeScript — Live Deployment'},
];

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];
  return <Component className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</Component>;
}

function MediaImage({ src, alt, className = '', priority = false, ...props }) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth ? 'loaded' : 'error') : 'loading');
  }, [src]);
  return <span className={`media-image ${state} ${className}`}>
    {state === 'error' && <span className="image-fallback"><span className="display">B.</span><span>Pratinjau tidak tersedia</span></span>}
    <img ref={imgRef} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="960" height="600" onLoad={() => setState('loaded')} onError={e => {
      if (e.currentTarget.src.includes('maxresdefault.jpg')) e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
      else setState('error');
    }} {...props} />
  </span>;
}

function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a className={className} style={{ x, y }} onPointerMove={e => {
    if (!enabled || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}

function Header({ enabled, onToggle }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="Bagus, beranda">BAGUS<span>®</span></a>
    <nav className="desktop-nav" aria-label="Navigasi utama">{[['portfolio', 'Karya'], ['awards', 'Projects'], ['about', 'Tentang'], ['experience', 'Perjalanan'], ['contact', 'Kontak']].map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
    <div className="header-actions"><button className="motion-toggle" onClick={onToggle} aria-label={enabled ? 'Jeda animasi' : 'Aktifkan animasi'} aria-pressed={!enabled}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button><a className="header-contact" href="#contact">Let's talk <ArrowUpRight size={16} /></a><button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Tutup menu' : 'Buka menu'}>{open ? <X /> : <Menu />}</button></div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Navigasi mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{[['home', 'Beranda'], ['portfolio', 'Karya'], ['awards', 'Projects'], ['about', 'Tentang'], ['experience', 'Perjalanan'], ['contact', 'Kontak']].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return <section id="home" className="hero" ref={ref}>
    <div className="hero-top"><span>VIBE CODER<br/><span className="muted">WEB DEVELOPER</span></span><span className="availability"><i />OPEN FOR COLLABORATION</span></div>
    <motion.div className="hero-title display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>PORTFOLIO</motion.div>
    <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}><img src="./Asset/img/bagus-portrait.png" alt="Bagus, vibe coder & web developer dari Semarang" width="1024" height="1536" fetchPriority="high" /></motion.div>
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="handwriting">Hello, I'm</p><h1 className="display">BAGUS<span>.</span></h1><p className="hero-role">VIBE CODER &<br />WEB DEVELOPER</p><p className="hero-description">Nge-code dengan perasaan.<br />Saya bangun web yang bukan cuma jalan, tapi juga enak dipandang.</p>
      <Magnetic href="#portfolio" className="primary-link">Lihat karya saya <ArrowDown size={17}/></Magnetic>
      <span className="hero-location"><MapPin size={12} /> SEMARANG, INDONESIA</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="hero-manifesto"><span className="crosshair" aria-hidden="true">✳</span><p>Every line.<br />A different story.</p></div>
      <div className="hero-stats"><div><span className="display">3<span>+</span></span><p>TAHUN<br/>NGODING</p></div><div><span className="display">10<span>+</span></span><p>PROYEK<br/>WEB & APP</p></div><div className="hero-award-stat"><span className="display">∞<span></span></span><a href="#awards" aria-label="Lihat proyek Bagus">OPEN SOURCE<ArrowUpRight size={12}/></a></div></div>
    </motion.div>
    <div className="hero-bottom"><button className="reel-button" onClick={() => onProject && featured[0] && onProject(featured[0])}><span className="play-circle"><Play size={12} fill="currentColor" /></span>LIHAT PROYEK<span className="muted">WEB / APP</span></button><span className="hero-scroll">SCROLL TO DISCOVER <ArrowDown size={13}/></span><span className="edition">SELECTED WORK / 2023–2024</span></div>
  </section>;
}

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const video = ['youtube', 'drive'].includes(project.type);
  return <motion.article ref={ref} className="project-card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`Lihat ${project.title}`}><motion.div className="project-picture" style={enabled ? { y } : {}}><MediaImage src={project.image || `https://opengraph.githubassets.com/1/ryouhtml/${project.title.toLowerCase()}`} alt={project.title}/></motion.div><span className="project-type">{video ? 'FILM / VIDEO' : project.type === 'website' ? 'WEBSITE' : 'PROJECT'}</span><span className="project-hover">{video ? <Play fill="currentColor" size={18}/> : <ArrowUpRight size={22}/>}</span><span className="project-frame" aria-hidden="true" /></button>
    <button className="project-caption" onClick={() => onOpen(project)}><span className="project-number display">{String(index + 1).padStart(2, '0')}</span><span><h3>{project.title}</h3><span className="project-category">{project.category}{project.year ? ` / ${project.year}` : ''}</span></span><ArrowUpRight size={20}/></button>
  </motion.article>;
}

function BrandStrip() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const loopWidth = useRef(0);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (!ref.current || showAll) return;
    const update = () => { loopWidth.current = ref.current?.querySelector('.brand-set')?.getBoundingClientRect().width || 0; };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current); update();
    return () => observer.disconnect();
  }, [showAll]);
  useAnimationFrame((time, delta) => {
    if (!enabled || paused || interacting || !inView || showAll || !ref.current || !loopWidth.current) return;
    const el = ref.current;
    el.scrollLeft += Math.min(delta, 40) * 0.038;
    if (el.scrollLeft >= loopWidth.current) el.scrollLeft -= loopWidth.current;
  });
  const move = direction => { setPaused(true); ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .7, behavior: enabled ? 'smooth' : 'instant' }); };
  return <Reveal className="brand-section"><div className="brand-heading"><p>TECH STACK &<br/><strong>TOOLS I USE.</strong></p><div><button className="brand-all" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} aria-controls="brand-collection">{showAll ? 'TAMPILKAN DERET' : `LIHAT SEMUA (${brands.length})`}{showAll ? <Minus size={14}/> : <Plus size={14}/>}</button>{!showAll && <><button className="icon-button brand-pause" aria-label={paused ? 'Putar animasi logo' : 'Jeda animasi logo'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button><button className="icon-button" onClick={() => move(-1)} aria-label="Logo sebelumnya"><ChevronLeft size={17}/></button><button className="icon-button" onClick={() => move(1)} aria-label="Logo selanjutnya"><ChevronRight size={17}/></button></>}</div></div><div id="brand-collection" className={showAll ? 'brand-full-grid' : 'brand-viewport'} ref={ref} onPointerEnter={e => { if(e.pointerType==='mouse') setInteracting(true); }} onPointerLeave={() => setInteracting(false)} onPointerDown={() => setPaused(true)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} tabIndex={showAll ? undefined : 0} role={showAll ? 'list' : 'region'} aria-label="Tech stack dan tools, geser untuk melihat semuanya">
      {showAll ? brands.map(b => <div className="brand-logo" key={b.file} role="listitem"><img src={`./Asset/svg/brand/${b.file}`} alt={b.name} title={b.name} width="150" height="60" loading="lazy"/><span>{b.name}</span></div>) : <div className="brand-rail">{[0,1].map(copy => <div className="brand-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{brands.map(b => <div className="brand-logo" key={b.file}><img src={`./Asset/svg/brand/${b.file}`} alt={copy ? '' : b.name} title={b.name} width="150" height="60" loading="lazy" draggable="false"/></div>)}</div>)}</div>}
    </div></Reveal>;
}

function Portfolio({ onProject }) {
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = archive.filter(p => (category === 'Semua' || p.category === category) && `${p.title} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
  const projects = expanded || category !== 'Semua' || query ? results.slice(0, limit) : featured.length ? featured : results.slice(0, 3);
  return <section id="portfolio" className="portfolio section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2>KARYA YANG BICARA<span className="accent">.</span></h2></div><button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('Semua'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>{expanded ? 'KARYA PILIHAN' : 'SEMUA KARYA'}<ArrowRight size={21}/></button></Reveal>
    <Reveal className="portfolio-toolbar">
      <div className="filters" role="group" aria-label="Kategori karya">
        {categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line"/>}</button>)}
      </div>
      <label className="search-box"><Search size={15}/><span>Cari</span><input aria-label="Cari karya" type="search" placeholder="Judul atau kategori…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }}/></label>
    </Reveal>
    <motion.div className="project-grid" layout><AnimatePresence mode="popLayout">{projects.map((p, i) => <ProjectCard key={p.category + p.title} project={p} index={i} onOpen={onProject}/>)}</AnimatePresence></motion.div>
    {projects.length === 0 && <div className="empty-state"><p>Tidak ada karya untuk "{query}".</p><button className="text-link" onClick={() => { setQuery(''); setCategory('Semua'); }}>Reset pencarian <X size={15}/></button></div>}
    {expanded && results.length > limit && <div className="load-more"><button className="outline-button" onClick={() => setLimit(v => v + 9)}>Tampilkan karya lainnya <Plus size={16}/></button><span>{projects.length} dari {results.length} karya</span></div>}
    <BrandStrip/>
  </section>;
}

const processSteps = [
  ['01', 'THE IDEA', 'Memahami kebutuhan. Menentukan stack, arsitektur, dan pendekatan yang paling tepat.'],
  ['02', 'THE PLAN', 'Merancang struktur komponen, alur data, dan desain UI yang akan dibangun.'],
  ['03', 'THE BUILD', 'Coding dengan clean code, responsive design, dan perhatian ke detail di setiap pixel.'],
  ['04', 'THE POLISH', 'Optimasi performa, aksesibilitas, dan animasi yang smooth. Pastikan semua terasa sempurna.'],
  ['05', 'THE SHIP', 'Deploy, testing akhir, dan serahkan produk yang siap dipakai oleh penggunanya.'],
];

function Awards({onProject}) {
  const [expanded,setExpanded] = useState(false);
  const laurelPath = 'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';
  return <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
    <Reveal className="recognition-intro">
      <span className="eyebrow">PROJECTS & MILESTONES</span>
      <h2 className="display">THE CODE.<br/><span className="accent">THE RESULTS.</span></h2>
      <div className="award-total">
        <svg viewBox="0 0 60 100" aria-hidden="true"><path d={laurelPath} fill="currentColor"/></svg>
        <span className="display">10<span>+</span></span>
        <svg viewBox="0 0 60 100" aria-hidden="true"><g transform="translate(60 0) scale(-1 1)"><path d={laurelPath} fill="currentColor"/></g></svg>
        <span className="award-total-label">PROJECTS SHIPPED</span>
      </div>
      <p>Dari ide sampai production.<br/>Setiap project adalah cerita yang selesai ditulis.</p>
    </Reveal>
    <div className="recognition-list">
      <div className="recognition-list-head"><span>SELECTED PROJECTS</span><span>2023 – 2024</span></div>
      <ol id="recognition-list">{awards.map((award,i)=><Reveal as="li" className={`recognition-row ${i>2?'additional-award':''}`} key={award.year + award.title} delay={i*.045}>
        <span className="award-index">0{i+1}</span>
        <div><h3>{award.title}</h3><p>{award.event}</p></div>
        <span className="award-year display">{award.year}</span>
      </Reveal>)}</ol>
      <button className="award-expand" aria-expanded={expanded} aria-controls="recognition-list" onClick={()=>setExpanded(v=>!v)}>{expanded?'Ringkas':'Lihat semua'}{expanded?<Minus size={16}/>:<Plus size={16}/>}</button>
    </div>
  </section>;
}

function Breakdown() {
  // Komponen ini sengaja tidak dirender di App()
  return null;
}

function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  return <section id="about" className="about section-wrap" ref={ref}>
    <Reveal className="about-lead"><div><span className="eyebrow">02 / BEHIND THE CODE</span><h2 className="display">BUKAN SEKADAR NGODING.<br/>TAPI CARA <span className="accent">BERCERITA.</span></h2></div><p>Saya Bagus, vibe coder & web developer dari Semarang. Saya suka bangun web yang terasa hidup — perpaduan antara logika code yang bersih dan UI yang enak dipandang.</p></Reveal>
    <div className="studio-grid">
      <Reveal className="education-panel"><h3 className="panel-heading">EDUCATION & SKILLS</h3><p className="eyebrow accent">LATAR BELAKANG</p><div className="education-row"><strong>Self-Taught Developer</strong><span>2022–sekarang</span><p>Belajar web development secara mandiri dari nol: HTML, CSS, JavaScript, sampai full-stack.</p></div><div className="education-row"><strong>Open Source Projects</strong><span>GitHub</span><p>Aktif membangun dan merilis project di github.com/ryouhtml</p></div><div className="education-row"><strong>Komunitas & Online Courses</strong><p>Belajar dari docs resmi, YouTube, dan komunitas developer Indonesia.</p></div><p className="eyebrow accent skills-heading">TECH STACK</p><div className="skill-tags">{['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Firebase', 'Supabase', 'Vite', 'Vercel'].map(s => <span key={s}>{s}</span>)}</div><div className="software-row">{[['vs','VS Code'],['react','React'],['nextjs','Next.js'],['ts','TypeScript'],['tw','Tailwind'],['vite','Vite']].map(([file, name]) => <span key={file} title={name} style={{fontSize:'9px',color:'var(--muted)',padding:'4px 7px',border:'1px solid var(--line)',borderRadius:'3px'}}>{name}</span>)}</div></Reveal>
      <div className="process-panel"><Reveal><h3 className="panel-heading">FROM IDEA TO SHIPPED</h3></Reveal><div className="process-list"><div className="process-track"><motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }}/></div>{processSteps.map(([num, title, text], i) => <Reveal key={num} className="process-row" delay={i * 0.035}><span className="process-num display">{num}</span><span className="process-node"/><div><h4>{title}</h4><p>{text}</p></div></Reveal>)}</div></div>
      <Reveal className="quote-panel"><span className="quote-mark display">"</span><blockquote>Dari konsep<br/>dan struktur code,<br/><em>sampai produk<br/>yang terasa hidup.</em></blockquote><span className="handwriting">Bagus</span><div className="quote-bottom">LET'S BUILD<br/>SOMETHING REAL.<span className="quote-symbol" aria-hidden="true">✳</span></div></Reveal>
    </div>
  </section>;
}

function Journey({ onProject }) {
  const [open, setOpen] = useState(0);
  return <section id="experience" className="journey section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / THE JOURNEY</span><h2>TERUS BERGERAK. TERUS BERKARYA<span className="accent">.</span></h2></div><a className="text-link" href="https://github.com/ryouhtml" target="_blank" rel="noopener noreferrer">GITHUB<ArrowUpRight size={16}/></a></Reveal>
    <div className="journey-grid"><div className="experience-list">{experiences.map((job, i) => <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={job.title}><button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="experience-date">{job.date}</span><span><h3>{job.title}</h3><span className="experience-place">{job.place}</span></span>{open === i ? <Minus size={18}/> : <Plus size={18}/>}</button><AnimatePresence initial={false}>{open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}><p>{job.text}</p></motion.div>}</AnimatePresence></Reveal>)}</div>
    <Reveal className="awards-panel"><p className="eyebrow">MILESTONES</p><h3 className="display">LITTLE WINS.<br/><span className="accent">BIG MEANING.</span></h3><div className="award-list">{awards.map((award, i) => <a key={award.title} href="https://github.com/ryouhtml" target="_blank" rel="noopener noreferrer" style={{display:'flex',gap:'17px',alignItems:'center',minHeight:'65px',width:'100%',borderTop:'1px solid var(--line)',textAlign:'left',fontSize:'11px'}}><span style={{color:'var(--red)',fontSize:'10px'}}>{String(i + 1).padStart(2, '0')}</span><span style={{flex:1}}>{award.title}<small style={{display:'block',color:'var(--muted)',fontSize:'9px',marginTop:'4px'}}>{award.year}</small></span><ArrowUpRight size={19} style={{color:'var(--muted)'}}/></a>)}</div></Reveal></div>
  </section>;
}

function Contact({ onProject }) {
  const [sent, setSent] = useState(false);
  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Halo Bagus, saya ${data.get('name')}.\n\nJenis proyek: ${data.get('type')}\n${data.get('message')}`;
    window.open(`https://wa.me/62816694700?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return <section id="contact" className="contact section-wrap">
    <div className="contact-grid"><Reveal className="contact-intro"><span className="eyebrow">04 / YOUR NEXT PROJECT</span><h2 className="display">LET'S BUILD<br/>TOGETHER<span className="accent">.</span></h2><p>Punya ide yang ingin diwujudkan?<br/>Mari bangun sesuatu yang keren bareng.</p><Magnetic href="https://wa.me/62816694700" target="_blank" rel="noopener noreferrer" className="contact-cta"><span className="round-arrow"><ArrowUpRight size={21}/></span>MULAI PERCAKAPAN</Magnetic></Reveal>
    <Reveal className="contact-links" delay={0.1}><a href="mailto:kanawangyy@gmail.com"><Mail/><span><small>EMAIL</small>kanawangyy@gmail.com</span><ArrowUpRight size={16}/></a><a href="https://github.com/ryouhtml" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16}/><span><small>GITHUB</small>github.com/ryouhtml</span><ArrowUpRight size={16}/></a><a href="tel:+62816694700"><Phone/><span><small>PHONE / WHATSAPP</small>+62 816-694-700</span><ArrowUpRight size={16}/></a><a href="https://wa.me/62816650800" target="_blank" rel="noopener noreferrer"><Phone/><span><small>WHATSAPP 2</small>+62 816-650-800</span><ArrowUpRight size={16}/></a><div><MapPin/><span><small>BASED IN</small>Semarang, Indonesia</span></div></Reveal>
    <Reveal className="contact-reel" delay={0.2}><div style={{padding:'18px 0 0 10px',transform:'rotate(5deg)',transition:'transform .6s cubic-bezier(.22,1,.36,1)'}} onMouseEnter={e=>e.currentTarget.style.transform='rotate(0) translateY(-6px)'} onMouseLeave={e=>e.currentTarget.style.transform='rotate(5deg)'}><div className="reel-screen"><span className="reel-screen-top">BAGUS®<span>VIBE CODER</span></span><span className="reel-screen-title display">BUILD<br/><span>FAST.</span></span><span className="play-circle"><ArrowUpRight size={18}/></span></div><span className="reel-caption">OPEN FOR NEW PROJECTS.</span></div></Reveal></div>
    <Reveal><details className="project-brief"><summary>Ceritakan proyek Anda <Plus size={19}/></summary><form onSubmit={send}><label>Nama Anda<input name="name" required placeholder="Nama atau brand" autoComplete="name" maxLength="100"/></label><label>Jenis proyek<select name="type"><option>Web App</option><option>Landing Page</option><option>API Development</option><option>Frontend</option><option>Full-Stack</option><option>Kolaborasi lainnya</option></select></label><label className="brief-message">Tentang proyek<textarea name="message" required rows="3" placeholder="Ceritakan ide, kebutuhan, dan perkiraan waktunya…" maxLength="3000"/></label><button className="solid-button" type="submit">Lanjut ke WhatsApp <ArrowUpRight size={18}/></button><p className="form-note" role="status">{sent ? 'Draft pesan siap di WhatsApp. Tekan Kirim di sana untuk memulai percakapan.' : 'Brief akan dibuka sebagai draft pesan di WhatsApp.'}</p></form></details></Reveal>
  </section>;
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const enabled = useContext(MotionContext);
  const isVideo = ['youtube', 'drive'].includes(project.type);
  const sourceUrl = project.link || project.media || project.image;
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const listener = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', listener); previous?.focus(); };
  }, [onClose]);
  return <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex="-1" initial={enabled ? { y: 45, scale: 0.97 } : false} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-heading"><span className="eyebrow">{project.category} {project.year && ` / ${project.year}`}</span><button onClick={onClose} className="icon-button" aria-label="Tutup karya"><X/></button></div>
      <div className={`dialog-media ${!isVideo ? 'still' : ''}`}>
        {isVideo ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.media}?autoplay=1&rel=0`} title={project.title} width="1280" height="720" allow="autoplay; encrypted-media; fullscreen" allowFullScreen onLoad={() => setMediaLoaded(true)}/> : <MediaImage src={project.image || `https://opengraph.githubassets.com/1/ryouhtml/${project.title.toLowerCase()}`} alt={project.title} priority/>}
      </div>
      <div className="dialog-description"><div><h2 id="dialog-title">{project.title}</h2>{project.tech && <span className="accent">{project.tech.join(' · ')}</span>}<p>{project.description}</p></div>{sourceUrl && <a className="outline-button" href={sourceUrl} target="_blank" rel="noopener noreferrer">Lihat project<ExternalLink size={15}/></a>}</div>
    </motion.div>
  </motion.div>;
}

function App() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem('bagus-motion') !== 'off'; } catch { return true; } });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  const toggle = () => { setMotionOn(!motionOn); try { localStorage.setItem('bagus-motion', motionOn ? 'off' : 'on'); } catch {} };
  const close = React.useCallback(() => setProject(null), []);
  return <MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <a className="skip-link" href="#portfolio">Lewati ke karya</a>
      <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }}/>
      <Header enabled={enabled} onToggle={toggle}/>
      <main>
        <Hero onProject={setProject}/>
        <Portfolio onProject={setProject}/>
        <Awards onProject={setProject}/>
        <About/>
        <Journey onProject={setProject}/>
        <Contact onProject={setProject}/>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">BAGUS<span>®</span></a>
        <span>© {new Date().getFullYear()} BAGUS. EVERY LINE HAS A PURPOSE.</span>
        <div>
          <a href="https://github.com/ryouhtml" target="_blank" rel="noopener noreferrer" aria-label="GitHub ryouhtml"><ArrowUpRight size={17}/></a>
          <a href="https://wa.me/62816694700" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Bagus"><Phone size={17}/></a>
          <a href="#home" aria-label="Kembali ke atas"><ArrowUpRight size={18}/></a>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.title} project={project} onClose={close}/>}</AnimatePresence>
    </MotionConfig>
  </MotionContext.Provider>;
}

createRoot(document.getElementById('root')).render(<App/>);
