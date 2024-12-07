<template>
  <div class="main-containter my-8 py-8">
    <h1 class="text-center" v-if="!showEmailInput">          Tax Navigator Overview
</h1>
    <h1 v-else class="text-center">Enter Your Email</h1>
    <div class="terms-main" :style="showEmailInput && {maxWidth:'700px'}">
      <div v-if="!showEmailInput">
     <h3>Premier Tax Debt Solutions – Simplifying Your Fresh Start
Program Journey</h3>
        <p class="terms-text">
          At Premier Tax Debt Solutions, we want to be upfront:<strong> you
are not paying for IRS forms.</strong> These forms are publicly
available and free for anyone to access. What you’re paying
for is the professional service we provide to assist you with
determining potential eligibility for the IRS Fresh Start
Program and for simplifying the complex form population
process with a hassle-free approach.
        </p>

        <p class="terms-text">
          Our <strong> Tax Navigator </strong> service is designed to help you
understand your eligibility for the IRS Fresh Start Program,
which could help reduce your tax liability, including penalties,
interest, and your principal balance. We partially populate the
necessary IRS forms based on the information you provide,
ensuring they align with IRS standards.
        </p>

        <p class="terms-text">
          We aim to make the often confusing and overwhelming
process of completing IRS forms more manageable, guiding
you every step of the way. You also have the option to use our <strong>
SecureTax Send-Off </strong> service to securely submit your forms to
the IRS, giving you peace of mind with an IRS confirmation of
receipt.
        </p>

        <!-- <p class="terms-text">
          Proceed with your preparation by agreeing to terms.

        </p>

        <p class="terms-text">
          If you have any questions, need assistance filing, or prefer to speak with one of our
representatives, please feel free to contact our Tax 211 Helpline at 1833-4-TAX-211
        </p> -->

      

       

        <div class="terms-checkbox">
          <input type="checkbox" v-model="acceptedTerms" id="acceptTerms" />
          <label for="acceptTerms" class="pl-3">
            I agree to the <span @click="dialog=true" style="font-weight:bold; cursor:pointer"> terms and services. </span>
          </label>
        </div>

        <div class="terms-buttons">
          <button class="btn btn-primary" @click="nextPage">Next</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>

      <div v-if="showEmailInput" class="email-section">
        <label for="email">Please enter your email:</label>
        <input
          type="email"
          v-model="email"
          id="email"
          class="form-control-2 email-input"
          placeholder="Enter your email"
        />
        <div style="display: flex; justify-content: center">
          <button
            class="btn btn-primary"
            @click="submitEmail"
            :disabled="loading"
            style="display: flex; gap: 10px; align-items: center"
          >
            <div>Next</div>
            <v-progress-circular
              indeterminate
              color="white"
              :size="16"
              v-if="loading"
            ></v-progress-circular>
          </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
    <!-- <v-dialog v-model="dialog" width="auto"  @open="scrollToTop">
      <v-card max-width="1300">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>          Premier Tax Debt Solutions Service Agreement
