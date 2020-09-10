<template>
  <div>
    <navbar />
    <div id="show-blogs">
      <v-container class="blog-container">
        <v-container text-center>
          <v-progress-circular v-if="loading" class="ma-10 center" indeterminate color="primary"></v-progress-circular>
        </v-container>
        <div id="all-blogs" v-if="!loading">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              md="6"
              lg="4"
              xl="3"
              v-for="blog in filterBlogs"
              v-bind:key="blog.id"
            >
              <single-blog-vuetify v-bind:blog="blog" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import SingleBlogVuetify from "./SingleBlogVuetify";
import Navbar from "./Navbar";

import { GET_BLOGS } from "../store/action-types";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    "single-blog-vuetify": SingleBlogVuetify,
    navbar: Navbar
  },
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["filterBlogs"])
  },
  created: function() {
    this.$store.dispatch(GET_BLOGS);
  }
};
</script>
