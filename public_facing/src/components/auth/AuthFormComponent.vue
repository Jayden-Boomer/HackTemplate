<template>
    <h2>{{title}}</h2>
    <form id="authForm">
        <InputContainerComponent input-type="text" placeholder-text="Username" :required="true" @input-event="updateUsername"/>
        <InputContainerComponent input-type="password" placeholder-text="Password" :vis-toggleable="true" :required="true" @input-event="updatePassword"/>
      <!-- <div class="input-container">
        <input type="text" id="username" placeholder="Username" required />
      </div>
      <div class="input-container">
        <input type="password" id="signupPassword" placeholder="Password" required />
        <span class="toggle-password" data-target="signupPassword">👁</span>
      </div> -->
      <button type="submit">{{ title }}</button>
      <div id="authError" class="error"></div>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import InputContainerComponent from '../InputContainerComponent.vue';

    const props = defineProps<{
        title: string
    }>();
    
    const title = ref(props.title);
    let username = '';
    let password = '';

    function updateUsername(inputValue) {
        username = inputValue;
    }

    function updatePassword(inputValue) {
        password = inputValue;
    }
</script>