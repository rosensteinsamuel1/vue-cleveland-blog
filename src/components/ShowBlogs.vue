<template>
  <div id="show-blogs">
    <register-user />
    <nav>
      <ul>
        <h1>All Blogs</h1>

        <!-- Options for users that are NOT logged in -->
        <li v-if="!signedIn">
          <a href="#" v-on:click="logIn()">Log In</a>
        </li>
        <li v-if="!signedIn">
          <a href="#" v-on:click="signUp()">Sign Up</a>
        </li>

        <!-- Options for users that are logged in -->
        <li v-if="signedIn">
          <a href="#" v-on:click="logOut()">Log Out</a>
        </li>
        <li v-if="signedIn">
          <!-- <a href="#" v-on:click="go to addBlogModal">Add New Post</a> -->
          <add-blog-modal />
        </li>

        <li>
          <input type="text" v-model="search" placeholder="search blogs or authors" />
        </li>
      </ul>
    </nav>
    <div class="blog-container">
      <div id="loading" v-if="loading">
        <h4>Posts are loading...</h4>
      </div>
      <div id="all-blogs" v-if="!loading">
        <div class="single-blog" v-for="blog in filterBlogs" v-bind:key="blog.id">
          <router-link v-bind:to="'/blog/' + blog.id">
            <single-blog v-bind:blog="blog" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBlog from "./SingleBlog";
import AddBlogModal from "./AddBlogModal";
import { mapState } from "vuex";

import RegisterUser from "./RegisterUser";

export default {
  components: {
    "single-blog": SingleBlog,
    "add-blog-modal": AddBlogModal,
    "register-user": RegisterUser
  },
  data() {
    return {
      search: "",
      signedIn: true
    };
  },
  methods: {
    logIn: function() {
      console.log("logIn");
    },
    signUp: function() {
      console.log("signUp");
    },
    logOut: function() {
      console.log("logOut");
    }
  },
  computed: {
    ...mapState(["loading"]),
    filterBlogs: function() {
      return this.$store.state.blogs.filter(blog => {
        return (
          blog.title.toLowerCase().match(this.search) ||
          blog.content.toLowerCase().match(this.search) ||
          blog.author.toLowerCase().match(this.search)
        );
      });
    }
  },
  created: function() {
    this.$store.dispatch("getBlogs");
  }
};
</script>

<style scoped>
/* NAVBAR STYLES */
nav {
  padding: 5px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#show-blogs {
  width: 90%;
  margin: 0 auto;
  display: flex;
}

.blog-container {
  margin: auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 10px;
  box-sizing: border-box;
}

.single-blog a {
  text-decoration: none;
  color: black;
}

#loading {
  margin-top: 25px;
}

input {
  padding: 2px;
  margin-top: 15px;
  font-size: 1rem;
}
</style>