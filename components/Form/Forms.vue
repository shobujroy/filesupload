<template>
  <div>
    <h1 class="text-center my-4" v-if="selectedForm === 'main'">
      Download Forms
      <v-btn icon @click="dialog = true"
        ><v-icon md>mdi-information</v-icon></v-btn
      >
    </h1>
    <div
      style="display: flex; justify-content: center"
      v-if="selectedForm === 'main'"
    >
      <div class="summary-main">
        <v-row>
          <v-col
            v-for="(form, index) in forms"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="text-center"
          >
            <v-card style="background-color: #2c7671; color: white">
              <v-card-title class="headline">{{ form?.name }}</v-card-title>
              <v-card-subtitle class="white--text">{{
                form?.description
              }}</v-card-subtitle>
              <v-card-text class="display-1 text-center" style="color: #f0a904">
                ${{ form?.price ? form?.price : 0 }}
              </v-card-text>
              <v-row justify="center">
                <v-col cols="11">
                  <button
                    class="btn"
                    :disabled="loading"
                    @click="viewForm(form)"
                  >
                    <div style="display: flex; gap: 10px; align-items: center">
                      <span> View</span>
                      <v-progress-circular
                        indeterminate
                        color="white"
                        :size="16"
                        v-if="loading"
                      ></v-progress-circular>
                    </div></button
                ></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <Forms433a
      v-if="selectedForm === '433a'"
      @navigateToMain="navigateToMain"
    />

    <!-- Display Form 433B -->
    <Forms433b
      v-if="selectedForm === '433b'"
      @navigateToMain="navigateToMain"
    />

    <!-- Display Form 843 -->
    <Forms843 v-if="selectedForm === '843'" @navigateToMain="navigateToMain" />

    <!-- Display Form 9465 -->
    <Forms9465
      v-if="selectedForm === '9465'"
      @navigateToMain="navigateToMain"
    />

    <Forms656b
      v-if="selectedForm === '656b'"
      @navigateToMain="navigateToMain"
    />
    <Forms433f
      v-if="selectedForm === '433f'"
      @navigateToMain="navigateToMain"
    />

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
          <h3>5. Currently Not Collectible Status Application</h3>
          <p>
            <strong> Form 433-F</strong> helps taxpayers apply for Currently Not
            Collectible (CNC) status, temporarily halting IRS collection actions
            like levies or garnishments due to financial hardship. This form
            provides income, expense, and asset details, allowing the IRS to
            assess the taxpayer’s inability to pay without significant financial
            strain.
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
import PDF_GLOBAL_LAYOUT from "~/helper/pdfGlobalFormat";
import { PDFDocument } from "pdf-lib";
import Forms433a from "@/components/Forms/433a.vue";
import Forms433b from "@/components/Forms/433b.vue";
import Forms843 from "@/components/Forms/843.vue";
import Forms9465 from "@/components/Forms/9465.vue";
import Forms656b from "@/components/Forms/656b.vue";
import Forms433f from "@/components/Forms/433f.vue";

export default {
  components: {
    Forms433a,
    Forms433b,
    Forms843,
    Forms9465,
    Forms656b,
    Forms433f,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedForm: "main",
      userData: null,
      totalIrsLiability: null, // Example value
      totalEquity: null, // Example value
      monthlyExpenses: 5, // Example value
      allowableExpenses: null, // Example value
      lumpSum: {
        requiredFutureIncome: null, // Example value
        offerAmount: null, // Example value
        initialPayment: null, // Example value
        potentialSavings: null, // Example value
      },
      periodicPayment: {
        requiredFutureIncome: null, // Example value
        offerAmount: null, // Example value
        initialPayment: null, // Example value
        potentialSavings: null, // Example value
      },
      forms: [],
    };
  },

  async mounted() {
    await this.getFormNumbers();
    await this.getUserByRequestNumber();
  },
  methods: {
    navigateToMain() {
      this.selectedForm = "main";
    },
    getAreaCode(phoneNumber) {
      const match = phoneNumber.match(/^\+1 \((\d{3})\)/);
      return match ? match[1] : "";
    },

    // Function to extract the local number without dashes
    getLocalNumber(phoneNumber) {
      const match = phoneNumber.match(/^\+1 \(\d{3}\) (\d{3})-(\d{4})$/);
      return match ? `${match[1]}${match[2]}` : "";
    },
    formatDateToMMDDYYYY(dateString) {
      if (!dateString) return "";

      const [year, month, day] = dateString.split("-");
      return `${month}${day}${year}`;
    },
    getSSNPart(ssn, part) {
      // Remove dashes from the SSN
      const cleanSSN = ssn.replace(/-/g, "");

      // Ensure the cleaned SSN is 9 digits long
      if (cleanSSN.length !== 9) {
        return ""; // Return empty if the SSN format is incorrect
      }

      switch (part) {
        case "one":
          return cleanSSN.slice(0, 3); // First three digits
        case "two":
          return cleanSSN.slice(3, 5); // 4th and 5th digits
        case "three":
          return cleanSSN.slice(5, 9); // 6th to 9th digits
        default:
          return ""; // Return empty if an invalid part is provided
      }
    },
    async getUserByRequestNumber() {
      const payload = { requestNumber: this.$route.query.requestNumber };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        this.userData = res?.data[0];

        const summary = JSON.parse(res?.data[0]?.summary);
        this.totalAssets = summary?.totalAssets;
        this.monthlyIncome = summary?.totalIncome;
        this.allowableExpenses = summary?.totalExpenses;
        this.totalIrsLiability = summary?.irsLiability;
      } catch (error) {
        console.log(error);
      }
    },
    viewForm(file) {
      console.log(file?.id);

      switch (file?.id) {
        case 1:
          this.selectedForm = "656b";
          break;
        case 2:
          this.selectedForm = "843";
          break;
        case 3:
          this.selectedForm = "433a";
          break;
        case 4:
          this.selectedForm = "433b";
          break;
        case 5:
          this.selectedForm = "9465";
          break;
        case 6:
          this.selectedForm = "433f";
          break;
        default:
          console.log("No matching file ID");
          break;
      }
    },
    async completeForm() {
      const payload = { requestNumber: this.$route.query.requestNumber };
      try {
        const res = await this.$api.premierService.completeForm(payload);
        if (res) {
          localStorage.clear();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getFormNumbers() {
      await this.$api.premierService
        .getFormNumbers()
        .then((res) => {
          if (res?.data?.length) {
            this.forms = res?.data;
          }
        })
        .finally(() => {});
    },
    prevPage() {
      this.$router.push("/tax-evaluation/summary");
    },
    startOver() {
      this.completeForm();

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.form-control-2 {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.summary-main {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 1200px;
}
.btn-download {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-download:hover {
  background-color: #45a049;
}

.download-table thead tr th,
.download-table tbody tr td {
  text-align: center;
  width: 50%;
}
</style>
<style scoped>
.v-card {
  margin: 20px 0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

  min-height: 280px;
}
.v-card-title {
  font-weight: bold;
  text-align: center;
}
.v-card-subtitle {
  text-align: center;
  color: #666;
}
.v-card-text {
  font-weight: bold;
  color: #4caf50;
}
.headline {
  font-size: 19px !important;
  justify-content: center;
  min-height: 130px;
}
</style>
