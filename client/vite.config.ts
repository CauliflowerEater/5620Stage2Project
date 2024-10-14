import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //配置react的请求地址， 所有的请求都会发送到这个地址。
  // server: {
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:5000",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
