<template>
  <div>
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
                  <v-toolbar-title>All Clients</v-toolbar-title>
                  <v-spacer></v-spacer>

                  <!-- <v-btn
                    class="ml-5"
                    @click="$router.push('/user/services/add')"
                    color="#ffb300"
                  >
                    Add Service
                  </v-btn> -->
                </v-card-title>
                <v-row class="my-4">
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="servicesParams.name"
                      append-icon="mdi-magnify"
                      @click:append="getServicesFilter"
                      @keyup.enter="getServicesFilter"
                      label="Name"
                      single-line
                      outlined
                      dense
                      hide-details
                      :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="servicesParams.email"
                      append-icon="mdi-magnify"
                      @click:append="getServicesFilter"
                      @keyup.enter="getServicesFilter"
                      label="Email"
                      single-line
                      outlined
                      dense
                      hide-details
                      :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="servicesParams.case_number"
                      append-icon="mdi-magnify"
                      @click:append="getServicesFilter"
                      @keyup.enter="getServicesFilter"
                      label="Case Number"
                      single-line
                      outlined
                      dense
                      hide-details
                      :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      hide-details
                      solo
                      dense
                      outlined
                      clearable
                      label="Service"
                      item-text="text"
                      item-value="value"
                      :items="serviceFilters"
                      v-model="servicesParams.service_id"
                      @input="getServicesFilter"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      hide-details
                      solo
                      dense
                      outlined
                      label="Payment Status"
                      clearable
                      item-text="text"
                      item-value="value"
                      v-model="servicesParams.is_paid"
                      :items="paymentFilters"
                      @input="getServicesFilter"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      hide-details
                      solo
                      dense
                      outlined
                      label="Urgency"
                      clearable
                      item-text="text"
                      item-value="value"
                      v-model="servicesParams.is_urgent"
                      :items="urgentFilter"
                      @input="getServicesFilter"
                    />
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.name="{ item }">
                <span class="text-truncate">{{ item?.full_name }} </span>
              </template>
              <template v-slot:item.email="{ item }">
                <span class="text-truncate">{{ item?.email }} </span>
              </template>
              <template v-slot:item.phone="{ item }">
                <span class="text-truncate">{{ item?.phone }} </span>
              </template>
              <template v-slot:item.service_id="{ item }">
                <span class="text-truncate"
                  >{{
                    item?.service_id == 1
                      ? "In-depth liaison call"
                      : item?.service_id == 2
                      ? "Fresh start resolution navigator"
                      : item?.service_id == 3
                      ? "Secure tax sendoff"
                      : item?.service_id == 4
                      ? "Tax Relief Pathway"
                      : "-"
                  }}
                </span>
              </template>
              <template v-slot:item.case_number="{ item }">
                <span class="text-truncate"
                  >{{ item?.case_number ? item?.case_number : "N/A" }}
                </span>
              </template>
              <template v-slot:item.total_price="{ item }">
                <span class="text-truncate">{{ item?.total_price }} </span>
              </template>
              <template v-slot:item.is_urgent="{ item }">
                <v-chip
                  class="text-truncate"
                  :color="item?.is_urgent ? 'red darken-3' : 'green darken-2'"
                  outlined
                >
                  {{ item?.is_urgent ? "Yes" : "No" }}
                </v-chip>
              </template>

              <template v-slot:item.is_paid="{ item }">
                <!-- Conditional Payment Chip or Button -->
                <div class="d-flex align-center">
                  <!-- Show Chip if is_paid is true or total_price is "0.00" -->
                  <v-chip
                    v-if="item?.is_paid || item?.total_price === '0.00'"
                    class="text-truncate"
                    color="#003A3A"
                    outlined
                  >
                    {{ item?.is_paid ? "Yes" : "N/A" }}
                  </v-chip>

                  <!-- Show Pay Now Button if is_paid is false and total_price is not "0.00" -->
                  <v-chip v-else color="#ffb300" @click="handlePayNow(item)">
                    Pay Now
                    <!-- <v-progress-circular
                      indeterminate
                      color="white"
                      :size="16"
                      v-if="loadingBtn"
                    ></v-progress-circular> -->
                  </v-chip>
                </div>
              </template>
              <!-- <template v-slot:item.status="{ item }">
                <span class="text-truncate">{{ item?.status }} </span>
              </template> -->
              <template v-slot:item.status="{ item, index }">
                <td width="200">
                  <v-select
                    style="width: 180px !important"
                    outlined
                    background-color="white"
                    dense
                    :items="statusItems"
                    v-model="item.status"
                    hide-details
                    item-text="name"
                    item-value="name"
                    @input="updateStatus(item.id, item.status, index)"
                    class="my-2"
                  />
                </td>
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
              <!-- <template v-slot:item.document_url="{ item }">
                <v-btn
                  size="small"
                  icon
                  v-if="item?.document_url"
                  @click="downloadItem(item?.document_url)"
                  ><v-icon color="blue">mdi-cloud-download</v-icon></v-btn
                >
                <div v-else>N/A</div></template
              > -->
              <template v-slot:item.action="{ item }">
                <div style="display: flex">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        size="small"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="viewDetails(item)"
                      >
                        <v-icon color="blue">mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>View Details</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        size="small"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="viewNotes(item)"
                      >
                        <v-icon color="blue">mdi-note</v-icon>
                      </v-btn>
                    </template>
                    <span>View Notes</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
            <CustomPagination
              :options="options"
              :totalLength="totalData"
              :totalItems="allData"
              :itemsOnPage="itemData?.length || 0"
              @initPagination="getServices"
              @initItemsPerPage="initPagination"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <template>
      <v-row>
        <template>
          <v-sheet class="overflow-hidden">
            <v-navigation-drawer
              v-model="drawer"
              app
              temporary
              right
              width="600"
            >
              <!-- Close button -->
              <div style="background-color: #ffb300">
                <v-btn icon @click="closeDrawer" class="ml-3 mr-3 mt-4">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

                <!-- Provider Details -->
                <h1 class="mt-2 pa-4" style="color: white">Notes</h1>
                <v-divider class="mx-5"></v-divider>
              </div>

              <!-- Notes List -->
              <v-container class="ml-8 mt-4" style="font-size: 18px">
                <!-- Input field for adding new notes -->
                <v-row class="mt-4">
                  <v-col cols="11">
                    <v-text-field
                      v-model="newNote"
                      label="Add a new note"
                      outlined
                      dense
                      append-icon="mdi-arrow-right"
                      @click:append="addNote"
                      @keydown.enter="addNote"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <div v-if="!dataLoader">
                <v-container
                  class="ml-8 mt-4"
                  style="font-size: 18px"
                  v-if="notes.length > 0"
                >
                  <div
                    v-for="(item, index) in notes"
                    :key="item.id"
                    class="mb-2"
                  >
                    <v-row>
                      <!-- Numbering -->

                      <!-- Note Content -->
                      <v-col cols="11">
                        <div>
                          <!-- Textarea for notes -->
                          <v-textarea
                            outlined
                            rows="1"
                            auto-grow
                            :value="item.notes"
                            disabled
                          ></v-textarea>

                          <!-- Creation date display -->
                          <div style="color: #003a3a; font-size: 15px">
                            Created on: {{ formatDate(item.created_at) }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider class="mt-3"></v-divider>
                  </div>

                  <!-- Input field for adding new notes -->
                </v-container>
                <div v-else class="text-center mt-6" style="color: black">
                  No Notes Found!
                </div>
              </div>
              <div class="text-center mt-6" v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-navigation-drawer>
          </v-sheet>
        </template>
        <!-- Rest of your code -->
      </v-row>
    </template>
  </div>
</template>

<script>
import { perPageOptions } from "../../../config/paginationConfig";
import moment from "moment";

export default {
  name: "formsPage",
  layout: "dashboard",
  data() {
    return {
      drawer: false,
      itemId: null,
      servicesParams: {
        name: null,
        email: null,
        service_id: null,
        is_paid: null,
        is_urgent: null,
        case_number: null,
      },
      notes: [],
      newNote: "",
      statusItems: [
        {
          name: "Pending Resolution",
        },
        { name: "Submit to IRS" },
        { name: "Info Needed" },
        { name: "Cancelled" },
        { name: "Payment Due" },
        { name: "Completed" },
      ],

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
      paymentFilters: [
        {
          text: "Paid",
          value: "1",
        },
        {
          text: "Unpaid",
          value: "0",
        },
      ],
      serviceFilters: [
        {
          text: "In-depth liaison call",
          value: "1",
        },
        {
          text: "Fresh start resolution navigator",
          value: "2",
        },
        {
          text: "Secure tax sendoff",
          value: "3",
        },
        {
          text: "All of the above",
          value: "4",
        },
      ],
      headers: [
        { text: "Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Service", value: "service_id" },
        { text: "Case Number", value: "case_number" },

        { text: "Total Price", value: "total_price" },
        { text: "Urgency", value: "is_urgent" },
        { text: "Paid", value: "is_paid" },
        { text: "Status", value: "status" },
        { text: "Created At", value: "created_at" },

        // { text: "Documents", value: "document_url" },

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
    this.getServices();
    // console.log(perPageOptions);
  },

  methods: {
    downloadItem(link) {
      // Remove "/public" from the link
      const cleanedLink = link.replace("public/", "");

      // Remove "/api/" from the BASE_URL if it exists
      const baseUrlWithoutApi = process.env.BASE_URL.replace(/\/api\/$/, "");
      console.log(baseUrlWithoutApi);

      // Combine the cleaned link with the modified base URL
      const fullUrl = `${baseUrlWithoutApi}/${cleanedLink}`;

      // Open the full URL in a new window
      window.open(fullUrl, "_blank");
    },
    async updateStatus(appointmentId, status, index) {
      if (!appointmentId) return;
      await this.$api.premierService
        .updateService(appointmentId, {
          status: status,
        })
        .finally(() => {
          this.getServices();
        });
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // 12-hour format with AM/PM
        timeZone: "America/Los_Angeles", // PST (Pacific Standard Time)
      };
      return new Intl.DateTimeFormat(undefined, options).format(new Date(date));
    },
    closeDrawer() {
      this.drawer = false;
      this.notes = [];
      this.itemId = null;
    },
    addNote() {
      try {
        this.dataLoader = true;
        const payload = {
          service_request_id: this.itemId,
          notes: this.newNote,
        };
        this.$api.premierService.addNotes(payload).then((res) => {
          if (res?.data) {
            this.newNote = "";
            this.getNotes(this.itemId);
          }
        });
      } catch (error) {
        this.dataLoader = false;
        console.log(error);

        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response?.data || "An error occurred",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    },
    viewNotes(item) {
      this.dataLoader = true;
      this.drawer = true;
      this.itemId = item.id;
      this.getNotes(item.id);
    },
    async getNotes(id) {
      await this.$api.premierService
        .getNotesById(id)
        .then((response) => {
          // console.log(response?.data);
          this.notes = response?.data;

          console.log(response.data);

          // console.log(response?.data);
        })
        .finally(() => {
          this.dataLoader = false;
          this.$store.dispatch("initLoader", false);
        });
    },
    viewDetails(item) {
      if (item?.service_id !== "3") {
        this.$router.push({
          path: "/admin/services/view",
          query: {
            id: item?.id,
          },
        });
      } else {
        this.$router.push({
          path: "/admin/services/view-secure-tax-send-off",
          query: {
            id: item?.id,
          },
        });
      }
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
              this.getServices();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getServicesFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },

    async getServices() {
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
        .getServicesAdmin(apiParams)
        .then((response) => {
          console.log(response);
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
    async getServicesFilter() {
      this.dataLoader = true;

      // Create an object to hold the API parameters
      const apiParams = {
        page: 1,
        ...this.servicesParams,
      };

      // Check if itemsPerPage is not 'All'
      if (this.options.itemsPerPage !== -1) {
        apiParams.limit = this.options.itemsPerPage;
      }
      if (this.options.itemsPerPage === -1) {
        apiParams.limit = "";
      }
      await this.$api.premierService
        .getServicesAdmin(apiParams)
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
    async handlePayNow(item) {
      const payload = {
        type: "service",
        type_id: item.id,
        from: "admin-service",
      };
      if (item.service_id == 3 && item.total_price === "45.00") {
        payload.label = "form_433f_letter";
        payload.payment_service = "Secure tax sendoff";
        payload.from = `user-service&id=${item?.id}&form=${item?.extra_values?.formSelection}`;
      } else if (item.service_id == 3 && item.total_price === "95.00") {
        payload.label = "secure_tax_send_off";
        payload.payment_service = "Secure tax sendoff";
        payload.from = `admin-service&id=${item?.id}&form=${item?.extra_values?.formSelection}`;
      } else if (item.service_id == 3 && item.total_price === "125.00") {
        payload.label = "secure_tax_send_off_penalty_abatement";
        payload.payment_service = "Secure tax sendoff Penalty Abatement";
        payload.from = `admin-service&id=${item?.id}&form=${item?.extra_values?.formSelection}`;
      } else if (item.service_id == 1) {
        payload.label = "in_depth_liaison_call";
        payload.payment_service = "In-depth liaison call";
      } else if (item.service_id == 4) {
        payload.label = "tax_releif_pathway";
        payload.payment_service = "Tax Relief Pathway";
      } else if (item.service_id == 2 && item.total_price === "495.00") {
        payload.label = "standard_fresh_start_navigator";
        payload.payment_service = "Standard Fresh Start Navigator";
      } else if (item.service_id == 2 && item.total_price === "695.00") {
        payload.label = "advance_fresh_start_navigator";
        payload.payment_service = "Advance Fresh Start Navigator";
      }

      try {
        this.loadingBtn = true;
        const res = await this.$api.premierService.adminPaymentCheckout(
          payload
        );
        if (res && res.data) {
          const redirectLink = res.data;

          // Log the redirect link for debugging
          console.log("Redirecting to:", redirectLink);

          // Redirecting the user to the link
          window.location.href = redirectLink;
        } else this.loadingBtn = false;
      } catch (error) {
        this.loadingBtn = false;

        console.log(error);
      }
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
