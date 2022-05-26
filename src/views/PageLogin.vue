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

        <template v-if="loginLoading">
          <ion-spinner name="dots" class="spinner"></ion-spinner>
        </template>
        <template v-else>
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
        </template>
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
import { logoGoogle, logoApple } from "ionicons/icons";
import {
  IonText,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonButton,
  IonSpinner,
  IonToolbar,
  IonContent,
} from "@ionic/vue";

import store from "@/store";

export default defineComponent({
  name: "PageLogin",

  data() {
    return {
      loginLoading: false,
    };
  },

  components: {
    IonText,
    IonIcon,
    IonPage,
    IonTitle,
    IonHeader,
    IonButton,
    IonSpinner,
    IonToolbar,
    IonContent,
  },

  methods: {
    async appleSignin() {
      this.loginLoading = true;
      await FirebaseAuthentication.signInWithApple();
      this.loginLoading = false;
    },
    async googleSignin() {
      this.loginLoading = true;
      const response = await FirebaseAuthentication.signInWithGoogle();

      if (!response.credential?.idToken)
        throw new Error("Google sign in failed");

      await store.dispatch.authentication.SAVE_AUTH({
        user: {
          first: "Beta",
          last: "User",
          uuid: "b4040eb2-f5ee-44e7-b286-9e32759c8ff1",
          iconUrl: "https://via.placeholder.com/50x50",
        },
        token: response.credential?.idToken,
      });

      this.loginLoading = false;
    },
  },

  setup() {
    return {
      logoApple,
      logoGoogle,
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

.spinner {
  width: 3em;
  margin: 6rem;
  height: 3em;
}

.container {
  margin: 2rem 2.5rem 2.5rem;
  display: flex;

  align-items: center;
  flex-direction: column;
}
</style>
