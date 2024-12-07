<template>
  <div
    class="main-container"
    :style="{ backgroundColor: backgroundColor, minHeight: minHeight }"
  >
    <div :style="contentStyle">
      <h1>{{ pageTitle }}</h1>
      <div>
        <nuxt-link :to="mainLink" class="link">{{ mainText }}</nuxt-link> >
        {{ pageTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
    mainLink: {
      type: String,
      required: true,
    },
    mainText: {
      type: String,
      default: "Home",
    },
    backgroundColor: {
      type: String,
      default: "#2c7671",
    },
    minHeight: {
      type: String,
      default: "45vh",
    },
    contentStyle: {
      type: Object,
      default: () => ({
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #f1b21c;
  &:hover {
    color: #ffb300;
  }
}
</style>
