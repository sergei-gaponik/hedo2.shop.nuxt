<template>
  <div :class="$device.isMobile ? 'container-m' : 'container-slim-d'">
    <div
      v-if="page == 'forgotPassword' || page == 'verifyEmail'"
      class="a-page"
    >
      <forgot-password-page
        v-if="page == 'forgotPassword'"
        noAccountLink
        @setPage="setPage"
        @success="success"
      />
      <verify-email-page
        v-if="page == 'verifyEmail'"
        :email="email"
        :password="password"
        @success="success"
      />
    </div>
    <div v-else>
      <h1>{{ $t("signIn") }}</h1>
      <div :class="['a-container', $device.isMobile ? '' : 'a-td']">
        <sign-in-page
          @setPage="setPage"
          @success="success"
          @verifyEmail="verifyEmail"
        />
        <sign-up-page @success="verifyEmail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SignInPage from "~/components/pages/login/SignInPage.vue";
import SignUpPage from "~/components/pages/login/SignUpPage.vue";
import VerifyEmailPage from "~/components/pages/login/VerifyEmailPage.vue";
import ForgotPasswordPage from "~/components/pages/login/ForgotPasswordPage.vue";
import auth from "~/core/auth";

export default {
  components: { SignInPage, SignUpPage, VerifyEmailPage, ForgotPasswordPage },
  async created() {
    try {
      await auth().currentAuthenticatedUser();
      this.$router.push(this.localePath("/me"));
    } catch (e) {}
  },
  data() {
    return {
      page: null,
      email: null,
      password: null,
    };
  },
  methods: {
    success() {
      localStorage.removeItem("checkoutInfo");
      this.$store.commit("checkout/init");
      location.href = this.localePath("/me");
    },
    verifyEmail({ email, password }) {
      this.setPage("verifyEmail");
      this.email = email;
      this.password = password;
    },
    setPage(page) {
      this.page = page;
    },
  },
};
</script>

<style scoped>
.a-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--padding-x-td) * 2);
}
.a-td {
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
}
.a-page {
  max-width: var(--mobile-max);
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
