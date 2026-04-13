import { useState, useEffect, useRef } from "react";

const DATA = {
  name: "Max De Luna",
  tagline: "Desarrollador Fullstack",
  description: "Creando soluciones web modernas y escalables.",
  email: "max@deluna.dev",
  github: "https://github.com/MDL-Dev038",
  linkedin: "https://linkedin.com/in/maxdeluna",
  skills: [
    { name: "React / Next.js", level: 95 },
    { name: "Node.js / Express", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "PostgreSQL / MySQL", level: 82 },
    { name: "Python", level: 78 },
    { name: "Docker / DevOps", level: 75 },
    { name: "AWS / Cloud", level: 72 },
  ],
  projects: [
    {
      id: 1,
      title: "Sistema Obra-Almacén",
      company: "Empresa confidencial",
      description:
        "Digitalización completa del flujo obra-almacén: solicitud de material desde obra, armado de pedido, asignación de chofer con vista de mapa y rutas en tiempo real, surtido en obra y control de calidad con formularios y pruebas por vivienda. Redujo el levantamiento de una casa de 2h 30min a 1h 15min — un 50% menos de tiempo.",
      tech: ["React", "Laravel", "SQL", "Mapas / Geolocalización"],
      github: null,
      demo: null,
      featured: true,
      badge: "Producción",
      impact: "−50% tiempo de levantamiento",
    },
    {
      id: 2,
      title: "Intranet RH",
      company: "Empresa confidencial",
      description:
        "Sistema integral de recursos humanos que unifica el proceso de reclutamiento, selección y alta de empleados. Una vez activo, el empleado gestiona vacaciones, horas extras, permisos y solicitudes, todo integrado directamente con nóminas. Eliminó el caos del proceso manual y centralizó la operación completa de RH en una sola plataforma.",
      tech: ["React", "Supabase", "PostgreSQL"],
      github: null,
      demo: null,
      featured: true,
      badge: "En desarrollo",
      impact: "Proceso 100% digitalizado",
    },
    {
      id: 3,
      title: "AuthKit",
      company: null,
      description:
        "Boilerplate fullstack de autenticación listo para producción. Implementa JWT access tokens de corta duración, refresh token rotation con detección de token comprometido, cookies HttpOnly y axios interceptors para renovación silenciosa en el frontend.",
      tech: ["Node.js", "Express", "Supabase", "React", "JWT"],
      github: "https://github.com/MDL-Dev038/authkit",
      demo: null,
      featured: true,
      badge: "Open Source",
      impact: "Refresh token rotation + detección de robo",
    },
  ],
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080b0f;
    --bg2: #0d1117;
    --bg3: #161b22;
    --border: #21262d;
    --border2: #30363d;
    --green: #00ff88;
    --green-dim: rgba(0,255,136,0.12);
    --green-glow: rgba(0,255,136,0.35);
    --text: #e6edf3;
    --text-dim: #7d8590;
    --text-muted: #484f58;
    --accent: #58a6ff;
    --mono: 'Space Mono', monospace;
    --display: 'Syne', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    overflow-x: hidden;
    cursor: none;
  }

  ::selection { background: var(--green-dim); color: var(--green); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  a { color: inherit; text-decoration: none; }

  .section {
    padding: 100px 0;
    max-width: 1100px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-label::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: var(--green);
  }

  .section-title {
    font-family: var(--display);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    color: var(--text);
    line-height: 1.1;
    margin-bottom: 48px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 var(--green-glow); }
    50% { box-shadow: 0 0 0 8px rgba(0,255,136,0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  .fade-up { animation: fadeUp 0.6s ease forwards; }
`;

function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      dot.current.x += (pos.current.x - dot.current.x) * 0.12;
      dot.current.y += (pos.current.y - dot.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x - 20}px, ${dot.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const enter = () => dotRef.current?.classList.add("hovered");
    const leave = () => dotRef.current?.classList.remove("hovered");
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px;
          background: var(--green); border-radius: 50%; pointer-events: none;
          z-index: 9999; mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 40px; height: 40px;
          border: 1px solid rgba(0,255,136,0.4); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-ring.hovered {
          width: 60px; height: 60px; border-color: var(--green);
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={dotRef} className="cursor-ring" />
    </>
  );
}

function NoiseOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    }} />
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#about", label: "about" },
    { href: "#skills", label: "skills" },
    { href: "#projects", label: "projects" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 40px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(8,11,15,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 14px 40px;
        }
        .nav-logo {
          font-family: var(--display);
          font-size: 18px; font-weight: 800;
          color: var(--text);
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .nav-logo span { color: var(--green); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-family: var(--mono);
          font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-dim);
          transition: color 0.2s;
          position: relative;
        }
        .nav-links a::before { content: './'; color: var(--green); opacity: 0; transition: opacity 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a:hover::before, .nav-links a.active::before { opacity: 1; }
        .nav-links a.active { color: var(--text); }
        .nav-cta {
          padding: 8px 20px;
          border: 1px solid var(--green);
          color: var(--green);
          font-family: var(--mono);
          font-size: 11px; letter-spacing: 0.1em;
          background: transparent;
          cursor: none;
          transition: all 0.2s;
        }
        .nav-cta:hover { background: var(--green-dim); }
        .nav-hamburger {
          display: none;
          flex-direction: column; gap: 5px;
          background: none; border: none; cursor: none;
          padding: 4px;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--text); border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .mobile-menu {
          display: none;
          position: fixed; inset: 0; z-index: 99;
          background: rgba(8,11,15,0.97);
          backdrop-filter: blur(24px);
          flex-direction: column; align-items: center; justify-content: center;
          gap: 40px;
          animation: fadeUp 0.25s ease both;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: var(--display); font-size: 36px; font-weight: 800;
          color: var(--text-dim); letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .mobile-menu a:hover, .mobile-menu a.active { color: var(--green); }
        .mobile-menu-cta {
          margin-top: 8px; padding: 14px 40px;
          border: 1px solid var(--green); color: var(--green);
          font-family: var(--mono); font-size: 13px; letter-spacing: 0.1em;
          background: transparent;
        }
        @media (max-width: 768px) {
          .navbar { padding: 16px 20px; }
          .navbar.scrolled { padding: 12px 20px; }
          .nav-links, .nav-cta-wrap { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-logo" data-hover>
          <span>&lt;</span>MDL<span>/&gt;</span>
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-hover
                className={activeSection === l.href.slice(1) ? "active" : ""}
              >{l.label}</a>
            </li>
          ))}
        </ul>
        <span className="nav-cta-wrap">
          <a href="#contact" data-hover>
            <button className="nav-cta">hire me_</button>
          </a>
        </span>
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          data-hover
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={activeSection === l.href.slice(1) ? "active" : ""}
            onClick={() => setMenuOpen(false)}
            data-hover
          >{l.label}</a>
        ))}
        <a href="#contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)} data-hover>
          hire me_
        </a>
      </div>
    </>
  );
}

function TypeWriter({ text, speed = 60, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s infinite", color: "var(--green)" }}>█</span>
    </span>
  );
}

function Hero() {
  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 120px 40px 80px;
          max-width: 1100px; margin: 0 auto;
          position: relative;
        }
        .hero-pre {
          font-family: var(--mono); font-size: 13px;
          color: var(--green); letter-spacing: 0.15em;
          margin-bottom: 24px;
          animation: fadeUp 0.6s ease both;
        }
        .hero-name {
          font-family: var(--display);
          font-size: clamp(52px, 10vw, 110px);
          font-weight: 800; line-height: 0.92;
          color: var(--text);
          animation: fadeUp 0.6s 0.1s ease both;
          margin-bottom: 24px;
        }
        .hero-name .accent { color: var(--green); }
        .hero-tagline {
          font-family: var(--mono); font-size: clamp(14px, 2vw, 18px);
          color: var(--text-dim); max-width: 540px;
          line-height: 1.7;
          animation: fadeUp 0.6s 0.2s ease both;
          margin-bottom: 48px;
        }
        .hero-actions {
          display: flex; gap: 16px; flex-wrap: wrap;
          animation: fadeUp 0.6s 0.3s ease both;
        }
        .btn-primary {
          padding: 14px 32px;
          background: var(--green); color: var(--bg);
          font-family: var(--mono); font-size: 12px;
          letter-spacing: 0.1em; font-weight: 700;
          border: none; cursor: none;
          transition: all 0.2s;
          animation: pulse-glow 3s 2s infinite;
        }
        .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .btn-secondary {
          padding: 14px 32px;
          background: transparent; color: var(--text);
          font-family: var(--mono); font-size: 12px;
          letter-spacing: 0.1em;
          border: 1px solid var(--border2); cursor: none;
          transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: var(--green); color: var(--green); }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.04;
          background-image:
            linear-gradient(var(--green) 1px, transparent 1px),
            linear-gradient(90deg, var(--green) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          position: absolute; top: 20%; right: -10%;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-stats {
          display: flex; gap: 48px; margin-top: 64px;
          animation: fadeUp 0.6s 0.4s ease both;
        }
        .stat-num {
          font-family: var(--display); font-size: 36px; font-weight: 800;
          color: var(--green); line-height: 1;
        }
        .stat-label {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
          margin-top: 4px;
        }
        .scroll-hint {
          position: absolute; bottom: 40px; left: 40px;
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 12px;
          animation: fadeUp 0.6s 0.8s ease both;
        }
        .scroll-line {
          width: 40px; height: 1px; background: var(--text-muted);
          position: relative; overflow: hidden;
        }
        .scroll-line::after {
          content: ''; position: absolute; inset: 0;
          background: var(--green);
          animation: scanline 2s infinite;
        }
        @media (max-width: 768px) {
          .hero { padding: 100px 20px 60px; }
          .hero-stats { gap: 24px; }
          .scroll-hint { display: none; }
        }
      `}</style>
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-pre">// fullstack developer</div>
        <h1 className="hero-name">
          Max <span className="accent">De</span><br />Luna<span className="accent">.</span>
        </h1>
        <p className="hero-tagline">
          <TypeWriter text="Creando soluciones web modernas y escalables." speed={45} delay={600} />
        </p>
        <div className="hero-actions">
          <a href="#projects" data-hover>
            <button className="btn-primary">ver proyectos →</button>
          </a>
          <a href="#contact" data-hover>
            <button className="btn-secondary">contactar</button>
          </a>
        </div>
        <div className="hero-stats">
          {[
            { n: "3+", l: "años exp." },
            { n: "5+", l: "proyectos" },
            { n: "5+", l: "clientes" },
          ].map((s) => (
            <div key={s.l}>
              <div className="stat-num">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          scroll
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <style>{`
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: start;
        }
        .about-text p {
          font-size: 14px; line-height: 2;
          color: var(--text-dim); margin-bottom: 20px;
        }
        .about-text p strong { color: var(--green); font-weight: 400; }
        .about-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 32px;
          position: relative;
        }
        .about-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--green), transparent);
        }
        .about-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0; border-bottom: 1px solid var(--border);
          font-size: 12px;
        }
        .about-item:last-child { border-bottom: none; }
        .about-item-key { color: var(--text-muted); letter-spacing: 0.08em; }
        .about-item-val { color: var(--text); text-align: right; }
        .about-item-val.green { color: var(--green); }
        .available-dot {
          display: inline-block; width: 8px; height: 8px;
          border-radius: 50%; background: var(--green);
          margin-right: 8px; animation: pulse-glow 2s infinite;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
      <section className="section" id="about">
        <div className="section-label">01. about</div>
        <h2 className="section-title">Quién soy</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Soy <strong>Max De Luna</strong>, desarrollador fullstack con más de 3 años construyendo
              aplicaciones web de alto rendimiento. Me especializo en arquitecturas
              escalables que conectan experiencias de usuario fluidas con backends sólidos.
            </p>
            <p>
              Mi stack principal gira alrededor de <strong>React, Node.js y TypeScript</strong>,
              aunque me siento igual de cómodo diseñando esquemas de base de datos
              o configurando pipelines de CI/CD en <strong>AWS</strong>.
            </p>
            <p>
              Creo que el buen código es código que otros pueden entender, mantener y escalar.
              No solo código que funciona.
            </p>
          </div>
          <div className="about-card">
            {[
              { k: "ubicación", v: "México 🇲🇽" },
              { k: "experiencia", v: "3+ años" },
              { k: "especialidad", v: "Fullstack Dev" },
              { k: "foco actual", v: "SaaS & APIs REST" },
              { k: "idiomas", v: "ES / EN" },
              { k: "disponibilidad", v: <><span className="available-dot" />disponible</>, green: true },
            ].map((item) => (
              <div className="about-item" key={item.k}>
                <span className="about-item-key">{item.k}</span>
                <span className={`about-item-val${item.green ? " green" : ""}`}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SkillBar({ name, level, index }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: 28, animationDelay: `${index * 0.08}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)" }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "var(--border)", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${width}%`, background: "var(--green)",
          transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 0 8px var(--green-glow)",
        }} />
      </div>
    </div>
  );
}

function Skills() {
  const techBadges = [
    "React", "Next.js", "TypeScript", "Node.js", "Express",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Python",
    "Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform",
    "REST APIs", "GraphQL", "WebSockets", "JWT", "OAuth2",
  ];

  return (
    <>
      <style>{`
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .tech-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
        .badge {
          padding: 6px 14px;
          border: 1px solid var(--border);
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 0.05em;
          transition: all 0.2s; cursor: default;
        }
        .badge:hover { border-color: var(--green); color: var(--green); background: var(--green-dim); }
        .skills-label {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.12em;
          text-transform: uppercase; margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
      <section className="section" id="skills" style={{ background: "transparent" }}>
        <div className="section-label">02. skills</div>
        <h2 className="section-title">Stack técnico</h2>
        <div className="skills-grid">
          <div>
            <div className="skills-label">// proficiency</div>
            {DATA.skills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
            ))}
          </div>
          <div>
            <div className="skills-label">// tecnologías</div>
            <div className="tech-badges">
              {techBadges.map((t) => (
                <span key={t} className="badge" data-hover>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// PROJECTS
// ============================================================
function ProjectCard({ project, featured }) {
  const badgeColor =
    project.badge === "En desarrollo"
      ? { bg: "rgba(88,166,255,0.1)", border: "#58a6ff", color: "#58a6ff" }
      : project.badge === "Open Source"
      ? { bg: "rgba(212,160,23,0.1)", border: "#d4a017", color: "#d4a017" }
      : { bg: "rgba(0,255,136,0.1)", border: "var(--green)", color: "var(--green)" };

  return (
    <>
      <style>{`
        .project-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 36px;
          position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: none; display: flex; flex-direction: column;
        }
        .project-card:hover { border-color: var(--green); transform: translateY(-4px); }
        .project-card::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--green), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .project-card:hover::after { opacity: 1; }
        .project-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 16px; gap: 12px;
        }
        .project-num {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
        }
        .project-badge {
          padding: 4px 10px; font-family: var(--mono);
          font-size: 10px; letter-spacing: 0.08em;
          border: 1px solid; white-space: nowrap; flex-shrink: 0;
        }
        .project-title {
          font-family: var(--display); font-weight: 700;
          font-size: 22px;
          color: var(--text); margin-bottom: 6px;
          transition: color 0.2s;
        }
        .project-card:hover .project-title { color: var(--green); }
        .project-company {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); margin-bottom: 16px;
          letter-spacing: 0.06em;
        }
        .project-desc {
          font-family: var(--mono); font-size: 13px;
          color: var(--text-dim); line-height: 1.85;
          margin-bottom: 20px; flex: 1;
        }
        .project-impact {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; background: var(--green-dim);
          border-left: 2px solid var(--green);
          font-family: var(--mono); font-size: 12px;
          color: var(--green); margin-bottom: 20px;
          letter-spacing: 0.04em;
        }
        .project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .tech-tag {
          padding: 4px 10px;
          background: var(--bg3); border: 1px solid var(--border);
          font-family: var(--mono); font-size: 10px;
          color: var(--text-muted); letter-spacing: 0.05em;
        }
        .project-footer {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.08em;
          display: flex; align-items: center; gap: 8px;
          padding-top: 16px; border-top: 1px solid var(--border);
        }
        .project-link {
          color: var(--text-dim); transition: color 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .project-link:hover { color: var(--green); }
      `}</style>
      <div className="project-card" data-hover>
        <div className="project-header">
          <div className="project-num">
            {String(project.id).padStart(2, "0")} // {featured ? "featured" : "project"}
          </div>
          {project.badge && (
            <span
              className="project-badge"
              style={{ background: badgeColor.bg, borderColor: badgeColor.border, color: badgeColor.color }}
            >
              {project.badge === "En desarrollo" ? "⬤ en desarrollo" : project.badge === "Open Source" ? "⬤ open source" : "⬤ producción"}
            </span>
          )}
        </div>

        <h3 className="project-title">{project.title}</h3>

        {project.company && (
          <div className="project-company">// {project.company}</div>
        )}

        <p className="project-desc">{project.description}</p>

        {project.impact && (
          <div className="project-impact">
            ↑ {project.impact}
          </div>
        )}

        <div className="project-tech">
          {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
        </div>

        <div className="project-footer">
          {project.github
            ? <a href={project.github} className="project-link" data-hover target="_blank" rel="noopener noreferrer">⌥ github ↗</a>
            : <span>⌥ repo privado</span>
          }
          {project.demo
            ? <><span style={{color:"var(--border2)"}}>·</span><a href={project.demo} className="project-link" data-hover target="_blank" rel="noopener noreferrer">⌘ demo ↗</a></>
            : project.badge === "En desarrollo"
              ? <><span style={{color:"var(--border2)"}}>·</span><span>⌘ próximamente</span></>
              : null
          }
        </div>
      </div>
    </>
  );
}

function Projects() {
  return (
    <>
      <style>{`
        .projects-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
        .projects-note {
          margin-top: 32px; padding: 20px 24px;
          border: 1px solid var(--border); border-left: 2px solid var(--text-muted);
          font-family: var(--mono); font-size: 12px;
          color: var(--text-muted); line-height: 1.8;
          display: flex; align-items: center; gap: 16px;
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="section" id="projects">
        <div className="section-label">03. projects</div>
        <h2 className="section-title">Proyectos</h2>
        <div className="projects-grid">
          {DATA.projects.map((p) => (
            <ProjectCard key={p.id} project={p} featured={true} />
          ))}
        </div>
        <div className="projects-note">
          <span style={{ color: "var(--text-muted)", fontSize: 18 }}>⌒</span>
          Proyectos desarrollados en entorno empresarial. Los repositorios son privados por política interna —
          disponibles para revisión bajo solicitud con NDA.
        </div>
      </section>
    </>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSent(true);
  };

  return (
    <>
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .contact-info p {
          font-size: 14px; line-height: 2; color: var(--text-dim); margin-bottom: 32px;
        }
        .contact-links { display: flex; flex-direction: column; gap: 16px; }
        .contact-link {
          display: flex; align-items: center; gap: 16px;
          font-family: var(--mono); font-size: 13px;
          color: var(--text-dim); transition: color 0.2s;
          padding: 12px 0; border-bottom: 1px solid var(--border);
        }
        .contact-link:hover { color: var(--green); }
        .contact-link-icon { color: var(--green); width: 20px; text-align: center; }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block; font-family: var(--mono); font-size: 11px;
          color: var(--text-muted); letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .form-input, .form-textarea {
          width: 100%;
          background: var(--bg2); border: 1px solid var(--border);
          padding: 14px 16px;
          font-family: var(--mono); font-size: 13px;
          color: var(--text); outline: none;
          transition: border-color 0.2s;
          resize: none;
        }
        .form-input:focus, .form-textarea:focus { border-color: var(--green); }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); }
        .form-input.error, .form-textarea.error { border-color: #ff6b6b; }
        .form-error-msg { font-family: var(--mono); font-size: 10px; color: #ff6b6b; margin-top: 5px; letter-spacing: 0.05em; }
        .form-submit {
          width: 100%; padding: 16px;
          background: var(--green); color: var(--bg);
          font-family: var(--mono); font-size: 13px;
          letter-spacing: 0.1em; font-weight: 700;
          border: none; cursor: none; transition: all 0.2s;
          margin-top: 8px;
        }
        .form-submit:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .success-msg {
          padding: 24px; border: 1px solid var(--green);
          background: var(--green-dim); text-align: center;
          font-family: var(--mono); font-size: 13px; color: var(--green);
          line-height: 2;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
      <section className="section" id="contact">
        <div className="section-label">04. contact</div>
        <h2 className="section-title">Hablemos</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>
              ¿Tienes un proyecto en mente? ¿Buscas un desarrollador fullstack
              para tu equipo? Estoy disponible para proyectos freelance y
              oportunidades full-time.
            </p>
            <div className="contact-links">
              {[
                { icon: "✉", label: DATA.email, href: `mailto:${DATA.email}`, newTab: false },
                { icon: "⌥", label: "github.com/maxdeluna", href: DATA.github, newTab: true },
                { icon: "◎", label: "linkedin.com/in/maxdeluna", href: DATA.linkedin, newTab: true },
              ].map((l) => (
                <a key={l.label} href={l.href} className="contact-link" data-hover target={l.newTab ? "_blank" : undefined} rel={l.newTab ? "noopener noreferrer" : undefined}>
                  <span className="contact-link-icon">{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div className="success-msg">
                ✓ mensaje enviado<br />
                <span style={{ color: "var(--text-dim)", fontSize: 12 }}>
                  te respondo en menos de 24h
                </span>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">// nombre</label>
                  <input
                    className={`form-input${errors.name ? " error" : ""}`}
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((er) => ({ ...er, name: false })); }}
                  />
                  {errors.name && <div className="form-error-msg">// campo requerido</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">// email</label>
                  <input
                    className={`form-input${errors.email ? " error" : ""}`}
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((er) => ({ ...er, email: false })); }}
                  />
                  {errors.email && <div className="form-error-msg">// email inválido</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">// mensaje</label>
                  <textarea
                    className={`form-textarea${errors.message ? " error" : ""}`}
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors((er) => ({ ...er, message: false })); }}
                  />
                  {errors.message && <div className="form-error-msg">// campo requerido</div>}
                </div>
                <button className="form-submit" onClick={handleSubmit} data-hover>
                  enviar mensaje →
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "32px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      maxWidth: 1100, margin: "0 auto",
      fontFamily: "var(--mono)", fontSize: 11,
      color: "var(--text-muted)", letterSpacing: "0.08em",
    }}>
      <span>© {new Date().getFullYear()} Max De Luna</span>
      <span style={{ color: "var(--green)" }}>built with React + Vite</span>
      <span>hecho en México 🇲🇽</span>
    </footer>
  );
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .scroll-top {
          position: fixed; bottom: 32px; right: 32px; z-index: 200;
          width: 44px; height: 44px;
          border: 1px solid var(--border2);
          background: var(--bg2);
          color: var(--text-dim);
          font-family: var(--mono); font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: none;
          transition: all 0.3s ease;
          opacity: 0; transform: translateY(16px); pointer-events: none;
        }
        .scroll-top.visible {
          opacity: 1; transform: translateY(0); pointer-events: auto;
        }
        .scroll-top:hover {
          border-color: var(--green); color: var(--green);
          background: var(--green-dim);
        }
        @media (max-width: 768px) {
          .scroll-top { bottom: 20px; right: 20px; width: 38px; height: 38px; font-size: 14px; }
        }
      `}</style>
      <button
        className={`scroll-top ${visible ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        data-hover
      >
        ↑
      </button>
    </>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <NoiseOverlay />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <About />
        </div>
        <Skills />
        <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <Projects />
        </div>
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
