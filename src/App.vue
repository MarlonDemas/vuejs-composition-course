<template>
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from './Timeline.vue'
import Progress from './Progress.vue'

export default defineComponent({
  components: {
    Timeline,
    Progress
  }
})
</script>
