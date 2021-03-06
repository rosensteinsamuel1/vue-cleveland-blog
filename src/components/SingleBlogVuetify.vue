<template>
  <v-card class="mx-auto my-5" max-width="370">
    <v-img v-if="blog.imageId" v-bind:src="imageSrc" max-width="400" max-height="350"></v-img>
    <v-card-title>{{blog.title}}</v-card-title>

    <v-card-text>
      <div>Published by: {{blog.author}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <div v-if="!blog.isMarkdown">
      <v-card-text>
        <div>{{blog.content}}</div>
      </v-card-text>
    </div>
    <div v-if="blog.isMarkdown" class="ma-5">
      <span v-html="markdownHtml"></span>
    </div>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>{{blog.timestamp | formatTimestamp}}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <add-comment-popup ref="addCommentPopup" :blogId="blog.id" />
      <v-btn v-if="signedIn" color="primary mx-0 mt-3" text @click="addComment">Add a Comment</v-btn>
      <v-btn
        color="primary mx-0 mt-3"
        v-if="blog.comments"
        text
        @click="showComments = !showComments"
      >{{ `${showComments? 'Hide': 'View'} Comments (${blog.comments.length})`}}</v-btn>
    </v-card-actions>

    <v-list v-show="showComments">
      <v-divider class="mx-4"></v-divider>
      <v-list-item v-for="comment in blog.comments" v-bind:key="comment.content">
        <v-list-item-title v-text="comment.content"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import AddCommentPopup from "./AddCommentPopup";
import showdown from "showdown";
import { Storage } from "../firebase/storage";
import { mapState } from "vuex";

export default {
  components: {
    "add-comment-popup": AddCommentPopup
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markdownHtml: "",
      imageSrc: null,
      showComments: false
    };
  },
  computed: {
    ...mapState(["signedIn"])
  },
  methods: {
    addComment() {
      console.log("addcomment");
      this.$refs.addCommentPopup.open();
    }
  },
  created() {
    if (this.blog.imageId) {
      Storage.ref()
        .child(`images/${this.blog.imageId}`)
        .getDownloadURL()
        .then(url => {
          this.imageSrc = url;
        })
        .catch(err => console.log(err));
    }

    // Convert the markdown to HTML
    if (this.blog.isMarkdown) {
      const converter = new showdown.Converter();
      this.markdownHtml = converter.makeHtml(this.blog.content);
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