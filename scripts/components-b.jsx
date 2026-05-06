/* global React */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB, useMemo: useMemoB } = React;

function ProjectThumbnail({ project, width = 800, height = 500 }) {
  const html = useMemoB(
    () => window.makeProjectThumbnail(project, { width, height }),
    [project.id, width, height]
  );
  return <div className="thumb-svg" dangerouslySetInnerHTML={{ __html: html }} />;
}

function ProjectCard({ project, onOpen, idx, total }) {
  const ref = useRefB(null);
  const [tilt, setTilt] = useStateB({ x: 0, y: 0 });
  const [revealed, setRevealed] = useStateB(false);

  useEffectB(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setRevealed(true); }),
      { rootMargin: "-10% 0px -10% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: x * -6, y: y * 6 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  const span = ["span-6", "span-6", "span-4", "span-4", "span-4", "span-12"][idx % 6] || "span-6";
  const enter = revealed ? "translate3d(0,0,0) scale(1)" : "translate3d(0,80px,0) scale(0.96)";
  const opacity = revealed ? 1 : 0;

  return (
    <article
      ref={ref}
      className={`proj-card ${span}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => onOpen(project.id)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(project.id); } }}
      tabIndex={0}
      role="button"
      aria-expanded="false"
      aria-label={`Open project ${project.title}`}
      style={{
        transform: `${enter} perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        opacity,
        transition: revealed
          ? "transform .35s cubic-bezier(0.16,1,0.3,1), opacity .6s, box-shadow .5s, border-color .3s"
          : "transform .9s cubic-bezier(0.16,1,0.3,1), opacity .9s",
      }}
    >
      <div className="pc-thumb">
        <ProjectThumbnail project={project} width={800} height={500} />
        <span className="thumb-label">{project.category.split("·")[0].trim()}</span>
        <span className="thumb-status">{project.status.split("/")[0].trim()}</span>
        <div className="thumb-coords">
          <span>№ {project.number}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-meta-row">
          <span>{project.number} / {String(total).padStart(2, "0")}</span>
          <span>{project.slug}</span>
        </div>
        <h3 className="pc-title">{project.title}</h3>
        <p className="pc-sub">{project.claim}</p>
        <div className="pc-tags">
          {project.tags.slice(0, 4).map((t) => (
            <span className="pc-tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="pc-cta">
          Open Project <span className="arrow">→</span>
        </div>
      </div>
    </article>
  );
}

function DetailList({ items }) {
  return (
    <ul className="d-list">
      {items.map((it, i) => (
        <li key={i}><span className="d-list-num">{String(i + 1).padStart(2, "0")}</span><span>{it}</span></li>
      ))}
    </ul>
  );
}

function ProjectDetail({ project, onClose }) {
  const closeRef = useRefB(null);
  const cardRef = useRefB(null);

  useEffectB(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && cardRef.current) {
        const focusables = cardRef.current.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])");
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current && closeRef.current.focus(), 100);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;
  return (
    <div className={`detail-overlay ${project ? "open" : ""}`} onClick={onClose}>
      <div
        className="detail-card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail-close" ref={closeRef} onClick={onClose} aria-label="Detailkarte schließen">×</button>

        <div className="detail-thumb">
          <ProjectThumbnail project={project} width={900} height={700} />
          <div className="corner-meta">
            <span>№ {project.number} · {project.slug}</span>
            <span className="right">{project.year}</span>
          </div>
        </div>

        <div className="detail-body">
          <div className="d-meta">
            <span className="d-status">{project.status}</span>
            <span className="dot">·</span>
            <span>{project.category}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="d-sub">{project.claim}</p>
          <p className="d-detail">{project.description}</p>

          <div className="d-divider"></div>
          <div>
            <div className="d-section-label">Wie es funktioniert</div>
            <DetailList items={project.howItWorks} />
          </div>

          <div className="d-divider"></div>
          <div>
            <div className="d-section-label">Für wen es ist</div>
            <DetailList items={project.forWhom} />
          </div>

          <div className="d-divider"></div>
          <div>
            <div className="d-section-label">Was es kann</div>
            <div className="d-tags">
              {project.capabilities.map((t) => (<span className="pc-tag" key={t}>{t}</span>))}
            </div>
          </div>

          {project.aiLayer && project.aiLayer.length > 0 && (
            <>
              <div className="d-divider"></div>
              <div>
                <div className="d-section-label">AI Layer</div>
                <DetailList items={project.aiLayer} />
              </div>
            </>
          )}

          <div className="d-divider"></div>
          <div>
            <div className="d-section-label">Tags</div>
            <div className="d-tags">
              {project.tags.map((t) => (<span className="pc-tag" key={t}>{t}</span>))}
            </div>
          </div>

          <div className="d-divider"></div>
          <div>
            <div className="d-section-label">Open the card · Follow the system</div>
            <div className="d-links">
              {project.links.map((l, i) => (
                <a key={i} className="d-link" href={l.url} target="_blank" rel="noopener noreferrer">
                  <div className="d-link-meta">
                    <span className="d-link-type">{l.type}</span>
                    <span className="d-link-label">{l.label}</span>
                  </div>
                  <span className="d-link-arrow">↗</span>
                </a>
              ))}
            </div>
            <div className="label" style={{ marginTop: 14, color: "var(--color-muted)", fontSize: 10 }}>
              dyai · 2026 · projektartefakt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardsSection() {
  const projects = window.DYAI_PROJECTS || [];
  const [filter, setFilter] = useStateB("Alle");
  const [openId, setOpenId] = useStateB(null);

  // group by primary category word
  const cats = useMemoB(() => {
    const set = new Set(projects.map((p) => p.category.split("·")[0].trim()));
    return ["Alle", ...Array.from(set)];
  }, [projects]);

  const visible = filter === "Alle"
    ? projects
    : projects.filter((p) => p.category.split("·")[0].trim() === filter);
  const openProject = useMemoB(() => projects.find((p) => p.id === openId), [openId, projects]);

  return (
    <section className="projects" id="projects" data-screen-label="03 Projects">
      <div className="projects-bg-type" aria-hidden="true">
        <span>SYSTEMS</span>
        <span>ARTIFACTS</span>
        <span>FRONTIER</span>
      </div>
      <div className="projects-header">
        <div>
          <span className="label">§ 03 · Projects</span>
          <h2>Keine Theorie. <em>Lebende Systeme.</em></h2>
          <div className="micro">Open the card · Follow the repo · Read the system</div>
        </div>
        <p className="intro">
          DYAI baut konkrete Artefakte an der Grenze von Mensch und KI: Apps, APIs, Dashboards,
          semantische Speicher, Beziehungswerkzeuge und autonome Agenten-Meshes.
          Jede Karte öffnet ein Projekt, ein Repository oder ein lebendes System.
        </p>
      </div>

      <div className="projects-filter">
        <span className="label">Filter</span>
        {cats.map((c) => (
          <button
            key={c}
            className={`filter-chip ${filter === c ? "active" : ""}`}
            onClick={() => setFilter(c)}
          >{c}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "var(--color-muted)" }} className="label">
          {visible.length} / {projects.length}
        </span>
      </div>

      <div className="projects-grid">
        {visible.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            idx={i}
            total={visible.length}
            onOpen={(id) => setOpenId(id)}
          />
        ))}
      </div>

      {/* Project index */}
      <div className="projects-index">
        <div className="label">Projektindex</div>
        <ol>
          {projects.map((p) => (
            <li key={p.id}>
              <button className="index-row" onClick={() => setOpenId(p.id)}>
                <span className="ix-num">{p.number}</span>
                <span className="ix-title">{p.title}</span>
                <span className="ix-cat">{p.category.split("·")[0].trim()}</span>
                <span className="ix-arrow">→</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {openProject && <ProjectDetail project={openProject} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function Outro() {
  return (
    <footer className="outro" data-screen-label="04 Outro">
      <div>
        <span className="label">§ ∞ · Vision</span>
        <h3>KI nahtlos in deine Praxis. Du in vollem Bewusstsein.</h3>
      </div>
      <div>
        <p>
          Nicht ein Tool, das Aufgaben erledigt — eine Beziehung, in der Mensch und Maschine
          aus erweitertem Bewusstsein heraus gemeinsam denken, entscheiden und handeln.
        </p>
        <a className="btn-tech" href="mailto:hello@dyai.cloud" style={{ marginTop: 22 }}>
          <span className="dot"></span>
          Gespräch beginnen
        </a>
      </div>
      <div className="foot-meta" style={{ gridColumn: "1 / -1" }}>
        <span>DYAI · Design Your Augmented Intelligence</span>
        <span>2026 · v 0.4</span>
      </div>
    </footer>
  );
}

window.ProjectCardsSection = ProjectCardsSection;
window.Outro = Outro;
