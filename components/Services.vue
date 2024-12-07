<template>
  <div class="main-container py-8" id="service">
    <div class="mid-container">
      <div class="text-center pa-10 mb-4">
        <h3 style="color: #094040" class="mb-6">Our Services</h3>
        <h1 style="font-size: 40px" class="mb-4">No Pressure, Just Relief.</h1>
        <p style="color: grey">
          At Premier Tax Debt Solutions, we’re not a traditional tax firm—we’re
          a solutions service provider focused on simplifying the tax resolution
          process, specifically for the Fresh Start program and resolution
          forms. Our innovative strategy allows us to offer more affordable
          pricing by streamlining what others complicate. Instead of lengthy
          processes and high costs, we focus on delivering fast and effective
          solutions, providing a more efficient alternative to help you get back
          on track without unnecessary expenses or delays.
        </p>
      </div>
      <v-row justify="space-between"
        ><v-col
          cols="12"
          md="4"
          v-for="service in services"
          :key="service.name"
          class="mb-8"
          ><v-card
            class="pa-8 pt-10"
            style="position: relative; min-height: 530px"
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
            "IRS forms can be overwhelming and time-consuming, especially when trying to qualify for the Fresh Start program. Our Tax Form Navigator simplifies this process by asking the right questions according to IRS standards. The navigator determines eligibility based on the information you provide, allowing you to complete the required forms accurately, quickly, and without the hefty price tag charged by other companies. Once completed, your documents are immediately available for download or can be emailed directly to you. Additionally, you have the option to use our SecureTax Send-Off service to have your documents securely processed with confirmation. We’re here to help you get it done right the first time, so you can move forward with peace of mind.",
          icon: "mdi-list-box",
        },
        {
          name: "SecureTax Send-Off",
          description:
            "Submitting your completed tax forms shouldn’t be a headache. With SecureTax Send-Off, we’ve developed an innovative approach to make the process as simple and smooth as possible. We ensure your documents are sent securely and quickly to the IRS. While most forms can be sent for fast submission, Offer in Compromise submissions must be mailed by you directly. After submission, you’ll receive confirmation directly from the IRS, with confirmation arriving via mail within a minimum of 30 days. This service is ideal if you’ve used our Tax Form Navigator and want to ensure your documents are properly submitted. Our service brings peace of mind, allowing you to focus on what’s next while we simplify the submission process for you.",
          icon: "mdi-list-box",
        },
        // {
        //   name: "IRS Liaison Quick Inquiry Call",
        //   description:
        //     "Need to speak with the IRS but dreading the long wait times? Our IRS Liaison Quick Inquiry Call makes the process easier and faster. Using our practitioner line, we typically connect with the IRS in under 15 minutes to address your needs. Whether you have general questions, need assistance with filing updates, or want to check on your refund status, we’re here to help. This service is perfect for getting straightforward answers to general questions while you’re on the line, saving you time and frustration.",
        //   icon: "mdi-list-box",
        // },
        {
          name: "IRS Liaison Debt Insight Call",
          description:
            "This three-way Debt Insight Call dives deeper into your tax debt and liabilities, helping you understand where the debt is coming from and why. We gather detailed information on your account, assess your tax liability. Unlike other companies that pressure you into costly service plans, we offer this service with no strings attached—get the information you need, and you’re free to decide what’s next. Let us handle the hassle so you can focus on what matters most.",
          icon: "mdi-list-box",
        },
        // {
        //   name: "Tax 211 Helpline",
        //   description:
        //     "Have general tax questions or need guidance on IRS processes? The Tax 211 Helpline is here for you. We provide clear, honest answers and support, cutting through the confusion that other companies might leave you with. If you need more targeted help, this service pairs well with our IRS Liaison Call to get direct answers from the IRS or our Tax Form Navigator if you’re ready to complete and submit your forms. We don’t just offer answers; we offer understanding and a path forward—all without the pressure of being locked into any contracts. You can reach out, get the help you need, and walk away with no strings attached.",
        //   icon: "mdi-list-box",
        // },
        {
          name: "Trust Formation Assistance",
          description:
            "Planning to protect your assets or prepare for the future? Our Trust Formation Assistance service provides you with the guidance needed to set up revocable or irrevocable trusts. Through our partnership with a trusted business attorney, we help you navigate the complexities of trust formation, ensuring your assets are secure and aligned with your longterm goals. If you have questions about your trust that require specific IRS information, consider combining this service with our IRS Liaison Call for additional support. We’re here to answer general questions within the scope of regulations and help you take the next step in securing your financial future.",
          icon: "mdi-list-box",
        },
        {
          name: "Professional Partner Referral",
          description:
            "Sometimes your tax situation requires specialized help. If your needs go beyond our core services, we’ll connect you with our trusted network of tax professionals. With a simple verbal authorization, we can either transfer the call while you’re on the line or have the professional reach out to you directly. If you’ve already used our IRS Liaison Call or Tax 211 Helpline, this service is an excellent next step if additional expertise is needed. Your satisfaction is our priority, and we’re committed to helping you find the right solution, without any hidden agendas.",
          icon: "mdi-list-box",
        },
        {
          name: "Fresh Start Navigator",
          description:
            "The Fresh Start Resolution Navigator helps resolve tax matters such as penalty abatements, payment plans, installment agreements, Currently Not Collectible (CNC) status, and collection holds under the IRS Fresh Start program. Using our Tax Navigator, we ensure you're qualified and provide fast, affordable solutions without the high cost of tax attorneys. We offer over-thephone support or independent representation via Form 2848, making the process simple and efficient.",
          icon: "mdi-list-box",
        },
      ],
    };
  },
};
</script>
