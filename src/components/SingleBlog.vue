<template>
  <div class="single-post">
    <div class="single-post__content-container">
      <h2 class="single-post__title">{{blog.title | toUpperCase}}</h2>

      <p class="single-post__author">Submitted by: {{blog.author}}</p>
      <p v-if="!blog.isMarkdown">{{blog.content}}</p>

      <div v-if="blog.isMarkdown">
        <markdown-preview
          class="single-post__md-preview"
          v-bind:content="blog.content"
          v-bind:displayMode="true"
        />
        <p class="single-post__md-p">
          <i>The post is being displayed in markdown</i>
        </p>
      </div>

      <p class="single-post__date">Published: {{blog.timestamp | formatTimestamp}}</p>

      <div class="single-post__comment-links">
        <div class="single-post__add-comment">
          <add-comment-modal ref="addCommentModal" v-bind:blogId="blog.id" />
          <a href="#" v-if="signedIn" v-on:click="addComment" class="add-comment">Add Comment</a>
          <a href="#" v-if="!signedIn" class="add-comment">Sign in to comment</a>
        </div>
        <div>
          <comments v-if="blog.comments" v-bind:comments="blog.comments" v-bind:blogId="blog.id" />
        </div>
      </div>
    </div>
    <div class="single-post__image-container" v-if="blog.imageId">
      <img v-bind:src="imageSrc" />
    </div>
  </div>
</template>

<script>
import Comments from "./Comments";
import AddCommentModal from "./AddCommentModal";
import MarkdownPreview from "./MarkdownPreview";
import { Storage } from "../firebase/storage";
import { mapState } from "vuex";

export default {
  components: {
    comments: Comments,
    "add-comment-modal": AddCommentModal,
    "markdown-preview": MarkdownPreview
  },
  props: ["blog"],
  data() {
    return {
      showComments: false,
      imageSrc: null
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
          // const img = document.getElementById("blog-img");
          this.imageSrc = url;
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

<style scoped lang="scss">
$baby-blue: #e1faff;

.single-post {
  background-color: rgb(255, 255, 255);
  margin: 20px 0;
  min-height: 200px;
  border-style: solid;
  border-width: 1px;
  border-color: black;

  display: flex;
  justify-content: space-between;
  /* border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 11px;*/
  box-shadow: 5px -1px 24px 0px rgba(161, 161, 161, 1);
  &__image-container {
    width: 40%;
    border-left-style: solid;
    border-width: 1px;
    border-color: black;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &__image-container img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    flex-shrink: 0;
  }

  &__content-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__md-p {
    font-size: 0.8rem;
    text-align: right;
  }

  &__title {
    margin: 5px 0 2px 5px;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: black;
    font-weight: 700;
  }

  &__date,
  &__author {
    color: rgb(134, 135, 137);
  }

  &__md-preview {
    margin-left: 25px;
    border-style: solid;
    border-width: 1px;
    padding: 10px 5px;
    width: 90%;
  }

  &__comment-links {
    display: flex;
    background-color: $baby-blue;
    height: 25px;
    padding: 0 5px;

    border-top-style: solid;
    border-width: 1px;
    border-color: black;

    justify-content: space-between;

    a {
      text-decoration: none;
    }
  }

  p {
    padding: 5px;
  }
}

:hover .single-post {
  background-color: rgb(255, 255, 255);
}

.comment-links {
  display: flex;
  justify-content: space-between;
}

.add-comment {
  margin-right: auto;
}

.single-post {
  display: flex;
}
</style>