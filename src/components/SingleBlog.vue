<template>
  <div class="single-post">
    <h2>{{blog.title | toUpperCase}}</h2>
    <p>{{blog.content}}</p>
    <div class="post-information">
      <p>Submitted by: {{blog.author}}</p>
      <p>Date: {{blog.timestamp | formatTimestamp}}</p>
    </div>
    <div>
      <img id="blog-img" height="150" />
    </div>
    <div class="comment-links">
      <add-comment-modal ref="addCommentModal" v-bind:blogId="blog.id" />
      <a href="#" v-if="signedIn" v-on:click="addComment" class="add-comment">Add Comment</a>
      <comments v-if="blog.comments" v-bind:comments="blog.comments" v-bind:blogId="blog.id" />
    </div>
  </div>
</template>

<script>
import Comments from "./Comments";
import AddCommentModal from "./AddCommentModal";
import { Storage } from "../firebase/storage";
import { mapState } from "vuex";

export default {
  components: {
    comments: Comments,
    "add-comment-modal": AddCommentModal
  },
  props: ["blog"],
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
    }
  },
  created() {
    if (this.blog.imageId) {
      Storage.ref()
        .child(`images/${this.blog.imageId}`)
        .getDownloadURL()
        .then(url => {
          const img = document.getElementById("blog-img");
          img.src = url;
        })
        .catch(err => console.log(err));
    }
  },
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

.comment-links {
  display: flex;
  justify-content: space-between;
}

.add-comment {
  margin-right: auto;
}
</style>