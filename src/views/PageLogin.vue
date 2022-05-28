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
import router from "../router";

import { defineComponent } from "vue";
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
      store,
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
      // await FirebaseAuthentication.signInWithApple();
      // this.loginLoading = false;
    },

    async googleSignin() {
      this.loginLoading = true;
      await store.dispatch.authentication.LOGIN_GOOGLE();
      await store.dispatch.userdata.FETCH_FRIENDS();
      await store.dispatch.userdata.FETCH_LOCATIONS();
      await router.push("/");
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
