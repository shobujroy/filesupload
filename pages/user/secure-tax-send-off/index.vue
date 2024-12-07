<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="8" lg="8" sm="6" class="pa-7">
            <div class="text-center">
              <h1>Secure Tax Send-Off Letter</h1>
              <p class="text-medium-emphasis">
                Complete the form below to send your secure tax documents.
              </p>
            </div>

            <v-form ref="TaxSendOffForm" class="mt-7">
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
                v-model="companyName"
                id="company-name"
                outlined
                name="company-name"
                label="Company Name"
              />

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="addressLine1"
                    id="address-line1"
                    outlined
                    name="address-line1"
                    label="Address Line 1"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="addressLine2"
                    id="address-line2"
                    outlined
                    name="address-line2"
                    label="Address Line 2"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="city"
                    id="city"
                    outlined
                    name="city"
                    label="City"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="state"
                    id="state"
                    outlined
                    name="state"
                    label="State"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="zipCode"
                    id="zip-code"
                    outlined
                    name="zip-code"
                    type="number"
                    label="Zip Code"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="country"
                    id="country"
                    outlined
                    name="country"
                    label="Country"
                  />
                </v-col>
              </v-row>

              <VTextField
                v-model="countryCode"
                id="country-code"
                outlined
                name="country-code"
                label="Country Code"
              />

              <VTextField
                v-model="description"
                id="description"
                outlined
                name="description"
                label="Description"
              />

              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="sendTaxLetter"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                >
                  Submit
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
      firstName: "",
      lastName: "",
      companyName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      countryCode: "",
      description: "",
    };
  },
  methods: {
    async sendTaxLetter() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.companyName ||
        !this.addressLine1 ||
        !this.city ||
        !this.state ||
        !this.zipCode ||
        !this.country ||
        !this.countryCode ||
        !this.description
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all the required fields.",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      try {
        this.loading = true;
        let data = {
          first_name: this.firstName,
          last_name: this.lastName,
          company_name: this.companyName,
          address_line1: this.addressLine1,
          address_line2: this.addressLine2,
          city: this.city,
          state: this.state,
          zip_code: this.zipCode,
          country: this.country,
          country_code: this.countryCode,
          description: this.description,
        };
        // Replace with your PostGrid API call
        await this.$api.postGridService.sendTaxLetter(data);

        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "success",
          text: "Tax letter sent successfully!",
          showConfirmButton: false,
          timer: 5000,
        });
      } catch (error) {
        console.log(error);

        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Error sending tax letter!",
          showConfirmButton: false,
          timer: 5000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
