<template>
  <div class="pb-6">
    <h1 class="text-center">Funding</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Name -->
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="form.name"
          id="name"
          class="form-control"
          placeholder="Enter Name"
        />
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          v-model="form.phone"
          id="phone"
          class="form-control"
          placeholder="Enter Phone"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="form.email"
          id="email"
          class="form-control"
          placeholder="Enter Email"
        />
      </div>

      <!-- Funding Amount -->
      <div class="form-group">
        <label for="fundingAmount">How much funding are you seeking?</label>
        <select
          v-model="form.fundingAmount"
          id="fundingAmount"
          class="form-control"
        >
          <option value="" disabled selected>Select</option>
          <option value="0-50000">$0 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-250000">$100,000 - $250,000</option>
          <option value="250000-500000">$250,000 - $500,000</option>
        </select>
      </div>

      <!-- Last Year's Personal Tax Return -->
      <div class="form-group">
        <label for="lastYearTaxReturn">Last Year's Personal Tax Return</label>
        <input
          type="file"
          id="lastYearTaxReturn"
          class="form-control"
          @change="handleFileUpload($event, 'lastYearTaxReturn')"
          ref="fileInputOne"
        />
      </div>

      <!-- The Year Before Last Year's Personal Tax Return -->
      <div class="form-group">
        <label for="yearBeforeTaxReturn"
          >The Year Before Last Year's Personal Tax Return</label
        >
        <input
          type="file"
          id="yearBeforeTaxReturn"
          class="form-control"
          @change="handleFileUpload($event, 'yearBeforeTaxReturn')"
          ref="fileInputTwo"
        />
      </div>

      <!-- MyFICO Credit Report -->
      <div class="form-group">
        <label for="myFicoCreditReport">Attach Your MyFICO Credit Report</label>
        <input
          type="file"
          id="myFicoCreditReport"
          class="form-control"
          @change="handleFileUpload($event, 'myficoCreditReport')"
          ref="fileInputThree"
        />
      </div>

      <!-- Referral -->
      <div class="form-group">
        <label for="referral">Who Referred You?</label>
        <input
          type="text"
          v-model="form.referral"
          id="referral"
          class="form-control"
          placeholder="Enter Referral"
        />
      </div>

      <div class="form-buttons">
        <button
          type="submit"
          class="btn"
          :disabled="loading"
          @click="handleSubmit"
        >
          <div style="display: flex; gap: 10px; align-items: center">
            <span> Submit</span>
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
        name: "",
        phone: "",
        email: "",
        fundingAmount: "",
        lastYearTaxReturn: null,
        yearBeforeTaxReturn: null,
        myficoCreditReport: null,
        referral: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

      // Create a FormData object
      const formData = new FormData();

      // Append the form fields to the FormData object
      formData.append("name", this.form.name);
      formData.append("phone", this.form.phone);
      formData.append("email", this.form.email);
      formData.append("fundingAmount", this.form.fundingAmount);
      formData.append("referral", this.form.referral);

      // Append the files to the FormData object
      if (this.form.lastYearTaxReturn) {
        formData.append("lastYearTaxReturn", this.form.lastYearTaxReturn);
      }
      if (this.form.yearBeforeTaxReturn) {
        formData.append("yearBeforeTaxReturn", this.form.yearBeforeTaxReturn);
      }
      if (this.form.myficoCreditReport) {
        formData.append("myficoCreditReport", this.form.myficoCreditReport);
      }

      try {
        // Send the FormData in the API request
        const res = await this.$api.premierService.saveFundingInfo(formData);

        if (res?.data) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "success",
            text: "Form Submitted Successfully.",
            showConfirmButton: false,
            timer: 5000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });
          this.resetForm();
          this.$refs.fileInputOne.value = null;
          this.$refs.fileInputTwo.value = null;
          this.$refs.fileInputThree.value = null;
        }
      } catch (error) {
        console.log(error.response.data);
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response.data,
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(event, fieldName) {
      this.form[fieldName] = event.target.files[0];
      console.log(`${fieldName} uploaded:`, this.form[fieldName]);
    },
    resetForm() {
      this.form = {
        name: "",
        phone: "",
        email: "",
        fundingAmount: "",
        lastYearTaxReturn: null,
        yearBeforeTaxReturn: null,
        myficoCreditReport: null,
        referral: "",
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
