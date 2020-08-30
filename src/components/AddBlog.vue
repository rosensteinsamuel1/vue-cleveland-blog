<template>
  <div id="add-blog">
    <h3>Add blog</h3>
    <button v-if="submitted" v-on:click="submitted = !submitted">Add a new blog post</button>
    <form v-if="!submitted">
      <label>Title:</label>
      <input type="text" required v-model="blog.title" />
      <label>Author:</label>
      <input type="text" required v-model="blog.author" />
      <label>Content:</label>
      <input type="text" required v-model="blog.content" />

      <label>Topic</label>
      <select v-model="blog.topic">
        <option v-for="topic in topics" v-bind:key="topic.id">{{topic}}</option>
      </select>
      <div class="buttons">
        <button v-on:click.prevent="post" @click="$router.push('/')">Add Blog Post</button>
        <button @click="$router.push('/')">Return to posts</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {
        title: "",
        author: "",
        content: "",
        topic: "",
        timestamp: Date.now()
      },
      topics: ["Browns", "Indians", "Cavs", "Other"],
      submitted: false
    };
  },
  methods: {
    post: function() {
      const axios = require("axios");
      axios
        .post(
          "https://whyamiaclevelandfan.firebaseio.com/posts.json",
          this.blog
        )
        .then(data => {
          console.log(data);
          this.submitted = true;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
</style>
