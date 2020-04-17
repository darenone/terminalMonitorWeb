import Vue from 'vue'
let vm = new Vue()

export function get_planDetailListByUser(params) {
    return vm.$http.post(`task/get`, params);
}