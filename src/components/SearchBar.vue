<script>
export default {
  name: "SearchBar",
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    filteredPhotos() {
      return this.photos.filter((photo) =>
        photo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    updateGallery() {
      this.$emit("update:photos", this.filteredPhotos);
    },
  },
  watch: {
    searchQuery: "updateGallery",
  },
};
</script>

<template>
  <v-text-field
    v-model="searchQuery"
    label="Search Photos"
    clearable
  ></v-text-field>
</template>
