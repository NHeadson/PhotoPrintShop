<script>
import { useUserStore } from "@/stores/userStore";
import { useNotifications } from "@/stores/notificationStore";

export default {
  name: "EditAccountForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      showPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => /.+@.+\..+/.test(value) || "Invalid email.",
        password: (value) =>
          value.length >= 8 || "Min 8 characters. At least one uppercase, one lowercase, and one number required.",
      },
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
  },
  methods: {
    normalizeShippingAddress(shippingAddress) {
      if (!shippingAddress) {
        return { street: "", city: "", state: "", zip: "" };
      }

      if (typeof shippingAddress === "string") {
        const [street = "", city = "", state = "", zip = ""] = shippingAddress.split(", ");
        return { street, city, state, zip };
      }

      return {
        street: shippingAddress.street || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        zip: shippingAddress.zip || shippingAddress.zipCode || "",
      };
    },
    async saveChanges() {
      const notifications = useNotifications();
      try {
        const updates = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          shippingAddress: {
            street: this.shippingAddress.street.trim(),
            city: this.shippingAddress.city.trim(),
            state: this.shippingAddress.state.trim(),
            zip: this.shippingAddress.zip.trim(),
          },
        };
        if (this.password) {
          updates.password = this.password;
        }
        await this.userStore.updateUserProfile(updates);
        notifications.success("Account details updated successfully!");
      } catch (error) {
        console.error("Error updating account details:", error);
        notifications.error("Failed to update account details.");
      }
    },
  },
  mounted() {
    const profile = this.userStore.profile;
    if (profile) {
      this.firstName = profile.firstName || "";
      this.lastName = profile.lastName || "";
      this.email = profile.email || "";
      this.shippingAddress = this.normalizeShippingAddress(profile.shippingAddress);
    }
  },
};
</script>

<template>
  <v-container class="bg-light pa-4 pt-5 pb-0" max-width="600px">
    <v-card-title>Edit Account Details</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field color="var(--light)" v-model="firstName" :rules="[rules.required]" label="First Name"
          clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="lastName" :rules="[rules.required]" label="Last Name"
          clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="email" :rules="[rules.required, rules.email]" label="Email"
          clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="password" :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="Password"
          @click:append="showPassword = !showPassword" clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="shippingAddress.street" label="Street" clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="shippingAddress.city" label="City" clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="shippingAddress.state" label="State" clearable></v-text-field>
        <v-text-field color="var(--light)" v-model="shippingAddress.zip" label="Zip" clearable></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="var(--link)" style="outline: 2px solid var(--link);" size="medium" @click="saveChanges">Save Changes
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<style scoped>
.text-color {
  color: var(--dark);
}

.bg-light {
  background-color: var(--light);
  opacity: 1;
}
</style>
