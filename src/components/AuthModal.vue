<template>
  <div>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="body">
        <form @submit.prevent="submit">
          <h2>New User Sign Up</h2>
          <ul v-if="errors.length">
            <li v-for="error in errors" :key="error">{{error}}</li>
          </ul>

          <div>
            <input
              v-model="username"
              label="Username"
              type="text"
              required
              invalidFeedback="Please provide an username"
              placeholder="Username"
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
            <button type="submit" v-on:click="showModal=false">Sign Up</button>
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

export default {
  components: {
    modal: Modal
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errors: [],
      showModal: false
    };
  },
  methods: {
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
      //   if (this.password !== this.confirmPassword) {
      //     this.errors.push("Password do not match");
      //   }

      if (!this.errors.length) {
        event.target.classList.add("was-validated");
        Auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(created => {
            console.log(created);
            console.log(created.user.uid);
            console.log(this.username);
            DB.collection("users")
              .doc(created.user.uid)
              .set({
                username: this.username,
                email: this.email
              })
              .then(response => {
                console.log(response);
              })
              .catch(err => {
                console.log("ERROR: ", err);
              });
            // created.user.sendEmailVerification().then(() => {
            //   this.$router.push("/");
            // });
          })
          .catch(error => {
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>

<style></style>