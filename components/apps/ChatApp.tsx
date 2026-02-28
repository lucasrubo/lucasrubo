"use client";

import { useRef, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useAprix } from "@/contexts/AprixContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatApp() {
  const { messages, isLoading, apiOnline, sendMessage } = useAprix();
  const { locale } = useLanguage();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const lang = locale === "ptBR" ? "pt-BR" : "en-US";
  const isPT = locale === "ptBR";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

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

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1a1815]">

      {/* API status banner */}
      {!apiOnline && (
        <div className="shrink-0 px-4 py-1.5 text-[10px] font-mono text-center
                        bg-red-50 dark:bg-red-950/30 text-red-500/80 border-b
                        border-red-200/60 dark:border-red-800/30">
          {isPT ? "API offline — respostas indisponíveis" : "API offline — responses unavailable"}
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 overflow-hidden">
        <div className="px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-3 select-none">
              <div className="w-10 h-10 rounded-2xl bg-ph-purple/10 dark:bg-ph-purple/20
                              flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-ph-purple" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[12px] font-mono text-center leading-relaxed
                            text-black/35 dark:text-white/30 max-w-[200px]">
                {isPT
                  ? "Sou o Aprix, assistente de Lucas.\nComo posso ajudar?"
                  : "I'm Aprix, Lucas's assistant.\nHow can I help?"}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed whitespace-pre-wrap
                  ${msg.role === "user"
                    ? "bg-linear-to-br from-ph-purple to-ph-blue text-white rounded-tr-sm"
                    : "bg-black/6 text-black/80 rounded-tl-sm dark:bg-white/8 dark:text-white/85"
                  }`}
              >
                {msg.content}
              </div>
              <span className="text-[9px] mt-1 px-1 font-mono
                               text-black/28 dark:text-white/20">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm
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
      <div className="shrink-0 px-4 pb-4 pt-2 flex gap-2 items-end
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
              ? (isPT ? "API offline" : "API offline")
              : (isPT ? "Mensagem..." : "Message...")
          }
          className="flex-1 text-[12px] px-3 py-2 rounded-xl font-mono
                     resize-none max-h-24 overflow-y-auto transition-colors
                     bg-black/5 text-black/80 placeholder-black/28
                     border border-black/10 focus:border-black/25
                     dark:bg-white/6 dark:text-white/85 dark:placeholder-white/25
                     dark:border-white/8 dark:focus:border-white/22
                     focus:outline-none disabled:opacity-40"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim() || !apiOnline}
          className="shrink-0 p-2 rounded-xl bg-ph-purple hover:bg-[#7d659a]
                     disabled:opacity-35 disabled:cursor-not-allowed
                     text-white transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
