<template>
    <b-navbar toggleable="md" type="dark" class="navbar_design fixed-top">
    <b-navbar-brand v-if="bar_status" href="#"><i class="fa-solid fa-bars fa-lg" v-on:click="toggle_sidebar"></i></b-navbar-brand>
    <p class="text-white" v-if="ErrorHandeling">Hello {{UserData.data[0].First_Name}}</p>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="ErrorHandeling" class="ml-auto mlauto">
            <li v-on:click="onclickLogout"><button class="btn-block btn btn-outline-danger btn-md text-white"><i class="fas text-white fa-sign-in-alt mr-2"></i>Logout</button></li>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto mlauto">
            <li class="btn btn-outline-success"><router-link class="a_tag" to="/login"><i class="fas text-white fa-sign-in-alt mr-2"></i>Login</router-link></li>
            <li class="btn btn-outline-success"><router-link class="a_tag" to="/signup"><i class="fas fa-user-plus mr-2"></i>Sign Up</router-link></li>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { NavbarPlugin } from 'bootstrap-vue';
import Vue from 'vue';
Vue.use(NavbarPlugin);
import { mapGetters } from 'vuex';
//import axios from 'axios';

export default {
    name: "NavigationBar",
    computed: {
        ...mapGetters([
            'bar_status', 'UserData', 'ErrorHandeling', 'selectedOption', 'options2'
        ]),
    },
    methods:{
        toggle_sidebar (){
           this.$store.dispatch('toggle_sidebarA'); 
        },
        onclickLogout(){
            this.$store.dispatch('triggerLogout');
        }
    },
    async beforeCreate(){
        this.$store.dispatch('Logged_user_data');
    }

}
</script>

<style>
.side_bar_style{
    border: 2px solid red;
}
.navbar_design{
    background-color: #475375;
    border-bottom: 1px solid #000;
    position: fixed;
    z-index: 0000;
    box-shadow: 0px 0px 8px 0px #000000;
}
.bar_style{
    margin-right: 12px;
}
.logo{
    margin: 1rem;
}
.mlauto li{
    margin-left: 1rem;
    display: block;
}
.mlauto li .a_tag{
    text-decoration: none;
    color: white;
    display: block;
}
</style>