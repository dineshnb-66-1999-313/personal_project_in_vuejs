<template>
  <div class="container-fluid p-0" id="app">
      <div class="row">
        <NavigationBar />
      </div>
      <div class="row content">
        <div class="col col-md-2 col-lg-2 " v-if="side_bar_status">
            <Sidebar />
        </div>
        <div class="col align-self-center" >
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import NavigationBar from './components/NavigationBar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Sidebar, NavigationBar
  },
  computed: {
        ...mapGetters([
            'side_bar_status'
        ])
  }
}
</script>

<style scoped>
.Maincontent{
  background-color: #2D3F71;
}
.sidebar_side{
  background-color: #475375;
}
.sidebar_content{
  height: 100vh;
  position: relative;
}
.content{
  padding-top: 3.5rem;
}
</style>
