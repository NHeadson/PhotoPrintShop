<script>
import PageContainer from "@/components/PageContainer.vue";

export default {
  components: {
    PageContainer,
  },
  data() {
    return {
      title: 'My Vue App',

    };
  },
  methods: {}

}


</script>


<!-- HTML -->
<template>
  <v-responsive class="border rounded">
    <v-app>
      <AppHeader/>
      <v-main>
        <v-container>
          <PageContainer/>
        </v-container>
      </v-main>
      <AppFooter/>
    </v-app>
  </v-responsive>

</template>

<!-- STYLES -->
<style scoped></style>
