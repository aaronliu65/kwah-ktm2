import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            bodyAttrs: {},
            link: [
                {
                    rel: "preconnect",
                    href: "https://fonts.googleapis.com",
                },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap",
                },
            ],
            script: [
                {
                    innerHTML: "window.dataLayer = window.dataLayer || [];",
                },
            ],
        },
        pageTransition: { name: "page" },
        baseURL: process.env.BASE_URL || "/",
    },

    css: ["animate.css", "~/assets/css/style.css"],

    build: { transpile: ["unlazy"] },
    modules: ["nuxt-svgo", "@nuxtjs/i18n", "@nuxtjs/robots", "@nuxtjs/sitemap"],
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        detectBrowserLanguage: false,
        locales: [
            { code: "en", iso: "en-US", name: "EN" },
            { code: "tc", iso: "zh-HK", name: "繁" },
            { code: "sc", iso: "zh-CN", name: "简" },
        ],
        defaultLocale: "tc",
    },
    svgo: { autoImportPath: "./assets/svg/" },

    site: {
        url: process.env.SITE_URL || "https://www.hostlink.com.hk",
        defaultLocale: "tc",
    },
});
