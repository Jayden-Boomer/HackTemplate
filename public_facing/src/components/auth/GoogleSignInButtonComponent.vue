<template>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <!-- <a href="#" @click="onSignOut">Sign out</a> -->
</template>

<script setup lang = "ts">
    import { onMounted } from 'vue';

    declare const gapi: any;

    const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID as string | undefined;

    onMounted(() => {
        const script = document.createElement('script');
        script.id = 'googlePlatform';
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        script.onload = init;
        

        document.head.appendChild(script);
        // Expose onSignIn globally for data-onsuccess="onSignIn"
        (window as any).onSignIn = onSignIn;
    });

    function init() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: `${CLIENT_ID}`,
                scope: 'profile email'
            });
        });
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    // function onSignOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //         console.log('User signed out.');
    //     });
    // }
</script>