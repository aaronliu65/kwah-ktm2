<script setup></script>

<style scoped>
@reference "~/assets/css/style.css";

.video-title {
    @apply relative mt-4 text-center text-[1.25em] tracking-[0.15em] text-(--theme-color-primary);

    &:before, &:after {
        @apply absolute inset-y-0 my-auto block h-px w-5 bg-(--theme-color-primary) content-[''] ;
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
                class="flex w-[43%] aspect-814/458 max-w-[814px] cursor-pointer flex-col items-center"
            >
                <SharpImg
                    src="sales-video.webp"
                    class="h-full w-full object-contain"
                />
                <div class="video-title">銷售影片</div>
            </div>
        </div>
        <div class="absolute left-0 bottom-16">
            <div class="relative">
                <svgo_shape-title filled :fontControlled="false" class="w-[250px]" />
                <div class="absolute inset-0 px-10 flex items-center justify-end tracking-[0.05em] text-white text-[1.25em]">
                    啟德海灣1
                </div>
            </div>
        </div>
    </div>
</template>
