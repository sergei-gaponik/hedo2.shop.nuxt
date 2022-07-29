<template>
  <div v-if="step == 1">
    <page-title-m
      :title="$t('resetPassword')"
      backButton
      @back="$emit('setPage', 'signIn')"
    />
    <div class="mb4">
      <p>{{ $t("resetPasswordSubHeading") }}</p>
    </div>
    <form @submit.prevent="submitStep1">
      <div class="mb4">
        <text-input
          type="email"
          :placeholder="$t('email')"
          :caption="$t('email')"
          v-model="email"
          required
        />
      </div>
      <div class="a-actions">
        <span>
          <div v-if="noAccountLink">
            <span class="nowrap">{{ $t("noAccount") }}&nbsp;</span>
            <span class="link" @click="$emit('setPage', 'signUp')">{{
              $t("signUp")
            }}</span>
          </div>
        </span>
        <primary-button minContent submit>{{ $t("sendCode") }}</primary-button>
      </div>
    </form>
  </div>
  <div v-else>
    <page-title-m
      :title="$t('resetPassword')"
      backButton
      @back="$emit('setPage', 'signIn')"
    />
    <div class="mb4">
      <p>{{ $t("resetPasswordSubHeading2") }}</p>
    </div>
    <form @submit.prevent="submitStep2">
      <div class="mb4">
        <text-input
          type="text"
          :placeholder="$t('verificationCode')"
          :caption="$t('verificationCode')"
          v-model="verificationCode"
          required
        />
        <text-input
          type="password"
          :placeholder="$t('newPassword')"
          :caption="$t('newPassword')"
          v-model="newPassword"
          required
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          :info="$t('passwordRequiredPattern')"
        />
        <text-input
          type="password"
          :caption="$t('repeatNewPassword')"
          :placeholder="$t('repeatNewPassword')"
          required
          v-model="repeatPassword"
        />
      </div>
      <div class="a-actions">
        <span></span>
        <primary-button minContent submit>{{
          $t("resetPassword")
        }}</primary-button>
      </div>
    </form>
  </div>
</template>

<script>
import TextInput from "~/components/layout/inputs/TextInput.vue";
import PrimaryButton from "~/components/layout/buttons/PrimaryButton.vue";
import auth from "~/core/auth";
import { sanitizeEmailAddress } from "~/util/email";
import PageTitleM from "~/components/layout/header/PageTitleM.vue";

export default {
  components: { TextInput, PrimaryButton, PageTitleM },
  props: {
    noAccountLink: Boolean,
  },
  data() {
    return {
      email: "",
      verificationCode: "",
      newPassword: "",
      repeatPassword: "",
      step: 1,
    };
  },
  methods: {
    async submitStep1() {
      const email = sanitizeEmailAddress(this.email);

      try {
        this.$store.commit("loadingState/isLoading");
        await auth().forgotPassword(email);
        this.$store.commit("loadingState/isReady");
      } catch (e) {
        console.log(e);
        if (e.name == "LimitExceededException")
          this.$store.dispatch(
            "notifications/error",
            this.$t("limitExceededError")
          );
        else this.$store.dispatch("notifications/error", this.$t("error"));
        return;
      }

      this.step = 2;
    },
    async submitStep2() {
      const email = sanitizeEmailAddress(this.email);

      try {
        if (this.repeatPassword != this.newPassword) {
          this.$store.dispatch(
            "notifications/error",
            this.$t("passwordsDontMatch")
          );
          return;
        }

        this.$store.commit("loadingState/isLoading");
        await auth().forgotPasswordSubmit(
          email,
          this.verificationCode,
          this.newPassword
        );
        await auth().signIn(email, this.newPassword);
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

<style scoped>
.a-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
