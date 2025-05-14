<script>
import {useUserStore} from "@/stores/userStore";
import RegisterLogInForm from "@/components/RegisterLogInForm.vue";
import EditAccountForm from "@/components/EditAccountForm.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main.js";

export default {
  name: "AccountPage",
  components: {RegisterLogInForm, EditAccountForm},
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
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((order) => order.userId === userId)
          .map((order) => ({
            ...order,
            items: order.items.map((item) => ({
              ...item,
              photoUrl: this.$root.$data.photos.find((p) => p.id === item.photoId)?.src || null,
            })),
          }));
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
          style="min-height: auto;"
        >
          <v-card-title class="ml-3 mr-16">Account Details</v-card-title>
          <v-card-text class="ml-8 mb-0 pb-0">Welcome, {{ userStore.profile?.firstName || "User" }}!</v-card-text>
          <v-container class="mt-4 pa-0 ma-0 mx-auto" style="width: 80%;">
            <v-table class="mx-auto bg-light" style="width: 100%;">
              <tbody>
              <tr>
                <td><strong>Name:</strong><br> {{
                    (userStore.profile?.firstName) + ' ' + (userStore.profile?.lastName)
                  }}
                </td>
              </tr>
              <tr>
                <td><strong>Email:</strong><br> {{ userStore.profile?.email }}</td>
              </tr>
              <tr>
                <td><strong>Shipping Address:</strong><br> {{
                    userStore.profile?.shippingAddress || 'No Address Saved.'
                  }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-container>
          <v-container class="pa-0">
            <v-btn color="var(--link)" size="small" class="text-color-dark float-right mr-5 my-5"
                   @click="openEditModal">
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
            <v-btn class="ml-7" @click="viewOrderHistory">View Order History</v-btn>
            <v-container v-for="order in orders" :key="order.id" class="mb-4" width="95%">
              <v-card>
                <v-card-title>
                  Order Date: {{ new Date(order.orderDate).toLocaleString() }}
                </v-card-title>
                <v-card-text>
                  <p><strong>Quantity:</strong> {{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</p>
                  <p><strong>Total Amount:</strong> ${{ order.totalAmount.toFixed(2) }}</p>
                  <p><strong>Shipping Address:</strong> {{ order.shippingAddress }}</p>
                </v-card-text>
              </v-card>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Employee-specific options -->
    <v-container
      v-else
      max-width="100vw"
      fluid
      class="ma-0 pa-0"
    >
      <v-row class="justify-center">
        <v-col cols="6">
          <v-card
            class="text-color"
            color="var(--light)"
            height="50vh"
          >
            <v-card-title class="text-color">Customer Options</v-card-title>
            <v-btn color="var(--link)" class="ml-7" @click="viewOrderHistory">View Order History</v-btn>
            <v-container
              class="order-history-container"
              style="max-height: 400px; overflow-y: auto;"
            >
              <v-container v-for="order in orders" :key="order.id" class="mb-4" width="30vw">
                <v-card class="bg-light">
                  <v-card-text>
                    <p><strong>Quantity:</strong> {{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</p>
                    <p><strong>Total Amount:</strong> ${{ order.totalAmount.toFixed(2) }}</p>
                    <p><strong>Shipping Address:</strong> {{ order.shippingAddress }}</p>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-container>
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

v-container {
  padding: 0;
}

v-card {
  width: 100%;
  min-height: 100%;
}

v-table {
  width: 100%;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

v-dialog {
  opacity: 1 !important;
}

@media (max-width: 768px) {
  .v-row {
    flex-direction: column;
    align-items: center;
  }

  v-col {
    width: 100%;
  }

  v-card {
    min-height: auto;
    padding: 1rem;
  }

  .v-btn {
    width: 100%;
    margin-top: 1rem;
  }

  .v-table {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  v-card {
    padding: 0.5rem;
  }

  .v-btn {
    font-size: 0.8rem;
  }

  .v-table {
    font-size: 0.8rem;
  }
}
</style>
