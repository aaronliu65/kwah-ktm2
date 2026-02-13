<template>
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>

<style scoped>
@reference "~/assets/css/style.css";
.spinner {
    @apply mx-auto mt-[1.75em] w-[70px] text-center;

    > div {
        @apply inline-block h-[18px] w-[18px] rounded-full bg-(--theme-color-primary);
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
}

@keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
