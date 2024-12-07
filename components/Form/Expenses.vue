<template>
  <div v-if="!loading">
    <div style="display: flex; justify-content: center">
      <form @submit.prevent="handleSubmit">
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
                  :disabled="!isEditing"
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

        <div class="expense-details">
          <strong>Food, Clothing and Miscellaneous:</strong>
          <p>
            Total of food, clothing, housekeeping supplies, and personal care
            products for one month. The miscellaneous allowance is for expenses
            incurred that are not included in any other allowable living expense
            items. Examples are credit card payments, bank fees and charges,
            reading material, and school supplies.
          </p>

          <strong>Housing and Utilities:</strong>
          <p>
            For principal residence: Total of rent or mortgage payment. Add the
            average monthly expenses for the following: property taxes,
            homeowner’s or renter’s insurance, maintenance, dues, fees, and
            utilities. Utilities include gas, electricity, water, fuel, oil,
            other fuels, trash collection, telephone, cell phone, cable
            television and internet services.
          </p>

          <strong>Vehicle Ownership Costs:</strong>
          <p>Total of monthly lease or purchase/loan payments.</p>

          <strong>Vehicle Operating Costs:</strong>
          <p>
            Total of maintenance, repairs, insurance, fuel, registrations,
            licenses, inspections, parking, and tolls for one month.
          </p>

          <strong>Public Transportation:</strong>
          <p>
            Total of monthly fares for mass transit (e.g., bus, train, ferry,
            taxi, etc.).
          </p>

          <strong>Out of Pocket Health Care Costs:</strong>
          <p>
            Monthly total of medical services, prescription drugs, and medical
            supplies (e.g., eyeglasses, hearing aids, etc.).
          </p>

          <strong>Current Year Taxes:</strong>
          <p>
            Include state and Federal taxes withheld from salary or wages, or
            paid as estimated taxes.
          </p>
        </div>

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
    <v-dialog v-model="dialog5" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Expense Information</span>
        </v-card-title>
        <v-card-text>
          <p>
            Break down your monthly expenses in this section. This includes
            rent/mortgage payments, utilities, food, insurance, transportation,
            and any other regular expenses.
          </p>
          <p>
            <strong>Why It’s Important:</strong> Listing as many expenses as
            possible will help with the qualification process. The IRS will look
            at your financial situation to determine your eligibility, and the
            more complete this section is, the better.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog5 = false"
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
      dialog5: false,

      isUpdating: false,
      expenses: [],
    };
  },

  computed: {
    totalExpenses() {
      return this.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2);
    },
    difference() {
      const income = 0; // Replace with actual income value
      return (this?.summary?.totalIncome - this.totalExpenses).toFixed(2);
    },
  },
  async mounted() {
    this.loading = true;
    if (this.$route.query.edit === "true") {
      this.isEditing = true;
    }
    await this.getExpenseInfoById();
    await this.getUserByRequestNumber();
    this.loading = false;
  },
  methods: {
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
      this.summary.totalExpenses = Number(this.totalExpenses);
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
    prevPage() {
      this.$router.push("/tax-evaluation/income");
    },
    async getExpenseInfoById() {
      const payload = { userId: this.$route.query.userId };
      try {
        const res = await this.$api.premierService.getExpenseInfoById(payload);
        if (res?.data?.length) {
          this.isUpdating = true;
          const filteredData = res?.data?.map((item) => ({
            id: item.id,
            amount: item?.actualExpense,
            expenseItemId: item?.expenseItemId,
            name: item?.expenseItem?.name,
          }));
          this.expenses = filteredData;
        } else this.getExpenseItems();
      } catch (error) {
        console.log(error);
      }
    },

    async handleSubmit() {
      this.btnLoading = true;
      try {
        for (const expense of this.expenses) {
          const payload = {
            userId: this.$route.query.userId,
            actualExpense: expense.amount,
          };
          if (this.isUpdating) {
            payload.id = expense?.id;
            payload.expenseItemId = expense?.expenseItemId;
          } else {
            payload.expenseItemId = expense?.id;
          }

          await this.$api.premierService.saveExpenseInfo(payload);
        }
        await this.updateUserSummary();
        // this.$router.push("/tax-evaluation/tax-years");
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "success",
          text: "Expenses Updated Successfully.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        this.btnLoading = false;
      } catch (error) {
        console.error("Error submitting expense items:", error);
        this.btnLoading = false;

        // Handle error appropriately
      }
    },
    async getExpenseItems() {
      await this.$api.premierService
        .getExpenseItems()
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
  overflow-x: auto;
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

.expense-details {
  margin-top: 20px;
}
.expense-details strong {
  display: block;
  margin-top: 10px;
}
.expense-details p {
  margin-top: 5px;
  background: #effdee;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
