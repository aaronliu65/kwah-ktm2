<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
    return locales.value;
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.lang-switch {
    @apply flex @min-[769px]:text-[0.9375cqw] @min-[1920px]:text-[1.125em];

    .lang-item {
        @apply block px-2 border-r last:border-r-0 border-(--theme-color-primary) text-(--theme-color-primary) leading-none @min-[769px]:leading-[1.04cqw]
    }
}
</style>

<template>
    <div class="lang-switch">
        <template v-for="locale in availableLocales" :key="locale.code">
            <NuxtLink
                :to="switchLocalePath(locale.code)"
                class="lang-item
                "
                v-if="locale.code != $i18n.locale"
            >
                {{ locale.name }}
            </NuxtLink>
        </template>
    </div>
</template>
