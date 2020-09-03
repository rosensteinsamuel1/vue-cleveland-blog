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
          <!-- <label>Author:</label>
          <input type="text" required v-model="blog.author" />-->
          <label>Content:</label>
          <textarea type="text" required rows="4" v-model="blog.content" />

          <label>Topic</label>
          <select v-model="blog.topic">
            <option v-for="topic in topics" v-bind:key="topic.id">{{topic}}</option>
          </select>
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
import { DB } from "../firebase/db";
import { mapState } from "vuex";

export default {
  components: {
    modal: Modal
  },
  data() {
    return {
      showModal: false,
      blog: {
        title: "",
        content: "",
        topic: "",
        timestamp: Date.now()
      },
      topics: ["Browns", "Indians", "Cavs", "Other"],
      submitted: false
    };
  },
  computed: {
    ...mapState(["username"])
  },
  methods: {
    show: function() {
      this.showModal = true;
    },
    post: function() {
      console.log({ ...this.blog });
      DB.collection("posts")
        .doc()
        .set({ ...this.blog, author: this.username });
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
</style>