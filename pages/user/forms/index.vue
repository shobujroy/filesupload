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
                <v-toolbar-title>Forms</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-card-title>
              <!-- <v-row class="my-4">
                <v-col v-if="showBasicFilters" cols="12" md="3">
                  <v-text-field
                    v-model="formParams.name"
                    append-icon="mdi-magnify"
                    @click:append="getFormsFilter"
                    @keyup.enter="getFormsFilter"
                    label="Name"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field>
                </v-col>
                <v-col v-if="showBasicFilters" cols="12" md="3">
                  <v-text-field
                    v-model="formParams.email"
                    append-icon="mdi-magnify"
                    @click:append="getFormsFilter"
                    @keyup.enter="getFormsFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field>
                </v-col>
                <v-col v-if="showBasicFilters" cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    clearable
                    label="Income"
                    item-text="text"
                    item-value="value"
                    :items="incomeFilter"
                    v-model="formParams.income"
                    @input="getFormsFilter"
                  />
                </v-col>
                <v-col v-if="showBasicFilters" cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    label="Age"
                    clearable
                    item-text="text"
                    item-value="value"
                    v-model="formParams.age"
                    :items="ageFilter"
                    @input="getFormsFilter"
                  />
                </v-col>
                <v-col v-if="showBasicFilters" cols="12">
                  <v-btn color="#f0a904" @click="toggleFilters"
                    >Switch to advanced filters</v-btn
                  >
                </v-col>

                <v-col v-if="showAdvancedFilters" cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    multiple
                    clearable
                    label="Tax Years"
                    item-text="text"
                    item-value="value"
                    v-model="formParams.tax_years"
                    :items="taxYearsFilter"
                    @input="getFormsFilter"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item?.text }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ formParams?.tax_years?.length - 1 }} others)
                      </span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col v-if="showAdvancedFilters" cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    multiple
                    clearable
                    label="Tax Status"
                    item-text="text"
                    item-value="value"
                    v-model="selectedTaxStatuses"
                    :items="taxStatusFilter"
                    @input="updateTaxStatusParams"
                    :disabled="!formParams.tax_years"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item?.text }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ selectedTaxStatuses?.length - 1 }} others)
                      </span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col v-if="showAdvancedFilters" cols="12">
                  <v-btn color="#f0a904" @click="toggleFilters"
                    >Switch to basic filters</v-btn
                  >
                </v-col>
              </v-row> -->
            </template>
            <template v-slot:item.fullName="{ item }">
              <span class="text-truncate"
                >{{ item?.full_name ? item?.full_name : "" }}
              </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate"
                >{{ item?.email ? item?.email : item?.user?.email }}
              </span>
            </template>
            <template v-slot:item.phone="{ item }">
              <span class="text-truncate"
                >{{
                  item?.contact_info?.mobile ? item?.contact_info?.mobile : ""
                }}
              </span>
            </template>
            <template v-slot:item.incomeType="{ item }">
              <span class="text-truncate"
                >{{
                  item?.general_info?.incomeType
                    ? item?.general_info?.incomeType
                    : ""
                }}
              </span>
            </template>

            <template v-slot:item.completed="{ item }">
              <span class="text-truncate"
                >{{ item?.completed ? "Yes" : "No" }}
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
              <div style="display: flex">
                <v-btn size="small" icon @click="viewDetails(item)"
                  ><v-icon color="blue">mdi-eye</v-icon></v-btn
                >
                <v-btn size="small" icon @click="viewDetails(item, 'edit')"
                  ><v-icon color="blue">mdi-pencil</v-icon></v-btn
                >
              </div>
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
            @initPagination="getFormsListing"
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
    const currentYear = new Date().getFullYear();
    return {
      ageFilter: [
        { text: "65+", value: "1" },
        { text: "Under 65", value: "0" },
      ],
      incomeFilter: [
        { text: "Fixed Income", value: "Fixed Income" },
        { text: "Retired", value: "Retired" },
        { text: "1099", value: "1099" },
        { text: "W2", value: "W2" },
      ],
      taxYearsFilter: Array.from(
        { length: currentYear - 2005 + 1 },
        (_, i) => ({
          text: (currentYear - i).toString(),
          value: (currentYear - i).toString(),
        })
      ),
      taxStatusFilter: [
        { text: "Owe Taxes to Federal", value: "oweTaxesFederal" },
        { text: "Owe Taxes to State", value: "oweTaxesState" },
        { text: "Unfiled Taxes to Federal", value: "unfiledTaxesFederal" },
        { text: "Unfiled Taxes to State", value: "unfiledTaxesState" },
        {
          text: "Unfiled Business Taxes to Federal",
          value: "unfiledBusinessTaxesFederal",
        },
        {
          text: "Unfiled Business Taxes to State",
          value: "unfiledBusinessTaxesState",
        },
      ],
      selectedTaxStatuses: [],
      showBasicFilters: true,
      showAdvancedFilters: false,
      formParams: {
        name: null,
        email: null,
        income: null,
        age: null,
        tax_years: null,
        oweTaxesFederal: null,
        oweTaxesState: null,
        unfiledTaxesFederal: null,
        unfiledTaxesState: null,
        unfiledBusinessTaxesFederal: null,
        unfiledBusinessTaxesState: null,
      },
      perPageOptions: perPageOptions,
      totalData: 0,
      options: {
        itemsPerPage: 25,
        page: 1,
        totalPages: 0,
      },
      dataLoader: false,
      allData: "",
      headers: [
        { text: "Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Income Type", value: "incomeType" },
        { text: "Completed", value: "completed" },
        { text: "Created At", value: "created_at" },

        { text: "Action", value: "action" },
      ],
      itemData: [],
    };
  },
  created() {
    this.getFormsListing();
  },
  methods: {
    updateTaxStatusParams(selected) {
      // Reset all tax status keys to null if not selected
      Object.keys(this.formParams).forEach((key) => {
        if (key.startsWith("oweTaxes") || key.startsWith("unfiledTaxes")) {
          // Set to null if the key is not in the selected array
          this.formParams[key] = selected.includes(key) ? 1 : null;
        }
      });

      this.getFormsFilter();
    },
    toggleFilters() {
      this.showBasicFilters = !this.showBasicFilters;
      this.showAdvancedFilters = !this.showAdvancedFilters;

      // Reset filter values
      if (this.showBasicFilters) {
        this.formParams.tax_years = [];
        this.selectedTaxStatuses = [];
        Object.keys(this.formParams).forEach((key) => {
          if (key.startsWith("oweTaxes") || key.startsWith("unfiledTaxes")) {
            this.formParams[key] = null;
          }
        });
      } else {
        this.formParams.name = null;
        this.formParams.email = null;
        this.formParams.income = null;
        this.formParams.age = null;
      }

      this.getFormsFilter();
    },
    initPagination() {
      this.options.page = 1;
      this.getFormsFilter();
    },
    viewDetails(item, edit) {
      this.$router.push({
        path: "/user/forms/details",
        query: {
          requestNumber: item?.request_number,
          userId: item?.id,
          edit: edit ? "true" : "false",
        },
      });
    },
    async getFormsListing() {
      this.dataLoader = true;
      this.$store.dispatch("initLoader", true);

      const apiParams = {
        page: this.options.page,
      };

      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }

      await this.$api.premierService
        .getFormsListingUser(apiParams)
        .then((response) => {
          this.itemData = response?.data;
          this.allData = response?.data?.length;
          this.options.page = Number(response?.meta?.page);
          this.totalData = response?.meta?.totalPages;
          this.options.totalPages = Math.ceil(
            this.totalData / this.options.itemsPerPage
          );
        });
      this.dataLoader = false;
      this.$store.dispatch("initLoader", false);
    },
    async getFormsFilter() {
      let taxYears = null;
      if (this.formParams?.tax_years?.length > 0) {
        taxYears = Array.isArray(this.formParams.tax_years)
          ? this.formParams.tax_years.join(",")
          : "";
        if (this.formParams?.tax_years?.length === 1) {
          taxYears = taxYears + ",";
        }
      }
      if (this.formParams?.tax_years?.length === 0) {
        this.selectedTaxStatuses = [];
        Object.keys(this.formParams).forEach((key) => {
          if (key.startsWith("oweTaxes") || key.startsWith("unfiledTaxes")) {
            this.formParams[key] = null;
          }
        });
      }
      this.dataLoader = true;

      const apiParams = {
        page: 1,
        ...this.formParams,
        tax_years: taxYears, // Use the formatted string
      };

      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }

      await this.$api.premierService
        .getFormsListingUser(apiParams)
        .then((response) => {
          this.itemData = response?.data;
          this.allData = response?.data?.length;
          this.options.page = Number(response?.meta?.page);
          this.totalData = response?.meta?.totalPages;
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
