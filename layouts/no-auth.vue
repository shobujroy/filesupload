<template>
  <v-app style="background-color: #f0f0f1">
    <v-main>
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import dashboardVue from "./dashboard.vue";
export default {
  name: "loginLayout",
  //   middleware: ["auth"],
  data() {
    return {
      fixed: false,
    };
  },
  mounted() {
    if (localStorage.getItem("admin")) {
      this.$router.push("/admin/dashboard");
    }
    if (localStorage.getItem("user")) {
      this.$router.push("/user/dashboard");
    }
  },
};
</script>
