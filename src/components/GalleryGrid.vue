<script>
import PhotoCard from "@/components/PhotoCard.vue";

export default {
  name: 'GalleryGrid',
  components: {
    PhotoCard,
  },
  props: {

  },
  data() {
    return {
      title: 'GalleryGrid',
    };
  },
  methods: {

  }
}
</script>

<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col
        v-for="n in 9"
        :key="n"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          aspect-ratio="1"
          class="bg-grey-lighten-2"
          cover
        >
          <template v-slot:placeholder>
            <v-row
              align="center"
              class="fill-height ma-0"
              justify="center"
            >
              <v-progress-circular
                color="grey-lighten-5"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
