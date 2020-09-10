<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Sign Up</v-card-title>

        <v-card-text>
          <v-form class="mt-5 px-3" ref="form">
            <v-text-field v-model="username" label="Username" :rules="inputRules"></v-text-field>
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
          <v-btn color="primary mx-0 mt-3" text @click="close">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { Auth } from "../firebase/auth";

import { USER_NEW_SIGN_IN } from "../store/action-types";

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
  computed: {
    ...mapState(["signedIn"])
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      if (this.$refs.form.validate()) {
        // Create new user in Firebase
        Auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(created => {
            // Save new user to Firestore
            this.$store.dispatch(USER_NEW_SIGN_IN, {
              id: created.user.uid,
              username: this.username,
              email: this.email
            });
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