<template>
  <div class="flex-1 flex flex-col">
    <Header></Header>
    <main class="flex-1 min-h-srceen--header">
      <div class="container mx-auto">
        <slot></slot>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>
