/** @type {import('next').NextConfig} */

import { paraglide } from "@inlang/paraglide-next/plugin";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  transpilePackages: ["lucide-react"],
};

export default paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./paraglide",
  },
  ...nextConfig,
});