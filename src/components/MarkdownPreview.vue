<template>
  <div class="md-preview__container">
    <label v-if="!displayMode">Markdown Preview:</label>
    <vue-markdown :source="content" class="md-preview__content" />
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    displayMode: {
      type: Boolean,
      required: false
    }
  },
  components: {
    "vue-markdown": VueMarkdown
  }
};
</script>

<style scoped>
.md-preview__container {
  padding: 5px;
  margin: 5px 0;
  width: 100%;
}

.md-preview__content {
  margin-top: 10px;
}
</style>

