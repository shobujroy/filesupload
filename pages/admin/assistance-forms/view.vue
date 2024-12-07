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
          disabled
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
          disabled
        />
      </div>

      <!-- Assistance Type -->
      <div class="form-group">
        <label for="assistanceType">What type of assistance do you need?</label>
        <select
          v-model="form.assistanceTypeId"
          id="assistanceType"
          class="form-control"
          disabled
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
        <select
          v-model="form.issueType"
          id="issueType"
          class="form-control"
          disabled
        >
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
          disabled
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
          disabled
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
          disabled
        />
      </div>

      <!-- Attach Documents -->

      <!-- Urgent Matter -->
      <div class="form-group">
        <label for="urgent">Is this an urgent matter?</label>
        <select v-model="form.urgent" id="urgent" class="form-control" disabled>
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
          disabled
          placeholder="Enter Other Location"
        />
      </div>

      <!-- <div class="form-buttons">
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
      </div> -->
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      loading: false,
      id: null,
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
      },
      location: "",
      assistanceTypes: [],
    };
  },
  mounted() {
    this.getAssistanceTypes();
    this.id = this.$route.query.id;
    this.getAssistanceById();
  },

  methods: {
    async getAssistanceTypes() {
      await this.$api.premierService.getAssistanceTypes().then((res) => {
        if (res?.data?.length) {
          this.assistanceTypes = res?.data;
        }
      });
    },

    async getAssistanceById() {
      this.loading = true;
      const payload = { id: this.id };
      try {
        this.$api.premierService.getAssistanceById(payload).then((res) => {
          if (res?.data) {
            console.log(res?.data);
            this.form = res?.data;
            if (this.form?.basicInfo) {
              try {
                // Parse basicInfo and save it as a separate object in this.form
                this.form.basicInfo = JSON.parse(this.form.basicInfo);
              } catch (error) {
                console.error("Failed to parse basicInfo:", error);
              }
            }
          } else this.loading = false;
        });

        // handle successful response
      } catch (error) {
        console.log(error.response.data);

        this.loading = false;
      }
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
