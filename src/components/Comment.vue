<template>
  <div class="comment">
    <p>{{comment.content}}</p>
    <p class="comment__author">{{comment.author}}</p>
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

<style scoped lang="scss">
.comment {
  padding: 10px;

  border-top-style: solid;
  border-width: 1px;
  border-color: black;

  &__author {
    font-weight: 600;
  }
}
</style>