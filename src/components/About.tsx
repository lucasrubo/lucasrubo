import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Code2, Rocket, Users, Smartphone } from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Code2,
      title: language === "pt" ? "Clean Code" : "Clean Code",
      description:
        language === "pt"
          ? "Código limpo, testável e mantível"
          : "Clean, testable and maintainable code",
    },
    {
      icon: Rocket,
      title: language === "pt" ? "Performance" : "Performance",
      description:
        language === "pt"
          ? "Otimização e alta performance"
          : "Optimization and high performance",
    },
    {
      icon: Users,
      title: language === "pt" ? "Colaboração" : "Collaboration",
      description:
        language === "pt"
          ? "Trabalho em equipe e comunicação"
          : "Team work and communication",
    },
    {
      icon: Smartphone,
      title:
        language === "pt"
          ? "Aplicativos Cross-Platform"
          : "Cross-Platform Applications",
      description:
        language === "pt"
          ? "Aplicativos iOS, Android e web com desempenho nativo"
          : "iOS, Android & web apps with native performance",
    },
  ];

  const paragraphs = [
    t("about.description1"),
    t("about.description2"),
    t("about.description3"),
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto motion-optimize"
          layout
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
            {t("about.title")}
          </h2>
          <div className="h-1 w-20 bg-gradient-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {paragraphs.map((para, index) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all transform-gpu motion-optimize"
                  layout
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
