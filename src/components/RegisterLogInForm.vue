<script>
export default {
  name: "RegisterLogInForm",
  data() {
    return {
      showRegister: true,
      first: "",
      last: "",
      email: "",
      password: "",
      terms: false,
    }
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
      v-show="showRegister"
      class="mx-auto pa-12 pt-10 pb-4 mt-15 text-primary"
      color="var(--light)"
      elevation="8"
      max-width="448"
      rounded="lg"
      title="Register New Account"
    >
      <v-container
        class="pb-0">
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions
        class="d-block pt-0"
        align="right"
      >
        <v-btn color="var(--link)" size="small" class="mb-3 mr-2">
          Already Have an Account?
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="var(--link)" size="large">
          Complete Registration
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Log In -->
    <v-card
      v-show="!showRegister"
      class="mx-auto pa-12 pt-10 pb-4 mt-15"
      elevation="8"
      max-width="448"
      rounded="lg"
      title="Account Login"
    >
      <v-container class="pb-0">
        <v-text-field
          v-model="email"
          color="primary"
          label="Email Address"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          variant="underlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          class="mt-2 mb-2"
          color="var(--link)"
          size="large"
          variant="tonal"
          block
        >
          Log In
        </v-btn>

        <v-card-actions
          class="d-block pt-5 pr-0 ma-0"
          align="right"
        >
          <v-btn color="var(--link)" size="small">
            Sign Up Now
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
