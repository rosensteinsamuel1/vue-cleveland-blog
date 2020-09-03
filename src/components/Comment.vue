<template>
  <div class="comment">
    <h4>{{comment.content}}</h4>
    <p>{{comment.author}}</p>
    <p>{{comment.date}}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.comment {
  padding: 10px;
}
</style>