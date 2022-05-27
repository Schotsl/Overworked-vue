import { defineModule } from "direct-vuex";

import { Person } from "../types";
import { moduleActionContext, moduleGetterContext, ionicStore } from "../index";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export interface UserState {
  user: Person | null;
  token: string | null;
  authenticationService: "google" | "apple" | null;
}

const modules = defineModule({
  state: (): UserState => {
    return {
      user: null,
      token: null,
      authenticationService: null,
    };
  },
  getters: {
    isLoggedIn: (...args): boolean => {
      const { state } = getterContext(args);
      return state.token !== null && state.user !== null;
    },
  },
  mutations: {
    SET_USER(state, user: Person | null) {
      state.user = user;
    },
    SET_TOKEN(state, token: string | null) {
      state.token = token;
    },
    SET_AUTHENTICATION_SERVICE(
      state,
      authenticationService: "google" | "apple" | null
    ) {
      state.authenticationService = authenticationService;
    },
  },
  actions: {
    /**
     * Restore the user from the local storage.
     * @returns {Promise<boolean>} Return true when the user was restored, false otherwise.
     */
    async RESTORE_AUTH(context): Promise<boolean> {
      const { dispatch, getters } = actionContext(context);

      // Dont restore the user if the user is already logged in
      if (getters.isLoggedIn) return false;

      const authenticationService = await ionicStore.get(
        "authenticationService"
      );

      if (!authenticationService) return false;

      if (authenticationService === "google") {
        await dispatch.LOGIN_GOOGLE();
        return true;
      }

      if (authenticationService === "apple") {
        // dispatch.LOGIN_APPLE();
        console.log("Not implemented yet");
        return true;
      }

      return false;
    },
    async SAVE_AUTH(
      context,
      {
        user,
        token,
        authenticationService,
      }: {
        user: Person;
        token: string;
        authenticationService: "google" | "apple" | null;
      }
    ) {
      const { commit } = actionContext(context);

      commit.SET_TOKEN(token);
      commit.SET_USER(user);
      commit.SET_AUTHENTICATION_SERVICE(authenticationService);

      await ionicStore.set("user", user);
      await ionicStore.set("token", token);
      await ionicStore.set("authenticationService", authenticationService);
    },
    async LOGOUT(context) {
      const { commit } = actionContext(context);

      commit.SET_TOKEN(null);
      commit.SET_USER(null);
      commit.SET_AUTHENTICATION_SERVICE(null);

      await ionicStore.remove("user");
      await ionicStore.remove("token");
      await ionicStore.remove("authenticationService");
    },
    async LOGIN_GOOGLE(context) {
      const { dispatch } = actionContext(context);
      const { credential, user } =
        await FirebaseAuthentication.signInWithGoogle();

      if (!credential?.idToken) {
        throw new Error("Google sign in failed");
      }

      const body = JSON.stringify({
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoUrl,
      });

      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credential?.idToken}`,
      };

      const response = await fetch(
        `https://api.overworked.sjorsvanholst.nl/v1/person`,
        { method, headers, body }
      );
      const parsed = await response.json();

      await dispatch.SAVE_AUTH({
        user: parsed,
        token: credential!.idToken!,
        authenticationService: "google",
      });
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
