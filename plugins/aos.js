// plugins/aos.js
import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app }) => {
  app.AOS = new AOS.init({
    startEvent: "DOMContentLoaded",
    offset: 200,
    once: true,
  });
};
