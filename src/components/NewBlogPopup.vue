<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Add a new blog post</v-card-title>

        <v-card-text>
          <v-form class="mt-5 px-3" ref="form">
            <v-text-field v-model="blog.title" label="Title" :rules="inputRulesTitle"></v-text-field>

            <v-row align="center" justify="space-around">
              <v-switch
                v-model="blog.isMarkdown"
                class="ma-2"
                label="Is your content formatted in Markdown?"
              ></v-switch>
            </v-row>

            <v-textarea
              v-model="blog.content"
              label="Content"
              :rules="inputRulesContent"
              @keyup="getContent"
              rows="4"
            ></v-textarea>

            <div v-if="blog.isMarkdown">
              <p class="mt-10">Markdown preview</p>
              <span v-html="markdownHtml"></span>
            </div>
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
import showdown from "showdown";
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      dialog: false,
      markdownHtml: "",
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
    getContent() {
      const converter = new showdown.Converter();
      this.markdownHtml = converter.makeHtml(this.blog.content);
    },
    close() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$store.dispatch("addNewBlog", this.blog);
      }
    }
  }
};
</script>