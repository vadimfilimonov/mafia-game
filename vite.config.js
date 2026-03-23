import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PATH = process.env.DEPLOY_TARGET === 'gh-pages' ? '/mafia-game/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
