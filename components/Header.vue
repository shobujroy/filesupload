<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="menuPinnedModal"
      class="sidebar-custom"
      ref="sidebar"
      app
      width="260"
      :style="$auth?.user?.role_id === 2 && { backgroundColor: '#003a3a' }"
    >
      <v-list dense class="pt-0">
        <v-list-item class="cursor-pointer" exact nuxt>
          <v-list-item-content @click="$router.push('/')">
            <v-img
              src="/logo-taxpert.png"
              lazy-src="/logo-taxpert.png"
              :height="50"
              contain
            />
          </v-list-item-content>

          <!-- <v-list-item-action>
            <v-col v-if="!$vuetify.breakpoint.mobile" cols="2">
              <v-btn
                @click="initPinButton"
                class="pa-5"
                :class="menuPinnedModal ? '' : 'primary white--text'"
                small
                icon
              >
                <v-icon :color="menuPinnedModal ? 'grey' : 'white'"
                  >mdi-pin</v-icon
                >
              </v-btn>
            </v-col>
          </v-list-item-action> -->
        </v-list-item>
        <v-divider :style="!isAdmin() && { borderColor: 'grey' }"></v-divider>

        <template v-if="isAdmin()">
          <v-list-item to="/admin/dashboard" router exact>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Dashboard </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/admin/forms"
            router
            exact
            @click="clearAlert('totalForms')"
          >
            <v-list-item-action>
              <v-icon>mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Forms
                <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.totalForms"
                  >mdi-circle</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/admin/services"
            router
            exact
            @click="clearAlert('serviceRequest')"
          >
            <v-list-item-action>
              <v-icon>mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Clients
                <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.serviceRequest"
                  >mdi-circle</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item
            to="/admin/referral"
            router
            exact
            @click="clearAlert('totalReferrals')"
          > -->
          <v-list-item to="/admin/referral" router exact>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Referral
                <!-- <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.totalReferrals"
                  >mdi-circle</v-icon
                > -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/admin/assistance-forms"
            router
            exact
            @click="clearAlert('totalAssistance')"
          >
            <v-list-item-action>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Assistance Forms
                <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.totalAssistance"
                  >mdi-circle</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/admin/funding-forms"
            router
            exact
            @click="clearAlert('totalFunding')"
          >
            <v-list-item-action>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Funding Forms
                <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.totalFunding"
                  >mdi-circle</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/admin/partnership-forms"
            router
            exact
            @click="clearAlert('totalPartnerships')"
          >
            <v-list-item-action>
              <v-icon>mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Partnership Forms

                <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.totalPartnerships"
                  >mdi-circle</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item
            to="/admin/liason-call"
            router
            exact
            @click="clearAlert('liaisonCallForms')"
          > -->
          <v-list-item to="/admin/liason-call" router exact>
            <v-list-item-action>
              <v-icon>mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Liaison Call Forms

                <!-- <v-icon
                  size="large"
                  color="#003A3A"
                  style="margin-top: -4px; margin-left: 15px"
                  v-if="showAlert.liaisonCallForms"
                  >mdi-circle</v-icon
                > -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item
            to="/user/dashboard"
            router
            exact
            :style="$auth?.user?.role_id === 2 && { color: 'white' }"
          >
            <v-list-item-action>
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/user/forms"
            router
            exact
            :style="$auth?.user?.role_id === 2 && { color: 'white' }"
          >
            <v-list-item-action>
              <v-icon color="white">mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Forms </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            to="/user/services"
            router
            exact
            :style="$auth?.user?.role_id === 2 && { color: 'white' }"
          >
            <v-list-item-action>
              <v-icon color="white">mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Services</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/user/liason-call"
            router
            exact
            :style="$auth?.user?.role_id === 2 && { color: 'white' }"
          >
            <v-list-item-action>
              <v-icon color="white">mdi-list-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Liaison Call Forms</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#003A3A" dark fixed app>
      <div>
        <v-btn
          v-if="menuPinnedModal || $vuetify.breakpoint.mobile"
          @click="
            () => {
              if ($vuetify.breakpoint.mobile) {
                drawer = !drawer;
              } else {
                initPinButton();
              }
            }
          "
          class="pa-5"
          small
          icon
        >
          <v-icon :color="'white'">mdi-menu</v-icon>
        </v-btn>
      </div>

      <v-menu nudge-right="" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="pl-0 pr-0"
            height="100%"
            text
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="white mx-2 pa-1 rounded-xl" color="primary"
              >mdi-account</v-icon
            >
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <div class="d-flex flex-column text-left">
                <span class="text-lowercase">
                  <!-- {{ $auth.user?.email }} -->
                </span>
              </div>
              <v-icon>mdi-menu-down</v-icon>
            </template>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-title class="text-capitalize">
              <div class="d-flex align-center">
                <span class="mr-2"
                  >{{ this.$auth?.user?.first_name }}
                  {{ this.$auth?.user?.last_name }}</span
                >
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title class="text-capitalize">
              <div class="d-flex align-center">
                <span class="mr-2">Account Type:</span>
                <v-chip small v-if="isAdmin()"> Admin </v-chip>
                <v-chip small v-else> User </v-chip>
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item to="/update-profile">
            <v-list-item-title>Update Profile</v-list-item-title>
          </v-list-item>
          <v-divider v-if="$auth.user.role_id === 1"></v-divider>
          <v-list-item to="/admin/add-user" v-if="$auth.user.role_id === 1">
            <v-list-item-title>Add Admin</v-list-item-title>
          </v-list-item>
          <v-divider v-if="$auth.user.role_id === 1"></v-divider>
          <v-list-item
            to="/admin/update-template"
            v-if="$auth.user.role_id === 1"
          >
            <v-list-item-title>PostGrid Settings</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/update-password">
            <v-list-item-title>Update Password</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="userLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "../nuxt.config";

