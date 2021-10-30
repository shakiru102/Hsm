import Vue from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'

Vue.component('doughnut-chart', {
	extends: Doughnut,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})
Vue.component('bar-chart', {
	extends: Bar,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})