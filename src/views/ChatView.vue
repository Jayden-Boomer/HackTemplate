
<template>
    <div id="chatApp">
       <h2>Chat</h2> 
       <p>Chat with your personal chatbot:</p> 
      <div id="gptResponse">{{ gptResponse }}</div>
      <form id="chatForm" @submit.prevent="submit">
        <textarea v-model="message" id="mainTextbox" placeholder="Ask a question..."></textarea>
        <br>
        <button type="submit">Submit</button>
      </form>
    </div>
</template>


<script lang = "ts">
	import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ChatView',
    setup() {
      const message = ref('');
      let gptResponse = "";
      async function submit(event) {
        //this.gptResponse = this.message;
        //this.message = null
        const message = this.message;
        try {
            const response = await fetch('/gpt-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
                const res = await response.json();
            if (response.ok) {
                // Append the user's message or the server's response to the gptResponse div
                this.gptResponse = res.message;
            } else {
                this.gptResponse = res.error?? 'Error Occurred'
            }

        } catch (error) {
            console.error(error);
            //document.getElementById('signupError').textContent = 'An error occurred.';
        }
      }
      return {
        message,
        gptResponse,
        submit,
      };
    },
  });
</script>

<!-- <script setup>
    async function submit(event) {
      event.preventDefault(); // Prevent page reload
      const message = this.message;
      try {
        const response = await fetch('/gpt-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        if (response.ok) {
          // Append the user's message or the server's response to the gptResponse div
          const gptResponse = data.message;
          //document.getElementById('gptResponse').innerHTML = `<p>${data.message}: \"${message}\"</p>`;
        } else {
          document.getElementById('gptResponse').innerHTML = `<p>${data.error || 'Error occurred'}</p>`;
        }

      } catch (error) {
        console.error(error);
        document.getElementById('signupError').textContent = 'An error occurred.';
      }
    }
</script> -->