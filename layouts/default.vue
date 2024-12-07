<template>
  <v-app dark fixed>
    <!-- <Loader :loading="appLoader" /> -->

    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      app
      fixed
      v-model="drawer"
      class="no-print"
      width="240"
      :clipped="clipped"
      height="104vh"
      style="background-color: #003a3a"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-list>
          <v-list-item v-for="item in headerMenu" :key="item.to">
            <nuxt-link :to="item.to">
              <v-list-item-content class="white--text text-center">
                {{ item.name }}
              </v-list-item-content></nuxt-link
            >
          </v-list-item>
        </v-list>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="white--text text-center mb-5">
              Locations
              <v-icon color="white">mdi-chevron-down</v-icon>
            </div>
          </template>
          <v-list style="background-color: #003a3a">
            <v-list-item v-for="(item, index) in locations" :key="index">
              <v-list-item-title
                @click="
                  $router.push({
                    path: '/assistance',
                    query: { location: item.title },
                  })
                "
                class="menu-list"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <nuxt-link to="/funding" class="white--text text-center mb-5">
          Funding</nuxt-link
        >
        <nuxt-link to="/how-to" class="white--text text-center mb-5">
          How To</nuxt-link
        >
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="primary--text text-center mb-3"
            >
              Premier Tax Prep <v-icon color="black">mdi-chevron-down</v-icon>
            </div>
          </template>
          <v-list style="background-color: #003a3a">
            <v-list-item>
              <a
                :href="'tel:180082937211'"
                class="menu-list"
                style="text-decoration: none; color: white; width: 100%"
              >
                <v-icon color="white">mdi-phone</v-icon> 1800-TAXES-211
              </a>
            </v-list-item>
          </v-list>
        </v-menu> -->
        <div class="header-buttons">
          <button class="appointment-button" @click="handleNavigate">
            <span>Tax Form Navigator</span>
          </button>
        </div>
        <div class="header-buttons mt-5" v-if="isLoggedIn()">
          <button class="appointment-button" @click="$router.push('/login')">
            <span>Login</span>
          </button>
        </div>
        <div class="header-buttons mt-5" v-else>
          <button class="appointment-button" @click="$router.push('/user')">
            <span>Portal</span>
          </button>
        </div>
      </div>
    </v-navigation-drawer>

    <v-row
      class="white--text py-5"
      justify="center"
      align="center"
      style="background-color: #2c7671"
    >
      <v-col
        cols="12"
        md="6"
        :class="$vuetify.breakpoint.mobile && 'text-center'"
        :style="$vuetify.breakpoint.mobile && { fontSize: '14px' }"
        align="center"
      >
        <div>
          <v-icon
            color="white"
            class="mr-2"
            :style="$vuetify.breakpoint.mobile && { fontSize: '14px' }"
            >mdi-clock-outline</v-icon
          >
          MON-FRI 9AM - 7PM. Saturday/Sunday 7AM-12PM. (PST)<span
            :class="!$vuetify.breakpoint.mobile && 'px-4'"
          ></span>
          <br v-if="$vuetify.breakpoint.mobile" />
          <a :href="'tel:8334829211'" class="phone">
            <v-icon
              color="white"
              class="mr-2"
              :style="$vuetify.breakpoint.mobile && { fontSize: '14px' }"
              >mdi-phone</v-icon
            >
            833-4-TAX-211
          </a>
        </div>
      </v-col>
    </v-row>
    <div class="main-container-header">
      <div class="pl-8 header-container">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="app-bar-icon"
          color="white"
          style="margin-right: 80px !important"
        ></v-app-bar-nav-icon>
        <div
          class="header-image text-center"
          @click="$router.push('/')"
          style="cursor: pointer"
        >
          <img
            src="/logo-taxpert.png"
            style="width: 110px"
            v-if="$vuetify.breakpoint.mdAndUp"
          />
          <img src="/logo-taxpert.png" style="width: 100px" v-else />
        </div>
        <div class="header-nav-items">
          <div v-for="item in headerMenu" :key="item.to">
            <nuxt-link
              :to="item.to"
              :class="$route.path === item.to && 'active-button'"
              class="nav-button"
            >
              {{ item.name }}</nuxt-link
            >
          </div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="nav-button">
                Locations
                <v-icon color="white">mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list style="background-color: #003a3a">
              <v-list-item v-for="(item, index) in locations" :key="index">
                <v-list-item-title
                  @click="
                    $router.push({
                      path: '/assistance',
                      query: { location: item.title },
                    })
                  "
                  class="menu-list"
                >
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="nav-button">
                B2B Resources & Partners
                <v-icon color="white">mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list style="background-color: #003a3a">
              <v-list-item v-for="(item, index) in partners" :key="index">
                <a
                  :href="item?.to"
                  class="menu-list"
                  style="text-decoration: none; color: white; width: 100%"
                  target="_blank"
                >
                  {{ item.title }}
                </a>
              </v-list-item>
            </v-list>
          </v-menu> -->
          <nuxt-link
            to="/funding"
            :class="$route.path === '/funding' && 'active-button'"
            class="nav-button"
          >
            Funding</nuxt-link
          >
          <nuxt-link
            to="/how-to"
            :class="$route.path === '/how-to' && 'active-button'"
            class="nav-button"
          >
            How to</nuxt-link
          >
          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="nav-button">
                Premier Tax Prep <v-icon color="white">mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list style="background-color: #003a3a">
              <v-list-item>
                <a
                  :href="'tel:180082937211'"
                  class="menu-list"
                  style="text-decoration: none; color: white; width: 100%"
                >
                  <v-icon color="white">mdi-phone</v-icon> 1800-TAXES-211
                </a>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
        <div class="header-buttons mr-4" v-if="!$vuetify.breakpoint.mobile">
          <button class="appointment-button" @click="handleNavigate">
            <span>Tax Form Navigator</span>
          </button>
        </div>
        <div class="header-buttons" v-if="isLoggedIn()">
          <button
            class="appointment-button"
            @click="$router.push('/login')"
            v-if="!$vuetify.breakpoint.mobile"
          >
            <span>Login</span>
          </button>
        </div>
        <div class="header-buttons" v-else>
          <button
            class="appointment-button"
            @click="$router.push('/user')"
            v-if="!$vuetify.breakpoint.mobile"
          >
            <span>Portal</span>
          </button>
        </div>
      </div>
    </div>
    <v-main v-if="!$route.path.includes('tax-evaluation')">
      <v-container class="h-full" fluid style="padding: 0 !important">
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <div class="layout" v-if="$route.path.includes('tax-evaluation')">
      <nav class="sidebar" v-if="$vuetify.breakpoint.mdAndUp">
        <div class="links">
          <div
            v-for="link in links"
            :key="link.name"
            :class="$route.path === link.route && 'active-route'"
            class="link"
          >
            <nuxt-link :to="link.route">{{ link.name }}</nuxt-link>
          </div>
        </div>
      </nav>
      <v-tabs
        v-model="tab"
        background-color="#7589c9"
        color="basil"
        grow
        class="mt-4"
        v-else
      >
        <v-tab
          v-for="item in links"
          :key="item?.name"
          @click="$router.push(item?.route)"
        >
          {{ item?.name }}
        </v-tab>
      </v-tabs>

      <v-main class="content">
        <Nuxt />
      </v-main>
    </div> -->

    <v-row v-if="$route.path.includes('tax-evaluation')"
      ><v-col md="2" cols="12">
        <nav class="sidebar" v-if="$vuetify.breakpoint.mdAndUp">
          <div class="links">
            <div
              v-for="link in links"
              :key="link.name"
              :class="$route.path.includes(link.route) && 'active-route'"
              class="link"
            >
              <nuxt-link to="#">{{ link.name }}</nuxt-link>
            </div>
          </div>
        </nav>
        <!-- <v-tabs
          v-model="tab"
          background-color="#7589c9"
          color="basil"
          grow
          class="mt-4"
          v-else
        >
          <v-tab
            v-for="item in links"
            :key="item?.name"
            @click="$router.push(item?.route)"
          >
            {{ item?.name }}
          </v-tab>
        </v-tabs> -->
      </v-col>
      <v-col md="10" cols="12">
        <v-alert
          dense
          border="left"
          type="warning"
          class="text-center"
          v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        >
          You have to use desktop in order to download and edit the forms.
        </v-alert>
        <v-main> <Nuxt /> </v-main></v-col
    ></v-row>

    <div class="flex justify-center footer-main">
      <div class="mid-container-footer">
        <!-- <v-row class="subscribe-top"
          ><v-col cols="12" md="6" class="py-10 pa-10 subscribe-section">
            <div class="news">Subscribe to our Newsletter</div> </v-col
          ><v-col
            cols="12"
            md="6"
            class="py-10 pa-10 subscribe-section-2"
            align="center"
          >
            <div class="sub-heading">
            </div>
            <v-row align="center"
              ><v-col cols="12" md="8">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  class="email-field"
              /></v-col>
              <v-col cols="12" md="4"
                ><span class="subscribe-button">Subscribe Now</span></v-col
              ></v-row
            >
          </v-col></v-row
        > -->
        <v-row
          ><v-col
            cols="12"
            md="4"
            style="display: flex; flex-direction: column; gap: 15px"
            :style="$vuetify.breakpoint.mobile && { textAlign: 'center' }"
          >
            <div class="footer-image">
              <div @click="$router.push('/')" style="cursor: pointer">
                <img src="/logo-taxpert.png" alt="" style="width: 180px" />
              </div>
              <p></p>
            </div> </v-col
          ><v-col
            cols="6"
            md="2"
            sm="3"
            style="display: flex; flex-direction: column; gap: 15px"
          >
            <div class="bottom-heading">Quick Links</div>
            <div class="bottom-nav" @click="$router.push('/blogs')">Blogs</div>
            <!-- <div class="bottom-nav" @click="$router.push('/services')">
              Services
            </div> -->
            <div class="bottom-nav" @click="$router.push('/partnership')">
              Partnership
            </div> </v-col
          ><v-col
            cols="6"
            md="2"
            sm="3"
            style="display: flex; flex-direction: column; gap: 15px"
          >
            <div class="bottom-heading">Useful Links</div>
            <div class="bottom-nav" @click="$router.push('/disclaimer')">
              Disclaimer
            </div>
            <div class="bottom-nav" @click="$router.push('/about')">About</div>

            <!-- <div class="bottom-nav" @click="$router.push('/pricing')">
              Pricing
            </div> -->
            <div class="bottom-nav" @click="$router.push('/faqs')">
              Faq
            </div> </v-col
          ><v-col
            cols="6"
            md="2"
            sm="3"
            style="display: flex; flex-direction: column; gap: 15px"
          >
            <div class="bottom-heading">Get in Touch</div>
            <div style="display: flex; align-items: center; gap: 4px">
              <v-icon color="#FFB400">mdi-map-marker</v-icon>
              <div>
                3172 N Rainbow Blvd <br />
                PMB 21163 <br />
                Las Vegas, NV 89108
              </div>
            </div>

            <div>
              <a
                :href="'tel:8334829211'"
                class="phone"
                style="display: flex; align-items: center; gap: 4px"
              >
                <v-icon color="#FFB400">mdi-phone</v-icon>
                <div>833-4-TAX-211</div>
              </a>
            </div>
            <div style="display: flex; align-items: center; gap: 4px">
              <v-icon color="#FFB400">mdi-email</v-icon>
              <div>relief@premiertaxdebtsolutions.com</div>
            </div>
          </v-col>
          <v-col cols="6" md="2" sm="3">
            <div style="font-size: 19px">Social Media:</div>
            <div class="footer-bottom">
              <div class="footer-icons">
                <div class="footer-icon">
                  <a
                    href="https://www.facebook.com/premiertaxdebtsolutions?mibextid=LQQJ4d"
                    target="blank"
                  >
                    <v-icon color="black">mdi-facebook</v-icon>
                  </a>
                </div>
                <div class="footer-icon">
                  <a
                    href="https://www.instagram.com/4tax211/?igsh=MWNxeXRrOHNvNmZkaQ"
                  >
                    <v-icon color="black">mdi-instagram</v-icon>
                  </a>
                </div>
                <div class="footer-icon">
                  <a
                    href="https://www.youtube.com/@premiertaxdebtsolutions"
                    target="blank"
                  >
                    <v-icon color="black">mdi-youtube</v-icon>
                  </a>
                </div>
              </div>
            </div>
          </v-col></v-row
        >

        <div style="border-bottom: 1px solid #c0c9e7" class="my-5"></div>
        <v-row
          justify="space-between"
          :style="$vuetify.breakpoint.mobile && { textAlign: 'center' }"
          ><v-col cols="12" md="5"
            >©2024 PremierTaxDebtSolutions. Nevada is Headquarters. <br />
            <small style="font-size: 10px" class="white--text pa-1">
              {{ `Version: ${AppVersion?.app_version}` }}
            </small></v-col
          ><v-col cols="12" md="4" align="right">
            <div :style="$vuetify.breakpoint.mobile && { textAlign: 'center' }">
              <nuxt-link to="/privacy-policy" class="bottom-nav"
                >Privacy Policy</nuxt-link
              >
              |
              <nuxt-link to="/terms-of-service" class="bottom-nav"
                >Terms of Service</nuxt-link
              >
            </div>
          </v-col></v-row
        >
      </div>
    </div>
  </v-app>
