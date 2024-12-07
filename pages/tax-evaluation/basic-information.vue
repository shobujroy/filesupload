<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center my-4">
          Basic Information
          <v-btn icon @click="dialog1 = true"
            ><v-icon md>mdi-information</v-icon></v-btn
          >
        </h1>
      </v-col>
    </v-row>
    <h4 class="text-center">
      Please make sure to click Next Button to save your data.
    </h4>
    <div style="padding: 25px">
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
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              v-model="form.generalInfo.lastName"
              id="lastName"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              v-model="form.generalInfo.dateOfBirth"
              id="dateOfBirth"
              class="form-control"
            />
          </div>

          <!-- <div class="form-group">
            <label for="ssn">SSN:</label>
            <input
              type="text"
              v-model="formattedSSN"
              @input="formatSSN"
              id="ssn"
              class="form-control"
              maxlength="11"
              placeholder="XXX-XX-XXXX"
            />
          </div> -->

          <div class="form-group">
            <label for="maritalStatus">Marital Status:</label>
            <select
              v-model="form.generalInfo.maritalStatus"
              id="maritalStatus"
              class="form-control"
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
              />
            </div>

            <div class="form-group">
              <label for="spouseLastName">Last Name:</label>
              <input
                type="text"
                v-model="form.generalInfo.spouseLastName"
                id="spouseLastName"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="spouseDateOfBirth">Date of Birth:</label>
              <input
                type="date"
                v-model="form.generalInfo.spouseDateOfBirth"
                id="spouseDateOfBirth"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="spouseLanguage">Language:</label>
              <select
                v-model="form.generalInfo.spouseLanguage"
                id="spouseLanguage"
                class="form-control"
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
            />
          </div>

          <div class="form-group">
            <label for="work">Work Phone:</label>
            <input
              type="tel"
              v-model="form.contactInfo.work"
              id="work"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="mobile">Mobile Phone:</label>
            <input
              type="tel"
              v-model="form.contactInfo.mobile"
              id="mobile"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="fax">Fax:</label>
            <input
              type="tel"
              v-model="form.contactInfo.fax"
              id="fax"
              class="form-control"
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
            />
          </div>

          <div class="form-group">
            <label for="smsPermitted">SMS Permitted:</label>
            <input
              type="checkbox"
              v-model="form.contactInfo.smsPermitted"
              id="smsPermitted"
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
            />
          </div>

          <div class="form-group">
            <label for="homeCity">City:</label>
            <input
              type="text"
              v-model="form.homeAddress.city"
              id="homeCity"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="homeState">State:</label>
            <input
              type="text"
              v-model="form.homeAddress.state"
              id="homeState"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="homeZip">Zip Code:</label>
            <input
              type="text"
              v-model="form.homeAddress.zip"
              id="homeZip"
              class="form-control"
            />
          </div>

          <!-- Mailing Address -->
          <h3>Mailing Address</h3>

          <div class="form-group">
            <input
              type="checkbox"
              v-model="form.mailingAddress.sameAsHome"
              id="sameAsHome"
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
              />
            </div>

            <div class="form-group">
              <label for="mailingCity">City:</label>
              <input
                type="text"
                v-model="form.mailingAddress.city"
                id="mailingCity"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="mailingState">State:</label>
              <input
                type="text"
                v-model="form.mailingAddress.state"
                id="mailingState"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="mailingZip">Zip Code:</label>
              <input
                type="text"
                v-model="form.mailingAddress.zip"
                id="mailingZip"
                class="form-control"
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
            />
          </div>

          <!-- Business Type -->
          <div class="form-group">
            <label for="businessType">Business Type:</label>
            <select
              v-model="form.employmentInfo.businessType"
              id="businessType"
              class="form-control"
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
                />
                From Withholding</label
              >
              <label for="fromProfit" class="ml-4">
                <input
                  type="checkbox"
                  v-model="form.employmentInfo.taxes.fromProfit"
                  id="fromProfit"
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
            />
          </div>

          <div class="form-group">
            <label for="businessCity">City:</label>
            <input
              type="text"
              v-model="form.businessAddress.city"
              id="businessCity"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="businessState">State:</label>
            <input
              type="text"
              v-model="form.businessAddress.state"
              id="businessState"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="businessZip">Zip Code:</label>
            <input
              type="text"
              v-model="form.businessAddress.zip"
              id="businessZip"
              class="form-control"
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
            />
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="11">
          <div class="form-buttons">
            <button disabled class="btn">Previous</button>
            <button @click="handleSubmit" class="btn" :disabled="loading">
              <div style="display: flex; gap: 10px; align-items: center">
                <span> Next</span>
                <v-progress-circular
                  indeterminate
                  color="white"
                  :size="16"
                  v-if="loading"
                ></v-progress-circular>
              </div>
            </button>
          </div>
        </v-col>
      </v-row>
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
      dialog1: false,
      languages: [],
      maritalStatuses: [],
      servicesArray: [],
      businessTypes: [],
      employmentTypes: [],

      form: {
        ssn: "",
        email: "",
        isEmailSent: false,

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

        employmentInfo: {
          employment: "",
          typeOfWork: "",
          signatureTitle: "",
          businessName: "",
          businessType: "",
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
    if (!localStorage.getItem("email")) {
      this.$router.push("/terms");
    } else {
      this.form.email = localStorage.getItem("email");
    }
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("requestNumber")
    ) {
      this.form.email = localStorage.getItem("email");
      await this.getUserBasicInfo();
    }

    await this.getLanguages();
    await this.getMaritalStatuses();
    await this.getBusinessTypes();
    await this.getEmploymentTypes();
    await this.getServices();
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
      const payload = { email: localStorage.getItem("email") };
      try {
        const res = await this.$api.premierService.getUserByEmail(payload);
        if (res?.data?.data?.length) {
          this.form.ssn = res?.data?.data[res?.data?.data?.length - 1]?.ssn;
          this.form.generalInfo =
            res?.data?.data[res?.data?.data?.length - 1]?.generalInfo;
          this.form.employmentInfo =
            res?.data?.data[res?.data?.data?.length - 1]?.employmentInfo;
          this.form.services =
            res?.data?.data[res?.data?.data?.length - 1]?.services;
          this.form.homeAddress =
            res?.data?.data[res?.data?.data?.length - 1]?.homeAddress;
          this.form.mailingAddress =
            res?.data?.data[res?.data?.data?.length - 1]?.mailingAddress;
          this.form.contactInfo =
            res?.data?.data[res?.data?.data?.length - 1]?.contactInfo;
          this.form.businessAddress =
            res?.data?.data[res?.data?.data?.length - 1]?.businessAddress;
          this.form.companyInfo =
            res?.data?.data[res?.data?.data?.length - 1]?.companyInfo;
          this.form.summaryInfo = JSON.parse(
            res?.data?.data[res?.data?.data?.length - 1]?.summary
          );
          this.form.isEmailSent =
            res?.data?.data[res?.data?.data?.length - 1]?.isEmailSent;

          console.log(this.form.summaryInfo, "summary");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      // if (this.form.ssn && this.form.ssn.length !== 9) {
      //   this.$swal.fire({
      //     toast: true,
      //     timerProgressBar: true,
      //     position: "top-end",
      //     icon: "error",
      //     text: "Please write correct ssn.",
      //     showConfirmButton: false,
      //     timer: 5000,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", this.$swal.stopTimer);
      //       toast.addEventListener("mouseleave", this.$swal.resumeTimer);
      //     },
      //   });
      //   return;
      // }
      if (
        !this.form.generalInfo.firstName ||
        !this.form.generalInfo.lastName ||
        !this.form.generalInfo.dateOfBirth ||
        !this.form.generalInfo.maritalStatus ||
        !this.form.generalInfo.language ||
        !this.form.generalInfo.incomeType
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all general info fields.",
          showConfirmButton: false,
          timer: 5000,
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
      //     timer: 5000,
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
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$swal.stopTimer);
            toast.addEventListener("mouseleave", this.$swal.resumeTimer);
          },
        });
        return;
      }

      this.loading = true;
      this.form.fullName = this.fullName;

      if (localStorage.getItem("requestNumber")) {
        this.form.requestNumber = localStorage.getItem("requestNumber");
      } else {
        this.form.summaryInfo = {
          irsLiability: 0,
          totalIncome: 0,
          totalAssets: 0,
          totalExpenses: 0,
        };
      }
      try {
        if (!this.form.isEmailSent) {
          const payload = {
            email: this.form.email,
            message: this.form,
            subject: "Premier Tax Debt Solutions - Tax Form Navigator",
            key: "tax_form_navigator",
          };
          await this.$api.premierService.sendEmail(payload).then((res) => {
            if (res?.status) {
            }
          });
          let data = {
            email: this.form.email,
            password: "Pa$$wOrd",
            first_name: this.form.generalInfo.firstName,
            last_name: this.form.generalInfo.lastName,
            role_id: 2,
          };

          await this.$api.authService.register(data).then((response) => {
            console.log(response);
          });
          this.form.isEmailSent = true;
        }

        this.$api.premierService.saveUserGeneralInfo(this.form).then((res) => {
          if (res?.data) {
            localStorage.setItem("userId", res?.data?.id);
            localStorage.setItem("requestNumber", res?.data?.requestNumber);
            localStorage.setItem("email", res?.data?.email);

            this.$router.push("/tax-evaluation/tax-information");

            this.loading = false;
          } else this.loading = false;
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
  justify-content: space-between;
  margin-top: 20px;
}
</style>
