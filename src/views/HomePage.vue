<script>
import HomeCarousel from "@/components/HomeCarousel.vue";

export default {
  name: "HomePage",
  components: {
    HomeCarousel,
  },
  data() {
    return {
      showModal: true,
    }
  },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<template>
  <v-container
    class="ma-0"
    fluid
  >
    <HomeCarousel :photos="photos"/>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal-overlay mt-16"
    >
      <v-container
        class="mt-16"
        width="50vw"
        fluid
      >
        <v-row
          align="center"
          justify="center"
          class="cta-banner py-3 rounded-lg elevation-5 mt-16"
          fluid
        >
          <v-col
            cols="10"
            height="95%"
            class="d-flex flex-column justify-center align-center text-center pa-3"
          >
            <h2 class="text-h4 font-weight-bold mb-4">
              Bring Stunning Photography to Your Walls
            </h2>
            <p class="text-subtitle-1 mb-6">
              Explore our curated collection of high-quality prints and find the perfect piece
              to enhance your home or office. Each image is available in multiple sizes.
            </p>
            <v-btn class="nav-link" color="var(--link)" size="large" to="/gallery">
              <v-icon left class="mr-3 v-icon--size-x-large">mdi-image</v-icon>
              <strong>Browse Images</strong>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
.cta-banner {
  position: relative;
  background: var(--primary);
  color: var(--dark);
  width: 50%;
  margin: 4% auto auto auto;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

</style>
