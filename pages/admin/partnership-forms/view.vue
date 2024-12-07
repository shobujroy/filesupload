<template>
  <div class="pb-6">
    <h1 class="text-center">Partnership Program Application Form</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Section 1: Basic Information -->
      <h2>Section 1: Basic Information</h2>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.full_name"
          id="fullName"
          class="form-control"
          placeholder="Enter Full Name"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.company_name"
          id="companyName"
          class="form-control"
          placeholder="Enter Company Name"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="businessAddress">Business Address</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.business_address"
          id="businessAddress"
          class="form-control"
          placeholder="Enter Business Address"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.city"
          id="city"
          class="form-control"
          placeholder="Enter City"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.state"
          id="state"
          class="form-control"
          placeholder="Enter State"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="zip">Zip Code</label>
        <input
          type="number"
          v-model="form.sectionBasicInformation.zipcode"
          id="zip"
          class="form-control"
          placeholder="Enter Zip Code"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          v-model="form.sectionBasicInformation.phone_number"
          id="phoneNumber"
          class="form-control"
          placeholder="Enter Phone Number"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          v-model="form.sectionBasicInformation.email_address"
          id="email"
          class="form-control"
          placeholder="Enter Email Address"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="websiteUrl">Website URL</label>
        <input
          type="url"
          v-model="form.sectionBasicInformation.website_url"
          id="websiteUrl"
          class="form-control"
          placeholder="Enter Website URL"
          disabled
        />
      </div>

      <!-- Section 2: Professional Credentials -->
      <h2>Section 2: Professional Credentials</h2>
      <div class="form-group">
        <div class="form-group">
          <label>What is your professional title?</label>
          <select
            v-model="form.sectionProfessionalCredentials.professional_title"
            class="form-control"
            disabled
          >
            <option value="" disabled>Select</option>

            <option value="CPA">CPA</option>
            <option value="Accountant">Accountant</option>
            <option value="Tax Attorney">Tax Attorney</option>
            <option value=" Enrolled Agent">Enrolled Agent</option>
          </select>
        </div>
        <label>Are you a licensed tax professional?</label>
        <select
          disabled
          v-model="form.sectionProfessionalCredentials.license_tax_professional"
          class="form-control"
        >
          <option value="" disabled>Select</option>

          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div class="form-group">
        <label for="licenseType">Type of License/Certification</label>
        <input
          type="text"
          v-model="form.sectionProfessionalCredentials.type_of_license"
          id="licenseType"
          class="form-control"
          placeholder="Enter Type of License/Certification"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="licenseNumber">License Number</label>
        <input
          type="text"
          v-model="form.sectionProfessionalCredentials.license_number"
          id="licenseNumber"
          class="form-control"
          placeholder="Enter License Number"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="yearsExperience"
          >Years of Experience in Tax Resolution Services</label
        >
        <input
          type="number"
          v-model="form.sectionProfessionalCredentials.experience_in_years"
          id="yearsExperience"
          class="form-control"
          placeholder="Enter Years of Experience"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="professionalAssociations"
          >Professional Associations/Organizations</label
        >
        <textarea
          v-model="
            form.sectionProfessionalCredentials
              .professional_association_organizations
          "
          id="professionalAssociations"
          class="form-control"
          placeholder="List Professional Associations/Organizations"
        ></textarea>
      </div>

      <!-- Section 3: Service Offerings -->
      <h2>Section 3: Service Offerings</h2>
      <div class="form-group">
        <label
          >What specific tax resolution services do you offer? (Select all that
          apply)</label
        >
        <div class="checkbox-group">
          <label
            ><input
              type="checkbox"
              v-model="
                form.sectionServiceOfferings.tax_services[0].offer_in_compromise
              "
              value="Offer in Compromise"
              disabled
            />
            Offer in Compromise</label
          >
          <br disabled />
          <label
            ><input
              type="checkbox"
              v-model="
                form.sectionServiceOfferings.tax_services[1]
                  .installment_agreements
              "
              value="Installment Agreements"
              disabled
            />
            Installment Agreements</label
          >
          <br disabled />

          <label
            ><input
              type="checkbox"
              v-model="
                form.sectionServiceOfferings.tax_services[2].penalty_abatement
              "
              value="Penalty Abatement"
              disabled
            />
            Penalty Abatement</label
          >
          <br disabled />

          <label
            ><input
              type="checkbox"
              v-model="
                form.sectionServiceOfferings.tax_services[3].trust_formation
              "
              value="Trust Formation"
              disabled
            />
            Trust Formation</label
          >
          <br disabled />

          <label
            ><input
              type="checkbox"
              v-model="
                form.sectionServiceOfferings.tax_services[4].tax_consultation
              "
              disabled
            />
            Tax Consultation</label
          >
          <br disabled />

          <label
            ><input
              type="checkbox"
              v-model="form.sectionServiceOfferings.tax_services[5].other"
              value="Other"
              disabled
            />
            Other</label
          >
        </div>
        <input
          v-if="form.sectionServiceOfferings.tax_services[5] === true"
          type="text"
          v-model="form.otherService"
          class="form-control mt-2"
          placeholder="Please specify"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="specialization"
          >Do you specialize in any particular area?</label
        >
        <input
          type="text"
          v-model="form.sectionServiceOfferings.specialization"
          id="specialization"
          class="form-control"
          placeholder="Enter Specialization"
          disabled
        />
      </div>

      <!-- Section 4: Client Experience -->
      <h2>Section 4: Client Experience</h2>
      <div class="form-group">
        <label for="clientAcquisition"
          >How do you typically acquire clients? (Referral, Marketing Campaigns,
          Direct Mailers, etc.)</label
        >
        <input
          type="text"
          v-model="form.sectionClientExperience.acquire_clients"
          id="clientAcquisition"
          class="form-control"
          placeholder="Enter Client Acquisition Methods"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="clientCommunication"
          >What is your approach to client communication and service? (Describe
          how you build trust, handle pressure-free engagements, and maintain
          client satisfaction.)</label
        >
        <textarea
          v-model="form.sectionClientExperience.approach_to_client"
          id="clientCommunication"
          class="form-control"
          placeholder="Describe Your Approach to Client Communication and Service"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="activeClients"
          >How many active clients do you currently manage?</label
        >
        <input
          type="number"
          v-model="form.sectionClientExperience.active_clients"
          id="activeClients"
          class="form-control"
          placeholder="Enter Number of Active Clients"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="ongoingClients"
          >What percentage of your clients require ongoing tax resolution
          services?</label
        >
        <input
          type="number"
          v-model="form.sectionClientExperience.percentage_of_your_clients"
          id="ongoingClients"
          class="form-control"
          placeholder="Enter Percentage"
          disabled
        />
      </div>

      <!-- Section 5: Business Practices and Ethics -->
      <h2>Section 5: Business Practices and Ethics</h2>
      <div class="form-group">
        <label for="transparency"
          >How do you ensure transparency and honesty in your client
          engagements?</label
        >
        <textarea
          v-model="
            form.sectionBusinessPracticesAndEthics
              .ensure_transparency_and_honesty
          "
          id="transparency"
          class="form-control"
          placeholder="Describe How You Ensure Transparency and Honesty"
        ></textarea>
      </div>

      <div class="form-group">
        <label
          >Have you ever been subject to disciplinary actions or complaints
          regarding your professional conduct?</label
        >
        <select
          disabled
          v-model="
            form.sectionBusinessPracticesAndEthics
              .disciplinary_actions_or_complaints
          "
          class="form-control"
        >
          <option value="" disabled>Yes</option>

          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <textarea
          v-if="
            form.sectionBusinessPracticesAndEthics.disciplinaryActions === 'yes'
          "
          v-model="form.sectionBusinessPracticesAndEthics.disciplinaryDetails"
          class="form-control mt-2"
          placeholder="Please provide details"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="compliance"
          >Describe your approach to ensuring compliance with all regulatory
          requirements and maintaining ethical standards in your
          practice:</label
        >
        <textarea
          v-model="
            form.sectionBusinessPracticesAndEthics.ensuring_compliance_approach
          "
          id="compliance"
          class="form-control"
          placeholder="Describe Your Compliance and Ethical Practices"
        ></textarea>
      </div>

      <!-- Section 6: Partnership Alignment -->
      <h2>Section 6: Partnership Alignment</h2>
      <div class="form-group">
        <label for="partnershipReason"
          >Why do you want to partner with Premier Tax Debt Solutions?</label
        >
        <textarea
          v-model="form.sectionPartnershipAlignment.partnering_reason"
          id="partnershipReason"
          class="form-control"
          placeholder="Describe Your Reason for Partnering"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="alignment"
          >How do your values and business practices align with our mission of
          providing transparent, pressure-free tax relief services?</label
        >
        <textarea
          v-model="form.sectionPartnershipAlignment.our_mission_asslignment"
          id="alignment"
          class="form-control"
          placeholder="Describe Alignment with Our Mission"
        ></textarea>
      </div>
      <!-- Section 7: Regional Coverage -->
      <h2>Section 7: Regional Coverage</h2>
      <div class="form-group">
        <label for="statesCovered"
          >In which states do you currently offer your services?</label
        >
        <input
          type="text"
          v-model="form.sectionRegionalCoverage.states_covered"
          id="statesCovered"
          class="form-control"
          placeholder="List States Covered"
          disabled
        />
      </div>

      <!-- Section 8: References -->
      <h2>Section 8: References</h2>
      <v-row>
        <v-col class="reference-group" cols="12" md="6">
          <h3>Reference 1</h3>

          <div class="form-group">
            <label for="referenceOne">Name</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_one.name"
              class="form-control"
              placeholder="Enter Name"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Company</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_one.company"
              class="form-control"
              placeholder="Enter Company"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Relationship</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_one.relationship"
              class="form-control"
              placeholder="Enter Relationship"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_one.phone"
              class="form-control"
              placeholder="Enter Phone"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input
              type="email"
              v-model="form.sectionReferences.reference_one.email_address"
              class="form-control"
              placeholder="Enter Email Address"
              disabled
            />
          </div>
        </v-col>
        <v-col class="reference-group" cols="12" md="6">
          <h3>Reference 2</h3>

          <div class="form-group">
            <label for="referenceOne">Name</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_two.name"
              class="form-control"
              placeholder="Enter Name"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Company</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_two.company"
              class="form-control"
              placeholder="Enter Company"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Relationship</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_two.relationship"
              class="form-control"
              placeholder="Enter Relationship"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              v-model="form.sectionReferences.reference_two.phone"
              class="form-control"
              placeholder="Enter Phone"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input
              type="email"
              v-model="form.sectionReferences.reference_two.email_address"
              class="form-control"
              placeholder="Enter Email Address"
              disabled
            />
          </div>
        </v-col>
      </v-row>
      <!-- Section 9: Additional Information -->
      <h2>Section 9: Additional Information</h2>
      <div class="form-group">
        <label for="additionalInfo"
          >Is there anything else you would like to share with us regarding your
          qualifications or why you believe you would be a good fit for this
          partnership program?</label
        >
        <textarea
          v-model="form.sectionAdditionalInformation.additional_information"
          id="additionalInfo"
          class="form-control"
          placeholder="Share Additional Information"
          disabled
        ></textarea>
      </div>

      <!-- Submit Button -->
    </form>
  </div>
