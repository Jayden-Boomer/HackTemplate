<template>
    <div class="input-container">
        <input :type=inputType :placeholder=placeholderText :required=required />ing/src/components
        <button @click="hideToggle()">
            <ShowIcon v-if="hidden" width="20px"/>
            <HideIcon v-else width="20px"/>
        </button>
    </div>
</template>

<script setup lang = "ts">
    import ShowIcon from './icons/ShowIcon.vue';
    import HideIcon from './icons/HideIcon.vue';
    const props = defineProps<{
        inputType?: string
        placeholderText?: string
        required?: boolean
        hideToggleable?: boolean
    }>();
            
    const inputType = props.inputType ?? "text";
    const placeholderText = props.placeholderText ?? "input text here";
    const required = props.required ?? false;
    const hideToggleable = props.hideToggleable ?? false

    let hidden = false; 
    // let hideToggleIcon =
    function hideToggle() {

    }
</script>