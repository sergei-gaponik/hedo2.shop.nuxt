<template>
  <div>
    <h2>{{ $t("verifyEmail") }}</h2>
    <div class="mb4">
      <p>{{ $t("verifyEmailSubHeading") }}</p>
    </div>
    <form @submit.prevent="submit">
      <div class="mb4">
        <text-input
          type="text"
          :placeholder="$t('verificationCode')"
          :caption="$t('verificationCode')"
          v-model="verificationCode"
          required
        />
        <span class="link" @click="resend">{{ $t("resendCode") }}</span>
      </div>
      <div class="a-actions">
        <primary-button minContent submit>{{
          $t("completeRegistration")
        }}</primary-button>
      </div>
    </form>
  </div>
</template>

<script>
import TextInput from "~/components/layout/inputs/TextInput.vue";
import PrimaryButton from "~/components/layout/buttons/PrimaryButton.vue";
import auth from "~/core/auth";
import SecondaryButton from "~/components/layout/buttons/SecondaryButton.vue";

export default {
  components: { TextInput, PrimaryButton, SecondaryButton },
  props: {
    email: String,
    password: String,
  },
  data() {
    return {
      verificationCode: "",
    };
  },
  methods: {
    async resend() {
      try {
        await auth().resendSignUp(this.email);
        this.$store.dispatch(
          "notifications/success",
          this.$t("resendCodeSuccess")
        );
      } catch (e) {
        console.log(e);
        this.$store.dispatch("notifications/error", this.$t("error"));
      }
    },
    async submit() {
      try {
        this.$store.commit("loadingState/isLoading");
        await auth().confirmSignUp(this.email, this.verificationCode);
        await auth().signIn(this.email, this.password);
        this.$store.commit("loadingState/isReady");
      } catch (e) {
        console.log(e);

        if (e.name == "CodeMismatchException")
          this.$store.dispatch(
            "notifications/error",
            this.$t("codeMismatchError")
          );
        else if (e.name == "ExpiredCodeException")
          this.$store.dispatch(
            "notifications/error",
            this.$t("codeExpiredError")
          );
        else if (e.name == "LimitExceededException")
          this.$store.dispatch(
            "notifications/error",
            this.$t("limitExceededError")
          );
        else this.$store.dispatch("notifications/error", this.$t("error"));
        return;
      }

      this.$emit("success");
    },
  },
};
</script>

<style scoped></style>
