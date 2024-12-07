<template>
  <div class="mt-6 main-container py-10" style="background-color: #f9f9f9">
    <div class="mid-container">
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
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,

      forms: [],
    };
  },

  async mounted() {
    await this.getFormNumbers();
  },
  methods: {
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

  min-height: 240px;
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
