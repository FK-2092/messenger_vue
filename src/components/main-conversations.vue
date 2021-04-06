<template>
  <div class="h-100 p-4 d-flex flex-column">
    <div class="flex-grow-1 messages">
      <ul v-if="conversation.messages" class="list-unstyled">
        <li v-for="msg of conversation.messages" :key="msg.id" class="d-flex" ref="messages">
          <div :class="'border rounded mb-2 p-2 ' + (msg.fromMe ? 'me-auto' : 'me-start')">{{msg.text}}</div>
        </li>
      </ul>
    </div>
    <form @submit.prevent="sendMessage" class="mt-4">
      <div class="form-row d-flex">
        <input type="text"
               class="form-control me-3"
               placeholder="Start typing..."
               v-model="message">
        <button class="btn btn-outline-primary"
          type="submit">
          send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import socket from "@src/socket";
import {inject, toRaw} from "vue";
import {UserSettingsSymbol} from "@components/ProvideUserSettings";
import {ConversationsSymbol} from "@components/ProvideConversations";

export default {
  name: "main-conversations",
  data() {
    return {
      message: ''
    }
  },
  setup(){
    const {conversations} = inject(ConversationsSymbol)
    const {user} = inject(UserSettingsSymbol)
    return {
      conversations,
      user
    }
  },
  created() {
    socket.emit('join-conversations', toRaw(this.conversations).map(item => {
      return item.id
    }))
  },
  computed: {
    conversation(){
      const {id} = this.$route.params
      const tmp = this.conversations.filter(item => item.id === id)[0]
      console.log('conversations', tmp);
      return tmp || []
    }
  },
  watch: {
    '$refs.messages': {
      handler () {
        console.log('$refs.messages', this.$refs.messages);
      },
      immediate: true
    }
  },
  methods: {
    sendMessage(){
      socket.emit('send-message', {
        conversation: this.conversation.id,
        text: this.message,
        time: Date.now()
      });
      this.message = ''
    }
  }
}
</script>

<style scoped>
  .messages{
    overflow-y: auto;
  }
</style>