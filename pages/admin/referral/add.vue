<template>
  <div class="pb-6">
    <h1 class="text-center">Premier Tax Debt Solutions Referral Form</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          v-model="form.referralDate"
          id="date"
          class="form-control"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <!-- Referral ID -->
      <div class="form-group">
        <label for="referralId">Referral ID</label>
        <input
          type="text"
          v-model="form.referralId"
          id="referralId"
          class="form-control"
          placeholder="Enter Referral Id"
        />
      </div>

      <!-- Client Information -->
      <h2>1. Client Information</h2>

      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          v-model="form.fullName"
          id="fullName"
          class="form-control"
          placeholder="Enter Full Name"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          type="text"
          v-model="form.phone"
          id="phone"
          class="form-control"
          placeholder="Enter Phone Number"
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          v-model="form.email"
          id="email"
          class="form-control"
          placeholder="Enter Email Address"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          v-model="form.addressInfo.address"
          id="address"
          class="form-control"
          placeholder="Enter Address"
        />
      </div>

      <div class="form-group">
        <label for="state">State</label>
        <input
          type="text"
          v-model="form.addressInfo.state"
          id="state"
          class="form-control"
          placeholder="Enter State"
        />
      </div>

      <!-- Tax Liability Details -->
      <h2>2. Tax Liability Details</h2>

      <div class="form-group">
        <label for="taxLiabilityAmount">Tax Liability Amount</label>
        <input
          type="number"
          v-model="form.taxLiabilityInfo.amount"
          id="taxLiabilityAmount"
          class="form-control"
          placeholder="Enter Amount"
        />
      </div>

      <div class="form-group">
        <label for="issueRelatedTo">Is the Issue Related to</label>
        <select
          v-model="form.taxLiabilityInfo.relatedTo"
          id="issueRelatedTo"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="IRS">IRS</option>
          <option value="StateTaxAuthority">State Tax Authority</option>
          <option value="TaxPrep">Tax Prep</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <div
        class="form-group"
        v-if="
          form.taxLiabilityInfo.relatedTo === 'StateTaxAuthority' ||
          form.taxLiabilityInfo.relatedTo === 'Both'
        "
      >
        <label for="stateTaxAuthority"
          >State Tax Authority (if applicable)</label
        >
        <input
          type="text"
          v-model="form.taxLiabilityInfo.specifyState"
          id="stateTaxAuthority"
          class="form-control"
          placeholder="Specify the State Tax Authority"
        />
      </div>

      <!-- Main Issue Description -->
      <h2>3. Main Issue Description</h2>

      <div class="form-group">
        <label for="areaOfConcern">Area of Concern</label>
        <input
          type="text"
          v-model="form.issueDescription.area"
          id="areaOfConcern"
          class="form-control"
          placeholder="Describe the main issue"
        />
      </div>

      <div class="form-group">
        <label for="issueDescription">Brief Description of the Issue</label>
        <textarea
          v-model="form.issueDescription.detail"
          id="issueDescription"
          class="form-control"
          rows="5"
          placeholder="Provide a brief overview of the client's situation"
        ></textarea>
      </div>

      <!-- Urgency -->
      <h2>4. Urgency</h2>

      <div class="form-group">
        <label for="urgency">Urgency Level</label>
        <select v-model="form.urgency" id="urgency" class="form-control">
          <option value="" disabled selected>Select Urgency Level</option>
          <option value="Low">
            Low (Resolution needed within the next few months)
          </option>
          <option value="Medium">
            Medium (Resolution needed within the next month)
          </option>
          <option value="High">
            High (Resolution needed within the next few weeks)
          </option>
          <option value="Urgent">Urgent (Immediate attention required)</option>
        </select>
      </div>

      <!-- Additional Information -->
      <h2>5. Additional Information</h2>

      <div class="form-group">
        <label for="documentsAttached">Relevant Documents Attached</label>
        <select
          v-model="form.additionalInfo.attachments"
          id="documentsAttached"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
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

      <div class="form-group">
        <label for="preferredContactMethod"
          >Client’s Preferred Contact Method</label
        >
        <select
          v-model="form.additionalInfo.contactMethod"
          id="preferredContactMethod"
          class="form-control"
        >
          <option value="" disabled selected>Select Contact Method</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="NoPreference">No Preference</option>
        </select>
      </div>

      <div class="form-group">
        <label for="additionalNotes">Additional Notes</label>
        <textarea
          v-model="form.additionalInfo.notes"
          id="additionalNotes"
          class="form-control"
          rows="3"
          placeholder="Any other relevant information or special instructions"
        ></textarea>
      </div>

      <!-- Professional Referral Information -->
      <h2>6. Professional Referral Information</h2>

      <div class="form-group">
        <label for="referredTo">Referred To</label>
        <input
          type="text"
          v-model="form.proReferralInfo.referredTo"
          id="referredTo"
          class="form-control"
          placeholder="Name of the Professional or Firm"
        />
      </div>

      <div class="form-group">
        <label for="referralEmail">Email</label>
        <input
          type="text"
          v-model="form.proReferralInfo.referralEmail"
          id="referralEmail"
          class="form-control"
          placeholder="Email Address of the Professional"
        />
      </div>

      <div class="form-group">
        <label for="dateOfReferral">Date of Referral</label>
        <input
          type="date"
          v-model="form.proReferralInfo.referralDate"
          id="dateOfReferral"
          class="form-control"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div class="form-group">
        <label for="submittedBy">Submitted By</label>
        <input
          type="text"
          v-model="form.proReferralInfo.submittedBy"
          id="submittedBy"
          class="form-control"
          placeholder="Your Name"
        />
      </div>

      <div class="form-group">
        <label for="position">Position</label>
        <input
          type="text"
          v-model="form.proReferralInfo.position"
          id="position"
          class="form-control"
          placeholder="Your Position"
        />
      </div>

      <div class="form-group">
        <label for="referralPhone">Phone</label>
        <input
          type="text"
          v-model="form.proReferralInfo.referralPhone"
          id="referralPhone"
          class="form-control"
          placeholder="Your Phone Number"
        />
      </div>

      <!-- Verbal Agreement Authorization -->
      <h2>Verbal Agreement Authorization</h2>
      <p>
        I confirm that I have verbally agreed to allow Premier Tax Debt
        Solutions to share my personal and tax-related information with the
        referred professional listed above for the purpose of resolving my tax
        liability issues."
      </p>

      <div class="form-group">
        <label for="verbalAuthorization">Verbal Authorization Given</label>
        <select
          v-model="form.verbalAgreementAuth.given"
          id="verbalAuthorization"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div class="form-group">
        <label for="authorizationName"
          >Name of Representative Obtaining Authorization</label
        >
        <input
          type="text"
          v-model="form.verbalAgreementAuth.representative"
          id="authorizationName"
          class="form-control"
          placeholder="Your Name"
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
  layout: "dashboard",

  data() {
    const today = new Date().toISOString().split("T")[0];

    return {
      loading: false,
      form: {
        documents: null,
        referralDate: today,
        referralId: "",
        fullName: "",
        phone: "",
        email: "",
        addressInfo: {
          address: "",
          state: "",
        },
        taxLiabilityInfo: {
          amount: null,
          relatedTo: "",
          specifyState: "",
        },
        issueDescription: {
          area: "",
          detail: "",
        },
        urgency: "",
        additionalInfo: {
          attachments: "",
          contactMethod: "",
          notes: "",
        },
        proReferralInfo: {
          referredTo: "",
          referralEmail: "",
          referralDate: "",
          submittedBy: "",
          position: "",
          referralPhone: "",
        },
        verbalAgreementAuth: {
          given: true,
          representative: "",
        },
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.documents = Array.from(event.target.files);
      console.log("Attached files:", this.form.documents);
    },
    async handleSubmit() {
      if (
        !this.form.fullName ||
        !this.form.phone ||
        !this.form.email ||
        !this.form.addressInfo.address ||
        !this.form.addressInfo.state
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all client info fields.",
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
      try {
        const formData = new FormData();

        // Add main fields
        Object.keys(this.form).forEach((key) => {
          if (key === "documents" && this.form.documents) {
            // Append files only if documents are attached
            this.form.documents.forEach((file) => {
              formData.append("documents[]", file);
            });
          } else if (
            typeof this.form[key] === "object" &&
            this.form[key] !== null
          ) {
            // Handle nested objects
            Object.keys(this.form[key]).forEach((subKey) => {
              formData.append(`${key}[${subKey}]`, this.form[key][subKey]);
            });
          } else {
            formData.append(key, this.form[key]);
          }
        });

        // Example API call with FormData
        this.$api.premierService.saveReferralInfo(formData).then((res) => {
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

            // send email to section-1
            const payload = {
              email: this.form.email,
              message: this.form,
              subject: "Your Referral Has Been Submitted – What to Expect Next",
              key: "referral1",
            };

            this.$api.premierService.sendEmail(payload).then((res) => {
              console.log(res);
            });

            // send email to section-6
            const payloadTwo = {
              email: this.form.proReferralInfo.referralEmail,
              message: this.form,
              subject: "Referral Submitted from Premier Tax Debt Solutions",
              key: "referral6",
            };

            this.$api.premierService.sendEmail(payloadTwo).then((res) => {
              console.log(res);
            });

            // Reset form after submission
            this.form = {
              referralDate: "",
              referralId: "",
              fullName: "",
              phone: "",
              email: "",
              addressInfo: {
                address: "",
                state: "",
              },
              taxLiabilityInfo: {
                amount: null,
                relatedTo: "",
                specifyState: "",
              },
              issueDescription: {
                area: "",
                detail: "",
              },
              urgency: "",
              additionalInfo: {
                attachments: null,
                contactMethod: "",
                notes: "",
              },
              proReferralInfo: {
                referredTo: "",
                contactInfo: "",
                referralDate: "",
                submittedBy: "",
                position: "",
                contactInfoBy: "",
              },
              verbalAgreementAuth: {
                given: true,
                representative: "",
              },
            };

            this.$router.push("/admin/referral");
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
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
  max-width: 700px;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 30px;
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
