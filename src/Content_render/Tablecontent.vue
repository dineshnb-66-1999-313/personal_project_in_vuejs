<template>
    <div class="container pt-4" style="background-color: #2D3F71;width: 70vw">
            <div class="row justify-content-lg-center p-3 mb-4" style="background-color: #475375;border-radius: 5px">
                <div class="col-8 col-md-8 col-lg-8">
                    <input type="number" class="form-control" max="6" v-model="pincode" @change="getpincodeInput($event)" placeholder="Enter Pincode"/>
                </div>
                <div class="col-2 col-md-2 col-lg-2">
                    <button class="btn btn-success" v-on:click="getdata">Search</button>
                </div>
            </div>

            <div class="row p-3" style="background-color: #475375; border-radius: 5px">
                <div class="row">
                    <div v-if="address_flag" class="col-md-4 align-self-center mb-3">
                        <input type="text" placeholder="Search Here" class="form-control" v-model="filters.name.value"/>
                    </div>
                    <div v-else class="row justify-content-md-center text-white">
                        <div class="col-md-auto">
                            <h4><i v-bind:class="[loading_status ? font_aw_icon : font_aw_icon]"></i></h4>
                            <h4>{{Error_message}}</h4>
                        </div>
                    </div>
                </div>
          
                <v-table
                    :data="newData_pincode" 
                    class="table text-white" 
                    :filters="filters"
                    :currentPage.sync="currentPage"
                    :pageSize="item_per_page"
                    @totalPagesChanged="totalPages = $event"
                    v-if="address_flag"
                >
                    <thead slot="head">
                        <v-th sortKey="id">Sl No</v-th>
                        <v-th sortKey="Name" defaultSort="asc">Village Name</v-th>
                        <th>District</th>
                        <th>State</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Pincode</th>
                    </thead>

                    <tbody slot="body" slot-scope="{displayData}" >
                        <tr v-for="row in displayData" :key="row.id">
                            <td>{{ row.id }}</td>
                            <td>{{ row.Name }}</td>
                            <td>{{ row.District }}</td>
                            <td>{{ row.Circle }}</td>
                            <td>{{ row.Region }}</td>
                            <td>{{ row.Country }}</td>
                            <td>{{ row.Pincode }}</td>
                        </tr>
                    </tbody>
                </v-table>
                <div class="row justify-content-center">
                    <div v-if="address_flag" class="col-md-3 align-self-end">
                        <smart-pagination
                            :currentPage.sync="currentPage"
                            :totalPages="totalPages"
                        />
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import UserNotLoggedIn from '../components/UserNotLoggedIn.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Tablecontent',
  component : {
    UserNotLoggedIn
  },
  computed: {
    ...mapGetters([
        'id','currentPage', 'totalPages', 'pincode', 'addressdata', 'address_flag', 
        'loading_status', 'font_aw_icon','newData_pincode', 'item_per_page', 'Error_message'
    ])
  },
  data: () => ({
    filters: {
        name: {value: '', keys: ['Name']}
    },
    id: 0,
    currentPage : 1,
    totalPages : 0,
  }),
  methods:{
    getpincodeInput(event){
        this.$store.commit("commitpincodeInput", event.target.value);
    },
    getdata(){
        this.$store.dispatch('Dispatch_Search_Pin_Code', this.pincode);
        console.log(this.pincode)
    }  
    },
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
