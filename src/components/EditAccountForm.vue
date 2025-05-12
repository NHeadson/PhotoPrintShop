<script>
import {useUserStore} from "@/stores/userStore";

export default {
  name: "EditAccountForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      shippingAddress: "",
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
  mounted() {
    const profile = this.userStore.profile;
    if (profile) {
      this.firstName = profile.firstName || "";
      this.lastName = profile.lastName || "";
      this.email = profile.email || "";
      this.shippingAddress = profile.shippingAddress || "";
    }
  },
  methods: {
    async saveChanges() {
      try {
        const updates = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          shippingAddress: this.shippingAddress,
        };
        if (this.password) {
          updates.password = this.password;
        }
        await this.userStore.updateUserProfile(updates);
        alert("Account details updated successfully!");
      } catch (error) {
        console.error("Error updating account details:", error);
        alert("Failed to update account details.");
      }
    },
  },
};
</script>

<template>
  <v-container class="pa-4 pt-5 pb-0" max-width="600px">
    <v-card-title>Edit Account Details</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          color="var(--light)"
          v-model="firstName"
          :rules="[rules.required]"
          label="First Name"
          clearable
        ></v-text-field>
        <v-text-field
          color="var(--light)"
          v-model="lastName"
          :rules="[rules.required]"
          label="Last Name"
          clearable
        ></v-text-field>
        <v-text-field
          color="var(--light)"
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="Email"
          clearable
        ></v-text-field>
        <v-text-field
          color="var(--light)"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          @click:append="showPassword = !showPassword"
          clearable
        ></v-text-field>
        <v-textarea
          color="var(--light)"
          v-model="shippingAddress"
          label="Shipping Address"
          rows="3"
          clearable
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="var(--link)" size="medium" @click="saveChanges">Save Changes</v-btn>
    </v-card-actions>
  </v-container>
</template>

<style scoped>
.text-color {
  color: var(--dark);
}
</style>
