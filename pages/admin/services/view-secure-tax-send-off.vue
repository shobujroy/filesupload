<template>
  <div class="pb-6">
    <v-row>
      <v-col cols="12" md="3">
        <button
          class="btn btn-primary"
          @click="$router.push('/admin/services')"
        >
          Back
        </button></v-col
      >
      <v-col cols="12" md="6">
        <h1 class="text-center">Premier Tax Debt Solutions Service Form</h1>
      </v-col></v-row
    >
    <v-row>
      <v-col cols="12" md="6">
        <form>
          <!-- Client Information -->

          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input
              type="text"
              v-model="form.full_name"
              id="full_name"
              class="form-control"
              placeholder="Enter Full Name"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="text"
              v-model="form.phone"
              id="phone"
              class="form-control"
              placeholder="Enter Phone Number"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="form-control"
              placeholder="Enter Email Address"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input
              type="text"
              v-model="form.addressInfo.address"
              id="address"
              class="form-control"
              placeholder="Enter Address"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="city">City</label>
            <input
              type="text"
              v-model="form.addressInfo.city"
              id="city"
              class="form-control"
              placeholder="Enter City"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <select
              v-model="form.addressInfo.state"
              id="state"
              class="form-control"
              disabled
            >
              <option disabled value="">Select State</option>
              <option
                v-for="state in states"
                :key="state.code"
                :value="state.name"
              >
                {{ state.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="country">Country</label>
            <input
              type="text"
              v-model="form.addressInfo.country"
              id="country"
              class="form-control"
              placeholder="Enter Country"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="zipCode">Zip Code</label>
            <input
              type="number"
              v-model="form.addressInfo.zipCode"
              id="zipCode"
              class="form-control"
              placeholder="Enter Zip Code"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="state">TIN/SSN Number</label>
            <input
              type="text"
              v-model="formattedSSN"
              @input="formatSSN"
              id="ssn"
              class="form-control"
              maxlength="11"
              placeholder="XXX-XX-XXXX"
              disabled
            />
          </div>

          <!-- <div class="form-group">
          <label for="monthlyPayment">What is the amount you can afford for installment agreement monthly
            payment?</label>
          <input type="number" v-model="form.monthly_payment" id="monthlyPayment" class="form-control"
            placeholder="Enter Amount" />
        </div>
        <div class="form-group">
          <label for="initialPayment">What is the amount you can cover for Initial payment?</label>
          <input type="number" v-model="form.initial_payment" id="initialPayment" class="form-control"
            placeholder="Enter Amount" />
        </div>
        <div class="form-group">
          <label for="incomeBeforeTaxes">Is your income under $50000 a year before taxes?</label>
          <select v-model="form.income_above_threshhold" id="incomeBeforeTaxes" class="form-control">
            <option value="" disabled selected>Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="taxDelinquencyReason">What is the reason for the tax delinquency?</label>
          <input type="text" v-model="form.tax_delinquency_reason" id="taxDelinquencyReason" class="form-control"
            placeholder="Enter Tax Delinquency Reason" />
        </div> -->

          <!-- Service Selection -->
          <div class="form-group">
            <label for="serviceSelection"
              >Which service are you selecting?</label
            >
            <select
              v-model="form.serviceSelection"
              id="serviceSelection"
              class="form-control"
              disabled
            >
              <option value="" disabled selected>Select Service</option>
              <!-- <option value="1">In-depth liaison call</option>
            <option value="2">Fresh start resolution navigator</option> -->
              <option value="3">Secure tax sendoff</option>
              <!-- <option value="4">Tax Relief Pathway</option> -->
            </select>
          </div>
          <div class="form-group">
            <label for="formSelection">Which form are you uploading?</label>
            <select
              v-model="form.formSelection"
              id="formSelection"
              class="form-control"
              disabled
            >
              <option value="" disabled selected>Select Form</option>
              <option value="433">Form 433f</option>

              <option value="843">Form 843</option>
              <option value="9465">Form 9465</option>
              <!-- <option value="3">Secure tax sendoff</option> -->
              <!-- <option value="4">Tax Relief Pathway</option> -->
            </select>
          </div>
          <div class="form-group" v-if="form.formSelection === '9465'">
            <label for="formFiling1040">
              Tax Payer filing Form 1040 or 1040-SR.</label
            >
            <select
              v-model="formFiling1040"
              id="formFiling1040"
              class="form-control"
              disabled
            >
              <option value="" disabled selected>Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div class="form-group" v-if="form.serviceSelection === '2'">
            <label for="freshStartPackage"
              >Please Select Fresh Start Resolution Navigator Package.</label
            >
            <select
              v-model="freshStartPackage"
              id="freshStartPackage"
              class="form-control"
              disabled
            >
              <option value="" disabled selected>Select Package</option>
              <option value="1">Fresh Start Navigator Personal (495$)</option>
              <option value="2">Fresh Start Navigator Business (695$)</option>
            </select>
          </div>
          <div v-if="showPaymentSection" class="my-2">
            <h2>Payment Details</h2>
            <h3 v-if="form.serviceSelection === '1'" style="color: red">
              Payment Amount: $120
            </h3>
            <h3
              v-if="
                form.formSelection === '843' &&
                form.freshStartPrograms?.penaltyAbatement
              "
              style="color: red"
            >
              Payment Amount: $125
            </h3>
            <h3 v-else-if="form.formSelection === '433'" style="color: red">
              Payment Amount: $45
            </h3>
            <h3 v-else style="color: red">Payment Amount: $95</h3>

            <!-- <h3
              v-if="
                form.serviceSelection === '3' &&
                form.freshStartPrograms.penaltyAbatement
              "
              style="color: red"
            >
              Payment Amount: $125
            </h3> -->

            <h3 v-if="form.serviceSelection === '4'" style="color: red">
              Payment Amount: $995
            </h3>
            <h3
              v-if="form.serviceSelection === '2' && freshStartPackage === '1'"
              style="color: red"
            >
              Payment Amount: $495
            </h3>
            <h3
              v-if="form.serviceSelection === '2' && freshStartPackage === '2'"
              style="color: red"
            >
              Payment Amount: $695
            </h3>

            <!-- <button class="btn btn-primary" @click="payNow">Pay Now</button> -->
          </div>

          <div>
            <h4 class="mb-3">Is this service urgent?</h4>
            <label>
              <input type="radio" v-model="form.urgent" value="yes" disabled />
              Yes
            </label>
            <br />
            <label>
              <input type="radio" v-model="form.urgent" value="no" disabled />
              No
            </label>
            <br />
          </div>
          <div v-if="form.formSelection === '843'">
            <h4 class="mb-3">
              What Fresh Start Program would You Like to Address? (Check all
              that apply)
            </h4>
            <div>
              <label>
                <input
                  type="checkbox"
                  v-model="form.freshStartPrograms.penaltyAbatement"
                  disabled
                />
                Penalty Abatement
              </label>
              <!-- <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.cncStatus" />
            Currently Not Collectible (CNC) Status
          </label>
          <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.installmentAgreement" />
            Installment Agreement
          </label> -->
              <br />
              <label>
                <input
                  type="checkbox"
                  v-model="form.freshStartPrograms.offerInCompromise"
                  disabled
                />
                Offer in Compromise
              </label>
              <br />
              <!-- <label>
            <input type="checkbox" v-model="form.freshStartPrograms.showOtherField" />
            Other (Specify):
          </label>
          <br /> -->
              <input
                v-if="form.freshStartPrograms.showOtherField"
                type="text"
                v-model="form.freshStartPrograms.otherProgram"
                placeholder="Specify Other Program"
                class="form-control mt-2"
              />
            </div>
          </div>

          <div>
            <h4 class="mb-3">
              What Fresh Start Program would You Like to Address? (Check all
              that apply)
            </h4>
            <div>
              <label>
                <input
                  type="checkbox"
                  v-model="form.freshStartPrograms.penaltyAbatement"
                  disabled
                />
                Penalty Abatement
              </label>
              <br />
              <!-- <label>
              <input type="checkbox" v-model="form.freshStartPrograms.cncStatus" />
              Currently Not Collectible (CNC) Status
            </label>
            <br /> -->
              <!-- <label>
              <input type="checkbox" v-model="form.freshStartPrograms.installmentAgreement" />
              Installment Agreement
            </label>
            <br /> -->
              <label>
                <input
                  type="checkbox"
                  v-model="form.freshStartPrograms.offerInCompromise"
                  disabled
                />
                Offer in Compromise
              </label>
              <!-- <br />
            <label>
              <input type="checkbox" v-model="form.freshStartPrograms.showOtherField" />
              Other (Specify):
            </label>
            <br />
            <input v-if="form.freshStartPrograms.showOtherField" type="text"
              v-model="form.freshStartPrograms.otherProgram" placeholder="Specify Other Program"
              class="form-control mt-2" /> -->
            </div>
          </div>
          <div class="my-2" v-if="form.freshStartPrograms.penaltyAbatement">
            If qualified for First-Time-Penalty Abatement or other penalty
            abatement options, you can proceed with the abatement request. If
            disqualified, you may need to explore other payment or appeal
            options.
          </div>
          <div class="my-2" v-if="form.freshStartPrograms.cncStatus">
            You can fill out our
            <span
              @click="$router.push('/terms')"
              style="color: red; cursor: pointer"
            >
              Tax Form Navigator
            </span>
            to see if you quality for CNC (Low Income).
          </div>
          <div class="my-2" v-if="form.freshStartPrograms.offerInCompromise">
            You can fill out our
            <span
              @click="$router.push('/terms')"
              style="color: red; cursor: pointer"
            >
              Tax Form Navigator
            </span>
            to see if you quality for Offer in Compromise.
          </div>

          <!-- Additional Details -->
          <div class="form-group mt-2">
            <label for="additionalDetails"
              >Additional Details or Concerns:</label
            >
            <textarea
              id="additionalDetails"
              v-model="form.additionalDetails"
              class="form-control"
              rows="4"
              placeholder="Enter any additional details or concerns"
              disabled
            ></textarea>
          </div>
          <!-- <div class="form-group mt-2">
        <label for="document"
          >Do you have any document that you would like to attach?</label
        >
        <input disabled
          type="file"
          id="document"
          class="form-control"
          ref="fileInput"
        />
      </div> -->

          <!-- Verbal Agreement Authorization -->
          <div style="display: flex; gap: 10px; align-items: center">
            <input type="checkbox" v-model="form.services" disabled />
            <h3>Acknowledgement of Services:</h3>
          </div>
          <p>
            I understand that Premier Tax Debt Solutions is not a tax firm but
            provides a streamlined service to assist with the secure submission
            of my tax documents to the IRS. Premier Tax Debt Solutions does not
            guarantee specific outcomes regarding IRS acceptance or processing
            timeframes. I acknowledge that confirmation of my document
            submission will be available in my client portal within 5-7 business
            days, and that official IRS confirmation will be received by mail
            within a minimum of 30 days.
          </p>
          <div style="display: flex; gap: 10px; align-items: center">
            <input type="checkbox" v-model="form.communicate" disabled />
            <h3>Authorization for Processing Department Submission:</h3>
          </div>
          <p>
            I authorize the Processing Department of Premier Tax Debt Solutions
            to submit my completed documents to the IRS as part of the Secure
            Tax Send-Off service. I understand that this authorization does not
            include any representation or negotiation on my behalf.
          </p>
          <div style="display: flex; gap: 10px; align-items: center">
            <input type="checkbox" v-model="form.verbalAgreement" disabled />
            <h3>Responsibility for Document Accuracy:</h3>
          </div>
          <p>
            I acknowledge that the information provided on my PDF forms is
            complete and accurate to the best of my knowledge. I understand that
            I am fully responsible for the content of the documents I upload for
            submission. Premier Tax Debt Solutions is not responsible for
            verifying the accuracy of the information before it is sent to the
            IRS.
          </p>

          <div style="display: flex; gap: 10px; align-items: center">
            <input type="checkbox" v-model="additionalAssistance" disabled />
            <h3>Referrals for Additional Assistance:</h3>
          </div>
          <p>
            If necessary, I consent to being referred to a third-party
            professional for further tax assistance. I understand that I will
            receive a verbal agreement request before any referral is made.
          </p>
          <!-- <div class="form-group">
          <label for="verbalAuthorization">Verbal Authorization Given</label>
          <select
            v-model="form.verbalAgreementAuth.given"
            id="verbalAuthorization"
            class="form-control"
          >
            <option value="" disabled selected>Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="authorizationName"
            >Name of Representative Obtaining Authorization</label
          >
          <input disabled
            type="text"
            v-model="form.verbalAgreementAuth.representative"
            id="authorizationName"
            class="form-control"
            placeholder="Your Name"
          />
        </div> -->
          <div class="form-group">
            <label for="electronicSignature">Electronic Signature</label>
            <input
              disabled
              type="text"
              v-model="form.eSignature"
              id="electronicSignature"
              class="form-control"
              placeholder="Enter your electronic signature"
            />
          </div>
          <!-- <h2>Terms and Policies</h2>
      <p>
        Please review our full
        <span style="cursor: pointer; font-weight: bold"
          >Terms and Policies</span
        >
        before proceeding.
      </p> -->

          <!-- <div class="form-buttons">
        <button
          type="submit"
          class="btn"
          :disabled="loading"
          @click="handleSubmit"
        >
          <div style="display: flex; gap: 10px; align-items: center">
            <span> Submit</span>
            <v-progress-circular
              indeterminate
              color="white"
              :size="16"
              v-if="loading"
            ></v-progress-circular>
          </div>
        </button>
      </div> -->
        </form>
      </v-col>
      <v-col cols="12" md="6">
        <div class="right-column mb-6">
          <v-row align="center">
            <v-col cols="12" md="5">
              <h4 class="text-center mb-2">
                Payment Amount:
                <v-chip>{{
                  this.allData?.total_price
                    ? `$${this.allData?.total_price}`
                    : "0.00"
                }}</v-chip>
              </h4>
            </v-col>
            <v-col cols="12" md="5">
              <h4 class="text-center mb-2">
                Payment Status:
                <v-chip
                  v-if="
                    !this.allData?.is_paid &&
                    this.allData?.total_price !== '0.00'
                  "
                  class="text-truncate"
                  color="#003A3A"
                  outlined
                >
                  {{ this.allData?.is_paid ? "Paid" : "Unpaid" }}
                </v-chip>
                <v-chip
                  class="text-truncate"
                  color="#003A3A"
                  outlined
                  v-else-if="this.allData?.total_price === '0.00'"
                  >N/A</v-chip
                >
                <v-chip
                  class="text-truncate"
                  color="#003A3A"
                  outlined
                  v-else-if="
                    this.allData?.is_paid &&
                    this.allData?.total_price !== '0.00'
                  "
                  >Paid</v-chip
                >
              </h4>
            </v-col>
            <v-col
              cols="12"
              md="2"
              v-if="
                !this.allData?.is_paid && this.allData?.total_price !== '0.00'
              "
            >
              <div class="text-center">
                <button
                  class="btn btn-primary"
                  @click="handlePayNow"
                  :disabled="loadingBtn"
                >
                  Pay
                  <v-progress-circular
                    indeterminate
                    color="white"
                    :size="16"
                    v-if="loadingBtn"
                  ></v-progress-circular>
                </button>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="right-column mb-6">
          <h4 class="text-center mb-2">Documents</h4>
          <div class="file-table-container" v-if="files?.length > 0">
            <v-chip
              v-for="(file, index) in files"
              :key="index"
              @click="downloadItem(file)"
              class="mb-2 mr-2"
              >File-{{ index + 1 }}</v-chip
            >
          </div>
          <div class="text-center" v-else>No Files.</div>
        </div>
        <div class="right-column">
          <div v-if="!dataLoader">
            <h4 class="text-center mb-2">Notes</h4>

            <v-container
              class="mt-4"
              style="font-size: 18px"
              v-if="notes.length > 0"
            >
              <div v-for="(item, index) in notes" :key="item.id" class="mb-2">
                <v-row>
                  <!-- Numbering -->

                  <!-- Note Content -->
                  <v-col cols="12">
                    <div>
                      <!-- Textarea for notes -->
                      <v-textarea
                        outlined
                        rows="1"
                        auto-grow
                        :value="item.notes"
                        disabled
                        style="margin: 0 !important"
                      ></v-textarea>

                      <!-- Creation date display -->
                      <div style="color: #003a3a; font-size: 12px">
                        Created on: {{ formatDate(item.created_at) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <!-- <v-divider class="mt-3"></v-divider> -->
              </div>

              <!-- Input field for adding new notes -->
            </v-container>
            <div v-else class="text-center mt-6" style="color: black">
              No Notes Found!
            </div>
          </div>
        </div>
      </v-col></v-row
    >
  </div>
</template>
<script>
export default {
  layout: "dashboard",

  data() {
    return {
      loading: false,
      notes: [],
      files: [],
      allData: null,
      loadingBtn: false,
      freshStart: false,
      freshStartPackage: "",
      states: [
        { code: "AL", name: "Alabama" },
        { code: "AK", name: "Alaska" },
        { code: "AZ", name: "Arizona" },
        { code: "AR", name: "Arkansas" },
        { code: "CA", name: "California" },
        { code: "CO", name: "Colorado" },
        { code: "CT", name: "Connecticut" },
        { code: "DE", name: "Delaware" },
        { code: "FL", name: "Florida" },
        { code: "GA", name: "Georgia" },
        { code: "HI", name: "Hawaii" },
        { code: "ID", name: "Idaho" },
        { code: "IL", name: "Illinois" },
        { code: "IN", name: "Indiana" },
        { code: "IA", name: "Iowa" },
        { code: "KS", name: "Kansas" },
        { code: "KY", name: "Kentucky" },
        { code: "LA", name: "Louisiana" },
        { code: "ME", name: "Maine" },
        { code: "MD", name: "Maryland" },
        { code: "MA", name: "Massachusetts" },
        { code: "MI", name: "Michigan" },
        { code: "MN", name: "Minnesota" },
        { code: "MS", name: "Mississippi" },
        { code: "MO", name: "Missouri" },
        { code: "MT", name: "Montana" },
        { code: "NE", name: "Nebraska" },
        { code: "NV", name: "Nevada" },
        { code: "NH", name: "New Hampshire" },
        { code: "NJ", name: "New Jersey" },
        { code: "NM", name: "New Mexico" },
        { code: "NY", name: "New York" },
        { code: "NC", name: "North Carolina" },
        { code: "ND", name: "North Dakota" },
        { code: "OH", name: "Ohio" },
        { code: "OK", name: "Oklahoma" },
        { code: "OR", name: "Oregon" },
        { code: "PA", name: "Pennsylvania" },
        { code: "RI", name: "Rhode Island" },
        { code: "SC", name: "South Carolina" },
        { code: "SD", name: "South Dakota" },
        { code: "TN", name: "Tennessee" },
        { code: "TX", name: "Texas" },
        { code: "UT", name: "Utah" },
        { code: "VT", name: "Vermont" },
        { code: "VA", name: "Virginia" },
        { code: "WA", name: "Washington" },
        { code: "WV", name: "West Virginia" },
        { code: "WI", name: "Wisconsin" },
        { code: "WY", name: "Wyoming" },
      ],
      formFiling1040: "",
      additionalAssistance: true,
      form: {
        full_name: "",
        phone: "",
        email: "",
        ssn: "",
        urgent: "",
        monthly_payment: null,
        income_above_threshhold: "",
        tax_delinquency_reason: "",
        initial_payment: null,
        addressInfo: {
          address: "",
          state: "",
          city: "",
          country: "US",
          zipCode: "",
        },
        serviceSelection: "3",
        formSelection: "",
        freshStartPrograms: {
          penaltyAbatement: false,
          cncStatus: false,
          installmentAgreement: false,
          offerInCompromise: false,
          otherProgram: "", // for other field input
          showOtherField: false,
        },
        otherProgram: "",
        additionalDetails: "",
        services: false,
        communicate: false,
        verbalAgreement: false,
        document: null,
        // verbalAgreementAuth: {
        //   given: true,
        //   representative: "",
        // },
        eSignature: "",
      },
    };
  },
  created() {
    // Parse the form object from query parameters
    if (this.$route.query.id) {
      this.getDetailsById();
      this.getNotes();
    }
  },
  computed: {
    formattedSSN: {
      get() {
        return this.form.ssn
          .replace(/\D/g, "") // Remove all non-numeric characters
          .replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3") // Format as XXX-XX-XXXX
          .substring(0, 11); // Ensure it doesn't exceed the SSN format length
      },
      set(value) {
        this.form.ssn = value.replace(/\D/g, ""); // Update the ssn field with only digits
      },
    },
    showPaymentSection() {
      return (
        (this.form.serviceSelection === "1" ||
          this.form.serviceSelection === "2" ||
          this.form.serviceSelection === "3" ||
          this.form.serviceSelection === "4") &&
        this.form.formSelection
      );
    },
    servicePrice() {
      switch (this.form.serviceSelection) {
        case "1":
          return 120;
        case "2":
          return this.freshStartPackage === "1" ? 495 : 695;
        case "3":
          if (
            this.form.formSelection === "843" &&
            this.form.freshStartPrograms?.penaltyAbatement
          ) {
            return 125;
          } else if (this.form.formSelection === "433") {
            return 45;
          } else {
            return 95;
          }
        case "4":
          return 995;
        default:
          return 0;
      }
    },
  },
  methods: {
    downloadItem(link) {
      // Remove "/public" from the link
      const cleanedLink = link.replace("public/", "");

      // Remove "/api/" from the BASE_URL if it exists
      const baseUrlWithoutApi = process.env.BASE_URL.replace(/\/api\/$/, "");
      console.log(baseUrlWithoutApi);

      // Combine the cleaned link with the modified base URL
      const fullUrl = `${baseUrlWithoutApi}/${cleanedLink}`;

      // Open the full URL in a new window
      window.open(fullUrl, "_blank");
    },

    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // 12-hour format with AM/PM
        timeZone: "America/Los_Angeles", // PST (Pacific Standard Time)
      };
      return new Intl.DateTimeFormat(undefined, options).format(new Date(date));
    },
    async getNotes() {
      await this.$api.premierService
        .getNotesById(this.$route.query.id)
        .then((response) => {
          // console.log(response?.data);
          this.notes = response?.data;

          console.log(response.data);

          // console.log(response?.data);
        })
        .finally(() => {
          this.dataLoader = false;
          this.$store.dispatch("initLoader", false);
        });
    },
    formatSSN(event) {
      const input = event.target.value;
      this.form.ssn = input.replace(/\D/g, ""); // Remove non-digit characters
    },
    async getDetailsById() {
      this.loading = true;
      try {
        this.$api.premierService
          .getServiceByUserId(this.$route.query.id)
          .then((res) => {
            if (res?.data) {
              console.log(res);
              const formDetails = res?.data;
              this.allData = res?.data;
              if (
                res?.data?.document_url &&
                res?.data?.document_url !== "undefined"
              ) {
                const files = res?.data?.document_url.replace(/\\/g, "\\\\");
                console.log(files);
                this.files = JSON.parse(files);
              }

              console.log(formDetails);
              this.form = {
                ...this.form,
                full_name: formDetails.full_name,
                phone: formDetails.phone,
                email: formDetails.email,
                ssn: formDetails.itin_ssn,
                urgent: formDetails.is_urgent ? "yes" : "no",
                addressInfo: {
                  address: formDetails.address,
                  city: formDetails?.extra_values?.city,
                  state: formDetails?.extra_values?.state,
                  zipCode: formDetails?.extra_values?.zipCode,
                  country: formDetails?.extra_values?.country,
                },
                formSelection: formDetails?.extra_values?.formSelection,
                serviceSelection: formDetails.service_id,
                freshStartPrograms: formDetails.fresh_start_program,
                additionalDetails: formDetails.additional_details,
                services: formDetails.acknowledgement_of_services,
                communicate: formDetails.authorization_to_communicate,
                verbalAgreement: formDetails.verbal_agreement,
                income_above_threshhold: formDetails.income_above_threshhold,
                initial_payment: formDetails.initial_payment,
                monthly_payment: formDetails.monthly_payment,
                tax_delinquency_reason: formDetails.tax_delinquency_reason,
                // verbalAgreementAuth: {
                //   given: true,
                //   representative: "",
                // },
                eSignature: formDetails.electronic_signature,
              };
              this.formFiling1040 = formDetails?.extra_values?.formFiling1040;
              if (
                this.allData.service_id === "2" &&
                this.allData.total_price === "495.00"
              ) {
                this.freshStartPackage = "1";
              } else if (
                this.allData.service_id === "2" &&
                this.allData.total_price === "695.00"
              ) {
                this.freshStartPackage = "2";
              }
            } else this.loading = false;
          });
        this.loading = false;

        // handle successful response
      } catch (error) {
        console.log(error.response.data);

        this.loading = false;
      }
    },

    async handlePayNow(item) {
      const payload = {
        type: "service",
        type_id: this?.allData?.id,
        from: "admin-service",
      };
      if (
        this?.allData?.service_id == 3 &&
        this?.allData?.total_price === "45.00"
      ) {
        payload.label = "form_433f_letter";
        payload.payment_service = "Secure tax sendoff";
        payload.from = `admin-service&id=${this?.allData?.id}&form=${this?.allData?.extra_values?.formSelection}`;
      } else if (
        this?.allData?.service_id == 3 &&
        this?.allData?.total_price === "95.00"
      ) {
        payload.label = "secure_tax_send_off";
        payload.payment_service = "Secure tax sendoff";
        payload.from = `admin-service&id=${this?.allData?.id}&form=${this?.allData?.extra_values?.formSelection}`;
      } else if (
        this?.allData?.service_id == 3 &&
        this?.allData?.total_price === "125.00"
      ) {
        payload.label = "secure_tax_send_off_penalty_abatement";
        payload.payment_service = "Secure tax sendoff Penalty Abatement";
        payload.from = `admin-service&id=${this?.allData?.id}&form=${this?.allData?.extra_values?.formSelection}`;
      } else if (this?.allData?.service_id == 1) {
        payload.label = "in_depth_liaison_call";
        payload.payment_service = "In-depth liaison call";
      } else if (this.allData?.service_id == 1) {
        payload.label = "in_depth_liaison_call";
        payload.payment_service = "In-depth liaison call";
      } else if (this.allData?.service_id == 4) {
        payload.label = "tax_releif_pathway";
        payload.payment_service = "Tax Relief Pathway";
      } else if (
        this.allData?.service_id == 2 &&
        this.allData?.total_price === "495.00"
      ) {
        payload.label = "standard_fresh_start_navigator";
        payload.payment_service = "Standard Fresh Start Navigator";
      } else if (
        this.allData?.service_id == 2 &&
        this.allData?.total_price === "695.00"
      ) {
        payload.label = "advance_fresh_start_navigator";
        payload.payment_service = "Advance Fresh Start Navigator";
      }

      try {
        this.loadingBtn = true;
        const res = await this.$api.premierService.adminPaymentCheckout(
          payload
        );
        if (res && res.data) {
          const redirectLink = res.data;

          // Log the redirect link for debugging
          console.log("Redirecting to:", redirectLink);

          // Redirecting the user to the link
          window.location.href = redirectLink;
        } else this.loadingBtn = false;
      } catch (error) {
        this.loadingBtn = false;

        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
form {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.right-column {
  margin: 0 auto;
  /* margin-top: 11px; */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.file-table-container {
  width: 100%;
  margin-top: 20px;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
}

.file-table th,
.file-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.file-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.file-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.file-table tr:hover {
  background-color: #f1f1f1;
}
</style>
