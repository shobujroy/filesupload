<template>
  <v-container fluid>
    <div class="d-flex flex-wrap align-center justify-space-between mb-8">
      <h1>Dashboard</h1>
    </div>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        v-for="service in services"
        :key="service.name"
        class="mb-8"
      >
      <v-card
  :class="['pa-8', 'pt-10', service.name === 'Tax Relief Pathway™️' ? 'special-service' : '']"
  style="position: relative"
  :style="service.isExpanded ? { minHeight: '585px' } : { minHeight: '220px' }"
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
            >{{ service.icon }}</v-icon
          >
          <h2 class="my-4">{{ service.name }}</h2>

          <!-- Conditionally display the description -->
          <p
            v-html="
              service.isExpanded
                ? service.description
                : getTruncatedDescription(service.description)
            "
            :class="{ 'truncated-text': !service.isExpanded }"
            :style="
              service.isExpanded
                ? { minHeight: '375px' }
                : { minHeight: '70px' }
            "
          ></p>

          <!-- Learn More button toggles visibility of description -->
          <span
            style="cursor: pointer"
            @click="toggleServiceDescription(service)"
            v-if="!service.isExpanded"
          >
            Learn More
          </span>

          <!-- View Form button appears below description when expanded -->
          <v-btn
  :class="service.name === 'Tax Relief Pathway™️' ? 'special-button' : ''"
  style="background-color: #f0a904; color: white; margin-top: 10px"
  @click="handleNavigate(service)"
  v-if="service.isExpanded"
>
  View Form
</v-btn>

        </v-card>
      </v-col>
    </v-row>
      <h2 class="my-2">Fresh Start Initiative Program Details and How We Assist</h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-card style="min-height: 545px"           class="pa-8 pt-10"
>
          <h3>1. Currently Not Collectible (CNC) Status</h3>
          <p>
            <strong>What is CNC Status?</strong><br>
            Currently Not Collectible (CNC) status means the IRS temporarily halts collection actions due to financial hardship. This status can stop garnishments, levies, and other collection efforts while your financial situation improves.
          </p>
          <p>
            <strong>How We Assist You:</strong>
            <ul>
              <li>Tax Form Navigator: Our Tax Form Navigator guides you through qualifying questions to determine if you may be eligible for CNC status. Based on your responses, it generates IRS Form 433-F (Collection Information Statement).</li>
              <li>Form Retrieval and Submission: Once IRS Form 433-F is retrieved through the Tax Form Navigator process, upload it to your client portal. We will help you submit it to the IRS through our SecureTax Send-Off service.</li>
            </ul>
          </p>
          <h4>Tips for Getting Qualified:</h4>
          <ul>
            <li>Accurate Information: Ensure that all financial details are honest and complete to avoid complications with the IRS.</li>
            <li>Keep Documentation Ready: Be prepared to provide documentation of your financial hardship if requested by the IRS.</li>
          </ul></v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card style="min-height: 545px"           class="pa-8 pt-10"
>
          <h3>2. Penalty Abatement</h3>
          <p>
            <strong>What is Penalty Abatement?</strong><br>
            Penalty abatement reduces or eliminates IRS penalties on your tax debt. You may qualify if this is your first penalty or if you have a reasonable cause, such as illness or a natural disaster.
          </p>
          <p>
            <strong>How We Assist You:</strong>
            <ul>
              <li>Tax Form Navigator: IRS Form 843 (Claim for Refund and Request for Abatement) is retrieved through our Tax Form Navigator after answering qualifying questions.</li>
              <li>Additional Questionnaire: A more detailed questionnaire assists in determining your qualification for penalty abatement, ensuring your situation meets IRS standards.</li>
              <li>Form Retrieval and Submission: Once IRS Form 843 is retrieved through the Tax Form Navigator process, upload it to your client portal, and we will assist with submitting it to the IRS through our SecureTax Send-Off service.</li>
            </ul>
          </p>
          <h4>Tips for Getting Qualified:</h4>
          <ul>
            <li>First-Time Penalty: You may automatically qualify if this is your first penalty.</li>
            <li>Provide Documentation for Reasonable Cause: Be ready to submit supporting documents like medical records or proof of disaster if claiming reasonable cause.</li>
          </ul></v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card style="min-height: 520px"           class="pa-8 pt-10"
>
          <h3>3. Installment Agreement (Payment Plans)</h3>
          <p>
            <strong>What is an Installment Agreement?</strong><br>
            An Installment Agreement allows you to pay your tax debt over time through manageable
monthly payments instead of paying a lump sum.

          </p>
          <p>
            <strong>How We Assist You:</strong>
            <ul>
              <li>Tax Form Navigator: IRS Form 9465 (Installment Agreement Request) is retrieved directly
through the Tax Form Navigator after answering qualifying questions.</li>
              <li>Additional Questionnaire: A detailed questionnaire helps assess your eligibility for the
payment plan or installment agreement based on IRS standards.</li>
<li>Form Retrieval and Submission: Once IRS Form 9465 is retrieved through the Tax Form
Navigator process, upload it to your client portal, and we will submit it to the IRS through
SecureTax Send-Off.
</li>
            </ul>
          </p>
          <h4>Tips for Getting Qualified:</h4>
          <ul>
            <li>Select a Manageable Payment Plan: Ensure the payment plan you choose is one you can
maintain consistently to avoid default.</li>
            <li>Opt for Direct Debit: Setting up direct debit can simplify payments and reduce fees.</li>
          </ul></v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card style="min-height: 520px"           class="pa-8 pt-10"
