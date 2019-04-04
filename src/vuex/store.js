import Vue from 'vue'
import Vuex from 'vuex'

//import wx from 'http://res.wx.qq.com/open/js/jweixin-1.4.0.js'

Vue.use(Vuex);

/////////////////////////////////微信分享/////////////////////////////////////////////////////////////////////////////////////////
	
	var checkJsApi = function(jsons,title,desc,link,imgUrl){
		
	wx.config(jsons);//注入配置信息  
		
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({ 
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
    });
    wx.updateTimelineShareData({ 
        title:title, // 分享标题
        link:link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
    })
    });
   
    
	}
	
	
	
	 	 
	 	 
const state = {
	wxconfin:checkJsApi,//微信分享
	
	urls:'http://video-mp.cieo.com.cn',//全局请求头
	
	data:{//全局存储当前登录用登录信息
		
	},
	
	cesi:'vuex内部执行方法',
	
	bottom_1:false,
	
	bottom_2:false,
	
	bottom_3:false,
	
	btn_show:true,//低部导航栏显示隐藏控制
	
	video_id:'',//获取作品详情数据的id
	
	video_url:'',//播放器url
    
    video_b_url:'',
    
    
    
    tou_url:'',
    
};
        
	 	
//修改状态
const mutations = {
	 del(state){
	 	 state.cesi == '这个可以，执行完成'?state.cesi='vuex内部执行方法':state.cesi='这个可以，执行完成'
	 },
	 
	 
	 	 
};

export default new Vuex.Store({
	state,
	mutations
});
