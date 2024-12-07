<template>
  <div>
    <Breadcrumb mainLink="/" mainText="Home" pageTitle="Partnership Program" />
    <div class="my-6 pb-6 main-container">
      <div class="mid-container">
        <v-container>
          <v-row>
            <v-col>
              <p>
                Marketing in the tax resolution industry can be expensive,
                time-consuming, and often involves unproductive tactics like
                robotic calls, mass mailers, or costly ad campaigns. At Premier
                Tax Debt Solutions, we’re offering something different—a
                subscription-based partnership that provides you with exclusive
                access to pre-screened, highly qualified referrals, giving you
                the chance to connect with clients who are already eager for the
                services you provide.
              </p>

              <h2>How It Works</h2>
              <p>
                While we don’t promise a fixed quantity of referrals per month,
                we do guarantee consistent, high-quality leads. Our process
                ensures that the clients we refer are genuinely seeking tax
                resolution assistance and have already gone through an initial
                vetting process. You won’t need to waste time filtering through
                unqualified leads or running expensive marketing campaigns with
                low returns.
              </p>

              <h2>Strategic, Regional-Based Client Matching</h2>
              <p>
                We’ve developed a strategic method for gaining clients that
                focuses on a regional approach. By selecting tax professionals
                who can service clients within their specific region, we’re able
                to provide a more localized and personalized experience for the
                taxpayer. This regional focus enhances the connection between
                you and your clients, making it easier to build trust and foster
                long-term relationships. This is not just about volume—it’s
                about the right match for both parties, leading to better
                outcomes for everyone involved.
              </p>

              <h2>Why Partner with Us?</h2>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >First Access to Qualified Clients</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      You get the first opportunity to engage with clients who
                      are ready to take action and are looking for trusted
                      professionals. These are not cold leads—they’re motivated
                      clients who have been pre-qualified and are primed for
                      your services.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >High-Value Opportunities</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      Each lead has the potential to generate significant
                      revenue, ranging from thousands to even six figures over
                      time. Our referrals are ready-to-serve clients, meaning
                      they’re bottled and prepared for upselling based on their
                      needs.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Less Energy, Better Results</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      The traditional methods of client acquisition—mass
                      marketing, cold calls, and direct mail—are not only costly
                      but can also be inefficient. With our program, you spend
                      less time and energy on vetting and more time on what
                      matters: serving your clients.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Potential for Long-Term Relationships</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      Each referral has the potential to become a long-term
                      client, generating substantial value for your business
                      over time. The clients we send your way are often in need
                      of ongoing services, which can lead to repeat business and
                      client loyalty.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <h2>What You’re Really Getting</h2>
              <p>
                This subscription offers you more than just referrals—it’s an
                opportunity to bypass the traditional, high-pressure marketing
                strategies and connect directly with clients who are ready to
                take the next step. By joining our program, you’re positioning
                yourself to build relationships with clients who trust the value
                of your services from the start.
              </p>

              <h2>Subscription and Lead-Based Referral Pricing Strategy</h2>
              <!-- <ul>
                <li>
                  <strong>Monthly Subscription Fee:</strong> $1,000 - $2,500 per
                  month
                </li>
                <li><strong>Per Referral Charge:</strong> $500 - $1,500</li>
              </ul> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn color="#f0a904" @click="goToForm"> Start </v-btn>
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
      this.$router.push("/partnership/form");
    },
  },
};
</script>