>
          <h3>4. Offer in Compromise (OIC)</h3>
          <p>
            <strong>What is an Offer in Compromise?</strong><br>
            An Offer in Compromise (OIC) allows you to settle your tax debt for less than the full amount owed if paying in full would cause financial hardship.
          </p>
          <p>
            <strong>How We Assist You:</strong>
            <ul>
              <li>Tax Form Navigator: After answering qualifying questions, IRS Form 656 (Offer in Compromise) and IRS Form 433-A (OIC) are generated for you.</li>
              <li>Form Retrieval and Submission: Once these forms are retrieved through the Tax Form Navigator process, you’ll need to mail them directly to the 
              IRS along with any required initial payments.</li>
       
            </ul>
          </p>
          <h4>Tips for Getting Qualified:</h4>
          <ul>
            <li> Submit a Realistic Offer: Low offers may be rejected. Ensure your offer is based on your
ability to pay</li>
            <li>Accurate Financial Information: Provide detailed and accurate financial documents, as the
IRS will review them thoroughly.</li>
          </ul></v-card>
        </v-col>
      </v-row>

      <!-- Additional Sections can be added here following the same pattern -->
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "dashboard",
  data() {
    return {
      services: [
      {
          name: "Tax Form Navigator",
          description:
            "Find out if you qualify for IRS Fresh Start programs and receive your completed forms quickly and accurately—all for a fraction of the cost of hiring a tax attorney.",
          icon: "mdi-list-box",
          isExpanded: false,

        },
        {
          name: "In-depth Liaison Call",
          description:
            "This three-way Debt Insight Call dives deeper into your tax debt and liabilities, helping you understand where the debt is coming from and why. We gather detailed information on your account, assess your tax liability. Unlike other companies that pressure you into costly service plans, we offer this service with no strings attached—get the information you need, and you’re free to decide what’s next. Let us handle the hassle so you can focus on what matters most.",
          icon: "mdi-list-box",
          isExpanded: false,
        },
        {
          name: "SecureTax Send-Off",
          description:
            "Submitting your completed tax forms doesn’t need to be complicated. With SecureTax SendOff, our processing department ensures that your documents are handled efficiently and effectively, streamlining the submission process. We guarantee that your forms are securely sent to the IRS without unnecessary delays, giving you peace of mind. Unlike traditional tax attorney firms, which may take months to process your submissions, our system gets your documents to the IRS quickly, with confirmation from us in as little as 5 to 7 days. After submission, you’ll receive confirmation directly from the IRS via mail within a minimum of 30 days.This service is ideal if you’ve used our Tax Form Navigator and want to ensure your documents are submitted properly. SecureTax SendOff puts control in your hands, offering a fast and secure solution while allowing you to focus on what’s next. We simplify the process so you can avoid the headaches of traditional methods.",
          icon: "mdi-list-box",
          isExpanded: false,
        },
        {
          name: "Fresh Start Navigator",
          description:
            "The Fresh Start Resolution Navigator service is designed to streamline the process of resolving tax issues through the IRS Fresh Start program. Whether you're looking to request via IRS; penalty abatements, establish a payment plan, set up installment agreements, Currently Not Collectible (CNC) status, or secure up-to a 30-day collection hold (if qualified ), we guide you every step of the way. Our service pre qualifies taxpayers based on IRS standards, using our advanced Tax Navigator system to ensure you meet all necessary requirements.",
          icon: "mdi-list-box",
          isExpanded: false,
        },
        {
          name: "Tax Relief Pathway™️",
          description:
            "The Tax Relief Pathway™️ is an all-in-one solution that guides you through the process of resolving your tax debt using the IRS Fresh Start Initiative. This package combines our Tax Navigator, SecureTax Send-Off, and IRS Liaison Service to provide comprehensive support. We help you determine your eligibility for IRS relief programs, assist in completing the required forms, and ensure that your documents reach the IRS quickly and securely. Plus, with our IRS Liaison Service, you can get answers directly from the IRS in just minutes, providing clarity on your tax situation. The Tax Relief Pathway™️ is designed to save you time, reduce stress, and put you on the path to resolving your tax debt—all at an affordable price",
          icon: "mdi-list-box",
          isExpanded: false,
        },
      ],
    };
  },
  methods: {
    handleNavigate(item){
      
      if (item.name==="Tax Form Navigator") {    this.$router.push('/terms')}
 else {    this.$router.push('/user/services/add')}},
    toggleServiceDescription(service) {
      service.isExpanded = !service.isExpanded;
    },
    getTruncatedDescription(description) {
      // Truncate the description to the first 150 characters
      const maxCharacters = 120;
      return description.length > maxCharacters
        ? description.substring(0, maxCharacters) + "..."
        : description;
    },
  },
};
</script>

<style scoped>
.truncated-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Show only 2 lines */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  max-height: 3em; /* Approx height for 2 lines of text */
}
.special-service {
  background-color: #e6f7ff; /* Light blue background */
  border: 2px solid #00796b; /* Accent color border */
  box-shadow: 0px 4px 15px rgba(0, 121, 107, 0.2); /* Subtle shadow */
}

.special-service h2 {
  color: #00796b; /* Accent color for the title */
}

.special-service v-icon {
  background-color: #00796b; /* Distinct icon background */
}
.special-button {
  background-color: #00796b !important;
  color: white !important;
}

</style>
