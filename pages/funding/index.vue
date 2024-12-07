<template>
  <div>
    <Breadcrumb mainLink="/" mainText="Home" pageTitle="Funding" />
    <div class="my-6 pb-6 main-container">
      <div class="mid-container">
        <v-container>
          <v-row>
            <v-col>
              <p>
                At Premier Tax Debt Solutions, we understand the importance of
                securing the right funding to manage your tax obligations or
                grow your business. We’ve partnered with a private party
                company, the private lender, to offer flexible and accessible
                funding options tailored to your unique needs. Whether you’re
                looking to use the loan for personal or business purposes, or to
                address tax liabilities, we’ve got you covered.
              </p>

              <h2>1. Explore Our Funding Programs</h2>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Term Loans</v-list-item-title>
                    <v-list-item-subtitle>
                      Secure funding with fixed monthly payments and full
                      liquidity within 7-15 business days. You can receive up to
                      $500,000 for personal use or up to $1 million for business
                      purposes.
                    </v-list-item-subtitle>
                    <ul>
                      <li>
                        <strong>Requirements:</strong> 680+ personal credit
                        scores across all three bureaus and two years of
                        personal tax returns showing $50,000 or more of taxable
                        income.
                      </li>
                      <li>
                        <strong>Benefits:</strong> Rates range from 9-15%, no
                        upfront fees, and no minimum length of time in business
                        required.
                      </li>
                    </ul>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Business Credit Card Program</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      Build your business credit with 0% interest for the first
                      6-12 months.
                    </v-list-item-subtitle>
                    <ul>
                      <li>
                        <strong>Requirements:</strong> 700+ personal credit
                        scores across all three bureaus and an established
                        business entity.
                      </li>
                      <li>
                        <strong>Benefits:</strong> Stated income, no upfront
                        fees, and access to additional working capital.
                      </li>
                    </ul>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Personal Credit Card Program</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      Get personal credit cards with access to national lenders
                      and become eligible for future funding options.
                    </v-list-item-subtitle>
                    <ul>
                      <li>
                        <strong>Requirements:</strong> 700+ personal credit
                        scores across all three bureaus.
                      </li>
                      <li>
                        <strong>Benefits:</strong> Maximize the amount of
                        funding received with no minimum length of time in
                        business required.
                      </li>
                    </ul>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <h2>2. Apply for Funding</h2>
              <p>
                Ready to secure the funding you need? Our application process is
                straightforward and designed to get you funded quickly.
              </p>
              <v-btn
                color="#f0a904"
                href="https://preferredfundinggroup.wufoo.com/forms/zsqjlo70y0wtbk/"
                target="_blank"
                class="mb-2"
              >
                Apply Now
              </v-btn>

              <!-- <h2>3. Consult with Our Experts</h2>
              <p>
                Not sure which funding option is best for you? Our experienced
                consultants are here to guide you through the process. Schedule
                a consultation to discuss your needs and find the perfect
                funding solution for your business or personal use.
              </p>
              <v-btn
                color="secondary"
                href="mailto:Cdpalmer1229@gmail.com"
                class="mb-2"
              >
                Referral from PTD
              </v-btn>

              <h2>4. Get Funded with Us</h2>
              <p>
                Once your application is approved, our team will ensure that you
                receive your funding promptly. Whether you need the funds for
                personal use, business growth, or addressing tax liabilities,
                we’re committed to helping you navigate the process with ease.
              </p>
              <v-btn
                color="info"
                href="http://trypto.co/"
                target="_blank"
                class="mb-2"
              >
                Visit Our Partner Site
              </v-btn> -->
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToForm() {
      this.$router.push("/funding/form");
    },
  },
};
</script>
