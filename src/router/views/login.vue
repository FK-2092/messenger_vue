<template>
  <div class="h-100 d-flex flex-column justify-content-around container">
    <form @submit.prevent class="row justify-content-center">
      <div class="col-12 col-md-6 form-row mb-2">
        <input :class="['form-control', formErrors.user ? 'is-invalid' : '']"
               v-model="form.user"
               placeholder="Username"
               @input="formErrors.user = null"
        />
        <div v-if="formErrors.user" class="invalid-feedback">
          {{formErrors.user}}
        </div>
      </div>
      <div class="w-100"></div>
      <div class="col-12 col-md-6 form-row mb-2">
        <button class="w-100 btn btn-primary" @click="onUsernameSelection">
          Login
        </button>
      </div>
      <div class="w-100"></div>
      <div class="col-12 col-md-6 form-row mb-2">
        <button class="w-100 btn btn-outline-secondary" @click="createUser">
          Create user
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {inject} from 'vue'
import {v4 as uuid} from 'uuid'

import { UserSettingsSymbol } from '@components/ProvideUserSettings';

import socket from '@src/socket.js'

export default {
  name: "login",
  data() {
    return {
      form: {
        user: this.user || ''
      },
      formErrors: {
        user: null
      }
    }
  },
  setup(){
    const { user, updateUser } = inject(UserSettingsSymbol)
    return { user, updateUser }
  },
  methods: {
    createUser() {
      this.form.user = uuid()
    },
    onUsernameSelection() {
      if(this.form.user !== ''){
        const username = this.form.user
        this.updateUser(username)
        socket.auth = { username };
        socket.connect();
        this.$router.push({name: 'Contacts'})
      } else {
        this.formErrors.user = 'Please choose a username.'
      }
    }
  }
}
</script>

<style scoped>
 form{
   padding-bottom: 110px;
 }
</style>