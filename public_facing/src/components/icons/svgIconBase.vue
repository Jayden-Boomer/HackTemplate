<template>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg :width=width :height=height viewBox="0 0 48 48" :fill=fill :stroke=stroke xmlns="http://www.w3.org/2000/svg" >
    <slot/>
  </svg>
</template>

<script setup lang="ts">
    import { SVGProps } from './svgProps';

    const p = defineProps<{
        passedProps: SVGProps
    }>();

    const props = p.passedProps;

    const width = props.width ?? "800px"
    const height = props.height ?? width

    const DEFAULT_COLOR = "Black"
    let f = DEFAULT_COLOR, s = f;
    if (props.color) {
        s = f = props.color;
    }

    const fill = props.fill ?? f;
    const stroke= props.stroke ?? s;

</script>