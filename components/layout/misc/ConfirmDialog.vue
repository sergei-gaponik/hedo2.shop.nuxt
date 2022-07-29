<template>
  <pop-up
    :show="$store.state.confirmDialog.visible"
    @close="_resolve(false)"
    height="min-content"
    width="90%"
    maxWidth="420px"
    zIndex="10000"
  >
    <div class="container">
      <div class="mb4">
        <h4>{{ $store.state.confirmDialog.message }}</h4>
      </div>
      <div class="btn-group-h">
        <primary-button @click="_resolve(true)">{{ $t("ok") }}</primary-button>
        <secondary-button @click="_resolve(false)">{{
          $t("cancel")
        }}</secondary-button>
      </div>
    </div>
  </pop-up>
</template>

<script lang="ts">
import PopUp from "./PopUp.vue";
import PrimaryButton from "~/components/layout/buttons/PrimaryButton.vue";
import SecondaryButton from "~/components/layout/buttons/SecondaryButton.vue";

export default {
  components: { PopUp, PrimaryButton, SecondaryButton },
  methods: {
    _resolve(state) {
      this.$store.commit("confirmDialog/setStatus", state);
    },
  },
};
</script>

<style scoped></style>
