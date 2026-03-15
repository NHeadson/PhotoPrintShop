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
  watch: {
    showModal(value) {
      document.body.style.overflow = value ? "hidden" : "auto";
    },
  },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <v-container class="ma-0 py-5" fluid>
    <HomeCarousel :photos="photos" />

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <v-container fluid>
        <v-row align="center" justify="center" class="cta-banner py-3 rounded-lg elevation-5" fluid>
          <v-col cols="10" height="100%" class="d-flex flex-column justify-center align-center text-center pa-3">
            <h1 class="font-weight-bold mb-4">
              Bring Stunning Photography to Your Walls
            </h1>
            <p class="mb-6">
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--primary);
  color: var(--dark);
  width: 30vw;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 1rem;
}

p {
  font-size: 1rem;
}

@media (max-width: 1100px) {

  .cta-banner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
  }

  h1 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1rem;
  }

}

@media (max-width: 768px) {

  .cta-banner {
    position: fixed;
    top: 25%;
    left: 15%;
    transform: translate(0%, 0%);
    width: 75vw;
  }

  h1 {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
  }

  .nav-link {
    font-size: 0.7rem;
  }

}

@media (max-width: 480px) {
  .cta-banner {
    position: fixed;
    top: 25%;
    left: 12%;
    transform: translate(0%, 0%);
    width: 80vw;
  }

  h1 {
    font-size: 0.9rem;
  }

  p {
    font-size: 0.7rem;
  }

  .nav-link {
    font-size: 0.6rem;
  }

}

v-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
