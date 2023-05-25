<template>
  <q-layout view="lHh lpr lFf">
    <q-header
      class="glossy"
      reveal>
      <q-toolbar>
        <q-avatar rounded>
          <img
            src="./assets/logo.png"
            alt="Y Combinator Logo" />
        </q-avatar>

        <q-toolbar-title class="text-h6">Hacker News Interface</q-toolbar-title>

        <div>
          <q-toggle
            v-model="darkTheme"
            :label="$q.screen.gt.xs && 'Theme'"
            :dense="$q.screen.lt.sm"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            size="45px"
            color="dark" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useQuasar, setCssVar } from 'quasar';

const $q = useQuasar();
const darkTheme = ref(JSON.parse(localStorage.getItem('darkTheme')) || false);

watchEffect(() => {
  $q.dark.set(darkTheme.value);

  if (darkTheme.value) {
    document.documentElement.classList.add('dark');
    setCssVar('accent', '#FF5733');
  } else {
    document.documentElement.classList.remove('dark');
    setCssVar('accent', '#283350');
  }

  localStorage.setItem('darkTheme', darkTheme.value);
});

onMounted(() => {
  document.body.classList.add('transition');
});
</script>

<style lang="scss">
body {
  width: 100vw !important;
  overflow-x: hidden;
  background-color: #f8eee7;
}

header {
  width: 100vw;
}

#app,
.q-toolbar {
  max-width: 1440px;
  margin: 0 auto;
}

.q-page {
  padding: 16px clamp(8px, -40px + 8vw, 36px) 24px;
}

pre {
  white-space: pre-wrap;
  margin: 8px 0;
}

.dark {
  color-scheme: dark;
}

.transition {
  transition: color 0.3s, background-color 0.3s;
}

.q-btn {
  transition: background-color 0.3s;
}

.q-icon {
  transition: color 0.1s;
}

main .q-list--dark,
main .q-item--dark {
  color: inherit;
}

.q-list .q-item {
  transition: initial;
}

.loading {
  [class*='spinner'] {
    width: 100px;
    height: 100px;
    color: $warning;
  }

  [class*='backdrop'] {
    background-color: $info;
  }

  [class*='message'] {
    font-style: italic;
    font-weight: bold;
    margin-top: 20px;
  }
}

.body--light [class*='message'] {
  color: $primary;
}
</style>
