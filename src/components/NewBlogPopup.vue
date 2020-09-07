<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Add a new blog post</v-card-title>

        <v-card-text>
          <v-form class="mt-5 px-3" ref="form">
            <v-text-field v-model="blog.title" label="Title" :rules="inputRulesTitle"></v-text-field>
            <v-textarea v-model="blog.content" label="Content" :rules="inputRulesContent"></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary mx-0 mt-3" text @click="close">Submit new post</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      blog: {
        title: "",
        content: "",
        topic: "",
        selectedImage: null,
        timestamp: Date.now(),
        isMarkdown: false
      },
      imageUrl: null,
      submitted: false,
      inputRulesTitle: [v => v.length > 0 || "The title can't be empty"],
      inputRulesContent: [
        v => v.length >= 10 || "This content must have at least 10 characters"
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    show: function() {
      this.dialog = true;
    },
    onFileSelected(event) {
      const files = event.target.files;
      this.blog.selectedImage = files[0];

      // preview image in DOM
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    close() {
      this.dialog = false;
      this.$store.dispatch("addNewBlog", this.blog);
    }
  }
};
</script>