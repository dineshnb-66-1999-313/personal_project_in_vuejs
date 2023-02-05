<template>
  <div class="container p-4" style="background-color: #2D3F71;">
       <div class="row mt-3">
           <div class="col-12 col-sm-9 col-md-7 col-lg-5 justify-content-center align-items-center" id="main_div_center">
              <p v-if="ErrorHandeling">{{UserData}}</p>
              <p v-else>User not logged in </p>
           </div>
       </div>
  </div>
</template>

<script>
//import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
        ...mapGetters([
          'UserData', 'ErrorHandeling'
        ]),
    },
  methods:{

  },
  async beforeCreate(){
      this.$store.dispatch('Logged_user_data');
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
