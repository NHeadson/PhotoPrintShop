<script>
import {useUserStore} from "@/stores/userStore";
import RegisterLogInForm from "@/components/RegisterLogInForm.vue";
import EditAccountForm from "@/components/EditAccountForm.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main.js";
import AddPhotoForm from "@/components/AddPhotoForm.vue";

export default {
  name: "AccountPage",
  components: {AddPhotoForm, RegisterLogInForm, EditAccountForm},
  data() {
    return {
      showEditModal: false,
      orders: [],
    }
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    role() {
      return this.userStore.role;
    },
    isLoggedIn() {
      return this.userStore.isLoggedIn;
    },
  },
  methods: {
    async viewOrderHistory() {
      const userStore = useUserStore();
      const userId = userStore.userUID;

      if (userId) {
        const ordersRef = collection(db, "orders");
        const querySnapshot = await getDocs(ordersRef);
        this.orders = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((order) => order.userId === userId);
      }
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
  },
};
</script>

<template>

  <RegisterLogInForm v-if="!isLoggedIn"/>

  <v-container
    v-else
    class="mt-4"
    fluid
  >
    <!-- Top Row/Account Info -->
    <v-row class="mb-3 justify-center">
      <v-col cols="5">
        <v-card
          class="text-color pa-0"
          color="var(--light)"
          height="30vh"
        >
          <v-card-title class="ml-3 mr-16">Account Details</v-card-title>
          <v-card-text class="ml-8 mb-0 pb-0">Welcome, {{ userStore.profile?.firstName || "User" }}!</v-card-text>
          <v-container width="25vw" class="mt-4 pa-0 ma-0">
            <v-table class="mx-10 px-15 bg-light">
              <tbody>
              <tr>
                <td><strong>Name:</strong><br> {{ (userStore.profile?.firstName) + ' ' + (userStore.profile?.lastName) }}
                </td>
              </tr>
              <tr>
                <td><strong>Email:</strong><br> {{ userStore.profile?.email }}</td>
              </tr>
              <tr>
                <td><strong>Shipping Address:</strong><br> {{ userStore.profile?.shippingAddress || 'No Address Saved.' }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-container>
          <v-container class="pa-0">
            <v-btn color="var(--link)" size="small" class="text-color-dark float-right mr-5" @click="openEditModal">
              Edit Details
            </v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <!-- Customer-specific options -->
    <v-container
      v-if="role === 'customer'"
      max-width="100vw"
      fluid
      class="ma-0 pa-0"
    >
      <v-row class="justify-center">
        <v-col cols="8">
          <v-card
            class="text-color"
            color="var(--light)"
            height="50vh"
          >
            <v-card-title class="text-color">Customer Options</v-card-title>
            <v-btn @click="viewOrderHistory">View Order History</v-btn>
            <v-container v-for="order in orders" :key="order.id">
              <p>Order ID: {{ order.id }}</p>
              <p>Total: {{ order.totalAmount }}</p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Admin-specific options -->
    <v-container
      v-else
      max-width="100vw"
      fluid
      class="ma-0 pa-0">
      <v-row class="justify-center">
        <v-col
          cols="8"
        >
          <v-card
            class="text-color"
            color="var(--light)"
            height="50vh"
          >
            <v-card-title class="text-color">Admin Options</v-card-title>

            <AddPhotoForm />

          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Edit Account Modal -->
    <v-dialog v-model="showEditModal" max-width="600px">
      <v-card class="bg-light text-color">
        <EditAccountForm/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="var(--link)" text @click="closeEditModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>
.text-color {
  color: var(--dark);
}

.bg-light {
  background-color: var(--light);
}

</style>
