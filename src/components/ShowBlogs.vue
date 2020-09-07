<template>
  <div>
    <navbar />
    <div id="show-blogs">
      <v-container class="blog-container">
        <v-container text-center>
          <v-progress-circular v-if="loading" class="ma-10 center" indeterminate color="primary"></v-progress-circular>
        </v-container>
        <div id="all-blogs" v-if="!loading">
          <v-container v-for="blog in filterBlogs" v-bind:key="blog.id">
            <single-blog-vuetify v-bind:blog="blog" />
          </v-container>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import SingleBlogVuetify from "./SingleBlogVuetify";
import Navbar from "./Navbar";

import { mapState } from "vuex";

export default {
  components: {
    "single-blog-vuetify": SingleBlogVuetify,
    navbar: Navbar
  },
  computed: {
    ...mapState(["loading", "filterBlogs"])
  },
  created: function() {
    this.$store.dispatch("getBlogs");
  }
};
</script>
