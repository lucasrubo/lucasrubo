import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Calendar } from "lucide-react";

const Education = () => {
  const { t, language } = useLanguage();

  const education = [
    {
      degree:
        language === "pt"
          ? "Bacharelado em Ciência da Computação"
          : "Bachelor in Computer Science",
      institution: "Universidade Paulista",
      period: "2019 - 2023",
      description:
        language === "pt"
          ? "Formação completa em ciência da computação com foco em engenharia de software, algoritmos e estruturas de dados."
          : "Complete education in computer science focused on software engineering, algorithms and data structures.",
    },
    {
      degree:
        language === "pt"
          ? "Técnico em Informática"
          : "Technical in Information Technology",
      institution: "Senai",
      period: "2017 - 2019",
      description:
        language === "pt"
          ? "Curso técnico com ênfase em desenvolvimento web e manutenção de sistemas."
          : "Technical course with emphasis on web development and systems maintenance.",
    },
  ];

  return (
    <section id="education" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
            {t("education.title")}
          </h2>
          <div className="h-1 w-20 bg-gradient-primary mx-auto mb-16" />

          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pr-8 border-r-2 border-secondary/30 hover:border-secondary transition-all ml-auto"
              >
                <div className="absolute -right-3 top-0 w-6 h-6 rounded-full bg-secondary" />

                <div className="bg-card p-6 rounded-lg border border-border hover:border-secondary/50 transition-all shadow-card">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-secondary font-medium flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {edu.institution}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      {edu.period}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
