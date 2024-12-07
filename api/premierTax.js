import nuxtConfig from "@/nuxt.config";

export default ($axios, store, ctx, router) => ({
  async getLanguages(params) {
    return ctx.$backendTwo.get("/languages", params);
  },
  async getEmploymentTypes(params) {
    return ctx.$backendTwo.get("/employment-types", params);
  },
  async getBusinessTypes(params) {
    return ctx.$backendTwo.get("/business-types", params);
  },
  async getTaxTypes(params) {
    return ctx.$backendTwo.get("/tax-types", params);
  },
  async getMaritalStatuses(params) {
    return ctx.$backendTwo.get("/marital-statuses", params);
  },
  async getServices(params) {
    return ctx.$backendTwo.get("/services", params);
  },
  async getTaxProblems(params) {
    return ctx.$backendTwo.get("/tax-problems", params);
  },
  async getFormNumbers(params) {
    return ctx.$backendTwo.get("/form-numbers", params);
  },
  async getCampaigns(params) {
    return ctx.$backendTwo.get("/campaigns", params);
  },
  async getExpenseItems(params) {
    return ctx.$backendTwo.get("/expense-items", params);
  },
  async getAssetItems(params) {
    return ctx.$backendTwo.get("/asset-items", params);
  },

  async getUserByEmail(payload) {
    return ctx.$backendTwo.post("/get-users-by-email", payload);
  },

  async getUserByRequestNumber(payload) {
    return ctx.$backendTwo.post("/get-user-by-request-number", payload);
  },

  async saveUserGeneralInfo(payload) {
    return ctx.$backendTwo.post("/save-user-general-info", payload);
  },

  async saveTaxInfo(payload) {
    return ctx.$backendTwo.post("/save-tax-info-info", payload);
  },
  async getTaxInfoById(payload) {
    return ctx.$backendTwo.post("/get-tax-info-by-user-id", payload);
  },

  async saveIncomeInfo(payload) {
    return ctx.$backendTwo.post("/save-income-info", payload);
  },

  async getIncomeInfoById(payload) {
    return ctx.$backendTwo.post("/get-income-by-user-id", payload);
  },

  async saveTaxYearsInfo(payload) {
    return ctx.$backendTwo.post("/save-tax-years-info", payload);
  },

  async getTaxYearsInfoById(payload) {
    return ctx.$backendTwo.post("/get-tax-year-by-user-id", payload);
  },

  async saveAssetInfo(payload) {
    return ctx.$backendTwo.post("/save-asset-info", payload);
  },

  async getAssetInfoById(payload) {
    return ctx.$backendTwo.post("/get-asset-by-user-id", payload);
  },

  async saveExpenseInfo(payload) {
    return ctx.$backendTwo.post("/save-expense-info", payload);
  },
  async getExpenseInfoById(payload) {
    return ctx.$backendTwo.post("/get-expense-by-user-id", payload);
  },

  async updateUserSummary(payload) {
    return ctx.$backendTwo.post("/update-user-summary", payload);
  },

  async completeForm(payload) {
    return ctx.$backendTwo.post("/mark-complete-form", payload);
  },

  async getFormsListing(params) {
    return ctx.$backendTwo.get("/users", { params });
  },

  async saveFundingInfo(payload) {
    return ctx.$backendTwo.post("/save-funding-info", payload);
  },

  async getFundingForms(params) {
    return ctx.$backendTwo.get("/fundings", { params });
  },

  async getReferralForms(params) {
    return ctx.$backendTwo.get("/referrals", { params });
  },

  async getAssistanceForms(params) {
    return ctx.$backendTwo.get("/assistances", { params });
  },
  async getAssistanceTypes(params) {
    return ctx.$backendTwo.get("/assistance-types", params);
  },

  async saveAssistanceInfo(payload) {
    return ctx.$backendTwo.post("/save-assistance-info", payload);
  },

  async getAssistanceById(payload) {
    return ctx.$backendTwo.post("/get-assistance-by-id", payload);
  },
  async getDashboardCount(params) {
    return ctx.$backendTwo.get("/dashboard-count", params);
  },

  async saveReferralInfo(payload) {
    return ctx.$backendTwo.post("/save-referral-info", payload);
  },

  async getReferralByEmail(payload) {
    return ctx.$backendTwo.post("/get-referral-by-email", payload);
  },

  async getReferralById(payload) {
    return ctx.$backendTwo.post("/get-referral-by-id", payload);
  },

  async getPartnershipForms(params) {
    return ctx.$backendTwo.get("/partnerships", { params });
  },

  async savePartnershipInfo(payload) {
    return ctx.$backendTwo.post("/save-partnership-info", payload);
  },

  async getPartnershipById(payload) {
    return ctx.$backendTwo.post("/get-partnership-by-id", payload);
  },
  async updatePassword(payload) {
    return ctx.$backendTwo.post("/admin/update-password", payload);
  },

  async getBusinessExpenseItems(params) {
    return ctx.$backendTwo.get("/business-expense", params);
  },
  async getBusinessAssetItems(params) {
    return ctx.$backendTwo.get("/business-assets", params);
  },
  async getBusinessIncomeItems(params) {
    return ctx.$backendTwo.get("/business-income", params);
  },

  async saveBusinessInformation(payload) {
    return ctx.$backendTwo.post("/save-business-data", payload);
  },
  async getBusinessInformationById(payload) {
    return ctx.$backendTwo.post("/get-business-data-by-user-id", payload);
  },

  async getAllDetailsByUserId(payload) {
    return ctx.$backendTwo.post("/get-all-details-by-user-id", payload);
  },

  async addService(data) {
    return ctx.$request.post("/user/service-request/add", data);
  },
  async updateService(id, data) {
    return ctx.$request.put(`/user/service-request/update/${id}`, data);
  },
  async getServicesUser(params) {
    return ctx.$request.get("/user/service-requests", params);
  },

  async getServicesAdmin(params) {
    // Filter out null or undefined parameters and construct the query string directly
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== null && params[key] !== undefined)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    // Make the API call with the constructed query string
    return ctx.$request.get(
      `/admin/service-requests${queryString ? `?${queryString}` : ""}`
    );
  },
  async getNotesById(id, params) {
    return ctx.$request.get(`/user/service-request/notes/${id}`, params);
  },
  async addNotes(data) {
    return ctx.$request.post("/admin/service-request/add-notes", data);
  },
  async getServiceByAdminId(id, params) {
    return ctx.$request.get(`/admin/service-request/${id}`, params);
  },
  async getServiceByUserId(id, params) {
    return ctx.$request.get(`/user/service-request/${id}`, params);
  },
  async getUserDashboard(params) {
    return ctx.$request.get("/user/dashboard", params);
  },

  async addLiaisonForm(data) {
    return ctx.$request.post("/admin/liaison-call-request", data);
  },

  async getLiaisonFormsAdmin(params) {
    // Filter out null or undefined parameters and construct the query string directly
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== null && params[key] !== undefined)
      .map(
        (key) =>
          `${key}=${
            key === "name" ? encodeURIComponent(params[key]) : params[key]
          }`
      )
      .join("&");

    // Make the API call with the constructed query string
    return ctx.$request.get(
      `/admin/liaison-call-requests${queryString ? `?${queryString}` : ""}`
    );
  },
  async getLiaisonByAdminId(id, params) {
    return ctx.$request.get(`/admin/liaison-call-request/${id}`, params);
  },

  async getLiaisonFormsUser(params) {
    return ctx.$request.get("/user/liaison-call-requests", params);
  },
  async getLiaisonByUserId(id, params) {
    return ctx.$request.get(`/user/liaison-call-request/${id}`, params);
  },

  async userPaymentCheckout(data) {
    return ctx.$request.post("/user/create-checkout-session", data);
  },

  async userPaymentSuccess(data) {
    return ctx.$request.post("/user/payment-success-update", data);
  },

  async userPaymentCheckoutForm(data) {
    return ctx.$request.post("/user/form-create-checkout-session", data);
  },

  async userPaymentSuccessForm(data) {
    return ctx.$request.post("/user/form-payment-success-update", data);
  },

  async adminPaymentCheckout(data) {
    return ctx.$request.post("/admin/create-checkout-session", data);
  },

  async adminPaymentSuccess(data) {
    return ctx.$request.post("/admin/payment-success-update", data);
  },

  async getAllPayments(params) {
    return ctx.$request.get("/user/payments", params);
  },
  async updateLiaisonForm(id, data) {
    return ctx.$request.put(`/admin/liaison-call-request/${id}`, data);
  },
  async deletePayment(data) {
    return ctx.$request.deleteReq(`/user/payment/${data?.payment_id}`, data);
  },

  async getFormsListingUser(params) {
    return ctx.$request.get("/user/tax-navigator-form", params);
  },
  async sendEmail(payload) {
    return ctx.$request.post("/user/send-email", payload);
  },

  async getTemplateKeys(params) {
    return ctx.$request.get("/user/get-postgrid-keys-by-id/1", params);
  },
  async updateTemplateKeys(payload) {
    return ctx.$request.put("/user/edit-postgrid-keys/1", payload);
  },
});
