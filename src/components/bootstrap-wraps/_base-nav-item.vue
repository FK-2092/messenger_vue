<template>
  <div class="nav-item">
    <a v-if="$attrs.href"
       v-bind="$attrs"
        :class="['nav-link', 'rounded-0', active ? 'active' : '']"
    >
      <slot/>
    </a>
    <router-link v-else
       v-bind="$attrs"
       :class="['nav-link', 'rounded-0', active ? 'active' : '']"
    >
      <slot/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BaseNavItem",
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>