<i18n lang="yaml">
 en:
     sales-brochure: "Sales Brochure"
     price-list: "Price List"
     sales-arrangements: "Sales Arrangements"
     tender-documents: "Tender Documents"
     register-of-transactions: "Register of Transactions"
     deed-of-mutual-covenant: "Deed of Mutual Covenant"
     aerial-photograph: "Aerial Photograph"
 tc:
     sales-brochure: "售樓說明書"
     price-list: "價單"
     sales-arrangements: "銷售安排"
     tender-documents: "招標文件"
     register-of-transactions: "成交紀錄冊"
     deed-of-mutual-covenant: "公契"
     aerial-photograph: "鳥瞰照片"
 sc:
     sales-brochure: "售楼说明书"
     price-list: "价单"
     sales-arrangements: "销售安排"
     tender-documents: "招标文件"
     register-of-transactions: "成交纪录册"
     deed-of-mutual-covenant: "公契"
     aerial-photograph: "鸟瞰照片"
 </i18n>

<script setup>
const route = useRoute();
const { t } = useI18n();
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

useHead({
    title: `${t(route.params.slug)}`,
});
</script>

<style scoped>
@reference "~/assets/css/style.css";

.popup-box-title {
    @apply relative w-full px-16 pb-2 text-[1.46cqw] @min-[1920px]:text-[1.75em] tracking-[0.15em] text-(--theme-color-primary);

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
                class="px-16 py-7 text-[1.04cqw] @min-[1920px]:text-[1.25em] tracking-widest text-(--theme-color-primary)"
            >
                詳情容後公布
            </div>
        </PopupBox>
    </div>
</template>
