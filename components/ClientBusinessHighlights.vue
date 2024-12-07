<template>
  <div class="main-container py-8" id="blogs">
    <div class="mid-container">
      <div class="text-center pa-10 mb-4">
        <!-- <h3 style="color: #094040" class="mb-6">OUR BLOG</h3> -->
        <h1 style="font-size: 40px" class="mb-2">Client Business Highlights</h1>
        <!-- <p style="color: grey"> </p> -->
        <div>
          <v-icon x-large color="#f0a904">mdi-star</v-icon
          ><v-icon x-large color="#f0a904">mdi-star</v-icon
          ><v-icon x-large color="#f0a904">mdi-star</v-icon
          ><v-icon x-large color="#f0a904">mdi-star</v-icon
          ><v-icon x-large color="#f0a904">mdi-star</v-icon>
        </div>
      </div>
      <v-row justify="space-between">
        <v-col
          v-for="(blog, index) in blogs"
          :key="index"
          cols="12"
          md="4"
          sm="6"
          @click="$router.push(blog.link)"
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

            <v-img :src="blog.img" height="250"></v-img>

            <!-- <v-card-title style="color: #ffb300">{{ blog.title }}</v-card-title> -->

            <v-card-text>
              <div style="min-height: 100px">{{ blog.description }}</div>
            </v-card-text>

            <!-- <v-divider class="mx-4"></v-divider>
            <div style="color: grey; font-size: 13px" class="pa-4">
              <span class="mr-4">{{ blog.created_at }}</span>
              <span>No Comments.</span>
            </div> -->
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
      blogs: [
        {
          title: "Glow Jewelerry Inc",
          link: "#",
          description:
            "Vegas Tiny Homes is more than just a tiny home provider; it's a comprehensive platform designed to connect builders, landowners, and tiny home buyers in an innovative and supportive ecosystem.",
          img: "vth.jpg",
        },
        {
          title: "Pres Investment",
          link: "#",
          description:
            "AT SWZRSTUDIOS WE ALWAYS PUT THE NEEDS OF THE CUSTOMER FIRST AND COMBINE CREATIVE POWERS TO PULL GREAT AND INNOVATIVE DESIGN TO PRODUCE.",
          img: "swrz.jpg",
        },
        {
          title: "Soju LLC",
          link: "#",
          description:
            "An Upscale Homemade Adult liquor infused icecream brand that focuses heavy on dairy-free and vegan options.",
          img: "catchers.jpeg",
        },
      ],
    };
  },
};
</script>
