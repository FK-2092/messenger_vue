<template>
  <div class="h-100 d-flex flex-column justify-content-around container">
    <form @submit.prevent class="row justify-content-center">
      <div class="col-12 col-md-6 form-row mb-2">
        <input class="form-control"
               v-model="form.user"
               placeholder="Username"
        />
      </div>
      <div class="w-100"></div>
      <div class="col-12 col-md-6 form-row mb-2">
        <button class="w-100 btn btn-outline-primary" @click="doLogin">
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

export default {
  name: "login",
  data() {
    return {
      form: {
        user: this.user || ''
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
    doLogin() {
      if(this.form.user !== ''){
        this.updateUser(this.form.user)
        this.$router.push({name: 'Contacts'})
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