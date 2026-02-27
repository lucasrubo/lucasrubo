"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AprixContextType {
  isOpen: boolean;
  isClosing: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  apiOnline: boolean;
  toggleChat: () => void;
  openChat: () => void;
  sendMessage: (text: string, lang: string) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AprixContext = createContext<AprixContextType | null>(null);

const API_URL  = "https://aprix-five.vercel.app/api/chat";
const API_KEY  = "f759e2dd9776f3840e29ad933dd2cc5711a219aef18ab8263f3f6bb411a3e7e9";
const LS_KEY   = "os-aprix-messages";
const MAX_MSGS = 50;
const CLOSE_DURATION = 480; // ms — must match CSS transition duration

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AprixProvider({ children }: { children: ReactNode }) {
  const [isOpen,    setIsOpen]    = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages,  setMessages]  = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);

  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  // Load persisted messages on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setMessages(parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
      }
    } catch { /* ignore */ }
  }, []);

  // Check API health on mount
  useEffect(() => {
    fetch("https://aprix-five.vercel.app/health")
      .then((r) => setApiOnline(r.ok))
      .catch(() => setApiOnline(false));
  }, []);

  // When closing: play animation first, then set isOpen = false
  const closeWithAnimation = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION);
  }, []);

  const toggleChat = useCallback(() => {
    if (isOpen) {
      closeWithAnimation();
    } else {
      setIsOpen(true);
    }
  }, [isOpen, closeWithAnimation]);

  const openChat = useCallback(() => setIsOpen(true), []);

  const sendMessage = useCallback(async (text: string, lang: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];
      localStorage.setItem(LS_KEY, JSON.stringify(updated.slice(-MAX_MSGS)));
      return updated;
    });

    setIsLoading(true);

    try {
      const history = messagesRef.current
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ message: text, history, lang }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = (await res.json()) as { response: string };

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const updated = [...prev, assistantMsg];
        localStorage.setItem(LS_KEY, JSON.stringify(updated.slice(-MAX_MSGS)));
        return updated;
      });
    } catch {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          lang === "pt-BR"
            ? "Desculpe, não consegui responder. Tente novamente."
            : "Sorry, I couldn't respond. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AprixContext.Provider
      value={{ isOpen, isClosing, messages, isLoading, apiOnline, toggleChat, openChat, sendMessage }}
    >
      {children}
    </AprixContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAprix() {
  const ctx = useContext(AprixContext);
  if (!ctx) throw new Error("useAprix must be used within <AprixProvider>");
  return ctx;
}
