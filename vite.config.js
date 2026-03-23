import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ghPages } from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  base: '/mafia-game/',
  plugins: [
    ghPages(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
