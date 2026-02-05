<script setup>
const header = ref(null);
const headerHeight = useState("headerHeight");
const wechatQr = useState("wechatQr");

const resizeObserver = ref();

onMounted(() => {
    if (header.value) {
        resizeObserver.value = new ResizeObserver((entries) => {
            for (const entry of entries) {
                headerHeight.value = entry.contentRect.height;
                console.log("Header height:", headerHeight.value);
            }
        });
        resizeObserver.value.observe(header.value);
    }
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.header {
    @apply absolute inset-x-0 top-0 z-10 bg-(--theme-color-secondary)/90;

    .inner-header {
        @apply relative mx-auto h-full w-[90%];
    }

    &:after {
        @apply absolute inset-x-0 top-full z-1 mx-auto block h-2 w-full bg-linear-to-r from-[#826a4b] via-[#c5af7d] via-35% to-[#826a4b] content-[''];
    }
}

.logo {
    @apply absolute inset-x-0 bottom-0 mx-auto aspect-415/215 w-[21.65cqw] max-w-[415px];

    > img {
        @apply h-full w-full object-contain;
    }
}

.widgets {
    @apply absolute bottom-9 left-0 flex items-center gap-4;
}

.main-menu {
    @apply grid grid-cols-2 gap-[27.86cqw] pt-[9.42cqw] pb-[1.67cqw] @min-[1921px]:gap-[calc(415px+7.5rem)];

    .inner-menu {
        @apply flex h-full items-center space-x-[2.08cqw] first:justify-end last:justify-start @min-[1921px]:space-x-10;

        .menu-item {
            @apply px-2;

            > a {
                @apply text-[0.9375cqw] tracking-widest text-(--theme-color-primary) @min-[1920px]:text-[1.125em];
            }
        }
    }
}
</style>

<template>
    <div class="header" ref="header">
        <div class="inner-header">
            <NuxtLinkLocale to="/home" class="logo">
                <SharpImg src="logo_ktm2.png" />
            </NuxtLinkLocale>
            <div class="widgets">
                <SocialMedia @clicked="wechatQr = true" />
                <LangSwtich />
            </div>
            <div class="flex h-full w-full items-end justify-center">
                <div class="main-menu">
                    <div class="inner-menu">
                        <div class="menu-item">
                            <NuxtLinkLocale :to="`/sales-info/sales-brochure`"
                                >售樓說明書</NuxtLinkLocale
                            >
                        </div>
                        <div class="menu-item">
                            <NuxtLinkLocale :to="`/sales-info/price-list`"
                                >價單</NuxtLinkLocale
                            >
                        </div>
                        <div class="menu-item">
                            <NuxtLinkLocale
                                :to="`/sales-info/sales-arrangements`"
                                >銷售安排</NuxtLinkLocale
                            >
                        </div>
                    </div>
                    <div class="inner-menu">
                        <div class="menu-item">
                            <NuxtLinkLocale :to="`/sales-info/tender-documents`"
                                >招標文件</NuxtLinkLocale
                            >
                        </div>
                        <div class="menu-item">
                            <NuxtLinkLocale
                                :to="`/sales-info/register-of-transactions`"
                                >成交紀錄冊</NuxtLinkLocale
                            >
                        </div>
                        <div class="menu-item">
                            <NuxtLinkLocale
                                :to="`/sales-info/deed-of-mutual-covenant`"
                                >公契</NuxtLinkLocale
                            >
                        </div>
                        <div class="menu-item">
                            <NuxtLinkLocale
                                :to="`/sales-info/aerial-photograph`"
                                >鳥瞰照片</NuxtLinkLocale
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
