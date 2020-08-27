<template>
  <div id="app">
    <add-blog />
    <show-blogs />
  </div>
</template>

<script>
import AddBlog from "./components/AddBlog";
import ShowBlogs from "./components/ShowBlogs";

export default {
  name: "App",
  components: {
    "add-blog": AddBlog,
    "show-blogs": ShowBlogs
  }
};
</script>

<style>
* {
  margin: 0;
}
</style>
