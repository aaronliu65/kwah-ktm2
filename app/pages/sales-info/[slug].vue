<script setup>
const route = useRoute();
const popupBoxTitle = computed(() => {
    switch (route.params.slug) {
        case "sales-brochure":
            return "售樓說明書";
        case "price-list":
            return "價單";
        case "sales-arrangements":
            return "銷售安排";
        case "tender-documents":
            return "招標文件";
        case "register-of-transactions":
            return "成交紀錄冊";
        case "deed-of-mutual-covenant":
            return "公契";
        case "aerial-photograph":
            return "鳥瞰照片";
        default:
            return "";
    }
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.popup-box-title {
    @apply relative w-full px-16 pb-2 text-[1.75em] tracking-[0.15em] text-(--theme-color-primary);

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
                <div class="popup-box-title">{{ popupBoxTitle }}</div>
            </template>
            <div
                class="px-16 py-7 text-[1.25em] tracking-widest text-(--theme-color-primary)"
            >
                詳情容後公布
            </div>
        </PopupBox>
    </div>
</template>
