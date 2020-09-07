<template>
  <v-card class="mx-auto my-12" max-width="400">
    <v-img v-bind:src="imageSrc" max-width="400"></v-img>
    <v-card-title>{{blog.title}}</v-card-title>
    <v-card-text>
      <div>Published by: {{blog.author}}</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div>{{blog.content}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>{{blog.timestamp | formatTimestamp}}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions v-if="blog.comments">
      <v-btn
        flat
        color="primary mx-0 mt-3"
        @click="showComments = !showComments"
      >{{ `${showComments? 'Hide': 'View'} Comments (${blog.comments.length})`}}</v-btn>
    </v-card-actions>

    <!-- <v-scroll-y-transition group v-show="showComments"> -->
    <v-list v-show="showComments">
      <v-divider class="mx-4"></v-divider>
      <v-list-item v-for="comment in blog.comments" v-bind:key="comment.content">
        <v-list-item-title v-text="comment.content"></v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- </v-scroll-y-transition> -->
  </v-card>
</template>

<script>
// import Comments from "./Comments";
// import MarkdownPreview from "./MarkdownPreview";
import { Storage } from "../firebase/storage";
import { mapState } from "vuex";

export default {
  components: {
    // comments: Comments,
    // "markdown-preview": MarkdownPreview
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageSrc: null,
      showComments: false
    };
  },
  computed: {
    ...mapState(["signedIn"])
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