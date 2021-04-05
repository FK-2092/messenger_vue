<template>
  <provide-user-settings>
    <header id="app-bar">
      <div>
        <div v-if="$route.name !== 'Home'">
          <base-nav-item :to="'/'">
            <img :src="arrow" alt="Home" />
          </base-nav-item>
        </div>
      </div>
      <span>Murx-Chat</span>
      <div></div>
    </header>
    <router-view/>
  </provide-user-settings>
</template>

<script>
import ProvideUserSettings from "@components/ProvideUserSettings.js";
import arrow from '@assets/arrow_back.svg'

export default {
  name: 'App',
  components: {
    ProvideUserSettings
  },
  data(){
    return {
      arrow
    }
  }
}
</script>

<style lang="scss">
body{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-bar{
    background: var(--primary);
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &,
    & * {
      color: #fff;
    }
  }
}
</style>
