import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Heart, Sparkles } from 'lucide-react';
import EsteeCaseStudy from './EsteeCaseStudy';

function Avatar() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    let frame = 0;
    const follow = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === 'touch' || !scene.current) return;
      const bounds = scene.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const x = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth * .45)));
      const y = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight * .48)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLook({ x, y }));
    };
    const reset = () => setLook({ x: 0, y: 0 });
    window.addEventListener('pointermove', follow, { passive: true });
    window.addEventListener('blur', reset);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener('change', updatePreference); window.removeEventListener('pointermove', follow); window.removeEventListener('blur', reset); };
  }, []);
  const x = reducedMotion ? 0 : look.x;
  const y = reducedMotion ? 0 : look.y;
  return <div ref={scene} className={`avatar-scene svg-avatar-scene${reducedMotion ? ' reduce-avatar-motion' : ''}`} aria-label="Playful illustrated character whose eyes follow your cursor" role="img">
    <div className="avatar-blob" aria-hidden="true" />
    <svg className="svg-character" viewBox="0 0 440 440" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#39242c"/><stop offset="1" stopColor="#1a1724"/></linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4b28e"/><stop offset="1" stopColor="#e99479"/></linearGradient>
      </defs>
      <g className="character-head" style={{transform: `translate(${x * 7}px, ${y * 5}px) rotate(${x * 3}deg)`}}>
        <path d="M112 334 Q82 242 96 163 Q108 59 219 58 Q338 52 350 167 Q362 263 337 341 Q298 386 216 379 Q137 381 112 334Z" fill="url(#hair)"/>
        <path d="M122 340 Q161 311 221 320 Q281 307 327 345 L351 440 H93Z" fill="#252638"/>
        <path d="M190 300 L190 357 Q220 383 252 357 L252 300Z" fill="#e79c7f"/>
        <ellipse cx="220" cy="218" rx="105" ry="126" fill="url(#skin)"/>
        <ellipse cx="117" cy="232" rx="18" ry="28" fill="#eba17f"/><ellipse cx="323" cy="232" rx="18" ry="28" fill="#eba17f"/>
        <path d="M112 192 Q110 74 216 74 Q318 68 328 185 Q301 151 280 126 Q236 164 175 147 Q145 170 112 192Z" fill="url(#hair)"/>
        <path d="M123 155 Q155 97 228 99 Q290 103 321 154" fill="none" stroke="#54404a" strokeWidth="8" strokeLinecap="round" opacity=".65"/>
        <path d="M147 183 Q169 170 195 183 M246 183 Q272 169 295 183" fill="none" stroke="#38212a" strokeWidth="9" strokeLinecap="round"/>
        <ellipse cx="171" cy="215" rx="32" ry="24" fill="#fffaf3"/><ellipse cx="268" cy="215" rx="32" ry="24" fill="#fffaf3"/>
        <g style={{transform:`translate(${x * 10}px, ${y * 8}px)`}} className="moving-pupils"><circle cx="171" cy="216" r="14" fill="#5c3b2c"/><circle cx="268" cy="216" r="14" fill="#5c3b2c"/><circle cx="171" cy="216" r="8" fill="#18151b"/><circle cx="268" cy="216" r="8" fill="#18151b"/><circle cx="176" cy="211" r="4" fill="white"/><circle cx="273" cy="211" r="4" fill="white"/></g>
        <g className="eyelids"><path d="M139 198 Q171 190 203 198 L203 200 Q171 227 139 200Z" fill="#e9a081"/><path d="M236 198 Q268 190 300 198 L300 200 Q268 227 236 200Z" fill="#e9a081"/></g>
        <path d="M217 226 Q210 253 219 255" fill="none" stroke="#cb7e68" strokeWidth="4" strokeLinecap="round"/>
        <path d="M184 281 Q220 310 257 280 Q218 293 184 281Z" fill="#ad5168"/><path d="M190 283 Q219 296 252 282" fill="none" stroke="#f4a6a5" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="158" cy="260" r="3" fill="#c77f68"/><circle cx="170" cy="267" r="2" fill="#c77f68"/><circle cx="282" cy="259" r="3" fill="#c77f68"/><circle cx="292" cy="268" r="2" fill="#c77f68"/>
        <circle cx="118" cy="255" r="7" fill="#d7ed37"/><circle cx="323" cy="255" r="7" fill="#d7ed37"/>
        <path d="M114 169 Q86 265 131 336 M326 165 Q363 257 326 337" fill="none" stroke="#2c1b26" strokeWidth="26" strokeLinecap="round"/>
      </g>
    </svg>
    <span className="accent-rays" aria-hidden="true">✳</span>
    <span className="avatar-sparkle" aria-hidden="true">✦</span>
  </div>;
}

