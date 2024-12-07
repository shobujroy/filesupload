<template>
  <div>
    <h1 class="text-center">Assistance Form</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Basic Info Fields -->
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="form.basicInfo.name"
          id="name"
          class="form-control"
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="form.basicInfo.email"
          id="email"
          class="form-control"
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="tel"
          v-model="form.basicInfo.phone"
          id="phone"
          class="form-control"
          placeholder="Enter your phone number"
        />
      </div>

      <!-- Assistance Type -->
      <div class="form-group">
        <label for="assistanceType">What type of assistance do you need?</label>
        <select
          v-model="form.assistanceTypeId"
          id="assistanceType"
          class="form-control"
        >
          <option value="" disabled selected>Select Assistance Type</option>
          <option
            v-for="assistance in assistanceTypes"
            :key="assistance?.id"
            :value="String(assistance?.id)"
          >
            {{ assistance?.name }}
          </option>
        </select>
      </div>

      <!-- Issue Type -->
      <div class="form-group">
        <label for="issueType">Is the issue related to?</label>
        <select v-model="form.issueType" id="issueType" class="form-control">
          <option value="" disabled selected>Select Issue Type</option>
          <option value="business">Business</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Summary -->
      <div class="form-group">
        <label for="summary"
          >Please provide a brief summary of your situation.</label
        >
        <textarea
          v-model="form.description"
          id="summary"
          class="form-control"
          rows="5"
          placeholder="Enter summary"
        ></textarea>
      </div>

      <!-- Tax Liability -->
      <div class="form-group">
        <label for="taxLiability">What is the tax liability amount?</label>
        <input
          type="number"
          v-model="form.taxLiabilityAmount"
          id="taxLiability"
          class="form-control"
          placeholder="Enter Tax Liability"
        />
      </div>

      <!-- Tax Years -->
      <div class="form-group">
        <label for="taxYear">Which years do you owe taxes for?</label>
        <input
          type="text"
          v-model="form.taxYear"
          id="taxYear"
          class="form-control"
          placeholder="Enter Tax Years"
        />
      </div>

      <!-- Attach Documents -->
      <div class="form-group">
        <label for="documents"
          >Do you have any documents that you would like to attach?</label
        >
        <input
          type="file"
          id="documents"
          class="form-control"
          multiple
          @change="handleFileUpload"
          ref="fileInput"
        />
      </div>

      <!-- Urgent Matter -->
      <div class="form-group">
        <label for="urgent">Is this an urgent matter?</label>
        <select v-model="form.urgent" id="urgent" class="form-control">
          <option value="" disabled selected>Select Urgency</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <!-- Location -->
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          v-model="form.location"
          id="location"
          class="form-control"
          :disabled="location !== 'Other'"
          placeholder="Enter Other Location"
        />
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn" :disabled="loading">
          <div style="display: flex; gap: 10px; align-items: center">
            <span>Submit</span>
            <v-progress-circular
              indeterminate
              color="white"
              :size="16"
              v-if="loading"
            ></v-progress-circular>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        basicInfo: {
          name: "",
          email: "",
          phone: "",
        },
        assistanceTypeId: "",
        issueType: "",
        description: "",
        taxLiabilityAmount: "",
        taxYear: "",
        urgent: "",
        location: "",
        documents: [],
      },
      location: "",
      assistanceTypes: [],
    };
  },
  mounted() {
    this.updateLocation();
    this.getAssistanceTypes();
  },
  watch: {
    "$route.query.location": "updateLocation",
  },
  methods: {
    async getAssistanceTypes() {
      await this.$api.premierService.getAssistanceTypes().then((res) => {
        if (res?.data?.length) {
          this.assistanceTypes = res?.data;
        }
      });
    },
    updateLocation() {
      this.location = this.$route.query.location || "Not Selected";
      if (this.location !== "Other") {
        this.form.location = this.location;
      }
    },
    async handleSubmit() {
      this.loading = true;
      this.form.userId = "0";
      try {
        const formData = new FormData();

        Object.keys(this.form).forEach((key) => {
          if (key === "documents") {
            this.form.documents.forEach((file) => {
              formData.append("documents[]", file);
            });
          } else if (key === "basicInfo") {
            // Stringify basicInfo and add it as a single field
            formData.append("basic_info", JSON.stringify(this.form.basicInfo));
          } else {
            formData.append(key, this.form[key]);
          }
        });

        const response = await this.$api.premierService.saveAssistanceInfo(
          formData
        );
        if (response?.data) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "success",
            text: "Form Submitted Successfully.",
            showConfirmButton: false,
            timer: 5000,
          });
          this.resetForm();
          this.$refs.fileInput.value = null; // Clear the file input
        }
      } catch (error) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "An unexpected Error Occurred.",
          showConfirmButton: false,
          timer: 5000,
        });
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(event) {
      this.form.documents = Array.from(event.target.files);
      console.log("Attached files:", this.form.documents);
    },
    resetForm() {
      this.form = {
        basicInfo: {
          name: "",
          email: "",
          phone: "",
        },
        assistanceTypeId: "",
        issueType: "",
        description: "",
        taxLiabilityAmount: "",
        taxYear: "",
        urgent: "",
        location: "",
        documents: [],
      };
    },
  },
};
</script>

<style scoped>
form {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 900px;
}

h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
