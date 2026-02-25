import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.25.36.24"],
  // Tesseract.js now runs client-side (browser Web Worker) — no server-side
  // bundling or file-tracing config needed here.
};

export default nextConfig;
