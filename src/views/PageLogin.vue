<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="container">
        <ion-text class="title"> 🥳🎉 </ion-text>

        <ion-button
          size="large"
          shape="round"
          class="login"
          expand="block"
          @click="appleSignin"
        >
          <ion-icon slot="start" :icon="logoApple"></ion-icon>
          Login using Apple
        </ion-button>

        <ion-button
          size="large"
          shape="round"
          class="login"
          expand="block"
          @click="googleSignin"
        >
          <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
          Login using Google
        </ion-button>

        <ion-button
          size="large"
          shape="round"
          class="login"
          expand="block"
          @click="githubSignin"
        >
          <ion-icon slot="start" :icon="logoGithub"></ion-icon>
          Login using GitHub
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { initializeApp, FirebaseOptions } from "firebase/app";

// TODO: This should be moved to a .env file
const firebaseConfig: FirebaseOptions = {
  appId: "1:863141653950:web:86813dbabb9bbec54dddef",
  apiKey: "AIzaSyB7R5pFg9qeoDVGha2mBpCMzziQ7x0rfyA",
  projectId: "test-49d01",
  authDomain: "test-49d01.firebaseapp.com",
  storageBucket: "test-49d01.appspot.com",
  messagingSenderId: "863141653950",
};

initializeApp(firebaseConfig);

import { defineComponent } from "vue";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { logoGoogle, logoApple, logoGithub } from "ionicons/icons";
import {
  IonButton,
  IonPage,
  IonContent,
  IonIcon,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";

export default defineComponent({
  name: "PageLogin",

  components: {
    IonText,
    IonIcon,
    IonPage,
    IonTitle,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
  },

  methods: {
    async appleSignin() {
      const result = await FirebaseAuthentication.signInWithApple();
      console.log(result);
    },
    async googleSignin() {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result);
    },
    async githubSignin() {
      const result = await FirebaseAuthentication.signInWithGithub();
      console.log(result);
    },
  },

  setup() {
    return {
      logoApple,
      logoGoogle,
      logoGithub,
    };
  },
});
</script>

<style>
.title {
  margin: 1.5rem 1.5rem 2rem;
  font-size: 5rem;
}

.login {
  width: 100%;
  margin: 0.75rem;
  font-size: 1.15rem;
}

.container {
  margin: 2rem 2.5rem 2.5rem;
  display: flex;

  align-items: center;
  flex-direction: column;
}
</style>
