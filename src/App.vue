<template>
  <ion-app>
    <ion-router-outlet />
    <navigation-bar />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import NavigationBar from './components/NavigationBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    NavigationBar
  }
});
</script>