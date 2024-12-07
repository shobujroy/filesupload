<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height my-8">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="6" lg="5" sm="6" class="pa-7">
            <h1>Forgot Password</h1>
            <p class="text-medium-emphasis">
              Enter your email address to reset your password.
            </p>

            <v-form ref="ForgotPasswordForm" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email"
                  >Email</label
                >
                <VTextField
                  :rules="[ruleRequired]"
                  @keyup.enter="sendResetLink"
                  v-model="email"
                  append-icon="mdi-mail"
                  id="email"
                  filled
                  name="email"
                  type="email"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="sendResetLink"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                  >Send Reset Link</VBtn
                >
                <div class="text-center">
                  <nuxt-link class="primary--text" to="/login">
                    Sign in!</nuxt-link
                  >
                </div>
              </div>
            </v-form>
          </VCol>
          <VCol
            class="hidden-md-and-down fill-height"
            md="6"
            lg="7"
            @click="$router.push('/')"
            style="cursor: pointer"
          >
            <VImg
              height="100%"
              src="/app_bg.png"
              lazy-src="/app_bg.png"
              cover
              class="h-100 rounded-xl d-flex align-center justify-center"
            >
              <div class="text-center w-50 white--text mx-auto">
                <v-img
                  src="/logo-taxpert.png"
                  lazy-src="/logo-taxpert.png"
                  :height="290"
                  contain
                />
              </div>
            </VImg>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "public",

  data() {
    return {
      loading: false,
      email: null,
      ruleRequired: (value) => !!value || "Required.",
    };
  },
  methods: {
    async sendResetLink() {
      if (this.$refs.ForgotPasswordForm.validate()) {
        try {
          this.loading = true;
          this.$store.dispatch("initLoader", true);

          // Send reset link logic
          await this.$api.authService
            .forgotPassword({
              email: this.email,
            })
            .then((res) => {
              console.log(res);
              if (res?.status) {
                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-end",
                  icon: "success",
                  text: "Reset link sent successfully!",
                  showConfirmButton: false,
                  timer: 5000,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener(
                      "mouseleave",
                      this.$swal.resumeTimer
                    );
                  },
                });
              } else {
                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-end",
                  icon: "error",
                  text: "User not Found!",
                  showConfirmButton: false,
                  timer: 5000,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener(
                      "mouseleave",
                      this.$swal.resumeTimer
                    );
                  },
                });
              }
            })
            .finally(() => {
              this.loading = false;
              this.$store.dispatch("initLoader", false);
            });
        } catch (error) {
          console.log(error);
          this.loading = false;

          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Failed to send reset link. Try again!",
            showConfirmButton: false,
            timer: 5000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });
        }
      }
    },
  },
};
</script>
