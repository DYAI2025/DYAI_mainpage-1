// DYAI — Project data (real)
// New projects: append a Project object to PROJECTS array.

window.DYAI_PROJECTS = [
  {
    id: "p01",
    number: "01",
    slug: "bazodiac",
    title: "Bazodiac",
    category: "Fusion Astrology · Identity System",
    status: "Live / Product System",
    year: "2025",
    claim: "Ein kosmologisches Identitätsobjekt aus Western Astrology, BaZi, Wu-Xing und persönlichen Signalen.",
    description: "Bazodiac kombiniert westliche Astrologie, chinesische BaZi-Four-Pillars, Wu-Xing-Elementlogik und moderne Personality-Signale zu einem persönlichen Fusion Ring. Die App ist keine klassische Horoscope-App, sondern ein visuelles und semantisches Reflexionssystem. Der Ring wird aus mehreren Datenquellen berechnet, interpretiert und als lebendes Identitätsobjekt dargestellt.",
    howItWorks: [
      "Nutzer geben Geburtsdatum, Uhrzeit und Ort ein.",
      "Das System berechnet BaZi, Western Chart, Wu-Xing, Fusion und zeitbezogene Signale.",
      "Aus den Ergebnissen entsteht ein 12-Sektor-Fusion-Ring.",
      "KI erzeugt eine persönliche Interpretation.",
      "Ein Voice-Agent kann den Ring dialogisch erklären."
    ],
    forWhom: [
      "Menschen, die Astrologie als Reflexionssystem statt als banales Tageshoroskop nutzen.",
      "Spirituell-technische Zielgruppen im deutschsprachigen Markt.",
      "Creator, Coaches und Nutzer, die persönliche Muster visuell und semantisch erkunden wollen."
    ],
    capabilities: ["Western Astrology", "Chinese BaZi / Four Pillars", "Wu-Xing Elementlogik", "Fusion Ring", "Gemini Interpretation", "Supabase Persistenz", "Stripe Premium Flow", "ElevenLabs Voice Agent"],
    aiLayer: [
      "Gemini erzeugt personalisierte Interpretationen.",
      "ElevenLabs Voice Agent ermöglicht dialogische Deutung.",
      "Quiz- und Profilsignale können den Ring semantisch schärfen."
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/DYAI2025/Astro-Noctum.git", type: "repo" },
      { label: "Live Website", url: "https://bazodiac.space", type: "live" }
    ],
    tags: ["Fusion Ring", "BaZi", "Wu-Xing", "Gemini", "Voice Agent"],
    thumbnailCategory: "Bazodiac",
    thumbnailSeed: "bazodiac-fusion-ring"
  },
  {
    id: "p02",
    number: "02",
    slug: "fufire-api",
    title: "FuFirE API",
    category: "Deterministic Astrology Engine · API Layer",
    status: "API / Engine",
    year: "2025",
    claim: "Die Berechnungsmaschine hinter kosmologischen Produkten: deterministisch, testbar, API-first.",
    description: "FuFirE steht für Fusion Firmament Engine. Die API berechnet BaZi, Western Astrology, Wu-Xing, True Solar Time, Transits und Fusion-Signale. Sie ist als technische Infrastruktur gedacht: gleiche Eingabe, gleiches Ergebnis, saubere API-Endpunkte, validierbare Contracts und nutzbar als Backend für Produkte wie Bazodiac.",
    howItWorks: [
      "Ein Client sendet Datum, Uhrzeit, Zeitzone, Längen- und Breitengrad.",
      "Die API verarbeitet Zeitlogik, Solargrenzen und Standortdaten.",
      "BaZi-, Western- und Wu-Xing-Schichten werden berechnet.",
      "Fusion-Endpunkte übersetzen mehrere Systeme in gemeinsame Signale.",
      "Transit-Endpunkte liefern aktuelle oder vorausberechnete Planetendaten.",
      "Validation-Endpunkte prüfen Engine-Konfigurationen gegen definierte Contracts."
    ],
    forWhom: [
      "Astro-Produkte und Reflexionsapps.",
      "Research-Dashboards und Coaching-Systeme.",
      "Kalender-, Transit- oder Elementdaten-basierte Anwendungen.",
      "KI-Systeme, die strukturierte Berechnungsdaten für Interpretationen brauchen."
    ],
    capabilities: ["BaZi-Berechnung", "Western Chart", "Wu-Xing-Vektor", "Fusion-Analyse", "True Solar Time", "Live-Transits", "Transit Timeline", "OpenAPI Dokumentation", "Contract Validation"],
    aiLayer: [
      "Die API selbst ist deterministische Infrastruktur.",
      "KI-Systeme können die Outputs für Interpretationen, Tagesimpulse, Reports, Coaching-Fragen oder Visualisierungen nutzen.",
      "Mögliche weitere Nutzung: Kompatibilitäts-Engines, Kalenderimpulse, generative Reports, personalisierte Dashboards."
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/DYAI2025/FuFirE.git", type: "repo" },
      { label: "API Docs", url: "https://bafe-production.up.railway.app/docs#/", type: "docs" }
    ],
    tags: ["API", "BaZi", "Ephemeris", "OpenAPI", "Transits"],
    thumbnailCategory: "FuFirE",
    thumbnailSeed: "fufire-orbital-engine"
  },
  {
    id: "p03",
    number: "03",
    slug: "whats-in-it",
    title: "What's in it?",
    category: "Repository Understanding · Developer Clarity Tool",
    status: "Product Tool",
    year: "2025",
    claim: "GitHub-Projekte in Sekunden verstehen: Nutzen, Zielgruppe, Startpunkt.",
    description: "What's in it? macht aus einem GitHub-Link eine klare Entscheidungshilfe. Das Tool liest Repository-Daten und README-Kontext aus und übersetzt sie in eine verständliche Analyse: Was bringt das Projekt, für wen ist es sinnvoll und wie startet man damit?",
    howItWorks: [
      "Nutzer fügen eine GitHub-URL ein.",
      "Das System parsed die URL.",
      "Metadaten und README werden abgerufen.",
      "Ein Cache verhindert doppelte KI-Kosten und beschleunigt Folgeaufrufe.",
      "Ein LLM erzeugt eine strukturierte Einschätzung.",
      "Die UI zeigt Nutzen, Kategorie, Startpunkte und Empfehlungen."
    ],
    forWhom: [
      "Entwickler, die Open-Source-Repositories schnell einschätzen wollen.",
      "Founder und Produktteams, die Tools vor einer Integration bewerten.",
      "AI-Agenten, die Repository-Kontext in menschenlesbare Entscheidungen übersetzen müssen."
    ],
    capabilities: ["GitHub-URL-Parsing", "README-Analyse", "Metadatenanalyse", "24h Cache", "Gemini-Auswertung", "Installationshinweise", "Nutzungsempfehlungen"],
    aiLayer: [
      "Gemini analysiert Repository-Daten und strukturiert sie in eine Entscheidungshilfe.",
      "Das Tool kann als Repo-Understanding-Layer für Agenten dienen."
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/DYAI2025/Whats-init-GitHub-verstehen.git", type: "repo" }
    ],
    tags: ["GitHub", "Repo Analysis", "Gemini", "Cache", "Developer Tool"],
    thumbnailCategory: "WhatsInIt",
    thumbnailSeed: "repo-lens-clarity"
  },
  {
    id: "p04",
    number: "04",
    slug: "whatsorga",
    title: "WhatsOrga",
    category: "Semantic WhatsApp Organization · Memory System",
    status: "Dashboard / Analysis System",
    year: "2025",
    claim: "Aus Chatverlauf wird Organisationsgedächtnis: Nachrichten, Marker, Termine und Kontext.",
    description: "WhatsOrga analysiert WhatsApp-Nachrichten aus whitelisted Chats und macht daraus strukturierte, erinnerbare Information. Eine Chrome Extension erfasst Nachrichten aus WhatsApp Web. Ein FastAPI-Backend analysiert Sentiment, Marker, Threads und Termine. EverMemOS sorgt für semantisches Langzeitgedächtnis.",
    howItWorks: [
      "Eine Chrome Extension beobachtet WhatsApp Web für whitelisted Chats.",
      "Neue Nachrichten und optional Audio werden an das Backend gesendet.",
      "FastAPI speichert Rohdaten in PostgreSQL.",
      "Die Analyse-Pipeline berechnet Sentiment, Marker und semantische Threads.",
      "EverMemOS merkt sich Personen, Fakten, Episoden und Kontext.",
      "Termine werden kontextsensitiv erkannt und via CalDAV in Apple Calendar synchronisiert.",
      "Ein Dashboard zeigt Übersicht, Drift, Marker, Threads, Termine und Suche."
    ],
    forWhom: [
      "Familien, Paare, Teams und Pflegekontexte.",
      "Projekt- oder Organisationskontexte mit vielen impliziten Absprachen.",
      "Menschen, die WhatsApp-Kommunikation nicht verlieren, sondern strukturieren wollen.",
      "AI-Organisationstools, die echte semantische Erinnerung brauchen."
    ],
    capabilities: ["WhatsApp-Web-Erfassung", "Whitelist-Schutz", "Audio-Transkription", "Sentiment-Analyse", "Marker-Erkennung", "RAG mit ChromaDB", "EverMemOS Semantic Memory", "Kontextsensitive Terminextraktion", "Apple Calendar Sync", "Dashboard"],
    aiLayer: [
      "LLM- und Embedding-Systeme analysieren Nachrichten, Audio und Kontext.",
      "EverMemOS ermöglicht semantisches Langzeitgedächtnis.",
      "Das System kann implizite Bezüge auflösen, z. B. Pronomen, wiederkehrende Termine oder geteilte Familieninformationen."
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/DYAI2025/Whatsorga.git", type: "repo" },
      { label: "Dashboard", url: "https://whatsorga.dyai.cloud/dashboard", type: "dashboard" }
    ],
    tags: ["WhatsApp", "EverMemOS", "Semantic Memory", "FastAPI", "Calendar Sync"],
    thumbnailCategory: "WhatsOrga",
    thumbnailSeed: "semantic-chat-graph"
  },
  {
    id: "p05",
    number: "05",
    slug: "coupletime",
    title: "CoupleTime",
    category: "Relationship Ritual Tool · Structured Dialogue",
    status: "Web App / AI Integration WIP",
    year: "2025",
    claim: "Ein neutraler Timer für echte Zwiegespräche: nicht schneller reden, sondern besser zuhören.",
    description: "CoupleTime ist eine Web-App für strukturierte Partnergespräche nach der Möller-Methode. Die App führt Paare durch vorbereitete Gesprächsphasen, gerechte Redezeiten, Pausen, Abschluss und Cooldown. Sie ist die neutrale dritte Instanz im Raum. Dadurch müssen Paare nicht über Timer, Fairness oder Ablauf verhandeln, sondern können im Gespräch bleiben.",
    howItWorks: [
      "Paare wählen einen Modus: Maintain, Commitment, Listening oder Custom.",
      "Die Session startet mit Vorbereitung.",
      "Partner A spricht, Partner B hört zu.",
      "Partner B spricht, Partner A hört zu.",
      "Transition-, Closing- und Cooldown-Phasen stabilisieren die Methode.",
      "Klangsignale markieren Phasenwechsel ohne harte Unterbrechung.",
      "Guidance-Tipps helfen je nach Erfahrungslevel."
    ],
    forWhom: [
      "Paare, die regelmäßige Beziehungspflege praktizieren wollen.",
      "Paare in angespannten Phasen, die faire Kommunikationsräume brauchen.",
      "Coaching-, Therapie- oder Selbsthilfe-Kontexte."
    ],
    capabilities: ["Preset-Modi", "Custom Mode", "Strikte Phasenlogik", "Drift-korrigierter Timer", "Web-Audio-Klangsignale", "Guidance-Level", "DE/EN Internationalisierung", "Onboarding", "Offline-Fähigkeit", "LocalStorage", "React, TypeScript, Vite, Tailwind, Framer Motion"],
    aiLayer: [
      "Die KI-Integration ist Work in Progress.",
      "KI soll die Methode nicht stören, sondern Vorbereitung und Reflexion unterstützen.",
      "Mögliche Erweiterung: persönliche Einstimmungsfragen vor der Session.",
      "Mögliche Erweiterung: freiwillige Session-Reflection nach dem Cooldown.",
      "Mögliche Erweiterung: Muster über Zeit, Beziehungshygiene-Hinweise und personalisierte Guidance.",
      "Keine Live-Intervention in die Redezeit ohne ausdrückliche Nutzerentscheidung."
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/DYAI2025/CoupleTime", type: "repo" }
    ],
    tags: ["Zwiegespräch", "Timer", "Relationship UX", "Offline", "AI WIP"],
    thumbnailCategory: "CoupleTime",
    thumbnailSeed: "two-circles-dialogue"
  },
  {
    id: "p06",
    number: "06",
    slug: "augmented-ops",
    title: "Augmented_Ops.INC",
    category: "Autonomous Service Agency Mesh · Holding System",
    status: "Agency Ecosystem / Multi-Repo System",
    year: "2025",
    claim: "Eine Holding für AI-Agenten-Agenturen: VSA, CSA, MSA, RSA und gemeinsame Human-Gate-Infrastruktur.",
    description: "Augmented_Ops ist das Organisationsmodell für autonome Service-Agenturen. Spezialisierte Agenten-Meshes übernehmen operative Arbeit, während kritische Entscheidungen und Freigaben durch Human-in-the-loop-Gates laufen. Die Holding bündelt Sub-Agencies für Support, Marketing, Investor-Decks und Recruiting.",
    howItWorks: [
      "Jede Sub-Agency hat ein eigenes spezialisiertes Agenten-Mesh.",
      "VSA baut Investor-Decks und Fundraising-Artefakte.",
      "CSA automatisiert Customer Support mit Triage, Resolver, Voice, Knowledge und Escalation.",
      "MSA baut Marketing-Kampagnen mit Strategie, Copywriting, Media Buying und Analyse.",
      "RSA ist für Recruiting, Screening, Matching und Interview-Automatisierung vorgesehen.",
      "Human Gates prüfen Strategie, sensible Entscheidungen, Compliance und Veröffentlichung.",
      "Die Holding koordiniert Infrastruktur, Skills Layer, Memory, Strategie und Cross-Sell."
    ],
    forWhom: [
      "Unternehmen und Operator, die AI-Agenten als echte operative Einheiten einsetzen wollen.",
      "Startups, Support-Teams, Marketing-Teams und Recruiting-Kontexte mit wiederholbaren Workflows.",
      "Organisationen, die menschliche Kontrolle an sensiblen Gates behalten wollen."
    ],
    capabilities: ["Agent Mesh", "Human Gate", "Investor Deck Production", "Customer Support Automation", "Marketing Campaign Automation", "Recruiting Workflows", "Shared Infrastructure", "Skills Layer", "Memory Layer"],
    aiLayer: [
      "Autonome Agenten-Meshes übernehmen operative Teilschritte.",
      "Human-in-the-loop bleibt verpflichtend an sensiblen Freigabepunkten.",
      "Das System ist als erweiterbares Portfolio von Sub-Agencies gedacht."
    ],
    links: [
      { label: "Augmented_Ops Repository", url: "https://github.com/DYAI2025/Augmented_ops.INC", type: "repo" },
      { label: "CSA Repository", url: "https://github.com/DYAI2025/CSA.git", type: "subrepo" },
      { label: "MSA Repository", url: "https://github.com/DYAI2025/MSA.git", type: "subrepo" },
      { label: "VSA Repository", url: "https://github.com/DYAI2025/VSA.git", type: "subrepo" },
      { label: "RSA Repository", url: "https://github.com/DYAI2025/RSA.git", type: "subrepo" }
    ],
    tags: ["Agent Mesh", "Human Gate", "VSA", "CSA", "MSA", "RSA"],
    thumbnailCategory: "AugmentedOps",
    thumbnailSeed: "four-agency-mesh"
  }
];
