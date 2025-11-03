<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>

  <nav>
        <RouterLink to="/">Go to Home</RouterLink>
        <RouterLink to="/about">Go to About</RouterLink>
        <RouterLink to="/auth">Go to Auth</RouterLink>
        <RouterLink to="/chat">Go to Chat</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>