<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer
      :absolute="!fixed"
      app
      class="flex justify-space-between"
      style="position: fixed"
    >
      <div class="pa-1">
        Designed and developed by
        <a
          href="https://adateck.com"
          style="text-decoration: none"
          target="_blank"
          >Adateck</a
        >
      </div>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboardLayout",
  middleware: ["auth"],

  data() {
    return {
      fixed: false,
    };
  },
  computed: {
    ...mapGetters(["menuPinned"]),
  },
  mounted() {
    if (!localStorage.getItem("admin") && !localStorage.getItem("user")) {
      this.$router.push("/login");
    }
  },
};
</script>
