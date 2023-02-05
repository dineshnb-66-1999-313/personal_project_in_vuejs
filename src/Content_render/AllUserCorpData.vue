<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar ,
  props: {
    Farmer_details_list: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.Farmer_details_list, this.options)
  }
}
</script>
