<template>
  <div>
    <h1 class="text-center my-4">Form 433b</h1>
    <h2 class="text-center my-4" v-if="paid">
      Please fill any remaining fields or download your form.
    </h2>
    <h2 class="text-center my-4" v-else>
      Please purchase this service to remove watermark.
    </h2>
    <div
      class="form-buttons mb-2"
      style="display: flex; justify-content: center; gap: 10px"
    >
      <button @click="$emit('navigateToMain')" class="btn">
        <div style="display: flex; gap: 10px; align-items: center">
          <span> Previous</span>
        </div>
      </button>
      <button
        @click="pay"
        class="btn"
        :disabled="loadingBtn"
        v-if="!paid && !loading"
      >
        <div style="display: flex; gap: 10px; align-items: center">
          <span> Pay Now</span>
          <v-progress-circular
            indeterminate
            color="white"
            :size="16"
            v-if="loadingBtn"
          ></v-progress-circular>
        </div>
      </button>
    </div>
    <div v-if="!loading">
      <!-- <button @click="editAndDisplayPdf">Edit and View PDF</button> -->

      <div style="display: flex; justify-content: center">
        <iframe
          v-if="pdfUrl"
          :src="pdfUrl"
          :width="$vuetify.breakpoint.mobile ? '90%' : '80%'"
          :height="$vuetify.breakpoint.mobile ? '600px' : '1200px'"
        ></iframe>
      </div>
      <!-- <button v-if="pdfUrl" @click="downloadPdf">Download Edited PDF</button> -->
    </div>
    <div v-else class="text-center mt-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { modifyPdf } from "~/utils/pdfEditor";
import { saveAs } from "file-saver";
import { PDFDocument, PDFTextField, PDFCheckBox, rgb, degrees } from "pdf-lib"; // Import degrees

