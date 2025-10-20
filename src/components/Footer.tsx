import { useLanguage } from "@/contexts/LanguageContext";
import { Heart } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Lucas Rubo. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
