<template>
  <div class="pb-6">
    <h1 class="text-center">Partnership Program Application Form</h1>
    <form @submit.prevent="handleSubmit">
      <v-expansion-panels v-model="panel" inset>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><h2>Section 1: Basic Information</h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input
                type="text"
                v-model="form.section_basic_information.full_name"
                id="fullName"
                class="form-control"
                placeholder="Enter Full Name"
              />
            </div>

            <div class="form-group">
              <label for="companyName">Company Name *</label>
              <input
                type="text"
                v-model="form.section_basic_information.company_name"
                id="companyName"
                class="form-control"
                placeholder="Enter Company Name"
              />
            </div>

            <div class="form-group">
              <label for="businessAddress">Business Address *</label>
              <input
                type="text"
                v-model="form.section_basic_information.business_address"
                id="businessAddress"
                class="form-control"
                placeholder="Enter Business Address"
              />
            </div>

            <div class="form-group">
              <label for="city">City *</label>
              <input
                type="text"
                v-model="form.section_basic_information.city"
                id="city"
                class="form-control"
                placeholder="Enter City"
              />
            </div>
            <div class="form-group">
              <label for="state">State *</label>
              <select
                v-model="form.section_basic_information.state"
                class="form-control"
              >
                <option value="" disabled>Select</option>

                <option
                  :value="state.value"
                  v-for="state in states"
                  :key="state.value"
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="zip">Zip Code *</label>
              <input
                type="number"
                v-model="form.section_basic_information.zipcode"
                id="zip"
                class="form-control"
                placeholder="Enter Zip Code"
              />
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number *</label>
              <input
                type="text"
                v-model="form.section_basic_information.phone_number"
                id="phoneNumber"
                class="form-control"
                placeholder="Enter Phone Number"
              />
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                type="email"
                v-model="form.section_basic_information.email_address"
                id="email"
                class="form-control"
                placeholder="Enter Email Address"
              />
            </div>

            <div class="form-group">
              <label for="websiteUrl">Website URL *</label>
              <input
                type="url"
                v-model="form.section_basic_information.website_url"
                id="websiteUrl"
                class="form-control"
                placeholder="Enter Website URL"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>Section 2: Professional Credentials</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="form-group">
              <label>What is your professional title? </label>
              <select
                v-model="
                  form.section_professional_credentials.professional_title
                "
                class="form-control"
              >
                <option value="" disabled>Select</option>

                <option value="CPA">CPA</option>
                <option value="Accountant">Accountant</option>
                <option value="Tax Attorney">Tax Attorney</option>
                <option value=" Enrolled Agent">Enrolled Agent</option>
              </select>
            </div>
            <div class="form-group">
              <label>Are you a licensed tax professional?</label>
              <select
                v-model="
                  form.section_professional_credentials.license_tax_professional
                "
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
                v-model="form.section_professional_credentials.type_of_license"
                id="licenseType"
                class="form-control"
                placeholder="Enter Type of License/Certification"
              />
            </div>

            <div class="form-group">
              <label for="licenseNumber">License Number</label>
              <input
                type="text"
                v-model="form.section_professional_credentials.license_number"
                id="licenseNumber"
                class="form-control"
                placeholder="Enter License Number"
              />
            </div>

            <div class="form-group">
              <label for="yearsExperience"
                >Years of Experience in Tax Resolution Services</label
              >
              <input
                type="number"
                v-model="
                  form.section_professional_credentials.experience_in_years
                "
                id="yearsExperience"
                class="form-control"
                placeholder="Enter Years of Experience"
              />
            </div>

            <div class="form-group">
              <label for="professionalAssociations"
                >Professional Associations/Organizations</label
              >
              <textarea
                v-model="
                  form.section_professional_credentials
                    .professional_association_organizations
                "
                id="professionalAssociations"
                class="form-control"
                placeholder="List Professional Associations/Organizations"
              ></textarea>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header
            ><h2>Section 3: Service Offerings</h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="form-group">
              <label
                >What specific tax resolution services do you offer? (Select all
                that apply)</label
              >
              <div class="checkbox-group">
                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[0]
                        .offer_in_compromise
                    "
                    value="Offer in Compromise"
                  />
                  Offer in Compromise</label
                >
                <br />
                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[1]
                        .installment_agreements
                    "
                    value="Installment Agreements"
                  />
                  Installment Agreements</label
                >
                <br />

                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[2]
                        .penalty_abatement
                    "
                    value="Penalty Abatement"
                  />
                  Penalty Abatement</label
                >
                <br />

                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[3]
                        .trust_formation
                    "
                    value="Trust Formation"
                  />
                  Trust Formation</label
                >
                <br />

                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[4]
                        .tax_consultation
                    "
                  />
                  Tax Consultation</label
                >
                <br />

                <label
                  ><input
                    type="checkbox"
                    v-model="
                      form.section_service_offerings.tax_services[5].other
                    "
                    value="Other"
                  />
                  Other</label
                >
              </div>
              <input
                v-if="
                  form.section_service_offerings.tax_services[5].other === true
                "
                type="text"
                v-model="form.otherService"
                class="form-control mt-2"
                placeholder="Please specify"
              />
            </div>

            <div class="form-group">
              <label for="specialization"
                >Do you specialize in any particular area?</label
              >
              <input
                type="text"
                v-model="form.section_service_offerings.specialization"
                id="specialization"
                class="form-control"
                placeholder="Enter Specialization"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><h2>Section 4: Client Experience</h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="clientAcquisition"
                >How do you typically acquire clients? (Referral, Marketing
                Campaigns, Direct Mailers, etc.)</label
              >
              <input
                type="text"
                v-model="form.section_client_experience.acquire_clients"
                id="clientAcquisition"
                class="form-control"
                placeholder="Enter Client Acquisition Methods"
              />
            </div>

            <div class="form-group">
              <label for="clientCommunication"
                >What is your approach to client communication and service?
                (Describe how you build trust, handle pressure-free engagements,
                and maintain client satisfaction.)</label
              >
              <textarea
                v-model="form.section_client_experience.approach_to_client"
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
                v-model="form.section_client_experience.active_clients"
                id="activeClients"
                class="form-control"
                placeholder="Enter Number of Active Clients"
              />
            </div>

            <div class="form-group">
              <label for="ongoingClients"
                >What percentage of your clients require ongoing tax resolution
                services?</label
              >
              <input
                type="number"
                v-model="
                  form.section_client_experience.percentage_of_your_clients
                "
                id="ongoingClients"
                class="form-control"
                placeholder="Enter Percentage"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><h2>
              Section 5: Business Practices and Ethics
            </h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="transparency"
                >How do you ensure transparency and honesty in your client
                engagements?</label
              >
              <textarea
                v-model="
                  form.section_business_practices_and_ethics
                    .ensure_transparency_and_honesty
                "
                id="transparency"
                class="form-control"
                placeholder="Describe How You Ensure Transparency and Honesty"
              ></textarea>
            </div>

            <div class="form-group">
              <label
                >Have you ever been subject to disciplinary actions or
                complaints regarding your professional conduct?</label
              >
              <select
                v-model="
                  form.section_business_practices_and_ethics
                    .disciplinary_actions_or_complaints
                "
                class="form-control"
              >
                <option value="" disabled>Select</option>

                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <textarea
                v-if="
                  form.section_business_practices_and_ethics
                    .disciplinaryActions === 'yes'
                "
                v-model="
                  form.section_business_practices_and_ethics.disciplinaryDetails
                "
                class="form-control mt-2"
                placeholder="Please provide details"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="compliance"
                >Describe your approach to ensuring compliance with all
                regulatory requirements and maintaining ethical standards in
                your practice:</label
              >
              <textarea
                v-model="
                  form.section_business_practices_and_ethics
                    .ensuring_compliance_approach
                "
                id="compliance"
                class="form-control"
                placeholder="Describe Your Compliance and Ethical Practices"
              ></textarea>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>Section 6: Partnership Alignment</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="partnershipReason"
                >Why do you want to partner with Premier Tax Debt
                Solutions?</label
              >
              <textarea
                v-model="form.section_partnership_alignment.partnering_reason"
                id="partnershipReason"
                class="form-control"
                placeholder="Describe Your Reason for Partnering"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="alignment"
                >How do your values and business practices align with our
                mission of providing transparent, pressure-free tax relief
                services?</label
              >
              <textarea
                v-model="
                  form.section_partnership_alignment.our_mission_asslignment
                "
                id="alignment"
                class="form-control"
                placeholder="Describe Alignment with Our Mission"
              ></textarea>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>Section 7: Regional Coverage</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="statesCovered"
                >In which states do you currently offer your services?</label
              >
              <input
                type="text"
                v-model="form.section_regional_coverage.states_covered"
                id="statesCovered"
                class="form-control"
                placeholder="List States Covered"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>Section 8: References</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col class="reference-group" cols="12" md="6">
                <h3>Reference 1</h3>

                <div class="form-group">
                  <label for="referenceOne">Name</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_one.name"
                    class="form-control"
                    placeholder="Enter Name"
                  />
                </div>

                <div class="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_one.company"
                    class="form-control"
                    placeholder="Enter Company"
                  />
                </div>

                <div class="form-group">
                  <label>Relationship</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_one.relationship"
                    class="form-control"
                    placeholder="Enter Relationship"
                  />
                </div>

                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_one.phone"
                    class="form-control"
                    placeholder="Enter Phone"
                  />
                </div>

                <div class="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    v-model="
                      form.section_references.reference_one.email_address
                    "
                    class="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>
              </v-col>
              <v-col class="reference-group" cols="12" md="6">
                <h3>Reference 2</h3>

                <div class="form-group">
                  <label for="referenceOne">Name</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_two.name"
                    class="form-control"
                    placeholder="Enter Name"
                  />
                </div>

                <div class="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_two.company"
                    class="form-control"
                    placeholder="Enter Company"
                  />
                </div>

                <div class="form-group">
                  <label>Relationship</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_two.relationship"
                    class="form-control"
                    placeholder="Enter Relationship"
                  />
                </div>

                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    v-model="form.section_references.reference_two.phone"
                    class="form-control"
                    placeholder="Enter Phone"
                  />
                </div>

                <div class="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    v-model="
                      form.section_references.reference_two.email_address
                    "
                    class="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>Section 9: Additional Information</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="form-group">
              <label for="additionalInfo"
                >Is there anything else you would like to share with us
                regarding your qualifications or why you believe you would be a
                good fit for this partnership program?</label
              >
              <textarea
                v-model="
                  form.section_additional_information.additional_information
                "
                id="additionalInfo"
                class="form-control"
                placeholder="Share Additional Information"
              ></textarea>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Submit Button -->
      <div class="form-buttons">
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
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      panel: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      states: [
        { name: "Alabama", value: "alabama" },
        { name: "Alaska", value: "alaska" },
        { name: "Arizona", value: "arizona" },
        { name: "Arkansas", value: "arkansas" },
        { name: "California", value: "california" },
        { name: "Colorado", value: "colorado" },
        { name: "Connecticut", value: "connecticut" },
        { name: "Delaware", value: "delaware" },
        { name: "Florida", value: "florida" },
        { name: "Georgia", value: "georgia" },
        { name: "Hawaii", value: "hawaii" },
        { name: "Idaho", value: "idaho" },
        { name: "Illinois", value: "illinois" },
        { name: "Indiana", value: "indiana" },
        { name: "Iowa", value: "iowa" },
        { name: "Kansas", value: "kansas" },
        { name: "Kentucky", value: "kentucky" },
        { name: "Louisiana", value: "louisiana" },
        { name: "Maine", value: "maine" },
        { name: "Maryland", value: "maryland" },
        { name: "Massachusetts", value: "massachusetts" },
        { name: "Michigan", value: "michigan" },
        { name: "Minnesota", value: "minnesota" },
        { name: "Mississippi", value: "mississippi" },
        { name: "Missouri", value: "missouri" },
        { name: "Montana", value: "montana" },
        { name: "Nebraska", value: "nebraska" },
        { name: "Nevada", value: "nevada" },
        { name: "New Hampshire", value: "new hampshire" },
        { name: "New Jersey", value: "new jersey" },
        { name: "New Mexico", value: "new mexico" },
        { name: "New York", value: "new york" },
        { name: "North Carolina", value: "north carolina" },
        { name: "North Dakota", value: "north dakota" },
        { name: "Ohio", value: "ohio" },
        { name: "Oklahoma", value: "oklahoma" },
        { name: "Oregon", value: "oregon" },
        { name: "Pennsylvania", value: "pennsylvania" },
        { name: "Rhode Island", value: "rhode island" },
        { name: "South Carolina", value: "south carolina" },
        { name: "South Dakota", value: "south dakota" },
        { name: "Tennessee", value: "tennessee" },
        { name: "Texas", value: "texas" },
        { name: "Utah", value: "utah" },
        { name: "Vermont", value: "vermont" },
        { name: "Virginia", value: "virginia" },
        { name: "Washington", value: "washington" },
        { name: "West Virginia", value: "west virginia" },
        { name: "Wisconsin", value: "wisconsin" },
        { name: "Wyoming", value: "wyoming" },
      ],
      form: {
        section_basic_information: {
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
        section_professional_credentials: {
          professional_title: "",
          license_tax_professional: "",
          type_of_license: "",
          license_number: null,
          experience_in_years: null,
          professional_association_organizations: null,
        },
        section_service_offerings: {
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
        section_client_experience: {
          acquire_clients: "",
          approach_to_client: "",
          active_clients: "",
          percentage_of_your_clients: "",
        },
        section_business_practices_and_ethics: {
          ensure_transparency_and_honesty: "",
          disciplinary_actions_or_complaints: "",
          ensuring_compliance_approach: "",
        },
        section_partnership_alignment: {
          partnering_reason: "",
          our_mission_asslignment: "",
        },
        section_regional_coverage: {
          states_covered: "",
        },
        section_references: {
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
        section_additional_information: {
          additional_information: "",
        },
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      if (
        !this.form.section_basic_information.email_address ||
        !this.form.section_basic_information.full_name ||
        !this.form.section_basic_information.company_name ||
        !this.form.section_basic_information.business_address ||
        !this.form.section_basic_information.city ||
        !this.form.section_basic_information.state ||
        !this.form.section_basic_information.zipcode ||
        !this.form.section_basic_information.website_url ||
        !this.form.section_basic_information.phone_number
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Basic information is required.",
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }
      try {
        this.$api.premierService.savePartnershipInfo(this.form).then((res) => {
          if (res?.data) {
            this.$swal.fire({
              toast: true,
              timerProgressBar: true,
              position: "top-end",
              icon: "success",
              text: "Form Submitted Successfully.",
              showConfirmButton: false,
              timer: 5000,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });

            const payload = {
              email: this.form.section_basic_information.email_address,
              message: this.form,
              subject:
                "Partnership Request Received – Premier Tax Debt Solutions",
              key: "partnership",
            };
            this.$api.premierService.sendEmail(payload).then((res) => {
              console.log(res);
            });
            this.form = {
              section_basic_information: {
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
              section_professional_credentials: {
                professional_title: "",

                license_tax_professional: "",
                type_of_license: "",
                license_number: null,
                experience_in_years: null,
                professional_association_organizations: null,
              },
              section_service_offerings: {
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
              section_client_experience: {
                acquire_clients: "",
                approach_to_client: "",
                active_clients: "",
                percentage_of_your_clients: "",
              },
              section_business_practices_and_ethics: {
                ensure_transparency_and_honesty: "",
                disciplinary_actions_or_complaints: "",
                ensuring_compliance_approach: "",
              },
              section_partnership_alignment: {
                partnering_reason: "",
                our_mission_asslignment: "",
              },
              section_regional_coverage: {
                states_covered: "",
              },
              section_references: {
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
              section_additional_information: {
                additional_information: "",
              },
            };
            this.loading = false;
          }
        });

        // handle successful response
      } catch (error) {
        console.log(error.response.data);
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response.data,
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
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
  max-width: 900px;
}

h1 {
  margin-bottom: 20px;
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
