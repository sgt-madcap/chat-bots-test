<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen = !isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true
  }),
  async mounted() {
    await this.$store.dispatch("fetchInfo");
  },
  components: {
    Navbar
  }
};
</script>
