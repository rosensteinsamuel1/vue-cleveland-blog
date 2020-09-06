<template>
  <div>
    <!-- <button id="add-blog-btn" @click="showModal = true">Add New Blog</button> -->
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Publish a New Blog Post</h3>
      <div slot="body">
        <p>
          <i>Please enter the title, author and content of your complaint about Cleveland sports. When finished, press submit to pulish the post.</i>
        </p>
        <form>
          <label>Title:</label>
          <input type="text" required v-model="blog.title" />

          <div class="radio-buttons">
            <label for="one">Standard</label>
            <input type="radio" id="standard" v-bind:value="false" v-model="blog.isMarkdown" />
            <label for="two">Markdown</label>
            <input type="radio" id="markdown" v-bind:value="true" v-model="blog.isMarkdown" />
          </div>

          <label>Content:</label>
          <textarea type="text" required rows="4" v-model="blog.content" maxlength="140" />

          <markdown-preview v-if="blog.isMarkdown" v-bind:content="blog.content" />

          <label>Topic</label>
          <select v-model="blog.topic">
            <option v-for="topic in topics" v-bind:key="topic.id">{{topic}}</option>
          </select>
          <Label>Add Image</Label>
          <input type="file" @change="onFileSelected" accept="image/*" />
          <img v-if="imageUrl" v-bind:src="imageUrl" alt height="150" />
          <div class="buttons">
            <button v-on:click.prevent="post" v-on:click="showModal=false">Submit</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import MarkdownPreview from "./MarkdownPreview";
import { mapState } from "vuex";

export default {
  components: {
    modal: Modal,
    "markdown-preview": MarkdownPreview
  },
  data() {
    return {
      showModal: false,
      blog: {
        title: "",
        content: "",
        topic: "",
        selectedImage: null,
        // imageName: "",
        timestamp: Date.now(),
        isMarkdown: false
      },
      imageUrl: null,
      topics: ["Browns", "Indians", "Cavs", "Other"],
      submitted: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    show: function() {
      this.showModal = true;
    },
    post: function() {
      console.log({ ...this.blog });
      this.$store.dispatch("addNewBlog", this.blog);
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
    }
  }
};
</script>

<style scoped>
button {
  padding: 2px;
  margin-top: 15px;
  font-size: 1rem;
}

p {
  font-size: 1rem;
  margin: 5px 3px;
}

input,
textarea,
select {
  padding: 5px;
  margin: 5px 0;
  width: 100%;
}

.radio-buttons {
  display: flex;
  width: 30%;
}
</style>