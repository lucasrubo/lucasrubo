"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Instagram, ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const c = t.contact;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8 bg-linear-to-b from-ph-cream/40 to-white dark:from-transparent dark:to-ph-dark">
        <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight mb-1">{c.title}</h1>
        <p className="text-sm text-gray-500 dark:text-white/45">{c.subtitle}</p>
      </div>

      <div className="px-8 py-6 flex flex-col md:flex-row gap-8">
        {/* Left: info */}
        <div className="md:w-52 shrink-0 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
              {c.sectionReachOut}
            </p>
            <div className="space-y-2.5">
              {[
                { icon: Mail,   text: "lucasrubo1@gmail.com", href: "mailto:lucasrubo1@gmail.com" },
                { icon: Phone,  text: "+55 (19) 9940-1980",   href: "tel:+5519994019804"          },
                { icon: MapPin, text: "Valinhos, SP — Brazil", href: null                         },
              ].map(({ icon: Icon, text, href }) =>
                href ? (
                  <a key={text} href={href}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/55 hover:text-ph-orange transition-colors">
                    <Icon size={13} className="text-gray-400 dark:text-white/30 shrink-0" />{text}
                  </a>
                ) : (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/55">
                    <Icon size={13} className="text-gray-400 dark:text-white/30 shrink-0" />{text}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
              {c.sectionSocial}
            </p>
            <div className="space-y-2">
              {[
                { icon: Github,    label: "GitHub",    href: "https://github.com/lucasrubo"       },
                { icon: Linkedin,  label: "LinkedIn",  href: "https://linkedin.com/in/lucas-rubo" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/lucas.rubo"   },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/55 hover:text-ph-orange transition-colors group">
                  <Icon size={13} className="text-gray-400 dark:text-white/30 shrink-0" />
                  {label}
                  <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex-1">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-12">
              <CheckCircle2 size={40} className="text-green-500" />
              <p className="font-bold text-ph-dark dark:text-white/85">{c.success.title}</p>
              <p className="text-sm text-gray-500 dark:text-white/45">{c.success.body}</p>
              <button onClick={() => setSent(false)} className="text-xs text-ph-orange hover:underline mt-2">
                {c.success.sendAnother}
              </button>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/55 mb-1">{c.form.nameLabel}</label>
                  <input required name="name" value={form.name} onChange={handleChange}
                    className="w-full border border-gray-200 dark:border-white/10 rounded-md px-3 py-2 text-sm
                               bg-white dark:bg-white/5 text-ph-dark dark:text-white/85
                               placeholder:text-gray-400 dark:placeholder:text-white/25
                               focus:outline-none focus:ring-2 focus:ring-ph-orange/30 focus:border-ph-orange"
                    placeholder={c.form.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/55 mb-1">{c.form.emailLabel}</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border border-gray-200 dark:border-white/10 rounded-md px-3 py-2 text-sm
                               bg-white dark:bg-white/5 text-ph-dark dark:text-white/85
                               placeholder:text-gray-400 dark:placeholder:text-white/25
                               focus:outline-none focus:ring-2 focus:ring-ph-orange/30 focus:border-ph-orange"
                    placeholder={c.form.emailPlaceholder} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/55 mb-1">{c.form.subjectLabel}</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-white/10 rounded-md px-3 py-2 text-sm
                             bg-white dark:bg-white/5 text-ph-dark dark:text-white/85
                             placeholder:text-gray-400 dark:placeholder:text-white/25
                             focus:outline-none focus:ring-2 focus:ring-ph-orange/30 focus:border-ph-orange"
                  placeholder={c.form.subjectPlaceholder} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/55 mb-1">{c.form.messageLabel}</label>
                <textarea required rows={5} name="message" value={form.message} onChange={handleChange}
                  className="w-full border border-gray-200 dark:border-white/10 rounded-md px-3 py-2 text-sm
                             bg-white dark:bg-white/5 text-ph-dark dark:text-white/85
                             placeholder:text-gray-400 dark:placeholder:text-white/25
                             focus:outline-none focus:ring-2 focus:ring-ph-orange/30 focus:border-ph-orange resize-none"
                  placeholder={c.form.messagePlaceholder} />
              </div>
              {error && (
                <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
              )}
              <button type="submit" disabled={loading}
                className="w-full bg-ph-orange text-white font-semibold py-2.5 rounded-md text-sm
                           hover:bg-[#d94400] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Enviando…" : c.form.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
