<template>
  <div class="pb-6">
    <v-row>
      <v-col cols="12" md="3">
        <button
          class="btn btn-primary"
          @click="$router.push('/user/liason-call')"
        >
          Back
        </button></v-col
      >
      <v-col cols="12" md="6">
        <h1 class="text-center">
          Fresh Start Navigator IRS Liaison Call Form
          <!-- <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                size="x-large"
                v-bind="attrs"
                v-on="on"
                @click="printForm"
              >
                <v-icon color="primary">mdi-cloud-download</v-icon>
              </v-btn>
            </template>
            <span>Download form</span>
          </v-tooltip> -->
        </h1>
      </v-col>
    </v-row>
    <div class="text-center mb-5">
      <button class="btn btn-primary" @click="printForm">Download Form</button>
    </div>
    <form @submit.prevent="handleSubmit" id="form-to-print">
      <!-- Client Information Section -->
      <h2>1. Client Information</h2>
      <div class="form-group">
        <label for="client_name">Client Name</label>
        <input
          disabled
          type="text"
          v-model="form.client_information.client_name"
          id="client_name"
          class="form-control"
          placeholder="Enter Client Name"
        />
      </div>
      <div class="form-group">
        <label for="case_number">Client ID/Case Number</label>
        <input
          disabled
          type="text"
          v-model="form.client_information.case_number"
          id="case_number"
          class="form-control"
          placeholder="Enter Client ID/Case Number"
        />
      </div>
      <div class="form-group">
        <label for="client_email_address">Client Email Address</label>
        <input
          disabled
          type="email"
          v-model="form.client_information.client_email_address"
          id="client_email_address"
          class="form-control"
          placeholder="Enter Client Email Address"
        />
      </div>
      <div class="form-group">
        <label for="date_of_call">Date of Call</label>
        <input
          disabled
          type="date"
          v-model="form.client_information.date_of_call"
          id="date_of_call"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="liaison_name">Liaison Name</label>
        <input
          disabled
          type="text"
          v-model="form.client_information.liaison_name"
          id="liaison_name"
          class="form-control"
          placeholder="Enter Liaison Name"
        />
      </div>

      <!-- IRS Call Details Section -->
      <h2>2. IRS Call Details</h2>
      <div class="form-group">
        <label for="irs_agent_name_id">IRS Agent Name/ID (if available)</label>
        <input
          disabled
          type="text"
          v-model="form.irs_call_detail.irs_agent_name_id"
          id="irs_agent_name_id"
          class="form-control"
          placeholder="Enter IRS Agent Name/ID"
        />
      </div>
      <div class="form-group">
        <label for="call_duration_in_minutes">Call Time Duration</label>
        <input
          disabled
          type="text"
          v-model="form.irs_call_detail.call_duration_in_minutes"
          id="call_duration_in_minutes"
          class="form-control"
          placeholder="Enter Call Duration"
        />
      </div>
      <div class="form-group">
        <label for="irs_case_number">IRS Case Number (if applicable)</label>
        <input
          disabled
          type="text"
          v-model="form.irs_call_detail.irs_case_number"
          id="irs_case_number"
          class="form-control"
          placeholder="Enter IRS Case Number"
        />
      </div>

      <!-- Taxpayer's Filing Status Section -->
      <h2>3. Taxpayer's Filing Status (Last 7 Years)</h2>
      <label>
        For each of the last 7 years, indicate whether the return was filed,
        unfiled, or substituted for return (SFR).
      </label>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="year-column">Tax Year</th>
              <th>Return Status</th>
              <th>Liability Amount ($)</th>
              <th class="notes-column">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(year, index) in form.taxpayer_filing_status.filingStatus"
              :key="index"
            >
              <td class="year-column">{{ year.year }}</td>
              <td>
                <select
                  disabled
                  v-model="year.returnStatus"
                  class="form-control-2"
                >
                  <option value="" disabled>Select</option>
                  <option value="filed">Filed</option>
                  <option value="unfiled">Unfiled</option>
                  <option value="sfr">SFR (Substituted for Return)</option>
                </select>
              </td>
              <td>
                <input
                  disabled
                  type="number"
                  v-model="year.liabilityAmount"
                  class="form-control-2"
                />
              </td>
              <td class="notes-column">
                <input
                  disabled
                  type="text"
                  v-model="year.notes"
                  class="form-control-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Collection Status & CSED Information Section -->
      <h2>4. Collection Status & CSED Information (Per Tax Year)</h2>
      <label>
        For each of the last 7 years, indicate the Collection Statute Expiration
        Date (CSED) and current collection status.
      </label>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="year-column">Tax Year</th>
              <th>Collection Status</th>
              <th>CSED (DD-MM-YYYY)</th>
              <th class="notes-column">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(year, index) in form
                .collection_status_and_csed_information.collectionStatus"
              :key="index"
            >
              <td class="year-column">{{ year.year }}</td>
              <td>
                <select
                  disabled
                  v-model="year.collectionStatus"
                  class="form-control-2"
                >
                  <option value="" disabled>Select</option>
                  <option value="active">Active Collections</option>
                  <option value="hold">Hold</option>
                  <option value="cnc">CNC</option>
                </select>
              </td>
              <td>
                <input
                  disabled
                  type="date"
                  v-model="year.csed"
                  class="form-control-2"
                  placeholder="DD-MM-YYYY"
                />
              </td>
              <td class="notes-column">
                <input
                  disabled
                  type="text"
                  v-model="year.notes"
                  class="form-control-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Collection Hold Awarded Section -->
      <h2>5. Collection Hold Awarded (If Applicable)</h2>
      <div class="form-group">
        <label for="collection_hold_awarded"
          >30-Day Collection Hold Awarded</label
        >
        <select
          disabled
          v-model="form.collection_hold_awarded.status"
          id="collection_hold_awarded"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label for="collectionHoldNotes">Notes:</label>
        <textarea
          disabled
          v-model="form.collection_hold_awarded.notes"
          id="collectionHoldNotes"
          class="form-control"
          rows="3"
          placeholder="Enter any notes"
        ></textarea>
      </div>

      <h2>6. Currently Noncollectible (CNC) Status Awarded (If Applicable)</h2>
      <div class="form-group">
        <label for="cncStatus">CNC Status Awarded</label>
        <select
          disabled
          v-model="form.currently_noncollectible_status_awarded.status"
          id="cncStatus"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div class="form-group">
          <label for="cncTerms">Terms of CNC Status:</label>
          <input
            disabled
            type="text"
            v-model="form.currently_noncollectible_status_awarded.terms"
            id="cncTerms"
            class="form-control"
            placeholder="Enter Terms"
          />
        </div>
        <div class="form-group">
          <label for="cncReason">Reason for CNC Status:</label>
          <input
            disabled
            type="text"
            v-model="form.currently_noncollectible_status_awarded.reason"
            id="cncReason"
            class="form-control"
            placeholder="Enter Reason"
          />
        </div>
        <div class="form-group">
          <label for="effectiveDate">Effective Date:</label>
          <input
            disabled
            type="date"
            v-model="form.currently_noncollectible_status_awarded.effectiveDate"
            id="effectiveDate"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="nextReviewDate">Next Review Date (if applicable):</label>
          <input
            disabled
            type="date"
            v-model="
              form.currently_noncollectible_status_awarded.nextReviewDate
            "
            id="nextReviewDate"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="additionalTerms">Additional Terms:</label>
          <input
            disabled
            type="text"
            v-model="
              form.currently_noncollectible_status_awarded.additionalTerms
            "
            id="additionalTerms"
            class="form-control"
            placeholder="Enter Additional Terms"
          />
        </div>
      </div>

      <!-- Payment Plan/Installment Agreement Information Section -->
      <h2>7. Payment Plan/Installment Agreement Information (If Applicable)</h2>
      <div class="form-group">
        <label for="installmentAgreementType"
          >Installment Agreement Type:</label
        >
        <select
          disabled
          v-model="
            form.payment_plan_installment_agreement_information
              .installmentAgreementType
          "
          id="installmentAgreementType"
          class="form-control"
        >
          <option value="" disabled selected>Select Type</option>
          <option value="Full Payment">Full Payment</option>
          <option value="Partial Payment">Partial Payment</option>
        </select>
      </div>
      <div class="form-group">
        <label for="monthlyPayment"
          >Amount of Monthly Payment (if provided):</label
        >
        <input
          disabled
          type="text"
          v-model="
            form.payment_plan_installment_agreement_information
              .amountOfMonthlyPayment
          "
          id="monthlyPayment"
          class="form-control"
          placeholder="Enter Monthly Payment"
        />
      </div>
      <div class="form-group">
        <label for="nextDueDate">Next Due Date (if available):</label>
        <input
          disabled
          type="date"
          v-model="
            form.payment_plan_installment_agreement_information.nextDueDate
          "
          id="nextDueDate"
          class="form-control"
        />
      </div>

      <!-- Penalty Abatement Section -->
      <h2>8. Penalty Abatement (First-Time Penalty Abatement)</h2>
      <div class="form-group">
        <label for="penalty_abatementEligibility"
          >Penalty Abatement Eligibility:</label
        >
        <select
          disabled
          v-model="form.penalty_abatement.eligibility.status"
          id="penalty_abatementEligibility"
          class="form-control"
        >
          <option value="" disabled selected>Select Option</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <div class="form-group">
          <label for="penaltyReduction"
            >Amount of Penalty Reduction (if available):</label
          >
          <input
            disabled
            type="text"
            v-model="form.penalty_abatement.amountOfPenaltyReduction"
            id="penaltyReduction"
            class="form-control"
            placeholder="Enter Amount"
          />
        </div>
      </div>

      <!-- Additional Notes from IRS Agent Section -->
      <h2>9. Additional Notes from IRS Agent:</h2>
      <textarea
        disabled
        v-model="form.additional_notes_from_irs_agent.notes"
        class="form-control custom-textarea"
        rows="4"
        placeholder="Document any specific notes, extra guidance, or actions required"
      ></textarea>

      <!-- Final Outcome/Actions Taken Section -->
      <h2>10. Final Outcome/Actions Taken:</h2>
      <textarea
        v-model="form.final_outcome.outcome"
        class="form-control custom-textarea"
        rows="4"
        placeholder="Describe the outcome of the call and next steps for the taxpayer"
        disabled
      ></textarea>
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      form: {
        client_information: {
          client_name: "",
          case_number: "",
          client_email_address: "",
          date_of_call: new Date().toISOString().split("T")[0], // Today's date in "YYYY-MM-DD"
          liaison_name: "",
        },
        irs_call_detail: {
          irs_agent_name_id: "",
          call_duration_in_minutes: "",
          irs_case_number: "",
        },
        taxpayer_filing_status: {
          filingStatus: this.generateFilingYears(),
        },
        collection_status_and_csed_information: {
          collectionStatus: this.generateCollectionYears(),
        },
        collection_hold_awarded: {
          status: "",
          notes: "",
        },
        currently_noncollectible_status_awarded: {
          status: "",
          terms: "",
          reason: "",
          effectiveDate: "",
          nextReviewDate: "",
          additionalTerms: "",
        },
        payment_plan_installment_agreement_information: {
          installmentAgreementType: "",
          amountOfMonthlyPayment: "",
          nextDueDate: "",
        },
        penalty_abatement: {
          eligibility: {
            status: "",
            decision: "",
          },
          amountOfPenaltyReduction: "",
        },
        additional_notes_from_irs_agent: { notes: "" },
        final_outcome: { outcome: "" },
      },
    };
  },
  created() {
    // Parse the form object from query parameters
    if (this.$route.query.id) {
      this.getLiaisonByUserId();
    }
  },
  methods: {
    printForm() {
      const form = document.getElementById("form-to-print");

      // Clone the form to avoid modifying the original
      const formClone = form.cloneNode(true);

      // Convert all inputs to their values
      const inputs = formClone.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        if (input.type !== "button" && input.type !== "submit") {
          const value = input.type === "checkbox" ? input.checked : input.value;
          const displayValue =
            input.type === "checkbox"
              ? value
                ? "Checked"
                : "Unchecked"
              : value;

          // Create a new span to hold the value
          const valueSpan = document.createElement("span");
          valueSpan.textContent = `${input.name} ${displayValue}`;

          // Replace the input element with the value span
          input.parentNode.replaceChild(valueSpan, input);
        }
      });

      const printContent = formClone.outerHTML;
      const newWindow = window.open("", "", "width=800,height=600");

      newWindow.document.write(`
      <html>
        <head>
          <title>Print Form</title>
          <style>
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}
.form-control-2 {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  /* width: 180px; */
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.custom-textarea {
  resize: vertical;
  height: 120px; /* Default height */
  padding: 10px;
  width: 100%;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.table th {
  background-color: #f2f2f2;
  width: 25%;
}
.table-responsive {
  overflow-x: auto; /* Enables horizontal scrolling */
  margin-bottom: 20px; /* Add some space below each table */
}
            body {
              font-family: Arial, sans-serif;
              padding: 10px;
            }
            h1 {
              text-align: center;
            }
            /* Other styles to maintain your form's appearance */
            .btn {
              display: none; /* Hide buttons in the print view */
            }
            /* Add any other necessary styles here */
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div style="text-align:center; margin: 10px 0;">
        <img src="/logo-taxpert.png" style="width: 100px" />
      </div>          ${printContent}
        </body>
      </html>
    `);

      newWindow.document.close();
    },
    generateCollectionYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      years.push({
        year: currentYear,
        collectionStatus: "",
        csed: "",
        notes: "",
      });
      for (let year = currentYear - 1; year >= currentYear - 6; year--) {
        years.push({
          year: year,
          collectionStatus: "",
          csed: "",
          notes: "",
        });
      }
      return years;
    },

    generateFilingYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      years.push({
        year: currentYear,
        returnStatus: "",
        liabilityAmount: "",
        notes: "",
      });
      for (let year = currentYear - 1; year >= currentYear - 6; year--) {
        years.push({
          year: year,
          returnStatus: "",
          liabilityAmount: "",
          notes: "",
        });
      }
      return years;
    },

    async getLiaisonByUserId() {
      this.loading = true;
      try {
        this.$api.premierService
          .getLiaisonByUserId(this.$route.query.id)
          .then((res) => {
            if (res?.data) {
              console.log(res);
              this.form = res?.data;
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}
.form-control-2 {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  /* width: 180px; */
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.custom-textarea {
  resize: vertical;
  height: 120px; /* Default height */
  padding: 10px;
  width: 100%;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.table th {
  background-color: #f2f2f2;
  width: 25%;
}
.table-responsive {
  overflow-x: auto; /* Enables horizontal scrolling */
  margin-bottom: 20px; /* Add some space below each table */
}
</style>
