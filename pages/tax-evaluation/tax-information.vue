<template>
  <div>
    <h1 class="text-center my-4">
      Tax Information
      <v-btn icon @click="dialog2 = true"
        ><v-icon md>mdi-information</v-icon></v-btn
      >
    </h1>
    <h4 class="text-center">
      Please make sure to click Next Button to save your data.
    </h4>
    <div style="display: flex; justify-content: center">
      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label for="taxType">Tax Type:</label>
          <select v-model="form.taxTypeId" id="taxType" class="form-control">
            <option value="" disabled>Select Tax Type</option>
            <option
              v-for="type in taxTypes"
              :key="type?.id"
              :value="String(type?.id)"
            >
              {{ type?.name }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <small v-if="errors.taxTypeId" class="error-message">{{
            errors.taxTypeId
          }}</small>
        </div>

        <div class="form-group">
          <label for="taxProblem">Tax Problem:</label>
          <select
            v-model="form.taxProblemId"
            id="taxProblem"
            class="form-control"
          >
            <option value="" disabled>Select Tax Problem</option>
            <option
              v-for="problem in taxProblems"
              :key="problem?.id"
              :value="String(problem?.id)"
            >
              {{ problem?.name }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <small v-if="errors.taxProblemId" class="error-message">{{
            errors.taxProblemId
          }}</small>
        </div>

        <div class="form-group">
          <label>Agency:</label>
          <v-checkbox-group class="checkbox-group">
            <v-checkbox
              v-model="form.agency.state"
              :label="'State'"
              :value="true"
              @change="toggleAgency('state')"
              id="state"
            />
            <v-checkbox
              v-model="form.agency.federal"
              :label="'Federal'"
              :value="true"
              @change="toggleAgency('federal')"
              id="federal"
            />
          </v-checkbox-group>
        </div>

        <div class="form-group">
          <label for="taxLiability">Tax Liability:</label>
          <input
            type="number"
            v-model="form.taxLiability"
            id="taxLiability"
            class="form-control"
            placeholder="Enter Tax Liability"
          />
        </div>
        <div class="text-center">
          <small v-if="errors.taxLiability" class="error-message">{{
            errors.taxLiability
          }}</small>
        </div>

        <div class="form-group">
          <label
            >Form Numbers:
            <v-btn icon @click="dialog = true"
              ><v-icon md>mdi-information</v-icon></v-btn
            ></label
          >
          <v-checkbox-group v-model="selectedValues" class="checkbox-group">
            <v-checkbox
              v-for="(value, key) in form.formNumbers"
              :key="key"
              :label="value?.name"
              :value="value?.value"
              :id="value?.id"
              @change="value.value = !value.value"
            />
          </v-checkbox-group>
        </div>

        <!-- <div class="form-group">
        <label for="sourceCampaign">Source/Campaign:</label>
        <select
          v-model="form.sourceCampaign"
          id="sourceCampaign"
          class="form-control"
        >
          <option value="" disabled selected>Select Source/Campaign</option>
      
          <option
            v-for="campaign in campaigns"
            :key="campaign?.id"
            :value="campaign?.name?.toLowerCase()"
          >
            {{ campaign?.name }}
          </option>
        </select>
      </div> -->

        <div class="form-buttons">
          <button type="button" @click="prevPage" class="btn">Previous</button>
          <button
            type="submit"
            class="btn"
            :disabled="loading"
            @click="handleNext"
          >
            <div style="display: flex; gap: 10px; align-items: center">
              <span> Next</span>
              <v-progress-circular
                indeterminate
                color="white"
                :size="16"
                v-if="loading"
              ></v-progress-circular>
            </div>
          </button>
        </div>

        <v-dialog v-model="showDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Form656 Additional Questions</v-card-title
            >
            <v-card-text>
              <!-- Show questions initially -->
              <div v-if="showQuestions">
                <label>Are you in an open bankruptcy proceeding?</label>
                <v-radio-group v-model="questions.bankruptcy">
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                </v-radio-group>
                <div>
                  <small v-if="errors.bankruptcy" class="error-message">{{
                    errors.bankruptcy
                  }}</small>
                </div>

                <label>Have you filed all required federal returns?</label>
                <v-radio-group v-model="questions.federalReturns">
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                </v-radio-group>
                <div>
                  <small v-if="errors.federalReturns" class="error-message">{{
                    errors.federalReturns
                  }}</small>
                </div>

                <label
                  >Have you made all required estimated tax payments?</label
                >
                <v-radio-group v-model="questions.estimatedPayments">
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                </v-radio-group>
                <div>
                  <small
                    v-if="errors.estimatedPayments"
                    class="error-message"
                    >{{ errors.estimatedPayments }}</small
                  >
                </div>

                <label>
                  If you are self-employed and have employees, have you
                  submitted all required federal tax deposits?
                </label>
                <v-radio-group v-model="questions.federalTaxDeposits">
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                  <v-radio label="NA" value="Na"></v-radio>
                </v-radio-group>
                <div>
                  <small
                    v-if="errors.federalTaxDeposits"
                    class="error-message"
                    >{{ errors.federalTaxDeposits }}</small
                  >
                </div>
              </div>

              <!-- Show validation messages and proceed/cancel buttons if questions are hidden -->
              <div v-else>
                <div
                  v-if="validationMessages.length > 0"
                  class="error-message"
                  v-for="(message, index) in validationMessages"
                  :key="index"
                >
                  {{ message }}
                </div>
                <div class="action-buttons">
                  <button class="btn" @click="cancel">Quit Form</button>

                  <button class="btn" @click="proceed">Proceed</button>
                </div>
              </div>
            </v-card-text>
            <v-card-actions style="justify-content: right">
              <!-- Button to validate and hide questions -->
              <button
                class="btn"
                v-if="showQuestions"
                @click="validateQuestions"
              >
                Next
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </form>
    </div>
    <v-dialog v-model="dialog2" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Tax Information</span>
        </v-card-title>
        <v-card-text>
          <p>
            Here, you’ll enter details about your tax situation and choose the
            form you’d like to file. You’ll see options based on the IRS Fresh
            Start Program, such as:
          </p>
          <ul>
            <li>Form 843 (Penalty Abatement)</li>
            <li>Form 656 (Offer in Compromise)</li>
            <li>Form 9465 (Installment Agreement/Payment Plan)</li>
          </ul>
          <p>
            Choose the form that matches your tax needs. If you’re unsure which
            form is right for you, we recommend reviewing our explanations for
            each form to find the one that applies to your situation.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog2 = false"
            style="background-color: orange; color: white"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Which Forms are Needed for IRS Fresh Start Programs?</span>
        </v-card-title>
        <v-card-text>
          <p>
            At Premier Tax Debt Solutions, we simplify the process of completing
            the necessary IRS forms to help you resolve your tax debt. Below is
            a quick guide to the forms you'll need depending on your situation:
          </p>
          <h3>1. Penalty Abatement</h3>
          <p>
            <strong>Form 843:</strong> Used to request abatement (removal) of
            penalties for failing to file or pay taxes on time. This form helps
            reduce penalties if you qualify under IRS guidelines, such as for
            reasonable cause (e.g., illness, disaster).
          </p>
          <h3>2. Offer in Compromise</h3>
          <p>
            <strong>Form 656:</strong> This form is used to submit an Offer in
            Compromise, which allows you to settle your tax debt for less than
            the full amount owed, if you meet specific eligibility requirements.
          </p>
          <p>
            <strong>Form 433-A (OIC):</strong> Required to provide your
            financial information when applying for an Offer in Compromise for
            individuals. It shows your assets, income, and expenses to the IRS.
          </p>
          <p>
            <strong>Form 433-B (OIC):</strong> Used for businesses applying for
            an Offer in Compromise, detailing the business’s financial
            situation.
          </p>
          <h3>3. Installment Agreement</h3>
          <p>
            <strong>Form 9465:</strong> Use this form to request a monthly
            payment plan if you can’t pay your tax debt in full at the time it’s
            due. This form sets up an installment agreement with the IRS to pay
            off your debt over time.
          </p>
          <h3>4. Payment Plan</h3>
          <p>
            <strong>Form 9465 (also applies here):</strong> For those who need
            to request a specific IRS payment plan. This form applies whether
            you're setting up a short-term or long-term installment agreement.
          </p>
          <h3>Need Help Completing Your Forms?</h3>
          <p>
            Our Tax Form Navigator service makes it easy for you to complete the
            right forms, accurately and efficiently. We’ll walk you through the
            process and ensure everything is submitted correctly to the IRS. Let
            us help you get back on track with less hassle!
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog = false"
            style="background-color: orange; color: white"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      summary: null,
      dialog2: false,
      dialog: false,
      taxTypes: [],
      taxProblems: [],
      formNumbers: [],
      campaigns: [],
      forms: [],
      errors: {
        taxTypeId: "",
        taxProblemId: "",
        taxLiability: "",
        bankruptcy: "",
        federalReturns: "",
        estimatedPayments: "",
        federalTaxDeposits: "",
      },
      form: {
        taxTypeId: "",
        taxProblemId: "",

        agency: {
          state: false,
          federal: false,
        },
        taxLiability: null,
        formNumbers: [],
      },
      showDialog: false,
      showQuestions: true,
      validationMessages: [],
      questions: {
        bankruptcy: "",
        federalReturns: "",
        estimatedPayments: "",
        federalTaxDeposits: "",
      },
    };
  },
  async mounted() {
    await this.getTaxProblems();
    await this.getTaxTypes();
    await this.getFormNumbers();
    await this.getCampaigns();
    await this.getTaxInfoById();
    await this.getUserByRequestNumber();
  },
  methods: {
    async getUserByRequestNumber() {
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        this.summary = JSON.parse(res?.data[0]?.summary);
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserSummary() {
      console.log(this.taxLiability);
      this.summary.irsLiability = Number(this.form.taxLiability);
      const payload = {
        requestNumber: localStorage.getItem("requestNumber"),
        summary: this.summary,
      };
      try {
        const res = await this.$api.premierService.updateUserSummary(payload);

        this.summary = JSON.parse(res?.data[0]?.summary);
      } catch (error) {
        console.log(error);
      }
    },
    async getTaxTypes() {
      await this.$api.premierService
        .getTaxTypes()
        .then((res) => {
          if (res?.data?.length) {
            this.taxTypes = res?.data;
          }
        })
        .finally(() => {});
    },
    async getTaxProblems() {
      await this.$api.premierService
        .getTaxProblems()
        .then((res) => {
          if (res?.data?.length) {
            this.taxProblems = res?.data;
          }
        })
        .finally(() => {});
    },

    async getFormNumbers() {
      await this.$api.premierService
        .getFormNumbers()
        .then((res) => {
          if (res?.data?.length) {
            const updatedData = res.data.map((item) => ({
              ...item,
              value: false,
            }));

            this.form.formNumbers = updatedData;
          }
        })
        .finally(() => {});
    },
    async getCampaigns() {
      await this.$api.premierService
        .getCampaigns()
        .then((res) => {
          if (res?.data?.length) {
            this.campaigns = res?.data;
          }
        })
        .finally(() => {});
    },
    prevPage() {
      this.$router.push("/tax-evaluation/basic-information");
    },
    async getTaxInfoById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getTaxInfoById(payload);
        if (res?.data) {
          this.form.formNumbers =
            res?.data?.formNumbers.length >= 4 && res?.data?.formNumbers;
          this.form.taxTypeId = res?.data?.taxTypeId;
          this.form.taxProblemId = res?.data?.taxProblemId;
          this.form.taxLiability = res?.data?.taxLiability;
          this.form.agency = res?.data?.agency;
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateField(fieldName, fieldValue, message) {
      this.errors[fieldName] = fieldValue ? "" : message;
    },

    validateForm() {
      this.validateField(
        "taxTypeId",
        this.form.taxTypeId,
        "Tax type is required."
      );
      this.validateField(
        "taxProblemId",
        this.form.taxProblemId,
        "Tax problem is required."
      );
      this.validateField(
        "taxLiability",
        this.form.taxLiability,
        "Tax liability is required."
      );

      return Object.values(this.errors).every((error) => !error);
    },

    handleNext() {
      if (!this.validateForm()) {
        return; // Stop the function if validation fails
      }
      if (this.form.formNumbers[0]?.value) {
        this.showDialog = true;
      } else this.handleSubmit();
    },
    validateQuestions() {
      // Use the same consolidated validation method
      this.validateField(
        "bankruptcy",
        this.questions.bankruptcy,
        "This field is required."
      );
      this.validateField(
        "federalReturns",
        this.questions.federalReturns,
        "This field is required."
      );
      this.validateField(
        "estimatedPayments",
        this.questions.estimatedPayments,
        "This field is required."
      );
      this.validateField(
        "federalTaxDeposits",
        this.questions.federalTaxDeposits,
        "This field is required."
      );

      if (Object.values(this.errors).some((error) => error)) {
        return; // Stop if there are validation errors
      }

      this.checkEligibility();
    },

    checkEligibility() {
      // Initialize an array to store validation messages

      // Check eligibility based on the answers provided
      if (this.questions.bankruptcy === "Yes") {
        this.validationMessages.push(
          "> You are not eligible for an offer in compromise because you are in an open bankruptcy proceeding."
        );
      }

      if (this.questions.federalReturns === "No") {
        this.validationMessages.push(
          "> You are not eligible for an offer in compromise because you have not filed all required federal tax returns."
        );
      }

      if (this.questions.estimatedPayments === "No") {
        this.validationMessages.push(
          "> You are not eligible for an offer in compromise because you have not made all required estimated tax payments."
        );
      }

      if (this.questions.federalTaxDeposits === "No") {
        this.validationMessages.push(
          "> You are not eligible for an offer in compromise because you have not made all required federal tax deposits."
        );
      }

      // Check if there are any validation messages
      if (this.validationMessages.length === 0) {
        this.proceed(); // No errors, proceed to API call
      }

      // Hide the questions and display the validation message
      this.showQuestions = false;
    },

    proceed() {
      this.showDialog = false; // Close the dialog
      this.handleSubmit(); // Proceed with form submission
    },

    cancel() {
      localStorage.clear();
      this.$router.push("/terms");
    },
    async handleSubmit() {
      this.form.userId = localStorage.getItem("userId");
      this.loading = true;
      try {
        this.$api.premierService.saveTaxInfo(this.form).then((res) => {
          if (res?.data) {
            this.updateUserSummary();
            console.log(this.form.taxTypeId);
            if (this.form?.taxTypeId == "2" || this.form?.taxTypeId == "3") {
              localStorage.setItem("taxType", "Business");
              window.location.href = "/tax-evaluation/business-information";
            } else {
              localStorage.removeItem("taxType");
              window.location.href = "/tax-evaluation/assets";
            }
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
    toggleAgency(type) {
      if (type === "state") {
        this.form.agency.state = !this.form.agency.state;
        if (this.form.agency.state) {
          this.form.agency.federal = false;
        }
      } else if (type === "federal") {
        this.form.agency.federal = !this.form.agency.federal;
        if (this.form.agency.federal) {
          this.form.agency.state = false;
        }
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 700px;
}

h1 {
  margin-bottom: 20px;
}
.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
}

.form-group {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
  width: 200px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 70%;
}

.checkbox-group label {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
<style scoped>
/* Add any necessary styles */
/* .error-message {
  color: red;
  margin-bottom: 10px;
} */
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
