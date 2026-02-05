<script setup>
const { locale } = useI18n();
const route = useRoute();
const vWidth = useState("vWidth", () => 0);
const vHeight = useState("vHeight", () => 0);
const headerHeight = useState("headerHeight", () => 0);
const viewPort = useState("viewPort", () => "");
const hasMainDisclaimer = useState('hasMainDisclaimer', () => false);
const hasHeader = useState('hasHeader', () => true);
const wechatQr = useState('wechatQr', () => false)

if (document) {
    window.addEventListener("resize", () => {
        vWidth.value = window.innerWidth;
        vHeight.value = window.innerHeight;

        if (window.innerWidth >= 769) {
            viewPort.value = "desktop";
        } else {
            viewPort.value = "mobile";
        }
    });
}

const siteName = useState("siteName", () => {
    switch (locale.value) {
        case "en":
            return "NUXT V4 STARTER";
        case "sc":
            return "NUXT V4 STARTER";
        case "tc":
            return "NUXT V4 STARTER";
    }
});

watchEffect(() => {
    switch (locale.value) {
        case "en":
            siteName.value = "NUXT V4 STARTER";
            break;
        case "sc":
            siteName.value = "NUXT V4 STARTER";
            break;
        case "tc":
            siteName.value = "NUXT V4 STARTER";
            break;
    }
});

onMounted(() => {
    vWidth.value = window.innerWidth;
    vHeight.value = window.innerHeight;

    if (vWidth.value >= 769) {
        viewPort.value = "desktop";
    } else {
        viewPort.value = "mobile";
    }
});

useHead({
    templateParams: {
        site: siteName.value,
        separator: "|",
    },
    titleTemplate: (title) =>
        !title ? siteName.value : `${title} | ${siteName.value}`,
    htmlAttrs() {
        return {
            "data-lang": locale,
            "data-page": route.name,
        };
    },
});
</script>

<template>
    <div>
        <Head>
            <Style>{{ `body { --header-height: ${headerHeight}px; }` }}</Style>
        </Head>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
