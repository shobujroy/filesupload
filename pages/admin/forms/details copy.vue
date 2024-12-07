<template>
  <v-container v-if="!loading">
    <v-card v-if="basicInfo" class="mb-4 text-center" color="primary darken-3">
      <v-card-title class="justify-center white--text"
        >Basic Information</v-card-title
      >
    </v-card>

    <v-row>
      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.generalInfo">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >General Information</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Name: {{ basicInfo.generalInfo.firstName }}
                    {{ basicInfo.generalInfo.lastName }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >DOB:
                    {{
                      basicInfo.generalInfo.dateOfBirth
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Language:
                    {{ basicInfo.generalInfo.language }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Marital Status:
                    {{
                      basicInfo.generalInfo.maritalStatus
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.contactInfo">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Contact Information</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Mobile:
                    {{ basicInfo.contactInfo.mobile }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Home:
                    {{ basicInfo.contactInfo.home }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Work:
                    {{ basicInfo.contactInfo.work }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Fax: {{ basicInfo.contactInfo.fax }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Best Time to Call:
                    {{
                      basicInfo.contactInfo.bestTimeToCall
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >SMS Permitted:
                    {{
                      basicInfo.contactInfo.smsPermitted ? "Yes" : "No"
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.homeAddress">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Home Address</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Street:
                    {{ basicInfo.homeAddress.street }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >City:
                    {{ basicInfo.homeAddress.city }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >State:
                    {{ basicInfo.homeAddress.state }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Zip: {{ basicInfo.homeAddress.zip }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="3"
        sm="6"
        v-if="basicInfo.mailingAddress && !basicInfo.mailingAddress.sameAsHome"
      >
        <v-card>
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Mailing Address</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Street:
                    {{ basicInfo.mailingAddress.street }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >City:
                    {{ basicInfo.mailingAddress.city }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >State:
                    {{ basicInfo.mailingAddress.state }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Zip:
                    {{ basicInfo.mailingAddress.zip }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.services">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Services</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="(service, key) in basicInfo.services"
                :key="key"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ service }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.employmentInfo">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Employment Information</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Employment:
                    {{ basicInfo.employmentInfo.employment }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Income Type:
                    {{
                      basicInfo.employmentInfo.incomeType
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Type of Work:
                    {{
                      basicInfo.employmentInfo.typeOfWork
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Business Name:
                    {{
                      basicInfo.employmentInfo.businessName
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Business Type:
                    {{
                      basicInfo.employmentInfo.businessType
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Employer ID Info:
                    {{
                      basicInfo.employmentInfo.employerIdInfo
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Signature Title:
                    {{
                      basicInfo.employmentInfo.signatureTitle
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.businessAddress">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Business Address</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Street:
                    {{ basicInfo.businessAddress.street }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >City:
                    {{ basicInfo.businessAddress.city }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >State:
                    {{ basicInfo.businessAddress.state }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Zip:
                    {{ basicInfo.businessAddress.zip }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-card style="min-height: 250px" v-if="basicInfo.companyInfo">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
            >Company Information</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Is Company Active:
                    {{
                      basicInfo.companyInfo.isCompanyActive
                    }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    v-if="basicInfo.companyInfo.numW2Employees"
                    >Number of W2 Employees:
                    {{
                      basicInfo.companyInfo.numW2Employees
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-if="basicInfo.companyInfo.closeDate"
                    >Close Date:
                    {{ basicInfo.companyInfo.closeDate }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tax Information Card -->
    <v-card v-if="taxInfo" class="my-4">
      <v-card-title
        style="background-color: #003180; color: white"
        class="justify-center"
      >
        Tax Information
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Tax Liability: {{ taxInfo.taxLiability }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Tax Type: {{ taxInfo.taxType?.name }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Tax Problem: {{ taxInfo.taxProblem?.name }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Agency:
                <span v-if="taxInfo?.agency?.federal">Federal</span>
                <span v-if="taxInfo?.agency?.state">State</span>
              </v-list-item-subtitle>
              <h4 v-if="taxInfo">Forms</h4>
              <v-list-item-subtitle
                v-for="(form, index) in taxInfo.formNumbers"
                :key="index"
              >
                {{ form.name }}: {{ form.value ? "Yes" : "No" }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card v-if="assetsInfo" class="mb-4 text-center" color="primary darken-3">
      <v-card-title class="justify-center white--text"
        >Assets Information</v-card-title
      >
    </v-card>

    <v-row>
      <!-- Loop through the assetsInfo array and display each asset -->
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(asset, index) in assetsInfo"
        :key="index"
      >
        <v-card style="min-height: 250px">
          <v-card-title
            style="background-color: #003180; color: white"
            class="justify-center"
          >
            {{ asset.assetItemId ? asset.name : "Unknown Asset" }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Market Value: {{ asset.marketValue }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Quick Sale: {{ asset.quickSale }}%</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Loan: {{ asset.loan }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Equity: {{ asset.equity }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Income Information Card -->
    <v-card v-if="incomeInfo" class="my-4">
      <v-card-title
        style="background-color: #003180; color: white"
        class="justify-center"
      >
        Income Information
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <!-- Primary Tax Payer Income -->

          <v-row v-if="incomeInfo">
            <v-col cols="12" sm="6" md="3">
              <h4>Primary Tax Payer</h4>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Wages:
                    {{ incomeInfo?.primaryTaxPayer?.wages }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Pension:
                    {{
                      incomeInfo?.primaryTaxPayer?.pension
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Social Security:
                    {{
                      incomeInfo?.primaryTaxPayer?.socialSecurity
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item></v-col
            >

            <!-- Spouse/Other Contributors Income -->
            <v-col cols="12" sm="6" md="3">
              <h4>Spouse/Other Contributors</h4>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Wages:
                    {{
                      incomeInfo?.spouseOtherContributors?.wages
                    }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Pension:
                    {{
                      incomeInfo?.spouseOtherContributors?.pension
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Social Security:
                    {{
                      incomeInfo?.spouseOtherContributors?.socialSecurity
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <!-- Rental Income -->
            <v-col cols="12" sm="6" md="3">
              <h4>Rental Income</h4>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Rental Income:
                    {{ incomeInfo?.rental?.rentalIncome }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Rental Expenses:
                    {{
                      incomeInfo?.rental?.rentalExpenses
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <!-- Other Income Sources -->
            <v-col cols="12" sm="6" md="3">
              <h4>Other Income Sources</h4>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Dividends/Interest:
                    {{
                      incomeInfo?.dividendsInterest?.value
                    }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Distributions:
                    {{ incomeInfo?.distributions?.value }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Alimony:
                    {{ incomeInfo?.alimony?.value }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Child Support:
                    {{ incomeInfo?.childSupport?.value }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Other Rent:
                    {{ incomeInfo?.otherRent?.value }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Other Income:
                    {{ incomeInfo?.otherIncome1?.value }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Other Income:
                    {{ incomeInfo?.otherIncome2?.value }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title
        style="background-color: #003180; color: white"
        class="justify-center"
      >
        Expenses Information
      </v-card-title>
      <v-card-text>
        <v-row class="my-3">
          <v-col
            v-for="expense in expensesInfo"
            :key="expense.id"
            cols="12"
            sm="2"
          >
            <div>
              <strong>{{ expense.name }}</strong>
            </div>
            <div>${{ expense.amount }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="taxYearsInfo.length" class="my-4">
      <v-card-title
        style="background-color: #003180; color: white"
        class="justify-center"
      >
        Tax Years Information
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              v-for="(yearInfo, index) in taxYearsInfo"
              :key="index"
            >
              <h3>Year: {{ yearInfo.year }}</h3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Owe Taxes To Federal:
                    {{
                      yearInfo.oweTaxesToFederal === 1 ? "Yes" : "No"
                    }}</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    Owe Taxes To State:
                    {{
                      yearInfo.oweTaxesToState === 1 ? "Yes" : "No"
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>
                    Unfiled Taxes To Federal:
                    {{
                      yearInfo.unfiledTaxesToFederal === 1 ? "Yes" : "No"
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>
                    Unfiled Taxes To State:
                    {{
                      yearInfo.unfiledTaxesToState === 1 ? "Yes" : "No"
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>
                    Unfiled Business Taxes To Federal:
                    {{
                      yearInfo.unfiledBusinessTaxesToFederal === 1
                        ? "Yes"
                        : "No"
                    }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>
                    Unfiled Business Taxes To State:
                    {{
                      yearInfo.unfiledBusinessTaxesToState === 1 ? "Yes" : "No"
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
  <div
    v-else
    style="display: flex; justify-content: center; align-items: center"
  >
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      loading: false,
      requestNumber: "",
      userId: "",
      basicInfo: {},
      taxInfo: {},
      assetsInfo: [],
      incomeInfo: [],
      expensesInfo: [],
      taxYearsInfo: [],
    };
  },
  async mounted() {
    this.userId = this.$route.query.userId;
    this.requestNumber = this.$route.query.requestNumber;

    this.loading = true;
    await this.getUserBasicInfo();
    await this.getTaxInfoById();
    await this.getAssetInfoById();
    await this.getIncomeInfoById();
    await this.getExpenseInfoById();
    await this.getTaxYearsInfoById();
    this.loading = false;
  },

  methods: {
    async getUserBasicInfo() {
      const payload = { requestNumber: this.requestNumber };
      try {
        const res = await this.$api.premierService.getUserByRequestNumber(
          payload
        );
        if (res?.data?.length) {
          this.basicInfo = res?.data[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTaxInfoById() {
      const payload = { userId: this.userId };
      try {
        const res = await this.$api.premierService.getTaxInfoById(payload);
        if (res?.data) {
          this.taxInfo = res?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAssetInfoById() {
      const payload = { userId: this.userId };
      try {
        const res = await this.$api.premierService.getAssetInfoById(payload);
        if (res?.data?.length) {
          const filteredData = res?.data?.map((item) => ({
            assetItemId: item.assetItemId,
            loan: parseFloat(item.loan),
            quickSale: parseFloat(item.quickSale),
            marketValue: parseFloat(item.marketValue),
            name: item?.assetItem?.name,
            equity: (
              Number(item?.marketValue) * Number(item?.quickSale / 100) -
              Number(item?.loan)
            ).toFixed(2),
            isCash:
              item.assetItemId === 1 || item.assetItemId === 2 ? true : false,
          }));
          this.assetsInfo = filteredData;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getIncomeInfoById() {
      const payload = { userId: this.userId };
      try {
        const res = await this.$api.premierService.getIncomeInfoById(payload);
        if (res?.data?.length) {
          this.incomeInfo = res?.data[0];
          console.log(this.incomeInfo);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getExpenseInfoById() {
      const payload = { userId: this.userId };
      try {
        const res = await this.$api.premierService.getExpenseInfoById(payload);
        if (res?.data?.length) {
          console.log(res?.data);
          const filteredData = res?.data?.map((item) => ({
            amount: item?.actualExpense,
            expenseItemId: item?.expenseItemId,
            name: item?.expenseItem?.name,
          }));
          this.expensesInfo = filteredData;
          console.log(this.expensesInfo);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTaxYearsInfoById() {
      const payload = { userId: this.userId };
      try {
        const res = await this.$api.premierService.getTaxYearsInfoById(payload);
        if (res?.data?.length) {
          const filteredData = res.data.map((item) => ({
            year: item.year,
            oweTaxesToFederal: item.oweTaxesToFederal,
            oweTaxesToState: item.oweTaxesToState,
            unfiledTaxesToFederal: item.unifiledTaxesToFederal,
            unfiledTaxesToState: item.unifiledTaxesToState,
            unfiledBusinessTaxesToFederal: item.unifiledBusinessTaxesToFederal,
            unfiledBusinessTaxesToState: item.unifiledBusinessTaxesToState,
          }));
          this.taxYearsInfo = filteredData;

          console.log(this.taxYearsInfo);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
