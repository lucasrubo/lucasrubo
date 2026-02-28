"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import type React from "react";

export interface WindowState {
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  launchOrigin?: { x: number; y: number };
}

interface OpenWindowOptions {
  title?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  launchOrigin?: { x: number; y: number };
}

interface WindowContextType {
  windows: WindowState[];
  activeAppId: string | null;
  openWindow: (appId: string, opts?: OpenWindowOptions) => void;
  closeWindow: (appId: string) => void;
  minimizeWindow: (appId: string) => void;
  toggleMaximize: (appId: string) => void;
  focusWindow: (appId: string) => void;
  updatePosition: (appId: string, pos: { x: number; y: number }) => void;
  updateSize: (
    appId: string,
    size: { width: number; height: number },
    pos?: { x: number; y: number }
  ) => void;
  /** Ref map: appId → center position of the taskbar button (no re-renders). */
  taskbarBoundsRef: React.MutableRefObject<Record<string, { x: number; y: number }>>;
  setTaskbarBound: (appId: string, pos: { x: number; y: number }) => void;
  /** Register a parameterless minimize callback for an AppWindow (called by AppWindow on mount). */
  registerMinimizeCallback: (appId: string, cb: () => void) => void;
  /** Trigger the registered minimize animation on an AppWindow (called by Taskbar). */
  triggerMinimize: (appId: string) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

let zCounter = 100;

const MENU_BAR_H = 36;
const TASK_BAR_H = 40;

function calcCenter(w: number, h: number, existingCount: number) {
  if (typeof window === "undefined") {
    return { x: 80 + existingCount * 28, y: 24 + existingCount * 28 };
  }
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const usableH = screenH - MENU_BAR_H - TASK_BAR_H;

  const cascade = existingCount * 28;
  return {
    x: Math.max(60, Math.round((screenW - w) / 2) + cascade),
    y: Math.max(8, Math.round((usableH - h) / 2) + MENU_BAR_H + cascade),
  };
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const taskbarBoundsRef = useRef<Record<string, { x: number; y: number }>>({});
  const minimizeCallbacksRef = useRef<Record<string, () => void>>({});

  const setTaskbarBound = useCallback((appId: string, pos: { x: number; y: number }) => {
    taskbarBoundsRef.current[appId] = pos;
  }, []);

  const registerMinimizeCallback = useCallback((appId: string, cb: () => void) => {
    minimizeCallbacksRef.current[appId] = cb;
  }, []);

  const triggerMinimize = useCallback((appId: string) => {
    minimizeCallbacksRef.current[appId]?.();
  }, []);

  const openWindow = useCallback((appId: string, opts?: OpenWindowOptions) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        return prev.map((w) =>
          w.appId === appId
            ? { ...w, isMinimized: false, zIndex: ++zCounter, launchOrigin: undefined }
            : w
        );
      }
      const w = opts?.size?.width ?? 820;
      const h = opts?.size?.height ?? 580;
      const visibleCount = prev.filter((win) => !win.isMinimized).length;

      return [
        ...prev,
        {
          appId,
          title: opts?.title ?? appId,
          position: opts?.position ?? calcCenter(w, h, visibleCount),
          size: { width: w, height: h },
          isMinimized: false,
          isMaximized: false,
          zIndex: ++zCounter,
          launchOrigin: opts?.launchOrigin,
        },
      ];
    });
    setActiveAppId(appId);
  }, []);

  const closeWindow = useCallback((appId: string) => {
    setWindows((prev) => prev.filter((w) => w.appId !== appId));
    setActiveAppId((prev) => (prev === appId ? null : prev));
  }, []);

  const minimizeWindow = useCallback((appId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.appId === appId ? { ...w, isMinimized: true } : w))
    );
    setActiveAppId(null);
  }, []);

  const toggleMaximize = useCallback((appId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.appId === appId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const focusWindow = useCallback((appId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.appId === appId
          ? { ...w, zIndex: ++zCounter, isMinimized: false }
          : w
      )
    );
    setActiveAppId(appId);
  }, []);

  const updatePosition = useCallback(
    (appId: string, pos: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.appId === appId ? { ...w, position: pos } : w))
      );
    },
    []
  );

  const updateSize = useCallback(
    (
      appId: string,
      size: { width: number; height: number },
      pos?: { x: number; y: number }
    ) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.appId === appId
            ? { ...w, size, ...(pos ? { position: pos } : {}) }
            : w
        )
      );
    },
    []
  );

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeAppId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        updatePosition,
        updateSize,
        taskbarBoundsRef,
        setTaskbarBound,
        registerMinimizeCallback,
        triggerMinimize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindows must be used within WindowProvider");
  return ctx;
}
