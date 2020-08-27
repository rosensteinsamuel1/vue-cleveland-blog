<template>
  <div id="show-blogs">
    <h1>All Blogs</h1>
    <!-- <input type="text" v-model="search" placeholder="search blogs" /> -->
    <div class="single-blog" v-for="blog in blogs" v-bind:key="blog.id">
      <router-link v-bind:to="'/blog/' + blog.id">
        <div>
          <h2>{{blog.title | toUpperCase}}</h2>
          <article>{{blog.content}}</article>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: []
    };
  },
  created: function() {
    const axios = require("axios");
    axios
      .get("https://whyamiaclevelandfan.firebaseio.com/posts.json")
      .then(data => {
        const _blogs = data.data;
        const blogsArray = [];
        for (let key in _blogs) {
          _blogs[key].id = key;
          blogsArray.push(_blogs[key]);
        }
        console.log(blogsArray);
        this.blogs = blogsArray;
      });
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
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
  background: #eee;
}
</style>