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
      <sidebar-contacts v-if="$route.name === 'Contacts'"/>
      <sidebar-conversations v-else/>
    </aside>
    <main class="col">
      <main-conversations/>
    </main>
  </div>
</template>

<script>
import SidebarContacts from "@components/sidebar-contacts.vue";
import SidebarConversations from "@components/sidebar-conversations.vue";
import MainConversations from "@components/main-conversations.vue";

export default {
  name: "home",
  components: {
    MainConversations,
    SidebarContacts,
    SidebarConversations
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
}
</style>