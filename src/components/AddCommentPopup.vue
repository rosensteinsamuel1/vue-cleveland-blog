<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Add a comment</v-card-title>

        <v-card-text>
          <v-form class="mt-5 px-3" ref="form">
            <v-text-field v-model="comment.content" type="text" label="Comment" :rules="inputRules"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary mx-0 mt-3" text @click="close">Submit comment</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { DB } from "../firebase/db";
import firebase from "firebase/app";
import { mapState } from "vuex";

export default {
  props: {
    blogId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      inputRules: [
        v => v.length >= 10 || "Comment must be at least 10 characters"
      ],
      dialog: false,
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
    open() {
      this.dialog = true;
    },
    close() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        const docRef = DB.collection("posts").doc(this.blogId);
        docRef.update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            ...this.comment,
            author: this.user.name
          })
        });
      }
    }
  }
};
</script>