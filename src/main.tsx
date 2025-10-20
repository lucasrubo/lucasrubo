import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Otimização global do Framer Motion para melhor performance
import { MotionConfig } from "framer-motion";

const root = createRoot(document.getElementById("root")!);

root.render(
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>
);
