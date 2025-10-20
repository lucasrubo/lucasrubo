import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const { t, language } = useLanguage();

  const experiences = [
    {
      title:
        language === "pt"
          ? "Analista de Desenvolvimento"
          : "Development Analyst",
      company: "Areco",
      period: language === "pt" ? "2024 — Presente" : "2024 — Present",
      description:
        language === "pt"
          ? "Desenvolvimento de sistemas complementares usando C# com Blazor e Next.js com C#. Integrações com Delphi, PHP e SQL em um ambiente híbrido na Areco Sistemas Empresariais."
          : "Development of complementary systems using C# with Blazor and Next.js with C#. Integrations with Delphi, PHP, and SQL in a hybrid environment at Areco Sistemas Empresariais.",
      technologies: ["C#", "Blazor", "Next.js", "Delphi", "PHP", "SQL"],
    },
    {
      title: language === "pt" ? "Desenvolvedor" : "Developer",
      company: "NB41",
      period: "2023 — 2024",
      description:
        language === "pt"
          ? "Trabalho remoto na NB41 Comunicação e Marketing LTDA. Desenvolvimento e manutenção de sistemas PHP, modelagem de bancos de dados e criação de interfaces dinâmicas para atender demandas específicas."
          : "Remote work at NB41 Comunicação e Marketing LTDA. Development and maintenance of PHP systems, database modeling, and creation of dynamic interfaces to meet specific demands.",
      technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    },
    {
      title:
        language === "pt"
          ? "Desenvolvedor de Sistemas (Estágio)"
          : "Systems Developer (Internship)",
      company: "IBM",
      period: "2021 — 2022",
      description:
        language === "pt"
          ? "Estágio remoto na IBM na área CI/CD. Criação de pipelines, automação de testes, documentação técnica e desenvolvimento de scripts para integração contínua."
          : "Remote internship at IBM in the CI/CD area. Pipeline creation, test automation, technical documentation, and script development for continuous integration.",
      technologies: ["Jenkins", "Docker", "Git", "Shell Scripting", "Python"],
    },
    {
      title:
        language === "pt"
          ? "Assistente de Programação"
          : "Programming Assistant",
      company: "NB41",
      period: "2019 — 2021",
      description:
        language === "pt"
          ? "Criação e manutenção de sistemas web, desenvolvimento de websites em PHP e gerenciamento de bancos de dados na NB41 Comunicação e Marketing LTDA."
          : "Creation and maintenance of web systems, website development in PHP, and database management at NB41 Comunicação e Marketing LTDA.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    },
    {
      title:
        language === "pt" ? "Estagiário de Programação" : "Programming Intern",
      company: "NB41",
      period: "2019",
      description:
        language === "pt"
          ? "Desenvolvimento front-end e suporte em tarefas de software, incluindo manutenção de sistemas e testes de funcionalidades."
          : "Front-end development and support in software tasks, including system maintenance and feature testing.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
            {t("experience.title")}
          </h2>
          <div className="h-1 w-20 bg-gradient-primary mx-auto mb-16" />

          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-all"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary shadow-glow" />

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all shadow-card">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.period}
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
