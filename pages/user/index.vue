<template></template>

<script>
export default {
  layout: "no-auth",
  auth: "guest",
  data() {
    return {
      loading: false,
      show1: false,
      name: null,
      email: null,
      password: null,
      ruleRequired: (value) => !!value || "Required.",
      rulePassLen: (value) =>
        value?.length >= 8 || "Password be of at least 8 characters.",
    };
  },
  created() {
    this.$router.push("/login");
  },
};
</script>
