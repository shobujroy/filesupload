<template>
  <div>
    <div>
      <h1 class="text-center my-4">Business Information</h1>
      <h4 class="text-center">
      Please make sure to click Next Button to save your data.
    </h4>
      <div style="display: flex; justify-content: center">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-center">Business Assets</h2>

          <table class="table">
            <thead>
              <tr>
                <th>Business Assets</th>
                <th>Market Value ($)</th>
                <th>Quick Sale (%)</th>
                <th>Loan ($)</th>
                <th>Equity ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(asset, index) in assets" :key="index">
                <td>{{ asset.name }}</td>
                <td>
                  <input
                    v-model.number="asset.marketValue"
                    @input="calculateEquity(index)"
                    type="number"
                    class="form-control"
                    step="0.01"
                  />
                </td>
                <td v-if="!asset.isCash">
                  <select
                    v-model.number="asset.quickSale"
                    @change="calculateEquity(index)"
                    class="form-control"
                  >
                    <option v-for="n in quickSaleOptions" :key="n" :value="n">
                      {{ n }}
                    </option>
                  </select>
                </td>
                <td v-else>—</td>
                <td v-if="!asset.isCash">
                  <input
                    v-model.number="asset.loan"
                    @input="calculateEquity(index)"
                    type="number"
                    class="form-control"
                    step="0.01"
                  />
                </td>
                <td v-else>—</td>
                <td>
                  <input
                    :value="asset.equity.toFixed(2)"
                    type="number"
                    class="form-control"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>Total Business Assets:</strong></td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    disabled
                    v-model="totalBusinessAssets"
                    style="color: red"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: center">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-center">Business Income</h2>

          <table class="table">
            <thead>
              <tr>
                <th style="min-width: 200px">Income Items</th>
                <th style="min-width: 130px">Actual Income ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(income, index) in income" :key="index">
                <td>{{ income.name }}</td>
                <td>
                  <input
                    v-model.number="income.amount"
                    type="number"
                    class="form-control-2"
                    placeholder="Amount"
                  />
                </td>
              </tr>
              <tr>
                <td>Total Income:</td>
                <td>
                  <input
                    v-model.number="totalIncome"
                    type="number"
                    class="form-control-2"
                    placeholder="Amount"
                    disabled
                    style="color: red"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: center">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-center">Business Expenses</h2>

          <table class="table">
            <thead>
              <tr>
                <th style="min-width: 200px">Expense Items</th>
                <th style="min-width: 130px">Actual Expenses ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense, index) in expenses" :key="index">
                <td>{{ expense.name }}</td>
                <td>
                  <input
                    v-model.number="expense.amount"
                    type="number"
                    class="form-control-2"
                    placeholder="Amount"
                  />
                </td>
              </tr>
              <tr>
                <td>Total Living Expenses:</td>
                <td>
                  <input
                    v-model.number="totalExpenses"
                    type="number"
                    class="form-control-2"
                    placeholder="Amount"
                    disabled
                    style="color: red"
                  />
                </td>
              </tr>
              <tr>
                <td>Net Difference (Income - Expenses):</td>
                <td>
                  <input
                    v-model.number="difference"
                    type="number"
                    class="form-control-2"
                    placeholder="Amount"
                    disabled
                    style="color: red"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="form-buttons">
            <button type="button" @click="prevPage" class="btn">
              Previous
            </button>
            <button type="submit" class="btn" :disabled="loading">
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summary: null,
      loading: false,
      assets: [],
      income: [],
      expenses: [],

      quickSaleOptions: Array.from({ length: 11 }, (v, k) => 100 - k * 5),
      isUpdating: false,
    };
  },
  computed: {
    totalBusinessAssets() {
      return this.assets
        .reduce((total, asset) => total + asset.equity, 0)
        .toFixed(2);
    },
    totalIncome() {
      return this.income
        .reduce((sum, income) => sum + Number(income.amount), 0)
        .toFixed(2);
    },
    totalExpenses() {
      return this.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2);
    },
    difference() {
      const income = 0; // Replace with actual income value
      return (this?.totalIncome - this.totalExpenses).toFixed(2);
    },
  },
  async mounted() {
    await this.getBusinessInformationById();

    this.getUserByRequestNumber();
  },
  methods: {
    async getBusinessIncomeItems() {
      await this.$api.premierService
        .getBusinessIncomeItems()
        .then((res) => {
          if (res?.data?.length) {
            const updatedData = res.data.map((item) => ({
              ...item,
              amount: null,
            }));

            this.income = updatedData;
          }
        })
        .finally(() => {});
    },
    async getBusinessExpenseItems() {
      await this.$api.premierService
        .getBusinessExpenseItems()
        .then((res) => {
          if (res?.data?.length) {
            const updatedData = res.data.map((item) => ({
              ...item,
              amount: null,
            }));

            this.expenses = updatedData;
          }
        })
        .finally(() => {});
    },
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
      this.summary.totalAssets = Number(this.totalBusinessAssets);
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
    calculateEquity(index) {
      const asset = this.assets[index];
      if (asset.isCash) {
        asset.equity = asset.marketValue || 0;
      } else {
        const quickSaleValue =
          (asset.marketValue * (asset.quickSale || 0)) / 100;
        asset.equity = quickSaleValue - (asset.loan || 0);
      }
      asset.equity = parseFloat(asset.equity.toFixed(2));
    },
    prevPage() {
      this.$router.push("/tax-evaluation/tax-information");
    },

    async getBusinessInformationById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getBusinessInformationById(
          payload
        );
        if (res?.data?.length) {
          this.expenses = res?.data[0]?.businessExpenses;
          this.assets = res?.data[0]?.businessAssets;
          this.income = res?.data[0]?.businessIncome;
          // this.totalBusinessAssets = res?.data[0]?.totalBusinessAssets;
          // this.totalExpenses = res?.data[0]?.totalBusinessExpenses;
          // this.totalIncome = res?.data[0]?.totalBusinessIncome;
          // this.difference = res?.data[0]?.netBusinessIncome;
        } else {
          await this.getBusinessAssetItems();
          await this.getBusinessIncomeItems();
          await this.getBusinessExpenseItems();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      this.loading = true;

      const form = {
        userId: localStorage.getItem("userId"),
        businessAssets: this.assets,
        businessIncome: this.income,
        businessExpenses: this.expenses,
        totalBusinessAssets: this.totalBusinessAssets,
        totalBusinessIncome: this.totalIncome,
        totalBusinessExpenses: this.totalExpenses,
        netBusinessIncome: this.difference,
      };
      try {
        this.$api.premierService.saveBusinessInformation(form).then((res) => {
          if (res?.data) {
            // this.updateUserSummary();
            this.$router.push("/tax-evaluation/assets");
            this.loading = false;
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
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        this.loading = false;
      }
    },
    async getBusinessAssetItems() {
      await this.$api.premierService
        .getBusinessAssetItems()
        .then((res) => {
          if (res?.data?.length) {
            const updatedData = res.data.map((item) => ({
              ...item,
              marketValue: 0,
              quickSale:
                item.name === "Cash in Banks" ||
                item.name === "Cash on Hand" ||
                item.name === "Properties" ||
                item.name === "Tools and Books"
                  ? 100
                  : 80,
              loan:
                item.name === "Cash in Banks" ||
                item.name === "Cash on Hand" ||
                item.name === "Properties" ||
                item.name === "Tools and Books"
                  ? "0"
                  : 0,
              equity: 0,
              isCash:
                item.name === "Cash in Banks" ||
                item.name === "Cash on Hand" ||
                item.name === "Properties" ||
                item.name === "Tools and Books"
                  ? true
                  : false,
            }));

            this.assets = updatedData;
          }
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 900px;
  overflow-x: auto;
  margin-bottom: 20px;
  @media (min-width: 1140px) {
    min-width: 900px;
  }

  // Media query for large screens (lg)
  // @media (min-width: 992px) and (max-width: 1140.98px) {
  //   min-width: 800px;
  // }
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
  min-width: 130px;
}

.table th {
  background-color: #f2f2f2;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.total-equity {
  margin-top: 20px;
  font-weight: bold;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 4px 10px;
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

.total-expenses {
  margin-top: 20px;
  font-weight: bold;
}
</style>
