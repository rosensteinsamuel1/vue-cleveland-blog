<template>
  <div class="comments">
    <div>
      <a
        class="show-comments"
        href="#"
        v-on:click="showComments=!showComments"
      >{{showComments? 'Hide':`Show Comments (${comments.length})`}}</a>
    </div>

    <div v-if="showComments">
      <div v-for="comment in comments" v-bind:key="comment.id">
        <comment v-bind:comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";

export default {
  components: {
    comment: Comment
  },
  props: {
    comments: {
      type: Array
    },
    blogId: {
      type: String
    }
  },
  data() {
    return {
      showComments: false
    };
  }
};
</script>

<style scoped>
.comment-links {
  display: flex;
  justify-content: space-between;
}
.show-comments {
  margin-left: auto;
}
</style>