<template>
  <div id="show-blogs">
    <div class="title">
      <h1>All Blogs</h1>
      <add-blog-modal />
    </div>

    <div class="blog-container">
      <div id="loading" v-if="loading">
        <h4>Posts are loading...</h4>
      </div>
      <div id="all-blogs" v-if="!loading">
        <div class="single-blog" v-for="blog in this.$store.state.blogs" v-bind:key="blog.id">
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

export default {
  components: {
    "single-blog": SingleBlog,
    "add-blog-modal": AddBlogModal
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
  width: 90%;
  margin: 0 auto;
  display: flex;
}

h1 {
  margin-top: 15px;
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
</style>