<template>
  <div class="h-screen w-100 d-flex justify-center align-center">
    <v-progress-circular :size="100" :width="8" indeterminate class="layoutLoader" />
  </div>
</template>

<style lang="scss">
.layoutLoader {
  color: var(--color-primary);
}
</style>
