import Vue from 'vue'
import { Button,ConfigProvider,Layout,Menu, Icon, Breadcrumb
  , message,notification, Anchor, List, Avatar, Select, Form, Input, Row, Col, Card } from 'ant-design-vue';
import App from './App.vue'
import echarts from 'echarts'

Vue.use(ConfigProvider);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Anchor);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Card);

Vue.use(Select);
Vue.use(Input);
Vue.use(Form);
Vue.use(Button);
Vue.use(Row); 
Vue.use(Col);


Vue.config.productionTip = false

//消息
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$echarts = echarts;

message.config({
    duration: 2,
});

new Vue({
  render: h => h(App),
}).$mount('#app')
