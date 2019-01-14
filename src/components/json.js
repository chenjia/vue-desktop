export const menus = [{
  name:'首页',
  icon:'fa-home',
  url:'/page/home'
},{
  name:'基础设施',
  url:'/page/base',
  icon:'fa-cubes',
  children:[{
    name:'SpringCloud',
    children:[{
      name:'微服务初始化',
      url:'/page/springboot'
    },{
      name:'注册中心',
      children:[{
        name:'eureka1',
        url:'http://134.83.3.33:8761/'
      },{
        name:'eureka2',
        url:'http://134.83.3.33:8762/'
      }]
    },{
      name:'配置中心',
      url:''
    },{
      name:'链路追踪',
      url:'http://134.83.3.34:9411/'
    },{
      name:'控制台',
      url:'http://134.83.3.33:5000/'
    }]
  },{
    name:'Jenkins',
    target:'_blank',
    url:'http://134.83.3.37:1080/'
  },{
    name:'Zabbix',
    target:'_blank',
    url:'http://134.83.2.206/zabbix'
  },{
    name:'任务调度',
    url:'http://134.83.3.35:9991/JobManager.html'
  },{
    name:'自动化测试',
    target:'_blank',
    url:'http://134.83.3.35:9991/JobManager.html'
  },{
    name:'GitLab',
    target:'_blank',
    url:'http://134.83.2.205:7777/'
  },{
    name:'Docker Imager',
    target:'_blank',
    url:'http://134.83.2.205:7777/'
  },{
    name:'禅道',
    url:'http://10.7.142.34/zentao/user-login-L3plbnRhby9wcm9qZWN0LXRhc2stNjAuaHRtbA==.html'
  },{
    name:'Kafka',
    target:'_blank',
    url:'http://134.83.2.204:8787/'
  },{
    name:'MongDB',
    url:'http://134.83.2.203:5551/files.html'
  },{
    name:'Jar库（nexus）',
    url:'http://134.83.2.205:8081'
  },{
    name:'MySQL',
    url:''
  },{
    name:'统一日志',
    children:[{
      name:'OA网',
      url:'http://10.7.142.65:33200/aopopr/zui/yyzindex.jsp'
    },{
      name:'内网',
      url:'http://134.70.92.44:33200/aopopr/opr/logManager/invokeLog.jsp?zuindex=2#dataTable'
    }]
  }]
},{
  name:'中台运营',
  icon:'fa-wrench',
  children:[{
      name:'购物车',
      url:''
    },{
      name:'商品中心',
      url:''
    },{
      name:'支付中心',
      url:''
    },{
      name:'订单中心',
      url:''
    },{
      name:'资料中心',
      url:''
    },{
      name:'实施中心',
      url:''
    },{
      name:'能力汇聚',
      children:[{
        name:'开发者',
        url:''
      },{
        name:'运营者',
        url:''
      }]
    },{
      name:'自主运维平台',
      url:'http://10.6.201.74:8888/EasyOper_boot'
    }]
},{
  name:'业务配置',
  icon:'fa-briefcase',
  url:'/page/buziness'
},{
  name:'系统设置',
  icon:'fa-cog',
  url:'/page/settings'
}]

export const messages = [{
  insertTime:'2018-12-12 09:00:00',
  title:'消息内容示例',
  status:'0'
},{
  insertTime:'2018-12-12 10:00:00',
  title:'消息内容示例',
  status:'0'
},{
  insertTime:'2018-12-12 11:00:00',
  title:'消息内容示例',
  status:'0'
},{
  insertTime:'2018-12-12 12:00:00',
  title:'消息内容示例',
  status:'0'
},{
  insertTime:'2018-12-12 13:00:00',
  title:'消息内容示例',
  status:'0'
}]

export const circleData = [{
  title:{
    text:'44%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:1, name:'待退单', icon:'fa-clock-o'
    },{
      value:10, name:'未达标'
    }]
  }]
},{
  title:{
    text:'89%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:269, name:'订单完成', icon:'fa-plus'
    },{
      value:31, name:'未达标'
    }]
  }]
},{
  title:{
    text:'23%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:3, name:'退单完成', icon:'fa-minus'
    },{
      value:10, name:'未达标'
    }]
  }]
},{
  title:{
    text:'33%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:5, name:'实物配货', icon:'fa-truck'
    },{
      value:10, name:'未达标'
    }]
  }]
},{
  title:{
    text:'87%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:352704, name:'实收金额', icon:'fa-cny'
    },{
      value:47000, name:'未达标'
    }]
  }]
},{
  title:{
    text:'92%',
    top:'middle',
    left:'center',
    textStyle:{
      color:'white'
    }
  },
  series: [{
    name:'',
    type:'pie',
    radius: ['60%', '75%'],
    hoverOffset:0,
    labelLine: {
      normal: {
        show: false
      }
    },
    color:['white','rgba(255,255,255,.3)'],
    data:[{
      value:138092, name:'优惠券金额', icon:'fa-money'
    },{
      value:12000, name:'未达标'
    }]
  }]
}]

export const sellPie = {
  title : {
    text: '购物车销售商品',
    subtext: '2018年12月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['存费购机类','3C类','手机终端类']
  },
  series : [
  {
    name: '购物车销售分类',
    type: 'pie',
    radius : '55%',
    center: ['50%', '60%'],
    data:[
    {value:36, name:'存费购机类'},
    {value:174, name:'3C类'},
    {value:85, name:'手机终端类'}
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }
  ]
}

export const servicePie = {
  title : {
    text: '主要功能服务调用情况',
    subtext: '2018年12月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['添加购物车','查询购物车','优惠券规则校验','核算','结算','会员券查询','用户权益查询']
  },
  series : [
  {
    name: '主要功能服务调用',
    type: 'pie',
    radius : '55%',
    center: ['50%', '60%'],
    data:[
    {value:422, name:'添加购物车'},
    {value:756, name:'查询购物车'},
    {value:640, name:'优惠券规则校验'},
    {value:598, name:'核算'},
    {value:491, name:'结算'},
    {value:652, name:'会员券查询'},
    {value:596, name:'用户权益查询'}
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }
  ]
}

export const orderTable = [{
  orderStatus: '待退单',
  orderNum: 1,
  goodsNum: 1,
  payAmount: 0,
  discountAmount: 299
},{
  orderStatus: '订单完成',
  orderNum: 269,
  goodsNum: 283,
  payAmount: 352704,
  discountAmount: 138092
},{
  orderStatus: '退单完成',
  orderNum: 3,
  goodsNum: 3,
  payAmount: 0,
  discountAmount: 0
},{
  orderStatus: '实物配货',
  orderNum: 5,
  goodsNum: 8,
  payAmount: 30096,
  discountAmount: 5480
}]