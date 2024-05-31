<template>
  <Nav />

  <div class="main-wrapper">
    <router-view />
  </div>
</template>

<script setup>
  import { mdiAccount } from '@mdi/js'
  import Nav from '../components/Nav.vue'
</script>

<style scoped>
  .main-wrapper {
    padding: 50px 50px 50px 100px;
    width: 100%;
  }
</style>
