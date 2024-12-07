<template>
  <div class="main-container py-8" id="blogs">
    <div class="mid-container">
      <div class="text-center pa-10 mb-4">
        <h3 style="color: #094040" class="mb-6">OUR BLOGS</h3>
        <h1 style="font-size: 40px" class="mb-4">Latest Blogs</h1>
        <p style="color: grey">
          <br v-if="!$vuetify.breakpoint.mobile" />
        </p>
      </div>
      <v-row justify="space-between">
        <v-col
          v-for="(blog, index) in blogs"
          :key="index"
          cols="12"
          md="4"
          sm="6"
          @click="$router.push(blog.link)"
          style="cursor: pointer"
        >
          <v-card :loading="loading" max-width="440">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img :src="blog.img" height="250"></v-img>

            <v-card-title style="color: #ffb300">{{ blog.title }}</v-card-title>

            <v-card-text>
              <div>{{ blog.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <div style="color: grey; font-size: 13px" class="pa-4">
              <span class="mr-4">{{ blog.created_at }}</span>
              <!-- <span>No Comments.</span> -->
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      blogs: [
        {
          title: "Maximizing Your Tax Savings",
          link: "/blogs/maximizing-your-tax-savings",
          description:
            "Discover strategies and tips to optimize your tax savings and minimize liabilities, ensuring you keep more of your hard-earned money.",
          created_at: "March 06, 2024",
          img: "blog1.jpg",
        },
        {
          title: "Tax Planning For Freelancers",
          link: "/blogs/tax-planning-for-freelancers",
          description:
            "Learn essential tax planning tips for freelancers, including deductions, quarterly taxes, and strategies to manage your finances effectively.",
          created_at: "March 06, 2024",
          img: "tax-planning-for-freelancers.jpg",
        },
        {
          title: "How To Survive An IRS Audit",
          link: "/blogs/how-to-survive-an-irs-audit",
          description:
            "Get prepared for an IRS audit with practical advice on documentation, communication, and understanding your rights during the process.",
          created_at: "March 06, 2024",
          img: "blog3.jpg",
        },
        {
          title:
            "The IRS Fresh Start Initiative Program: Your Path to Tax Relief",
          link: "/blogs/the-irs-fresh-start-initiative-program",
          description:
            "If you’re struggling with tax debt, the IRS Fresh Start Initiative Program could be your solution.",
          created_at: "March 10, 2024",
          img: "the-irs-fresh.jpg",
        },
        {
          title: "Business Independence with Your Expendable Income",
          link: "/blogs/business-independence-with-your-expendable-income",
          description:
            "Discover how resolving tax liabilities can unlock expendable income and empower you to invest in business growth and financial independence.",
          created_at: "November 10, 2024",
          img: "business-independence.jpg",
        },
        {
          title: "Unlocking the Power of Expendable Income",
          link: "/blogs/unlocking-the-power-of-expendable-income",
          description:
            "Learn how to turn freed-up income from tax settlements into valuable investments like land and tiny homes for a secure financial future.",
          created_at: "November 18, 2024",
          img: "expendable-income.jpg",
        },
        {
          title:
            "How to Properly File Your Business Dissolution Paperwork with the IRS",
          link: "/blogs/how-to-properly-file-your-business-dissolution-paperwork",
          description:
            "Closing a business? Learn the steps to dissolve your business, cancel your EIN, and ensure compliance with IRS requirements for a smooth transition.",
          created_at: "November 29, 2024",
          img: "business-dissolution-paperwork.jpg",
        },
      ],
    };
  },
};
</script>
