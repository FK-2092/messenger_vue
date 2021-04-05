<template>
  <div class="row mx-0 py-2 text-muted small text-monospace">
    <div class="col-auto">User:</div>
    <div class="col d-flex justify-content-end align-content-center">{{user}}</div>
  </div>
</template>

<script>
import {inject} from "vue";
import {UserSettingsSymbol} from "@components/ProvideUserSettings";

export default {
  name: "current-user-display",
  setup() {
    const {user} = inject(UserSettingsSymbol)
    return {user}
  }
}
</script>

<style scoped>

</style>