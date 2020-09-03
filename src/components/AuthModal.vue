<template>
  <div>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="header">
        <h2>{{newUser ? 'Sign Up': 'Log In'}}</h2>
      </div>
      <div slot="body">
        <form @submit.prevent="submit">
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>

          <div>
            <input
              v-if="newUser"
              v-model="username"
              label="Name"
              type="text"
              required
              invalidFeedback="Please provide an username"
              placeholder="Name"
            />
            <input
              v-model="email"
              label="Email"
              type="email"
              required
              invalidFeedback="Please provide an email"
              placeholder="Email"
            />
            <input
              v-model="password"
              label="Password"
              type="password"
              required
              invalidFeedback="Please provide a password"
              placeholder="Password"
            />
          </div>
          <div>
            <button type="submit" v-on:click="showModal=false">{{newUser ? 'Sign Up': 'Sign In'}}</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import { Auth } from "../firebase/auth";
import { DB } from "../firebase/db";
import validate from "../modules/validation-module";
import Modal from "./Modal";

import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  props: {
    newUser: Boolean
  },
  components: {
    modal: Modal
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      errors: [],
      showModal: false
    };
  },
  computed: {
    ...mapState(["signedIn"])
  },
  methods: {
    ...mapMutations(["signIn", "setUsername"]),
    show: function() {
      this.showModal = true;
    },
    submit(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push("Please enter a valid email address");
      }
      //   if (!validate.password(this.password)) {
      //     this.errors.push("Your password is not strong enough!");
      //   }
      if (!this.errors.length) {
        event.target.classList.add("was-validated");
        if (this.newUser) {
          // Create new user in Firebase
          Auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(created => {
              DB.collection("users")
                .doc(created.user.uid)
                .set({
                  username: this.username,
                  email: this.email
                })
                .then(() => {
                  this.signIn();
                  this.setUsername({
                    username: this.username
                  });
                  // this.signedIn = true;
                })
                .catch(err => {
                  console.log("ERROR: ", err);
                });
            })
            .catch(error => {
              this.errors.push(error.message);
            });
        } else {
          // Log in with existing user
          Auth.signInWithEmailAndPassword(this.email, this.password)
            .then(response => {
              console.log(response.user.uid);
              // retrieve user data from Firestore
              DB.collection("users")
                .doc(response.user.uid)
                .get()
                .then(doc => {
                  this.signIn();
                  this.setUsername({
                    username: doc.data().username
                  });
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>

<style></style>