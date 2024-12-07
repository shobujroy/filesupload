<template>
  <v-row>
    <v-col class="text-center">
      <v-card outlined flat>
        <v-card-text>
          <v-data-table
            :items="itemData || []"
            :loading="dataLoader"
            :headers="headers"
            :options="options"
            :items-per-page="options?.itemsPerPage"
            mobile-breakpoint="0"
            hide-default-footer
          >
            <template v-slot:top>
              <v-card-title flat>
                <v-toolbar-title>Funding Forms</v-toolbar-title>
                <v-spacer></v-spacer>

                <!-- <v-btn
                  class="ml-5 primary"
                  @click="$router.push('/super/express-admins/create')"
                  color="primary"
                >
                  Add Express Admin
                </v-btn> -->
              </v-card-title>
              <v-row class="my-4">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="fundingParams.name"
                    append-icon="mdi-magnify"
                    @click:append="getFundingFormsFilter"
                    @keyup.enter="getFundingFormsFilter"
                    label="Name"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="fundingParams.email"
                    append-icon="mdi-magnify"
                    @click:append="getFundingFormsFilter"
                    @keyup.enter="getFundingFormsFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col>
              </v-row>
            </template>
            <template v-slot:item.name="{ item }">
              <span class="text-truncate">{{ item?.name }} </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate">{{ item?.email }} </span>
            </template>
            <template v-slot:item.phone="{ item }">
              <span class="text-truncate">{{ item?.phone }} </span>
            </template>
            <template v-slot:item.fundingAmount="{ item }">
              <span class="text-truncate" v-if="item?.fundingAmount"
                >${{ item?.fundingAmount }}
              </span>
            </template>
            <template v-slot:item.referral="{ item }">
              <span class="text-truncate">{{ item?.referral }} </span>
            </template>
            <template v-slot:item.created_at="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    :color="getChipColor(item?.createdAt)"
                    text-color="white"
                  >
                    {{ formatTimeElapsed(item?.createdAt) }}
                  </v-chip>
                </template>
                <!-- Tooltip content with formatted date and time -->
                <span>{{ formatFullDateTime(item?.createdAt) }}</span>
              </v-tooltip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-menu
                nudge-right=""
                offset-y
                v-if="
                  item.yearBeforeTaxReturn ||
                  item.lastYearTaxReturn ||
                  item.myficoCreditReport
                "
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab icon small text v-bind="attrs" v-on="on">
                    <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list width="250" dense>
                  <v-list-item
                    v-if="item.lastYearTaxReturn"
                    @click="downloadItem(item.lastYearTaxReturn)"
                  >
                    <v-list-item-title>Last Year Tax Return</v-list-item-title>
                  </v-list-item>
                  <v-divider v-if="item.lastYearTaxReturn"></v-divider>
                  <v-list-item
                    v-if="item.yearBeforeTaxReturn"
                    @click="downloadItem(item.yearBeforeTaxReturn)"
                  >
                    <v-list-item-title
                      >Year Before Last Tax Return</v-list-item-title
                    >
                  </v-list-item>
                  <v-divider v-if="item.yearBeforeTaxReturn"></v-divider>
                  <v-list-item
                    v-if="item.myficoCreditReport"
                    @click="downloadItem(item.myficoCreditReport)"
                  >
                    <v-list-item-title>My Fico Credit Report</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div v-else>N/A</div>
              <!-- <v-btn
                  @click="editExpressAdmin(item.express_id)"
                  x-small
                  icon
                  fab
                  class="green darken-2"
                >
                  <v-icon color="white">mdi-pencil</v-icon>
                </v-btn> -->
            </template>
          </v-data-table>
          <CustomPagination
            :options="options"
            :totalLength="totalData"
            :totalItems="allData"
            :itemsOnPage="itemData?.length || 0"
            @initPagination="getFundingForms"
            @initItemsPerPage="initPagination"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { perPageOptions } from "../../config/paginationConfig";
