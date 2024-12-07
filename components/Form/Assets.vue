<template>
  <div v-if="!loading">
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
                :disabled="!isEditing"
              />
            </td>
            <td v-if="!asset.isCash">
              <select
                v-model.number="asset.quickSale"
                @change="calculateEquity(index)"
                class="form-control"
                :disabled="!isEditing"
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
                :disabled="!isEditing"
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

      summary: null,
      loading: false,
      btnLoading: false,
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
    this.loading = true;
    if (this.$route.query.edit === "true") {
      this.isEditing = true;
    }
    await this.getAssetInfoById();
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

    async getAssetInfoById() {
      const payload = { userId: this.$route.query.userId };
      try {
        const res = await this.$api.premierService.getAssetInfoById(payload);
        if (res?.data?.length) {
          this.isUpdating = true;
          console.log(res?.data);
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
    async updateUserSummary() {
      this.summary.totalAssets = Number(this.totalEquity);
      const payload = {
        requestNumber: this.$route.query.requestNumber,
        summary: this.summary,
      };
      try {
        this.btnLoading = true;
        const res = await this.$api.premierService.updateUserSummary(payload);

        this.summary = JSON.parse(res?.data[0]?.summary);

        this.btnLoading = false;
      } catch (error) {
        this.btnLoading = false;

        console.log(error);
      }
    },
    async handleSubmit() {
      this.btnLoading = true;
      try {
        for (const asset of this.assets) {
          const payload = {
            userId: this.$route.query.userId,
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
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "success",
          text: "Assets Info Updated Successfully.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        // this.$router.go(0);
        this.btnLoading = false;
      } catch (error) {
        console.error("Error submitting asset items:", error);
        this.btnLoading = false;

        // Handle error appropriately
      }
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
  justify-content: center;
  margin-top: 20px;
}
</style>
