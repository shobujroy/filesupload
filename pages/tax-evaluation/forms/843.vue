<template>
  <div>
    <h1 class="text-center my-4">Form 843</h1>
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
      <button @click="$router.push('/tax-evaluation/forms')" class="btn">
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
      paid: false,
      loading: false,
      loadingBtn: false,
    };
  },
  async mounted() {
    this.loading = true;
    await this.getUserByRequestNumber();
    await this.getAllPayments();

    await this.editAndDisplayPdf();
    this.loading = false;
  },
  methods: {
    async getUserByRequestNumber() {
      const payload = { requestNumber: localStorage.getItem("requestNumber") };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );

        this.userData = res?.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async editAndDisplayPdf() {
      const response = await fetch(
        "https://api.premiertaxdebtsolutions.com/uploads/assistance/1724850612146.pdf"
      );
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      // Define your data to fill the form fields
      const formData = {
        "topmostSubform[0].Page1[0].p1-t1[0]": this?.userData?.fullName,
        "topmostSubform[0].Page1[0].p1-t2[0]": this?.userData?.ssn || "",
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
        "topmostSubform[0].Page1[0].p1-t10[0]":
          this?.userData?.generalInfo?.einNumber || "",
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
        // "topmostSubform[0].Page1[0].p1-t22[0]": "Click to edit",
        // "topmostSubform[0].Page1[0].p1-cb6[0]": true,
        // "topmostSubform[0].Page1[0].p1-cb6[1]": false,
        // "topmostSubform[0].Page1[0].p1-cb6[2]": true,
        // "topmostSubform[0].Page1[0].p1-t23[0]": "Text 23",
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
        // "topmostSubform[0].Page1[0].p1-t24[0]": "Text 24",
        // "topmostSubform[0].Page1[0].p1-t25[0]": "Text 25",
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
        label: "form_843",
        payment_service: "Form 843",
        type: "tax_form_navigator",
        type_id: localStorage.getItem("requestNumber"),
        from: "tax-evaluation-843",
      };
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
        type_id: localStorage.getItem("requestNumber"),
      };
      try {
        const res = await this.$api.premierService.getAllPayments(payload);
        if (res.data && Array.isArray(res.data)) {
          res.data.forEach((payment) => {
            if (
              payment.payment_service === "Form 843" &&
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