export default {
  data() {
    return {
      pdfUrl: null,
      modifiedPdfBytes: null,
      userData: null,
      allData: null,

      paid: false,
      loading: false,
      loadingBtn: false,
    };
  },
  async mounted() {
    this.loading = true;

    await this.getUserByRequestNumber();
    await this.getAllDetailsByUserId();
    await this.getAllPayments();

    await this.editAndDisplayPdf();
    this.loading = false;
  },
  methods: {
    getAreaCode(phoneNumber) {
      const match = phoneNumber.match(/^\+1 \((\d{3})\)/);
      return match ? match[1] : "";
    },

    // Function to extract the local number without dashes
    getLocalNumber(phoneNumber) {
      const match = phoneNumber.match(/^\+1 \(\d{3}\) (\d{3})-(\d{4})$/);
      return match ? `${match[1]}${match[2]}` : "";
    },
    formatDateToMMDDYYYY(dateString) {
      if (!dateString) return "";

      const [year, month, day] = dateString.split("-");
      return `${month}${day}${year}`;
    },
    getSSNPart(ssn, part) {
      // Remove dashes from the SSN
      const cleanSSN = ssn.replace(/-/g, "");

      // Ensure the cleaned SSN is 9 digits long
      if (cleanSSN.length !== 9) {
        return ""; // Return empty if the SSN format is incorrect
      }

      switch (part) {
        case "one":
          return cleanSSN.slice(0, 3); // First three digits
        case "two":
          return cleanSSN.slice(3, 5); // 4th and 5th digits
        case "three":
          return cleanSSN.slice(5, 9); // 6th to 9th digits
        default:
          return ""; // Return empty if an invalid part is provided
      }
    },
    async getUserByRequestNumber() {
      const payload = { requestNumber: this.$route.query.requestNumber };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        this.userData = res?.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    calculateTotalIncome() {
      return (
        this?.allData?.businessData?.businessIncome[0]?.amount +
        this?.allData?.businessData?.businessIncome[1]?.amount +
        this?.allData?.businessData?.businessIncome[2]?.amount +
        this?.allData?.businessData?.businessIncome[3]?.amount +
        this?.allData?.businessData?.businessIncome[4]?.amount
      );
    },
    calculateTotalExpenses() {
      return (
        this?.allData?.businessData?.businessExpenses[0]?.amount +
        this?.allData?.businessData?.businessExpenses[1]?.amount +
        this?.allData?.businessData?.businessExpenses[2]?.amount +
        this?.allData?.businessData?.businessExpenses[3]?.amount +
        this?.allData?.businessData?.businessExpenses[4]?.amount +
        this?.allData?.businessData?.businessExpenses[5]?.amount +
        this?.allData?.businessData?.businessExpenses[6]?.amount +
        this?.allData?.businessData?.businessExpenses[7]?.amount +
        this?.allData?.businessData?.businessExpenses[8]?.amount +
        this?.allData?.businessData?.businessExpenses[9]?.amount
      );
    },
    difference() {
      const difference =
        this.calculateTotalIncome() - this.calculateTotalExpenses();

      return difference > 0 ? difference : "0";
    },
    async getAllDetailsByUserId() {
      const payload = { user_id: this.$route.query.userId };
      try {
        const res = await this.$api.premierService.getAllDetailsByUserId(
          payload
        );

        this.allData = res?.data;
        console.log(this.allData);
      } catch (error) {
        console.log(error);
      }
    },
    async editAndDisplayPdf() {
      const response = await fetch(
        "https://api.premiertaxdebtsolutions.com/uploads/funding/1724942675569.pdf"
      );
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const formData = {
        "topmostSubform[0].Page1[0].c1[0].Lines1a-b[0].p1-t4[0]":
          this?.userData?.fullName,
        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_030_0_[0]":
          this?.userData?.ssn || "",

        // "topmostSubform[0].Page1[0].p1-t6[0]": "Text 6",
        "topmostSubform[0].Page1[0].Line1a-f[0].p1_3_1b[0]": `${
          this?.userData?.businessAddress?.street
            ? this?.userData?.businessAddress?.street
            : ""
        }`,
        "topmostSubform[0].Page1[0].Line1a-f[0].p1_5_1bCity[0]": `${
          this?.userData?.businessAddress?.city
            ? this?.userData?.businessAddress?.city
            : ""
        }`,
        "topmostSubform[0].Page1[0].Line1a-f[0].p1_6_1bstate[0]": `${
          this?.userData?.businessAddress?.state
            ? this?.userData?.businessAddress?.state
            : ""
        }`,
        "topmostSubform[0].Page1[0].Line1a-f[0].p1_7_1bZIP[0]": `${
          this?.userData?.businessAddress?.zip
            ? this?.userData?.businessAddress?.zip
            : ""
        }`,

        // "topmostSubform[0].Page1[0].p1-t10[0]": "Text 10",
        "topmostSubform[0].Page1[0].c1[0].C1_01_2a[0]": `${
          (this?.userData?.generalInfo?.maritalStatus ==
            "married filing jointly" ||
            this?.userData?.generalInfo?.maritalStatus ==
              "married filing separately") &&
          true
        }`,

        "topmostSubform[0].Page1[0].c1[0].Line1d[0].p1-t8d[0]": this?.userData
          ?.contactInfo?.mobile
          ? this.getAreaCode(this?.userData?.contactInfo?.mobile)
          : "",
        "topmostSubform[0].Page1[0].c1[0].Line1d[0].p1-t9d[0]": this?.userData
          ?.contactInfo?.mobile
          ? this.getLocalNumber(this?.userData?.contactInfo?.mobile)
          : "",
        "topmostSubform[0].Page1[0].c1[0].Line1c[0].p1-t6c[0]": this?.userData
          ?.contactInfo?.home
          ? this.getAreaCode(this?.userData?.contactInfo?.home)
          : "",
        "topmostSubform[0].Page1[0].c1[0].Line1c[0].p1-t7c[0]": this?.userData
          ?.contactInfo?.home
          ? this.getLocalNumber(this?.userData?.contactInfo?.home)
          : "",
        "topmostSubform[0].Page1[0].c1[0].Line1e[0].p1-t10e[0]": this?.userData
          ?.contactInfo?.work
          ? this.getAreaCode(this?.userData?.contactInfo?.work)
          : "",
        "topmostSubform[0].Page1[0].c1[0].Line1e[0].p1-t11e[0]": this?.userData
          ?.contactInfo?.work
          ? this.getLocalNumber(this?.userData?.contactInfo?.work)
          : "",

        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_031_0_[0]":
          this.formatDateToMMDDYYYY(this?.userData?.generalInfo?.dateOfBirth),
        "topmostSubform[0].Page1[0].Line1a-f[0].p1_1_1a[0]": this?.userData
          ?.employmentInfo?.businessName
          ? this?.userData?.employmentInfo?.businessName
          : "",
        "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].p1_t16_4b[0]": `${
          this?.userData?.businessAddress?.street
            ? this?.userData?.businessAddress?.street
            : ""
        }, ${
          this?.userData?.businessAddress?.city
            ? this?.userData?.businessAddress?.city
            : ""
        }, ${
          this?.userData?.businessAddress?.state
            ? this?.userData?.businessAddress?.state
            : ""
        }, ${
          this?.userData?.businessAddress?.zip
            ? this?.userData?.businessAddress?.zip
            : ""
        }`,

        "topmostSubform[0].Page1[0].Line1a-f[0].p1_11_1e[0]":
          this?.userData?.employmentInfo?.businessType || "",
        "topmostSubform[0].Page1[0].p1_13_2a[0]":
          this?.userData?.generalInfo?.einNumber || "",

        "topmostSubform[0].Page6[0].TotalIncome[0].GrssMnthly25[0]": this
          ?.allData?.businessData?.businessIncome[0]?.amount
          ? this?.allData?.businessData?.businessIncome[0]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalIncome[0].GrossMnthly26[0]": this
          ?.allData?.businessData?.businessIncome[1]?.amount
          ? this?.allData?.businessData?.businessIncome[1]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalIncome[0].GrossMnthly27[0]": this
          ?.allData?.businessData?.businessIncome[2]?.amount
          ? this?.allData?.businessData?.businessIncome[2]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalIncome[0].GrossMnthly28[0]": this
          ?.allData?.businessData?.businessIncome[3]?.amount
          ? this?.allData?.businessData?.businessIncome[3]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalIncome[0].GroosMnthly29[0]": this
          ?.allData?.businessData?.businessIncome[4]?.amount
          ? this?.allData?.businessData?.businessIncome[4]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalIncome[0].GrossMnthly35[0]":
          this.calculateTotalIncome().toString() + ".00",

        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly36[0]": this
          ?.allData?.businessData?.businessExpenses[0]?.amount
          ? this?.allData?.businessData?.businessExpenses[0]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly36[1]": this
          ?.allData?.businessData?.businessExpenses[1]?.amount
          ? this?.allData?.businessData?.businessExpenses[1]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMntly38[0]": this
          ?.allData?.businessData?.businessExpenses[2]?.amount
          ? this?.allData?.businessData?.businessExpenses[2]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly39[0]": this
          ?.allData?.businessData?.businessExpenses[3]?.amount
          ? this?.allData?.businessData?.businessExpenses[3]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly40[0]": this
          ?.allData?.businessData?.businessExpenses[4]?.amount
          ? this?.allData?.businessData?.businessExpenses[4]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly41[0]": this
          ?.allData?.businessData?.businessExpenses[5]?.amount
          ? this?.allData?.businessData?.businessExpenses[5]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly42[0]": this
          ?.allData?.businessData?.businessExpenses[6]?.amount
          ? this?.allData?.businessData?.businessExpenses[6]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnhtly43[0]": this
          ?.allData?.businessData?.businessExpenses[7]?.amount
          ? this?.allData?.businessData?.businessExpenses[7]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly44[0]": this
          ?.allData?.businessData?.businessExpenses[8]?.amount
          ? this?.allData?.businessData?.businessExpenses[8]?.amount.toString() +
            ".00"
          : "0",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly45[0]": this
          ?.allData?.businessData?.businessExpenses[9]?.amount
          ? this?.allData?.businessData?.businessExpenses[9]?.amount.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly48[0]":
          this.calculateTotalExpenses().toString() + ".00",
        "topmostSubform[0].Page6[0].TotalExpenses[0].ActlMnthly49[0]":
          this.difference().toString() + ".00",
      };

      // Iterate over all fields and set their values
      form.getFields().forEach((field) => {
        const name = field.getName();
        const value = formData[name];

        if (field instanceof PDFTextField) {
          // Set value for text fields
          if (value !== undefined) {
            field.setText(value);
          }
        } else if (field instanceof PDFCheckBox) {
          // Set value for checkboxes
          if (value !== undefined) {
            field.check(); // Check the checkbox if true

            if (!value) {
              field.uncheck(); // Uncheck the checkbox if false
            }
          }
        }
      });

      if (!this.paid) {
        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          page.drawText("Premier Tax Debt Solutions", {
            x: width / 2 - 200,
            y: height / 1.4,
            size: 50,
            opacity: 0.8,
            rotate: degrees(-45),
            color: rgb(255 / 255, 179 / 255, 0 / 255), // Converted to [0, 1] range
          });
        });
      }

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      this.pdfUrl = URL.createObjectURL(blob);
    },
    async pay() {
      const payload = {
        label: "form_433b",
        payment_service: "Form 433b",
        type: "tax_form_navigator",
        type_id: this.$route.query.requestNumber,
      };
      if (
        this.$auth.user?.role_id === 1 &&
        this.$route.path.includes("admin")
      ) {
        payload.from = `admin-433b&requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}`;
      } else if (
        this.$auth.user?.role_id === 2 &&
        this.$route.path.includes("user")
      ) {
        payload.from = `user-433b&requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}`;
      }
      try {
        this.loadingBtn = true;
        const res = await this.$api.premierService.userPaymentCheckoutForm(
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
    async getAllPayments() {
      const payload = {
        type: "tax_form_navigator",
        type_id: this.$route.query.requestNumber,
      };
      try {
        const res = await this.$api.premierService.getAllPayments(payload);
        if (res.data && Array.isArray(res.data)) {
          res.data.forEach((payment) => {
            if (
              payment.payment_service === "Form 433b" &&
              payment.payment_status === "completed"
            ) {
              this.paid = true;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
