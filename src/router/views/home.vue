<template>
  <div class="row gx-0 wrapper">
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
    <main class="col h-100">
      <main-conversations v-if="$route.params.id"/>
    </main>
  </div>
</template>

<script>
import SidebarContacts from "@components/sidebar-contacts.vue";
import SidebarConversations from "@components/sidebar-conversations.vue";
import MainConversations from "@components/main-conversations.vue";

import socket from '@src/socket.js'
import {inject, toRaw} from "vue";
import {ConversationsSymbol} from "@components/ProvideConversations";
import {UserSettingsSymbol} from "@components/ProvideUserSettings";

export default {
  name: "home",
  components: {
    MainConversations,
    SidebarContacts,
    SidebarConversations
  },
  created() {
    socket.on('new-message', message => {
        const conversations = toRaw(this.conversations)
        conversations.map(conv => {
          if(conv.id === message.conversation){
            if(!('messages' in conv) || !Array.isArray(conv.messages)){
              conv.messages = []
            }
            console.log(message.user.name,this.user,message.user.name === this.user)
            return conv.messages.push({
              ...message,
              fromMe: message.user.name === this.user
            })
          }
        })
        this.updateConversations(conversations)
    })
  },
  setup(){
    const {conversations, updateConversations} = inject(ConversationsSymbol)
    const {user} = inject(UserSettingsSymbol)

    return {
      conversations,
      updateConversations,
      user
    }
  },
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

.wrapper{
  height: calc( 100% - 40px );
}
</style>