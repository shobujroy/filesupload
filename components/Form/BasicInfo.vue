<template>
  <div>
    <div style="padding: 25px" v-if="!loading">
      <v-row justify="center">
        <v-col
          cols="12"
          md="5"
          style="border: 1px solid rgb(177, 177, 177); border-radius: 5px"
        >
          <h2>Basic Information (Personal)</h2>

          <!-- General Information -->
          <h3>General</h3>

          <!-- General Information Fields -->
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              v-model="form.generalInfo.firstName"
              id="firstName"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              v-model="form.generalInfo.lastName"
              id="lastName"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              v-model="form.generalInfo.dateOfBirth"
              id="dateOfBirth"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="ssn">SSN:</label>
            <input
              type="text"
              v-model="formattedSSN"
              @input="formatSSN"
              id="ssn"
              class="form-control"
              maxlength="11"
              placeholder="XXX-XX-XXXX"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="maritalStatus">Marital Status:</label>
            <select
              v-model="form.generalInfo.maritalStatus"
              id="maritalStatus"
              class="form-control"
              :disabled="!isEditing"
            >
              <option disabled value="">Select Marital Status</option>

              <!-- <option value="single">Single</option>
              <option value="Married Filing Jointly">
                Married Filing Jointly
              </option>
              <option value="Married Filing Separately">
                Married Filing Separately
              </option>
              <option value="Head of Household">Head of Household</option>
              <option value="Qualifying Widow(er)">Qualifying Widow(er)</option> -->
              <option
                v-for="status in maritalStatuses"
                :key="status?.id"
                :value="status?.name?.toLowerCase()"
              >
                {{ status?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="language">Language:</label>
            <select
              v-model="form.generalInfo.language"
              id="language"
              class="form-control"
              :disabled="!isEditing"
            >
              <option disabled value="">Select Language</option>
              <option
                v-for="language in languages"
                :key="language?.id"
                :value="language?.name?.toLowerCase()"
              >
                {{ language?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="incomeType">Income Type:</label>
            <select
              v-model="form.generalInfo.incomeType"
              id="incomeType"
              class="form-control"
              :disabled="!isEditing"
            >
              <option disabled value="">Select Income Type</option>
              <option value="Fixed Income">Fixed Income</option>
              <option value="Retired">Retired</option>
              <option value="1099">1099</option>
              <option value="w2">W2</option>
            </select>
          </div>
          <div class="form-group">
            <label for="employment">Employment Type:</label>
            <select
              v-model="form.generalInfo.employmentType"
              id="employment"
              class="form-control"
              :disabled="!isEditing"
            >
              <option disabled value="">Select Employment Type</option>

              <option
                v-for="type in employmentTypes"
                :key="type?.id"
                :value="type?.name?.toLowerCase()"
              >
                {{ type?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Veteran:</label>
            <div class="checkbox-group">
              <input
                type="checkbox"
                v-model="form.generalInfo.veteran"
                id="fromWithholding"
                :disabled="!isEditing"
              />
            </div>
          </div>

          <div
            v-if="
              form.generalInfo.maritalStatus.toLocaleLowerCase() ===
                'married filing jointly' ||
              form.generalInfo.maritalStatus.toLocaleLowerCase() ===
                'married filing separately'
            "
          >
            <h3>Spouse Information</h3>

            <div class="form-group">
              <label for="spouseFirstName">First Name:</label>
              <input
                type="text"
                v-model="form.generalInfo.spouseFirstName"
                id="spouseFirstName"
                class="form-control"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="spouseLastName">Last Name:</label>
              <input
                type="text"
                v-model="form.generalInfo.spouseLastName"
                id="spouseLastName"
                class="form-control"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="spouseDateOfBirth">Date of Birth:</label>
              <input
                type="date"
                v-model="form.generalInfo.spouseDateOfBirth"
                id="spouseDateOfBirth"
                class="form-control"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="spouseLanguage">Language:</label>
              <select
                v-model="form.generalInfo.spouseLanguage"
                id="spouseLanguage"
                class="form-control"
                disabled
              >
                <option disabled value="">Select Language</option>
                <option
                  v-for="language in languages"
                  :key="language?.id"
                  :value="language?.name?.toLowerCase()"
                >
                  {{ language?.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="spouseIncomeType">Income Type:</label>
              <select
                v-model="form.generalInfo.spouseIncomeType"
                id="spouseIncomeType"
                class="form-control"
                disabled
              >
                <option disabled value="">Select Income Type</option>
                <option value="Fixed Income">Fixed Income</option>
                <option value="Retired">Retired</option>
                <option value="1099">1099</option>
                <option value="w2">W2</option>
              </select>
            </div>
            <div class="form-group">
              <label for="spouseEmploymentType">Employment Type:</label>
              <select
                v-model="form.generalInfo.spouseEmploymentType"
                id="spouseEmploymentType"
                class="form-control"
                disabled
              >
                <option disabled value="">Select Employment Type</option>

                <option
                  v-for="type in employmentTypes"
                  :key="type?.id"
                  :value="type?.name?.toLowerCase()"
                >
                  {{ type?.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Veteran:</label>
              <div class="checkbox-group">
                <input
                  type="checkbox"
                  v-model="form.generalInfo.spouseVeteran"
                  id="fromWithholding"
                  disabled
                />
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <h3>Contact Information</h3>

          <!-- Contact Information Fields -->
          <div class="form-group">
            <label for="home">Home Phone:</label>
            <input
              type="tel"
              v-model="form.contactInfo.home"
              id="home"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="work">Work Phone:</label>
            <input
              type="tel"
              v-model="form.contactInfo.work"
              id="work"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="mobile">Mobile Phone:</label>
            <input
              type="tel"
              v-model="form.contactInfo.mobile"
              id="mobile"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="fax">Fax:</label>
            <input
              type="tel"
              v-model="form.contactInfo.fax"
              id="fax"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="form-control"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="bestTimeToCall">Best Time to Call:</label>
            <input
              type="text"
              v-model="form.contactInfo.bestTimeToCall"
              id="bestTimeToCall"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="smsPermitted">SMS Permitted:</label>
            <input
              type="checkbox"
              v-model="form.contactInfo.smsPermitted"
              id="smsPermitted"
              :disabled="!isEditing"
            />
          </div>

          <!-- Home Address -->
          <h3>Home Address</h3>

          <!-- Home Address Fields -->
          <div class="form-group">
            <label for="homeStreet">Street:</label>
            <input
              type="text"
              v-model="form.homeAddress.street"
              id="homeStreet"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="homeCity">City:</label>
            <input
              type="text"
              v-model="form.homeAddress.city"
              id="homeCity"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="homeState">State:</label>
            <input
              type="text"
              v-model="form.homeAddress.state"
              id="homeState"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="homeZip">Zip Code:</label>
            <input
              type="text"
              v-model="form.homeAddress.zip"
              id="homeZip"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <!-- Mailing Address -->
          <h3>Mailing Address</h3>

          <div class="form-group">
            <input
              type="checkbox"
              v-model="form.mailingAddress.sameAsHome"
              id="sameAsHome"
              :disabled="!isEditing"
            />
            <label for="sameAsHome" class="ml-4">Same as Home Address</label>
          </div>

          <!-- Conditional Rendering of Mailing Address Fields -->
          <div v-if="!form.mailingAddress.sameAsHome">
            <div class="form-group">
              <label for="mailingStreet">Street:</label>
              <input
                type="text"
                v-model="form.mailingAddress.street"
                id="mailingStreet"
                class="form-control"
                :disabled="!isEditing"
              />
            </div>

            <div class="form-group">
              <label for="mailingCity">City:</label>
              <input
                type="text"
                v-model="form.mailingAddress.city"
                id="mailingCity"
                class="form-control"
                :disabled="!isEditing"
              />
            </div>

            <div class="form-group">
              <label for="mailingState">State:</label>
              <input
                type="text"
                v-model="form.mailingAddress.state"
                id="mailingState"
                class="form-control"
                :disabled="!isEditing"
              />
            </div>

            <div class="form-group">
              <label for="mailingZip">Zip Code:</label>
              <input
                type="text"
                v-model="form.mailingAddress.zip"
                id="mailingZip"
                class="form-control"
                :disabled="!isEditing"
              />
            </div>
          </div>

          <!-- <h3>Services Contracted For</h3>

          <div class="form-group">
            <label for="service1">Service 1:</label>
            <select
              v-model="form.services.service1"
              id="service1"
              class="form-control"
            >
              <option value="" default>Select Service</option>
            
              <option
                v-for="service in servicesArray"
                :key="service?.id"
                :value="service?.name?.toLowerCase()"
              >
                {{ service?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="service2">Service 2:</label>
            <select
              v-model="form.services.service2"
              id="service2"
              class="form-control"
            >
              <option value="" default>Select Service</option>

              <option
                v-for="service in servicesArray"
                :key="service?.id"
                :value="service?.name?.toLowerCase()"
              >
                {{ service?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="service3">Service 3:</label>
            <select
              v-model="form.services.service3"
              id="service3"
              class="form-control"
            >
              <option value="" default>Select Service</option>

              <option
                v-for="service in servicesArray"
                :key="service?.id"
                :value="service?.name?.toLowerCase()"
              >
                {{ service?.name }}
              </option>
            </select>
          </div> -->
        </v-col>
        <v-col cols="12" md="1"></v-col>
        <v-col
          cols="12"
          md="5"
          style="border: 1px solid rgb(177, 177, 177); border-radius: 5px"
        >
          <h2>Basic Information (Business)</h2>

          <!-- Business -->
          <h3>Business (Basic)</h3>

          <!-- Employment Fields -->
          <!-- <div class="form-group">
            <label for="employment">Employment:</label>
            <select
              v-model="form.employmentInfo.employment"
              id="employment"
              class="form-control"
            >
              <option disabled value="">Select Employment</option>
            
              <option
                v-for="type in employmentTypes"
                :key="type?.id"
                :value="type?.name?.toLowerCase()"
              >
                {{ type?.name }}
              </option>
            </select>
          </div> -->

          <div class="form-group">
            <label for="typeOfWork">Type of Work:</label>
            <input
              type="text"
              v-model="form.employmentInfo.typeOfWork"
              id="typeOfWork"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="einNumber">Ein Number:</label>
            <input
              type="number"
              v-model="form.generalInfo.einNumber"
              id="einNumber"
              class="form-control"
              @input="limitLength($event, 9)"
              :disabled="!isEditing"
            />
          </div>

          <!-- Signature Title -->
          <div class="form-group">
            <label for="signatureTitle">Signature Title:</label>
            <input
              type="text"
              v-model="form.employmentInfo.signatureTitle"
              id="signatureTitle"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <!-- <h3>Business</h3> -->

          <!-- Business Name -->
          <div class="form-group">
            <label for="businessName">Business Name:</label>
            <input
              type="text"
              v-model="form.employmentInfo.businessName"
              id="businessName"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <!-- Business Type -->
          <div class="form-group">
            <label for="businessType">Business Type:</label>
            <select
              v-model="form.employmentInfo.businessType"
              id="businessType"
              class="form-control"
              :disabled="!isEditing"
            >
              <option disabled value="">Select Business Type</option>
              <option
                v-for="type in businessTypes"
                :key="type?.id"
                :value="type?.name?.toLowerCase()"
              >
                {{ type?.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Business Taxes:</label>
            <div class="checkbox-group">
              <label for="fromWithholding" class="ml-4">
                <input
                  type="checkbox"
                  v-model="form.employmentInfo.taxes.fromWithholding"
                  id="fromWithholding"
                  :disabled="!isEditing"
                />
                From Withholding</label
              >
              <label for="fromProfit" class="ml-4">
                <input
                  type="checkbox"
                  v-model="form.employmentInfo.taxes.fromProfit"
                  id="fromProfit"
                  :disabled="!isEditing"
                />
                From Profit</label
              >
            </div>
          </div>

          <!-- Business Address -->
          <h3>Business Address</h3>

          <!-- Business Address Fields -->
          <div class="form-group">
            <label for="businessStreet">Street:</label>
            <input
              type="text"
              v-model="form.businessAddress.street"
              id="businessStreet"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="businessCity">City:</label>
            <input
              type="text"
              v-model="form.businessAddress.city"
              id="businessCity"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="businessState">State:</label>
            <input
              type="text"
              v-model="form.businessAddress.state"
              id="businessState"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div class="form-group">
            <label for="businessZip">Zip Code:</label>
            <input
              type="text"
              v-model="form.businessAddress.zip"
              id="businessZip"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>
          <!-- Company Information -->
          <h3>Company Information</h3>

          <div class="form-group">
            <label for="isCompanyActive">Is the company still active?</label>
            <select
              v-model="form.companyInfo.isCompanyActive"
              id="isCompanyActive"
              class="form-control"
              :disabled="!isEditing"
            >
              <option value="" disabled>Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div
            v-if="form.companyInfo.isCompanyActive === 'no'"
            class="form-group"
          >
            <label for="closeDate">If closed, when did it close?</label>
            <input
              type="date"
              v-model="form.companyInfo.closeDate"
              id="closeDate"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>

          <div
            v-if="form.companyInfo.isCompanyActive === 'yes'"
            class="form-group"
          >
            <label for="numW2Employees"
              >If open, how many W-2 employees are on payroll?</label
            >
            <input
              type="number"
              v-model="form.companyInfo.numW2Employees"
              id="numW2Employees"
              class="form-control"
              :disabled="!isEditing"
            />
          </div>
        </v-col>
      </v-row>
      <div class="form-buttons" v-if="isEditing">
        <button @click="handleSubmit" class="btn" :disabled="btnLoading">
          <div style="display: flex; gap: 10px; align-items: center">
            <span> Update</span>
            <v-progress-circular
              indeterminate
              color="white"
              :size="16"
              v-if="btnLoading"
            ></v-progress-circular>
          </div>
        </button>
      </div>
    </div>
    <div
      v-else
      style="display: flex; justify-content: center; align-items: center"
      class="mt-4"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-dialog v-model="dialog1" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Basic Information (Personal or Business)</span>
        </v-card-title>
        <v-card-text>
          <p>
            This section gathers general information about you or your business.
            You’ll need to provide:
          </p>
          <ul>
            <li>
              <strong>For Individuals:</strong> Your name, Social Security
              Number (SSN), address, and contact information.
            </li>
            <li>
              <strong>For Businesses:</strong> Your business name, Employer
              Identification Number (EIN), address, and business contact
              information.
            </li>
          </ul>
          <p>
            Make sure to complete this section as accurately as possible to
            avoid delays in processing your forms.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text
            @click="dialog1 = false"
            style="background-color: orange; color: white"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      btnLoading: false,
      dialog1: false,
      isEditing: false,
      languages: [],
      maritalStatuses: [],
      servicesArray: [],
      businessTypes: [],
      employmentTypes: [],

      form: {
        ssn: "",
        email: "",

        generalInfo: {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          maritalStatus: "",
          language: "",
          incomeType: "",
          employmentType: "",
          einNumber: "",
          veteran: false,
          spouseFirstName: "",
          spouseLastName: "",
          spouseDateOfBirth: "",
          spouseLanguage: "",
          spouseIncomeType: "",
          spouseEmploymentType: "",
          spouseVeteran: false,
        },
        contactInfo: {
          home: "",
          work: "",
          mobile: "",
          fax: "",
          bestTimeToCall: "",
          smsPermitted: false,
        },
        homeAddress: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        mailingAddress: {
          sameAsHome: false,
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        // services: {
        //   service1: "",
        //   service2: "",
        //   service3: "",
        // },
        employmentInfo: {
          employment: "",
          typeOfWork: "",
          signatureTitle: "",
          businessName: "",
          businessType: "",
          // incomeType: "",
          employerIdInfo: "",
          taxes: {
            fromWithholding: false,
            fromProfit: false,
          },
        },
        businessAddress: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        companyInfo: {
          isCompanyActive: "",
          closeDate: "",
          numW2Employees: "",
        },
      },
    };
  },
  async mounted() {
    this.loading = true;
    if (this.$route.query.edit === "true") {
      this.isEditing = true;
    }
    await this.getUserBasicInfo();

    await this.getLanguages();
    await this.getMaritalStatuses();
    await this.getBusinessTypes();
    await this.getEmploymentTypes();
    await this.getServices();
    this.loading = false;
  },
  computed: {
    fullName() {
      return `${this.form.generalInfo.firstName} ${this.form.generalInfo.lastName}`;
    },
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
  },
  methods: {
    limitLength(event, maxLength) {
      if (event.target.value.length > maxLength) {
        event.target.value = event.target.value.slice(0, maxLength);
        this.form.generalInfo.einNumber = event.target.value; // Update v-model value
      }
    },
    formatSSN(event) {
      const input = event.target.value;
      this.form.ssn = input.replace(/\D/g, ""); // Remove non-digit characters
    },
    async getUserBasicInfo() {
      const payload = { requestNumber: this.$route.query.requestNumber };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        if (res?.data) {
          this.form.email = res?.data[0]?.email;
          this.form.ssn = res?.data[0]?.ssn;
          this.form.generalInfo = res?.data[0]?.generalInfo;
          this.form.employmentInfo = res?.data[0]?.employmentInfo;
          this.form.services = res?.data[0]?.services;
          this.form.homeAddress = res?.data[0]?.homeAddress;
          this.form.mailingAddress = res?.data[0]?.mailingAddress;
          this.form.contactInfo = res?.data[0]?.contactInfo;
          this.form.businessAddress = res?.data[0]?.businessAddress;
          this.form.companyInfo = res?.data[0]?.companyInfo;
          this.form.summaryInfo = JSON.parse(res?.data[0]?.summary);

          console.log(this.form.summaryInfo, "summary");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      if (this.form.ssn && this.form.ssn.length !== 9) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please write correct ssn.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }
      if (
        !this.form.generalInfo.firstName ||
        !this.form.generalInfo.lastName ||
        !this.form.generalInfo.dateOfBirth ||
        !this.form.generalInfo.maritalStatus ||
        !this.form.generalInfo.language ||
        !this.form.generalInfo.incomeType ||
        !this.form.ssn
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all general info fields.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }
      // if (
      //   !this.form.generalInfo.einNumber ||
      //   !this.form.employmentInfo.typeOfWork ||
      //   !this.form.employmentInfo.signatureTitle ||
      //   !this.form.employmentInfo.businessName ||
      //   !this.form.employmentInfo.businessType
      // ) {
      //   this.$swal.fire({
      //     toast: true,
      //     timerProgressBar: true,
      //     position: "top-end",
      //     icon: "error",
      //     text: "Please fill all Business(basic) fields.",
      //     showConfirmButton: false,
      //     timer: 2000,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", this.$swal.stopTimer);
      //       toast.addEventListener("mouseleave", this.$swal.resumeTimer);
      //     },
      //   });
      //   return;
      // }
      if (!this.form.email) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please add your email.",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      this.btnLoading = true;
      this.form.fullName = this.fullName;

      if (this.$route.query.requestNumber) {
        this.form.requestNumber = this.$route.query.requestNumber;
      } else {
        this.form.summaryInfo = {
          irsLiability: 0,
          totalIncome: 0,
          totalAssets: 0,
          totalExpenses: 0,
        };
      }
      try {
        this.$api.premierService.saveUserGeneralInfo(this.form).then((res) => {
          if (res?.data) {
            // localStorage.setItem("userId", res?.data?.id);
            // localStorage.setItem("requestNumber", res?.data?.requestNumber);
            // localStorage.setItem("email", res?.data?.email);

            // this.$router.push("/tax-evaluation/tax-information");
            const newRequestNumber = res.data.requestNumber;

            this.$swal.fire({
              toast: true,
              timerProgressBar: true,
              position: "top-end",
              icon: "success",
              text: "Basic Info Updated Successfully.",
              showConfirmButton: false,
              timer: 2000,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });
            this.$router.push({
              query: { ...this.$route.query, requestNumber: newRequestNumber },
            });

            this.btnLoading = false;
          } else this.btnLoading = false;
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
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        this.btnLoading = false;
      }
    },
    async getLanguages() {
      await this.$api.premierService
        .getLanguages()
        .then((res) => {
          if (res?.data?.length) {
            this.languages = res?.data;
          }
        })
        .finally(() => {});
    },
    async getMaritalStatuses() {
      await this.$api.premierService
        .getMaritalStatuses()
        .then((res) => {
          if (res?.data?.length) {
            this.maritalStatuses = res?.data;
          }
        })
        .finally(() => {});
    },
    async getServices() {
      await this.$api.premierService
        .getServices()
        .then((res) => {
          if (res?.data?.length) {
            this.servicesArray = res?.data;
          }
        })
        .finally(() => {});
    },
    async getBusinessTypes() {
      await this.$api.premierService
        .getBusinessTypes()
        .then((res) => {
          if (res?.data?.length) {
            this.businessTypes = res?.data;
          }
        })
        .finally(() => {});
    },
    async getEmploymentTypes() {
      await this.$api.premierService
        .getEmploymentTypes()
        .then((res) => {
          if (res?.data?.length) {
            this.employmentTypes = res?.data;
          }
        })
        .finally(() => {});
    },
  },
  watch: {
    "form.mailingAddress.sameAsHome": function (newValue) {
      if (newValue) {
        this.form.mailingAddress.street = this.form.homeAddress.street;
        this.form.mailingAddress.city = this.form.homeAddress.city;
        this.form.mailingAddress.state = this.form.homeAddress.state;
        this.form.mailingAddress.zip = this.form.homeAddress.zip;
      } else {
        this.form.mailingAddress.street = "";
        this.form.mailingAddress.city = "";
        this.form.mailingAddress.state = "";
        this.form.mailingAddress.zip = "";
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 700px;
}

h1,
h2,
h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
  width: 200px; /* Adjust label width as needed */
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.checkbox-group label {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

<style scoped>
form {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 700px;
}

h1,
h2,
h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
  width: 200px; /* Adjust label width as needed */
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.checkbox-group {
  display: flex;
  width: 70%;
}

.checkbox-group label {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 5px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
