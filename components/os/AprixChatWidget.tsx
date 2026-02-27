"use client";

import { useRef, useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { useAprix } from "@/contexts/AprixContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AprixChatWidget() {
  const { isOpen, isClosing, messages, isLoading, apiOnline, toggleChat, sendMessage } = useAprix();
  const { locale } = useLanguage();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const lang = locale === "ptBR" ? "pt-BR" : "en-US";

  // Only render when visible (open or mid-close-animation)
  const visible = isOpen || isClosing;

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
      className="fixed z-9998 right-4 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden
                 border border-white/10 bg-[#1a1815]
                 shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
      style={{
        bottom: "108px",
        height: "460px",
        transition: "transform 0.48s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease",
        transformOrigin: isClosing ? "top right" : "bottom right",
        transform: isClosing
          ? "translateY(-105vh) scale(0.04)"
          : isOpen
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.97)",
        opacity: isClosing ? 0 : isOpen ? 1 : 0,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2a2724] border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-white/75 uppercase">
            Aprix
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${apiOnline ? "bg-green-400" : "bg-red-400/70"}`}
            title={apiOnline ? "Online" : "Offline"}
          />
        </div>
        <button
          onClick={toggleChat}
          className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-white/25 text-xs mt-10 px-4 font-mono leading-relaxed">
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
                  : "bg-white/8 text-white/80 rounded-tl-sm"
                }`}
            >
              {msg.content}
            </div>
            <span className="text-[9px] text-white/22 mt-0.5 px-1 font-mono">
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white/8 px-3 py-2.5 rounded-xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/35 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-3 pb-3 pt-2 border-t border-white/8 flex gap-2 items-end">
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
          className="flex-1 bg-white/6 text-white/85 text-xs placeholder-white/20 px-3 py-2
                     rounded-lg border border-white/8 focus:border-white/22 focus:outline-none
                     resize-none max-h-24 overflow-y-auto transition-colors
                     disabled:opacity-35 font-mono"
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
