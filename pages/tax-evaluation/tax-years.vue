<template>
  <div>
    <h1 class="text-center my-4">
      Tax Years
      <v-btn icon @click="dialog6 = true"
        ><v-icon md>mdi-information</v-icon></v-btn
      >
    </h1>
    <h4 class="text-center">
      Please make sure to click Next Button to save your data.
    </h4>
    <div style="display: flex; justify-content: center">
      <form @submit.prevent="handleSubmit">
        <table class="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Owe Taxes to Federal</th>
              <th>Owe Taxes to State</th>
              <th>Unfiled Taxes to Federal</th>
              <th>Unfiled Taxes to State</th>
              <th>Unfiled Business Taxes to Federal</th>
              <th>Unfiled Business Taxes to State</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(year, index) in taxYears" :key="index">
              <td>{{ year.year }}</td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.oweTaxesToFederal"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'oweTaxesToFederal',
                      year.oweTaxesToFederal
                    )
                  "
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.oweTaxesToState"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'oweTaxesToState',
                      year.oweTaxesToState
                    )
                  "
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.unifiledTaxesToFederal"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'unifiledTaxesToFederal',
                      year.unifiledTaxesToFederal
                    )
                  "
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.unifiledTaxesToState"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'unifiledTaxesToState',
                      year.unifiledTaxesToState
                    )
                  "
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.unifiledBusinessTaxesToFederal"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'unifiledBusinessTaxesToFederal',
                      year.unifiledBusinessTaxesToFederal
                    )
                  "
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="year.unifiledBusinessTaxesToState"
                  @change="
                    handleCheckboxChange(
                      year.year,
                      'unifiledBusinessTaxesToState',
                      year.unifiledBusinessTaxesToState
                    )
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="form-buttons">
          <button type="button" @click="prevPage" class="btn">Previous</button>
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
    <v-dialog v-model="dialog6" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Tax Years</span>
        </v-card-title>
        <v-card-text>
          <p>
            You’ll list all the tax years that are relevant to your situation,
            including both filed and unfiled years. If a particular year doesn’t
            apply, you can skip it.
          </p>
          <p>
            <strong>Why It’s Important:</strong> Providing this information
            helps the IRS get a clear picture of your tax history and ensures
            you’re filing the correct forms for the correct years.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog6 = false"
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
      dialog6: false,

      taxYears: this.generateTaxYears(),
    };
  },
  mounted() {
    this.getTaxYearsInfoById();
  },
  methods: {
    async getTaxYearsInfoById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getTaxYearsInfoById(payload);
        if (res?.data?.length) {
          const filteredData = res.data.map((item) => ({
            year: item.year,
            oweTaxesToFederal: item.oweTaxesToFederal,
            oweTaxesToState: item.oweTaxesToState,
            unifiledTaxesToFederal: item.unifiledTaxesToFederal,
            unifiledTaxesToState: item.unifiledTaxesToState,
            unifiledBusinessTaxesToFederal: item.unifiledBusinessTaxesToFederal,
            unifiledBusinessTaxesToState: item.unifiledBusinessTaxesToState,
          }));
          this.taxYears.forEach((taxYear) => {
            const matchingData = filteredData.find(
              (data) => data.year === taxYear.year
            );

            if (matchingData) {
              taxYear.oweTaxesToFederal = matchingData.oweTaxesToFederal;
              taxYear.oweTaxesToState = matchingData.oweTaxesToState;
              taxYear.unifiledTaxesToFederal =
                matchingData.unifiledTaxesToFederal;
              taxYear.unifiledTaxesToState = matchingData.unifiledTaxesToState;
              taxYear.unifiledBusinessTaxesToFederal =
                matchingData.unifiledBusinessTaxesToFederal;
              taxYear.unifiledBusinessTaxesToState =
                matchingData.unifiledBusinessTaxesToState;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    generateTaxYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2005;
      let years = [];
      for (let year = currentYear; year >= startYear; year--) {
        years.push({
          year: year,
          oweTaxesToFederal: 0,
          oweTaxesToState: 0,
          unifiledTaxesToFederal: 0,
          unifiledTaxesToState: 0,
          unifiledBusinessTaxesToFederal: 0,
          unifiledBusinessTaxesToState: 0,
        });
      }
      return years;
    },
    async handleCheckboxChange(year, field, isChecked) {
      this.loading = true;

      const status = isChecked ? 1 : 0;
      const result = {
        userId: localStorage.getItem("userId"),
        year: year,
        [field]: status, // Dynamically set the field name
      };
      try {
        this.$api.premierService.saveTaxYearsInfo(result).then((res) => {
          if (res?.data) {
            this.loading = false;
          }
        });

        // handle successful response
      } catch (error) {
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
    prevPage() {
      this.$router.push("/tax-evaluation/expenses");
    },
    handleSubmit() {
      this.$router.push("/tax-evaluation/summary");
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
  max-width: 1000px;
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
  padding: 10px;
  text-align: center;
}

.table th {
  background-color: #f2f2f2;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
