<template>
  <div class="my-6 pb-6 main-container">
    <div class="mid-container">
      <VContainer fluid class="fill-height">
        <VRow no-gutters align="center" justify="center" class="fill-height">
          <VCol cols="12" md="8" lg="8" sm="6" class="pa-7">
            <div class="text-center">
              <h1>PostGrid Settings</h1>
              <p class="text-medium-emphasis">
                Edit your To Id & Template Id from Postgrid portal.
              </p>
            </div>

            <v-form ref="UpdateLetterForm" class="mt-7">
              <v-row>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="toId"
                    id="to-id"
                    outlined
                    label="To ID"
                    name="to-id"
                  />
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <VTextField
                    v-model="fromId"
                    id="from-id"
                    outlined
                    label="From ID"
                    name="from-id"
                  />
                </v-col> -->
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="templateId"
                    id="template-id"
                    outlined
                    label="Template ID"
                    name="template-id"
                  />
                </v-col>
              </v-row>
              <!-- 
              <v-row>
                <v-col cols="12">
                  <VTextField
                    v-model="templateId"
                    id="template-id"
                    outlined
                    label="Template ID"
                    name="template-id"
                  />
                </v-col>
              </v-row> -->

              <div class="mt-5">
                <VBtn
                  :loading="loading"
                  @click="updateLetter"
                  block
                  min-height="44"
                  class="gradient mb-2"
                  style="background-color: #ffb300; color: white"
                >
                  Update
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
      toId: "",
      // fromId: "",
      templateId: "",
    };
  },

  created() {
    this.fetchLetterData();
  },

  methods: {
    async fetchLetterData() {
      try {
        this.loading = true;
        const response = await this.$api.premierService.getTemplateKeys(); // Adjust the API call as necessary
        if (response?.data) {
          this.toId = response.data.to_id;
          this.fromId = response.data.from_id;
          this.templateId = response.data.template_id;
        }
      } catch (error) {
        console.error("Error fetching letter data:", error);
        // You might want to handle the error or notify the user
      } finally {
        this.loading = false;
      }
    },

    async updateLetter() {
      if (!this.toId || !this.templateId) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all the fields.",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      try {
        this.loading = true;
        const data = {
          to_id: this.toId,
          // from_id: this.fromId,
          template_id: this.templateId,
        };
        const response = await this.$api.premierService.updateTemplateKeys(
          data
        ); // Adjust the API call as necessary
        if (response?.status) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "success",
            text: "Letter updated successfully!",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      } catch (error) {
        console.error("Error updating letter:", error);
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Error updating letter!",
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
