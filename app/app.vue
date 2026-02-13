<script setup>
const { locale } = useI18n();
const route = useRoute();
const vWidth = useState("vWidth", () => 0);
const vHeight = useState("vHeight", () => 0);
const headerHeight = useState("headerHeight", () => 0);
const viewPort = useState("viewPort", () => "");
const hasMainDisclaimer = useState("hasMainDisclaimer", () => false);
const hasHeader = useState("hasHeader", () => true);
const wechatQr = useState("wechatQr", () => false);
const showloading = ref(true);

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
            return "KT Marina2 啟德海灣2 - Victoria Harbour Living | Official Website";
        case "sc":
            return "启德海湾2 KT Marina2 - 维多利亚港生活圈 ｜ 官方网站";
        case "tc":
            return "啟德海灣2 KT Marina2 - 維多利亞港生活圈 ｜ 官方網站";
    }
});

watchEffect(() => {
    switch (locale.value) {
        case "en":
            siteName.value =
                "KT Marina2 啟德海灣2 - Victoria Harbour Living | Official Website";
            break;
        case "sc":
            siteName.value =
                "启德海湾2 KT Marina2 - 维多利亚港生活圈 ｜ 官方网站";
            break;
        case "tc":
            siteName.value =
                "啟德海灣2 KT Marina2 - 維多利亞港生活圈 ｜ 官方網站";
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
        <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <FancyLoading v-if="showloading" @loaded="showloading = false">
                <template v-slot:loading-icon>
                    <img src="/images/logo_ktm2.png" class="max-w-40" />
                </template>
            </FancyLoading>
        </Transition>
        <Head>
            <Style>{{ `body { --header-height: ${headerHeight}px; }` }}</Style>
        </Head>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
