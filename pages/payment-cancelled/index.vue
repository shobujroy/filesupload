<template>
  <v-container
    class="d-flex align-center justify-center text-center"
    fill-height
  >
    <v-card class="pa-4" style="width: 100%">
      <v-card-title class="justify-center">Payment Cancelled</v-card-title>
      <v-card-text>
        <!-- <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular> -->
        <div v-if="status === 'redirecting'" class="mt-4">
          Redirecting...
          <v-progress-circular
            indeterminate
            color="primary"
            class="ml-2"
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      status: "verifying",
    };
  },
  layout(context) {
    // Determine the layout based on query parameters or other conditions using context
    const serviceType = context.route.query.url;
    if (
      serviceType === "user-service" ||
      serviceType === "admin-service" ||
      serviceType.includes("admin") ||
      serviceType.includes("user")
    ) {
      return "dashboard"; // Use the 'dashboard' layout for specific services
    } else {
      return "default"; // Fallback to default layout if no condition is met
    }
  },
  mounted() {
    this.verifyPayment();
  },
  methods: {
    async verifyPayment() {
      const payload = { payment_id: this.$route.query.payment_id };
      // Simulating a payment verification process
      await this.$api.premierService.deletePayment(payload);
      setTimeout(() => {
        this.status = "redirecting";
        // Simulating a delay before redirect
        setTimeout(() => {
          if (this.$route.query.url === "tax-evaluation-433a") {
            this.$router.push("/tax-evaluation/forms/433a");
          } else if (this.$route.query.url === "user-service") {
            this.$router.push("/user/services");
          } else if (this.$route.query.url === "admin-service") {
            this.$router.push("/admin/services");
          } else if (this.$route.query.url === "tax-evaluation-433b") {
            this.$router.push("/tax-evaluation/forms/433b");
          } else if (this.$route.query.url === "tax-evaluation-656") {
            this.$router.push("/tax-evaluation/forms/656b");
          } else if (this.$route.query.url === "tax-evaluation-843") {
            this.$router.push("/tax-evaluation/forms/843");
          } else if (this.$route.query.url === "tax-evaluation-9465") {
            this.$router.push("/tax-evaluation/forms/9465");
          } else if (this.$route.query.url === "tax-evaluation-433f") {
            this.$router.push("/tax-evaluation/forms/433f");
          } else if (
            this.$route.query.url === "admin-433a" ||
            this.$route.query.url === "admin-433b" ||
            this.$route.query.url === "admin-843" ||
            this.$route.query.url === "admin-656b" ||
            this.$route.query.url === "admin-9465" ||
            this.$route.query.url === "admin-433f"
          ) {
            this.$router.push(
              `/admin/forms/details?requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}&edit=false`
            );
          } else if (
            this.$route.query.url === "user-433a" ||
            this.$route.query.url === "user-433b" ||
            this.$route.query.url === "user-843" ||
            this.$route.query.url === "user-656b" ||
            this.$route.query.url === "user-9465" ||
            this.$route.query.url === "user-433f"
          ) {
            this.$router.push(
              `/user/forms/details?requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}&edit=false`
            );
          }
        }, 2000);
      }, 2000);
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
}
</style>
