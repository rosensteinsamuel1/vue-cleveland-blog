<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    const axios = require("axios");
    axios
      .get(`https://whyamiaclevelandfan.firebaseio.com/posts/${this.id}.json`)
      .then(response => {
        console.log(response.data);
        this.blog = response.data;
      });
  }
};
</script>

<style>
#single-blog {
  padding: 20px;
  max-width: 960;
  margin: auto;
  box-sizing: border-box;
  background: #eee;
}
</style>