import moment from "moment";

export default {
  name: "formsPage",
  layout: "dashboard",
  data() {
    return {
      fundingParams: {
        name: null,
        email: null,
      },
      perPageOptions: perPageOptions,
      totalData: 0,
      options: {
        itemsPerPage: 25,
        page: 1,
        totalPages: 0, // Add this property
      },
      dataLoader: false,
      allData: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Funding Amount", value: "fundingAmount" },
        { text: "Referral", value: "referral" },
        { text: "Created At", value: "created_at" },

        { text: "Action", value: "action" },
      ],
      itemData: [],
    };
  },
  //   watch: {
  //     options(val) {
  //       this.getFundingForms();
  //     },
  //     itemsPerPage(val) {
  //       this.getFundingForms();
  //     },
  //   },
  created() {
    this.getFundingForms();
    // console.log(perPageOptions);
  },

  methods: {
    downloadItem(link) {
      // Remove "/public" from the link
      const cleanedLink = link.replace("public/", "");

      // Combine the cleaned link with the base URL from environment variables
      const fullUrl = `${process.env.BASE_URL_TWO}${cleanedLink}`;

      // Open the full URL in a new window
      window.open(fullUrl, "_blank");
    },
    deleteExpressAdmin(id) {
      this.$swal
        .fire({
          title: "Are you sure you want to delete?",
          showCancelButton: true,
          confirmButtonText: "Yes",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api.superService.deleteExpressAdmin(id).then(() => {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "User Deleted!",
                showConfirmButton: false,
                timer: 5000,
              });

              // fetch updated data
              this.getFundingForms();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getFundingFormsFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getFundingForms() {
      this.dataLoader = true;
      this.$store.dispatch("initLoader", true);

      // Create an object to hold the API parameters
      const apiParams = {
        page: this.options.page,
        // isDeleted: 1,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }
      await this.$api.premierService
        .getFundingForms(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data?.data;
          this.allData = response?.data?.data?.length;
          this.options.page = response?.data?.meta?.currentPage;
          this.totalData = response?.data?.meta?.lastPage;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
          // console.log(response?.data);
        });
      this.dataLoader = false;
      this.$store.dispatch("initLoader", false);
    },
    async getFundingFormsFilter() {
      this.dataLoader = true;

      // Create an object to hold the API parameters
      const apiParams = {
        page: 1,
        ...this.fundingParams,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }

      await this.$api.premierService
        .getFundingForms(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data?.data;
          this.allData = response?.data?.data?.length;
          this.options.page = response?.data?.meta?.currentPage;
          this.totalData = response?.data?.meta?.lastPage;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
          // console.log(response?.data);
        })
        .finally(() => {
          this.dataLoader = false;
          this.$store.dispatch("initLoader", false);
        });
    },
    formatFullDateTime(date) {
      // Format the date using moment.js as DD-MM-YYYY | hh:mm:ss A
      return moment(date).format("DD-MM-YYYY | hh:mm:ss A");
    },
    formatTimeElapsed(date) {
      const now = moment();
      const createdAt = moment(date);
      const duration = moment.duration(now.diff(createdAt));

      if (duration.asSeconds() < 60)
        return `${Math.floor(duration.asSeconds())} seconds ago`;
      if (duration.asMinutes() < 60)
        return `${Math.floor(duration.asMinutes())} mins ago`;
      if (duration.asHours() < 24)
        return `${Math.floor(duration.asHours())} hours ago`;
      return `${Math.floor(duration.asDays())} days ${Math.floor(
        duration.asHours() % 24
      )} hours ago`;
    },
    getChipColor(date) {
      const createdAt = moment(date);
      const now = moment();
      const hoursAgo = moment.duration(now.diff(createdAt)).asHours();

      if (hoursAgo <= 4) return "red";
      if (hoursAgo <= 12) return "orange";
      if (hoursAgo <= 24) return "yellow";
      return "green";
    },
  },
};
</script>
