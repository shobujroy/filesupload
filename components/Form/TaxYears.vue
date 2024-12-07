<template>
  <div v-if="!loading">
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
                :disabled="!isEditing"
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
                :disabled="!isEditing"
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
                :disabled="!isEditing"
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
                :disabled="!isEditing"
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
                :disabled="!isEditing"
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
                :disabled="!isEditing"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
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
      loading: false,
      isEditing: false,

      taxYears: this.generateTaxYears(),
    };
  },
  async mounted() {
    this.loading = true;
    if (this.$route.query.edit === "true") {
      this.isEditing = true;
    }
    await this.getTaxYearsInfoById();
    this.loading = false;
  },
  methods: {
    async completeForm() {
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.completeForm(payload);
      } catch (error) {
        console.log(error);
      }
    },
    async getTaxYearsInfoById() {
      const payload = { userId: this.$route.query.userId };
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
          console.log(filteredData);
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
        userId: this.$route.query.userId,
        year: year,
        [field]: status, // Dynamically set the field name
      };
      console.log(result);
      try {
        this.$api.premierService.saveTaxYearsInfo(result).then((res) => {
          if (res?.data) {
            console.log(res?.data);
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
          timer: 2000,
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
      this.completeForm();

      this.$router.push("/tax-evaluation/summary");
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
