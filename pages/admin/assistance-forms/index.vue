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
                <v-toolbar-title>Assistance Forms</v-toolbar-title>
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
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    clearable
                    label="Location"
                    item-text="text"
                    item-value="value"
                    :items="locationFilter"
                    v-model="assistanceParams.location"
                    @input="getAssistanceFormsFilter"
                /></v-col>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    hide-details
                    solo
                    dense
                    outlined
                    label="Urgent"
                    clearable
                    item-text="text"
                    item-value="value"
                    v-model="assistanceParams.urgent"
                    :items="urgentFilter"
                    @input="getAssistanceFormsFilter"
                  />
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.name="{ item }">
              <span class="text-truncate">{{ item?.name }} </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate">{{ item?.email }} </span>
            </template>
            <template v-slot:item.assistanceTypeId="{ item }">
              <span class="text-truncate">
                {{
                  item?.assistanceTypeId === 1
                    ? "Tax Debt"
                    : item?.assistanceTypeId === 2
                    ? "Tax Resolution"
                    : item?.assistanceTypeId === 3
                    ? "Tax Preparation"
                    : ""
                }}
              </span>
            </template>
            <template v-slot:item.issueType="{ item }">
              <span class="text-truncate">{{ item?.issueType }} </span>
            </template>

            <template v-slot:item.location="{ item }">
              <span class="text-truncate">{{ item?.location }} </span>
            </template>

            <template v-slot:item.taxYear="{ item }">
              <span class="text-truncate">{{ item?.taxYear }} </span>
            </template>

            <template v-slot:item.taxLiabilityAmount="{ item }">
              <span class="text-truncate">${{ item?.taxLiabilityAmount }}</span>
            </template>
            <template v-slot:item.urgent="{ item }">
              <span class="text-truncate"
                >{{ item?.urgent === 1 ? "Yes" : "No" }}
              </span>
            </template>
            <template v-slot:item.description="{ item }">
              <span class="text-truncate">{{ item?.description }} </span>
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
              <v-btn
                size="small"
                icon
                v-if="item?.documents[0]"
                @click="downloadItem(item?.documents[0].documentPath)"
                ><v-icon color="blue">mdi-cloud-download</v-icon></v-btn
              >
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
            <template v-slot:item.view="{ item }">
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
            @initPagination="getAssistanceForms"
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
      assistanceParams: {
        location: null,
        urgent: null,
      },
      urgentFilter: [
        {
          text: "Yes",
          value: "1",
        },
        {
          text: "No",
          value: "0",
        },
      ],
      locationFilter: [
        {
          text: "Nevada",
          value: "Nevada",
        },
        {
          text: "California",
          value: "California",
        },
        {
          text: "Texas",
          value: "Texas",
        },
        {
          text: "Mississippi",
          value: "Mississippi",
        },
        {
          text: "Utah",
          value: "Utah",
        },
        {
          text: "Other",
          value: "Other",
        },
      ],
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

        { text: "Assistance Type", value: "assistanceTypeId" },
        { text: "Issue Type", value: "issueType" },
        { text: "Location", value: "location" },
        { text: "Tax Years", value: "taxYear" },
        { text: "Liability Amount", value: "taxLiabilityAmount" },
        { text: "Urgent", value: "urgent" },
        { text: "Created At", value: "created_at" },

        { text: "Documents", value: "action" },
        { text: "Action", value: "view" },
      ],
      itemData: [],
    };
  },
  watch: {
    options(val) {
      this.getAssistanceFormsFilter();
    },
    itemsPerPage(val) {
      this.getAssistanceFormsFilter();
    },
  },
  created() {
    this.getAssistanceForms();
    // console.log(perPageOptions);
  },

  methods: {
    viewDetails(item) {
      this.$router.push({
        path: "/admin/assistance-forms/view",
        query: {
          id: item?.id,
        },
      });
    },
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
              this.getAssistanceForms();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getAssistanceFormsFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getAssistanceForms() {
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
        .getAssistanceForms(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data?.data.map((item) => {
            // Check if basicInfo exists and parse it
            if (item.basicInfo) {
              try {
                const basicInfoData = JSON.parse(item.basicInfo);
                // Merge the parsed basicInfo data with the item
                return { ...item, ...basicInfoData };
              } catch (error) {
                console.error("Failed to parse basicInfo for item:", error);
              }
            }
            // Return the item as-is if there's no basicInfo or if parsing fails
            return item;
          });

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
    async getAssistanceFormsFilter() {
      this.dataLoader = true;

      // Create an object to hold the API parameters
      const apiParams = {
        page: 1,
        ...this.assistanceParams,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }

      await this.$api.premierService
        .getAssistanceForms(apiParams)
        .then((response) => {
          // console.log(response?.data);
          this.itemData = response?.data?.data.map((item) => {
            // Check if basicInfo exists and parse it
            if (item.basicInfo) {
              try {
                const basicInfoData = JSON.parse(item.basicInfo);
                // Merge the parsed basicInfo data with the item
                return { ...item, ...basicInfoData };
              } catch (error) {
                console.error("Failed to parse basicInfo for item:", error);
              }
            }
            // Return the item as-is if there's no basicInfo or if parsing fails
            return item;
          });
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
