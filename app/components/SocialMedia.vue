<script setup>
const emit = defineEmits(['clicked'])
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="px-1">
            <NuxtLinkLocale :to="`https://www.facebook.com/kwahplus`" target="_blank" class="block w-[0.9375cqw] @min-[1920px]:w-4.5">
                <svgo_icon_facebook
                    filled
                    :fontControlled="false"
                    class="fill-(--theme-color-primary)"
                />
            </NuxtLinkLocale>
        </div>
         <div class="px-1">
            <NuxtLinkLocale :to="`https://www.instagram.com/kwahplus/`" target="_blank" class="block w-[0.9375cqw] @min-[1920px]:w-4.5">
                <svgo_icon_instagram
                    filled
                    :fontControlled="false"
                    class="fill-(--theme-color-primary)"
                />
            </NuxtLinkLocale>
        </div>
         <div class="px-1">
            <div class="block w-[1.25cqw] @min-[1920px]:w-6 cursor-pointer" @click="emit('clicked')">
                <svgo_icon_wechat
                    filled
                    :fontControlled="false"
                    class="fill-(--theme-color-primary)"
                />
            </div>
        </div>
    </div>
</template>
