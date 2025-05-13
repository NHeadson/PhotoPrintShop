<script>
export default {
  name: 'PhotoCard',
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      showModal: false,
      printOptions: {
        size: '',
        medium: '',
        finish: '',
        frame: '',
        price: 0,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="mx-auto"
      variant="outlined"
      v-bind="props"
    >
      <v-skeleton-loader
        v-if="isLoading"
        type="image"
        height="40vh"
      />

      <v-img
        v-show="!isLoading"
        :src="photo.src"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="40vh"
        cover
      >
      </v-img>
      <v-overlay
        :model-value="!!isHovering"
        class="align-center justify-center overlay"
        scrim="grey"
        @click="showModal = true"
        contained
      >
        <v-btn variant="flat">View Full Image</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>

  <!-- Modal -->
  <v-dialog v-model="showModal" max-width="80vw" class="modal-bg">
    <v-card class="d-flex flex-row card-bg" height="80vh">
      <!-- Full Image -->
      <v-img
        :src="photo.src"
        class="flex-grow-1 px-0 mx-0"
      ></v-img>

      <!-- Print Options Menu -->
      <v-container class="pa-8 align-self-center menu-bg" width="20%">
        <h3>Print Options</h3>
        <v-select
          v-model="printOptions.size"
          :items="['Small', 'Medium', 'Large']"
          label="Size"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.medium"
          :items="['Paper', 'Canvas', 'Metal']"
          label="Medium"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.finish"
          :items="['Matte', 'Glossy']"
          label="Finish"
          outlined
        ></v-select>
        <v-select
          v-model="printOptions.frame"
          :items="['No Frame', 'Black Frame', 'White Frame']"
          label="Frame"
          outlined
        ></v-select>
        <v-text-field
          v-model="printOptions.price"
          label="Price"
          outlined
          readonly
        ></v-text-field>
        <v-btn color="var(--link)" class="mt-4">Add to Cart</v-btn>
      </v-container>
    </v-card>
  </v-dialog>

</template>

<style scoped>

.modal-bg {
  background-color: rgba(0, 0, 0, 0.8);
}

.card-bg {
  background-color: rgb(38, 38, 38);
  border-radius: 10px;
  padding: 1%;
}

.menu-bg {
  background-color: var(--light);
  border-radius: 10px;
  margin: 1%;
}

.overlay:hover {
  cursor: pointer;
}

</style>
