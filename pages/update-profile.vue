<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="8" lg="8" sm="6" class="pa-7">
            <div class="text-center">
              <h1>Profile</h1>
              <p class="text-medium-emphasis">
                Update your account information.
              </p>
            </div>

            <v-form ref="UpdateProfileForm" class="mt-7">
              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="firstName"
                    id="first-name"
                    outlined
                    label="First Name"
                    name="first-name"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="lastName"
                    id="last-name"
                    outlined
                    name="last-name"
                    label="Last Name"
                  />
                </v-col>
              </v-row>

              <VTextField
                disabled
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
                    v-model="address"
                    id="address"
                    outlined
                    name="address"
                    label="Address"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="city"
                    id="city"
                    outlined
                    name="city"
                    label="City"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="state"
                    id="state"
                    outlined
                    name="state"
                    label="State"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="zip"
                    id="zip"
                    outlined
                    name="zip"
                    type="number"
                    label="Zip Code"
                  />
                </v-col>
              </v-row>

              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="updateUserProfile"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                >
                  Update Profile
                </VBtn>
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
  layout: "dashboard",

  data() {
    return {
      loading: false,
      firstName: this?.$auth?.user?.first_name,
      lastName: this?.$auth?.user?.last_name,
      email: this?.$auth?.user?.email,
      phone: this?.$auth?.user?.phone,
      address: this?.$auth?.user?.address,
      city: this?.$auth?.user?.city,
      state: this?.$auth?.user?.state,
      zip: this?.$auth?.user?.zipcode,
    };
  },
  methods: {
    async updateUserProfile() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
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

      if (this.phone.match(/[a-z]/i)) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter a valid phone number.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      if (this.$refs.UpdateProfileForm.validate()) {
        try {
          this.loading = true;
          let data = {
            // email: this.email,
            first_name: this.firstName,
            last_name: this.lastName,
            phone: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            zipcode: this.zip,
          };
          this.$api.authService.updateProfile(data).then((response) => {
            if (response?.status) {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "Profile updated successfully!",
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });
              this.$auth.fetchUser();

              this.loading = false;
              if (this.$auth.user.role_id === 1) {
                this.$router.push("/admin/dashboard");
              } else if (this.$auth.user.role_id === 2) {
                this.$router.push("/user/dashboard");
              }
            }
          });
        } catch (error) {
          console.log(error);

          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Error updating profile!",
            showConfirmButton: false,
            timer: 5000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });
          this.loading = false;
        }
      }
    },
  },
};
</script>
