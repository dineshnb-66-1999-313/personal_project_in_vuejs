<template>
  <div class="container p-3">
      <div class="row justify-content-md-start mb-5" style="background-color: #475375;border-radius: 5px">
          <div class="row pl-3 pt-2 pb-2">
              <div class="col align-self-start">
                  <span><router-link to="/crop_data"><i class="fas fa-arrow-left text-white fa-2x"></i></router-link></span>
              </div>
              <div class="col align-self-end">
                <select v-model="farmer_email_single" @change="onchangefarmermail($event)" class="form-control">
                    <option value="">Please Select....</option>
                    <option v-for="(item, index) in farmer_email" :key="index" :value="item.E_mail_id">{{item.E_mail_id}}</option>
                </select>
              </div>
          </div>
          
          <div class="row mt-3" v-if="data_present">
            <div class="col-md-6 ml-4 mb-2" style="background-color: #475375;border-radius: 5px;box-shadow: 0px 0px 8px 0px #000000;">
              <GenderChart class="text-white"
                v-if="loaded_email"
                :chartdata="chartdata"
                :options="options">
              </GenderChart>
            </div>
            <div class="col-md-5 ml-2 mb-2" style="background-color: #475375;border-radius: 5px;box-shadow: 0px 0px 8px 0px #000000;">
                <PieChart class="text-white"
                  v-if="loaded_crop_status"
                  :piedata="piedata"
                  :options="options">
              </PieChart>
            </div>
          </div>
          <div v-else class="row">
              <div class="col-md-4 p-2 align-items-center">
                 <h4 class="text-white text-center">Please Select Farmer E-mail ID </h4>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import GenderChart from './GenderChart.vue';
import PieChart from './PieChart.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'LineChartContainer',
  components: { GenderChart, PieChart},
  computed: {
    ...mapGetters([
      'newData', 'crop_status_pop_up','farmer_email', 'loaded_crop_status', 'crop_statuslist',
      'piedata', 'color', 'data_present', 'loaded_email','chartdata','piedatalist', 'crop_names',
      'crop_price', 'options','farmer_email_single','loading_farmer_data','FarmerData'
    ]),
  },
  methods: {
    onchangefarmermail(event){ 
      console.log(event.target.value)
        if(event.target.value === ""){
            this.$store.dispatch("changedata_present_status"); 
        }
        else{
            this.$store.commit('getselectedemailid', event.target.value);
            this.$store.dispatch('getbarchartdata',this.farmer_email_single);
            this.$store.dispatch('getpiechartdata',this.farmer_email_single);
        }
    }
  },
  async mounted(){
     this.$store.dispatch('getfarmeremaillist')
  },
  
}
</script>