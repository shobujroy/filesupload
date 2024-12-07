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
                <v-toolbar-title>Liaison Call Forms</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn
                  class="ml-5"
                  @click="$router.push('/admin/liason-call/add')"
                  color="#f0a904"
                >
                  Add
                </v-btn>
              </v-card-title>
              <v-row class="my-4">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="referralParams.name"
                    append-icon="mdi-magnify"
                    @click:append="getLiaisonFormsAdminFilter"
                    @keyup.enter="getLiaisonFormsAdminFilter"
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
                    v-model="referralParams.email"
                    append-icon="mdi-magnify"
                    @click:append="getLiaisonFormsAdminFilter"
                    @keyup.enter="getLiaisonFormsAdminFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col> </v-row
            ></template>
            <template v-slot:item.name="{ item }">
              <span class="text-truncate">{{ item?.name }} </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate">{{ item?.email }} </span>
            </template>
            <template v-slot:item.case_number="{ item }">
              <span class="text-truncate"
                >{{ item?.client_information?.case_number }}
              </span>
            </template>
            <template v-slot:item.date_of_call="{ item }">
              <span class="text-truncate"
                >{{ item?.client_information?.date_of_call }}
              </span>
            </template>
            <template v-slot:item.irs_case_number="{ item }">
              <span class="text-truncate"
                >{{ item?.irs_call_detail?.irs_case_number }}
              </span>
            </template>
            <template v-slot:item.created_at="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    :color="getChipColor(item?.created_at)"
                    text-color="white"
                  >
                    {{ formatTimeElapsed(item?.created_at) }}
                  </v-chip>
                </template>
                <!-- Tooltip content with formatted date and time -->
                <span>{{ formatFullDateTime(item?.created_at) }}</span>
              </v-tooltip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn size="small" icon @click="viewDetails(item)"
                ><v-icon color="blue">mdi-eye</v-icon></v-btn
              >
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
            @initPagination="getLiaisonFormsAdmin"
            @initItemsPerPage="initPagination"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { perPageOptions } from "../../../config/paginationConfig";
import moment from "moment";
export default {
  name: "formsPage",
  layout: "dashboard",
  data() {
    return {
      referralParams: {
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
        { text: "Case Number", value: "case_number" },
        { text: "Date of Call", value: "date_of_call" },
        { text: "Irs Case Number", value: "irs_case_number" },
        { text: "Created At", value: "created_at" },

        { text: "Action", value: "action" },
      ],
      itemData: [],
    };
  },
  //   watch: {
  //     options(val) {
  //       this.getFormsListing();
  //     },
  //     itemsPerPage(val) {
  //       this.getFormsListing();
  //     },
  //   },
  created() {
    this.getLiaisonFormsAdmin();
    // console.log(perPageOptions);
  },

  methods: {
    viewDetails(item) {
      this.$router.push({
        path: "/admin/liason-call/view",
        query: {
          id: item?.id,
        },
      });
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
              this.getLiaisonFormsAdmin();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getLiaisonFormsAdminFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getLiaisonFormsAdmin() {
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
        .getLiaisonFormsAdmin(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data;
          this.allData = response?.data?.length;
          this.options.page = response?.meta?.page;
          this.totalData = response?.meta?.totalPages;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
          // console.log(response?.data);
        });
      this.dataLoader = false;
      this.$store.dispatch("initLoader", false);
    },
    async getLiaisonFormsAdminFilter() {
      this.dataLoader = true;

      // Create an object to hold the API parameters
      const apiParams = {
        page: 1,
        ...this.referralParams,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }
      await this.$api.premierService
        .getLiaisonFormsAdmin(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data;
          this.allData = response?.data?.length;
          this.options.page = response?.meta?.page;
          this.totalData = response?.meta?.totalPages;
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
