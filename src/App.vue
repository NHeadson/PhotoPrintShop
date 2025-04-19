<script>
import BaseComponent from '@/components/BaseComponent.vue';

export default {
  components: {
    BaseComponent
  },
  data() {
    return {
      title: 'My Vue App',
    };
  },
  methods: {

  }
}

</script>


<!-- HTML -->
<template>
    <header>
      <h1>My Vue App</h1>
    </header>

    <main>
      <BaseComponent />
    </main>
</template>

<!-- STYLES -->
<style scoped>


</style>
