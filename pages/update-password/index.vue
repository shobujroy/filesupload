<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" md="6">
      <v-card flat style="border: 1px solid grey; border-radius: 5px">
        <v-card-title class="text-h5"> Update your password </v-card-title>

        <v-card-text class="pa-5">
          <v-form ref="UpdatePassForm">
            <v-text-field
              outlined
              label="Current Password"
              :type="showOldPassword ? 'text' : 'password'"
              :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showOldPassword = !showOldPassword"
              background-color="white"
              :rules="[
                // Password required
                (v) => !!v || 'Password is required',
              ]"
              v-model="passData.old_password"
            />

            <v-text-field
              outlined
              :rules="[
                // Password required
                (v) => !!v || 'New Password is required',
                // New password must not be same as current password
                (v) =>
                  v != passData.old_password ||
                  'New password cannot be same as old password',
              ]"
              label="New Password"
              :type="showNewPassword ? 'text' : 'password'"
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showNewPassword = !showNewPassword"
              @keyup.enter="updatePass"
              background-color="white"
              v-model="passData.password"
            />
            <v-text-field
              outlined
              :rules="[
                // Password required
                (v) => !!v || 'Confirm Password is required',
              ]"
              label="Confirm Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              @keyup.enter="updatePass"
              background-color="white"
              v-model="confirmPassword"
            />
          </v-form>
        </v-card-text>

        <v-card-actions style="justify-content: space-between">
          <button type="button" @click="close" class="btn">Cancel</button>
          <button
            type="submit"
            class="btn"
            :disabled="loading"
            @click="updatePass"
          >
            <div style="display: flex; gap: 10px; align-items: center">
              <span> Update Password</span>
              <v-progress-circular
                indeterminate
                color="white"
                :size="16"
                v-if="loading"
              ></v-progress-circular>
            </div>
          </button>
        </v-card-actions> </v-card></v-col
  ></v-row>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      dialog: false,
      loading: false,
      passData: {
        old_password: null,
        password: null,
      },
      confirmPassword: null,
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.UpdatePassForm.reset();
      // move back
      this.$router.push("/admin/dashboard");
    },
    updatePass() {
      if (this.$refs.UpdatePassForm.validate()) {
        // make sure both passwords are not same
        if (this.passData.old_password === this.passData.password) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "New password cannot be same as old password",
            showConfirmButton: false,
            timer: 5000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });
          return;
        }
        if (this.confirmPassword !== this.passData.password) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "New and Confirm Passwords do not match!",
            showConfirmButton: false,
            timer: 5000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });
          return;
        }

        this.loading = true;
        this.$store.dispatch("initLoader", true);

        this.$api.authService
          .updatePassword(this.passData)
          .then((response) => {
            console.log(response);
            if (response?.status) {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "Password Changed Successfully!",
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });
              //   Close Dialog
              if (this.$auth.$state.user.role_id === 1) {
                this.$router.push("/admin/dashboard");
              } else if (this.$auth.$state.user.role_id === 2) {
                this.$router.push("/user/dashboard");
              }
              this.close();
            } else {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "error",
                text: response?.message,
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });
            }
          })
          .catch((error) => {
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
          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch("initLoader", false);
          });
      }
    },
  },
};
</script>

<style></style>
