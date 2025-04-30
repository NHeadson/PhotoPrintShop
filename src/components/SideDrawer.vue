<script>
export default {
  name: "SideDrawer",
  components: {

  },
  props: {

  },
  data() {
    return {
      title: 'SideDrawer',
    };
  },
  methods: {

  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="Cart" value="cart"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Order History" value="orderHistory"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-account" title="Account" value="account"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 110vh"></v-main>
    </v-layout>
  </v-card>

</template>

<style scoped>

</style>
