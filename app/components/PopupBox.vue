<script setup>
import Scrollbar from "smooth-scrollbar";
const scrollbar = ref(null);

const props = defineProps({
    fixed: {
        type: Boolean,
        default: true,
    },
    hasScroll: {
        type: Boolean,
        default: true,
    },
    hasBtnClose: {
        type: Boolean,
        default: true,
    },
    hasBtnEnter: {
        type: Boolean,
        default: true,
    },
    hasOverlay: {
        type: Boolean,
        default: true,
    },
    autoHeight: {
        type: Boolean,
        default: false,
    },
    enterUrl: {
        type: String,
        default: null,
    },
});

const vScroll = {
    mounted(el, binding, vnode, prevVnode) {
        if (binding.value.hasScroll) {
            scrollbar.value = Scrollbar.init(vnode.el, {
                alwaysShowTracks: true,
                continuousScrolling: true,
            });
        }
    },
    updated(el, binding, vnode, prevVnode) {
        if (binding.value.hasScroll) {
            if (!Scrollbar.has(vnode.el)) {
                scrollbar.value = Scrollbar.init(vnode.el, {
                    alwaysShowTracks: true,
                    continuousScrolling: true,
                });
            }
        } else {
            if (scrollbar.has(vnode.el)) {
                scrollbar.destroy(vnode.el);
            }
        }
    },
    beforeUnmount(el, binding, vnode, prevVnode) {},
    unmounted(el, binding, vnode, prevVnode) {},
};

const emit = defineEmits(["closed"]);
</script>

<style scoped>
@reference "~/assets/css/style.css";

:deep(> .scrollbar-track) {
    &.scrollbar-track-y {
        @apply w-1 overflow-visible rounded-full bg-(--theme-color-primary)/15;

        .scrollbar-thumb {
            @apply w-1 overflow-visible rounded-full bg-(--theme-color-primary) @min-[992px]:-left-[2px] @min-[992px]:w-2;
        }
    }
}

.popup-box-wrapper {
    @apply inset-0 flex items-center justify-center @min-[769px]:pt-[calc(var(--header-height)+7px)] [&:not([class*='z-'])]:z-9 @max-[768px]:pt-[calc(var(--header-height)+7px)];
}

.popup-box {
    @apply relative flex h-[calc(100%-80px)] max-h-[640px] w-[calc(100%-32px)] max-w-[1225px] flex-col items-start justify-start gap-4 overflow-hidden bg-(--theme-color-secondary)/90 px-6 pt-14 pb-6 @min-[769px]:w-[calc(100%-60px)] @min-[769px]:px-(--box-x-padding,72px) @min-[769px]:pt-(--box-t-padding,104px) @min-[769px]:pb-(--box-b-padding,144px);
    .btn-close {
        @apply absolute top-4 right-3 cursor-pointer @min-[992px]:top-8 @min-[992px]:right-8;
    }

    .btn-enter {
        @apply absolute inset-x-0 bottom-10 mx-auto cursor-pointer text-[#58595b] @min-[992px]:text-[1.125em];
    }

    .content {
        @apply h-full w-full overflow-hidden;

        &:deep(a) {
            @apply font-normal break-all text-(--text-color-primary) no-underline;
        }

        &:has(div.scrollbar-track.scrollbar-track-y[style="display: block;"]) {
            @apply pr-6 @min-[992px]:pr-7;
        }
    }
}

.overlay {
    @apply absolute inset-0 -z-1 bg-white/50;
}
</style>

<template>
    <div class="popup-box-wrapper" :class="{ fixed: fixed, absolute: !fixed }">
        <div class="popup-box" :class="{ 'h-auto!': autoHeight }">
            <div class="btn-close" @click="emit('closed')" v-if="hasBtnClose">
                <NuxtLinkLocale :to="`${enterUrl}`">
                    <svgo_icon-close
                        filled
                        :fontControlled="false"
                        class="h-[1.875cqw] max-h-9 min-h-6 w-[1.875cqw] max-w-9 min-w-6"
                    />
                </NuxtLinkLocale>
            </div>
            <slot name="header" />
            <div class="content" v-scroll="{ hasScroll }">
                <slot />
            </div>
            <slot name="footer" />
            <div class="btn-enter" v-if="hasBtnEnter">
                <NuxtLinkLocale :to="`${enterUrl}`">
                    <div class="flex items-center justify-center gap-1">
                        <Translate>
                            <template #en> Enter </template>
                            <template #tc> 進入 </template>
                        </Translate>
                        <svgo_icon-enter
                            filled
                            :fontControlled="false"
                            class="w-8"
                        />
                    </div>
                </NuxtLinkLocale>
            </div>
        </div>
        <div class="overlay" v-if="hasOverlay"></div>
    </div>
</template>
