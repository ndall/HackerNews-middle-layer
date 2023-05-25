<template>
  <div class="fixed-center column flex-center">
    <h1 class="text-h4">Page Not Found</h1>

    <p class="text-h6 q-my-lg">
      The page is not available. Return to the main page.
    </p>

    <q-btn
      :to="{ name: 'main' }"
      label="Back to Main"
      icon="home"
      padding="xs md"
      color="accent"
      dense
      rounded
      no-caps
      no-wrap />
  </div>
</template>
