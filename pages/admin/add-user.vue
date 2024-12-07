<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="7" lg="7" sm="6" class="pa-7">
            <div class="text-center">
              <h1>Add New Admin</h1>
              <!-- <p class="text-medium-emphasis">
                  Create your account to get started.
                </p> -->
            </div>

            <v-form ref="addAdminForm" class="mt-7">
              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="firstName"
                    id="first-name"
                    outlined
                    label="First Name"
                    name="first-name"
                /></v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="lastName"
                    id="last-name"
                    outlined
                    name="last-name"
                    label="Last Name"
                /></v-col>
              </v-row>

              <VTextField
                v-model="email"
                append-icon="mdi-mail"
                id="email"
                outlined
                name="email"
                type="email"
                label="Email"
              />

              <VTextField
                v-model="phone"
                id="phone"
                outlined
                name="phone"
                type="tel"
                label="Phone"
              />
              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    @click:append="showPassword = !showPassword"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    id="password"
                    name="password"
                    label="Password"
                /></v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    outlined
                    @click:append="showConfirmPassword = !showConfirmPassword"
                    :append-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    id="confirm-password"
                    name="confirm-password"
                    label="Confirm Password"
                /></v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="address"
                    id="address"
                    outlined
                    name="address"
                    label="Address"
                /></v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="city"
                    id="city"
                    outlined
                    name="city"
                    label="City" /></v-col
              ></v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="state"
                    id="state"
                    outlined
                    name="state"
                    label="State"
                /></v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="zip"
                    id="zip"
                    outlined
                    name="zip"
                    type="number"
                    label="Zip Code" /></v-col
              ></v-row>
              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="userSignUp"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                >
                  Sign Up
                </VBtn>
                <!-- <div class="text-center">
                  <nuxt-link class="primary--text" to="/login"
                    >Already have an account? Sign In!</nuxt-link
                  >
                </div> -->
              </div>
            </v-form>
          </VCol>
        </VRow>
      </VContainer>
    </div>
  </div>
</template>

<script>
export default {
  // layout: "no-auth",
  layout: "dashboard",

  data() {
    return {
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      country: "",
    };
  },
  methods: {
    async userSignUp() {
      if (this.emailError) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter a valid email address.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password ||
        !this.address ||
        !this.city ||
        !this.state ||
        !this.zip ||
        !this.phone
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all the fields.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      // Phone number should not contain any alphabets
      if (this.phone.match(/[a-z]/i)) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter valid phone number.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      if (this.confirmPassword != this.password) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Password didn't matched.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }
      if (this.$refs.addAdminForm.validate()) {
        try {
          this.loading = true;
          let data = {
            email: this.email,
            password: this.password,
            first_name: this.firstName,
            last_name: this.lastName,
            phone: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            country: "",
            zipcode: this.zip,

            role_id: 1,
          };
          this.$api.authService.register(data).then((response) => {
            if (response?.status) {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "Admin added successfully!",
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });
              this.loading = false;

              this.$router.push("/admin/dashboard");
              // reset Fields
              this.$refs.registerForm.reset();
            }
          });
        } catch (error) {
          console.log(error);
          this.loading = false;

          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Error adding Admin!",
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