</template>

<script>
import version from "../versions";
import { mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  data() {
    return {
      tab: null,

      clipped: false,
      drawer: false,
      fixed: false,
      taxType: null,
      links: [
        {
          name: "Basic Information",
          route: "/tax-evaluation/basic-information",
        },
        { name: "Tax Information", route: "/tax-evaluation/tax-information" },

        { name: "Assets", route: "/tax-evaluation/assets" },
        { name: "Income", route: "/tax-evaluation/income" },
        { name: "Expenses", route: "/tax-evaluation/expenses" },
        { name: "Tax Years", route: "/tax-evaluation/tax-years" },
        { name: "Summary", route: "/tax-evaluation/summary" },
        { name: "Forms", route: "/tax-evaluation/forms" },
      ],
      headerMenu: [
        {
          name: "Home",
          to: "/",
        },
        {
          name: "About",
          to: "/about",
        },
        // {
        //   name: "Services",
        //   to: "/services",
        // },
        {
          name: "FAQ",
          to: "/faqs",
        },
        // {
        //   name: "Location",
        //   subHeadings: [
        //     { name: "Nevada", to: "/nevada" },
        //     { name: "Nevada", to: "/nevada" },
        //     { name: "Nevada", to: "/nevada" },
        //     { name: "Nevada", to: "/nevada" },
        //     { name: "Nevada", to: "/nevada" },
        //   ],
        // },
        // {
        //   name: "Blogs",
        //   to: "#blogs",
        // },
      ],
      locations: [
        { title: "Nevada", to: "/nevada" },
        { title: "California", to: "/nevada" },
        { title: "Texas", to: "/nevada" },
        { title: "Mississippi", to: "/nevada" },
        { title: "Utah", to: "/nevada" },
        { title: "Other", to: "/nevada" },
      ],
      partners: [
        { title: "Hurdles to Heights Academy ", to: "#" },

        { title: "Vegas Tiny Homes", to: "https://vegastinyhomes.com/" },
        { title: "Jazy Consults", to: "https://www.jazyconsults.org/" },
      ],
      miniVariant: false,
    };
  },
  computed: {
    AppVersion() {
      return version;
    },
  },
  mounted() {
    if (this.$route.path === "/tax-evaluation/basic-information") {
      this.tab = 0;
    } else if (this.$route.path === "/tax-evaluation/tax-information") {
      this.tab = 1;
    } else if (this.$route.path === "/tax-evaluation/assets") {
      this.tab = 2;
    } else if (this.$route.path === "/tax-evaluation/income") {
      this.tab = 3;
    } else if (this.$route.path === "/tax-evaluation/expenses") {
      this.tab = 4;
    } else if (this.$route.path === "/tax-evaluation/tax-years") {
      this.tab = 5;
    } else if (this.$route.path === "/tax-evaluation/summary") {
      this.tab = 6;
    } else if (this.$route.path === "/tax-evaluation/forms") {
      this.tab = 7;
    }

    if (this.$route.path.includes("tax-evaluation")) {
      this.getTaxInfoById();

      if (localStorage?.getItem("taxType")?.includes("Business")) {
        this.links.splice(2, 0, {
          name: "Business Information",
          route: "/tax-evaluation/business-information",
        });
      }
      console.log("running 1");
      if (
        !localStorage.getItem("userId") &&
        !localStorage.getItem("email") &&
        !localStorage.getItem("requestNumber")
      ) {
        console.log("running");
        if (
          this.$route.path === "/tax-evaluation/forms" ||
          this.$route.path === "/tax-evaluation/basic-information" ||
          this.$route.path === "/tax-evaluation/summary"
        ) {
        } else this.$router.push("/terms");
      }
    }
  },
  updated() {
    if (this.$route.path.includes("tax-evaluation")) {
      this.getTaxInfoById();

      if (
        !localStorage.getItem("userId") &&
        !localStorage.getItem("email") &&
        !localStorage.getItem("requestNumber")
      ) {
        if (
          this.$route.path === "/tax-evaluation/forms" ||
          this.$route.path === "/tax-evaluation/basic-information" ||
          this.$route.path === "/tax-evaluation/summary"
        ) {
        } else this.$router.push("/terms");
      }
    }
  },
  methods: {
    isLoggedIn() {
      console.log("func working");
      if (this.$auth.user) {
        return false;
      } else return true;
    },
    async userLogout() {
      await this.$auth.logout().then(() => {
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-email");

        localStorage.removeItem("user");

        this.$router.push("/login");
      });
    },
    async getTaxInfoById() {
      const payload = { userId: localStorage.getItem("userId") };
      try {
        const res = await this.$api.premierService.getTaxInfoById(payload);
        if (res?.data) {
          localStorage.setItem("taxType", res?.data?.taxType?.name || "");
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleNavigate() {
      console.log("func running");
      if (
        localStorage.getItem("userId") &&
        localStorage.getItem("requestNumber")
      ) {
        console.log("func running 2");

        if (
          this.$route.path === "/tax-evaluation/basic-information" ||
          this.$route.path === "/tax-evaluation/tax-information" ||
          this.$route.path === "/tax-evaluation/assets" ||
          this.$route.path === "/tax-evaluation/income" ||
          this.$route.path === "/tax-evaluation/expenses" ||
          this.$route.path === "/tax-evaluation/tax-years" ||
          this.$route.path === "/tax-evaluation/summary" ||
          this.$route.path === "/tax-evaluation/forms"
        ) {
          this.$swal
            .fire({
              title: "Are you sure?",
              text: "You want to quit the form?",
              icon: "info",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                localStorage.clear();
                // Reset the expressData
                this.$store.commit("resetExpressData");
                // take to find care page
                this.$router.push("/terms");
              } else {
                return;
              }
            });
        } else this.$router.push("/terms");
      } else this.$router.push("/terms");
    },
  },
};
</script>

<style lang="scss">
.phone {
  color: white !important;
  text-decoration: none;
  &:hover {
    color: #ffb300 !important;
  }
}
.subscribe-top {
  .subscribe-section {
    background: #19313f;
    .news {
      color: #ffb300;
      font-size: 32px;
    }
  }
  .subscribe-section-2 {
    background: #ffb400;
    .sub-heading {
      margin-bottom: 5px;
      font-size: 22px;
    }
  }
  @media (min-width: 1330px) {
    position: absolute;
    top: -140px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.bottom-title {
  font-family: Ubuntu !important;
  font-size: 60px;
  font-weight: bold;
}
.bottom-heading {
  font-weight: bold;
  font-size: 20px;
}
.bottom-nav {
  font-size: 17px;
  text-decoration: none;
  color: white !important;
  &:hover {
    color: #ffb300 !important;
    cursor: pointer;
  }
}

.header-image {
  flex-grow: 1;
}

.arrow {
  background-color: white;
  padding: 2px;
  border-radius: 50%;
}

.h-full {
  height: 100% !important;
}

.w-full {
  width: 100% !important;
}

.pointer {
  cursor: pointer;
}
.footer-main {
  background-color: #0b1b23 !important;
  display: flex;
  justify-content: center !important;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1264px) {
    width: 1230px;
  }
  .app-bar-icon {
    display: none;
  }

  .header-nav-items {
    display: flex;
    flex-grow: 3;
    font-size: 16px;
    gap: 30px;
    color: black;

    .active-button {
      color: white !important;
      font-weight: 500;

      border-radius: 40px 0px 0px 0px;
      padding-bottom: 10px;
    }

    .nav-button {
      cursor: pointer;
      font-size: 17px;
      color: rgb(216, 214, 214);

      &:hover {
        color: white;
        font-weight: 500;
        font-size: 17px;

        border-radius: 40px 0px 0px 0px;
      }
    }
  }
}

@media (min-width: 900px) and (max-width: 1264px) {
  .header-container {
    width: 850px;
  }
  .footer-top-right {
    .email-field {
      width: 400px !important;
    }
  }
}

@media (max-width: 753px) {
  .header-container {
    /* Change justify-content to flex-start for left alignment */
    padding: 0 20px;
    gap: 60px;

    .header-nav-items {
      display: none;
    }

    .app-bar-icon {
      display: block;
    }
  }
  .footer-top-right {
    .email-field {
      width: 330px !important;
    }
  }
}

@media (max-width: 753px) {
  .header-container {
    /* Change justify-content to flex-start for left alignment */
    justify-content: center;
    padding: 0 5px;
    gap: 5px;
  }
}

p {
  font-size: 15px !important;
}

.footer-main {
  margin-top: 100px;
}
.email-field {
  background: white;
  color: black;
  padding: 15px 20px;
  border-radius: 5px;
  width: 100%;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .footer-top-left {
    font-family: Ubuntu !important;
    font-size: 70px;
    font-weight: bold;
  }

  .footer-top-right {
    display: flex;
    align-items: center;
    gap: 15px;

    .email-field {
      background: white;
      color: black;
      padding: 15px 20px;
      width: 550px;
      border-radius: 5px;
    }

    .subscribe-button {
      padding: 15px 23px;
      font-size: 18px;
      background: #609a9a;
      color: white;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        background: #609a9a;
      }
    }
  }
}

.footer-second-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;

  .footer-image {
    width: 60%;
  }

  .footer-nav-items {
    display: flex;
    gap: 20px;
    padding-top: 20px;

    .active-button {
      color: #df232f;
      font-weight: 500;
    }

    .nav-button {
      cursor: pointer;

      &:hover {
        color: #df232f;
        font-weight: 500;
      }
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;

  .footer-icons {
    display: flex;
    gap: 15px;
    align-items: center;
    .footer-icon {
      background: #ffb300;
      padding: 4px;
      border-radius: 50%;
      align-self: center;
      &:hover {
        background: #fdb100;
      }
    }
  }
}

@media (max-width: 1200px) {
  .footer-main {
    margin-top: 250;
  }
}

@media (max-width: 619px) {
  .footer-top {
    flex-direction: column;

    .footer-top-left {
      padding-bottom: 10px;
    }

    .footer-top-right {
      .email-field {
        width: 230px !important;
      }
    }
  }
  .bottom-title {
    font-size: 40px;
  }

  .footer-second-container {
    flex-direction: column;
    justify-content: center;

    .footer-image {
      width: 100%;
      text-align: center;
    }

    .footer-nav-items {
      justify-content: center;
    }
  }

  .footer-bottom {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .footer-icons {
      margin-top: 20px;
    }
  }

  .footer-main {
    margin-top: 280px;
  }
}
.menu-list {
  color: white;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #ffb300;
    border-radius: 5px;
  }
}
</style>

<style scoped>
.layout {
  display: flex;
  gap: 20px;
}

.sidebar {
  background-color: #003a3a;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.sidebar .links {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sidebar .link {
  margin-bottom: 15px;
  transition: background-color 0.3s, transform 0.2s;
  border-radius: 4px;
}

.sidebar a {
  text-decoration: none;
  color: #f8f9fa;
  display: block;
  padding: 10px;
  border-radius: 4px;
}

.sidebar a:hover,
.sidebar .link.active-route a {
  background-color: #ffb300;
  border-radius: 4px;
}

.sidebar .link.active-route {
  background-color: #ffb300;
  color: white;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
