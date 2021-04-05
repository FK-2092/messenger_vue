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

import socket from '@src/socket.js'
import {reactive} from "vue";

export default {
  name: "home",
  components: {
    MainConversations,
    SidebarContacts,
    SidebarConversations
  },
  created() {
    socket.on("users", (users) => {
      console.log(users);
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        reactive(user);
      });
      // put the current user first, and then sort by username
      this.users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });
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