export default {
  name: "Navbar",
  data() {
    return {
      // value: 0,
      title: "Previsit Admin",
      miniVariant: true,
      drawer: true,
      dashboardData: null,
      oldDashboardData: null, // To store previous values
      showAlert: {
        totalForms: false,
        totalAssistance: false,
        totalFunding: false,
        totalPartnerships: false,
        // totalReferrals: false,
        serviceRequest: false,
        // liaisonCallForms: false,
      },
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
      ],
      loggedInUser: true,
      isAuthenticated: false,
      socket: null,
    };
  },
  computed: {
    ...mapGetters(["prefix"]),
    ...mapState(["prefix"]),

    menuPinnedModal: {
      get() {
        return this.menuPinned;
      },
      set(val) {
        this.$store.dispatch("initPinMenu", val);
      },
    },
  },

  mounted() {
    // store in localStorage menuPinned
    const menuPinnedBool = localStorage.getItem(
      `${config.appPrefix}-menuPinned`
    );

    if (menuPinnedBool === "true") {
      this.$store.dispatch("initPinMenu", true);
    } else if (menuPinnedBool === "false") {
      this.$store.dispatch("initPinMenu", false);
    }

    const storedData = localStorage.getItem("oldDashboardData");
    this.oldDashboardData = storedData ? JSON.parse(storedData) : null;

    // Load initial data
    this.getDashboardCount();

    // Call the API every minute
    setInterval(() => {
      this.getDashboardCount();
    }, 60000);
  },
  methods: {
    getDashboardCount() {
      this.$api.premierService
        .getDashboardCount(this.dashboardCountParams)
        .then((response) => {
          const newDashboardData = response;

          // Check if old data exists, if not, initialize it with current data
          if (!this.oldDashboardData) {
            this.oldDashboardData = { ...newDashboardData };
            localStorage.setItem(
              "oldDashboardData",
              JSON.stringify(this.oldDashboardData)
            );
          }

          // Compare new values with old values and show alert if increased
          for (const key in newDashboardData) {
            if (newDashboardData.hasOwnProperty(key)) {
              this.showAlert[key] =
                newDashboardData[key] > (this.oldDashboardData[key] || 0);
            }
          }

          // Update dashboardData with the new response
          this.dashboardData = newDashboardData;
        });
    },
    clearAlert(type) {
      // Clear alert for a specific section and update oldDashboardData
      this.showAlert[type] = false;
      if (this.dashboardData && this.oldDashboardData) {
        this.oldDashboardData[type] = this.dashboardData[type];
        localStorage.setItem(
          "oldDashboardData",
          JSON.stringify(this.oldDashboardData)
        );
      }
    },
    isAdmin() {
      if (this.$auth.state.user.role_id === 1) {
        return true;
      } else return false;
    },
    async userLogout() {
      await this.$auth.logout().then(() => {
        localStorage.removeItem("admin");
        localStorage.removeItem("user");

        this.$router.push("/login");
      });
    },
    initPinButton() {
      this.menuPinnedModal = !this.menuPinnedModal;
      // store in localStorage menuPinned
      localStorage.setItem(
        `${config.appPrefix}-menuPinned`,
        this.menuPinnedModal
      );
    },
    toggleSidebar(val) {
      if (val) this.$store.dispatch("initPinMenu", val);
    },
    initExpandButtons(val) {
      if (val) this.$store.dispatch("initPinMenu", val);
    },
  },
  updated() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.message__icon {
  position: relative;
}

.notifier-dot {
  position: absolute;
  top: 7px;
  right: 5px;
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
  z-index: 10;
}

.sidebar-notifier-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
  z-index: 10;
  top: 7px;
  right: 7px;
}
</style>
