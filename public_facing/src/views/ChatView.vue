
<template>
    <div id="chatApp">
       <h2>Chat</h2> 
       <p>Chat with your personal chatbot:</p> 
       <p v-if="chatbotResponse" class="mt-2 text-gray-700">
        bot replied: "{{ chatbotResponse.youSent.message }}"
        </p>
      <!-- <div v-if="chatbotResponse" id="gptResponse">{{ chatbotResponse }}</div> -->
      <div v-if="errorText" id="errorText">{{ errorText }}</div>
      <form id="chatForm" @submit.prevent="submit">
        <textarea v-model="message" id="mainTextbox" placeholder="Ask a question..."></textarea>
        <br>
        <button type="submit" :disabled="loading">Submit</button>
      </form>
    </div>
</template>


<script lang = "ts">
	import { defineComponent, ref } from 'vue';
    import { makeEndpointURL } from '../utils/api';
  export default defineComponent({
    name: 'ChatView',
    setup() {
      const message = ref<any>(null);
      const chatbotResponse = ref<any>(null);
      const loading = ref(false);
      const errorText = ref<string | null>(null);


      async function submit(event) {
        loading.value = true;
        //this.gptResponse = this.message;
        //this.message = null
        try {
            const response = await fetch(makeEndpointURL("echo"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({message: message.value})
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            // Append the user's message or the server's response to the gptResponse div
            chatbotResponse.value = await response.json();
        
            
        } catch (error) {
            errorText.value = error.message;
            //document.getElementById('signupError').textContent = 'An error occurred.';
        } finally {
            loading.value = false;
        }
      }
      return {
        message,
        chatbotResponse,
        loading,
        errorText,
        submit,
      };
    },
  });
</script>