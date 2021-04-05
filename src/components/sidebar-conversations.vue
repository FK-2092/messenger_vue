<template>
  <main class="py-2 border-end">
    <ul v-if="conversations" class="list-unstyled">
      <li v-for="item of conversations" :key="item" class="px-4 d-flex justify-content-between">
        <router-link :to="'/conversations/' + item.id">
          {{ item.users.join(',') }}
        </router-link>
        <button class="btn btn-sm btn-outline-danger" @click="deleteConversation(item.id)">bin</button>
      </li>
    </ul>
    <div v-else>
      There is nothing here yet.
    </div>
  </main>
  <footer class="border-top border-end">
    <current-user-display/>
    <div>
      <a class="w-100 btn btn-primary rounded-0"
         data-bs-toggle="modal" href="#modal">
        New conversation
      </a>
    </div>
  </footer>
  <teleport to="body">
    <div class="modal fade" tabindex="-1" ref="modal" id="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Conversation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-for="item of contacts" :key="item" class="form-check">
              <label class="form-check-label">
                <input class="form-check-input"
                       type="checkbox"
                       v-model="newConversation"
                       :value="item">
                {{ item }}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="createConversation">Create</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {inject} from "vue";
import {v4 as uuid} from 'uuid'
import $ from 'jquery'
import CurrentUserDisplay from "@components/current-user-display.vue";
import {ContactsSymbol} from '@components/ProvideContacts'
import {ConversationsSymbol} from '@components/ProvideConversations'

export default {
  name: "sidebar-conversations",
  components: {CurrentUserDisplay},
  data() {
    return {
      newConversation: []
    }
  },
  setup() {
    const {contacts} = inject(ContactsSymbol)
    const {conversations, updateConversations} = inject(ConversationsSymbol)
    return {
      contacts,
      conversations,
      updateConversations
    }
  },
  created() {
    $(this.$refs.modal).hide()
  },
  methods: {
    toggleModal() {
      $(this.$refs.modal).toggle().toggleClass('show')
    },
    createConversation() {
      this.updateConversations([
        ...(this.conversations || []),
        {
          id: uuid(),
          users: this.newConversation
        }
      ])
      this.newConversation = []
    },
    deleteConversation(id) {
      this.updateConversations(this.conversations.filter((item) => item.id !== id))
    }
  }
}
</script>

<style scoped>
main {
  flex-grow: 1;
}
</style>