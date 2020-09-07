<template>
  <div>
    <modal v-if="showModal" @close="showModal = false" v-bind:isAuthModal="true">
      <div slot="body" class="modal-body">
        <h2>{{newUser ? 'Sign Up': 'Log In'}}</h2>
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
          <button
            class="btn-submit"
            type="submit"
            v-on:click="showModal=false"
          >{{newUser ? 'Sign Up': 'Sign In'}}</button>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import { Auth } from "../firebase/auth";
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
    ...mapMutations(["signIn", "setUser"]),
    show: function() {
      this.showModal = true;
    },
    submit(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push("Please enter a valid email address");
      }
      if (!this.errors.length) {
        event.target.classList.add("was-validated");
        if (this.newUser) {
          // Create new user in Firebase
          Auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(created => {
              // Save new user to Firestore
              this.$store.dispatch("signInNewUser", {
                id: created.user.uid,
                username: this.username,
                email: this.email
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
              this.$store.dispatch("getUserInfo", response.user.uid);
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

// <style scoped lang="scss">
// $baby-blue: #e1faff;

// /** AUTHMODAL STYLING (inside of the Modal component) */
// .authModalContainer {
//   background: black;
//   max-width: 450px;
//   padding: 0;

//   h2 {
//     color: white;
//   }

//   form div {
//     display: flex;
//     flex-direction: column;

//     input {
//       background-color: $baby-blue;
//       margin: 10px 0;
//       padding: 5px;
//       height: 3.8rem;
//     }
//   }

//   .btn-submit {
//     height: 50px;
//     width: 100%;
//     margin: 0px;
//   }
// }
//
</style>