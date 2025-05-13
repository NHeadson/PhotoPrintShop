<script>
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/main.js";
import ImageFileInput from "@/components/ImageFileInput.vue";


export default {
  name: "AddPhotoForm",
  components: {ImageFileInput},
  data() {
    return {
      title: "",
      description: "",
      imageFile: null,
      availableOptions: [],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async uploadImage(file) {
      const storage = getStorage();
      const storageRef = ref(storage, `photos/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    },
    async addPhoto() {
      if (!this.title || !this.description || !this.imageFile) {
        alert("Please fill in all required fields.");
        return;
      }

      try {
        const imageUrl = await this.uploadImage(this.imageFile);

        const photoData = {
          title: this.title,
          description: this.description,
          imageUrl,
          availableOptions: this.availableOptions,
        };

        const photosRef = collection(db, "photos");
        await addDoc(photosRef, photoData);

        alert("Photo added successfully!");
        this.title = "";
        this.description = "";
        this.imageFile = null;
        this.availableOptions = [];
      } catch (error) {
        console.error("Error adding photo:", error);
        alert("Failed to add photo.");
      }
    },
  },
};
</script>

<template>
  <v-container class="pa-4" max-width="600px">
    <v-card>
      <v-card-title>Add New Photo</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            class="text-color"
            v-model="title"
            :rules="[rules.required]"
            label="Photo Title"
            clearable
          ></v-text-field>
          <v-textarea
            class="text-color"
            v-model="description"
            :rules="[rules.required]"
            label="Photo Description"
            rows="3"
            clearable
          ></v-textarea>
          <ImageFileInput v-model="imageFile" />
          <v-btn color="var(--link)" class="mt-4 float-right ma-3 text-color" @click="addPhoto">Add Photo</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

.text-color {
  color: var(--dark);
}

</style>
