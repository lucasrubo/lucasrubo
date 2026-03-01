// ─── Locale type ─────────────────────────────────────────────────────────────

export type Locale = "en" | "ptBR";

// ─── Bio segment interface ────────────────────────────────────────────────────
// Split at inline <span> highlight boundaries so the component can inject
// styled spans without dangerouslySetInnerHTML.

export interface BioSegments {
  part1: string;  // "Computer Science graduate… Currently at "
  areco: string;  // highlighted: "Areco"
  part2: string;  // " building complementary systems with "
  csharp: string; // highlighted: "C# + Blazor"
  part3: string;  // " and "
  nextjs: string; // highlighted: "Next.js"
  part4: string;  // ", integrating with…"
}

// ─── Translations interface ───────────────────────────────────────────────────

export interface Translations {
  // MenuBar
  menuBar: {
    hireMe: string;
    langLabel: string;
  };

  // AppWindow toolbar
  appWindow: {
    getStarted: string;
  };

  // Desktop context menu
  desktop: {
    sortIcons: string;
    toggleTheme: string;
    hireMe: string;
  };

  // AboutApp
  about: {
    role: string;
    sectionAbout: string;
    bio: BioSegments;
    bioTags: string[];
    sectionExplore: string;
    exploreItems: [
      { label: string; desc: string },  // projects
      { label: string; desc: string },  // skills
      { label: string; desc: string },  // experience
      { label: string; desc: string },  // contact
    ];
    hireMe: string;
  };

  // SkillsApp
  skills: {
    title: string;
    subtitle: string;
    categories: { frontend: string; backendDb: string; tools: string };
    certTitle: string;
    certBody: string;
    certPlatform1: string;  // "desenvolvedor.io"
    certAnd: string;        // "and" | "e"
    certPlatform2: string;  // "Udemy"
  };

  // ExperienceApp — only prose descriptions; static data (role/company/tech) stays in component
  experience: {
    title: string;
    subtitle: string;
    sectionWork: string;
    sectionEducation: string;
    jobs: [
      { description: string },  
      { description: string },  // Junior Developer
      { description: string },  // Systems Developer Intern
      { description: string },  // Programming Assistant
    ];
    education: [
      { description: string },  // Bachelor's
      { description: string },  // Technical Course
    ];
  };

  // ContactApp
  contact: {
    title: string;
    subtitle: string;
    sectionReachOut: string;
    sectionSocial: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
    };
    success: {
      title: string;
      body: string;
      sendAnother: string;
    };
  };

  // RoteirumApp
  roteirum: {
    tagline: string;
    description: string;
    liveDemo: string;
    sourceCode: string;
    sectionFeatures: string;
    sectionStack: string;
    features: [
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
    ];
  };

  // ERPApp
  erp: {
    tagline: string;
    description: string;
    liveDemo: string;
    sourceCode: string;
    sectionFeatures: string;
    sectionStack: string;
    features: [
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
      { title: string; desc: string },
    ];
  };

  // ProjectsApp
  projects: {
    title: string;
    subtitleWork: string;
    projectsCount: string;
    featured: string;
    code: string;
    liveDemo: string;
    moreOnGithub: string;
    items: [
      { description: string },   // Roteirum
      { description: string },   // ERP Multi-Empresa
      { description: string },   // Larissa Arendt
    ];
  };

  // CoursesApp
  courses: {
    title: string;
    of: string;
    certificates: string;
    all: string;
    types: {
      "Web Development": string;
      "Database": string;
      "Architecture": string;
      "Best Practices": string;
      "Programming": string;
      "DevOps": string;
    };
  };
}

// ─── English ──────────────────────────────────────────────────────────────────

