<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="8" lg="8" sm="6" class="pa-7">
            <div class="text-center">
              <h1>Update Card Information</h1>
              <p class="text-medium-emphasis">Update your card details.</p>
            </div>

            <v-form ref="CardInformationForm" class="mt-7">
              <VTextField
                v-model="cardNumber"
                id="card-number"
                outlined
                label="Card Number"
                name="card-number"
                maxlength="16"
                type="tel"
                mask="#### #### #### ####"
                placeholder="1234 5678 9101 1121"
              />

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="expiryDate"
                    id="expiry-date"
                    outlined
                    label="Expiry Date"
                    name="expiry-date"
                    maxlength="4"
                    placeholder="MMYY"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="cvc"
                    id="cvc"
                    outlined
                    label="CVC"
                    name="cvc"
                    maxlength="3"
                    type="tel"
                    placeholder="123"
                  />
                </v-col>
              </v-row>

              <VTextField
                v-model="cardHolderName"
                id="card-holder-name"
                outlined
                label="Card Holder Name"
                name="card-holder-name"
              />

              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="updateCardInformation"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                >
                  Update Card Information
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
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardHolderName: "",
    };
  },
  methods: {
    async updateCardInformation() {
      if (
        !this.cardNumber ||
        !this.expiryDate ||
        !this.cvc ||
        !this.cardHolderName
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

      if (!this.cardNumber.match(/^\d{16}$/)) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter a valid 16-digit card number.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      if (!this.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter a valid expiry date in MM/YY format.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      if (!this.cvc.match(/^\d{3}$/)) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please enter a valid 3-digit CVC.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      if (this.$refs.CardInformationForm.validate()) {
        try {
          this.loading = true;
          let data = {
            card_number: this.cardNumber,
            expiry_date: this.expiryDate,
            cvc: this.cvc,
            card_holder_name: this.cardHolderName,
          };

          this.$api.authService.updateCardInformation(data).then((response) => {
            if (response?.status) {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "Card information updated successfully!",
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });
              this.loading = false;
              this.$router.push("/user/card-details");
            }
          });
        } catch (error) {
          console.log(error);

          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Error updating card information!",
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
