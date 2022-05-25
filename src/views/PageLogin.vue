<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button @click="googleSignin">Login with Google</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { isPlatform } from "@ionic/vue";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { defineComponent } from "vue";
import { IonButton, IonPage } from "@ionic/vue";

export default defineComponent({
  name: "PageLogin",
  components: {
    IonButton,
    IonPage,
  },
  methods: {
    async googleSignin() {
      await GoogleAuth.signIn();
    },
  },
  computed: {
    isWeb() {
      return !isPlatform("ios") && !isPlatform("android");
    },
  },
  mounted() {
    if (this.isWeb) {
      GoogleAuth.initialize({
        clientId:
          "863141653950-hodd959n5dtrbubu6c9onf7buvp6bjer.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
    }
  },
});
</script>