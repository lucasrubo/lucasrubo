import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Certificates = () => {
  const { t, language } = useLanguage();

  const certificates = [
    {
      title:
        language === "pt"
          ? "Aplicações Empresariais ASP.NET Core"
          : "ASP.NET Core Enterprise Applications",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/ab2e42c7-09a6-48dc-ae2d-72557295ea59",
    },
    {
      title:
        language === "pt"
          ? "Dominando ASP.NET Core MVC"
          : "Mastering ASP.NET Core MVC",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/9a2fbf67-cd5e-456c-bf5a-7fffad43d18f",
    },
    {
      title:
        language === "pt"
          ? "Treinamento Especialista em Acesso a Dados"
          : "Data Access Expert Training",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description: language === "pt" ? "Banco de Dados" : "Database",
      link: "https://desenvolvedor.io/certificado/77852047-d43e-453e-b520-b95a491a1d3f",
    },
    {
      title:
        language === "pt"
          ? "Treinamento Desenvolvedor Full Stack .NET"
          : ".NET Full Stack Developer Training",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/1fc502b9-f3b8-46fb-b0a5-4264daa15bcb",
    },
    {
      title:
        language === "pt"
          ? "Fundamentos de Arquitetura de Software"
          : "Software Architecture Fundamentals",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description: language === "pt" ? "Arquitetura" : "Architecture",
      link: "https://desenvolvedor.io/certificado/c92ede62-4a94-41a9-b953-587861373598",
    },
    {
      title:
        language === "pt"
          ? "Programação Profissional com Clean Code"
          : "Professional Programming with Clean Code",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description: language === "pt" ? "Melhores Práticas" : "Best Practices",
      link: "https://desenvolvedor.io/certificado/55f6e819-97f2-4382-a803-f96b1ee477dd",
    },
    {
      title:
        language === "pt"
          ? "Projetando Arquiteturas de Três Camadas"
          : "Designing Three-Layer Architectures",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description: language === "pt" ? "Arquitetura" : "Architecture",
      link: "https://desenvolvedor.io/certificado/4fd18ea1-b1a2-4b50-9d88-e18f3678ed96",
    },
    {
      title:
        language === "pt" ? "SQL para Desenvolvedores" : "SQL for Developers",
      issuer: "desenvolvedor.io",
      date: "Feb 2025",
      description: language === "pt" ? "Banco de Dados" : "Database",
      link: "https://desenvolvedor.io/certificado/fbf539be-d93f-459c-aff3-d90b02daf2d2",
    },
    {
      title:
        language === "pt"
          ? "Dominando Entity Framework Core"
          : "Mastering Entity Framework Core",
      issuer: "desenvolvedor.io",
      date: "Jan 2025",
      description: language === "pt" ? "Banco de Dados" : "Database",
      link: "https://desenvolvedor.io/certificado/e0e9520b-24f6-4e8e-baf0-5f32c54c96fe",
    },
    {
      title:
        language === "pt"
          ? "REST com ASP.NET Core WebAPI"
          : "REST with ASP.NET Core WebAPI",
      issuer: "desenvolvedor.io",
      date: "Jan 2025",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/cf2e347e-d25a-4fe4-9811-6e71fbf40f46",
    },
    {
      title:
        language === "pt"
          ? "Treinamento Desenvolvedor .NET"
          : ".NET Developer Training",
      issuer: "desenvolvedor.io",
      date: "Dec 2024",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/9adf6fb3-23a0-4aa1-a497-4676c0b7437a",
    },
    {
      title:
        language === "pt"
          ? "Fundamentos de APIs em ASP.NET Core"
          : "APIs Fundamentals in ASP.NET Core",
      issuer: "desenvolvedor.io",
      date: "Dec 2024",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/98470ba0-3f05-433a-bb3d-faad6203e1bb",
    },
    {
      title:
        language === "pt" ? "Fundamentos de Blazor" : "Blazor Fundamentals",
      issuer: "desenvolvedor.io",
      date: "Dec 2024",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/e9cbb0e3-bf29-41e2-9c9f-843e1f1e0a97",
    },
    {
      title:
        language === "pt"
          ? "Introdução ao Entity Framework Core"
          : "Introduction to Entity Framework Core",
      issuer: "desenvolvedor.io",
      date: "Dec 2024",
      description: language === "pt" ? "Banco de Dados" : "Database",
      link: "https://desenvolvedor.io/certificado/3c16a65f-d8fc-4b79-b900-47987a705174",
    },
    {
      title:
        language === "pt"
          ? "Fundamentos de ASP.NET MVC"
          : "ASP.NET MVC Fundamentals",
      issuer: "desenvolvedor.io",
      date: "Sep 2024",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/2848bef3-957b-4575-b52b-afcdb40e6cb6",
    },
    {
      title: language === "pt" ? "Fundamentos de C#" : "C# Fundamentals",
      issuer: "desenvolvedor.io",
      date: "Sep 2024",
      description: language === "pt" ? "Programação" : "Programming",
      link: "https://desenvolvedor.io/certificado/825cd238-dbe9-40d3-b344-4bc6074d5f80",
    },
    {
      title:
        language === "pt"
          ? "Introdução ao ASP.NET Core"
          : "Getting Started with ASP.NET Core",
      issuer: "desenvolvedor.io",
      date: "Sep 2024",
      description:
        language === "pt" ? "Desenvolvimento Web" : "Web Development",
      link: "https://desenvolvedor.io/certificado/11351ec3-bf2a-417b-a81c-4319a6be4c60",
    },
    {
      title: "DevOps Project - 2022: CI/CD with Jenkins Ansible Kubernetes",
      issuer: "Udemy",
      date: "Oct 2022",
      description: language === "pt" ? "DevOps" : "DevOps",
      link: "https://www.udemy.com/certificate/UC-065c45ab-bb1b-4904-8737-fb510cbb5630/",
    },
    {
      title:
        language === "pt"
          ? "JavaScript do Básico ao Avançado (com Node.js e projetos)"
          : "JavaScript from Basic to Advanced (with Node.js and projects)",
      issuer: "Udemy",
      date: "Oct 2022",
      description: language === "pt" ? "Programação" : "Programming",
      link: "https://www.udemy.com/certificate/UC-38fd00fe-0b73-4564-8322-219371e04804/",
    },
    {
      title:
        language === "pt"
          ? "Curso Python 3 do Básico ao Avançado (com projetos reais)"
          : "Python 3 Course from Basic to Advanced (with real projects)",
      issuer: "Udemy",
      date: "Sep 2022",
      description: language === "pt" ? "Programação" : "Programming",
      link: "https://www.udemy.com/certificate/UC-af83d567-aa2b-4796-8bc3-2c58a4f07bba/",
    },
    {
      title: "Clean Code",
      issuer: "Udemy",
      date: "Jul 2022",
      description: language === "pt" ? "Melhores Práticas" : "Best Practices",
      link: "https://www.udemy.com/certificate/UC-0d026173-2ed7-468f-93cf-9fa08606ffac/",
    },
  ];

  return (
    <section id="certificates" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
            {t("certificates.title")}
          </h2>
          <div className="h-1 w-20 bg-gradient-primary mx-auto mb-16" />

          <div className="grid md:grid-cols-3 gap-6 mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all shadow-card group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {cert.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {cert.issuer}
                </p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {cert.description}
                </p>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {language === "pt" ? "Ver Certificado" : "View Certificate"}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