</span>
        </v-card-title>
        <v-card-text ref="dialogContent">
      
        <p class="terms-text">
          <strong>1. Scope of Services</strong><br>
          Premier Tax Debt Solutions provides administrative assistance and informational support for tax-related matters. Our services include:
          <ul>
            <li>Tax Form Navigator: Assisting with completing IRS forms based on the information you provide.</li>
            <li>IRS Liaison Call: Facilitating three-way calls to gather information or resolve issues with the IRS.</li>
            <li>SecureTax Send-Off: Sending completed forms securely to the IRS with confirmation.</li>
            <li>Tax 211 Helpline: Providing general guidance and information on tax debt-related issues, helping you navigate IRS processes and available programs.</li>
            <li>Professional Partner Referral: Referring you to trusted tax professionals for specialized help if needed (with your consent).</li>
          </ul>
        </p>

        <p class="terms-text">
          <strong>2. Limited Role</strong><br>
          Premier Tax Debt Solutions is not a tax attorney office, tax preparation service, or legal advisory firm. We do not provide tax preparation, legal advice, or direct representation before the IRS. Our services are designed solely to assist you in completing forms and gathering information.
        </p>

        <p class="terms-text">
          <strong>3. Client Responsibility</strong><br>
          You are responsible for the accuracy and completeness of all information provided. The final review and submission of forms are your responsibility, and you should verify all information before submission.
        </p>

        <p class="terms-text">
          <strong>4. No Guarantees of Program Approval</strong><br>
          Our Tax Navigator tool helps determine your eligibility based on IRS guidelines, but it does not guarantee approval for any IRS programs. The IRS makes the final decision on all applications.
        </p>

        <p class="terms-text">
          <strong>5. Confidentiality and Privacy</strong><br>
          Your information is securely handled and only used to provide the services you request. We do not share your data with third parties unless necessary to complete your requested service.
        </p>

        <p class="terms-text">
          <strong>6. Payment and Fees</strong><br>
          You agree to pay all fees associated with the services selected. Payments must be completed prior to service delivery.
        </p>

        <p class="terms-text">
          <strong>7. Referrals to Third-Party Providers</strong><br>
          If your needs require specialized help beyond our scope, we may refer you to a trusted third-party provider. We will always obtain your verbal agreement before making any referrals, and you can choose whether to be connected to the provider directly.
        </p>

        <p class="terms-text">
          <strong>8. Acknowledgment and Agreement</strong><br>
          By proceeding, you acknowledge that you have read, understood, and agree to the terms outlined in this service agreement. You agree that Premier Tax Debt Solutions’ role is limited to administrative assistance, and you accept responsibility for the accuracy of your filings and any decisions made based on our services.
        </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog = false"
            style="background-color: orange; color: white"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog> -->
 
    <v-dialog v-model="dialog" width="auto" @open="scrollToTop">
  <v-card max-width="1300">
    <v-card-title>
      <v-icon class="me-2">mdi-information</v-icon>
      <span>Premier Tax Debt Solutions - Terms and Agreement for Tax Navigator Service</span>
    </v-card-title>
    <v-card-text ref="dialogContent">
      <p class="terms-text">
        <strong>1. Agreement to Terms</strong>
        <br/>
        By using the Tax Navigator Service provided by Premier Tax Debt Solutions, you agree to the following terms and conditions. Please read them carefully before proceeding with the service.
      </p>
      <p class="terms-text">
        <strong>2. Service Overview</strong>
        <br/>
        The Tax Navigator Service is designed to assist clients with determining potential eligibility for various IRS Fresh Start programs, including:
        <ul>
          <li>Installment Agreements</li>
          <li>Payment Plans</li>
          <li>Penalty Abatement</li>
          <li>Offer in Compromise</li>
          <li>Currently Not Collectible Status</li>
        </ul>
        This service provides general guidance based on the information you provide and will generate the necessary forms for you to submit to the IRS. Premier Tax Debt Solutions is not responsible for the approval or rejection of these forms by the IRS, nor does this service guarantee IRS approval.
      </p>
      <p class="terms-text">
        <strong>3. User Responsibilities</strong>
        <br/>
        As the user, you are responsible for:
        <ul>
          <li>Providing accurate and complete information in the questionnaire.</li>
          <li>Ensuring that the information submitted matches your current financial and tax status.</li>
          <li>Submitting completed forms to the IRS after review.</li>
          <li>Keeping a copy of all documents submitted.</li>
        </ul>
        Any inaccuracies or false information provided may result in an incorrect evaluation of your eligibility, and Premier Tax Debt Solutions will not be held liable for any errors caused by inaccurate user data.
      </p>
      <p class="terms-text">
        <strong>4. Limitations of Service</strong>
        <br/>
        The Tax Navigator Service:
        <ul>
          <li>Does not include legal representation or direct negotiation with the IRS.</li>
          <li>Does not include filing your tax forms with the IRS on your behalf unless you opt for the SecureTax Send-Off service.</li>
          <li>Cannot provide legal advice. If you need legal tax advice, you should seek a qualified tax attorney.</li>
          <li>Does not guarantee approval for IRS programs, as IRS decisions are based on the accuracy and completeness of your provided information and their internal policies.</li>
        </ul>
      </p>
      <p class="terms-text">
        <strong>5. Fees and Payment</strong>
        <br/>
        Fees for the Tax Navigator Service are charged upfront and are non-refundable once the service begins. Please note that the forms provided by the IRS are free and available to the public. You are not paying for the forms themselves; you are paying for the service that Premier Tax Debt Solutions provides, which includes:
        <ul>
          <li>Assisting with the eligibility process based on IRS guidelines.</li>
          <li>Partial population of IRS forms based on the information you provide.</li>
          <li>Providing access to complete the forms accurately.</li>
        </ul>
        The fees are as follows:
        <ul>
          <li>Installment Agreement Form 9465: $35</li>
          <li>Penalty Abatement Form 843: $45</li>
          <li>Offer in Compromise Form 656: $55</li>
        </ul>
        These fees cover the service of helping you complete these forms and providing guidance based on your inputs, but do not include the actual submission to the IRS unless the SecureTax Send-Off service is utilized.
      </p>
      <p class="terms-text">
        <strong>6. Use of SecureTax Send-Off Service</strong>
        <br/>
        You may opt to use the SecureTax Send-Off Service to submit your IRS forms directly. The forms must be accurately completed and reviewed before submission. Premier Tax Debt Solutions is not responsible for forms that are submitted with errors due to client-provided information.
      </p>
      <p class="terms-text">
        <strong>7. Privacy and Data Security</strong>
        <br/>
        We take your privacy seriously. The information you provide through the Tax Navigator will be stored securely in accordance with our Privacy Policy. We will not share your personal data with third parties except for the purposes of completing your service or if required by law.
      </p>
      <p class="terms-text">
        <strong>8. No Guarantee of Results</strong>
        <br/>
        While the Tax Navigator Service aims to assist you in understanding your eligibility for certain IRS programs, Premier Tax Debt Solutions does not guarantee the outcome of any submissions or approvals by the IRS. The IRS maintains full discretion over the review and approval of all forms submitted.
      </p>
      <p class="terms-text">
        <strong>9. Disclaimer</strong>
        <br/>
        This service is designed for general informational purposes and should not be considered as legal tax advice. Premier Tax Debt Solutions is not a law firm or a CPA firm. We provide form assistance based on your self-reported data and IRS guidelines.
      </p>
      <p class="terms-text">
        <strong>10. Dispute Resolution</strong>
        <br/>
        In the event of any dispute arising from this agreement or the services provided, both parties agree to resolve the matter through arbitration before pursuing any legal remedies.
      </p>
      <p class="terms-text">
        <strong>11. Termination of Service</strong>
        <br/>
        You may terminate the use of the Tax Navigator Service at any time. However, fees already paid for services rendered are non-refundable. Premier Tax Debt Solutions reserves the right to terminate or refuse service if fraudulent or false information is suspected.
      </p>
      <p class="terms-text">
        <strong>12. Changes to Terms</strong>
        <br/>
        Premier Tax Debt Solutions reserves the right to modify these terms at any time. You will be notified of any changes, and continued use of the service after such changes constitutes acceptance of the updated terms.
      </p>
      <p class="terms-text">
        <strong>Customer Acknowledgment</strong>
        <br/>
        By using this service, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree with these terms, do not use the Tax Navigator Service.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ms-auto" text @click="dialog = false" style="background-color: orange; color: white">Ok</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


 </div>
