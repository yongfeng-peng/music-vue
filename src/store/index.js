// 初始化入口js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
// import *是ES6 import的语法， 可以使用actions.什么使用
// logger插件，修改state，在控制台打印logger 方便看日志信息

// 注册插件
Vue.use(Vuex)

// 调试工具，检测state的修改是否通过mutations
// webpack编译的时候，npm run dev是dev环境 npm run build是production环境
// 开启这个模式是损耗性能的，在线上不建议使用
const debug = process.env.NODE_DEV !== 'production'
// debug是true的时候，开启这个模式

// export实力相当于工厂模式，---单例模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})