const en: Translations = {
  menuBar: {
    hireMe: "Contact",
    langLabel: "Switch language",
  },

  appWindow: {
    getStarted: "Talk to Aprix",
  },

  desktop: {
    sortIcons: "Sort Icons",
    toggleTheme: "Toggle Theme",
    hireMe: "Contact →",
  },

  about: {
    role: "Web Developer · Mid-level Development Analyst @ Areco",
    sectionAbout: "About",
    bio: {
      part1: "Computer Science graduate specializing in front-end development. Currently at ",
      areco: "Areco",
      part2: " building complementary systems with ",
      csharp: "C# + Blazor",
      part3: " and ",
      nextjs: "Next.js",
      part4: ", integrating with Delphi, PHP, and SQL environments. Passionate about creating intuitive, responsive interfaces with modern frameworks.",
    },
    bioTags: ["Next.js", "React", "TypeScript", "Blazor", "C#", "Tailwind CSS", "SQL"],
    sectionExplore: "Explore",
    exploreItems: [
      { label: "Projects",   desc: "3 featured"  },
      { label: "Skills",     desc: "10+ techs"   },
      { label: "Experience", desc: "5 years"     },
      { label: "Contact",    desc: "Let's talk"  },
    ],
    hireMe: "Contact →",
  },

  skills: {
    title: "Skills",
    subtitle: "Technologies and tools I work with daily",
    categories: {
      frontend:  "Frontend",
      backendDb: "Backend & DB",
      tools:     "Tools & Practices",
    },
    certTitle: "22 Certifications",
    certBody: "ASP.NET Core, Entity Framework, Blazor, Clean Code, Software Architecture, REST APIs, DevOps (CI/CD), JavaScript, Python — from",
    certPlatform1: "desenvolvedor.io",
    certAnd: "and",
    certPlatform2: "Udemy",
  },

  experience: {
    title: "Experience",
    subtitle: "5 years of professional development",
    sectionWork: "Work",
    sectionEducation: "Education",
    jobs: [
      { description: "Developing complementary systems using C# with Blazor and Next.js, integrating with Delphi, PHP, and SQL legacy environments. Leading front-end modernization initiatives." },
      { description: "PHP systems development, database architecture and maintenance, and internal tooling to support operations teams." },
      { description: "CI/CD pipeline implementation and test automation. Collaborated on enterprise-scale software delivery workflows." },
      { description: "Web system creation and PHP development. Owned full feature delivery cycles from design to deploy." },
    ],
    education: [
      { description: "Software engineering, algorithms, data structures, OOP." },
      { description: "Web development, systems maintenance, networking basics." },
    ],
  },

  contact: {
    title: "Contact",
    subtitle: "Let's build something together",
    sectionReachOut: "Reach out",
    sectionSocial: "Social",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "How can I help?",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      submit: "Send message",
    },
    success: {
      title: "Message sent!",
      body: "I'll get back to you soon.",
      sendAnother: "Send another",
    },
  },

  roteirum: {
    tagline: "Social network for cinematic creation with AI",
    description: "Innovative platform where creators build synopses, generate AI-powered posters and images for film and TV projects. Think Instagram meets screenplay writing.",
    liveDemo: "Live demo",
    sourceCode: "Source code",
    sectionFeatures: "Features",
    sectionStack: "Stack",
    features: [
      { title: "AI Image Generation", desc: "Generate posters and scene images using AI prompts" },
      { title: "Synopsis Builder",    desc: "Structured screenplay writing with act breakdown" },
      { title: "Social Feed",         desc: "Discover and follow other creators' projects" },
      { title: "Project Management",  desc: "Organize scripts, notes and assets by project" },
    ],
  },

  erp: {
    tagline: "Modern multi-company ERP system",
    description: "Responsive administrative dashboard with order creation, sales management, multi-company support and role-based access control.",
    liveDemo: "Live demo",
    sourceCode: "Source code",
    sectionFeatures: "Features",
    sectionStack: "Stack",
    features: [
      { title: "Multi-company",    desc: "Manage multiple companies from a single dashboard" },
      { title: "Order Management", desc: "Create, track and fulfill orders end-to-end" },
      { title: "Sales Dashboard",  desc: "Real-time KPIs and sales analytics" },
      { title: "Access Control",   desc: "Role-based permissions per company and user" },
    ],
  },

  projects: {
    title: "Projects",
    subtitleWork: "Featured work",
    projectsCount: "projects",
    featured: "Featured",
    code: "Code",
    liveDemo: "Live demo",
    moreOnGithub: "More projects on GitHub",
    items: [
      { description: "Innovative social network for cinematic creation with AI. Create synopses, posters and images with artificial intelligence, compete in rankings and earn recognition." },
      { description: "Modern responsive admin dashboard with order creation, sales management and multi-company support. Full CRUD with role-based access control." },
      { description: "Modern and elegant personal portfolio built for a client. Refined typography, smooth animations and fully responsive design." },
    ],
  },

  courses: {
    title: "Courses & Certificates",
    of: "of",
    certificates: "certificates",
    all: "All",
    types: {
      "Web Development": "Web Development",
      "Database":        "Database",
      "Architecture":    "Architecture",
      "Best Practices":  "Best Practices",
      "Programming":     "Programming",
      "DevOps":          "DevOps",
    },
  },
};

