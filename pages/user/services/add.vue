<template>
  <div class="pb-6">
    <h1 class="text-center">Premier Tax Debt Solutions Service Form</h1>

    <form @submit.prevent="submit">
      <p>
      <h3>How Our Process Works </h3> <br>
      <ol>
        <li> Qualifying Questions: Our Tax Form Navigator or additional questionnaire asks the right questions to assess
          your eligibility for CNC status, penalty abatement, installment agreements, or an OIC. </li>
        <li> Form Generation: The system generates the IRS forms based on your answers, ensuring they are complete and
          accurate. </li>
        <li> Form Upload and Submission: After you retrieve the forms through the navigator process, upload them to your
          client portal, and we’ll assist in submitting them to the IRS through our SecureTax Send-Off service. </li>
      </ol>

      </p>
      <div class="form-group">
        <label for="full_name">Full Name</label>
        <input type="text" v-model="form.full_name" id="full_name" class="form-control" placeholder="Enter Full Name" />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="text" v-model="form.phone" id="phone" class="form-control" placeholder="Enter Phone Number" />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" v-model="form.email" id="email" class="form-control" placeholder="Enter Email Address" />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" v-model="form.addressInfo.address" id="address" class="form-control"
          placeholder="Enter Address" />
      </div>

      <div class="form-group">
        <label for="state">TIN/SSN Number</label>
        <input type="text" v-model="formattedSSN" @input="formatSSN" id="ssn" class="form-control" maxlength="11"
          placeholder="XXX-XX-XXXX" />
      </div>

      <div class="form-group">
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
      </div>

      <!-- Service Selection -->
      <div class="form-group">
        <label for="serviceSelection">Which service are you selecting?</label>
        <select v-model="form.serviceSelection" id="serviceSelection" class="form-control">
          <option value="" disabled selected>Select Service</option>
          <option value="1">In-depth liaison call</option>
          <option value="2">Fresh start resolution navigator</option>
          <!-- <option value="3">Secure tax sendoff</option> -->
          <option value="4">Tax Relief Pathway</option>
        </select>
      </div>
      <div class="form-group" v-if="form.serviceSelection==='2'">
        <label for="freshStartPackage">Please Select Fresh Start Resolution Navigator Package.</label>
        <select v-model="freshStartPackage" id="freshStartPackage" class="form-control">
          <option value="" disabled selected>Select Package</option>
          <option value="1">Fresh Start Navigator Personal (495$)</option>
          <option value="2">Fresh Start Navigator Business (695$)</option>

        </select>
      </div>
      <div v-if="showPaymentSection" class="my-2">
        <h2>Payment Details</h2>
        <h3 v-if="form.serviceSelection === '1'" style="color:red">Payment Amount: $120</h3>
        <h3 v-if="form.serviceSelection === '3' && !form.freshStartPrograms.penaltyAbatement" style="color:red">Payment Amount: $95</h3>
        <h3 v-if="form.serviceSelection === '3' && form.freshStartPrograms.penaltyAbatement" style="color:red">Payment Amount: $125</h3>

        <h3 v-if="form.serviceSelection === '4'" style="color:red">Payment Amount: $995</h3>
        <h3 v-if="form.serviceSelection === '2' && freshStartPackage==='1'" style="color:red">Payment Amount: $495</h3>
        <h3 v-if="form.serviceSelection === '2' && freshStartPackage==='2'" style="color:red">Payment Amount: $695</h3>


        <!-- <button class="btn btn-primary" @click="payNow">Pay Now</button> -->
      </div>

      <div>
        <h4 class="mb-3">Is this service urgent?</h4>
        <label>
          <input type="radio" v-model="form.urgent" value="yes" />
          Yes
        </label>
        <br />
        <label>
          <input type="radio" v-model="form.urgent" value="no" />
          No
        </label>
        <br />
      </div>

      <div>
        <h4 class="mb-3">
          What Fresh Start Program would You Like to Address? (Check all that
          apply)
        </h4>
        <div>
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.penaltyAbatement" />
            Penalty Abatement
          </label>
          <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.cncStatus" />
            Currently Not Collectible (CNC) Status
          </label>
          <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.installmentAgreement" />
            Installment Agreement
          </label>
          <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.offerInCompromise" />
            Offer in Compromise
          </label>
          <br />
          <label>
            <input type="checkbox" v-model="form.freshStartPrograms.showOtherField" />
            Other (Specify):
          </label>
          <br />
          <input v-if="form.freshStartPrograms.showOtherField" type="text"
            v-model="form.freshStartPrograms.otherProgram" placeholder="Specify Other Program"
            class="form-control mt-2" />
        </div>
      </div>
      <div class="my-2" v-if="form.freshStartPrograms.penaltyAbatement">
        If qualified for First-Time-Penalty Abatement or other penalty abatement
        options, you can proceed with the abatement request. If disqualified,
        you may need to explore other payment or appeal options.
      </div>
      <div class="my-2" v-if="form.freshStartPrograms.cncStatus">
        You can fill out our
        <span @click="$router.push('/terms')" style="color: red; cursor: pointer">
          Tax Form Navigator
        </span>
        to see if you quality for CNC (Low Income).
      </div>
      <div class="my-2" v-if="form.freshStartPrograms.offerInCompromise">
        You can fill out our
        <span @click="$router.push('/terms')" style="color: red; cursor: pointer">
          Tax Form Navigator
        </span>
        to see if you quality for Offer in Compromise.
      </div>

      <!-- Additional Details -->
      <div class="form-group mt-2">
        <label for="additionalDetails">Additional Details or Concerns:</label>
        <textarea id="additionalDetails" v-model="form.additionalDetails" class="form-control" rows="4"
          placeholder="Enter any additional details or concerns"></textarea>
      </div>
      <div class="form-group mt-2">
        <label for="document">Do you have any documents that you would like to attach? (PDF)</label>
        <input type="file" id="document" class="form-control" @change="handleFileUpload" ref="fileInput" multiple        accept=".pdf" />

      </div>

      <!-- Payment Section -->


      <!-- Verbal Agreement Authorization -->
      <div style="display: flex; gap: 10px; align-items: center">
          <input type="checkbox" v-model="form.services" />
          <h3>Acknowledgement of Services:</h3>
        </div>
        <p>
          I understand that Premier Tax Debt Solutions is not a tax firm but provides a streamlined service to assist with the secure submission of my tax documents to the IRS. 
