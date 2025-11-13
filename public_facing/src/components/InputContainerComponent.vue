<template>
    <div class="input-container">
        <input :type=inputType :placeholder=placeholderText :required=required v-model="inputText" @input="handleInput">
            <span class="toggle-password" v-if="visToggleable" @click="toggleVis">
                <ShowIcon v-if="hidden" width="20px"/>
                <HideIcon v-else width="20px"/>
            </span>
        </input>
    </div>
</template>

<script setup lang = "ts">
    import ShowIcon from './icons/ShowIcon.vue';
    import HideIcon from './icons/HideIcon.vue';
    import { ref } from 'vue';

    const props = defineProps<{
        placeholderText?: string
        required?: boolean
        visToggleable?: boolean
    }>();

    const placeholderText = props.placeholderText ?? "input text here";
    const required = props.required ?? false;
    const visToggleable = props.visToggleable ?? false
    const inputType = ref('');
    const hidden = ref(false); 
    const inputText = ref('');

    if (visToggleable) {
        setInputVisible(false);
    }

    function setInputVisible(visible: boolean) {
         inputType.value = visible ? "text" : "password";
    }

    function toggleVis() {
        hidden.value = !hidden.value;

        setInputVisible(!hidden.value);
    }

    const emit = defineEmits(['input-event']);

    function handleInput() {
        emit('input-event', inputText);
    }
</script>