</template>

<script>
export default {
  data() {
    return {
      dialog:false,
      acceptedTerms: false,
      errorMessage: "",
      showEmailInput: false,
      email: "",
      loading: false,
    };
  },
  mounted() {
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("email") &&
      localStorage.getItem("requestNumber")
    ) {
      this.$router.push("tax-evaluation/basic-information");
    }
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        const dialogContent = this.$refs.dialogContent;
        if (dialogContent) {
          dialogContent.scrollTop = 0;
        }
      });
    },
    nextPage() {
      if (!this.acceptedTerms) {
        this.errorMessage =
          "You must accept the terms and conditions before proceeding.";
      } else {
        this.errorMessage = "";
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
        this.showEmailInput = true;
      }
    },
    isValidEmail(email) {
      const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    },
    async submitEmail() {
      if (this.isValidEmail(this.email)) {
        this.loading = true;
        const payload = { email: this.email };
this.errorMessage=""
        try {
          await this.$api.premierService.getUserByEmail(payload).then((res) => {
            if (res?.data?.data?.length > 0) {
              this.loading = false;
              this.$swal
                .fire({
                  title: "Wait a second?",
                  text: "Do you want to continue your previous form?",
                  icon: "info",
                  showCancelButton: true,
                  confirmButtonText: "Yes!",
                  cancelButtonText: "No",
                  reverseButtons: true,
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    localStorage.setItem(
                      "userId",
                      res?.data?.data[res?.data?.data?.length - 1]?.id
                    );
                    localStorage.setItem(
                      "requestNumber",
                      res?.data?.data[res?.data?.data?.length - 1]
                        ?.requestNumber
                    );
                    localStorage.setItem("email", this.email);
                    this.$router.push("/tax-evaluation/basic-information");
                  } else {
              localStorage.setItem("email", this.email);
              this.$router.push("/tax-evaluation/basic-information");
            }
                });
            } else {
              localStorage.setItem("email", this.email);
              this.$router.push("/tax-evaluation/basic-information");
            } 
          });
        } catch (error) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: error.response.data,
            showConfirmButton: false,
            timer: 5000,
          });
          this.loading = false;
        }
      } else {
        this.errorMessage = "Please enter a valid email address.";
      }
    
    },
  },
};
</script>

<style scoped>
.terms-main {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 1000px;
}

.terms-text {
  margin-bottom: 15px;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.terms-buttons {
  margin-bottom: 20px;
}

.email-section {
  margin-top: 20px;
  text-align: center;
}

.email-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 1em;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.btn {
  margin-top: 10px;
}
</style>
