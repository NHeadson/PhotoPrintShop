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
  <v-container
    class="ma-0 py-5"
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
            height="90%"
            class="d-flex flex-column justify-center align-center text-center pa-3"
          >
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
  position: relative;
  background: var(--primary);
  color: var(--dark);
  width: 30vw;
  margin: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

h1 {
  font-size: 1rem;
}

p {
  font-size: 0.9rem;
}

@media (max-width: 1100px) {
  .cta-banner {
    width: 95%;
    margin: 2% auto;
  }

  .modal-overlay {
    height: 80vh;
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

}

@media (max-width: 768px) {
  .cta-banner {
    position: fixed;
    top: 10%;
    left: 12%;
    width: 75vw;
  }

  .modal-overlay {
    height: 80vh;
    width: 100vw;
  }

  h1 {
    font-size: 1.2rem;
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
    top: 10%;
    left: 12%;
    width: 75vw;
  }

  .modal-overlay {
    height: 80vh;
    width: 100vw;
  }

  h1 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.8rem;
  }

  .nav-link {
    font-size: 0.7rem;
  }

}

v-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

</style>
