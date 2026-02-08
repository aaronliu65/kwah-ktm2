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
        @apply relative mx-auto h-full w-[90%] pt-[2.08cqw] pb-[1.33cqw];
    }

    &:after {
        @apply absolute inset-x-0 top-full z-1 mx-auto block h-2 w-full bg-linear-to-r from-[#826a4b] via-[#c5af7d] via-35% to-[#826a4b] content-[''];
    }
}

.logo {
    @apply absolute inset-x-0 mx-auto block aspect-415/181 w-[22.39cqw] translate-x-[-2%] translate-y-[-3.8%];

    > img {
        @apply h-full w-full object-contain;
    }
}

.widgets {
    @apply flex h-full items-center gap-[0.83cqw];
    /* absolute top-[9.6cqw] */
}

.main-menu {
    @apply mx-auto grid w-full grid-cols-8 gap-[2.92cqw];

    .inner-menu {
        @apply grid w-full pb-1;
    }

    .menu-item {
        @apply text-center;

        > a {
            @apply relative block text-[1.04cqw] tracking-widest whitespace-nowrap text-(--theme-color-primary) @min-[1920px]:text-[1.25em];

            &:before {
                @apply absolute inset-x-0 bottom-[calc(100%+0.4em)] mx-auto block aspect-square w-[0.31cqw] max-w-[6px] rounded-full bg-(--theme-color-primary) content-[''] scale-0 translate-y-[150%] transition-transform duration-500;
            }

            &:after {
                @apply absolute inset-x-0 top-[calc(100%+2px)] block h-0.5 w-full content-[''] scale-x-0 transition-transform duration-500;
                background: linear-gradient(
                    90deg,
                    rgba(125, 102, 74, 0) 0%,
                    rgba(125, 102, 74, 1) 15%,
                    rgba(207, 189, 135, 1) 29%,
                    rgba(125, 102, 74, 1) 85%,
                    rgba(125, 102, 74, 0.05) 100%
                );
            }
        }

        &:hover {
            >a {
                &:before {
                    @apply translate-y-0 scale-100;
                }

                &:after {
                    @apply scale-x-100;
                }
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
            <div class="main-menu">
                <div class="col-span-3 flex items-end justify-between">
                    <div class="inner-menu grid-cols-5">
                        <div class="col-span-2">
                            <div class="widgets">
                                <SocialMedia @clicked="wechatQr = true" />
                                <LangSwtich />
                            </div>
                        </div>
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
                </div>
                <div class="col-span-2 mx-auto aspect-415/181 w-full"></div>
                <div class="col-span-3 flex items-end justify-between">
                    <div class="inner-menu grid-cols-4">
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
