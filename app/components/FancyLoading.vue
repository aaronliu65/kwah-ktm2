<i18n lang="yaml">
en:
    Loading: Loading ...
tc:
    Loading: 載入中 ...
</i18n>

<script setup>
const emit = defineEmits(["loaded"]);
const { t } = useI18n();
onNuxtReady(() => {
    emit("loaded");
});
</script>

<template>
    <div
        class="fixed inset-0 z-999 flex flex-wrap items-center justify-center bg-(--theme-color-secondary)/90 backdrop-blur"
    >
        <div class="flex flex-col items-center justify-center">
            <slot name="loading-icon"></slot>
            <Loader />
            <slot></slot>
        </div>
    </div>
</template>