const projects = [
  { number: '01', label: 'ENTERPRISE DESIGN ENGINEERING', title: 'Estée Lauder Companies', description: 'Reusable React experiences across distinct beauty brands, with a focus on design fidelity and performance.', theme: 'estee', tags: ['React', 'Drupal', 'Cross-brand UI'], icon: 'ELC' },
  { number: '02', label: 'INDEPENDENT PRODUCT', title: 'BYOT Journal', description: 'An AI-powered journaling experience exploring reflection, personal growth, and voice-first interactions.', theme: 'byot', tags: ['Product design', 'React', 'AI'], icon: 'byot.' },
  { number: '03', label: 'COMING SOON', title: 'Creative Playground', description: 'Small experiments in interaction, motion, and the delightful details that make interfaces feel alive.', theme: 'play', tags: ['Creative coding', 'Interaction'], icon: '✳' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => { const onHashChange = () => { setRoute(window.location.hash); window.scrollTo(0, 0); }; window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  if (route.startsWith('#/work/estee')) return <EsteeCaseStudy />;
  return <>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Evelina Lurye, back to top">Evelina Lurye<span>.</span></a>
      <button className="mobile-menu" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? 'Close' : 'Menu'}</button>
      <nav id="main-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="mailto:hello@example.com" onClick={e => {e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false);}}>Contact</a></nav>
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> CREATIVE THINKER. TECHNICAL BUILDER.</div>
          <h1 id="hero-title">Design<br />Engineer<span className="period">.</span></h1>
          <p className="handwritten">I'm creative, technical, <em>and</em> playful. <Heart size={30} strokeWidth={2.5} aria-hidden="true" /></p>
          <p className="hero-description">I bring creative vision and technical precision together to build thoughtful, beautiful digital experiences.</p>
          <a className="primary-button" href="#work">Explore my work <ArrowUpRight size={20}/></a>
        </div>
        <div className="hero-art"><Avatar /></div>
        <a className="scroll-cue" href="#work" aria-label="Scroll to featured work"><ArrowDown size={18}/><span>SCROLL TO EXPLORE</span></a>
      </section>
      <section id="work" className="work-section" aria-labelledby="work-heading"><div className="section-topline"><div><p className="section-kicker">THE THINGS I MAKE</p><h2 id="work-heading">Selected <em>work.</em></h2></div><span className="section-aside">A little design. A little code.<br/>A lot of curiosity.</span></div>
        <div className="projects">{projects.map(project => <article className="project-card" key={project.number}>
          <div className={`project-art ${project.theme}`} aria-hidden="true"><span className="project-art-kicker">{project.label}</span><strong>{project.icon}</strong><span className="art-ornament">✳</span></div>
          <div className="project-details"><div className="project-heading"><div><span className="project-number">{project.number} / {project.label}</span><h3>{project.title}</h3></div><ArrowUpRight size={24} aria-hidden="true" /></div><p>{project.description}</p>{project.number === '01' && <a className="project-open" href="#/work/estee">Explore case study <ArrowUpRight size={16}/></a>}<div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        </article>)}</div>
        <p className="work-note">The Estée Lauder case study is ready to explore. Other project media and case studies are in progress; card artwork is illustrative.</p>
      </section>
      <section id="about" className="about-section"><div className="about-sticker"><Sparkles size={35}/></div><div><p className="section-kicker">A LITTLE ABOUT ME</p><h2>Equal parts <em>logic</em><br/>and imagination<span className="period">.</span></h2><p>I'm a UX Engineer with a software engineering foundation and a love of thoughtful, expressive design. I care about the details people see—and the engineering that makes those details work.</p><a href="#contact" className="text-link">Say hello <ArrowRight size={20}/></a></div></section>
      <section id="contact" className="contact-section">
        <p className="section-kicker">LET'S MAKE SOMETHING GOOD</p><h2>Have something<br/><em>in mind?</em></h2><p>I'd love to hear about interesting design engineering opportunities.</p>
        <p className="contact-placeholder">
          <a href="mailto:evelinalurye@gmail.com" rel="noopener noreferrer" data-token-index="1">
            <span>evelinalurye@gmail.com</span></a> <span className="spacer-left">|</span>
          <a href="http://linkedin.com/in/evelina-lurye-ux-engineer" rel="noopener noreferrer" data-token-index="3" className="spacer-left">
            <span>linkedin.com/in/evelina-lurye-ux-engineer</span></a> <span className="spacer-left">|</span>
          <a href="https://github.com/elurye" rel="noopener noreferrer" data-token-index="5" className="spacer-left">
            <span>https://github.com/elurye</span></a>
        </p>
      </section>
    </main><footer><span>© {new Date().getFullYear()} Evelina Lurye</span><span>Designed with curiosity. Built with care. <span aria-hidden="true">✳</span></span></footer>
  </>;
}
