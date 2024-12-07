<template>
  <div>
    <h1 class="text-center my-4">
      Download Forms
      <v-btn icon @click="dialog = true"
        ><v-icon md>mdi-information</v-icon></v-btn
      >
    </h1>
    <div style="display: flex; justify-content: center">
      <div class="summary-main">
        <v-row>
          <v-col
            v-for="(form, index) in forms"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="text-center"
          >
            <v-card style="background-color: #2c7671; color: white">
              <v-card-title class="headline">{{ form?.name }}</v-card-title>
              <v-card-subtitle class="white--text">{{
                form?.description
              }}</v-card-subtitle>
              <v-card-text class="display-1 text-center" style="color: #f0a904">
                ${{ form?.price ? form?.price : 0 }}
              </v-card-text>
              <v-row justify="center">
                <v-col cols="11">
                  <button
                    class="btn"
                    :disabled="loading"
                    @click="viewForm(form)"
                  >
                    <div style="display: flex; gap: 10px; align-items: center">
                      <span> View</span>
                      <v-progress-circular
                        indeterminate
                        color="white"
                        :size="16"
                        v-if="loading"
                      ></v-progress-circular>
                    </div></button
                ></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <div class="form-buttons">
          <button type="button" @click="prevPage" class="btn">Previous</button>
          <button
            type="submit"
            class="btn"
            :disabled="loading"
            @click="startOver"
          >
            <div style="display: flex; gap: 10px; align-items: center">
              <span> Finish</span>
              <v-progress-circular
                indeterminate
                color="white"
                :size="16"
                v-if="loading"
              ></v-progress-circular>
            </div>
          </button>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="800">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Which Forms are Needed for IRS Fresh Start Programs?</span>
        </v-card-title>
        <v-card-text>
          <p>
            At Premier Tax Debt Solutions, we simplify the process of completing
            the necessary IRS forms to help you resolve your tax debt. Below is
            a quick guide to the forms you'll need depending on your situation:
          </p>
          <h3>1. Penalty Abatement</h3>
          <p>
            <strong>Form 843:</strong> Used to request abatement (removal) of
            penalties for failing to file or pay taxes on time. This form helps
            reduce penalties if you qualify under IRS guidelines, such as for
            reasonable cause (e.g., illness, disaster).
          </p>
          <h3>2. Offer in Compromise</h3>
          <p>
            <strong>Form 656:</strong> This form is used to submit an Offer in
            Compromise, which allows you to settle your tax debt for less than
            the full amount owed, if you meet specific eligibility requirements.
          </p>
          <p>
            <strong>Form 433-A (OIC):</strong> Required to provide your
            financial information when applying for an Offer in Compromise for
            individuals. It shows your assets, income, and expenses to the IRS.
          </p>
          <p>
            <strong>Form 433-B (OIC):</strong> Used for businesses applying for
            an Offer in Compromise, detailing the business’s financial
            situation.
          </p>
          <h3>3. Installment Agreement</h3>
          <p>
            <strong>Form 9465:</strong> Use this form to request a monthly
            payment plan if you can’t pay your tax debt in full at the time it’s
            due. This form sets up an installment agreement with the IRS to pay
            off your debt over time.
          </p>
          <h3>4. Payment Plan</h3>
          <p>
            <strong>Form 9465 (also applies here):</strong> For those who need
            to request a specific IRS payment plan. This form applies whether
            you're setting up a short-term or long-term installment agreement.
          </p>
          <h3>Need Help Completing Your Forms?</h3>
          <p>
            Our Tax Form Navigator service makes it easy for you to complete the
            right forms, accurately and efficiently. We’ll walk you through the
            process and ensure everything is submitted correctly to the IRS. Let
            us help you get back on track with less hassle!
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
    </v-dialog>
  </div>
</template>

<script>
import PDF_GLOBAL_LAYOUT from "~/helper/pdfGlobalFormat";
import { PDFDocument } from "pdf-lib";

