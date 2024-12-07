<template>
  <div class="main-container py-8" id="how-to">
    <div class="mid-container">
      <div class="text-center pa-10 mb-4">
        <h3 style="color: #094040" class="mb-6">HOW TO</h3>
        <h1 style="font-size: 40px" class="mb-4">Instructional Videos</h1>
        <p style="color: grey">
          Learn how to make the most of our tools and services with these
          step-by-step guides.
          <br v-if="!$vuetify.breakpoint.mobile" />
        </p>
      </div>
      <v-row justify="space-between">
        <v-col
          v-for="(video, index) in videos"
          :key="index"
          cols="12"
          md="4"
          sm="6"
          @click="$router.push(video.link)"
          style="cursor: pointer"
        >
          <v-card :loading="loading" max-width="440">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img :src="video.thumbnail" height="250"></v-img>

            <v-card-title style="color: #ffb300">{{
              video.title
            }}</v-card-title>

            <v-card-text>
              <div>{{ video.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <div style="color: grey; font-size: 13px" class="pa-4">
              <span>{{ video.created_at }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      videos: [
        {
          title: "HOW TO Master IRS Fresh Start Forms with PTDSolutions",
          link: "/how-to/master-irs-fresh-start-forms",
          description:
            "Become proficient with IRS Fresh Start Forms using the guidance of PTDSolutions to simplify tax compliance.",
          created_at: "November 21, 2024",
          thumbnail: "master-irs-fresh-start-forms.jpeg",
        },
        {
          title:
            "HOW TO Stop IRS Collections Now! Simplify Your Tax Relief with PTDSolutions",
          link: "/how-to/stop-irs-collections-now",
          description:
            "Discover how to halt IRS collections and address tax challenges with PTDSolutions' tools and strategies.",
          created_at: "November 21, 2024",
          thumbnail: "stop-irs-collections.jpeg",
        },
        {
          title: "HOW TO Navigate the PTDSolutions Client Portal",
          link: "/how-to/navigate-client-portal",
          description:
            "Learn how to use the PTDSolutions Client Portal for tracking your progress and accessing key resources.",
          created_at: "November 21, 2024",
          thumbnail: "navigate-client-portal.jpeg",
        },
        {
          title: "HOW TO Use The Tax Navigator",
          link: "/how-to/use-the-tax-navigator",
          description:
            "Understand how to utilize The Tax Navigator to streamline tax management and enhance savings.",
          created_at: "November 21, 2024",
          thumbnail: "use-the-tax-navigator.jpeg",
        },
      ],
    };
  },
};
</script>
