<template>
  <section>
    <v-divider></v-divider>
    <div class="d-flex flex-column flex-wrap justify-center">
      <section
        class="d-flex full-width"
        :class="
          totalItems && itemsOnPage ? 'justify-space-between ' : 'justify-end'
        "
      >
        <div v-if="totalItems && itemsOnPage">
          <small>Total {{ itemsOnPage }} of {{ totalItems }}</small>
        </div>
        <!--  rows per page -->
        <div class="d-flex justify-start align-self-end">
          <label for="rows-per-page">
            <small>Rows per page</small>
          </label>
          <v-select
            dense
            hide-details
            v-model="options.itemsPerPage"
            :items="ItemsPerPage"
            class="mx-2"
            style="max-width: 60px"
            @input="initItemsPerPage"
          ></v-select>
        </div>
      </section>

      <v-pagination
        class="mt-4"
        circle
        v-model="options.page"
        @input="initPagination"
        :length="totalLength"
        :total-visible="7"
        color="#DF9D04"
      ></v-pagination>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    itemsOnPage: {
      type: Number,
    },
    totalItems: {
      default: 0,
    },
    totalLength: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: {
        itemsPerPage: 10,
        page: 1,
      },
    },
    ItemsPerPage: {
      type: Array,
      default: () => [
        { text: "25", value: 25 },
        { text: "50", value: 50 },
        { text: "75", value: 75 },
        { text: "100", value: 100 },
      ],
    },
  },
  methods: {
    initItemsPerPage(val) {
      this.options.page = 1;
      this.$emit("initItemsPerPage", val);
    },
    initPagination(val) {
      this.$emit("initPagination", {
        ...this.options,
        page: val ? val : this.options.page,
      });
    },
  },
};
</script>

<style></style>
