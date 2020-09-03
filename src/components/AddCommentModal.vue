<template>
  <div>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Add a Comment</h3>
      <div slot="body">
        <form>
          <label>Comment:</label>
          <input type="text" required v-model="comment.content" />
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
import firebase from "firebase/app";

export default {
  components: {
    modal: Modal
  },
  props: {
    blogId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      comment: {
        content: "",
        timestamp: Date.now()
      },
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
      console.log({ ...this.comment });
      const docRef = DB.collection("posts").doc(this.blogId);
      docRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          ...this.comment,
          author: this.user.name
        })
      });
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