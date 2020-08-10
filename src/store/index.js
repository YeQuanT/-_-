import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registered:false,
    sheif_views:true,
    long_user_message:'null'
  },
  mutations: {
    long_set_registered(state){
      state.registered =!state.registered
    },
    sheif_views(state){
      state.sheif_views =!state.sheif_views
    },
    long_user_message(state,config){
      state.long_user_message =config
    }
  },
  actions: {
  },
  getters:{
    set_time(state) {
      let d = new Date();
      let year, month, day, hours, minutes; const x = "-";
      year = d.getFullYear(); month = d.getMonth() + 1; day = d.getDate();
      hours = d.getHours(); minutes = d.getMinutes();
      state.time_day = year + x + month + x + day
      state.time_minutes = year + x + month + x + day + " " + hours + ":" + minutes
      return { time_day: state.time_day, time_minutes: state.time_minutes }
    }
  },
  modules: {
  }
})
