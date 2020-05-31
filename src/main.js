import Vue from 'vue'
import App from './app'
import router from './router/index'
import './static/css/common.scss';
//实例化vue
new Vue({
    router,// 路由
    render:h=>h(App)
}).$mount('#app');

