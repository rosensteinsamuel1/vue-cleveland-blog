<template>
  <div>
    <app-header />
    <div id="show-blogs">
      <div class="blog-container">
        <div id="loading" v-if="loading">
          <h4>Posts are loading...</h4>
        </div>
        <div id="all-blogs" v-if="!loading">
          <input
            class="search-bar"
            type="text"
            v-model="search"
            placeholder="Search blogs or authors"
          />
          <div class="single-blog" v-for="blog in filterBlogs" v-bind:key="blog.id">
            <router-link v-bind:to="'/blog/' + blog.id">
              <single-blog v-bind:blog="blog" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBlog from "./SingleBlog";
import Header from "./Header";
import { mapState } from "vuex";

export default {
  components: {
    "single-blog": SingleBlog,
    "app-header": Header
  },
  data() {
    return {
      search: "",
      signedIn: true
    };
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

.search-bar {
  padding: 2px;
  font-size: 1rem;
  margin: 0 auto;
  display: block;
  width: 60%;
}
</style>