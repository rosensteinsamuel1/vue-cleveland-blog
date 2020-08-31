    <template>
  <!-- app -->
  <div id="app">
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  components: {
    modal: Modal,
    data() {
      return {
        showModal: false
      };
    }
  }
};
</script>

<style></style>