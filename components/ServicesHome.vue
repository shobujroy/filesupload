<template>
  <div class="main-container py-8" id="service">
    <div class="mid-container">
      <div class="text-center pa-10 mb-4">
        <h3 style="color: #094040" class="mb-6">Our Services</h3>
        <!-- <h1 style="font-size: 40px" class="mb-4">No Pressure, Just Relief.</h1> -->
        <p style="color: grey">
          Dealing with tax debt can feel overwhelming and confusing, especially
          with the threat of severe collection actions like wage garnishments,
          bank levies, or tax liens. Many taxpayers avoid taking care of their
          debt due to the complexities involved and ultimately find themselves
          facing the harsh realities of these collection actions. At Premier Tax
          Debt Solutions, we’ve developed the
          <br />
          <span style="color: #f0a904" class="main-heading">
            Tax Relief Pathway™
          </span>
        </p>
        <p style="color: grey">
          a system designed to alleviate that stress and provide a streamlined,
          taxpayer-friendly approach.
        </p>
      </div>
      <v-row justify="space-between"
        ><v-col
          cols="12"
          md="6"
          v-for="service in services"
          :key="service.name"
          class="mb-8"
          ><v-card
            class="pa-8 pt-10"
            style="position: relative; min-height: 290px; cursor: pointer"
          >
            <v-icon
              style="
                position: absolute;
                background-color: #f0a904;
                padding: 12px;
                top: -25px;
              "
              color="white"
              x-large
              >{{ service?.icon }}</v-icon
            >
            <h2 class="my-4">{{ service?.name }}</h2>
            <p v-html="service.description"></p></v-card></v-col
      ></v-row>
      <p style="color: grey" class="text-center">
        We make it easy for you to take control of your tax debt without the
        hassle of dealing with expensive tax attorneys or overwhelming
        paperwork. Our innovative, streamlined process ensures that you receive
        expert assistance, affordable solutions, and the clarity you need to
        move forward. <br />
        <br />
        Call us today at 1-833-4-TAX-211 and let’s get started on your path to
        financial relief
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          name: "Tax Form Navigator",
          description:
            "Find out if you qualify for IRS Fresh Start programs and receive your completed forms quickly and accurately—all for a fraction of the cost of hiring a tax attorney.",
          icon: "mdi-list-box",
        },
        {
          name: "IRS Liaison Call",
          description:
            "Let us assist you in connecting with the IRS to get answers to your most pressing questions, in regards to your tax debt.",
          icon: "mdi-list-box",
        },
        {
          name: "SecureTax Send-Off",
          description:
            "Submitting your tax forms doesn’t have to be a drawn-out process. Our SecureTax SendOff service ensures your documents are efficiently processed and securely sent to the IRS. Unlike traditional methods that take months, our processing department provides confirmation within 5 to 7 days, and you’ll receive official IRS confirmation by mail in a minimum of 30 days. Simplify the process and take control with fast, reliable submission.",
          icon: "mdi-list-box",
        },
        {
          name: "Fresh Start Navigator",
          description:
            "Fresh Start Resolution Navigator is your hassle-free solution for resolving tax issues through the IRS Fresh Start program.",
          icon: "mdi-list-box",
        },
      ],
    };
  },
};
</script>
