"use client";

import { useRef, useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { useAprix } from "@/contexts/AprixContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AprixChatWidget() {
  const { isOpen, isClosing, messages, isLoading, apiOnline, toggleChat, sendMessage } = useAprix();
  const { locale } = useLanguage();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const lang = locale === "ptBR" ? "pt-BR" : "en-US";

  const visible = isOpen || isClosing;

  // ── Entry animation ────────────────────────────────────────────────────────
  // Component mounts with isOpen already true → need a frame delay to trigger
  // the CSS transition from the "closed" starting state.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!isOpen || isClosing) { setEntered(false); return; }
    // Double rAF: first frame paints initial (collapsed) state, second triggers transition
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [isOpen, isClosing]);

  useEffect(() => {
    if (isOpen && !isClosing) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen, isClosing, messages.length]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading || !apiOnline) return;
    setInput("");
    await sendMessage(text, lang);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });

  if (!visible) return null;

  return (
    <div
      className="fixed z-9998 right-4 w-80 sm:w-96 flex flex-col rounded-sm overflow-hidden
                 border border-black/10 dark:border-white/10
                 bg-white dark:bg-[#1a1815]
                 shadow-[0_8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
      style={{
        bottom: "108px",
        height: "460px",
        transformOrigin: "bottom right",
        transition: isClosing
          ? "transform 0.42s cubic-bezier(0.4,0,1,1), opacity 0.28s ease"
          : entered
            ? "transform 0.42s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease"
            : "none",
        transform: isClosing
          ? "translateY(110%) scale(0.08)"
          : entered
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.82)",
        opacity: isClosing ? 0 : entered ? 1 : 0,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0
                      bg-gray-50 dark:bg-[#2a2724]
                      border-b border-black/8 dark:border-white/8">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] font-bold tracking-[0.18em]
                           text-black/55 dark:text-white/75 uppercase">
            Aprix
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${apiOnline ? "bg-green-500 dark:bg-green-400" : "bg-red-400/70"}`}
            title={apiOnline ? "Online" : "Offline"}
          />
        </div>
        <button
          onClick={toggleChat}
          className="p-1 rounded-lg transition-colors
                     text-black/35 hover:text-black/70 hover:bg-black/6
                     dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 overflow-hidden px-3 py-3">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-xs mt-10 px-4 font-mono leading-relaxed
                            text-black/30 dark:text-white/25">
              {locale === "ptBR"
                ? "Olá. Sou o Aprix, assistente de Lucas.\nComo posso ajudar?"
                : "Hello. I'm Aprix, Lucas's assistant.\nHow can I help?"}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap
                  ${msg.role === "user"
                    ? "bg-linear-to-br from-ph-purple to-ph-blue text-white rounded-tr-sm"
                    : "bg-black/6 text-black/75 rounded-tl-sm dark:bg-white/8 dark:text-white/80"
                  }`}
              >
                {msg.content}
              </div>
              <span className="text-[9px] mt-0.5 px-1 font-mono
                               text-black/28 dark:text-white/22">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="px-3 py-2.5 rounded-xl rounded-tl-sm
                              bg-black/6 dark:bg-white/8">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-bounce
                                 bg-black/20 dark:bg-white/35"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="shrink-0 px-3 pb-3 pt-2 flex gap-2 items-end
                      border-t border-black/8 dark:border-white/8">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || !apiOnline}
          rows={1}
          placeholder={
            !apiOnline
              ? "API offline"
              : locale === "ptBR" ? "Mensagem..." : "Message..."
          }
          className="flex-1 text-xs px-3 py-2 rounded-lg font-mono
                     resize-none max-h-24 overflow-y-auto transition-colors
                     bg-black/5 text-black/80 placeholder-black/25
                     border border-black/10 focus:border-black/25
                     dark:bg-white/6 dark:text-white/85 dark:placeholder-white/20
                     dark:border-white/8 dark:focus:border-white/22
                     focus:outline-none disabled:opacity-35"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim() || !apiOnline}
          className="shrink-0 p-2 rounded-lg bg-ph-purple hover:bg-[#7d659a]
                     disabled:opacity-35 disabled:cursor-not-allowed
                     text-white transition-colors"
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
