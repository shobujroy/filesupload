<template>
  <v-container fluid>
    <div class="d-flex flex-wrap align-center justify-space-between">
      <h1>Dashboard</h1>
      <!-- <UtilsDateFilter @date="getDateFromFilter" /> -->
    </div>

    <div class="d-flex flex-row my-5 flex-wrap align-center">
      <div v-for="(details, index) in stats" :key="index">
        <v-card
          v-if="!dataLoading"
          class="ma-2"
          color="white"
          flat
          height="100"
          width="300"
          @click="$router.push(details.route)"
        >
          <v-card-text>
            <span class="font-weight-bold">{{ details.name }}</span>
            <h1 class="py-2 display-2 font-weight-bold">
              {{ details.value }}
            </h1>
          </v-card-text>
          <div
            :style="{
              backgroundColor: getButtonColor(details.name),
              height: '10px',
              width: '100%',
              marginTop: '-20px',
            }"
          ></div>
        </v-card>

        <v-skeleton-loader
          v-else
          class="ma-2"
          width="300"
          height="100"
          type="card"
        ></v-skeleton-loader>
      </div>
    </div>

    <!-- <v-row v-if="showCharts">
      <v-col cols="12" md="6" lg="6" xl="6">
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="chartSeries"
          height="300px"
          class="white rounded-lg pa-1"
          style="text-align: center"
        />
      </v-col>

      <v-col cols="12" md="6" lg="6" xl="6">
        <apexchart
          type="donut"
          :options="chartOptionsDonut"
          :series="chartSeriesDonut"
          height="300px"
          class="white rounded-lg pa-1"
        />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import apexchart from "../../plugins/apexcharts";
export default {
  name: "IndexPage",
  layout: "dashboard",
  data() {
    return {
      showCharts: false,
      chartOptions: {
        chart: {
          type: "bar",
        },
        xaxis: {
          categories: ["Total Forms", "Completed Forms", "Incomplete Forms"],
        },
      },

      chartSeries: [
        {
          name: "Series 1",
          data: [0, 0, 0],
        },
      ],
      chartOptionsDonut: {
        chart: {
          type: "donut",
        },
        labels: ["Total Forms", "Completed Forms", "Incomplete Forms"],
      },
      chartSeriesDonut: [0, 0, 0],
      dataLoading: false,
      dashboardCountParams: null,
      options: {
        start: "",
        end: "",
      },
      stats: [
        {
          name: "Total Forms",
          value: 0,
          route: "",
        },
        {
          name: "Completed Forms",
          value: 0,
          route: "",
        },
        {
          name: "Incomplete Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Assistance Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Funding Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Referral Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Partnership Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Liaison Call Forms",
          value: 0,
          route: "",
        },
        {
          name: "Total Clients Forms",
          value: 0,
          route: "",
        },
      ],
    };
  },
  mounted() {
    this.getDashboardCount();

    // Show Charts after 1 second because of the loading time it breaks layout.
    setTimeout(() => {
      this.showCharts = true;
    }, 1500);
  },
  computed: {},
  methods: {
    clearValues() {
      this.stats.forEach((row) => (row.value = 0));
    },
    getButtonColor(name) {
      switch (name) {
        case "Total Forms":
          return "#59B8EA";
        case "Completed Forms":
          return "#B9E14B";
        case "Incomplete Forms":
          return "red";
        case "Total Assistance Forms":
          return "#FFB300";
        case "Total Funding Forms":
          return "purple";
        case "Total Referral Forms":
          return "violet";
        case "Total Partnership Forms":
          return "yellow";
        case "Total Liaison Call Forms":
          return "magenta";
        case "Total Clients Forms":
          return "pink";
        default:
          return "green";
      }
    },
    getDashboardCount() {
      this.dataLoading = true;
      this.$store.dispatch("initLoader", true);

      this.clearValues();

      if (this.dashboardCountParams) {
        this.dashboardCountParams.from_date = this.$moment(
          this.dashboardCountParams?.from_date
        ).format("YYYY-MM-DD");

        this.dashboardCountParams.to_date = this.$moment(
          this.dashboardCountParams?.to_date
        ).format("YYYY-MM-DD");
      }
      this.$api.premierService
        .getDashboardCount(this.dashboardCountParams)
        .then((response) => {
          this.stats[8].value = response?.serviceRequest?.toFixed();
          this.stats[7].value = response?.liaisonCallForms?.toFixed();

          this.stats[6].value = response?.totalPartnerships?.toFixed();
          this.stats[5].value = response?.totalReferrals?.toFixed();
          this.stats[4].value = response?.totalFunding?.toFixed();
          this.stats[3].value = response?.totalAssistance?.toFixed();

          this.stats[2].value = response?.pendingForms?.toFixed();
          this.stats[1].value = response?.completedForms?.toFixed();
          this.stats[0].value = response?.totalForms?.toFixed();

          this.chartSeriesDonut[2] = this.stats[2].value =
            response?.pendingForms?.toFixed() * 1;
          this.chartSeriesDonut[1] = response?.completedForms?.toFixed() * 1;
          this.chartSeriesDonut[0] = response?.totalForms?.toFixed() * 1;
          this.$set(
            this.chartSeries[0].data,
            0,
            response?.totalForms?.toFixed() * 1
          );
          this.$set(
            this.chartSeries[0].data,
            1,
            response?.completedForms?.toFixed() * 1
          );
          this.$set(
            this.chartSeries[0].data,
            2,
            (this.stats[2].value = response?.pendingForms?.toFixed() * 1)
          );
          this.$forceUpdate();
        })
        .finally(() => {
          this.dataLoading = false;
          this.$store.dispatch("initLoader", false);
        });
    },
    getDateFromFilter(val) {
      if (val) {
        this.dashboardCountParams = {
          from_date: val?.start,
          to_date: val?.end,
        };
      } else this.dashboardCountParams = null;
      this.getDashboardData();
    },
  },
};
</script>

<style scoped>
.card-width {
  width: 300px;
}

.chart-width {
  width: 650px;
}
.charts-row {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  flex-direction: column;
}

.chart-column {
  background-color: white;
  padding: 50px;
}

/* Media Queries for Responsive Design */

/* Small screens (phones) */
@media only screen and (max-width: 500px) {
  .card-width {
    width: 400px; /* Set width to 100% on small screens */
  }
  .chart-width {
    width: 370px;
  }
}

/* Medium screens (tablets) */
@media only screen and (min-width: 501px) and (max-width: 700px) {
  .card-width {
    width: 450px; /* Set width to 100% on medium screens */
  }
  .chart-width {
    width: 420px;
  }
}
@media only screen and (min-width: 701px) and (max-width: 992px) {
  .card-width {
    width: 270px; /* Set width to 100% on medium screens */
  }
  .chart-width {
    width: 480px;
  }
}

@media only screen and (min-width: 993px) and (max-width: 1100px) {
  .card-width {
    width: 300px; /* Set width to 100% on medium screens */
  }
  .chart-width {
    width: 370px;
  }
  .charts-row {
    flex-direction: row;
  }
}
@media only screen and (min-width: 1101px) and (max-width: 1300px) {
  .chart-width {
    width: 440px;
  }
  .charts-row {
    flex-direction: row;
  }
}

@media only screen and (min-width: 1301px) {
  .charts-row {
    flex-direction: row;
  }
}
</style>
