<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Log In</v-card-title>

        <v-card-text>
          <v-form class="mt-5 px-3" ref="form">
            <v-text-field v-model="email" label="Email" :rules="inputRules"></v-text-field>
            <v-text-field v-model="password" type="password" label="Password" :rules="inputRules"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-text v-if="error">
          <p class="red--text">{{error}}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary mx-0 mt-3" text @click="close">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Auth } from "../firebase/auth";
import { USER_GET_INFO } from "../store/action-types";

export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      username: "",
      error: "",
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"]
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      if (this.$refs.form.validate()) {
        // Log in with existing user
        Auth.signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            console.log(response.user.uid);
            // retrieve user data from Firestore
            this.$store.dispatch(USER_GET_INFO, response.user.uid);
            this.error = null;
            this.dialog = false;
          })
          .catch(error => {
            this.error = `${error.message} [${error.code}]`;
          });
      }
    }
  }
};
</script>