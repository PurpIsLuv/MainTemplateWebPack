import $ from 'jquery'
import './css/main.css'
import './scss/main.scss'
import './js/app'
window.Vue = require('vue')

var app = new Vue({
    el: '#app',
    data: {
        mes: "Hello ",
    },
    methods: {},
    computed: {},
})
