<script setup>
    import NavComponent from './components/NavComponent.vue';
</script>

<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>

  <NavComponent/>
  <main>
    <RouterView />
  </main>
</template>