<template>
  <nav>
    <v-toolbar flat dark>
      <v-toolbar-title>
        <span class="font-weight-light">Mr.</span>
        <span>Blog</span>
      </v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-text-field
        class="mr-20"
        v-model="search"
        v-on:keyup="searchInput"
        hide-details
        prepend-icon="search"
        single-line
        placeholder="Search blogs or authors"
      ></v-text-field>

      <!-- Options for user who isn't signed in -->
      <signup-popup ref="signupPopup" />
      <v-btn v-if="!signedIn" v-on:click="signupOpen">Sign Up</v-btn>

      <login-popup ref="loginPopup" />
      <v-btn v-if="!signedIn" v-on:click="loginOpen">Log In</v-btn>

      <!-- Options for user who is signed in -->
      <v-btn v-if="signedIn">{{'Welcome, ' + user.name}}</v-btn>
      <!-- <add-blog-modal ref="addBlogModal" /> -->
      <new-blog-popup ref="newBlogPopup" />
      <v-btn v-if="signedIn" v-on:click="addBlogOpen">Add New Post</v-btn>
      <v-btn v-if="signedIn" v-on:click="logOut()">Log Out</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import NewBlogPopup from "./NewBlogPopup";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";
import { mapState } from "vuex";
import { USER_LOG_OUT } from "../store/action-types";

export default {
  components: {
    "new-blog-popup": NewBlogPopup,
    "login-popup": LoginPopup,
    "signup-popup": SignUpPopup
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapState(["signedIn", "user"])
  },
  methods: {
    searchInput() {
      this.$store.state.search = this.search;
    },
    signupOpen() {
      this.$refs.signupPopup.open();
    },
    loginOpen() {
      this.$refs.loginPopup.open();
    },
    logOut() {
      this.$store.dispatch(USER_LOG_OUT);
    },
    addBlogOpen: function() {
      this.$refs.newBlogPopup.show();
    }
  }
};
</script>
