<template>
  <div class="flex-1 flex flex-col">
    <Header></Header>
    <!-- <test /> -->
    <main class="flex-1 min-h-screen--header">
      <div class="container mx-auto">
        <slot></slot>
      </div>
      <!-- <a-back-top /> -->
    </main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import test from "./test.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  components: {
    Header,
    test,
    Footer,
  }
});
</script>
