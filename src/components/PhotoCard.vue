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
        class="align-center justify-center"
        scrim="grey"
        contained
      >
        <v-btn variant="flat">View Full Image</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<style scoped>

</style>
