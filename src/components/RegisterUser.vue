<template>
  <div>
    <form novalidate @submit.prevent="submit">
      <h2>New User Sign Up</h2>
      <ul v-if="errors.length">
        <li v-for="error in errors" :key="error">{{error}}</li>
      </ul>

      <div>
        <input
          v-model="email"
          label="Email"
          type="email"
          required
          invalidFeedback="Please provide an email"
        />
        <input
          v-model="password"
          label="Password"
          type="password"
          required
          invalidFeedback="Please provide a password"
        />
      </div>
      <div class="text-center">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Auth } from "../firebase/auth";
import validate from "../modules/validation-module";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errors: []
    };
  },
  methods: {
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
            created.user.sendEmailVerification().then(() => {
              this.$router.push("/user/profile");
            });
          })
          .catch(error => {
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>