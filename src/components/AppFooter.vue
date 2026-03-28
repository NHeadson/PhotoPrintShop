<script>

export default {
  name: 'AppFooter'
};
</script>

<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-footer color="var(--dark)" class=" footer text-light text-center justify-start pl-15 pa-1" height="100%">
      © 2025 - Nick Headson
    </v-footer>
  </v-container>
</template>

<style scoped>
.text-light {
  color: var(--light);
}

@media screen and (max-width: 768px) {
  .footer {
    justify-content: center !important;
    padding-left: 0 !important;
  }
}
</style>