Premier Tax Debt Solutions does not guarantee specific outcomes regarding IRS acceptance or processing timeframes. I acknowledge that confirmation of my document submission 
will be available in my client portal within 5-7 business days, and that official IRS confirmation will be received by mail within a minimum of 30 days.
        </p>
        <div style="display: flex; gap: 10px; align-items: center">
          <input type="checkbox" v-model="form.communicate" />
          <h3>Authorization for Processing Department Submission:
</h3>
        </div>
        <p>
          I authorize the Processing Department of Premier Tax Debt Solutions to submit my completed documents to the IRS as part of the Secure Tax Send-Off service. 
I understand that this authorization does not include any representation or negotiation on my behalf.
        </p>
        <div style="display: flex; gap: 10px; align-items: center">
          <input type="checkbox" v-model="form.verbalAgreement" />
          <h3>Responsibility for Document Accuracy:
</h3>
        </div>
        <p>
          I acknowledge that the information provided on my PDF forms is complete and accurate to the best of my knowledge. I understand that I am fully responsible for the content of the documents 
I upload for submission. Premier Tax Debt Solutions is not responsible for verifying the accuracy of the information before it is sent to the IRS.
        </p>

        <div style="display: flex; gap: 10px; align-items: center">
          <input type="checkbox" v-model="additionalAssistance" />
          <h3>Referrals for Additional Assistance:

