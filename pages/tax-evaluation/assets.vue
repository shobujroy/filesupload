<template>
  <div>
    <h1 class="text-center my-4">
      Assets Information
      <v-btn icon @click="dialog3 = true"
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
              <th>Personal Assets</th>
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
              <td><strong>Total Equity:</strong></td>
              <td>
                <input
                  type="number"
                  class="form-control"
                  disabled
                  v-model="totalEquity"
                  style="color: red"
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
    <v-dialog v-model="dialog3" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Asset Information</span>
        </v-card-title>
        <v-card-text>
          <p>
            In this section, you’ll provide details about your assets. This
            includes any property you own, vehicles, or other valuable items.
            You’ll need to enter:
          </p>
          <ul>
            <li>
              <strong>Market Value:</strong> The current value of your asset
              (e.g., home, vehicle). If you don’t know this value, an estimate
              will work, or you can always add the actual number later.
            </li>
            <li>
              <strong>Liabilities/Loans:</strong> If you have any loans or
              equity associated with your assets, it’s best to fill in this
              information. However, if you don’t have the details available
              right now, you can skip this and come back later.
            </li>
          </ul>
          <p>
            Completing as much of this section as possible will help with your
            qualification process.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog3 = false"
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
      summary: null,
      loading: false,
      dialog3: false,

      assets: [],
      quickSaleOptions: Array.from({ length: 11 }, (v, k) => 100 - k * 5),
      isUpdating: false,
    };
  },
  computed: {
    totalEquity() {
      return this.assets
        .reduce((total, asset) => total + asset.equity, 0)
        .toFixed(2);
    },
  },
  async mounted() {
    await this.getAssetInfoById();
    this.getUserByRequestNumber();
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
      this.summary.totalAssets = Number(this.totalEquity);
      const payload = {
        requestNumber: localStorage.getItem("requestNumber"),
        summary: this.summary,
      };
      try {
        const res = await this.$api.premierService.updateUserSummary(payload);

        this.summary = res?.data[0]?.summary;
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
      if (localStorage.getItem("taxType").includes("Business")) {
        this.$router.push("/tax-evaluation/business-information");
      } else {
        this.$router.push("/tax-evaluation/tax-information");
      }
    },
    async getAssetInfoById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getAssetInfoById(payload);
        if (res?.data?.length) {
          this.isUpdating = true;
          const filteredData = res?.data?.map((item) => ({
            id: item.id,
            userId: item.userId,
            assetItemId: item.assetItemId,
            loan: parseFloat(item.loan),
            quickSale: parseFloat(item.quickSale),
            marketValue: parseFloat(item.marketValue),
            name: item?.assetItem?.name,
            equity:
              Number(item?.marketValue) * Number(item?.quickSale / 100) -
              Number(item?.loan),
            isCash:
              item.assetItemId === 1 || item.assetItemId === 2 ? true : false,
          }));
          this.assets = filteredData;
        } else this.getAssetItems();
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      this.loading = true;
      try {
        for (const asset of this.assets) {
          const payload = {
            userId: localStorage.getItem("userId"),
            marketValue: asset.marketValue,
            quickSale: asset.quickSale,
            loan: asset.loan,
          };

          if (this.isUpdating) {
            payload.id = asset?.id;
            payload.assetItemId = asset?.assetItemId;
          } else {
            payload.assetItemId = asset?.id;
          }

          await this.$api.premierService.saveAssetInfo(payload);
        }
        await this.updateUserSummary();
        this.loading = false;

        this.$router.push("/tax-evaluation/income");
      } catch (error) {
        console.error("Error submitting asset items:", error);
        this.loading = false;

        // Handle error appropriately
      }
    },
    async getAssetItems() {
      await this.$api.premierService
        .getAssetItems()
        .then((res) => {
          if (res?.data?.length) {
            const updatedData = res.data.map((item) => ({
              ...item,
              marketValue: 0,
              quickSale:
                item.name === "Bank Accounts" || item.name === "Cash on Hand"
                  ? 100
                  : 80,
              loan:
                item.name === "Bank Accounts" || item.name === "Cash on Hand"
                  ? "0"
                  : 0,
              equity: 0,
              isCash:
                item.name === "Bank Accounts" || item.name === "Cash on Hand"
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

<style scoped>
form {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 900px;
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
