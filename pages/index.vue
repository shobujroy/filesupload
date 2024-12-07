<template>
  <div>
    <div
      class="main-container"
      style="background-color: #2c7671; min-height: 65vh"
    >
      <div class="mid-container">
        <v-row style="color: white"
          ><v-col
            cols="12"
            md="6"
            class="pa-4"
            align-self="center"
            :class="$vuetify.breakpoint.mobile && 'text-center'"
          >
            <!-- <div class="pt-6" style="font-size: 25px">Affordable Tax Debt</div> -->
            <h3 class="pt-6">Premier Tax Debt Solutions.</h3>

            <h1 class="py-3 main-heading">
              Affordable <br />
              <span style="color: #f0a904"> Tax Debt </span> <br />
              Assistance.
            </h1>
            <!-- <h3 class="mb-4">
              Affordable <br />
              Tax Debt Assistance.<br />
            </h3> -->
            <div
              style="display: flex"
              :class="$vuetify.breakpoint.mobile && 'justify-center'"
            >
              <div>
                <button
                  class="appointment-button mb-4 text-center"
                  @click="$router.push('/terms')"
                >
                  Get Started Now
                </button>
              </div>
            </div>
            <v-row align="center"
              ><v-col cols="6"
                ><img src="/home-image-2.png" alt="" width="100%"
              /></v-col>
              <v-col cols="6">
                <h2>
                  Trusted Over 350+ Clients <br />
                  Across Country.
                </h2>
              </v-col></v-row
            > </v-col
          ><v-col cols="12" md="6" align="center"
            ><img
              src="/final_home_img.jpg"
              alt=""
              width="80%"
              style="margin-bottom: -8px" /></v-col
        ></v-row>
      </div>
    </div>
    <div class="mt-6 main-container" style="min-height: 300px">
      <div class="mid-container">
        <v-row class="message-row">
          <v-col
            cols="12"
            md="5"
            style="background-color: white; margin-top: -10px"
            class="pa-2 py-2 message-form"
            v-if="$vuetify.breakpoint.xs"
          >
            <img
              src="/form.png"
              alt="form"
              width="100%"
              style="
                object-fit: cover;
                object-position: center -30px;
                background-color: #094040;
              "
              class="form-image"
            /> </v-col
          ><v-col cols="12" md="6"
            ><v-row
              ><v-col cols="12" sm="6"
                ><v-row
                  ><v-col cols="4">
                    <div
                      style="
                        background-color: #f0a904;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        padding: 24px;
                      "
                    >
                      <v-icon color="white" x-large>mdi-handshake</v-icon>
                    </div> </v-col
                  ><v-col cols="8" align-self="center">
                    <h2>350+ Clients</h2>
                    <p>Transparent, effective tax relief services.</p>
                  </v-col></v-row
                ></v-col
              ><v-col cols="12" sm="6"
                ><v-row
                  ><v-col cols="4">
                    <div
                      style="
                        background-color: #f0a904;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        padding: 24px;
                      "
                    >
                      <v-icon color="white" x-large>mdi-thumb-up</v-icon>
                    </div> </v-col
                  ><v-col cols="8" align-self="center">
                    <h2>200+ Project</h2>
                    <p>Proven track record of success.</p>
                  </v-col></v-row
                ></v-col
              ></v-row
            ></v-col
          >
          <v-col md="1"></v-col>
          <v-col
            cols="12"
            md="5"
            style="background-color: white"
            class="pa-2 py-2 message-form"
            v-if="!$vuetify.breakpoint.xs"
          >
            <img
              src="/form.png"
              alt="form"
              width="100%"
              style="
                object-fit: cover;
                object-position: center -30px;
                background-color: #094040;
              "
              class="form-image"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <Navigator />
    <div class="mt-6 main-container py-10" id="video">
      <div class="mid-container">
        <v-responsive aspect-ratio="16/9">
          <iframe
            width="100%"
            height="650"
            src="https://www.youtube.com/embed/8dEdTBYccU4"
            title="Stop IRS Collections Now! Simplify Your Tax Relief with PTDSolutions Tax Navigator"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </v-responsive>
      </div>
    </div>
    <div class="mt-6 main-container">
      <div class="mid-container">
        <div class="inline-title">
          <span class="line"></span>
          <span class="text">AS FEATURED IN</span>
          <span class="line"></span>
        </div>
        <v-row dense justify="center">
          <!-- Repeat v-col for each logo -->
          <v-col
            v-for="(link, i) in logoLinks"
            :key="i"
            cols="6"
            sm="4"
            md="2"
            class="d-flex justify-center align-center"
          >
            <a :href="link" target="_blank" rel="noopener noreferrer">
              <img
                :src="`/logos/logo-${i + 1}.jpeg`"
                :alt="`Logo ${i + 1}`"
                class="logo-image"
              />
            </a>
          </v-col>
        </v-row>
      </div>
    </div>
    <AboutOne />
    <ServicesHome />
    <ClientBusinessHighlights />
    <div class="mt-6 main-container py-10" id="faq">
      <div class="mid-container">
        <!-- <v-row
          ><v-col cols="12" md="6" class="pa-6"
            ><h3 class="mb-5" style="color: #094040">FAQS</h3>
            <h1 class="mb-4" style="font-size: 40px; line-height: 1.2">
              Frequently Asked Question.
            </h1>
            <p>
              Fusce pulvinar rutrum lacinia. Vestibulum erat sem, iaculis a
              magna vel, feugiat laoreet nulla. Nam sem neque, fermentum eget
              varius a, pulvinar non dui.
            </p>
            <p style="color: grey">
              Quisque efficitur ipsum id sem scelerisque, non porta metus
              mollis. Cras quis sapien vel sem imperdiet mattis id eget dolor.
              Donec dictum scelerisque lorem, eget sagittis felis iaculis id.
              Proin lobortis egestas luctus.
            </p>
            <button class="appointment-button mb-4" >Read More</button>
            
            <img src="/faq.jpg" alt="" width="100%"></v-col
          >
          <v-col cols="12" md="6"
            ><div
              style="
                color: white;
                background-color: #094040;
                padding: 12px;
                font-size: 20px;
              "
            >
              When Is The Best Time To Start Tax Planning?
            </div>
            <p class="py-4 px-6 mb-3" style="background-color: #f9f9f9">
              The best time to start tax planning is at the beginning of the
              fiscal year. Early planning allows you to take advantage of all
              possible deductions and credits and ensures you stay compliant
              with tax laws throughout the year. Regular reviews and adjustments
              as your financial situation changes can help you optimize your tax
              liability.
            </p>
            <div
              style="
                color: white;
                background-color: #094040;
                padding: 12px;
                font-size: 20px;
              "
            >
              What Documents Do I Need To File My Taxes?
            </div>
            <p class="py-4 px-6 mb-3" style="background-color: #f9f9f9">
              To file your taxes, you typically need the following documents:
              <ul>
                <li> W-2 forms from your employer</li>
                <li>1099 forms for any additional income</li>
                <li>Documentation of deductible expenses (such as mortgage interest, medical expenses, charitable contributions)</li>
                <li>Records of any tax credits you qualify for</li>
                <li>Personal identification (Social Security numbers for yourself and your dependents)</li>
                <li>Previous year’s tax return</li>
              </ul>
            </p>
            <div
              style="
                color: white;
                background-color: #094040;
                padding: 12px;
                font-size: 20px;
              "
            >
              What Should I Do If I Receive An Audit Notice?
            </div>
            <p class="py-4 px-6 mb-3" style="background-color: #f9f9f9">
              If you receive an audit notice, here are the steps you should take:


              <ol>
                <li>Don’t Panic: Receiving an audit notice doesn’t necessarily mean you’ve done something wrong.
                </li>
                <li>Read the Notice Carefully: Understand what the IRS is asking for and the scope of the audit.
                </li>
                <li>Gather Your Documents: Collect all the records and documents related to the tax year in question.
                </li>
                <li>Consult a Tax Professional: Get professional advice to help you navigate the audit process.
                </li>
                <li>Respond Promptly: Follow the instructions in the notice and respond by the deadline provided.
                </li>
              </ol>
            </p></v-col
          >
        </v-row> -->
      </div>
    </div>
    <!-- Blogs component -->
    <!-- <Blogs/> -->
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      activeTab: "patients",
      activeSlider: 1,
      logoLinks: [
        "#",

        "#",

        "http://news.atlantanews-online.com/story/494076/ptdsolutions-launches-an-innovative-platform-to-help-taxpayers-manage-their-tax-debt-liabilities-with-irs-fresh-start-options.html",

        "https://www.barchart.com/story/news/29560116/ptdsolutions-launches-an-innovative-platform-to-help-taxpayers-manage-their-tax-debt-liabilities-with-irs-fresh-start-options",

        "http://www.nevadanewsreporter.com/news/story/465187/ptdsolutions-launches-an-innovative-platform-to-help-taxpayers-manage-their-tax-debt-liabilities-with-irs-fresh-start-options.html",

        "#",
        "#",
        "http://www.newyork-chronicle.com/news/story/451531/ptdsolutions-launches-an-innovative-platform-to-help-taxpayers-manage-their-tax-debt-liabilities-with-irs-fresh-start-options.html",
        "https://www.benzinga.com/pressreleases/24/11/ab41946122/ptdsolutions-launches-an-innovative-platform-to-help-taxpayers-manage-their-tax-debt-liabilities-",
      ],
      patientsQuestions: [
        {
          question: "Convenience and Accessibility",
          answer:
            "Access healthcare services anytime, anywhere, without the need for travel or long wait times.",
        },
        {
          question: "Personalized Care Recommendations",
          answer:
            "Access healthcare services anytime, anywhere, without the need for travel or long wait times.",
        },
        {
          question: "Timely Access to Quality Healthcare",
          answer:
            "Access healthcare services anytime, anywhere, without the need for travel or long wait times.",
        },
        {
          question: "Enhanced Patient Experience",
          answer:
            "Access healthcare services anytime, anywhere, without the need for travel or long wait times.",
        },
        {
          question: "Secure and Confidential",
          answer:
            "Access healthcare services anytime, anywhere, without the need for travel or long wait times.",
        },
      ],
      doctorsQuestions: [
        {
          question: "Streamlined Patient Triage",
          answer:
            "Simplify patient triage with Express Triage. Our advanced technology efficiently assesses patient needs and recommends the best care options, saving time and resources for medical professionals.",
        },
        {
          question: "Improved Workflow Efficiency",
          answer:
            "Simplify patient triage with Express Triage. Our advanced technology efficiently assesses patient needs and recommends the best care options, saving time and resources for medical professionals.",
        },
        {
          question: "Access to Real-Time Patient Data",
          answer:
            "Simplify patient triage with Express Triage. Our advanced technology efficiently assesses patient needs and recommends the best care options, saving time and resources for medical professionals.",
        },
        {
          question: "Collaborative Care Coordination",
          answer:
            "Simplify patient triage with Express Triage. Our advanced technology efficiently assesses patient needs and recommends the best care options, saving time and resources for medical professionals.",
        },
        {
          question: "Compliance and Security",
          answer:
            "Simplify patient triage with Express Triage. Our advanced technology efficiently assesses patient needs and recommends the best care options, saving time and resources for medical professionals.",
        },
      ],
    };
  },
  methods: {
    handleSliderBack() {
      if (this.activeSlider !== 1) this.activeSlider = this.activeSlider - 1;
      else this.activeSlider = 4;
    },
    handleSliderForward() {
      if (this.activeSlider !== 4) this.activeSlider = this.activeSlider + 1;
      else this.activeSlider = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-title {
  display: flex;
  align-items: center;
}

.line {
  flex: 1;
  border-top: 2px solid black; /* Adjust thickness and color as needed */
  margin: 0 10px; /* Adjust spacing between the text and lines */
}

.text {
  font-weight: bold; /* Optional: make the text bold */
  font-size: 25px; /* Adjust size as needed */
  white-space: nowrap; /* Ensures the text stays on one line */
}
.logo-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
.message-row {
  position: relative;
  .message-form {
    position: absolute;
    left: 750px;
    top: -100px;
    @media (max-width: 1282px) {
      position: static;
    }
  }
}
.home-heading {
  font-family: Ubuntu !important;
  font-size: 80px;
  font-weight: bold;
  line-height: 1 !important;
}
.home-text {
  font-size: 20px !important;
}
.headline-main {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 20px;
}
</style>

<style lang="scss" scoped>
.box {
  background-color: #9dd0cf;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  overflow: visible;
  height: 300px;
  top: 100px;
}
.box .money {
  width: 60%;
  position: absolute;
  top: -10px; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  height: auto;
}
.box-2 {
  background-color: #28303f;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  overflow: visible;
  height: 245px;
}
.box-2 .girl {
  position: absolute;
  top: -128px; /* Adjust as needed */
  left: 60%;
  transform: translateX(-50%);
  height: auto;
  width: 75%;
}
.home-top-container {
  position: relative; /* Ensure the container is positioned relatively */
  width: 100%;
  height: 666px;
  gap: 0px;
  background: linear-gradient(
    90deg,
    rgba(217, 217, 217, 0) 35.97%,
    #737373 76.67%
  );
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow to the container */
}

.home-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-overlay {
  position: absolute; /* Position the overlay absolutely within the container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(232, 246, 252, 0.5);
  /* Semi-transparent background for the overlay */
}

.overlay-content {
  width: 100%;
}

.overlay-content h1 {
  font-family: Ubuntu !important;
  font-size: 48px;
  font-weight: bold;
  line-height: 55.15px;

  margin-bottom: 10px;
}

.overlay-content p {
  font-size: 18px;
  max-width: 480px;
  margin-bottom: 30px;
}

.feature-card {
  min-height: 300px;
  background-color: #f8f9fe;
}

@media (max-width: 599px) {
  .custom-class {
    text-align: center !important;
  }
  .overlay-content p {
    max-width: 100% !important;
  }
}
.tabs {
  border: 1px solid #112f8d;
  border-radius: 10px;
  display: flex;

  .tab-item {
    font-weight: bold;
    padding: 10px 15px;
    cursor: pointer;
  }
  .active-patient {
    background-color: #112f8d;

    border-radius: 10px 0 0 10px;
    color: white;
  }
  .active-doctor {
    background-color: #112f8d;

    border-radius: 0 10px 10px 0;
    color: white;
  }
}
.list {
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
  font-weight: bold;
}

.testimonials-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;

  .testimonials-card {
    padding: 35px;
    border: 1px solid #c0c9e7;
    border-radius: 8px;
    width: 40%;
    min-height: 300px;
  }
  .testimonials-arrow {
    background-color: #112f8d;
    padding: 10px 17px;
    padding-top: 14px;

    border-radius: 50%;
    &:hover {
      cursor: pointer;
      background-color: #102b7c;
    }
  }
  .testimonials-bottom-container {
    margin-top: 25px;
    display: flex;
    gap: 25px;
    align-items: center;
    justify-content: space-between;
    .testimonials-image {
      border-radius: 50% !important;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: 80% 100%;
    }

    .testimonials-title {
      font-family: Ubuntu !important;
      font-weight: bold;
      font-size: 19px;
    }
    .testimonials-title-two {
      font-family: Poppins !important;
      font-weight: normal;
      font-size: 14px;
    }
  }
}

.testimonials-arrows {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 35px;
  .slider-arrow {
    background-color: #112f8d;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  }

  .active-slider-arrow {
    width: 40px;
    border-radius: 5px;
  }
}

@media (max-width: 904px) {
  .testimonials-container {
    flex-direction: column;
  }
  .testimonials-card {
    width: 100% !important;
  }
}
</style>
