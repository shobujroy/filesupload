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
                <v-toolbar-title>Partnership Forms</v-toolbar-title>
                <v-spacer></v-spacer> </v-card-title
              ><v-row class="my-4">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="partnershipParams.name"
                    append-icon="mdi-magnify"
                    @click:append="getPartnershipFormsFilter"
                    @keyup.enter="getPartnershipFormsFilter"
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
                    v-model="partnershipParams.email"
                    append-icon="mdi-magnify"
                    @click:append="getPartnershipFormsFilter"
                    @keyup.enter="getPartnershipFormsFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    clearable
                    label="Professional Title"
                    item-text="text"
                    item-value="value"
                    :items="titleFilter"
                    v-model="partnershipParams.professional_title"
                    @input="getPartnershipFormsFilter"
                /></v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="partnershipParams.city"
                    append-icon="mdi-magnify"
                    @click:append="getPartnershipFormsFilter"
                    @keyup.enter="getPartnershipFormsFilter"
                    label="City"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    clearable
                    label="State"
                    item-text="name"
                    item-value="value"
                    :items="states"
                    v-model="partnershipParams.state"
                    @input="getPartnershipFormsFilter"
                /></v-col> </v-row
            ></template>
            <template v-slot:item.name="{ item }">
              <span class="text-truncate"
                >{{ item?.sectionBasicInformation?.full_name }}
              </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate"
                >{{ item?.sectionBasicInformation?.email_address }}
              </span>
            </template>
            <template v-slot:item.professional_title="{ item }">
              <span class="text-truncate"
                >{{ item?.sectionProfessionalCredentials?.professional_title }}
              </span>
            </template>
            <template v-slot:item.phone="{ item }">
              <span class="text-truncate"
                >{{ item?.sectionBasicInformation?.phone_number }}
              </span>
            </template>
            <template v-slot:item.city="{ item }">
              <span class="text-truncate"
                >{{ item?.sectionBasicInformation?.city }}
              </span>
            </template>
            <template v-slot:item.state="{ item }">
              <span class="text-truncate"
                >{{ upperCase(item?.sectionBasicInformation?.state) }}
              </span>
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
            @initPagination="getPartnershipForms"
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
      states: [
        { name: "Alabama", value: "alabama" },
        { name: "Alaska", value: "alaska" },
        { name: "Arizona", value: "arizona" },
        { name: "Arkansas", value: "arkansas" },
        { name: "California", value: "california" },
        { name: "Colorado", value: "colorado" },
        { name: "Connecticut", value: "connecticut" },
        { name: "Delaware", value: "delaware" },
        { name: "Florida", value: "florida" },
        { name: "Georgia", value: "georgia" },
        { name: "Hawaii", value: "hawaii" },
        { name: "Idaho", value: "idaho" },
        { name: "Illinois", value: "illinois" },
        { name: "Indiana", value: "indiana" },
        { name: "Iowa", value: "iowa" },
        { name: "Kansas", value: "kansas" },
        { name: "Kentucky", value: "kentucky" },
        { name: "Louisiana", value: "louisiana" },
        { name: "Maine", value: "maine" },
        { name: "Maryland", value: "maryland" },
        { name: "Massachusetts", value: "massachusetts" },
        { name: "Michigan", value: "michigan" },
        { name: "Minnesota", value: "minnesota" },
        { name: "Mississippi", value: "mississippi" },
        { name: "Missouri", value: "missouri" },
        { name: "Montana", value: "montana" },
        { name: "Nebraska", value: "nebraska" },
        { name: "Nevada", value: "nevada" },
        { name: "New Hampshire", value: "new hampshire" },
        { name: "New Jersey", value: "new jersey" },
        { name: "New Mexico", value: "new mexico" },
        { name: "New York", value: "new york" },
        { name: "North Carolina", value: "north carolina" },
        { name: "North Dakota", value: "north dakota" },
        { name: "Ohio", value: "ohio" },
        { name: "Oklahoma", value: "oklahoma" },
        { name: "Oregon", value: "oregon" },
        { name: "Pennsylvania", value: "pennsylvania" },
        { name: "Rhode Island", value: "rhode island" },
        { name: "South Carolina", value: "south carolina" },
        { name: "South Dakota", value: "south dakota" },
        { name: "Tennessee", value: "tennessee" },
        { name: "Texas", value: "texas" },
        { name: "Utah", value: "utah" },
        { name: "Vermont", value: "vermont" },
        { name: "Virginia", value: "virginia" },
        { name: "Washington", value: "washington" },
        { name: "West Virginia", value: "west virginia" },
        { name: "Wisconsin", value: "wisconsin" },
        { name: "Wyoming", value: "wyoming" },
      ],
      partnershipParams: {
        name: null,
        email: null,
        professional_title: null,
        city: null,
        state: null,
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
      titleFilter: [
        {
          text: "CPA",
          value: "cpa",
        },
        {
          text: "Accountant",
          value: "accountant",
        },
        {
          text: "Tax Attorney",
          value: "tax attorney",
        },
        {
          text: "Enrolled Agent",
          value: "enrolled agent",
        },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Professional Title", value: "professional_title" },

        { text: "Phone", value: "phone" },
        { text: "City", value: "city" },
        { text: "State", value: "state" },
        { text: "Created At", value: "created_at" },

        // { text: "Marital Status", value: "maritalStatus" },

        { text: "Action", value: "action" },
      ],
      itemData: [],
    };
  },
  //   watch: {
  //     options(val) {
  //       this.getPartnershipForms();
  //     },
  //     itemsPerPage(val) {
  //       this.getPartnershipForms();
  //     },
  //   },
  created() {
    this.getPartnershipForms();
  },

  methods: {
    upperCase(key) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    },
    viewDetails(item) {
      this.$router.push({
        path: "/admin/partnership-forms/view",
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
              this.getPartnershipForms();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getPartnershipFormsFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getPartnershipForms() {
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
        .getPartnershipForms(apiParams)
        .then((response) => {
          this.itemData = response?.data?.data;
          this.allData = response?.data?.data?.length;
          this.options.page = response?.data?.meta?.currentPage;
          this.totalData = response?.data?.meta?.lastPage;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
        });
      this.dataLoader = false;
      this.$store.dispatch("initLoader", false);
    },
    async getPartnershipFormsFilter() {
      this.dataLoader = true;

      // Create an object to hold the API parameters
      const apiParams = {
        page: 1,
        ...this.partnershipParams,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }
      await this.$api.premierService
        .getPartnershipForms(apiParams)
        .then((response) => {
          this.itemData = response?.data?.data;
          this.allData = response?.data?.data?.length;
          this.options.page = response?.data?.meta?.currentPage;
          this.totalData = response?.data?.meta?.lastPage;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
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
