<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ImageFileInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: File,
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.$emit("update:modelValue", file);
    },
  },
});
</script>

<template>
  <v-file-input
    label="Upload Image"
    variant="solo-filled"
    accept="image/*"
    @change="handleFileChange"
  ></v-file-input>
</template>

<style scoped>

</style>
