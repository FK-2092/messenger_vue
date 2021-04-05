<template>
  <main class="py-2 border-end">
    <ul v-if="contacts" class="list-unstyled">
      <li v-for="item of contacts" :key="item" class="px-4 d-flex justify-content-between">
        {{ item }} <button class="btn btn-sm btn-outline-danger" @click="deleteContact(item)">bin</button>
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
        Add contact
      </a>
    </div>
  </footer>
  <teleport to="body">
    <div class="modal fade" tabindex="-1" ref="modal" id="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Contact</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input class="form-control" v-model="newContact"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="button" class="btn btn-primary" @click="addContact">Add</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {inject} from "vue";
import $ from 'jquery'
import CurrentUserDisplay from "@components/current-user-display.vue";
import {ContactsSymbol} from '@components/ProvideContacts'

export default {
  name: "sidebar-contacts",
  components: {CurrentUserDisplay},
  data() {
    return {
      newContact: 'TEST'
    }
  },
  setup() {
    const {contacts, updateContacts} = inject(ContactsSymbol)
    return {
      contacts, updateContacts
    }
  },
  created() {
    $(this.$refs.modal).hide()
  },
  methods: {
    toggleModal() {
      $(this.$refs.modal).toggle().toggleClass('show')
    },
    addContact() {
      this.updateContacts([
        ...(this.contacts || []),
        this.newContact
      ])
    },
    deleteContact(id){
      this.updateContacts(this.contacts.filter((item) => item !== id))
    }
  }
}
</script>

<style scoped>
main {
  flex-grow: 1;
}
</style>