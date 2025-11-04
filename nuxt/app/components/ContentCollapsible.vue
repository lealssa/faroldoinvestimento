<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isExpanded: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        required: true,
    }
});

const showContent = ref(props.isExpanded);

watch(() => props.isExpanded, (newVal) => {
    showContent.value = newVal;
});
</script>

<template>
    <div class="box has-background-white-bis">

        <a class="link is-size-6 has-text-grey is-pulled-right" @click="showContent = !showContent">
            <span class="icon">
                <font-awesome-icon icon="fa-solid fa-chevron-up" class="rotate" :class="{ 'down': showContent }" />
            </span>
        </a>

        <h3 class="title is-size-4 is-size-5-mobile is-size-5-widescreen px-5 has-text-grey-dark" :id="id">
            <slot name="title"></slot>
        </h3>

        <slot v-if="showContent"></slot>

    </div>
</template>

<style scoped>
.rotate {
    transition: transform 0.2s ease-in-out;
}

.rotate.down {
    transform: rotate(180deg);
}
</style>