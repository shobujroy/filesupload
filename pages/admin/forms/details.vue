<template>
  <div v-if="!loading">
    <v-tabs v-model="tab" background-color="#003A3A" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-4">
      <v-tab-item v-for="(item, index) in items" :key="item">
        <component :is="getComponent(index)" :key="tab" />
      </v-tab-item>
    </v-tabs-items>
  </div>
  <div
    v-else
    style="display: flex; justify-content: center; align-items: center"
  >
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import FormBasicInfo from "@/components/Form/BasicInfo.vue";
import FormTaxInfo from "@/components/Form/TaxInfo.vue";
import FormBusinessInformation from "@/components/Form/BusinessInformation.vue";
import FormAssets from "@/components/Form/Assets.vue";
import FormIncome from "@/components/Form/Income.vue";
import FormExpenses from "@/components/Form/Expenses.vue";
import FormTaxYears from "@/components/Form/TaxYears.vue";
import FormSummary from "@/components/Form/Summary.vue";
import Forms from "@/components/Form/Forms.vue";

export default {
  layout: "dashboard",

  data() {
    return {
      tab: null,
      items: [
        "Basic Information",
        "Tax Information",
        "Business Information",
        "Assets",
        "Income",
        "Expenses",
        "Tax Years",
        "Summary",
        "Forms",
      ],
      loading: false,
      requestNumber: "",
      userId: "",
    };
  },
  async mounted() {
    this.userId = this.$route.query.userId;
    this.requestNumber = this.$route.query.requestNumber;
  },
  methods: {
    getComponent(index) {
      const components = [
        FormBasicInfo,
        FormTaxInfo,
        FormBusinessInformation,
        FormAssets,
        FormIncome,
        FormExpenses,
        FormTaxYears,
        FormSummary,
        Forms,
      ];
      return components[index];
    },
  },
};
</script>
