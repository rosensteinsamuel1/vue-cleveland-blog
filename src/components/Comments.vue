<template>
  <div class="comments">
    <div>
      <a
        class="show-comments"
        href="#"
        v-on:click="showComments=!showComments"
        v-if="comments.length > 0"
      >{{showComments? 'Hide':`Show Comments (${comments.length})`}}</a>
      <div v-if="showComments" class="comment-list">
        <div v-for="comment in comments" v-bind:key="comment.id">
          <comment v-bind:comment="comment" />
        </div>
      </div>
    </div>

    <!-- Add new comment if signed in -->

    <add-comment-modal ref="addCommentModal" v-bind:blogId="blogId" />
    <a href="#" v-if="signedIn" v-on:click="addComment" class="add-comment">Add Comment</a>

    <auth-modal ref="authModalLogin" />
    <a href="#" v-if="!signedIn" v-on:click="logIn" class="add-comment">Sign in to comment</a>
  </div>
</template>

<script>
import Comment from "./Comment";
import AddCommentModal from "./AddCommentModal";
import AuthModal from "./AuthModal";
import { mapState } from "vuex";

export default {
  components: {
    comment: Comment,
    "add-comment-modal": AddCommentModal,
    "auth-modal": AuthModal
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    blogId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showComments: false
    };
  },
  computed: {
    ...mapState(["signedIn"])
  },
  methods: {
    addComment: function() {
      this.$refs.addCommentModal.show();
    },
    logIn: function() {
      this.$refs.authModalLogin.show();
    }
  }
};
</script>

<style scoped lang=scss>
$baby-blue: #e1faff;

.comments {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  border-top-style: solid;
  border-width: 1px;
  border-color: black;
  background-color: $baby-blue;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
  }
}

.show-comments {
  margin-left: auto;
}
a {
  text-decoration: none;
}
</style>