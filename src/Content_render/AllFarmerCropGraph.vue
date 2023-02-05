<template>
    <div class="container p-3">
      <div class="row justify-content-md-start mb-5" style="background-color: #475375;border-radius: 5px">
          <div class="row">
              <div class="col align-self-start">
                  <span><router-link to="/crop_data"><i class="fas fa-arrow-left text-white fa-2x"></i></router-link></span>
              </div>
          </div>
        <div class="row pl-3 pt-2 pb-2">
            <AllUserCropData class="text-white"
                v-if="loading_farmer_data"
                :Farmer_details_list="Farmer_details_list"
                :options="options">
            </AllUserCropData>
            <!-- {{Farmer_details_list}} -->
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AllUserCropData from './AllUserCorpData.vue';
export default {
    name: 'AllFarmerCropGraph',
    components: { AllUserCropData},
    computed: {
        ...mapGetters([
            'loading_farmer_data','Farmer_details_list','options','FarmerData',
        ]),
    },
    async mounted() {
        this.$store.dispatch('getallfarmerinformation')
    }

}
</script>

<style>

</style>