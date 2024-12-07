export default function ({ $axios, redirect, $swal, store, app }) {
  $axios.onRequest((config) => {});
  $axios.onError((error) => {
    if (error?.response?.status == 401) {
      // get token from local storage
      const expressData = localStorage.getItem("expressData");
      // if token is available
      if (expressData) {
        // parse the token
        let data = JSON.parse(expressData);
        // set in store
        store.commit("setExpressData", data);
        // set the token
        $axios.setHeader("X-Auth-Token", data?.token || "");
      }
    }

    if (error?.response?.status != 200) {
      // $swal.fire({
      //   toast: true,
      //   timerProgressBar: true,
      //   position: "top-end",
      //   icon: "error",
      //   text: error?.response?.data?.message || "Something didn't worked out.",
      //   showConfirmButton: false,
      //   timer: 5000,
      //   didOpen: (toast) => {
      //     toast.addEventListener("mouseenter", $swal.stopTimer);
      //     toast.addEventListener("mouseleave", $swal.resumeTimer);
      //   },
      // });
    } else if (error?.response?.status == 401) {
      $axios.setToken(false);
      app.$auth.logout();
      redirect("/login");
    }
  });
  $axios.onResponseError((error) => {
    if (error?.response?.status == 401) {
      if (error.response?.config?.url === "/patient/family") {
        return;
      }

      if (error?.response?.data?.message === "Email already exist") {
        return;
      }

      $axios.setToken(false);
      app.$auth.logout();
      redirect("/login");
    }
  });
  $axios.onResponse((response) => {});
}
