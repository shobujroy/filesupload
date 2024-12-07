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

                <!-- <v-btn
                  class="ml-5"
                  @click="$router.push('/admin/liason-call/add')"
                  color="#f0a904"
                >
                  Add
                </v-btn> -->
              </v-card-title>
              <!-- <v-row class="my-4">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="referralParams.name"
                    append-icon="mdi-magnify"
                    @click:append="getLiaisonFormsUserFilter"
                    @keyup.enter="getLiaisonFormsUserFilter"
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
                    @click:append="getLiaisonFormsUserFilter"
                    @keyup.enter="getLiaisonFormsUserFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col> </v-row
            > -->
            </template>
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
          <!-- <CustomPagination
            :options="options"
            :totalLength="totalData"
            :totalItems="allData"
            :itemsOnPage="itemData?.length || 0"
            @initPagination="getLiaisonFormsUser"
            @initItemsPerPage="initPagination"
          /> -->
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { perPageOptions } from "../../../config/paginationConfig";
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
        // { text: "Marital Status", value: "maritalStatus" },

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
    this.getLiaisonFormsUser();
    // console.log(perPageOptions);
  },

  methods: {
    viewDetails(item) {
      this.$router.push({
        path: "/user/liason-call/view",
        query: {
          id: item?.id,
        },
      });
    },

    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getLiaisonFormsUserFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getLiaisonFormsUser() {
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
        .getLiaisonFormsUser(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data?.rows;
          this.allData = response?.data?.rows?.length;
          this.options.page = response?.meta?.page;
          // this.totalData = response?.meta?.totalPages;
          // this.options.totalPages = Math.ceil(
          //   this.totalData / this.options.itemsPerPage
          // );
          // console.log(response?.data);
        });
      this.dataLoader = false;
      this.$store.dispatch("initLoader", false);
    },
    async getLiaisonFormsUserFilter() {
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
        .getLiaisonFormsUser(apiParams)
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
  },
};
</script>
