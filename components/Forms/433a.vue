<template>
  <div>
    <h1 class="text-center my-4">Form 433a</h1>
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
    async getAllDetailsByUserId() {
      const payload = { user_id: this.$route.query.userId };
      try {
        const res = await this.$api.premierService.getAllDetailsByUserId(
          payload
        );

        this.allData = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
    calculateRentalIncome(rentalIncome, rentalExpenses) {
      if (rentalIncome - rentalExpenses > 0) {
        return rentalIncome - rentalExpenses;
      } else {
        return "0";
      }
    },
    calculatePrimaryTaxPayerTotal() {
      return (
        Number(this.allData?.income[0]?.primaryTaxPayer.wages) +
        Number(this.allData?.income[0]?.primaryTaxPayer.socialSecurity) +
        Number(this.allData?.income[0]?.primaryTaxPayer.pension)
      );
    },
    calculateSpouseOtherContributorsTotal() {
      return (
        Number(this.allData?.income[0]?.spouseOtherContributors.wages) +
        Number(
          this.allData?.income[0]?.spouseOtherContributors.socialSecurity
        ) +
        Number(this.allData?.income[0]?.spouseOtherContributors.pension)
      );
    },
    calculateRentalNet() {
      return (
        Number(this.allData?.income[0]?.rental.rentalIncome) -
        Number(this.allData?.income[0]?.rental.rentalExpenses)
      );
    },
    totalExpenses() {
      return this.allData?.expenses
        .reduce((sum, expense) => sum + Number(expense.actualExpense), 0)
        .toFixed(2);
    },
    difference() {
      return (this?.calculateTotalIncome() - this.totalExpenses()).toFixed(2);
    },
    calculateTotalIncome() {
      const primary = this.calculatePrimaryTaxPayerTotal();
      const spouse = this.calculateSpouseOtherContributorsTotal();
      const rental = this.calculateRentalNet();
      const otherIncomeSources =
        Number(this.allData?.income[0]?.dividendsInterest?.value) +
        Number(this.allData?.income[0]?.distributions?.value) +
        Number(this.allData?.income[0]?.alimony?.value) +
        Number(this.allData?.income[0]?.childSupport?.value) +
        Number(this.allData?.income[0]?.otherRent?.value) +
        Number(this.allData?.income[0]?.otherIncome1?.value) +
        Number(this.allData?.income[0]?.otherIncome2?.value) +
        Number(
          this?.allData?.businessData?.netBusinessIncome > 0
            ? this?.allData?.businessData?.netBusinessIncome
            : "0"
        );

      return (primary + spouse + rental + otherIncomeSources).toFixed(2);
    },
    async editAndDisplayPdf() {
      const response = await fetch(
        "https://api.premiertaxdebtsolutions.com/uploads/funding/1724942675568.pdf"
      );
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const businessType =
        this?.userData?.employmentInfo?.businessType?.toLowerCase() || "";
      const excludeList = ["llc", "partnership", "corp"];

      const shouldPrintBusinessType =
        businessType &&
        !excludeList.some((type) => businessType?.includes(type));
      const formData = {
        "topmostSubform[0].Page1[0].c1[0].Lines1a-b[0].p1-t4[0]":
          this?.userData?.fullName,
        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_030_0_[0]":
          this?.userData?.ssn || "",

        // "topmostSubform[0].Page1[0].p1-t6[0]": "Text 6",
        "topmostSubform[0].Page1[0].c1[0].Lines1a-b[0].p1-t5[0]": `${
          this?.userData?.homeAddress?.street
            ? this?.userData?.homeAddress?.street
            : ""
        }, ${
          this?.userData?.homeAddress?.city
            ? this?.userData?.homeAddress?.city
            : ""
        }, ${
          this?.userData?.homeAddress?.state
            ? this?.userData?.homeAddress?.state
            : ""
        }, ${
          this?.userData?.homeAddress?.zip
            ? this?.userData?.homeAddress?.zip
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
        "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].Line4cWork[0].p1-t17_4c[0]":
          this?.userData?.contactInfo?.work
            ? this.getAreaCode(this?.userData?.contactInfo?.work)
            : "",
        "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].Line4cWork[0].p1-t18_4c[0]":
          this?.userData?.contactInfo?.work
            ? this.getLocalNumber(this?.userData?.contactInfo?.work)
            : "",

        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_031_0_[0]":
          this.formatDateToMMDDYYYY(this?.userData?.generalInfo?.dateOfBirth),
        "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
          ?.userData?.employmentInfo?.businessName
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

        "topmostSubform[0].Page1[0].c2[0].Line3c[0].Partnership[0]":
          this?.userData?.employmentInfo?.businessType?.includes("partnership")
            ? true
            : false,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].LLC[0]":
          this?.userData?.employmentInfo?.businessType?.includes("llc")
            ? true
            : false,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].Corporation[0]":
          this?.userData?.employmentInfo?.businessType?.includes("corp")
            ? true
            : false,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].Other[0]":
          shouldPrintBusinessType ? true : false,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].ListOther[0]":
          shouldPrintBusinessType ? businessType : "",
        "topmostSubform[0].Page2[0].p2-t1_11[0]":
          this?.allData?.assets[1]?.marketValue,
        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t57_20[0]": this?.allData
          ?.income[0]?.primaryTaxPayer?.wages
          ? this?.allData?.income[0]?.primaryTaxPayer?.wages.toString() + ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t69_26[0]": this?.allData
          ?.income[0]?.primaryTaxPayer?.pension
          ? this?.allData?.income[0]?.primaryTaxPayer?.pension.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t73_28[0]": this?.allData
          ?.income[0]?.primaryTaxPayer?.socialSecurity
          ? this?.allData?.income[0]?.primaryTaxPayer?.socialSecurity.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t59_21[0]": this?.allData
          ?.income[0]?.spouseOtherContributors?.wages
          ? this?.allData?.income[0]?.spouseOtherContributors?.wages.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t71_27[0]": this?.allData
          ?.income[0]?.spouseOtherContributors?.pension
          ? this?.allData?.income[0]?.spouseOtherContributors?.pension.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t75_29[0]": this?.allData
          ?.income[0]?.spouseOtherContributors?.socialSecurity
          ? this?.allData?.income[0]?.spouseOtherContributors?.socialSecurity.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t61_22[0]": this?.allData
          ?.income[0]?.dividendsInterest?.value
          ? this?.allData?.income[0]?.dividendsInterest?.value.toString() +
            ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t65_24[0]":
          this.calculateRentalIncome(
            this?.allData?.income[0]?.rental?.rentalIncome,
            this?.allData?.income[0]?.rental?.rentalExpenses
          ).toString() + ".00",
        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t67_25[0]": this?.allData
          ?.income[0]?.distributions?.value
          ? this?.allData?.income[0]?.distributions?.value.toString() + ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t81_31[0]": this?.allData
          ?.income[0]?.alimony?.value
          ? this?.allData?.income[0]?.alimony?.value.toString() + ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t79_30[0]": this?.allData
          ?.income[0]?.childSupport?.value
          ? this?.allData?.income[0]?.childSupport?.value.toString() + ".00"
          : "0",

        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t63_23[0]":
          this?.allData?.businessData?.netBusinessIncome > 0
            ? this?.allData?.businessData?.netBusinessIncome.toString()
            : "0",
        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t81_34[0]":
          this.calculateTotalIncome().toString(),
        "topmostSubform[0].Page4[0].TotalIncome[0].Blank32[0]": "Other Income",
        "topmostSubform[0].Page4[0].TotalIncome[0].Blank33[0]":
          "Other Income 2+3",
        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t81_32[0]": this?.allData
          ?.income[0]?.otherRent?.value
          ? this?.allData?.income[0]?.otherRent?.value.toString() + ".00"
          : "0",
        "topmostSubform[0].Page4[0].TotalIncome[0].p3_t81_33[0]":
          (
            this?.allData?.income[0]?.otherIncome1?.value +
            this?.allData?.income[0]?.otherIncome2?.value
          ).toString() + ".00",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t58_35[0]": this
          ?.allData?.expenses[0]?.actualExpense
          ? this?.allData?.expenses[0]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t60_36[0]": this
          ?.allData?.expenses[1]?.actualExpense
          ? this?.allData?.expenses[1]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t62_37[0]": this
          ?.allData?.expenses[2]?.actualExpense
          ? this?.allData?.expenses[2]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t64_38[0]": this
          ?.allData?.expenses[3]?.actualExpense
          ? this?.allData?.expenses[3]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t66_39[0]": this
          ?.allData?.expenses[4]?.actualExpense
          ? this?.allData?.expenses[4]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t68_40[0]": this
          ?.allData?.expenses[5]?.actualExpense
          ? this?.allData?.expenses[5]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t70_41[0]": this
          ?.allData?.expenses[6]?.actualExpense
          ? this?.allData?.expenses[6]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t72_42[0]": this
          ?.allData?.expenses[7]?.actualExpense
          ? this?.allData?.expenses[7]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t74_43[0]": this
          ?.allData?.expenses[8]?.actualExpense
          ? this?.allData?.expenses[8]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t76_44[0]": this
          ?.allData?.expenses[9]?.actualExpense
          ? this?.allData?.expenses[9]?.actualExpense.toString()
          : "0",

        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t78_45[0]": this
          ?.allData?.expenses[10]?.actualExpense
          ? this?.allData?.expenses[10]?.actualExpense.toString()
          : "0",
        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t80_46[0]": this
          ?.allData?.expenses[11]?.actualExpense
          ? this?.allData?.expenses[11]?.actualExpense.toString()
          : "0",
        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t82_47[0]": this
          ?.allData?.expenses[12]?.actualExpense
          ? this?.allData?.expenses[12]?.actualExpense.toString()
          : "0",
        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t83_48[0]": this
          ?.allData?.expenses[13]?.actualExpense
          ? this?.allData?.expenses[13]?.actualExpense.toString()
          : "0",
        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t84_49[0]":
          this.totalExpenses().toString(),
        "topmostSubform[0].Page4[0].TotalLivingExpenses[0].p3_t85_50[0]":
          this.difference().toString(),
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
        label: "form_433a",
        payment_service: "Form 433a",
        type: "tax_form_navigator",
        type_id: this.$route.query.requestNumber,
      };
      if (
        this.$auth.user?.role_id === 1 &&
        this.$route.path.includes("admin")
      ) {
        payload.from = `admin-433a&requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}`;
      } else if (
        this.$auth.user?.role_id === 2 &&
        this.$route.path.includes("user")
      ) {
        payload.from = `user-433a&requestNumber=${this.$route.query.requestNumber}&userId=${this.$route.query.userId}`;
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
              payment.payment_service === "Form 433a" &&
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
