<template>
  <div>
    <div class="main-container" style="background-color: #2c7671; min-height: 65vh"
      :style="!$vuetify.breakpoint.mobile && { marginTop: '-79px' }">
      <div class="mid-container">
        <v-row style="color: white; margin-bottom: -47px"><v-col cols="12" md="6" class="pa-4" align-self="center"
            :class="$vuetify.breakpoint.sm && 'text-center'">
            <div class="pt-6" :style="
                $vuetify.breakpoint.sm ? 'font-size: 25px' : 'font-size: 32px'
              ">
              Best Ways to
            </div>
            <h1 class="pb-6" :style="
                $vuetify.breakpoint.sm ? 'font-size: 25px' : 'font-size: 60px'
              ">
              <span style="color: #f0a904"> Resolve </span> <br />
              your Tax Debt.
            </h1>
          </v-col>
          <!-- <v-col cols="12" md="6" align="center"
            ><img
              src="/doc.png"
              alt=""
              width="100%"
              style="margin-left: -15px" /></v-col
            > -->
        </v-row>
        <v-row justify="space-between">
          <v-col v-for="(blog, index) in strategies" :key="index" cols="12" md="4" sm="6">
            <v-card :loading="loading" max-width="440" class="text-center white--text"
              style="background-color: #ffb300">
              <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
              </template>

              <v-card-title class="justify-center">{{
                blog.title
                }}</v-card-title>
              <v-divider class="mx-4"></v-divider>
              <v-card-title class="justify-center">{{
                blog.titleTwo
                }}</v-card-title>
              <v-card-text class="white--text">
                <div>{{ blog.description }}</div>
              </v-card-text>

              <!-- <div style="color: grey; font-size: 13px" class="pa-4">
                <span class="mr-4">{{ blog.created_at }}</span>
                <span>No Comments.</span>
              </div> -->
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center white--text pa-10 mb-4">
          <h1 style="font-size: 40px" class="mb-4">
            Check your Fresh Start Eligibility
          </h1>
          <p>
            Use Our Tax Form Navigator to quickly prepare your forms and find
            the best strategy for you.
          </p>
        </div>
        <div style="display: flex" class="justify-center">
          <div style="width: 200px">
            <button class="appointment-button mb-4 text-center" @click="$router.push('/terms')">
              Tax Form Navigator
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      strategies: [
        {
          title: "Strategy 1",
          titleTwo: "Payment Plan.",
          description: "Affordable, income-based solution.",
          created_at: "March 06, 2024",
          img: "blog1.jpg",
        },
        {
          title: "Strategy 2",
          titleTwo: "Hardship Relief.",
          description: "Protect your finances during tough times.",
          created_at: "March 06, 2024",
          img: "blog2.jpg",
        },
        {
          title: "Strategy 3",
          titleTwo: "Tax Settlement.",
          description: "Settle for less with IRS-approved options.",
          created_at: "March 06, 2024",
          img: "blog3.jpg",
        },
      ],
    };
  },
};
</script>
