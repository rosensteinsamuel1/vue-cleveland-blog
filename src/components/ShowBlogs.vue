<template>
  <div id="show-blogs">
    <h1>All Blogs</h1>
    <router-link v-bind:to="'/add'" tag="button">Add a blog post</router-link>
    <!-- <input type="text" v-model="search" placeholder="search blogs" /> -->
    <div id="loading" v-if="loading">
      <h4>The posts are loading...</h4>
    </div>
    <div id="all-blogs" v-if="!loading">
      <div class="single-blog" v-for="blog in this.$store.state.blogs" v-bind:key="blog.id">
        <router-link v-bind:to="'/blog/' + blog.id">
          <single-blog v-bind:blog="blog" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBlog from "./SingleBlog.vue";
import { mapState } from "vuex";

export default {
  components: {
    "single-blog": SingleBlog
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"])
  },
  created: function() {
    this.$store.dispatch("getBlogs");
  }
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
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
</style>