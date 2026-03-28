<script>
import { useUserStore } from "@/stores/userStore";
import RegisterLogInForm from "@/components/RegisterLogInForm.vue";
import EditAccountForm from "@/components/EditAccountForm.vue";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/main.js";

export default {
  name: "AccountPage",
  components: { RegisterLogInForm, EditAccountForm },
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
    isLoggedIn() {
      return this.userStore.isLoggedIn;
    },
  },
  watch: {
    "userStore.userUID": {
      immediate: true,
      handler(newUserId) {
        if (newUserId) {
          this.viewOrderHistory();
        } else {
          this.orders = [];
        }
      },
    },
  },
  async mounted() {
    if (this.userStore.userUID) {
      await this.viewOrderHistory();
    }
  },
  methods: {
    formatShippingAddress(shippingAddress) {
      if (!shippingAddress) return "No Address Saved.";

      if (typeof shippingAddress === "string") {
        return shippingAddress;
      }

      const street = shippingAddress.street || "";
      const city = shippingAddress.city || "";
      const state = shippingAddress.state || "";
      const zip = shippingAddress.zip || shippingAddress.zipCode || "";
      const cityStateZip = [city, state].filter(Boolean).join(", ");
      return [street, cityStateZip, zip].filter(Boolean).join(" ").trim() || "No Address Saved.";
    },
    mergeOrders(existingOrders, newOrders) {
      const merged = [...existingOrders];
      const existingIds = new Set(existingOrders.map((order) => order.id));

      for (const order of newOrders) {
        if (existingIds.has(order.id)) continue;
        merged.push(order);
        existingIds.add(order.id);
      }

      return merged;
    },
    normalizeOrders(rawOrders) {
      const photos = this.$root?.$data?.photos || [];
      return (rawOrders || []).map((order, index) => {
        const orderDate = order?.orderDate?.toDate ? order.orderDate.toDate() : order.orderDate;
        return {
          id: order.id || `order-${index}`,
          ...order,
          orderDate,
          items: (order.items || []).map((item) => ({
            ...item,
            photoUrl: photos.find((p) => p.id === item.photoId)?.src || null,
          })),
        };
      });
    },
    async viewOrderHistory() {
      const userId = this.userStore.userUID;

      if (!userId) {
        this.orders = [];
        return;
      }

      let loadedOrders = [];

      try {
        const ordersRef = collection(db, "users", userId, "orders");
        const querySnapshot = await getDocs(ordersRef);
        const subcollectionOrders = this.normalizeOrders(
          querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
        );
        loadedOrders = this.mergeOrders(loadedOrders, subcollectionOrders);
      } catch (error) {
        if (error?.code !== "permission-denied") {
          console.error("Failed to load orders from subcollection:", error);
        }
      }

      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        const embeddedOrders = userSnap.exists() ? userSnap.data().orders || [] : [];
        const normalizedEmbeddedOrders = this.normalizeOrders(embeddedOrders);
        loadedOrders = this.mergeOrders(loadedOrders, normalizedEmbeddedOrders);
      } catch (error) {
        console.error("Failed to load fallback embedded orders:", error);
      }

      // Backward compatibility for previously saved top-level orders.
      try {
        const legacyOrdersRef = collection(db, "orders");
        const legacyOrdersQuery = query(legacyOrdersRef, where("userId", "==", userId));
        const legacySnapshot = await getDocs(legacyOrdersQuery);
        const legacyOrders = this.normalizeOrders(
          legacySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
        );
        loadedOrders = this.mergeOrders(loadedOrders, legacyOrders);
      } catch (error) {
        console.error("Failed to load legacy top-level orders:", error);
      }

      this.orders = loadedOrders;
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

  <RegisterLogInForm v-if="!isLoggedIn" />

  <v-container v-else class="mt-4" fluid>
    <!-- Top Row/Account Info -->
    <v-row class="mb-3 justify-center">
      <v-col cols="5">
        <v-card class="text-color pa-0" color="var(--light)" style="min-height: auto;">
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
                    formatShippingAddress(userStore.profile?.shippingAddress)
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

    <!-- Order History -->
    <v-container max-width="100vw" fluid class="ma-0 pa-0">
      <v-row class="justify-center">
        <v-col cols="6">
          <v-card class="text-color" color="var(--light)" height="45vh">
            <v-card-title class="text-color">Order History</v-card-title>
            <v-container class="order-history-container" style="overflow-y: auto;">
              <v-container v-for="order in orders" :key="order.id" class="mb-4" width="30vw">
                <v-card class="bg-light">
                  <v-card-text>
                    <p><strong>Quantity:</strong> {{order.items.reduce((sum, item) => sum + item.quantity, 0)}}</p>
                    <p><strong>Total Amount:</strong> ${{ order.totalAmount.toFixed(2) }}</p>
                    <p><strong>Shipping Address:</strong> {{ formatShippingAddress(order.shippingAddress) }}</p>
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
        <EditAccountForm />
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

.order-history-container {
  max-height: 35vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--link) var(--light);
}

.order-history-container::-webkit-scrollbar {
  width: 10px;
}

.order-history-container::-webkit-scrollbar-track {
  background: var(--light);
  border-radius: 8px;
}

.order-history-container::-webkit-scrollbar-thumb {
  background: var(--link);
  border-radius: 8px;
  border: 2px solid var(--light);
}

.order-history-container::-webkit-scrollbar-thumb:hover {
  background: var(--dark);
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
