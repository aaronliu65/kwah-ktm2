<i18n src="~/translates/main.yml" lang="yaml" />

<script setup>
const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const header = ref(null);
const headerHeight = useState("headerHeight");
const viewPort = useState("viewPort");
const wechatQr = useState("wechatQr");
const hasMainMenu = ref(false);
const mainMenu = ref(null);
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

watch(
    () => mainMenu.value,
    (value) => {
        if (value) {
            value
                .querySelectorAll(".widgets, .menu-item")
                .forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.05}s`;
                    item.classList.add(
                        "animate__animated",
                        "animate__fadeInUp",
                        "animate__faster",
                    );

                    item.addEventListener("animationend", () => {
                        item.style.animationDelay = "";
                        item.classList.remove(
                            "animate__animated",
                            "animate__fadeInUp",
                            "animate__faster",
                        );
                    });
                });
        }
    },
);

watch(
    () => route.path,
    (value) => {
        if (hasMainMenu.value) {
            hasMainMenu.value = false;
        }
    },
);

watch(
    () => locale.value,
    (value) => {
        router.push({ path: `/${locale.value == 'tc' ? '' : locale.value}` });
    },
);
</script>

<style scoped>
@reference "~/assets/css/style.css";

.header {
    @apply absolute inset-x-0 top-0 z-10 bg-(--theme-color-secondary)/90;

    .inner-header {
        @apply relative mx-auto h-full w-[95%] pt-[2.08cqw] pb-[1.33cqw] @min-[1920px]:w-[90%];
    }

    &:after {
        @apply absolute inset-x-0 top-full z-1 mx-auto block h-2 w-full bg-linear-to-r from-[#826a4b] via-[#c5af7d] via-35% to-[#826a4b] content-[''];
    }
}

.logo {
    @apply relative inset-x-0 z-12 mx-auto block aspect-415/181 w-[22.39cqw] min-w-[200px] translate-x-[-2%] translate-y-[-3.8%] @min-[769px]:absolute;

    > img {
        @apply h-full w-full object-contain;
    }
}

.widgets {
    @apply flex h-full items-center justify-center gap-6 @min-[769px]:gap-[0.83cqw];
    /* absolute top-[9.6cqw] */
}

.main-menu {
    @apply @max-[768px]:fixed @max-[768px]:inset-0 @max-[768px]:z-11 @max-[768px]:bg-(--theme-color-secondary) @max-[768px]:pt-[calc(var(--header-height)+1rem)];

    .inner-main-menu {
        @apply mx-auto w-full gap-2 transition-transform duration-1000 @max-[768px]:flex @max-[768px]:translate-y-full @max-[768px]:flex-col @min-[769px]:grid @min-[769px]:grid-cols-8 @min-[769px]:gap-[2.92cqw];
    }

    .inner-menu {
        @apply grid w-full @max-[768px]:gap-y-1 @min-[769px]:pb-1;
    }

    .menu-item {
        @apply flex items-center justify-center text-center @max-[768px]:w-full;

        > a {
            @apply relative block px-2 tracking-widest whitespace-nowrap text-(--theme-color-primary) @max-[768px]:w-full @max-[768px]:p-2;

            &:before {
                @apply absolute inset-x-0 bottom-[calc(100%+0.4em)] mx-auto block aspect-square w-[0.31cqw] max-w-1.5 translate-y-[150%] scale-0 rounded-full bg-(--theme-color-primary) transition-transform duration-500 content-[''];
            }

            &:after {
                @apply absolute inset-x-0 top-[calc(100%+2px)] block h-0.5 w-full scale-x-0 transition-transform duration-500 content-[''];
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
            > a {
                &:before {
                    @apply @min-[768px]:translate-y-0 @min-[768px]:scale-100;
                }

                &:after {
                    @apply @min-[768px]:scale-x-100;
                }
            }
        }
    }

    html:not([data-lang="en"]) & {
        .menu-item {
            > a {
                @apply min-[1920px]:text-[1.25em] @min-[768px]:text-[1.04cqw];
            }
        }
    }

    html[data-lang="en"] & {
        .menu-item {
            > a {
                @apply leading-[1.1] whitespace-normal @min-[768px]:text-[0.83cqw] @min-[1920px]:text-[1em];
            }
        }
    }
}

.btn-menu {
    @apply pointer-events-auto absolute inset-y-0 right-0 z-12 my-auto flex h-8 w-8 cursor-pointer flex-col items-center justify-between p-[6px_4px];

    > div {
        @apply relative h-0.5 w-full rounded-full bg-(--theme-color-primary,#FFF) transition-all duration-500;

        &:nth-child(2) {
            &:before,
            &:after {
                @apply absolute h-0.5 w-full rounded-full bg-(--theme-color-primary,#FFF) opacity-0 transition-all duration-500 content-[''];
            }
        }
    }

    &.active {
        > div {
            &:first-child {
                @apply translate-y-full;
            }

            &:last-child {
                @apply -translate-y-full;
            }

            &:nth-child(2) {
                @apply bg-white/0;

                &:before {
                    @apply rotate-45 opacity-100;
                }

                &:after {
                    @apply -rotate-45 opacity-100;
                }
            }

            &:not(:nth-child(2)) {
                @apply invisible opacity-0;
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
            <div
                class="btn-menu"
                :class="{ active: hasMainMenu }"
                @click="hasMainMenu = !hasMainMenu"
                v-if="viewPort == 'mobile'"
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
            >
                <div
                    class="main-menu"
                    v-if="viewPort == 'desktop' || hasMainMenu"
                    ref="mainMenu"
                >
                    <div
                        class="inner-main-menu"
                        :class="{ '@max-[768px]:translate-y-0!': hasMainMenu }"
                    >
                        <div
                            class="flex items-start @min-[768px]:col-span-3 @min-[768px]:items-end @min-[768px]:justify-between"
                        >
                            <div class="inner-menu @min-[768px]:grid-cols-5">
                                <div
                                    class="@max-[768px]:my-4 @min-[768px]:col-span-2"
                                >
                                    <div class="widgets">
                                        <SocialMedia
                                            @clicked="wechatQr = true"
                                        />
                                        <LangSwtich />
                                    </div>
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/sales-brochure`"
                                        >{{
                                            t("sales-brochure")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/price-list`"
                                        >{{ t("price-list") }}</NuxtLinkLocale
                                    >
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/sales-arrangements`"
                                        >{{
                                            t("sales-arrangements")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class="col-span-2 mx-auto aspect-415/181 w-full @max-[768px]:hidden"
                        ></div>
                        <div
                            class="flex items-end justify-between @min-[768px]:col-span-3"
                        >
                            <div class="inner-menu @min-[768px]:grid-cols-4">
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/tender-documents`"
                                        >{{
                                            t("tender-documents")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/register-of-transactions`"
                                        >{{
                                            t("register-of-transactions")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/deed-of-mutual-covenant`"
                                        >{{
                                            t("deed-of-mutual-covenant")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                                <div class="menu-item">
                                    <NuxtLinkLocale
                                        :to="`/sales-info/aerial-photograph`"
                                        >{{
                                            t("aerial-photograph")
                                        }}</NuxtLinkLocale
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
