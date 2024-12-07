<template>
  <div>
    <h1 class="text-center">Summary</h1>
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
            v-model="totalEquity"
            class="form-control-2"
            disabled
          />
        </div>
      </div>
      <div class="expense-summary">
        <div class="expense-item">
          <label>Monthly Expenses:</label>
          <input
            type="number"
            v-model="monthlyExpenses"
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
      <div
        class="mb-4 text-center"
        style="background: #73eb6b"
        v-if="calculateDisposableIncome > 0"
      >
        Eligible for Loan.
      </div>
      <div
        class="mb-4 text-center"
        style="background: #fc1c1c; color: white"
        v-else
      >
        Not Eligible for Loan.
      </div>

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
                v-model="lumpSum.requiredFutureIncome"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="lumpSum.offerAmount"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="lumpSum.initialPayment"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="lumpSum.potentialSavings"
                class="form-control-2"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p style="background: #effdee">
        This option requires a payment of 20% of the total offer amount 
        upfront (unless you qualify for Low Income Certification), with the remaining 
        balance to be paid in five or fewer installments within 24 months of offer acceptance.
      </p>

      <!-- <h4 style="background: #fefdef">Periodic Payment</h4>
      <table class="table" style="background: #fefdef">
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
                v-model="periodicPayment.requiredFutureIncome"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="periodicPayment.offerAmount"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="periodicPayment.initialPayment"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                v-model="periodicPayment.potentialSavings"
                class="form-control-2"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table> -->
      <!-- <p style="background: #fefdef">
        This option requires the first payment with the offer and the Disposable
        balance paid, within 24 months, in accordance with your proposed offer
        terms. Under this option, you must continue to make all subsequent
        payments while the IRS is evaluating your offer (unless you meet the Low
        Income Certification guidelines). Failure to make these payments will
        cause your offer to be returned.
      </p> -->

      <!-- <h4 style="background: #effdee">
        Meets the Low Income Certification Guidelines: YES
      </h4>
      <p style="background: #effdee">
        If you qualify for Low Income Certification, you won't need to make the initial
        payment or monthly payments while your offer is being evaluated, but you will still 
        need to select a payment option.
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalIrsLiability: null, // Example value
      totalEquity: null, // Example value
      monthlyExpenses: null, // Example value
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
    };
  },

  computed: {
    calculateDisposableIncome() {
      return (this.monthlyExpenses - this.allowableExpenses).toFixed(2);
    },
  },

  methods: {
    prevPage() {
      this.$router.push("/tax-evaluation/tax-years");
    },
    startOver() {
      this.$router.push("/tax-evaluation/basic-information");
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
  max-width: 1000px;
}
</style>

<!-- // summary new -->

<template>
  <div>
    <h1 class="text-center">Summary</h1>
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
            v-model="totalEquity"
            class="form-control-2"
            disabled
          />
        </div>
      </div>
      <div class="expense-summary">
        <div class="expense-item">
          <label>Monthly Expenses:</label>
          <input
            type="number"
            v-model="monthlyExpenses"
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
      </div>

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
                :value="lumpSum.requiredFutureIncome"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                :value="lumpSum.offerAmount"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="number"
                :value="lumpSum.initialPayment"
                class="form-control-2"
                disabled
              />
            </td>
            <td>
              <input
                type="text"
                :value="
                  lumpSum.potentialSavings > 0 ? 'Eligible' : 'Ineligible'
                "
                :style="
                  lumpSum.potentialSavings > 0 ? 'color:green' : 'color:red'
                "
                class="form-control-2"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p style="background: #effdee">
        This option requires 20% of the total offer amount to be paid with the
        offer (unless you meet the Low Income Certification guidelines) and the
        Disposable balance paid in five or fewer payments within 24 months of
        the date your offer is accepted.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalIrsLiability: 10000, // Example value
      totalEquity: 5000, // Example value
      monthlyExpenses: 2000, // Example value
      allowableExpenses: 1500, // Example value
    };
  },

  computed: {
    calculateDisposableIncome() {
      return (this.monthlyExpenses - this.allowableExpenses).toFixed(2);
    },
    lumpSum() {
      const disposableIncome = parseFloat(this.calculateDisposableIncome);
      const requiredFutureIncome = disposableIncome * 12;
      const offerAmount = this.totalEquity + requiredFutureIncome;
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
    eligibilityText() {
      return this.calculateDisposableIncome > 0
        ? "Eligible for Loan."
        : "Not Eligible for Loan.";
    },
    eligibilityStyle() {
      return {
        background: this.calculateDisposableIncome > 0 ? "#73eb6b" : "#fc1c1c",
        color: this.calculateDisposableIncome > 0 ? "black" : "white",
      };
    },
  },

  methods: {
    prevPage() {
      this.$router.push("/tax-evaluation/tax-years");
    },
    startOver() {
      this.$router.push("/tax-evaluation/basic-information");
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
  max-width: 1000px;
}
</style>
