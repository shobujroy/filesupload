<template>
  <div class="text-center">
    <!-- Pay Now Button -->
    <v-btn color="#FFB300" @click="handlePayNow" :disabled="loadingBtn"
      >Pay Now</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "formsPage",
  layout: "dashboard",
  data() {
    return {
      loadingBtn: false,
      allData: {
        service_id: null,
        total_price: null,
      },
    };
  },
  methods: {
    async handlePayNow() {
      const payload = {
        type: "test",
        type_id: "20241028",
        from: "admin-service",
        label: "test_payment",
        payment_service: "Test Payment",
      };

      try {
        this.loadingBtn = true;
        const res = await this.$api.premierService.adminPaymentCheckout(
          payload
        );
        if (res && res.data) {
          const redirectLink = res.data;
          console.log("Redirecting to:", redirectLink);
          window.location.href = redirectLink;
        } else {
          this.loadingBtn = false;
        }
      } catch (error) {
        this.loadingBtn = false;
        console.log(error);
      }
    },
  },
};
</script>
