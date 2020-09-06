<template>
  <div>
    <div v-if="loading" class="is-loading">
      <h4>The post is loading...</h4>
    </div>
    <div class="single-post" v-if="!loading">
      <button @click="$router.push('/')">Return to posts</button>
      <h2>{{blog.title | toUpperCase}}</h2>
      <p>{{blog.content}}</p>
      <div class="post-information">
        <p>Submitted by: {{blog.author}}</p>
        <p>Date: {{blog.timestamp | formatTimestamp}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      loading: true
    };
  },
  created() {
    const axios = require("axios");
    axios
      .get(`https://whyamiaclevelandfan.firebaseio.com/posts/${this.id}.json`)
      .then(response => {
        console.log(response.data);
        this.loading = false;
        this.blog = response.data;
      });
  },
  filters: {
    formatTimestamp(value) {
      return new Date(value).toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }
};
</script>

<style scoped>
.is-loading {
  color: red;
}

.single-post {
  padding: 20px;
  max-width: 960;
  margin: auto;
  box-sizing: border-box;
  background: #eee;
}
</style>