export default {
  data() {
    return {
      loading: false,
      dialog: false,

      userData: null,
      totalIrsLiability: null, // Example value
      totalEquity: null, // Example value
      monthlyExpenses: 5, // Example value
      allowableExpenses: null, // Example value
      lumpSum: {
        requiredFutureIncome: null, // Example value
        offerAmount: null, // Example value
        initialPayment: null, // Example value
        potentialSavings: null, // Example value
      },
      periodicPayment: {
        requiredFutureIncome: null, // Example value
        offerAmount: null, // Example value
        initialPayment: null, // Example value
        potentialSavings: null, // Example value
      },
      forms: [],
      formLinks: {
        form843:
          "https://api.premiertaxdebtsolutions.com/uploads/assistance/1724850612146.pdf",
        form656b:
          "https://api.premiertaxdebtsolutions.com/uploads/assistance/1724946035354.pdf",
        form433a:
          "https://api.premiertaxdebtsolutions.com/uploads/funding/1724942675568.pdf",
        form433b:
          "https://api.premiertaxdebtsolutions.com/uploads/funding/1724942675569.pdf",
        // form2848: "",
      },
    };
  },

  async mounted() {
    await this.getFormNumbers();
    await this.getUserByRequestNumber();
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
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        this.userData = res?.data[0];

        const summary = JSON.parse(res?.data[0]?.summary);
        this.totalAssets = summary?.totalAssets;
        this.monthlyIncome = summary?.totalIncome;
        this.allowableExpenses = summary?.totalExpenses;
        this.totalIrsLiability = summary?.irsLiability;
      } catch (error) {
        console.log(error);
      }
    },
    viewForm(file) {
      console.log(file?.id);

      switch (file?.id) {
        case 1:
          this.$router.push("/tax-evaluation/forms/656b");
          break;
        case 2:
          this.$router.push("/tax-evaluation/forms/843");
          break;
        case 3:
          this.$router.push("/tax-evaluation/forms/433a");
          break;
        case 4:
          this.$router.push("/tax-evaluation/forms/433b");
          break;
        case 5:
          this.$router.push("/tax-evaluation/forms/9465");
          break;
        case 6:
          this.$router.push("/tax-evaluation/forms/433f");
          break;
        default:
          console.log("No matching file ID");
          break;
      }
    },
    async completeForm() {
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.completeForm(payload);
        if (res) {
          localStorage.clear();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async download843() {
      // Fetch the existing PDF

      this.loading = true;
      const existingPdfBytes = await fetch(this.formLinks.form843).then((res) =>
        res.arrayBuffer()
      );

      // Load the PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const formData = {
        "topmostSubform[0].Page1[0].p1-t1[0]": this?.userData?.fullName,
        "topmostSubform[0].Page1[0].p1-t2[0]": this?.userData?.ssn,
        "topmostSubform[0].Page1[0].p1-t5[0]": this?.userData?.homeAddress
          ?.street
          ? this?.userData?.homeAddress?.street
          : "",
        // "topmostSubform[0].Page1[0].p1-t6[0]": "Text 6",
        "topmostSubform[0].Page1[0].p1-t9[0]": `${
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
        "topmostSubform[0].Page1[0].p1-t12[0]": `${
          this?.userData?.mailingAddress?.city
            ? this?.userData?.mailingAddress?.city
            : ""
        }, ${
          this?.userData?.mailingAddress?.state
            ? this?.userData?.mailingAddress?.state
            : ""
        }, ${
          this?.userData?.mailingAddress?.zip
            ? this?.userData?.mailingAddress?.zip
            : ""
        }`,
        "topmostSubform[0].Page1[0].p1-t13[0]": this?.userData?.contactInfo
          ?.mobile
          ? this?.userData?.contactInfo?.mobile
          : "",
        // "topmostSubform[0].Page1[0].Line1[0].p1-t15[0]": "Text 15",
        // "topmostSubform[0].Page1[0].Line1[0].p1-t18[0]": "Text 18",
        // "topmostSubform[0].Page1[0].p1-t21[0]": "Text 21",
        // "topmostSubform[0].Page1[0].p1-cb1[0]": true,
        // "topmostSubform[0].Page1[0].p1-cb1[1]": false,
        // "topmostSubform[0].Page1[0].p1-cb1[2]": true,
        // "topmostSubform[0].Page1[0].p1-cb1[3]": false,
        // "topmostSubform[0].Page1[0].p1-cb1[4]": true,
        // "topmostSubform[0].Page1[0].p1-cb1[5]": false,
        "topmostSubform[0].Page1[0].p1-t22[0]": "Text 22",
        // "topmostSubform[0].Page1[0].p1-cb6[0]": true,
        // "topmostSubform[0].Page1[0].p1-cb6[1]": false,
        // "topmostSubform[0].Page1[0].p1-cb6[2]": true,
        "topmostSubform[0].Page1[0].p1-t23[0]": "Text 23",
        // "topmostSubform[0].Page1[0].p1-cb9[0]": true,
        // "topmostSubform[0].Page1[0].p1-cb9[1]": false,
        // "topmostSubform[0].Page1[0].p1-cb9[2]": true,
        // "topmostSubform[0].Page1[0].p1-cb9[3]": false,
        // "topmostSubform[0].Page1[0].p1-cb9[4]": true,
        // "topmostSubform[0].Page1[0].p1-cb9[5]": false,
        // "topmostSubform[0].Page1[0].p1-cb9[6]": true,
        // "topmostSubform[0].Page1[0].p1-cb9[7]": false,
        // "topmostSubform[0].Page1[0].p1-cb9[8]": true,
        // "topmostSubform[0].Page1[0].p1-cb9[9]": false,
        // "topmostSubform[0].Page1[0].p1-cb9[10]": true,
        "topmostSubform[0].Page1[0].p1-t24[0]": "Text 24",
        "topmostSubform[0].Page1[0].p1-t25[0]": "Text 25",
        // "topmostSubform[0].Page1[0].p1_t26[0]": "Text 26",
        // "topmostSubform[0].Page1[0].c1_7_0_[0]": true,
        // "topmostSubform[0].Page1[0].f1_65_0_[0]": "Text 65",
        // "topmostSubform[0].Page1[0].f1_66_0_[0]": "Text 66",
        // "topmostSubform[0].Page1[0].f1_68_0_[0]": "Text 68",
        // "topmostSubform[0].Page1[0].f1_69_0_[0]": "Text 69",
        // "topmostSubform[0].Page1[0].f1_73_0_[0]": "Text 73",
        // Add more fields and their values as needed
      };

      // Iterate over all fields and set their values
      form.getFields().forEach((field) => {
        const name = field.getName();
        const value = formData[name];

        if (field.constructor.name === "PDFTextField") {
          // Set value for text fields
          if (value !== undefined) {
            field.setText(value);
          }
        } else if (field.constructor.name === "PDFCheckBox") {
          // Set value for checkboxes
          if (value !== undefined) {
            field.check(); // Check the checkbox if true
            if (!value) {
              field.uncheck(); // Uncheck the checkbox if false
            }
          }
        }
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `form843-${this?.userData?.fullName}.pdf`;
      link.click();
      this.loading = false;
    },
    async download656b() {
      this.loading = true;

      const existingPdfBytes = await fetch(this.formLinks.form656b).then(
        (res) => res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const formData = {
        "topmostSubform[0].F656_Page1[0].#subform[1].Your_First_Middle_Last_Name[0]":
          this?.userData?.fullName,
        "topmostSubform[0].F656_Page1[0].#subform[1].YourSSN[0].Your_SSN_1[0]":
          this?.userData?.ssn && this.getSSNPart(this?.userData?.ssn, "one"),
        "topmostSubform[0].F656_Page1[0].#subform[1].YourSSN[0].Your_SSN_2[0]":
          this?.userData?.ssn && this.getSSNPart(this?.userData?.ssn, "two"),
        "topmostSubform[0].F656_Page1[0].#subform[1].YourSSN[0].Your_SSN_3[0]":
          this?.userData?.ssn && this.getSSNPart(this?.userData?.ssn, "three"),

        // "topmostSubform[0].Page1[0].p1-t6[0]": "Text 6",

        "topmostSubform[0].F656_Page1[0].#subform[1].Your_Home_Address[0]": `${
          this?.userData?.homeAddress?.street
            ? `${this?.userData?.homeAddress?.street},`
            : ""
        } ${
          this?.userData?.homeAddress?.city
            ? `${this?.userData?.homeAddress?.city},`
            : ""
        } ${
          this?.userData?.homeAddress?.state
            ? `${this?.userData?.homeAddress?.state},`
            : ""
        } ${
          this?.userData?.homeAddress?.zip
            ? this?.userData?.homeAddress?.zip
            : ""
        }`,
        "topmostSubform[0].F656_Page1[0].#subform[1].Your_Mailing_Address[0]": `${
          this?.userData?.mailingAddress?.street
            ? `${this?.userData?.mailingAddress?.street},`
            : ""
        } ${
          this?.userData?.mailingAddress?.city
            ? `${this?.userData?.mailingAddress?.city},`
            : ""
        } ${
          this?.userData?.mailingAddress?.state
            ? `${this?.userData?.mailingAddress?.state},`
            : ""
        } ${
          this?.userData?.mailingAddress?.zip
            ? this?.userData?.mailingAddress?.zip
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
        "topmostSubform[0].F656_Page2[0].Business_Name[0]": this?.userData
          ?.employmentInfo?.businessName
          ? this?.userData?.employmentInfo?.businessName
          : "",
        "topmostSubform[0].F656_Page2[0].Business_Address[0]": `${
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
          this?.userData?.employmentInfo?.businessType &&
          this?.userData?.employmentInfo?.businessType,

        // "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].p1_t15_4a[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
      };

      // Iterate over all fields and set their values
      form.getFields().forEach((field) => {
        const name = field.getName();
        const value = formData[name];

        if (field.constructor.name === "PDFTextField") {
          // Set value for text fields
          if (value !== undefined) {
            field.setText(value);
          }
        } else if (field.constructor.name === "PDFCheckBox") {
          // Set value for checkboxes
          if (value !== undefined) {
            field.check(); // Check the checkbox if true
            if (!value) {
              field.uncheck(); // Uncheck the checkbox if false
            }
          }
        }
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `form656-${this?.userData?.fullName}.pdf`;
      link.click();
      this.loading = false;
    },
    async download433a() {
      this.loading = true;

      const existingPdfBytes = await fetch(this.formLinks.form433a).then(
        (res) => res.arrayBuffer()
      );

      // Load the PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Define your data to fill the form fields

      const businessType =
        this?.userData?.employmentInfo?.businessType?.toLowerCase();
      const excludeList = ["llc", "partnership", "corp"];

      const shouldPrintBusinessType =
        businessType &&
        !excludeList.some((type) => businessType.includes(type));
      const formData = {
        "topmostSubform[0].Page1[0].c1[0].Lines1a-b[0].p1-t4[0]":
          this?.userData?.fullName,
        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_030_0_[0]":
          this?.userData?.ssn,

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
          this?.userData?.employmentInfo?.businessType.includes(
            "partnership"
          ) && true,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].LLC[0]":
          this?.userData?.employmentInfo?.businessType.includes("llc") && true,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].Corporation[0]":
          this?.userData?.employmentInfo?.businessType.includes("corp") && true,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].Other[0]":
          shouldPrintBusinessType && true,
        "topmostSubform[0].Page1[0].c2[0].Line3c[0].ListOther[0]":
          shouldPrintBusinessType ? businessType : "",
        // "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].p1_t15_4a[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
      };

      // Iterate over all fields and set their values
      form.getFields().forEach((field) => {
        const name = field.getName();
        const value = formData[name];

        if (field.constructor.name === "PDFTextField") {
          // Set value for text fields
          if (value !== undefined) {
            field.setText(value);
          }
        } else if (field.constructor.name === "PDFCheckBox") {
          // Set value for checkboxes
          if (value !== undefined) {
            field.check(); // Check the checkbox if true
            if (!value) {
              field.uncheck(); // Uncheck the checkbox if false
            }
          }
        }
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `form433a-${this?.userData?.fullName}.pdf`;
      link.click();
      this.loading = false;
    },
    async download433b() {
      this.loading = true;

      const existingPdfBytes = await fetch(this.formLinks.form433b).then(
        (res) => res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const formData = {
        "topmostSubform[0].Page1[0].c1[0].Lines1a-b[0].p1-t4[0]":
          this?.userData?.fullName,
        "topmostSubform[0].Page1[0].c1[0].Table_Part4-Line5[0].Row1[0].F02_030_0_[0]":
          this?.userData?.ssn,

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
          this?.userData?.employmentInfo?.businessType &&
          this?.userData?.employmentInfo?.businessType,

        // "topmostSubform[0].Page1[0].Taxpayer\.L4a-h[0].p1_t15_4a[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
        // "topmostSubform[0].Page1[0].c2[0].Lines3b[0].BusinessName[0]": this
        //   ?.userData?.employmentInfo?.businessName
        //   ? this?.userData?.employmentInfo?.businessName
        //   : "",
      };

      // Iterate over all fields and set their values
      form.getFields().forEach((field) => {
        const name = field.getName();
        const value = formData[name];

        if (field.constructor.name === "PDFTextField") {
          // Set value for text fields
          if (value !== undefined) {
            field.setText(value);
          }
        } else if (field.constructor.name === "PDFCheckBox") {
          // Set value for checkboxes
          if (value !== undefined) {
            field.check(); // Check the checkbox if true
            if (!value) {
              field.uncheck(); // Uncheck the checkbox if false
            }
          }
        }
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `form433b-${this?.userData?.fullName}.pdf`;
      link.click();
      this.loading = false;
    },

    async getFormNumbers() {
      await this.$api.premierService
        .getFormNumbers()
        .then((res) => {
          if (res?.data?.length) {
            this.forms = res?.data;
          }
        })
        .finally(() => {});
    },
    prevPage() {
      this.$router.push("/tax-evaluation/summary");
    },
    startOver() {
      this.completeForm();

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.form-control-2 {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.summary-main {
  margin: 0 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 1200px;
}
.btn-download {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-download:hover {
  background-color: #45a049;
}

.download-table thead tr th,
.download-table tbody tr td {
  text-align: center;
  width: 50%;
}
</style>
<style scoped>
.v-card {
  margin: 20px 0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

  min-height: 280px;
}
.v-card-title {
  font-weight: bold;
  text-align: center;
}
.v-card-subtitle {
  text-align: center;
  color: #666;
}
.v-card-text {
  font-weight: bold;
  color: #4caf50;
}
.headline {
  font-size: 19px !important;
  justify-content: center;
  min-height: 130px;
}
</style>
