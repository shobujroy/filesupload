<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center"
    fill-height
  >
    <v-card class="pa-4" style="width: 100%">
      <!-- Payment Verification Status Display -->
      <v-card-title class="justify-center" v-if="status === 'verifying'">
        Verifying Payment
      </v-card-title>
      <v-card-text>
        <!-- Loader for Verifying Status -->
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="status === 'verifying'"
        ></v-progress-circular>
        <!-- Payment Successful Message -->
        <v-card-title class="justify-center" v-if="status === 'redirecting'">
          Payment Verified Successfully!
        </v-card-title>
        <!-- Loader and Redirect Message for Redirecting Status -->
        <div v-if="status === 'redirecting'" class="mt-4">
          Redirecting...
          <v-progress-circular
            indeterminate
            color="primary"
            class="ml-2"
          ></v-progress-circular>
        </div>
        <!-- Error Message Display -->
        <v-card-title
          class="justify-center text-error"
          v-if="status === 'error'"
        >
          Payment Verification Failed!
        </v-card-title>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      status: "verifying", // Default status set to "verifying"
      templateData: null,
      allData: null,
      toId: null,
      taxpayerAddresses: [
        {
          formType: "Form 1040",
          states: [
            "Alaska",
            "Arizona",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District of Columbia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Montana",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "North Dakota",
            "Oregon",
            "Rhode Island",
            "South Dakota",
            "Tennessee",
            "Utah",
            "Vermont",
            "Washington",
            "Wisconsin",
            "Wyoming",
          ],
          contactId: "contact_7xZBmYxSwmMovhxsb6XHzf",
        },
        {
          formType: "Form 1040",
          states: [
            "Alabama",
            "Florida",
            "Georgia",
            "Kentucky",
            "Louisiana",
            "Mississippi",
            "North Carolina",
            "South Carolina",
            "Texas",
            "Virginia",
          ],
          contactId: "contact_gB6Bz8Spn6WZZBFnz4LvvK",
        },
        {
          formType: "Form 1040",
          states: [
            "Arkansas",
            "California",
            "Indiana",
            "Iowa",
            "Kansas",
            "Michigan",
            "Minnesota",
            "Missouri",
            "Nebraska",
            "New York",
            "Ohio",
            "Oklahoma",
            "Pennsylvania",
            "West Virginia",
          ],
          contactId: "contact_gqBLNS58ZcZDSbGCak4jmN",
        },
        {
          formType: "Other than Form 1040",
          states: [
            "Connecticut",
            "Maine",
            "Massachusetts",
            "New Hampshire",
            "New York",
            "Rhode Island",
            "Vermont",
          ],
          contactId: "contact_3ha3jmfYB1joGB1ZQnTfQi",
        },
        {
          formType: "Other than Form 1040",
          states: [
            "Alabama",
            "Arkansas",
            "Georgia",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Nebraska",
            "New Jersey",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Pennsylvania",
            "South Dakota",
            "Tennessee",
            "Texas",
            "West Virginia",
            "Wisconsin",
          ],
          contactId: "contact_m6Hk2GeCgebMtT3qLGHVq2",
        },
        {
          formType: "Other than Form 1040",
          states: [
            "Alaska",
            "Arizona",
            "California",
            "Colorado",
            "Hawaii",
            "Idaho",
            "Montana",
            "Nevada",
            "New Mexico",
            "Oregon",
            "Utah",
            "Washington",
            "Wyoming",
          ],
          contactId: "contact_jf4vJiWasKeYLy86NA1rSE",
        },
        {
          formType: "Other than Form 1040",
          states: [
            "District of Columbia",
            "Delaware",
            "Florida",
            "Maryland",
            "North Carolina",
            "South Carolina",
            "Virginia",
          ],
          contactId: "contact_tCAT1DERFFSufbFeByLre6",
        },
      ],
    };
  },
  layout(context) {
    // Determine the layout based on query parameters or other conditions using context
    const serviceType = context.route.query.url;
    if (
      serviceType === "user-service" ||
      serviceType === "admin-service" ||
      serviceType.includes("admin") ||
      serviceType.includes("user")
    ) {
      return "dashboard"; // Use the 'dashboard' layout for specific services
    } else {
      return "default"; // Fallback to default layout if no condition is met
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      await this.getDetailsById();
      await this.getTemplateKeys();
    }
    await this.verifyPayment(); // Trigger payment verification on mount
  },
  methods: {
    async getDetailsById() {
      this.loading = true;
      try {
        const res = await this.$api.premierService.getServiceByUserId(
          this.$route.query.id
        );
        if (res?.data) {
          this.allData = res.data;
        }
        // handle successful response
      } catch (error) {
        console.log(error.response.data);
      } finally {
        this.loading = false;
      }
    },
    async getTemplateKeys() {
      try {
        this.loading = true;
        const response = await this.$api.premierService.getTemplateKeys(); // Adjust the API call as necessary
        if (response?.data) {
          this.templateData = response.data;
        }
      } catch (error) {
        console.error("Error fetching letter data:", error);
        // You might want to handle the error or notify the user
      } finally {
        this.loading = false;
      }
    },
    async sendMail(document) {
      // Set loading to true at the start of the function
      this.loading = true;

      try {
        // Replace backslashes with forward slashes and parse the JSON
        const sanitizedDocument = this?.allData?.document_url.replace(
          /\\/g,
          "/"
        );
        const url = JSON.parse(sanitizedDocument);

        console.log("URL:", url);

        // Helper function to generate the case number

        // Initialize FormData for the single request
        const formData = new FormData();

        // Append the fields to FormData
        formData.append("to", this.toId);
        formData.append("from", this.allData?.extra_values?.fromId);
        formData.append("template", this.templateData?.template_id);
        formData.append("addressPlacement", "top_first_page");
        formData.append("doubleSided", true); // String representation
        formData.append("color", false); // String representation
        formData.append("extraService", "certified");
        formData.append("express", false); // String representation
        formData.append("description", "Template with attached PDF");
        formData.append("mergeVariables[language]", "english");
        // formData.append("metadata[company]", "adateck");
        formData.append("size", "us_letter");
        formData.append("attachedPDF[placement]", "after_template");

        // Clean the link by removing "public/" if it exists
        const cleanedLink = url[0].replace("public/", "");

        // Remove "/api/" from the BASE_URL if it exists
        const baseUrlWithoutApi = process.env.BASE_URL.replace(/\/api\/$/, "");

        // Combine the cleaned link with the modified base URL
        const fullUrl = `${baseUrlWithoutApi}/${cleanedLink}`;
        // const fullUrl = `https://backend.premiertaxdebtsolutions.com/uploads/1731063504886.pdf`;
        console.log("Full URL:", fullUrl); // Log the full URL

        // Append the full URL as the attached PDF file
        formData.append("attachedPDF[file]", fullUrl);

        // Generate a case number for the request
        // const caseNumber = generateCaseNumber();
        formData.append(
          "mergeVariables[case_number]",
          this?.allData?.case_number
        );

        // Send the API request
        const response = await axios.post(
          "https://api.postgrid.com/print-mail/v1/letters",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": process.env.X_API_KEY, // Replace with your actual API key
            },
          }
        );

        const payloadTwo = {
          email: this?.allData?.email,
          message: this?.allData,
          subject: "Submission Received – SecureTax Send-Off Processing",
          key: "secure_tax_send_off",
        };

        this.$api.premierService.sendEmail(payloadTwo).then((res) => {
          console.log(res);
        });

        console.log("Response:", response.data);
      } catch (error) {
        // Log detailed error information
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        // Set loading to false at the end of the function
        this.loading = false;
      }
    },

    async verifyPayment() {
      try {
        // Extract payment ID from the URL query parameters
        const paymentId = this.$route.query.payment_id;
        if (!paymentId) {
          throw new Error("Missing payment ID.");
        }
        let response = null;
        if (this.$route.query.url === "user-service") {
          response = await this.$api.premierService.userPaymentSuccess({
            payment_id: paymentId,
          });

          if (this.$route.query.id) {
            console.log(this.$route.query.form == 9465, "trueeee");
            if (
              this.$route.query.form == 9465 ||
              this.$route.query.form == 433
            ) {
              console.log("if state working");
              const is1040 =
                this.$route.query.form == 433 ||
                this.allData.extra_values.formFiling1040 === "yes";
              const state = this.allData.extra_values.state;

              // Find the taxpayer address entry with the matching form type and state
              const match = this.taxpayerAddresses.find((address) => {
                return (
                  address.formType ===
                    (is1040 ? "Form 1040" : "Other than Form 1040") &&
                  address.states.includes(state)
                );
              });

              console.log(match, match.contactId, "matchid");

              // If a match is found, save the contact ID to this.toId
              if (match) {
                this.toId = match.contactId;
                this.sendMail();
              } else {
                console.warn(
                  "No matching address found for the specified state and form type."
                );
              }
            } else if ((this.$route.query.form = 843)) {
              this.toId = "contact_7XcigmpDHgP5BqzZczbeeq";
              this.sendMail();
            }
          }
        } else if (this.$route.query.url === "admin-service") {
          response = await this.$api.premierService.adminPaymentSuccess({
            payment_id: paymentId,
          });
          if (this.$route.query.id) {
            console.log(this.$route.query.form == 9465, "trueeee");
            if (
              this.$route.query.form == 9465 ||
              this.$route.query.form == 433
            ) {
              console.log("if state working");
              const is1040 =
                this.$route.query.form == 433 ||
                this.allData.extra_values.formFiling1040 === "yes";
              const state = this.allData.extra_values.state;

              // Find the taxpayer address entry with the matching form type and state
              const match = this.taxpayerAddresses.find((address) => {
                return (
                  address.formType ===
                    (is1040 ? "Form 1040" : "Other than Form 1040") &&
                  address.states.includes(state)
                );
              });

              console.log(match, match.contactId, "matchid");

              // If a match is found, save the contact ID to this.toId
              if (match) {
                this.toId = match.contactId;
                this.sendMail();
              } else {
                console.warn(
                  "No matching address found for the specified state and form type."
                );
              }
            } else if ((this.$route.query.form = 843)) {
              this.toId = "contact_7XcigmpDHgP5BqzZczbeeq";
              this.sendMail();
            }
          }
        } else {
          response = await this.$api.premierService.userPaymentSuccessForm({
            payment_id: paymentId,
          });
        }
        console.log(response.success);
        // Assuming a successful response contains a `success` key
        if (response.success) {
          this.status = "redirecting";

          // Redirect to the specified URL after a delay
          setTimeout(() => {
            if (this.$route.query.url === "tax-evaluation-433a") {
              this.$router.push("/tax-evaluation/forms/433a");
            } else if (this.$route.query.url === "user-service") {
              this.$router.push("/user/services");
            } else if (this.$route.query.url === "admin-service") {
              this.$router.push("/admin/services");
            } else if (this.$route.query.url === "tax-evaluation-433b") {
              this.$router.push("/tax-evaluation/forms/433b");
            } else if (this.$route.query.url === "tax-evaluation-656") {
              this.$router.push("/tax-evaluation/forms/656b");
            } else if (this.$route.query.url === "tax-evaluation-843") {
              this.$router.push("/tax-evaluation/forms/843");
            } else if (this.$route.query.url === "tax-evaluation-9465") {
              this.$router.push("/tax-evaluation/forms/9465");
            } else if (this.$route.query.url === "tax-evaluation-433f") {
              this.$router.push("/tax-evaluation/forms/433f");
            } else if (
              this.$route.query.url === "admin-433a" ||
              this.$route.query.url === "admin-433b" ||
              this.$route.query.url === "admin-843" ||
              this.$route.query.url === "admin-656b" ||
              this.$route.query.url === "admin-9465" ||
              this.$route.query.url === "admin-433f"
            ) {
              this.$router.push(
                `/admin/forms/details?requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}&edit=false`
              );
            } else if (
              this.$route.query.url === "user-433a" ||
              this.$route.query.url === "user-433b" ||
              this.$route.query.url === "user-843" ||
              this.$route.query.url === "user-656b" ||
              this.$route.query.url === "user-9465" ||
              this.$route.query.url === "user-433f"
            ) {
              this.$router.push(
                `/user/forms/details?requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}&edit=false`
              );
            }
          }, 2000);
        } else {
          throw new Error("Payment verification failed.");
        }
      } catch (error) {
        // Set status to error if the verification fails
        this.status = "error";
        console.error("Payment verification error:", error);
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
}
.text-error {
  color: #ff5252;
}
</style>
