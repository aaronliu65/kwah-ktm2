<script setup>
import Scrollbar from "smooth-scrollbar";
const scrollbar = ref(null);
const hasContent = ref(false);

const props = defineProps({
    hasScroll: {
        type: Boolean,
        default: true,
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
</script>

<style scoped>
@reference "~/assets/css/style.css";

:deep(> .scrollbar-track) {
    &.scrollbar-track-y {
        @apply right-1 w-0.5 overflow-visible rounded-full bg-(--theme-color-primary)/15;

        .scrollbar-thumb {
            @apply -left-[2px] w-1.5 overflow-visible rounded-full bg-(--theme-color-primary);
        }
    }
}

.img-disclaimer {
    @apply absolute bottom-8 left-8 z-10;

    --disclaimer-text-color: white;

    .btn-disclaimer {
        @apply flex cursor-pointer items-center gap-x-2 text-[0.85em] text-(--disclaimer-text-color);

        .triangle {
            @apply h-0 w-0 border-[5px_0_5px_7px] border-solid border-transparent border-l-(--disclaimer-text-color);
        }
    }

    .box-disclaimer {
        @apply absolute bottom-[calc(100%+0.5rem)] -left-1 w-[calc(380px+1rem)] overflow-hidden bg-(--theme-color-secondary)/90 px-4 pt-8 pb-4  text-(--text-color-primary);

        .btn-close {
            @apply absolute top-2 right-2.5 cursor-pointer;
        }

        .content {
            @apply max-h-[140px] w-full overflow-hidden text-left;

            &:has(
                div.scrollbar-track.scrollbar-track-y[style="display: block;"]
            ) {
                @apply -mr-4 pr-6 @min-[992px]:-mr-4 @min-[992px]:pr-4;
            }
        }
    }
}
</style>

<template>
    <div class="img-disclaimer">
        <div class="btn-disclaimer" @click="hasContent = true">
            <div class="triangle"></div>
            <div>
                <Translate>
                    <template #en> Disclaimer </template>
                    <template #tc> 免責聲明 </template>
                </Translate>
            </div>
        </div>
        <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <div class="box-disclaimer" v-if="hasContent">
                <div class="btn-close" @click="hasContent = false">
                    <svgo_icon-close
                        filled
                        :fontControlled="false"
                        class="w-5"
                    />
                </div>
                <div class="content" v-scroll="{ hasScroll }">
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>
