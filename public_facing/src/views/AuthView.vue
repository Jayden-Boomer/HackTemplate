<script>
import AuthFormComponent from '../components/auth/AuthFormComponent.vue'
</script>

<template>
  <div class="login-container" id="loginContainer">
    <AuthFormComponent/>
    <h2>Sign Up</h2>
    <form id="signupForm">
      <div class="input-container">
        <input type="text" id="signupUsername" placeholder="Username" required />
      </div>
      <div class="input-container">
        <input type="password" id="signupPassword" placeholder="Password" required />
        <span class="toggle-password" data-target="signupPassword">👁</span>
      </div>
      <button type="submit">Sign Up</button>
      <div id="signupError" class="error"></div>
    </form>
    <hr>
    <h2>Sign In</h2>
    <form id="signinForm">
      <div class="input-container">
        <input type="text" id="signinUsername" placeholder="Username" required />
      </div>
      <div class="input-container">
        <input type="password" id="signinPassword" placeholder="Password" required />
        <span class="toggle-password" data-target="signinPassword">👁</span>
      </div>
      <button type="submit">Sign In</button>
      <div id="signinError" class="error"></div>
    </form>
  </div>
</template>