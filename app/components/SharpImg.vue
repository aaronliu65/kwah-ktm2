<script setup>
import { lazyLoad } from "unlazy";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        default: "webp",
    },
    quality: {
        type: Number,
        default: 50,
    },
    width: {
        type: Number,
        default: null,
    },
    height: {
        type: Number,
        default: null,
    },
    fit: {
        type: String,
        default: "cover",
    },
    position: {
        type: String,
        default: "center",
    },
    lazyload: {
        type: Boolean,
        default: true,
    },
    nolazy: {
        type: Boolean,
        default: false,
    },
});

const unlazyImage = ref();

const placeholder = await sharp({
    src: props.src,
    width: props.width ? 50 : props.height ? null : 50,
    height: props.height
        ? props.width
            ? parseInt(50 * (props.height / props.width))
            : 50
        : null,
    fit: props.fit,
    position: props.position,
    format: props.format,
    quality: 100,
    blur: 3,
});

const renderedImg = await sharp({
    src: props.src,
    width: props.width ? props.width : null,
    height: props.height ? props.height : null,
    fit: props.fit,
    position: props.position,
    format: props.format,
    quality: props.quality,
});

const renderedImg2x = await sharp({
    src: props.src,
    width: props.width ? props.width * 2 : null,
    height: props.height ? props.height * 2 : null,
    fit: props.fit,
    position: props.position,
    format: props.format,
    quality: props.quality,
});

watch(
    () => props.lazyload,
    (value) => {
        if (
            value &&
            unlazyImage.value.getAttribute("data-srcset") &&
            !props.nolazy
        ) {
            lazyLoad(unlazyImage.value);
        }
    },
);

onMounted(() => {
    if (
        props.lazyload &&
        unlazyImage.value.getAttribute("data-srcset") &&
        !props.nolazy
    ) {
        lazyLoad(unlazyImage.value);
    }
});
</script>

<template>
    <img
        :src="placeholder"
        :srcset="`${renderedImg} 1x, ${renderedImg2x} 2x`"
        ref="unlazyImage"
        v-if="props.nolazy"
    />
    <img
        :src="placeholder"
        :data-srcset="`${renderedImg} 1x, ${renderedImg2x} 2x`"
        ref="unlazyImage"
        v-else
    />
</template>
