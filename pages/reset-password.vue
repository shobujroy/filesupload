<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height my-8">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="6" lg="5" sm="6" class="pa-7">
            <h1>Reset Password</h1>
            <p class="text-medium-emphasis">
              Enter your email and new password below.
            </p>

            <v-form ref="ResetForm" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email"
                  >Email</label
                >
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  type="email"
                  filled
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>

              <div class="mt-1">
                <label class="label text-grey-darken-2" for="newPassword"
                  >New Password</label
                >
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="newPassword"
                  :type="show1 ? 'text' : 'password'"
                  filled
                  @click:append="show1 = !show1"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                />
              </div>

              <div class="mt-1">
                <label class="label text-grey-darken-2" for="confirmPassword"
                  >Confirm Password</label
                >
                <VTextField
                  :rules="[ruleRequired, passwordsMatch]"
                  v-model="confirmPassword"
                  :type="show2 ? 'text' : 'password'"
                  filled
                  @click:append="show2 = !show2"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>

              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="resetPassword"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                  >Reset Password</VBtn
                >
                <div class="text-center">
                  <nuxt-link class="primary--text" to="/login"
                    >Back to Login</nuxt-link
                  >
                </div>
              </div>
            </v-form>
          </VCol>
          <VCol
            class="hidden-md-and-down fill-height"
            md="6"
            lg="7"
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
  auth: "guest",
  middleware: "public",

  data() {
    return {
      loading: false,
      show1: false,
      show2: false,
      email: null, // Added email field
      newPassword: null,
      confirmPassword: null,
      token: null,
      ruleRequired: (value) => !!value || "Required.",
      ruleEmail: (value) => {
        const pattern = /.+@.+\..+/;
        return pattern.test(value) || "Invalid email.";
      },
      rulePassLen: (value) =>
        value?.length >= 8 || "Password must be at least 8 characters.",
      passwordsMatch: (value) =>
        value === this.newPassword || "Passwords must match.",
    };
  },
  created() {
    // Check if token is present
    this.token = this.$route.query.token;
    if (!this.token) {
      this.$router.push("/forgot-password");
    }
  },
  methods: {
    async resetPassword() {
      // Validate email and passwords
      if (!this.email) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Email is required.",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Passwords do not match.",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }

      try {
        this.loading = true;
        this.$store.dispatch("initLoader", true);
        const payload = {
          token: this.token,
          email: this.email, // Added email in payload
          password: this.newPassword,
        };
        await this.$api.authService
          .updatePasswordToken(payload)
          .then((res) => {
            if (res?.status) {
              if (res.message === "Update password successfully.") {
                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-end",
                  icon: "success",
                  text: "Password reset successfully!",
                  showConfirmButton: false,
                  timer: 5000,
                });
                this.$router.push("/login");
              } else if (
                res.message ===
                "Token not verified successfully. Expired or wrong token."
              ) {
                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-end",
                  icon: "error",
                  text: "Token Expired! Please reset your password again.",
                  showConfirmButton: false,
                  timer: 5000,
                });
                this.$router.push("/forgot-password");
              }
            } else {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "error",
                text: "User Not Found!",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch("initLoader", false);
          });
      } catch (error) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Failed to reset password!",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    },
  },
};
</script>
