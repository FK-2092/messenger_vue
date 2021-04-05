<template>
  <div class="row h-100">
    <aside class="col-3">
      <ul class="nav nav-tabs">
        <base-nav-item :to="'/contacts'" :active="$route.name === 'Contacts'">
          Contacts
        </base-nav-item>
        <base-nav-item :to="'/conversations'" :active="$route.name === 'Conversations'">
          Conversations
        </base-nav-item>
      </ul>
      <main class="border-right">

      </main>
      <footer class="border-top border-right">
        <div class="row mx-0 py-2 text-muted small text-monospace">
          <div class="col-auto">User:</div>
          <div class="col d-flex justify-content-end align-content-center">{{user}}</div>
        </div>
        <div>
          <button class=" w-100 btn btn-primary rounded-0">
            Add contact
          </button>
        </div>
      </footer>
    </aside>
    <main class="col">

    </main>
  </div>
</template>

<script>
import {inject} from "vue";
import {UserSettingsSymbol} from '@components/ProvideUserSettings';

export default {
  name: "home",
  setup() {
    const {user} = inject(UserSettingsSymbol)
    return {user}
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  > * {
    width: 50%;
  }
}

aside {
  display: flex;
  flex-direction: column;
  main {
    flex-grow: 1;
  }
}
</style>