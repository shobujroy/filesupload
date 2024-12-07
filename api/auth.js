import nuxtConfig from "@/nuxt.config";

export default ($axios, store, ctx, router) => ({
  async register(data) {
    return ctx.$request.post("/user/register", data);
  },

  async fetchUser() {
    return ctx.$request.get("/user/me");
  },

  async forgotPassword(data) {
    return ctx.$request.post("/user/forget-password", data);
  },

  async updatePassword(data) {
    return ctx.$request.post("/user/update-password", data);
  },
  async updateProfile(data) {
    return ctx.$request.put("/user/update-user", data);
  },

  async updatePasswordToken(data) {
    return ctx.$request.post("/user/verify-token", data);
  },
});
