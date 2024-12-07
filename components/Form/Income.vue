<template>
  <div v-if="!loading">
    <div style="display: flex; justify-content: center">
      <form @submit.prevent="handleSubmit">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 80%">Source of Income</th>
              <th style="width: 20%">Monthly ($)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Primary Tax Payer -->
            <tr>
              <td>
                Primary Tax Payer: <br />
                <input
                  v-model.number="primaryTaxPayer.wages"
                  type="number"
                  class="form-control income-input"
                  placeholder="Wages"
                  :disabled="!isEditing"

                />
                +
                <input
                  v-model.number="primaryTaxPayer.socialSecurity"
                  type="number"
                  class="form-control income-input"
                  placeholder="Social Security"
                  :disabled="!isEditing"

                />
                +
                <input
                  v-model.number="primaryTaxPayer.pension"
                  type="number"
                  class="form-control income-input"
                  placeholder="Pension"
                  :disabled="!isEditing"

                />
                =
              </td>
              <td>
                <input
                  :value="calculatePrimaryTaxPayerTotal"
                  type="number"
                  class="form-control-2"
                  disabled
                />
              </td>
            </tr>
            <!-- Spouse/Other Contributors -->
            <tr>
              <td>
                Spouse/Other Contributors: <br />
                <input
                  v-model.number="spouseOtherContributors.wages"
                  type="number"
                  class="form-control income-input"
                  placeholder="Wages"
                  :disabled="!isEditing"

                />
                +
                <input
                  v-model.number="spouseOtherContributors.socialSecurity"
                  type="number"
                  class="form-control income-input"
                  placeholder="Social Security"
                  :disabled="!isEditing"

                />
                +
                <input
                  v-model.number="spouseOtherContributors.pension"
                  type="number"
                  class="form-control income-input"
                  placeholder="Pension"
                  :disabled="!isEditing"

                />
                =
              </td>
              <td>
                <input
                  :value="calculateSpouseOtherContributorsTotal"
                  type="number"
                  class="form-control-2"
                  disabled
                />
              </td>
            </tr>
            <!-- Dividends/Interest -->
            <tr>
              <td>Dividends/Interest</td>
              <td>
                <input
                  v-model.number="dividendsInterest"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <!-- Rental Income -->
            <tr>
              <td>
                <input
                  v-model.number="rental.rentalIncome"
                  type="number"
                  class="form-control income-input"
                  placeholder="Rental Income"
                  :disabled="!isEditing"

                />
                -
                <input
                  v-model.number="rental.rentalExpenses"
                  type="number"
                  class="form-control income-input"
                  placeholder="Rental Expenses"
                  :disabled="!isEditing"

                />
                =
              </td>
              <td>
                <input
                  :value="calculateRentalNet"
                  type="number"
                  class="form-control-2"
                  disabled
                />
              </td>
            </tr>
            <!-- Distributions -->
            <tr>
              <td>Distributions</td>
              <td>
                <input
                  v-model.number="distributions"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <!-- Alimony -->
            <tr>
              <td>Alimony</td>
              <td>
                <input
                  v-model.number="alimony"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <!-- Child Support -->
            <tr>
              <td>Child Support</td>
              <td>
                <input
                  v-model.number="childSupport"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <!-- Other Income -->
            <tr>
              <td>Other (rent subsidy, oil credit, etc)</td>
              <td>
                <input
                  v-model.number="otherRent"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <tr>
              <td>Other Income</td>
              <td>
                <input
                  v-model.number="otherIncome1"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <tr>
              <td>Other Income</td>
              <td>
                <input
                  v-model.number="otherIncome2"
                  type="number"
                  class="form-control-2"
                  placeholder="Amount"
                  :disabled="!isEditing"

                />
              </td>
            </tr>
            <tr>
              <td><strong>Total Monthly Income:</strong></td>
              <td>
                <input
                  type="number"
                  class="form-control-2"
                  disabled
                  v-model="totalIncome"
                  style="color: red"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="form-buttons" v-if="isEditing">
          <button type="submit" class="btn" :disabled="btnLoading">
            <div style="display: flex; gap: 10px; align-items: center">
              <span> Update</span>
              <v-progress-circular
                indeterminate
                color="white"
                :size="16"
                v-if="btnLoading"
              ></v-progress-circular>
            </div>
          </button>
        </div>
      </form>
    </div>
    <v-dialog v-model="dialog4" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Income Information</span>
        </v-card-title>
        <v-card-text>
          <p>
            Here, you’ll enter your monthly income. Be sure to include your:
          </p>
          <ul>
            <li>
              <strong>After-Tax Income:</strong> This is what you receive after
              taxes are deducted from your paycheck each month. If you have
              multiple sources of income, be sure to list them all.
            </li>
          </ul>
          <p>
            Entering accurate information here is important, as it will impact
            your eligibility for certain IRS Fresh Start Programs.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog4 = false"
            style="background-color: orange; color: white"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div
    v-else
    style="display: flex; justify-content: center; align-items: center"
    class="mt-4"
  >
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,

      loading: false,
      btnLoading: false,
      summary: null,
      dialog4: false,

      primaryTaxPayer: {
        wages: null,
        socialSecurity: null,
        pension: null,
      },
      spouseOtherContributors: {
        wages: null,
        socialSecurity: null,
        pension: null,
      },
      rental: { rentalIncome: null, rentalExpenses: null },
      dividendsInterest: null,

      distributions: null,
      alimony: null,
      childSupport: null,
      otherRent: null,
      otherIncome1: null,
      otherIncome2: null,
    };
  },

  computed: {
    calculatePrimaryTaxPayerTotal() {
      return (
        Number(this.primaryTaxPayer.wages) +
        Number(this.primaryTaxPayer.socialSecurity) +
        Number(this.primaryTaxPayer.pension)
      );
    },
    calculateSpouseOtherContributorsTotal() {
      return (
        Number(this.spouseOtherContributors.wages) +
        Number(this.spouseOtherContributors.socialSecurity) +
        Number(this.spouseOtherContributors.pension)
      );
    },
    calculateRentalNet() {
      return (
        Number(this.rental.rentalIncome) - Number(this.rental.rentalExpenses)
      );
    },
    totalIncome() {
      const primary = this.calculatePrimaryTaxPayerTotal;
      const spouse = this.calculateSpouseOtherContributorsTotal;
      const rental = this.calculateRentalNet;
      const otherIncomeSources =
        Number(this.dividendsInterest) +
        Number(this.distributions) +
        Number(this.alimony) +
        Number(this.childSupport) +
        Number(this.otherRent) +
        Number(this.otherIncome1) +
        Number(this.otherIncome2);

      return (primary + spouse + rental + otherIncomeSources).toFixed(2);
    },
  },
  async mounted() {
    this.loading = true;
    if (this.$route.query.edit === "true") {
      this.isEditing = true;
    }
    await this.getIncomeInfoById();
    await this.getUserByRequestNumber();
    this.loading = false;
  },
  methods: {
    prevPage() {
      this.$router.push("/tax-evaluation/assets");
    },
    async getIncomeInfoById() {
      const payload = { userId: this.$route.query.userId };
      try {
        const res = await this.$api.premierService.getIncomeInfoById(payload);
        if (res?.data?.length) {
          this.primaryTaxPayer = res?.data[0]?.primaryTaxPayer;
          this.spouseOtherContributors = res?.data[0]?.spouseOtherContributors;
          this.rental = res?.data[0]?.rental;
          this.distributions = res?.data[0]?.distributions?.value;
          this.dividendsInterest = res?.data[0]?.dividendsInterest?.value;

          this.alimony = res?.data[0]?.alimony?.value;
          this.childSupport = res?.data[0]?.childSupport?.value;
          this.otherRent = res?.data[0]?.otherRent?.value;
          this.otherIncome1 = res?.data[0]?.otherIncome1?.value;
          this.otherIncome2 = res?.data[0]?.otherIncome2?.value;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserByRequestNumber() {
      const payload = { requestNumber: this.$route.query.requestNumber };
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
      this.summary.totalIncome = Number(this.totalIncome);
      const payload = {
        requestNumber: this.$route.query.requestNumber,
        summary: this.summary,
      };
      try {
        const res = await this.$api.premierService.updateUserSummary(payload);

        this.summary = JSON.parse(res?.data[0]?.summary);
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      this.btnLoading = true;

      const form = {
        userId: this.$route.query.userId,
        primaryTaxPayer: this.primaryTaxPayer,
        spouseOtherContributors: this.spouseOtherContributors,
        rental: this.rental,
        dividendsInterest: { value: this.dividendsInterest },

        distributions: { value: this.distributions },
        alimony: { value: this.alimony },
        childSupport: { value: this.childSupport },
        otherRent: { value: this.otherRent },
        otherIncome1: { value: this.otherIncome1 },
        otherIncome2: { value: this.otherIncome2 },
      };
      try {
        this.$api.premierService.saveIncomeInfo(form).then((res) => {
          if (res?.data) {
            this.updateUserSummary();
            // this.$router.push("/tax-evaluation/expenses");
            this.$swal.fire({
              toast: true,
              timerProgressBar: true,
              position: "top-end",
              icon: "success",
              text: "Income Updated Successfully.",
              showConfirmButton: false,
              timer: 2000,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });
            this.btnLoading = false;
          }
        });

        // handle successful response
      } catch (error) {
        console.log(error.response.data);
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response.data,
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        this.btnLoading = false;
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
  max-width: 900px;
}

h1 {
  margin-bottom: 20px;
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

.income-input {
  width: 20%;
  display: inline-block;
  margin-right: 5px;
}

.form-control {
  width: 29%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-control-2 {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.total-income {
  display: flex;
  margin-top: 20px;
  align-items: center;
  gap: 10px;
  justify-content: right;
  font-weight: bold;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
