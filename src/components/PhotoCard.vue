<script>

export default {
  name: 'PhotoCard',
  components: {},
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      title: 'PhotoCard',
    };
  },
  methods: {}
}

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-img
      :src="photo.src"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      <v-card-title class="text-white" v-text="photo.title"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="medium-emphasis"
        icon="mdi-magnify"
        size="small"
      ></v-btn>

      <v-btn
        color="medium-emphasis"
        icon="mdi-information-outline"
        size="small"
      ></v-btn>

      <v-btn
        color="medium-emphasis"
        icon="mdi-bookmark-outline"
        size="small"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