</template>
<script>
export default {
  layout: "dashboard",

  data() {
    return {
      loading: false,
      id: null,
      form: {
        sectionBasicInformation: {
          full_name: "",
          company_name: "",
          business_address: "",
          city: "",
          state: "",
          zipcode: "",
          phone_number: "",
          email_address: "",
          website_url: "",
        },
        sectionProfessionalCredentials: {
          professional_title: "",
          license_tax_professional: "",
          type_of_license: "",
          license_number: null,
          experience_in_years: null,
          professional_association_organizations: null,
        },
        sectionServiceOfferings: {
          tax_services: [
            { offer_in_compromise: false },
            { installment_agreements: false },
            { penalty_abatement: false },
            { trust_formation: false },
            { tax_consultation: false },
            { other: false },
          ],
          specialization: "",
        },
        sectionClientExperience: {
          acquire_clients: "",
          approach_to_client: "",
          active_clients: "",
          percentage_of_your_clients: "",
        },
        sectionBusinessPracticesAndEthics: {
          ensure_transparency_and_honesty: "",
          disciplinary_actions_or_complaints: "",
          ensuring_compliance_approach: "",
        },
        sectionPartnershipAlignment: {
          partnering_reason: "",
          our_mission_asslignment: "",
        },
        sectionRegionalCoverage: {
          states_covered: "",
        },
        sectionReferences: {
          reference_one: {
            name: "",
            company: "",
            relationship: "",
            phone: "",
            email_address: "",
          },
          reference_two: {
            name: "",
            company: "",
            relationship: "",
            phone: "",
            email_address: "",
          },
        },
        sectionAdditionalInformation: {
          additional_information: "",
        },
      },
    };
  },
  mounted() {
    console.log(this.$route.query.email);
    this.id = this.$route.query.id;
    this.getPartnershipById();
  },
  methods: {
    async getPartnershipById() {
      this.loading = true;
      const payload = { id: this.id };
      try {
        this.$api.premierService.getPartnershipById(payload).then((res) => {
          if (res?.data) {
            console.log(res);
            this.form = res?.data?.data[0];
          } else this.loading = false;
        });

        // handle successful response
      } catch (error) {
        console.log(error.response.data);

        this.loading = false;
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
  max-width: 700px;
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
</style>
