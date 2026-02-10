<i18n src="~/translates/main.yml" lang="yaml" />

<script setup>
const route = useRoute();
const { t } = useI18n();
const popupBoxTitle = computed(() => {
    switch (route.params.slug) {
        case "sales-brochure":
            return `${ t('sales-brochure') }`;
        case "price-list":
            return `${ t('price-list') }`;
        case "sales-arrangements":
            return `${ t('sales-arrangements') }`;
        case "tender-documents":
            return `${ t('tender-documents') }`;
        case "register-of-transactions":
            return `${ t('register-of-transactions') }`;
        case "deed-of-mutual-covenant":
            return `${ t('deed-of-mutual-covenant') }`;
        case "aerial-photograph":
            return `${ t('aerial-photograph') }`;
        default:
            return "";
    }
});

useHead({
    title: `${t(route.params.slug)}`,
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.popup-box-title {
    @apply relative w-full px-[3.33cqw] @min-[1920px]:px-16 pb-2 text-[1.46cqw] @min-[1920px]:text-[1.75em] tracking-[0.15em] text-(--theme-color-primary);

    &:after {
        @apply absolute inset-x-0 bottom-0 block h-0.5 w-full bg-linear-to-r from-[#826a4b] via-[#c5af7d] via-15% to-[#826a4b] content-[''];
    }
}
</style>

<template>
    <div class="main-content pt-[calc(var(--header-height)+7px)]">
        <PopupBox
            :fixed="false"
            :hasBtnEnter="false"
            class="[--box-b-padding:3.5rem] [--box-t-padding:3.5rem] [--box-x-padding:3rem]"
        >
            <template v-slot:header>
                <div class="popup-box-title">{{ $t(popupBoxTitle) }}</div>
            </template>
            <div
                class="px-[3.33cqw] py-[1.46cqw] @min-[1920px]:px-16 @min-[1920px]:py-7 text-[1.04cqw] @min-[1920px]:text-[1.25em] tracking-widest text-(--theme-color-primary)"
            >
                {{ t('Coming Soon') }}
            </div>
        </PopupBox>
    </div>
</template>
