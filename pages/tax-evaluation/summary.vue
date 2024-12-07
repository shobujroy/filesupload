<template>
  <div>
    <h1 class="text-center">Summary</h1>
    <div style="display: flex; justify-content: center">
      <div class="summary-main">
        <div class="summary-totals">
          <div>
            <label>Total IRS Liability:</label>
            <input
              type="number"
              v-model="totalIrsLiability"
              class="form-control-2"
              disabled
            />
          </div>
          <div>
            <label>Total Equity (Assets):</label>
            <input
              type="number"
              v-model="totalAssets"
              class="form-control-2"
              disabled
            />
          </div>
        </div>
        <div class="expense-summary">
          <div class="expense-item">
            <label>Monthly Income:</label>
            <input
              type="number"
              v-model="monthlyIncome"
              class="form-control-2"
              disabled
            />
          </div>
          <span class="sign">-</span>
          <div class="expense-item">
            <label>Allowable Expenses:</label>
            <input
              type="number"
              v-model="allowableExpenses"
              class="form-control-2"
              disabled
            />
          </div>
          <span class="sign">=</span>
          <div class="expense-item">
            <label>Disposable Income:</label>
            <input
              type="number"
              :value="calculateDisposableIncome"
              class="form-control-2"
              disabled
            />
          </div>
        </div>
        <div class="mb-4 text-center" :style="eligibilityStyle">
          {{ eligibilityText }}
          <span v-if="isIneligibleForPrograms">
            <v-btn icon @click="dialog = true">
              <v-icon color="white">mdi-information</v-icon>
            </v-btn>
          </span>
        </div>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline"
              >Notice: Unfiled Tax Years Detected</v-card-title
            >
            <v-card-text>
              It appears you may have unfiled tax years, which may impact your
              eligibility for the IRS Fresh Start Program. To proceed with the
              program, all required tax years must be filed.
              <br /><br />
              We offer a convenient tax preparation service to help you get
              caught up quickly and meet IRS compliance. Apply for assistance
              and click below to get started with our tax preparation team or
              call us at 1-833-4-TAX-211 for immediate assistance.
            </v-card-text>
            <v-card-actions>
              <!-- Button to get assistance -->
              <v-btn
                color="primary"
                @click="$router.push('/assistance?location=Other')"
                >Get Assistance with Tax Preparation</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <h3>OIC Minimum OFFER Based on Doubt as to Collectibility</h3>
        <h4 style="background: #effdee">Lump Sum Cash</h4>
        <table class="table" style="background: #effdee">
          <thead>
            <tr>
              <th>Required Future Income</th>
              <th>Offer Amount</th>
              <th>Initial Payment</th>
              <th>Potential Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  :value="
                    lumpSum.potentialSavings >= 0
                      ? lumpSum.requiredFutureIncome
                      : 0
                  "
                  class="form-control-2"
                  disabled
                />
              </td>
              <td>
                <input
                  type="number"
                  :value="
                    lumpSum.potentialSavings >= 0 ? lumpSum.offerAmount : 0
                  "
                  class="form-control-2"
                  disabled
                />
              </td>
              <td>
                <input
                  type="number"
                  :value="
                    lumpSum.potentialSavings >= 0 ? lumpSum.initialPayment : 0
                  "
                  class="form-control-2"
                  disabled
                />
              </td>
              <td>
                <input
                  :type="lumpSum.potentialSavings >= 0 ? 'number' : 'text'"
                  :value="
                    lumpSum.potentialSavings >= 0
                      ? lumpSum.potentialSavings
                      : 'Not Eligible'
                  "
                  class="form-control-2"
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p style="background: #effdee">
          This option requires a payment of 20% of the total offer amount
          upfront (unless you qualify for Low Income Certification), with the
          remaining balance to be paid in five or fewer installments within 24
          months of offer acceptance.
        </p>
        <h4 style="background: #effdee">
          Meets the Low Income Certification Guidelines:
          <span
            v-if="calculateDisposableIncome === 0 && !isIneligibleForPrograms"
            style="color: green"
          >
            YES
          </span>
          <span v-else style="color: red">NO</span>
        </h4>
        <p style="background: #effdee">
          If you qualify for Low Income Certification, you won't need to make
          the initial payment or monthly payments while your offer is being
          evaluated, but you will still need to select a payment option.
        </p>
        <div class="form-buttons">
          <button type="button" @click="prevPage" class="btn">Previous</button>
          <button
            type="submit"
            class="btn"
            :disabled="loading"
            @click="startOver"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      taxYears: [],
      totalIrsLiability: 0,
      totalAssets: 0,
      monthlyIncome: 0,
      allowableExpenses: 0,
      dialog: false,
    };
  },

  computed: {
    calculateDisposableIncome() {
      const disposableIncome = this.monthlyIncome - this.allowableExpenses;
      return disposableIncome > 0 ? disposableIncome.toFixed(2) : 0;
    },
    lumpSum() {
      const disposableIncome = Math.max(
        parseFloat(this.calculateDisposableIncome),
        0
      );
      const requiredFutureIncome = disposableIncome * 12;
      const offerAmount = this.totalAssets + requiredFutureIncome;
      const initialPayment = (offerAmount * 0.2).toFixed(2);
      const potentialSavings = (this.totalIrsLiability - offerAmount).toFixed(
        2
      );

      return {
        requiredFutureIncome: requiredFutureIncome.toFixed(2),
        offerAmount: offerAmount.toFixed(2),
        initialPayment: initialPayment,
        potentialSavings: potentialSavings,
      };
    },
    // New computed property to check for unfiled taxes in any year
    isIneligibleForPrograms() {
      return this.taxYears.some(
        (year) =>
          year.unifiledTaxesToFederal === 1 ||
          year.unifiledTaxesToState === 1 ||
          year.unifiledBusinessTaxesToFederal === 1 ||
          year.unifiledBusinessTaxesToState === 1
      );
    },
    eligibilityText() {
      if (this.isIneligibleForPrograms) {
        this.dialog = true;
        return "Not Eligible for Fresh Start Program due to unfiled taxes.";
      }
      return this.lumpSum.potentialSavings >= 0
        ? "Eligible for Fresh Start Program."
        : "Not Eligible for Fresh Start Program.";
    },
    eligibilityStyle() {
      if (this.isIneligibleForPrograms) {
        return { background: "#fc1c1c", color: "white" };
      }
      return {
        background: this.lumpSum.potentialSavings >= 0 ? "#73eb6b" : "#fc1c1c",
        color: this.lumpSum.potentialSavings >= 0 ? "black" : "white",
      };
    },
  },

  mounted() {
    this.getUserByRequestNumber();
    this.getTaxYearsInfoById();
  },

  methods: {
    async getTaxYearsInfoById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getTaxYearsInfoById(payload);
        if (res?.data?.length) {
          this.taxYears = res?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserByRequestNumber() {
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        const summary = JSON.parse(res?.data[0]?.summary);
        this.totalAssets = summary?.totalAssets;
        this.monthlyIncome = summary?.totalIncome;
        this.allowableExpenses = summary?.totalExpenses;
        this.totalIrsLiability = summary?.irsLiability;
      } catch (error) {
        console.log(error);
      }
    },
    prevPage() {
      this.$router.push("/tax-evaluation/tax-years");
    },
    startOver() {
      this.$router.push("/tax-evaluation/forms");
    },
  },
};
</script>

<style scoped>
.summary-totals,
.expense-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.summary-totals div,
.expense-summary div.expense-item {
  width: 32%;
  display: flex;
  flex-direction: column;
}

.sign {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  padding-top: 25px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 4px;
  text-align: left;
  min-width: 60px;
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
  max-width: 1000px;
  overflow-x: auto;
}
</style>
