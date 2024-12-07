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
                <v-toolbar-title>Referral</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn
                  class="ml-5"
                  @click="$router.push('/admin/referral/add')"
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
                    @click:append="getReferralFormsFilter"
                    @keyup.enter="getReferralFormsFilter"
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
                    @click:append="getReferralFormsFilter"
                    @keyup.enter="getReferralFormsFilter"
                    label="Email"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="referralParams.referral_id"
                    append-icon="mdi-magnify"
                    @click:append="getReferralFormsFilter"
                    @keyup.enter="getReferralFormsFilter"
                    label="Referral Id"
                    single-line
                    outlined
                    dense
                    hide-details
                    :class="[$vuetify.breakpoint.xs ? 'mb-2' : '']"
                  ></v-text-field
                ></v-col> </v-row
            ></template>
            <template v-slot:item.name="{ item }">
              <span class="text-truncate">{{ item?.fullName }} </span>
            </template>
            <template v-slot:item.email="{ item }">
              <span class="text-truncate">{{ item?.email }} </span>
            </template>
            <template v-slot:item.phone="{ item }">
              <span class="text-truncate">{{ item?.phone }} </span>
            </template>
            <template v-slot:item.referralId="{ item }">
              <span class="text-truncate">{{ item?.referralId }} </span>
            </template>
            <template v-slot:item.referralDate="{ item }">
              <span class="text-truncate">{{ item?.referralDate }} </span>
            </template>
            <template v-slot:item.urgency="{ item }">
              <span class="text-truncate">{{ item?.urgency }} </span>
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
                      @click="sendEmail(item)"
                    >
                      <v-icon color="blue">mdi-email</v-icon>
                    </v-btn>
                  </template>
                  <span>Send Email</span>
                </v-tooltip>
              </div>
            </template>
            <!-- <template v-slot:item.action="{ item }">
              <v-btn size="small" icon @click="viewDetails(item)"
                ><v-icon color="blue">mdi-eye</v-icon></v-btn
              >
            </template> -->
          </v-data-table>
          <CustomPagination
            :options="options"
            :totalLength="totalData"
            :totalItems="allData"
            :itemsOnPage="itemData?.length || 0"
            @initPagination="getReferralForms"
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
        referral_id: null,
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
        { text: "Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Referral Id", value: "referralId" },

        { text: "Referral Date", value: "referralDate" },
        { text: "Urgency", value: "urgency" },
        { text: "Created At", value: "created_at" },

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
    this.getReferralForms();
    // console.log(perPageOptions);
  },

  methods: {
    async sendEmail(item) {
      try {
        const payload = {
          email: item.email,
          message: item,
          subject: "Your Referral Has Been Submitted – What to Expect Next",
          key: "referral1",
        };
        this.$api.premierService.sendEmail(payload).then((res) => {
          if (res?.status) {
            const payloadTwo = {
              email: item.proReferralInfo.referralEmail,
              message: item,
              subject: "Referral Submitted from Premier Tax Debt Solutions",
              key: "referral6",
            };

            this.$api.premierService.sendEmail(payloadTwo).then((res) => {
              this.$swal.fire({
                toast: true,
                timerProgressBar: true,
                position: "top-end",
                icon: "success",
                text: "Email Sent Successfully.",
                showConfirmButton: false,
                timer: 5000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });

              this.loading = false;
            });
          } else this.loading = false;
        });

        // handle successful response
      } catch (error) {
        console.log(error.response.data);
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response.data,
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        this.loading = false;
      }
    },
    viewDetails(item) {
      this.$router.push({
        path: "/admin/referral/view",
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
              this.getReferralForms();
            });
          }
        });
    },
    initPagination() {
      // When the user changes the number of items per page, reset the current page to 1
      this.options.page = 1;
      this.getReferralFormsFilter();
    },
    editExpressAdmin(id) {
      this.$router.push({
        path: "/super/express-admins/edit",
        query: {
          id: id,
        },
      });
    },
    async getReferralForms() {
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
        .getReferralForms(apiParams)
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
    async getReferralFormsFilter() {
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
        .getReferralForms(apiParams)
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
