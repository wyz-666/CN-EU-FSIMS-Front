import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

// const state = {
//     userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},//先去localStorage中获取数据
//     userid: window.sessionStorage.getItem('userid'),
//     username: window.sessionStorage.getItem('username'),
// }
const mutations = {
    setuserInfo(state, v) {
        localStorage.setItem('userInfo', JSON.stringify(v));//将传递的数据先保存到localStorage中
        state.userInfo = v;// 之后才是修改state中的状态
    },
    updateField
}
export default new Vuex.Store({
    state: {
        isLogin: false,
        id: -1,
        userName: '',
        isAdmin: -1,
        language: 'CN',
    },
    mutations: mutations,
    getters: {
        getField
    },
})