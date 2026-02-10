<script setup>
const route = useRoute();
const hasHeader = useState('hasHeader');
const wechatQr = useState("wechatQr");

const activeHeader = computed(()=>{
    return route.name.indexOf('index') >= 0 && hasHeader.value ? false : true;
});

// Preload background video
useHead({
    link: [
        {
            rel: 'preload',
            as: 'video',
            href: '/videos/shutterstock_1062027418.mp4',
            type: 'video/mp4'
        }
    ]
});
</script>

<template>
    <div>
        <Transition
            enter-active-class="animate__animated animate__fadeIn animate__fast"
            leave-active-class="animate__animated animate__fadeOut animate__fast"
        >
            <PopupBox
                :fixed="false"
                :hasBtnEnter="false"
                :AutoHeight="true"
                @closed="wechatQr = false"
                v-if="wechatQr"
            >
                <div class="flex h-full items-center justify-center">
                    <SharpImg src="wechat-qrcode.webp" />
                </div>
            </PopupBox>
        </Transition>
        <div class="fixed inset-0 -z-1 overflow-hidden">
            <LayoutBoard :size="'cover'">
                <video autoplay muted loop playsinline preload="metadata">
                    <source
                        src="/videos/shutterstock_1062027418.mp4"
                        type="video/mp4"
                    />
                </video>
            </LayoutBoard>
        </div>
        <Transition
            enter-active-class="animate__animated animate__fadeInDown"
            leave-active-class="animate__animated animate__fadeOutUp"
        >
            <Header v-if="activeHeader"/>
        </Transition>
        <slot />
        <Footer />
    </div>
</template>
