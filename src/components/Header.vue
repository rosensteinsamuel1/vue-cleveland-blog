<template>
  <nav>
    <ul>
      <li>
        <h1>All Blogs</h1>
      </li>
      <!-- Options for users that are NOT logged in -->
      <li v-if="!signedIn">
        <a href="#" v-on:click="logIn()">Log In</a>
      </li>
      <li v-if="!signedIn">
        <auth-modal ref="authModal" />
        <a href="#" v-on:click="signUp">Sign Up</a>
      </li>

      <!-- Options for users that are logged in -->
      <li v-if="signedIn">
        <a href="#" v-on:click="logOut()">Log Out</a>
      </li>
      <li v-if="signedIn">
        <!-- <a href="#" v-on:click="go to addBlogModal">Add New Post</a> -->
        <add-blog-modal />
      </li>
    </ul>
  </nav>
</template>

<script>
import AddBlogModal from "./AddBlogModal";
import AuthModal from "./AuthModal";
import { mapState } from "vuex";

export default {
  components: {
    "add-blog-modal": AddBlogModal,
    "auth-modal": AuthModal
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    logIn: function() {
      console.log("logIn");
    },
    // signUp: function() {
    //   console.log("signUp");
    // },
    logOut: function() {
      console.log("logOut");
    },
    signUp: function() {
      this.$refs.authModal.show();
    }
  },

  computed: {
    ...mapState(["signedIn"])
  }
};
</script>

<style scoped>
/* NAVBAR STYLES */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: right;
}

li:first-child {
  float: left;
}

a {
  display: block;
  padding: 8px;
  background-color: #dddddd;
}
</style>