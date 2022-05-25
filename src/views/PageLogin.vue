<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button @click="googleSignin">Login with Google</ion-button>
      {{ user }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { initializeApp, FirebaseOptions } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB7R5pFg9qeoDVGha2mBpCMzziQ7x0rfyA",
  authDomain: "test-49d01.firebaseapp.com",
  projectId: "test-49d01",
  storageBucket: "test-49d01.appspot.com",
  messagingSenderId: "863141653950",
  appId: "1:863141653950:web:86813dbabb9bbec54dddef",
};

initializeApp(firebaseConfig);

import { isPlatform } from "@ionic/vue";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { defineComponent } from "vue";
import { IonButton, IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "PageLogin",
  data() {
    return {
      user: "",
    };
  },
  components: {
    IonPage,
    IonButton,
    IonContent,
  },
  methods: {
    async googleSignin() {
      const result = await FirebaseAuthentication.signInWithApple();
      this.user = JSON.stringify(result.user);
    },
  },
  computed: {
    isWeb() {
      return !isPlatform("ios") && !isPlatform("android");
    },
  },
});
</script>