// ─── Portuguese (Brazil) ─────────────────────────────────────────────────────

const ptBR: Translations = {
  menuBar: {
    hireMe: "Contato",
    langLabel: "Mudar idioma",
  },

  appWindow: {
    getStarted: "Fale com Aprix",
  },

  desktop: {
    sortIcons: "Organizar Ícones",
    toggleTheme: "Alternar Tema",
    hireMe: "Contato →",
  },

  about: {
    role: "Desenvolvedor Web · Analista de Desenvolvimento Pleno @ Areco",
    sectionAbout: "Sobre",
    bio: {
      part1: "Formado em Ciência da Computação com foco em desenvolvimento front-end. Atualmente na ",
      areco: "Areco",
      part2: " desenvolvendo sistemas complementares com ",
      csharp: "C# + Blazor",
      part3: " e ",
      nextjs: "Next.js",
      part4: ", integrando com ambientes legados em Delphi, PHP e SQL. Apaixonado por criar interfaces intuitivas e responsivas com frameworks modernos.",
    },
    bioTags: ["Next.js", "React", "TypeScript", "Blazor", "C#", "Tailwind CSS", "SQL"],
    sectionExplore: "Explorar",
    exploreItems: [
      { label: "Projetos",    desc: "3 em destaque"   },
      { label: "Habilidades", desc: "10+ tecnologias" },
      { label: "Experiência", desc: "5 anos"          },
      { label: "Contato",     desc: "Vamos conversar" },
    ],
    hireMe: "Contato →",
  },

  skills: {
    title: "Habilidades",
    subtitle: "Tecnologias e ferramentas que uso no dia a dia",
    categories: {
      frontend:  "Frontend",
      backendDb: "Backend & DB",
      tools:     "Ferramentas & Práticas",
    },
    certTitle: "22 Certificações",
    certBody: "ASP.NET Core, Entity Framework, Blazor, Clean Code, Arquitetura de Software, APIs REST, DevOps (CI/CD), JavaScript, Python — pela",
    certPlatform1: "desenvolvedor.io",
    certAnd: "e",
    certPlatform2: "Udemy",
  },

  experience: {
    title: "Experiência",
    subtitle: "5 anos de desenvolvimento profissional",
    sectionWork: "Trabalho",
    sectionEducation: "Educação",
    jobs: [
      { description: "Desenvolvimento de sistemas complementares usando C# com Blazor e Next.js, integrando com ambientes legados em Delphi, PHP e SQL. Liderança de iniciativas de modernização front-end." },
      { description: "Desenvolvimento de sistemas em PHP, arquitetura e manutenção de banco de dados, e ferramentas internas para equipes de operações." },
      { description: "Implementação de pipelines CI/CD e automação de testes. Colaboração em fluxos de entrega de software em escala empresarial." },
      { description: "Criação de sistemas web e desenvolvimento em PHP. Responsável por ciclos completos de entrega de funcionalidades, do design ao deploy." },
    ],
    education: [
      { description: "Engenharia de software, algoritmos, estruturas de dados, POO." },
      { description: "Desenvolvimento web, manutenção de sistemas, fundamentos de redes." },
    ],
  },

  contact: {
    title: "Contato",
    subtitle: "Vamos construir algo juntos",
    sectionReachOut: "Fale comigo",
    sectionSocial: "Social",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail",
      emailPlaceholder: "voce@empresa.com",
      subjectLabel: "Assunto",
      subjectPlaceholder: "Como posso ajudar?",
      messageLabel: "Mensagem",
      messagePlaceholder: "Me conte sobre seu projeto...",
      submit: "Enviar mensagem",
    },
    success: {
      title: "Mensagem enviada!",
      body: "Retorno em breve.",
      sendAnother: "Enviar outra",
    },
  },

  roteirum: {
    tagline: "Rede social para criação cinematográfica com IA",
    description: "Plataforma inovadora onde criadores constroem sinopses, geram pôsteres e imagens com IA para projetos de cinema e TV. Pense no Instagram combinado com escrita de roteiros.",
    liveDemo: "Demo ao vivo",
    sourceCode: "Código-fonte",
    sectionFeatures: "Funcionalidades",
    sectionStack: "Stack",
    features: [
      { title: "Geração de Imagens com IA", desc: "Gere pôsteres e imagens de cenas com prompts de IA" },
      { title: "Construtor de Sinopse",     desc: "Escrita estruturada de roteiro com divisão por ato" },
      { title: "Feed Social",               desc: "Descubra e siga projetos de outros criadores" },
      { title: "Gerenciamento de Projetos", desc: "Organize roteiros, notas e assets por projeto" },
    ],
  },

  erp: {
    tagline: "Sistema ERP multi-empresa moderno",
    description: "Dashboard administrativo responsivo com criação de pedidos, gestão de vendas, suporte multi-empresa e controle de acesso baseado em perfis.",
    liveDemo: "Demo ao vivo",
    sourceCode: "Código-fonte",
    sectionFeatures: "Funcionalidades",
    sectionStack: "Stack",
    features: [
      { title: "Multi-empresa",       desc: "Gerencie múltiplas empresas em um único dashboard" },
      { title: "Gestão de Pedidos",   desc: "Crie, acompanhe e finalize pedidos do início ao fim" },
      { title: "Dashboard de Vendas", desc: "KPIs em tempo real e análise de vendas" },
      { title: "Controle de Acesso",  desc: "Permissões por perfil por empresa e usuário" },
    ],
  },

  projects: {
    title: "Projetos",
    subtitleWork: "Trabalho em destaque",
    projectsCount: "projetos",
    featured: "Destaque",
    code: "Código",
    liveDemo: "Demo ao vivo",
    moreOnGithub: "Mais projetos no GitHub",
    items: [
      { description: "Rede social inovadora para criação cinematográfica com IA. Crie sinopses, cartazes e imagens com inteligência artificial, compita no ranking e ganhe reconhecimento." },
      { description: "Dashboard administrativo moderno e responsivo com criação de pedidos, gestão de vendas e suporte multi-empresa. CRUD completo com controle de acesso por perfil." },
      { description: "Portfólio pessoal moderno e elegante desenvolvido para cliente. Tipografia refinada, animações suaves e design totalmente responsivo." },
    ],
  },

  courses: {
    title: "Cursos & Certificados",
    of: "de",
    certificates: "certificados",
    all: "Todos",
    types: {
      "Web Development": "Desenvolvimento Web",
      "Database":        "Banco de Dados",
      "Architecture":    "Arquitetura",
      "Best Practices":  "Boas Práticas",
      "Programming":     "Programação",
      "DevOps":          "DevOps",
    },
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const translations: Record<Locale, Translations> = { en, ptBR };
