<template>
  <nav>
    <v-toolbar flat dark>
      <v-toolbar-title>
        <span class="font-weight-light">Mr.</span>
        <span>Blog</span>
      </v-toolbar-title>
      <v-spacer />
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
// import AddBlogModal from "./AddBlogModal";
import NewBlogPopup from "./NewBlogPopup";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";
import { mapState } from "vuex";

export default {
  components: {
    // "add-blog-modal": AddBlogModal,
    "new-blog-popup": NewBlogPopup,
    "login-popup": LoginPopup,
    "signup-popup": SignUpPopup
  },
  computed: {
    ...mapState(["signedIn", "user"])
  },
  methods: {
    signupOpen() {
      this.$refs.signupPopup.open();
    },
    loginOpen() {
      this.$refs.loginPopup.open();
    },
    logOut() {
      this.$store.dispatch("logOut");
    },
    addBlogOpen: function() {
      this.$refs.newBlogPopup.show();
    }
  }
};
</script>
