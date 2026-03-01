import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AprixOS – Portfolio & Playground",
    short_name: "AprixOS",
    description:
      "AprixOS is a portfolio, blog, and playground all in one. Built by Lucas Rubo.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1d1b17",
    theme_color: "#f54e00",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
