<script>
import {auth, db} from "@/main.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import createUserModel from "@/factories/UserFactory";
import {useUserStore} from "@/stores/userStore.js";

export default {
  name: "RegisterLogInForm",
  data() {
    return {
      showLogin: true,
      first: "",
      last: "",
      email: "",
      password: "",
      terms: false,
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters.",
      },
    }
  },
  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin
    },
    async registerUser() {
      if (!this.terms) {
        alert("Please agree to the terms and conditions");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const firebaseUser = userCredential.user;
        const userModel = createUserModel(firebaseUser, {
          firstName: this.first,
          lastName: this.last,
        });
        await setDoc(doc(db, "users", userModel.id), {
          email: userModel.email,
          firstName: userModel.firstName,
          lastName: userModel.lastName,
          role: userModel.role,
          shippingAddress: userModel.shippingAddress,
        });
        alert("Registration Successful!");
        this.toggleForm();
      } catch (error) {
        console.error('Error registering user: ', error);
        alert("Registration failed: " + error.message);
      }
    },
    async loginUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        alert("Login Successful!");
        console.log("Logged in user:", userCredential.user);

        this.$router.push('/account');

        const userStore = useUserStore();
        userStore.monitorAuthState();
      } catch (error) {
        console.error("Error logging in user: ", error);
        alert("Login failed: " + error.message);
      }
    },
  },
};
</script>

<template>
  <v-container
    class="ma-0"
    width="100vw"
    fluid>

    <!-- Register -->
    <v-card
      v-show="!showLogin"
      class="mx-auto pa-12 pt-10 pb-4 mt-15 text-color"
      color="var(--light)"
      elevation="8"
      max-width="448"
      rounded="lg"
      title="Register New Account"
    >
      <v-container class="pb-0">
        <v-text-field
          clearable
          v-model="first"
          :rules="[rules.required]"
          color="var(--link)"
          label="First name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          clearable
          v-model="last"
          :rules="[rules.required]"
          color="var(--link)"
          label="Last name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          clearable
          v-model="email"
          :rules="[rules.required]"
          color="var(--link)"
          label="Email"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          density="compact"
          label="Password"
          variant="underlined"
          counter
          @click:append="show1 = !show1"
          clearable
          color="var(--link)"
          placeholder="Enter your password"
        ></v-text-field>
        <v-checkbox
          v-model="terms"
          :rules="[rules.required]"
          color="var(--link)"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions
        class="d-block pt-0 text-right"
      >
        <v-btn color="var(--link)" size="small" class="mb-3 mr-2" @click="toggleForm">
          Already Have an Account?
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="var(--link)"
          style="outline: 2px solid var(--link);"
          size="large"
          @click="registerUser">
          Complete Registration
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Log In -->
    <v-card
      v-show="showLogin"
      class="mx-auto pa-12 pt-10 pb-4 mt-15 text-color"
      color="var(--light)"
      elevation="8"
      max-width="448"
      rounded="lg"
      title="Account Login"
    >
      <v-container class="pb-0 mb-3">
        <v-text-field
          class="mb-5"
          clearable
          v-model="email"
          :rules="[rules.required]"
          color="var(--link)"
          label="Email Address"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          class="mb-10"
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          density="compact"
          label="Password"
          variant="underlined"
          color="var(--link)"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions
        class="d-block pt-0 pb-5 text-right"
      >
        <v-btn
          color="var(--link)"
          size="small"
          class="mt-5 mb-3 mr-2 pa-1"
          @click="toggleForm">
          Sign Up Now
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="var(--link)"
          style="outline: 2px solid var(--link);"
          size="large"
          class="pa-5 align-content-center log-in"
          @click="loginUser"
        >
          Log In
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

.text-color {
  color: var(--dark);
}

.log-in:hover {
  background-color: var(--light);
}

</style>
