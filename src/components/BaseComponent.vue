<script>

export default {
  name: 'BaseComponent',
  components: {

  },
  props: {

  },
  data() {
    return {
      title: 'BaseComponent',
    };
  },
  methods: {

  }
}

</script>


<!-- HTML -->
<template>
  <v-row>
    <v-col
      cols="4">
      <v-card title="Card title" text="..." variant="tonal">
        <v-card-actions>
          <v-btn>Click me</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<!-- STYLES -->
<style scoped>

</style>
