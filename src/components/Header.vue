<template>
  <nav>
    <ul v-if="!loading">
      <li>
        <h1 class="navbar__title">All Blogs</h1>
      </li>
      <!-- Options for users that are NOT logged in -->
      <li v-if="!signedIn">
        <auth-modal ref="authModalLogIn" v-bind:newUser="false" />
        <a href="#" v-on:click="logIn">Log In</a>
      </li>
      <li v-if="!signedIn">
        <auth-modal ref="authModal" v-bind:newUser="true" />
        <a href="#" v-on:click="signUp">Sign Up</a>
      </li>

      <!-- Options for users that are logged in -->
      <li v-if="signedIn">
        <a href="#">{{'Welcome, ' + user.name}}</a>
      </li>
      <li v-if="signedIn">
        <add-blog-modal ref="addBlogModal" />
        <a href="#" v-on:click="addBlog">Add New Post</a>
      </li>
      <li v-if="signedIn">
        <a href="#" v-on:click="logOut()">Log Out</a>
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
  computed: {
    ...mapState(["signedIn", "user", "loading"])
  },
  methods: {
    logIn: function() {
      this.$refs.authModalLogIn.show();
    },
    logOut: function() {
      this.$store.dispatch("logOut");
    },
    signUp: function() {
      this.$refs.authModal.show();
    },
    addBlog: function() {
      this.$refs.addBlogModal.show();
    }
  }
};
</script>

<style scoped lang=scss>
$baby-blue: #e1faff;
$dark-blue-1: #79beee;

/* NAVBAR STYLES */
.navbar {
  &__title {
    color: $dark-blue-1;
  }
}

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
  text-decoration: none;
  color: $dark-blue-1;
  font-weight: 600;
}

/** AUTHMODAL STYLES */
</style>