</h3>
        </div>
        <p>
          If necessary, I consent to being referred to a third-party professional for further tax assistance. I understand that I will receive a verbal agreement request before any referral is made.
        </p>
      <div class="form-group">
        <label for="electronicSignature">Electronic Signature</label>
        <input type="text" v-model="form.eSignature" id="electronicSignature" class="form-control"
          placeholder="Enter your electronic signature" />
      </div>
      <h2>Terms and Policies</h2>

      <p>
        Please review our full
        <span style="cursor: pointer; font-weight: bold" @click="dialog=true">Terms and Policies</span>
        before proceeding.
      </p>

      <div class="form-buttons">
        <button type="submit" class="btn" :disabled="loading" @click="submit">
          <div style="display: flex; gap: 10px; align-items: center">
            <span> Submit</span>
            <v-progress-circular indeterminate color="white" :size="16" v-if="loading"></v-progress-circular>
          </div>
        </button>
      </div>
    </form>
    <v-dialog v-model="showDialogOne" max-width="800px">
      <v-card>
        <v-card-title class="headline">IRS Penalty Abatement Qualification</v-card-title>
        <v-card-text>
          <v-form>
            <h3>First-Time Penalty Abatement (FTA)</h3>
              <v-label>1. Have you filed all required tax returns? </v-label>
  
              <v-radio-group v-model="answersOne.fta1">
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
                <v-radio label="N/A" value="na"></v-radio>
              </v-radio-group>
              <v-label>2. Have you paid or arranged to pay any taxes owed?</v-label>
              <v-radio-group v-model="answersOne.fta2" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
                <v-radio label="N/A" value="na"></v-radio>
              </v-radio-group>
              <v-label>3. Have you had any penalties in the past 3 years?</v-label>
              <v-radio-group v-model="answersOne.fta3" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
                <v-radio label="N/A" value="na"></v-radio>
              </v-radio-group>
  
              <h3>Reasonable Cause Penalty Abatement</h3>
              <v-label>4. Did circumstances outside your control (e.g., death, serious illness, natural disaster, or inability to obtain records) prevent you from complying with tax laws?</v-label>
              <v-radio-group v-model="answersOne.rcpa1" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
                <v-radio label="N/A" value="na"></v-radio>
              </v-radio-group>
              <p>Note: COVID-19 is considered a natural disaster.</p>
            <v-label>5. Did you make a genuine effort to comply with tax laws but
              still faced challenges?</v-label>

            <v-radio-group v-model="answersOne.rcpa2" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <h3>Administrative Waiver</h3>
            <v-label>6. Did the IRS provide incorrect information that you relied on
              when making a tax-related decision?</v-label>

            <v-radio-group v-model="answersOne.aw1" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <h3>Statutory Exception</h3>
            <v-label>7. Are you disputing a penalty assessed incorrectly?</v-label>
            <v-radio-group v-model="answersOne.se1" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>
          </v-form>

          <!-- Centered submit button -->
          <v-row class="justify-center mt-4">
            <v-btn color="#f0a904" class="mx-auto" @click="validateAnswersOne">Submit</v-btn>
          </v-row>

          <!-- Error messages with margin-top -->
          <v-row class="mt-4" v-if="disqualifiedOne">
            <v-col>
              <v-alert type="error" dismissible>
                <ul>
                  <li v-for="error in errorMessagesOne" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </v-alert>
            </v-col>
          </v-row>

          <!-- Conditionally render Go Back and Quit Form buttons -->
          <v-row v-if="disqualifiedOne" class="mt-4 justify-space-between">
            <v-btn color="warning" @click="goBackOne">Go Back</v-btn>
            <v-btn color="error" @click="quitFormOne">Quit Form</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialogTwo" max-width="800px">
      <v-card>
        <v-card-title class="headline">Installment Agreement Questionnaire</v-card-title>
        <v-card-text>
          <v-form>
            <v-label>1. Do you owe $50,000 or less in combined taxes, penalties, and
              interest?</v-label>
            <v-radio-group v-model="answersTwo.ppq1">
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>2. For businesses, do you owe $25,000 or less in taxes,
              penalties, and interest?</v-label>
            <v-radio-group v-model="answersTwo.ppq2" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>3. Have you filed all required tax returns?</v-label>
            <v-radio-group v-model="answersTwo.ppq3" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>4. Are you able to pay the total amount owed within 72 months or
              the statute of limitations period?</v-label>
            <v-radio-group v-model="answersTwo.ppq4" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>5. Do you owe less than $100,000 in combined taxes, penalties,
              and interest if applying for a short-term plan?</v-label>
            <v-radio-group v-model="answersTwo.ppq5" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>6. Have you entered into an IRS installment agreement within the
              last 5 years?</v-label>
            <v-radio-group v-model="answersTwo.ppq6" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>7. Do you have the ability to make regular monthly
              payments?</v-label>
            <v-radio-group v-model="answersTwo.ppq7" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <v-label>8. Did you default on your previous IRS payment plan within the
              last two years?</v-label>
            <v-radio-group v-model="answersTwo.ppq8" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
              <v-radio label="N/A" value="na"></v-radio>
            </v-radio-group>

            <!-- Additional questions for clients who defaulted on previous plans -->
            <template v-if="answersTwo.ppq8 === 'yes'">
              <v-label>8.1. Do you have a history of multiple defaults on IRS payment
                plans?</v-label>
              <v-radio-group v-model="answersTwo.dpp1" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
              </v-radio-group>
              <div style="color: red" v-if="answersTwo.dpp1 === 'yes'">
                This may disqualify you from a new payment plan or result in
                more stringent requirements.
              </div>

              <v-label>8.2. Are you current on all tax filings and payments?</v-label>
              <v-radio-group v-model="answersTwo.dpp2" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
              </v-radio-group>

              <div style="color: red" v-if="answersTwo.dpp2 === 'no'">
                You must become current before the IRS will consider a new
                payment plan.
              </div>

              <v-label>8.3. Can you provide a reasonable explanation for the previous
                default?</v-label>
              <v-radio-group v-model="answersTwo.dpp3" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
              </v-radio-group>
              <div style="color: red" v-if="answersTwo.dpp3 === 'no'">
                This may make it harder to qualify for a new plan.
              </div>

              <v-label>8.4. Are you able to commit to higher payments or adjusted
                terms?</v-label>
              <v-radio-group v-model="answersTwo.dpp4" row>
                <v-radio label="Yes" value="yes"></v-radio>
                <v-radio label="No" value="no"></v-radio>
              </v-radio-group>
              <div style="color: red" v-if="answersTwo.dpp4 === 'no'">
                The IRS may not approve a new plan without adjusted terms.
              </div>
            </template>
          </v-form>

          <!-- Centered submit button -->
          <v-row class="justify-center mt-4">
            <v-btn color="#f0a904" class="mx-auto" @click="validateAnswersTwo">Submit</v-btn>
          </v-row>

          <!-- Error messages with margin-top -->
          <v-row class="mt-4" v-if="disqualifiedTwo">
            <v-col>
              <v-alert type="error" dismissible>
                <ul>
                  <li v-for="error in errorMessagesTwo" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </v-alert>
            </v-col>
          </v-row>

          <!-- Conditionally render Go Back and Quit Form buttons -->
          <v-row v-if="disqualifiedTwo" class="mt-4 justify-space-between">
            <v-btn color="warning" @click="goBackTwo">Go Back</v-btn>
            <v-btn color="error" @click="quitFormTwo">Quit Form</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="auto" @open="scrollToTop">
      <v-card max-width="1300">
        <v-card-title>
          <v-icon class="me-2">mdi-information</v-icon>
          <span>Premier Tax Debt Solutions Service Agreement</span>
        </v-card-title>
        <v-card-text ref="dialogContent">
          <p class="terms-text">
            <strong>1. Introduction</strong><br>
            By accessing and using the client portal provided by Premier Tax Debt Solutions, you agree to comply with
            and be bound by these Terms and Conditions. Please read them carefully before using the portal. If you do
            not agree to these terms, you must discontinue use of the portal.
          </p>

          <p class="terms-text">
            <strong>2. Scope of Services</strong><br>
            Through our client portal, you will have access to:
          <ul>
            <li>Fresh Start Initiative Program Results: You can view updates related to your eligibility and results for
              the Fresh Start initiative based on the information provided.</li>
            <li>IRS Form Upload: You can upload your IRS forms required for the services you are utilizing. Premier Tax
              Debt Solutions will assist in the submission process.</li>
            <li>Payment Processing: You can pay for our services securely through the client portal.</li>
            <li>Informational Resources: You will have access to educational content related to the Fresh Start
              initiative program and our scope of services, such as penalty abatement, installment agreements, and offer
              in compromise submissions.</li>
          </ul>
          </p>

          <p class="terms-text">
            <strong>3. Client Responsibility</strong><br>
            By using the client portal, you agree to:
          <ul>
            <li>Ensure the accuracy of any information you submit, including but not limited to personal, financial, and
              tax information.</li>
            <li>Understand that any forms you upload will be used solely for assisting in your tax-related filings as
              specified in our service agreement.</li>
            <li>Follow the procedures and guidelines outlined for form submission, updates, and payments.</li>
          </ul>
          </p>

          <p class="terms-text">
            <strong>4. Privacy and Information Sharing</strong><br>
            We take your privacy seriously and will not share your personal information with any third parties unless
            explicitly authorized by you. Information will only be shared for the following reasons:
          <ul>
            <li>Referral Services: If you choose to use our referral services (e.g., for funding or professional
              services), we will obtain your consent before sharing your information with third-party providers.</li>
            <li>Legal Requirements: We may disclose your information to comply with legal obligations or in response to
              lawful requests from public authorities.</li>
          </ul>
          Please refer to our Privacy Policy for more details on how your information is handled.
          </p>

          <p class="terms-text">
            <strong>5. Disclaimer</strong><br>
            You acknowledge that Premier Tax Debt Solutions is not responsible for the approval or denial of IRS
            programs (e.g., Fresh Start, Offer in Compromise). We assist with completing and submitting forms, but
            eligibility and approval are determined solely by the IRS. You also acknowledge that the use of this portal
            does not create any attorney-client or accountant-client relationship. For legal or accounting advice,
            please consult a licensed professional. The full Disclaimer, which includes our No Refund Policy, can be
            accessed via the footer of the website or the Disclaimer page.
          </p>

          <p class="terms-text">
            <strong>6. Payment Terms</strong><br>
            You agree to pay all applicable fees for the services you select through the portal. Payment must be made in
            full prior to service execution. You will be able to make secure payments directly within the portal for
            services such as:
          <ul>
            <li>Fresh Start Initiative assistance</li>
            <li>IRS Form preparation and submission</li>
            <li>Professional referral services (where applicable)</li>
          </ul>
          </p>

          <p class="terms-text">
            <strong>7. Refund Policy</strong><br>
            Premier Tax Debt Solutions has a No Refund Policy for services rendered. All services provided, including
            form preparation, submission assistance, and consultations, are non-refundable once they are completed. For
            more information regarding this policy, please review our Disclaimer section. By using the portal, you agree
            to these terms.
          </p>

          <p class="terms-text">
            <strong>8. Copyright and Intellectual Property</strong><br>
            All content, materials, and information available on the portal, including but not limited to text,
            graphics, logos, icons, and images, are the exclusive property of Premier Tax Debt Solutions. You agree not
            to copy, distribute, or create derivative works from the content without our prior written permission.
          </p>

          <p class="terms-text">
            <strong>9. Limitation of Liability</strong><br>
            Premier Tax Debt Solutions will not be liable for any indirect, incidental, or consequential damages arising
            from your use of the client portal. We are not responsible for delays or issues with form submissions caused
            by external parties, including but not limited to the IRS.
          </p>

          <p class="terms-text">
            <strong>10. Security</strong><br>
            We use industry-standard encryption and security protocols to protect your information and ensure secure
            payments. However, you are responsible for safeguarding your login credentials and notifying us immediately
            if you suspect unauthorized access to your account.
          </p>

          <p class="terms-text">
            <strong>11. Termination of Access</strong><br>
            We reserve the right to terminate your access to the client portal at any time, without notice, if we
            believe you have violated these Terms and Conditions or engaged in any fraudulent or unlawful activity.
          </p>

          <p class="terms-text">
            <strong>12. Amendments to Terms</strong><br>
            Premier Tax Debt Solutions reserves the right to update or modify these Terms and Conditions at any time.
            Changes will be effective immediately upon posting to the portal. Your continued use of the portal signifies
            your acceptance of any revised terms.
          </p>

          <p class="terms-text">
            <strong>13. Governing Law</strong><br>
            These Terms and Conditions are governed by and construed in accordance with the laws of [Insert State],
            without regard to its conflict of laws principles.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" text @click="dialog = false" style="background-color: orange; color: white">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" width="auto" @open="scrollToTop">
      <v-card max-width="400">
        <div class="pa-6">
          <strong>Please have prior 3 year tax filings available during service call.</strong>
        </div>




        <v-card-actions>
          <v-btn class="ms-auto" text @click="$router.push('/user/services')"
            style="background-color: orange; color: white">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  layout: "dashboard",

  data() {
    return {
      templateData:null,
      loading: false,
      dialog: false,
dialog4:false,
      showDialogOne: false,
      disqualifiedOne: false,
      errorMessagesOne: [],
      freshStart:false,
      freshStartPackage:'1',
      answersOne: {
        fta1: null,
        fta2: null,
        fta3: null,
        rcpa1: null,
        rcpa2: null,
        aw1: null,
        se1: null,
      },
      showDialogTwo: false,
      disqualifiedTwo: false,
      errorMessagesTwo: [],
      answersTwo: {
        ppq1: null,
        ppq2: null,
        ppq3: null,
        ppq4: null,
        ppq5: null,
        ppq6: null,
        ppq7: null,
        ppq8: null,
        dpp1: null,
        dpp2: null,
        dpp3: null,
        dpp4: null,
      },
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
        },
        serviceSelection: "",
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
      additionalAssistance: false,

    };
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
        this.form.serviceSelection === "1"  ||  this.form.serviceSelection === "2" || this.form.serviceSelection === "3" || this.form.serviceSelection === "4"
      );
    },
    servicePrice() {
      switch (this.form.serviceSelection) {
        case "1":
          return 120;
          case "2":
            return this.freshStartPackage==='1' ? 495 : 695;
        case "3":
          if(!this.form.freshStartPrograms.penaltyAbatement)        
{
          return 95;
        }
          if (this.form.freshStartPrograms.penaltyAbatement) {
            return 125
          }
          case "4":
          return 995;
        default:
          return 0;
      }
    },
  },
  created() {
    this.getTemplateKeys();
  },
  methods: {
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
    async sendMail(documents) {
  // Set loading to true at the start of the function
  this.loading = true;

  try {
    // Replace backslashes with forward slashes and parse the JSON
    const sanitizedDocuments = documents.replace(/\\/g, "/");
    const urls = JSON.parse(sanitizedDocuments);

    console.log(urls);

    // Helper function to generate the case number
    const generateCaseNumber = () => {
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format
      const randomNum = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
      return `case-${dateStr}-${randomNum}`;
    };

    // Loop through each URL and send an API request
    for (const link of urls) {
      // Initialize FormData for each request
      const formData = new FormData();

      // Append the fields to FormData
      formData.append("to", this.templateData?.to_id);
      formData.append("from", this.templateData?.from_id);
      formData.append("template", this.templateData?.template_id);
      formData.append("addressPlacement", "top_first_page");
      formData.append("doubleSided", true); // String representation
      formData.append("color", false); // String representation
      formData.append("extraService", "certified");
      formData.append("express", false); // String representation
      formData.append("description", "Template with attached PDF");
      formData.append("mergeVariables[language]", "english");
      formData.append("metadata[company]", "adateck");
      formData.append("size", "us_letter");
      formData.append("attachedPDF[placement]", "after_template");
     

      // Clean the link by removing "public/" if it exists
      const cleanedLink = link.replace("public/", "");

      // Remove "/api/" from the BASE_URL if it exists
      const baseUrlWithoutApi = process.env.BASE_URL.replace(/\/api\/$/, "");
      console.log(baseUrlWithoutApi);

      // Combine the cleaned link with the modified base URL
      const fullUrl = `${baseUrlWithoutApi}/${cleanedLink}`;
      console.log("Full URL:", fullUrl); // Log the full URL

      // Append the full URL as the attached PDF file
      formData.append("attachedPDF[file]", fullUrl);

      // Generate a new case number for each request
      const caseNumber = generateCaseNumber();
      formData.append("mergeVariables[case_number]", caseNumber);
      formData.append("metadata[search]", caseNumber);

      // Send the API request
      const response = await axios.post(
        "https://api.postgrid.com/print-mail/v1/letters",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": `test_sk_ehzpB3fyLN1cV4TkWQYVsw`, // Replace with your actual API key
          },
        }
      );

      console.log("Response:", response.data);
    }
  } catch (error) {
    // Log detailed error information
    console.error("Error:", error.response ? error.response.data : error.message);
  } finally {
    // Set loading to false at the end of the function
    this.loading = false;
  }
}

