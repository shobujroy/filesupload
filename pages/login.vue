<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height my-8">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="6" lg="5" sm="6" class="pa-7">
            <h1>Sign In</h1>
            <p class="text-medium-emphasis">
              Enter your details to get started.
            </p>

            <v-form ref="LoginForm" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email"
                  >Email</label
                >
                <VTextField
                  :rules="[ruleRequired]"
                  @keyup.enter="userLogin"
                  v-model="email"
                  append-icon="mdi-mail"
                  id="email"
                  filled
                  name="email"
                  type="email"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password"
                  >Password</label
                >
                <VTextField
                  :rules="[ruleRequired]"
                  v-model="password"
                  :type="show1 ? 'text' : 'password'"
                  filled
                  @click:append="show1 = !show1"
                  @keyup.enter="userLogin"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  id="password"
                  name="password"
                />
              </div>
              <nuxt-link class="primary--text" to="/forgot-password"
                >Forgot password?</nuxt-link
              >
              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="userLogin"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                  >Sign In</VBtn
                >
                <div class="text-center">
                  <nuxt-link class="primary--text" to="/sign-up"
                    >Don't have an account? Sign up!</nuxt-link
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
  // layout: "no-auth",
  auth: "guest",
  middleware: "public",

  data() {
    return {
      loading: false,
      show1: false,
      name: null,
      email: null,
      password: null,
      ruleRequired: (value) => !!value || "Required.",
      rulePassLen: (value) =>
        value?.length >= 8 || "Password be of at least 8 characters.",
    };
  },
  created() {
    if (this.$route.path === "/login/") {
      window.location.href = "../";
      return;
    }
  },
  mounted() {
    if (localStorage.getItem("admin")) {
      this.$router.push("/admin/dashboard");
    }
    if (localStorage.getItem("user")) {
      this.$router.push("/user/dashboard");
    }
  },
  methods: {
    async userLogin() {
      if (this.$refs.LoginForm.validate()) {
        try {
          this.loading = true;
          this.$store.dispatch("initLoader", true);

          // console.log("dispatch");

          await this.$auth
            .loginWith("local", {
              data: {
                email: this.email,
                password: this.password,
              },
            })
            .then((response) => {
              console.log("dispatch log", response);
              if (response?.data?.status) {
                if (response?.data?.data?.role_id === 1) {
                  localStorage.setItem("admin", response?.data?.status);
                  localStorage.setItem("admin-email", this.email);

                  this.$router.push("/admin/dashboard");
                } else if (response?.data?.data?.role_id === 2) {
                  localStorage.setItem("user", response?.data?.status);

                  this.$router.push("/user/dashboard");
                }

                this.$swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-end",
                  icon: "success",
                  text: "Logged in Successfully!",
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
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Invalid Credentials!",
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
