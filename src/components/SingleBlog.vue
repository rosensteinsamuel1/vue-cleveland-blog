<template>
  <div class="single-post">
    <h2>{{blog.title | toUpperCase}}</h2>
    <p>{{blog.content}}</p>
    <div class="post-information">
      <p>Submitted by: {{blog.author}}</p>
      <p>Date: {{blog.timestamp | formatTimestamp}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blog"],
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    },
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
.post-information {
  display: flex;
  justify-content: space-between;
}

.single-post {
  background-color: rgb(255, 255, 255);
  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 11px;
  box-shadow: -8px 11px 5px -1px rgba(199, 199, 199, 0.69);
}

:hover .single-post {
  background-color: rgb(255, 255, 255);
}

.single-post p {
  padding: 5px;
}
</style>