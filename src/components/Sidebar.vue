<template>
    <div class="sidebar">
        <div class="row">
            <div class="col-9 d-flex justify-content-start">
                <img src="https://download.logo.wine/logo/Avaya/Avaya-Logo.wine.png" class="img-responsive" />
            </div>
            <div class="col-3 d-flex justify-content-end">
                <i v-on:click="toggle_sidebar" class="fas fa-arrow-left text-danger"></i>
            </div>
        </div>
        <div class="row menu_itms">
            <ul>
                <li><router-link class="a_tag" to="/home"><i class="fas fa-home"></i>Home</router-link></li>
                <li v-if="ErrorHandeling"><router-link class="a_tag" to="/searchpincode"><i class="fa fa-location-arrow"></i>Search Pincode</router-link></li>
                <li>
                    <b-button v-b-toggle.collapse-1 class="m-1 a_tag"><i class="fas fa-th-large"></i>Contract List</b-button>
                    <b-collapse id="collapse-1">
                        <li><router-link class="a_tag" to="/Contarct_reneval_portal"><i class="fas fa-th-large text-success"></i>Active Contract</router-link></li>
                        <li><router-link class="a_tag" to="/Contarct_reneval_portal"><i class="fas fa-th-large text-danger"></i>Expired Contract</router-link></li>
                        <li><router-link class="a_tag" to="/Contarct_reneval_portal"><i class="fas fa-th-large text-danger"></i>Expired Contract</router-link></li>
                    </b-collapse>
                </li>
                <li><router-link class="a_tag" to="/Setting"><i class="fas fa-cog"></i>Setting</router-link></li>
                <li>
                    <b-button v-b-toggle.collapse-2 class="m-1 a_tag"><i class="fas fa-angle-double-right"></i>Crop List</b-button>
                    <b-collapse id="collapse-2">
                        <li><router-link class="a_tag" to="/crop_data"><i class="fas fa-angle-double-right text-success"></i>Approved Crop</router-link></li>
                        <li><router-link class="a_tag" to="/crop_data"><i class="fas fa-angle-double-right text-warning"></i>Noapproved Crop</router-link></li>
                        <li><router-link class="a_tag" to="/crop_data"><i class="fas fa-angle-double-right text-danger"></i>Rejected Crop</router-link></li>
                    </b-collapse>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue';
import { BImg } from 'bootstrap-vue'
Vue.component('b-img', BImg)
import Vue from 'vue';
Vue.component('b-collapse', BCollapse);
import { mapGetters } from 'vuex';

export default {
    name: 'Sidebar',
    computed: {
        ...mapGetters([
            'side_bar_status', 'ErrorHandeling'
        ])
    },
    methods:{
        toggle_sidebar(){
            this.$store.dispatch('toggle_sidebarB')
        }
    }

}
</script>

<style scope>
    .img-responsive{
        width: 8rem;
        height: 6rem;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0px grey; 
        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar:horizontal{
        height: 8px;
        background-color: rgb(255, 255, 255)
    }
    ::-webkit-scrollbar-thumb:horizontal{
        background: #5953b6;
        border-radius: 10px;
        width: 5px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #5953b6; 
        border-radius: 10px;
    }
    .sidebar{
        border-right: 2px solid rgb(73, 125, 208);
        display: flex;
        position: absolute;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: 3rem;
        scroll-behavior: smooth;
        height: 100vh;
    }
    .sidebar .menu_itms{
        height: 100vh;
        box-sizing: border-box;
    }
    .sidebar .menu_itms ul li{
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        border-bottom: 1px solid rgba(225,225,225,0.05);
        list-style: none;
        line-height: 30px;
        background-color: transparent;
        box-shadow: 8px #000000;
    }
    .sidebar .menu_itms ul li li{
        border-bottom: 1px solid rgba(0,0,0,0.05);
        border-bottom: 1px solid rgba(225,225,225,0.05);
        list-style: none;
        line-height: 30px;
        background-color: rgb(63, 98, 145);
        box-shadow: 8px #000000;
    }
    .sidebar .menu_itms ul li .a_tag:hover{
        color: #0476f8;
    }
    .sidebar .menu_itms ul li .a_tag{
        color: #bdb8d7;
        display: block;  
        font-size: 18px;
        text-decoration: none;
    }
    .sidebar .menu_itms ul li i{
        padding-right: 10px;
        color: #0476f8;
    }
</style>