,
    openFormOne() {
      this.showDialogOne = true;
    },
    validateAnswersOne() {
      this.errorMessagesOne = [];

      const { fta1, fta2, fta3, rcpa1, rcpa2, aw1, se1 } = this.answersOne;

      // Ensure all questions are answered
      if (!fta1)
        this.errorMessagesOne.push(
          "Please answer: Have you filed all required tax returns?"
        );
      if (!fta2)
        this.errorMessagesOne.push(
          "Please answer: Have you paid or arranged to pay any taxes owed?"
        );
      if (!fta3)
        this.errorMessagesOne.push(
          "Please answer: Have you had any penalties in the past 3 years?"
        );
      if (!rcpa1)
        this.errorMessagesOne.push(
          "Please answer: Did circumstances outside your control prevent compliance?"
        );
      if (!rcpa2)
        this.errorMessagesOne.push(
          "Please answer: Did you make a genuine effort to comply?"
        );
      if (!aw1)
        this.errorMessagesOne.push(
          "Please answer: Did the IRS provide incorrect information?"
        );
      if (!se1)
        this.errorMessagesOne.push(
          "Please answer: Are you disputing a penalty assessed incorrectly?"
        );

      // Only proceed with further validation if all questions are answered
      if (this.errorMessagesOne.length > 0) {
        this.disqualifiedOne = true;
        return;
      }

      // First-Time Penalty Abatement Validation
      if (fta1 === "no")
          this.errorMessagesOne.push(
            "Q-1 Disqualified due to non-compliance in filing.."
          );
        if (fta2 === "no")
          this.errorMessagesOne.push(
            "Q-2 Disqualified as payment arrangements are required."
          );
        if (fta3 === "yes")
          this.errorMessagesOne.push(
            "Q-3 Disqualified as recent penalties make you ineligible."
          );
  
        // Reasonable Cause Penalty Abatement Validation
        if (rcpa1 === "no")
          this.errorMessagesOne.push(
            "Q-4 Disqualified for lack of reasonable cause."
          );

      if (rcpa2 === "no")
        this.errorMessagesOne.push("Q-5 Lack of genuine effort to comply.");

      // Administrative Waiver Validation
      if (aw1 === "no")
        this.errorMessagesOne.push(
          "Q-6 Disqualified for Administrative Waiver."
        );

      // Statutory Exception Validation
      if (se1 === "no")
        this.errorMessagesOne.push(
          "Q-7 Disqualified for a Statutory Exception."
        );

      // Check if there are any disqualifying answersOne
      if (this.errorMessagesOne.length > 0) {
        this.disqualifiedOne = true;
      } else {
        this.showDialogOne = false;
        if (this.form.freshStartPrograms.installmentAgreement === true) {
          this.showDialogTwo = true;
        } else this.handleSubmit();
      }
    },
    goBackOne() {
      this.disqualifiedOne = false;
      this.errorMessagesOne = [];
      this.showDialogOne = false;
      this.answersOne = {
        fta1: null,
        fta2: null,
        fta3: null,
        rcpa1: null,
        rcpa2: null,
        aw1: null,
        se1: null,
      };
    },
    quitFormOne() {
      this.$router.push("/user/services");
    },
    openFormTwo() {
      this.showDialogTwo = true;
    },
    validateAnswersTwo() {
      this.errorMessagesTwo = [];

      const { ppq1, ppq2, ppq3, ppq4, ppq5, ppq6, ppq7, ppq8 } =
        this.answersTwo;

      // Ensure all questions are answered
      if (!ppq1)
        this.errorMessagesTwo.push(
          "Please answer: Do you owe $50,000 or less in combined taxes?"
        );
      if (!ppq2)
        this.errorMessagesTwo.push(
          "Please answer: For businesses, do you owe $25,000 or less?"
        );
      if (!ppq3)
        this.errorMessagesTwo.push(
          "Please answer: Have you filed all required tax returns?"
        );
      if (!ppq4)
        this.errorMessagesTwo.push(
          "Please answer: Can you pay within 72 months or statute of limitations?"
        );
      if (!ppq5)
        this.errorMessagesTwo.push(
          "Please answer: Do you owe less than $100,000 for short-term plan?"
        );
      if (!ppq6)
        this.errorMessagesTwo.push(
          "Please answer: Have you entered into an IRS installment agreement in the last 5 years?"
        );
      if (!ppq7)
        this.errorMessagesTwo.push(
          "Please answer: Do you have the ability to make regular payments?"
        );
      if (!ppq8)
        this.errorMessagesTwo.push(
          "Please answer: Did you default on your previous IRS payment plan?"
        );

      // Only proceed with further validation if all questions are answered
      if (this.errorMessagesTwo.length > 0) {
        this.disqualifiedTwo = true;
        return;
      }

      // Error logic based on incorrect answers
      if (ppq1 === "no") {
        this.errorMessagesTwo.push(
          "Q-1 You may not qualify for a standard payment plan, but other options may be available."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq2 === "no") {
        this.errorMessagesTwo.push(
          "Q-2 You may not qualify for a standard payment plan, but other options may be available."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq3 === "no") {
        this.errorMessagesTwo.push(
          "Q-3 You will need to file all necessary returns to qualify."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq4 === "no") {
        this.errorMessagesTwo.push(
          "Q-4 You may need to explore other options like an Offer in Compromise."
        );
        this.disqualifiedTwo = true;
      }

      if (ppq5 === "no") {
        this.errorMessagesTwo.push(
          "Q-5 You may need to explore long-term payment options or other alternatives."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq6 === "yes") {
        this.errorMessagesTwo.push(
          "Q-6 This may affect your ability to qualify for a new payment plan."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq7 === "no") {
        this.errorMessagesTwo.push(
          "Q-7 You may need to explore other options like an Offer in Compromise."
        );
        this.disqualifiedTwo = true;
      }
      if (ppq8 === "yes") {
        if (
          this.answersTwo.dpp1 === "yes" ||
          this.answersTwo.dpp2 === "no" ||
          this.answersTwo.dpp3 === "no" ||
          this.answersTwo.dpp4 === "no"
        ) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Please fix the error fields.",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
      }
      if (
        ppq1 !== "no" &&
        ppq2 !== "no" &&
        ppq3 !== "no" &&
        ppq4 !== "no" &&
        ppq7 !== "no" &&
        ppq5 !== "no" &&
        ppq6 !== "yes"
      ) {
        this.disqualifiedTwo = false;
        this.showDialogTwo = false;
        this.handleSubmit();
      }
    },
    goBackTwo() {
      this.disqualifiedTwo = false;
      this.errorMessagesTwo = [];
      this.showDialogTwo = false;
      this.answersTwo = {
        ppq1: null,
        ppq2: null,
        ppq3: null,
        ppq4: null,
        ppq5: null,
        ppq6: null,
        ppq7: null,
        ppq8: null,
        dpp1: null,
        dpp2: null,
        dpp3: null,
        dpp4: null,
      };
    },
    quitFormTwo() {
      this.$router.push("/user/services");
    },
    formatSSN(event) {
      const input = event.target.value;
      this.form.ssn = input.replace(/\D/g, ""); // Remove non-digit characters
    },
    handleFileUpload(event) {
      // console.log(event.target.files);
      this.form.document = event.target.files;
      console.log("Attached files:", this.form.document);
    },

    submit() {
      if (
        !this.form.full_name ||
        !this.form.phone ||
        !this.form.email ||
        !this.form.addressInfo.address ||
        !this.form.ssn ||
        !this.form.initial_payment ||
        !this.form.income_above_threshhold ||
        !this.form.monthly_payment ||
        !this.form.tax_delinquency_reason ||
        !this.form.urgent
      ) {
        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: "Please fill all  fields.",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (!this.form.services) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Acknowlegement of Services is required.",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (!this.form.communicate) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Authorization for Processing Department Submission is required.",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (!this.form.verbalAgreement) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Responsibility for Document Accuracy is required.",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (!this.additionalAssistance) {
          this.$swal.fire({
            toast: true,
            timerProgressBar: true,
            position: "top-end",
            icon: "error",
            text: "Referrals for additional assistance is required.",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
      if (this.form.freshStartPrograms.penaltyAbatement === true) {
        this.showDialogOne = true;
      } else if (this.form.freshStartPrograms.installmentAgreement === true) {
        this.showDialogTwo = true;
      } else this.handleSubmit();
    },
    async handleSubmit() {
      try {
        this.loading = true;

        console.log(this.form.freshStartPrograms);
        const formData = new FormData();
        formData.append("full_name", this.form.full_name);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);
        formData.append("address", this.form.addressInfo.address);
        formData.append("itin_ssn", this.form.ssn);
        formData.append("service_id", Number(this.form.serviceSelection));
        formData.append(
          "fresh_start_program",
          JSON.stringify(this.form.freshStartPrograms)
        );
        formData.append("additional_details", this.form.additionalDetails);
        formData.append(
          "acknowledgement_of_services",
          this.form.services ? 1 : 0
        );
        formData.append(
          "authorization_to_communicate",
          this.form.communicate ? 1 : 0
        );
        formData.append("verbal_agreement", this.form.verbalAgreement ? 1 : 0);
        formData.append("electronic_signature", this.form.eSignature);
        formData.append("status", "Pending Resolution");

        formData.append("is_urgent", this.form.urgent === "yes" ? 1 : 0);
        formData.append("total_price", this.servicePrice);
        formData.append(
          "tax_delinquency_reason",
          this.form.tax_delinquency_reason
        );
        formData.append("monthly_payment", this.form.monthly_payment);
        formData.append("initial_payment", this.form.initial_payment);
        formData.append(
          "income_above_threshhold",
          this.form.income_above_threshhold
        );
        formData.append(
            "extra_values", "" );
        formData.append("is_paid", 0);
        if (this.form.document?.length === 1) {
          formData.append("documents", this.form.document[0]);
        }

        if (this.form.document?.length > 1) {
          for (let i = 0; i < this.form.document?.length; i++) {
            formData.append("documents", this.form.document[i]);

            console.log(this.form.document[i])
          }
        }
        console.log(formData);
        this.$api.premierService.addService(formData).then((res) => {
          if (res?.data) {
            this.$swal.fire({
              toast: true,
              timerProgressBar: true,
              position: "top-end",
              icon: "success",
              text: "Form Submitted Successfully.",
              showConfirmButton: false,
              timer: 5000,
            });
          //   console.log(this.form.document)
          //   if (this.form.document?.length > 0) {
          //  this.sendMail(res?.data?.document_url)
          //   }
          //  else this.loading = false;
          this.loading=false
if (this.form.serviceSelection==='1') {this.dialog4=true} else this.$router.push("/user/services");
            // this.$router.push("/user/services");
          } else this.loading = false;
        });
      } catch (error) {
        this.loading = false;
        console.log(error);

        this.$swal.fire({
          toast: true,
          timerProgressBar: true,
          position: "top-end",
          icon: "error",
          text: error.response?.data || "An error occurred",
          showConfirmButton: false,
          timer: 5000,
        });
      } finally {
      }
    },
    payNow() {
      // Add payment gateway logic here
      console.log("Initiating payment...");
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

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
.mt-4 {
  margin-top: 1.5rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
