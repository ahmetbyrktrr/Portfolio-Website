import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import {
  aboutCards,
  aboutImages,
  contactLinks,
  navLinks,
  projects,
  skills,
} from "./data/content";
import LazyImage from "./components/LazyImage";

const sectionIds = {
  home: "home",
  projects: "projects",
  skills: "skills",
  education: "education",
  about: "about",
  contact: "contact",
};

export default function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSkill, setActiveSkill] = useState(skills[0].id);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  const currentSkill = useMemo(
    () => skills.find((item) => item.id === activeSkill) ?? skills[0],
    [activeSkill],
  );

  
  const STICKY_OFFSET = 100;

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const headerHeight = headerRef.current.offsetHeight;
      setIsSticky(window.scrollY > headerHeight - STICKY_OFFSET);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setActiveProject((current) => (current + 1) % projects.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveProject((current) =>
          current === 0 ? projects.length - 1 : current - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const nextProject = () => {
    setActiveProject((current) => (current + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((current) =>
      current === 0 ? projects.length - 1 : current - 1,
    );
  };

  return (
    <div className="page-shell">
      <header className="hero" id={sectionIds.home} ref={headerRef}>
        <nav className={`topbar ${isSticky ? "topbar--sticky" : ""}`}>
          <button
            type="button"
            className="brand"
            onClick={() => scrollToSection(sectionIds.home)}
            aria-label="Go to home section"
          >
            <img src="/assets/images/logo.png" alt="Ahmet Bayraktar" />
          </button>

          <div className="topbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className="nav-button"
                onClick={() => scrollToSection(sectionIds[link.id])}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Hello there!
              <br />
              Ahmet Bayraktar
            </h1>
            <p className="eyebrow">Front-end Developer</p>
            <h2>I build simple, clean, and functional interfaces.</h2>
            <p>
              A developer blazing their own trail in the digital world. I welcome users on the bright side of front-end development and build systems in the depths of back-end development. I’m a solution-oriented tech enthusiast who learns something new with every line of code.
            </p>
            <button
              type="button"
              className="cta-button"
              onClick={() => scrollToSection(sectionIds.projects)}
            >
              Learn More ↓
            </button>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit" />
            <div className="hero-orbit2" />
            <img src="/assets/images/person.png" alt="Ahmet" />
          </div>
        </div>
      </header>

      <main>
        <section className="section section--muted" id={sectionIds.projects}>
          <div className="section-heading">
            <p className="eyebrow">My Projects</p>
            <h2>When I want it, I build it.</h2>
          </div>

          <div className="projects-slider">
            <button
              type="button"
              className="slider-button slider-button--left"
              onClick={prevProject}
              aria-label="Previous project"
            >
              ←
            </button>

            <div className="projects-track">
              <ProjectCard project={projects[activeProject]} />
            </div>

            <button
              type="button"
              className="slider-button slider-button--right"
              onClick={nextProject}
              aria-label="Next project"
            >
              →
            </button>
          </div>

          <div className="slider-dots" aria-label="Project slider pagination">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={index === activeProject ? "is-active" : ""}
                onClick={() => setActiveProject(index)}
                aria-label={`Show project ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="section" id={sectionIds.skills}>
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Interactive UI work backed by practical front-end habits.</h2>
          </div>

          <div className="skills-panel">
            <div className="skills-tab-list" role="tablist" aria-label="Skills">
              {skills.map((skill, index) => (
                <button
                  key={skill.id}
                  type="button"
                  className={`skills-tab ${skill.accent} ${
                    skill.id === activeSkill ? "skills-tab--active" : ""
                  }`}
                  onClick={() => setActiveSkill(skill.id)}
                  role="tab"
                  aria-selected={skill.id === activeSkill}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {skill.label}
                </button>
              ))}
            </div>

            <div className="skills-content" role="tabpanel">
              <h3>{currentSkill.title}</h3>
              <p>{currentSkill.text}</p>
            </div>
          </div>
        </section>

        <section className="section section--narrow" id={sectionIds.education}>
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Learning through study, repetition, and real interface work.</h2>
          </div>
          <p className="education-copy">
            I improve by rebuilding interfaces, practicing responsive design,
            and turning concepts into complete front-end experiences. Each
            project helps me strengthen both visual judgment and implementation
            discipline.
          </p>
        </section>

        <section className="section" id={sectionIds.about}>
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>
              I focus on building modern, responsive, and user-friendly web interfaces.
            </h2>
          </div>

          <div className="about-grid">
            <LazyImage src={aboutImages[0].src} alt={aboutImages[0].alt} wrapperClassName="about-image"/>

            <article className="about-card">
              <h3>{aboutCards[0].title}</h3>
              <p>{aboutCards[0].text}</p>
            </article>

            <article className="about-card">
              <h3>{aboutCards[1].title}</h3>
              <p>{aboutCards[1].text}</p>
            </article>

            <LazyImage src={aboutImages[1].src} alt={aboutImages[1].alt} wrapperClassName="about-image"/>

            <LazyImage src={aboutImages[2].src} alt={aboutImages[2].alt} wrapperClassName="about-image"/>

            <article className="about-card">
              <h3>{aboutCards[2].title}</h3>
              <p>{aboutCards[2].text}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer" id={sectionIds.contact}>
        <p className="eyebrow">Contact</p>
        <div className="footer-links">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
