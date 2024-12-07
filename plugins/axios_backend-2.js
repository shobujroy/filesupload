// ~/plugins/backendTwo.js

export default function ({ $axios }, inject) {
  const backendTwo = $axios.create({
    baseURL: process.env.BASE_URL_TWO, // Set the base URL for Backend 2
  });

  // Add a response interceptor
  backendTwo.interceptors.response.use(
    (response) => {
      // Return only the data object
      return response.data;
    },
    (error) => {
      // Optionally handle errors in a unified way
      return Promise.reject(error);
    }
  );

  // Inject the instance into the app as $backendTwo
  inject("backendTwo", backendTwo);
}
