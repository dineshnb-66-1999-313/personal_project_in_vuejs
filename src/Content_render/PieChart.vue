<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut, //, Pie
  props: {
    piedata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.piedata, this.options)
  }
}
</script>
