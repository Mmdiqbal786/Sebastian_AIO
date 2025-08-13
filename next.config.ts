import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// const nextConfig: NextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         net: false,
//         tls: false,
//         child_process: false,
//         fs: false,
//       };
//     }
//     return config;
//   },
// };

export default nextConfig;
