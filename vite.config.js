<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
    envPrefix:'REACT_APP_',
    plugins:[
        react(),
        envCompatible()
    ],
   
})
>>>>>>> 2b063adaf8e762d967656e322c4caab72a10da82
