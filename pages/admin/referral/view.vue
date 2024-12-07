<template>
  <div class="pb-6">
    <v-row>
      <v-col cols="12" md="3">
        <button
          class="btn btn-primary"
          @click="$router.push('/admin/referral')"
        >
          Back
        </button></v-col
      >
      <v-col cols="12" md="6">
        <h1 class="text-center">View Referral Form</h1>
      </v-col></v-row
    >
    <div class="text-center mb-5">
      <button class="btn btn-primary" @click="printForm">Download Form</button>
    </div>
    <v-row
      ><v-col cols="12" md="6">
        <form @submit.prevent="handleSubmit" id="form-to-print">
          <!-- Date -->
          <div class="form-group">
            <label for="date">Date</label>
            <input
              type="date"
              v-model="form.referralDate"
              id="date"
              class="form-control"
              placeholder="MM/DD/YYYY"
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
            />
          </div>

          <div class="form-group">
            <label for="issueRelatedTo">Is the Issue Related to</label>
            <select
              disabled
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
              disabled
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
              disabled
            />
          </div>

          <div class="form-group">
            <label for="issueDescription">Brief Description of the Issue</label>
            <textarea
              disabled
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
            <select
              disabled
              v-model="form.urgency"
              id="urgency"
              class="form-control"
            >
              <option value="" disabled selected>Select Urgency Level</option>
              <option value="low">
                Low (Resolution needed within the next few months)
              </option>
              <option value="medium">
                Medium (Resolution needed within the next month)
              </option>
              <option value="high">
                High (Resolution needed within the next few weeks)
              </option>
              <option value="urgent">
                Urgent (Immediate attention required)
              </option>
            </select>
          </div>

          <!-- Additional Information -->
          <h2>5. Additional Information</h2>

          <div class="form-group">
            <label for="documentsAttached">Relevant Documents Attached</label>
            <select
              disabled
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
            <label for="preferredContactMethod"
              >Client’s Preferred Contact Method</label
            >
            <select
              disabled
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
              disabled
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
              disabled
            />
          </div>

          <div class="form-group">
            <label for="referralEmail">Contact Information</label>
            <input
              type="text"
              v-model="form.proReferralInfo.referralEmail"
              id="referralEmail"
              class="form-control"
              placeholder="Email Address of the Professional"
              disabled
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
              disabled
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
              disabled
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
              disabled
            />
          </div>
          <div class="form-group">
            <label for="referralPhone">Contact Information</label>
            <input
              type="text"
              v-model="form.proReferralInfo.referralPhone"
              id="referralPhone"
              class="form-control"
              placeholder="Your Phone Number"
              disabled
            />
          </div>

          <!-- Verbal Agreement Authorization -->
          <h2>Verbal Agreement Authorization</h2>
          <p>
            I confirm that I have verbally agreed to allow Premier Tax Debt
            Solutions to share my personal and tax-related information with the
            referred professional listed above for the purpose of resolving my
            tax liability issues."
          </p>

          <div class="form-group">
            <label for="verbalAuthorization">Verbal Authorization Given</label>
            <select
              disabled
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
              disabled
            />
          </div></form></v-col
      ><v-col cols="12" md="6">
        <div class="right-column mb-6">
          <h4 class="text-center mb-2">Documents</h4>
          <div class="file-table-container" v-if="form.documents?.length > 0">
            <v-chip
              v-for="(file, index) in form.documents"
              :key="index"
              @click="downloadItem(file.documentPath)"
              class="mb-2 mr-2"
              >File-{{ index + 1 }}</v-chip
            >
          </div>
          <div class="text-center" v-else>No Files.</div>
        </div></v-col
      ></v-row
    >
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
  mounted() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.getReferralById();
  },
  methods: {
    downloadItem(link) {
      // Remove "/public" from the link
      const cleanedLink = link.replace("public/", "");

      // Combine the cleaned link with the base URL from environment variables
      const fullUrl = `${process.env.BASE_URL_TWO}${cleanedLink}`;

      // Open the full URL in a new window
      window.open(fullUrl, "_blank");
    },
    printForm() {
      const { form } = this;

      const printContent = `
      <div>
          <img src="/logo-taxpert.png" alt="Logo" style="display:block; margin: 0 auto; width: 150px;"/>

          <h1 class="text-center">Referral Form</h1>

          <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
            <thead>
              <tr style="background-color: #4CAF50; color: white;">
                <th colspan="2" style="padding: 10px;">1. Client Information</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 10px; width: 50%;">Date:</td><td style="padding: 10px; width: 50%;">${
                form.referralDate || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">Referral ID:</td><td>${
                form.referralId || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">Full Name:</td><td>${
                form.fullName || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">Phone Number:</td><td>${
                form.phone || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">Email Address:</td><td>${
                form.email || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">Address:</td><td>${
                form.addressInfo.address || "N/A"
              }</td></tr>
              <tr><td style="padding: 10px;">State:</td><td>${
                form.addressInfo.state || "N/A"
              }</td></tr>
            </tbody>  
          </table>

            <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
              <thead>
                <tr style="background-color: #2196F3; color: white;">
                  <th colspan="2" style="padding: 10px;">2. Tax Liability Details</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding: 10px; width: 50%;">Tax Liability Amount:</td><td style="padding: 10px; width: 50%;">${
                  form.taxLiabilityInfo.amount || "N/A"
                }</td></tr>
                <tr><td style="padding: 10px;">Issue Related To:</td><td>${
                  form.taxLiabilityInfo.relatedTo || "N/A"
                }</td></tr>
                ${
                  form.taxLiabilityInfo.relatedTo === "StateTaxAuthority" ||
                  form.taxLiabilityInfo.relatedTo === "Both"
                    ? `<tr><td style="padding: 10px;">State Tax Authority:</td><td>${
                        form.taxLiabilityInfo.specifyState || "N/A"
                      }</td></tr>`
                    : ""
                }
              </tbody>
            </table>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
          <thead>
            <tr style="background-color: #FF5722; color: white;">
              <th colspan="2" style="padding: 10px;">3. Main Issue Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 10px; width: 50%;">Area of Concern:</td><td style="padding: 10px; width: 50%;">${
              form.issueDescription.area || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Brief Description:</td><td>${
              form.issueDescription.detail || "N/A"
            }</td></tr>
          </tbody>
        </table>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
          <thead>
            <tr style="background-color: #FFC107; color: white;">
              <th colspan="2" style="padding: 10px;">4. Urgency</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 10px; width: 50%;">Urgency Level:</td><td style="padding: 10px; width: 50%;">${
              form.urgency || "N/A"
            }</td></tr>
          </tbody>
        </table>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
          <thead>
            <tr style="background-color: #673AB7; color: white;">
              <th colspan="2" style="padding: 10px;">5. Additional Information</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 10px; width: 50%;">Relevant Documents Attached:</td><td style="padding: 10px; width: 50%;">${
              form.additionalInfo.attachments ? "Yes" : "No"
            }</td></tr>
            <tr><td style="padding: 10px;">Preferred Contact Method:</td><td>${
              form.additionalInfo.contactMethod || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Additional Notes:</td><td>${
              form.additionalInfo.notes || "N/A"
            }</td></tr>
          </tbody>
        </table>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
          <thead>
            <tr style="background-color: #009688; color: white;">
              <th colspan="2" style="padding: 10px;">6. Professional Referral Information</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 10px; width: 50%;">Referred To:</td><td style="padding: 10px; width: 50%;">${
              form.proReferralInfo.referredTo || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Referral Contact Info:</td><td>${
              form.proReferralInfo.contactInfo || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Date of Referral:</td><td>${
              form.proReferralInfo.referralDate || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Submitted By:</td><td>${
              form.proReferralInfo.submittedBy || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Position:</td><td>${
              form.proReferralInfo.position || "N/A"
            }</td></tr>
            <tr><td style="padding: 10px;">Submitter Contact Info:</td><td>${
              form.proReferralInfo.contactInfoBy || "N/A"
            }</td></tr>
          </tbody>
        </table>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
          <thead>
            <tr style="background-color: #E91E63; color: white;">
              <th colspan="2" style="padding: 10px;">Verbal Agreement Authorization</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 10px; width: 50%;">Verbal Authorization Given:</td><td style="padding: 10px; width: 50%;">${
              form.verbalAgreementAuth.given ? "Yes" : "No"
            }</td></tr>
            <tr><td style="padding: 10px;">Representative:</td><td>${
              form.verbalAgreementAuth.representative || "N/A"
            }</td></tr>
          </tbody>
        </table>
      </div>
      `;

      // Open a new window for printing
      const newWindow = window.open("", "", "width=800,height=600");
      newWindow.document.write(`
        <html>
          <head>
            <title>Referral Form</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
              h1 { text-align: center; }
              table { width: 100%; border: 1px solid #ddd; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: center; width: 50%; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContent}
          </body>
        </html>
        `);
      newWindow.document.close();
    },

    async getReferralById() {
      this.loading = true;
      const payload = { id: this.id };
      try {
        this.$api.premierService.getReferralById(payload).then((res) => {
          if (res?.data) {
            console.log(res);
            this.form = res?.data?.data[0];
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
  max-width: 700px;
}

.right-column {
  margin: 0 auto;
  /* margin-top: 11px; */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
