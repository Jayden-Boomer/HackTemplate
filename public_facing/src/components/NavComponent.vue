<script setup>
    import router from '../router';
    const routes = router.getRoutes();
    const routesInfo = routes.map(route => {return {path: route.path, name: route.name.toString()}});
</script>

<template>
    <nav>
        <RouterLink v-for="routeInfo of routesInfo" :to=routeInfo.path>Go to {{ routeInfo.name }}</RouterLink>
    </nav>
</template>