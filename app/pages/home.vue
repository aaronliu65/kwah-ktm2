<i18n lang="yaml">
en:
    title: Home
tc:
    title: 主頁
sc:
    title: 主页
</i18n>

<script setup>
const { locale, t } = useI18n();
const hasVideo = ref(false);

useHead({
    title: `${t("title")}`,
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.video-title {
    @apply relative mt-4 text-center text-[1.25em] tracking-[0.15em] text-(--theme-color-primary);

    &:before,
    &:after {
        @apply absolute inset-y-0 my-auto block h-px w-5 bg-(--theme-color-primary) content-[''];
    }

    &:before {
        @apply left-0 -translate-x-[calc(100%+8px)];
    }

    &:after {
        @apply right-0 translate-x-[calc(100%+8px)];
    }
}
</style>

<template>
    <div class="main-content bg-white/75 pt-[calc(var(--header-height)+7px)]">
        <div class="flex h-full items-center justify-center">
            <div
                class="flex aspect-814/458 w-[43%] max-w-[814px] cursor-pointer flex-col items-center"
                @click="hasVideo = true"
            >
                <SharpImg
                    src="sales-video.webp"
                    class="h-full w-full object-contain"
                />
                <div class="video-title">
                    <Translate>
                        <template #en>
                            Sales Video
                        </template>
                        <template #tc>
                            銷售影片
                        </template>
                    </Translate>
                </div>
            </div>
        </div>
        <div class="absolute bottom-16 left-0">
            <div class="relative">
                <svgo_shape-title
                    filled
                    :fontControlled="false"
                    class="w-[250px]"
                />
                <div
                    class="absolute inset-0 flex items-center justify-end px-10 text-[1.25em] tracking-[0.05em] text-white"
                >
                    啟德海灣1
                </div>
            </div>
        </div>
        <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <div class="fixed inset-0 z-20 bg-black" v-if="hasVideo">
                <div
                    class="absolute top-0 right-0 z-21 aspect-square w-10 cursor-pointer bg-(--theme-color-secondary) p-2"
                    @click="hasVideo = false"
                >
                    <div
                        class="relative h-full w-full before:absolute before:inset-0 before:m-auto before:block before:h-0.5 before:w-full before:rotate-45 before:bg-(--theme-color-primary) before:content-[''] after:absolute after:inset-0 after:m-auto after:block after:h-0.5 after:w-full after:-rotate-45 after:bg-(--theme-color-primary) after:content-['']"
                    ></div>
                </div>
                <video controls autoplay class="h-full w-full">
                    <source
                        src="https://www.ktmarina.com.hk/videos/KT_sale%20video_Design&clubhouse_CANT_3m11s_3Sep24.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </Transition>
    </div>
</template>
