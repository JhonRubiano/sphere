import { defineConfig } from "vite";

export default defineConfig({
    root:'src',
    publicDir:'../public',
    base:'/sphere/',
    build:{
        sourcemap: true,
        outDir:'../dist',
    }
})