<template>
  <!--首页-->
  <div id="hello" style="width:100%;background:#F8515E;padding-bottom:0.413333rem;float: left;">
  	
  	  <img class="feng1" src="../../../static/img/fengye.png" alt="" />
  	  <img class="feng2" src="../../../static/img/fengye_b.png"/>
  	  <img class="feng3" src="../../../static/img/fengye_a.png"/>
  	  <img class="feng4" src="../../../static/img/fengye_b.png"/>
  	
      <img class="top_img" src="../../../static/img/banner.png" alt="" />
      
      <div class="img_box"><img src="../../../static/img/laba.png" alt="" />
         <p v-if="isEnd==false">活动倒计时：<a>{{shi.d}}</a>天<a>{{shi.h}}</a>时<a>{{shi.m}}</a>分<a>{{shi.s}}</a>秒</p>
         <p v-else>活动已结束</p>
      </div>
            
      <div class="yin"> 
      	  <div class="yin_box">
      	  	  <div class="yin_box_c"><img src="../../../static/img/shipin.png" />
      	  	     <p style="font-size:0.333333rem;margin-bottom:0.133333rem;">视频量</p>
      	  	     <p style="font-size:0.426666rem;">{{index_box.video}}</p>
      	  	  </div>
      	  	  <div class="shu"></div>
      	  	   <div class="yin_box_c"><img src="../../../static/img/zongtoupiao.png" />
      	  	     <p style="font-size:0.333333rem;margin-bottom:0.133333rem;">总投票</p>
      	  	     <p style="font-size:0.426666rem;">{{index_box.vote}}</p>
      	  	  </div>
      	  	  <div class="shu"></div>
      	  	  <div class="yin_box_c"><img style="height:1.026666rem;margin-bottom:0.32rem;" src="../../../static/img/liulanliang.png" />
      	  	     <p style="font-size:0.333333rem;margin-bottom:0.133333rem;">浏览量</p>
      	  	     <p style="font-size:0.426666rem;">{{index_box.browser}}</p>
      	  	  </div>
      	  </div>
      </div>
      
      <div class="img_box_2">
      	  <input v-model="inp_val" @blur="git_search" @focus="inp_show=false" type="text" id="inp" />
      	  <img @click="inp_fl" v-show="inp_show" src="../../../static/img/sousuo.png" alt="" /><p @click="inp_fl" v-show="inp_show">搜索学生姓名</p>
      </div>
     
     <div class="yin_s2_f">
      <div class="yin_s2">
      	  <div class="yin_s2_box">
      	  	  <div class="yin_s2_box_c1">
      	  	  	  <div @click="btn_click(0,'')" class="yin_s2_box_c1_ch" :class="{yin_cas:show_btn==0}">推荐</div>
      	  	  	    <div class="xina_shu"></div>
      	  	  	 <div v-if="columns!=''">  
      	  	  	  <div @click="btn_click(1,columns[0])" class="yin_s2_box_c1_ch2" :class="{yin_cas:show_btn==1}" style="">{{columns[0].label}}</div>
      	  	  	    <div class="xina_shu"></div>
      	  	  	  <div @click="btn_click(2,columns[1])" class="yin_s2_box_c1_ch2" :class="{yin_cas:show_btn==2}" style="">{{columns[1].label}}</div>
      	  	  	    <div class="xina_shu"></div>
      	  	  	  <div @click="btn_click(3,columns[2])" class="yin_s2_box_c1_ch2" :class="{yin_cas:show_btn==3}" style="">{{columns[2].label}}</div>
      	  	     </div> 
      	  	  </div>
      	  	  <div class="xian"></div>
      	  	   <div class="xuan_xiang_box">
      	  	   	 <div v-for="(i,index) in active_box" class="xuan_xiang_box_c" @click="go_vdet(i)">
      	  	   	 	  <div class="img_box_s"><img :src="'http://video-mp.cieo.com.cn/'+i.image"/>
      	  	   	 	    <div class="img_btn">{{i.number}}号</div></div>
      	  	   	 	  <p class="names">{{i.user}}</p>
      	  	   	 	  <p class="xuexiao">{{i.school}}</p>
      	  	   	 	  <p class="p_img"><img src="../../../static/img/aixin.png" /> &nbsp;<a>{{i.votes}}票</a></p>
      	  	   	 </div>
      	  	   </div>
      	  </div>
      </div>
    </div> 
     
     
     
      <van-popup v-model="show1s"><van-loading type="spinner" /></van-popup>
      
  </div>
</template>

<script>

import store from '../../vuex/store.js'
import router from '../../router/index.js'
import axios from 'axios'
export default {
  store,
  data () {
    return {
    	show1s:false,
    	inp_show:true,
    	show_btn:0,
    	index_box:'',//基础信息
    	shi:{d:0,h:0,m:0,s:0},
    	isEnd:false,
    	page:1,//页数
    	limit:10,//条数
    	inp_val:'',
    	active_box:'',
    	
    	columns:'',//赛区
    	
    	columns_val:'',//临时存储赛区id
    	
    	act_edl:0,//0=推荐视频/1=搜索视频/2=赛区筛选视频
    	
    }
  },
  computed:{
  	   
  },
  
  created(){
		 let that = this;
		 that.setEndTime();
	 },
  
  
  methods:{
  	
  	handleScroll () {
//           if(this.active_box.length>2){
              var aer = document.getElementsByClassName('xuan_xiang_box_c')
              var window_top = document.documentElement.clientHeight
              var btnheight = Math.trunc(aer[aer.length-1].getBoundingClientRect().bottom)
             
              
             	if(btnheight<window_top){
             		 
             		 console.log(777777777777777777777777777)
             		 
             	   this.page=this.page+1;
             if(this.act_edl!=0){
             	   console.log(btnheight,'----------',window_top);
//           	 	this.show1s = true;
             	 	var rul = this.act_edl==1?'search':(this.act_edl==2?'areaVideo':'');
  			       axios.get(rul+'?token='+localStorage.token+'&name='+this.inp_val+'&page='+this.page+'&limit='+this.limit+'&areaid='+this.columns_val.value
        	      ).then(res=>{
        	    	  if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  this.git_token();
        	    	 	  }else{
        	    	 	  	  console.log(res.data,'分页视频');
//      	    	 	  	  this.show1s = false;
        	    	 	  	  if(res.data.data.length>0){
        	    	 	  	  	for(var i=0;i++;i<res.data.data.length){
        	    	 	  	  	   this.active_box.push(res.data.data[i])
        	    	 	  	     }
        	    	 	  	  }
        	    	 	   }
        	    	  }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
                });
             	 }   
      	      }
//           }
         },
         destroyed () {//移除页面监听--跳转其他页面务必调用该事件
           window.removeEventListener('scroll', this.handleScroll)
         },
  	
  	
  	git_search(){//搜索函数
  		
  		if(this.inp_val!=''){
  			 this.act_edl = 1
  			 this.show1s = true;
  			 this.page = 1;
  			 axios.get('search?token='+localStorage.token+'&name='+this.inp_val+'&page='+this.page+'&limit='+this.limit
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  this.git_token();
        	    	 	  }else{
        	    	 	  	  console.log(res.data,'手速视频');
        	    	 	  	  this.show1s = false;
        	    	 	  	  this.active_box = res.data.data
        	    	 	  }
        	    	 }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
              });
  		    }else{
  		    	       this.inp_show=true
  		    }
  	},
  	
  	git_recommend(){//获取推荐视频
  		 this.act_edl = 0
  		  this.show1s = true
  			 axios.get('recommend?token='+localStorage.token
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  this.git_token();
        	    	 	  }else if(res.data.status==0){
        	    	 	  	  console.log(res.data,'推荐视频');
        	    	 	  	  this.show1s = false;
        	    	 	  	  this.active_box = res.data.data
        	    	 	  }else{
        	    	 	  	 this.$toast({message:'网络错误',duration:3000});
        	    	 	  }
        	    	 }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
              });
  	},
    
    git_shai(){//获取赛区
  		 axios.get('getAreaSchool?token='+localStorage.token
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  localStorage.token = '';
        	    	 	  	  router.push({
  	   	                    path:'./home',
  	                    });
        	    	 	  }else{
        	    	 	  	 console.log(res.data,'赛区');
        	    	 	  	 this.columns = res.data.data;
        	    	 	  	 
        	    	 	  }
        	    	 }
                }).catch(err=>{
                	 console.log(err)
              }); 
  	  },
  	
    
  setEndTime(){//倒计时函数
		var that = this;
		var interval = setInterval(function(){
		var date = that.index_box.endtime-(new Date().getTime()/1000);
		if(date == 0){
			that.isEnd = true;
		}else{
			 that.shi.d = parseInt(date / 60 / 60 / 24);
			 that.shi.h = parseInt(date / 60 / 60 % 24);
			 that.shi.m = parseInt(date / 60 % 60);//计算剩余的分钟
	  	 that.shi.s = parseInt(date % 60);//计算剩余的秒数 
		  }
	   },1000);
   },

  	git_index(){//获取基础信息
//		   this.show1s = true
  			 axios.get('index?token='+localStorage.token
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  this.git_token();
        	    	 	  }else{
        	    	 	  	  console.log(res.data,'基础信息');
//      	    	 	  	  this.show1s = false;
        	    	 	  	  this.index_box = res.data.data
        	    	 	  }
        	    	 }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
              }); 
  	},
  	
  	git_token(){//微信授权
  		   axios.get('token'
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	   console.log(res.data.data);
        	    	 	   localStorage.token = res.data.data
        	    	 	   window.location.href = '/wechat/login?token='+localStorage.token
        	    	 }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
              }); 
  	},
  	
  	go_vdet(i){//跳转入作品详情
  		   window.removeEventListener('scroll', this.handleScroll)
  		  localStorage.video_id = i.id;
  		  router.push({
  	   	 path:'./Video_details'
  	   });
//	   window.location.reload()
  	},
  	
  	inp_fl(){
  		document.getElementById('inp').focus()
  	},
  	
  	btn_click(i,val){
  	  	this.show_btn = i ;
  	  	if(i==0){
  	  		 this.act_edl = 0
  	  		 this.git_recommend();
  	  	}else{
  	  		 this.git_areaVideo(val);
  	  		 this.columns_val = val
  	  	}
  	},
  	
  	git_areaVideo(val){//赛区筛选视频
  		   this.act_edl = 2
  		   this.show1s = true;
  		   this.page = 1;
  			 axios.get('areaVideo?token='+localStorage.token+'&areaid='+val.value+'&page='+this.page+'&limit='+this.limit
        	    ).then(res=>{
        	    	 if(res.status = 200){
        	    	 	  if(res.data.status==108||res.data.status==107){//检测未登录/登录过期
        	    	 	  	  this.git_token();
        	    	 	  }else if(res.data.status==0){
        	    	 	  	  console.log(res.data,'筛选视频');
        	    	 	  	  this.show1s = false;
        	    	 	  	  this.active_box = res.data.data
        	    	 	  }else{
        	    	 	  	 this.$toast({message:'网络错误',duration:3000});
        	    	 	  }
        	    	 }
                }).catch(err=>{
                	 console.log(err);
                	 this.$toast({message:'网络错误',duration:3000});
              });
  	},
  },
  mounted(){
// localStorage.token = '4d5ffe565a9fff55bd7c8c21d70738b0' 
	 if(localStorage.token&&localStorage.token!=''){
	 	   console.log(localStorage.token)
	 }else{
	 	   this.git_token();
	 }
      this.git_index();
      this.git_recommend();
      this.git_shai();
      
//	   document.getElementById('hello').style.height = document.documentElement.clientHeight;
  	   this.$store.state.btn_show = true;
  	   this.$store.state.bottom_1 = true;
  	   this.$store.state.bottom_2 = false;
  	   this.$store.state.bottom_3 = false;
	     window.scrollTo(0,0);  
	     window.addEventListener('scroll', this.handleScroll)
  }
}

</script>

<style scoped>
	.img_btn{
		
		position: absolute;
		bottom: 0.133333rem;
		right: 0.133333rem;
		background: #FF6F7A;
		line-height: 0.72rem;
		font-size: 0.373333rem;
		color: white;
		border-radius:0.16rem;
		text-align: center;
		padding:0 0.386666rem;
	}
	.p_img a{
		color: #4DB1E5;
	}
	.p_img{
		margin-top: 0.133333rem;
		margin-left: 0.32rem;
		font-size: 0.32rem;
	}
	
	.p_img img{
		width: 0.386666rem;
		height: 0.32rem;
		/*float: left;*/
		margin-bottom: -0.036666rem;
		
	}
	.xuexiao{
		font-size: 0.32rem;
		color: #BABABA;
		line-height:0.586666rem;
		margin-top:0.133333rem;
		margin-left: 0.32rem;
		width: 85%;
		overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
	}
	.names{
		margin-top: 0.213333rem;
		margin-left: 0.32rem;
		font-size: 0.4rem;
		font-weight:500;
line-height:0.586666rem;
color:rgba(0,0,0,1);
opacity:1;
	}
	.img_box_s img{
		width: 100%;
		height: 100%;
	}
	.img_box_s{
		width: 100%;
		height: 4.213333rem;
		border:0.08rem solid rgba(255,111,122,1);
		opacity:1;
		border-radius:0.266666rem;
		overflow: hidden;
		position: relative;
	}
	
	.xuan_xiang_box_c{
		width: 4.213333rem;
		height: 6.533333rem;
		float:left;
		background:rgba(255,255,255,1);
		box-shadow:0px 5px 20px rgba(255,186,198,0.46);
		opacity:1;
		border-radius:0.266666rem;
		margin-left:0.3rem;
		margin-bottom: 0.426666rem;
	}
	.xuan_xiang_box{
	  width:100%;
	  margin-top: 0.413333rem;
	  /*padding-left: 0.4rem;*/
	  float: left;
	}
	.yin_cas{
		 background: #4DB1E5;
		 color: #D6F1FF;
	}
	
	.yin_s2_box_c1_ch2{
		width:2.106666rem;margin-left:0.103333rem;
		font-size:0.4rem;
		/*color: #BABABA;*/
		float: left;
		border-radius:0.12rem;
		height:1.35rem;
		padding: 0.08rem 0.213333rem;
		text-align: center;
		/*background: red;*/
	}
	.xina_shu{
		width:0.053333rem;
		height: 0.553333rem;
		background: #D6F1FF;
		float: left;
		margin-top: 0.313333rem;
		margin-left: 0.146666rem;
	}
	.yin_s2_box_c1_ch{
		font-size:0.4rem;
		/*color: #BABABA;*/
		text-align: center;
		width: 1.52rem;
		height:1.35rem;
		line-height: 1.28rem;
		/*background: red;*/
		float: left;
		border-radius:0.12rem;
	}
	
	
	.xian{
		width: 8.72rem;
		height: 0.053333rem;
		background:#D6F1FF;
		margin: auto;
	}
	.yin_s2_box_c1{
		width: 8.82rem;
		height:1.693333rem;
		margin: auto;
		color: #BABABA;
	}
	.yin_s2_box{
		width: 9.36rem;
		/*height: 6.666666rem;*/
		background: white;
		
		margin-left:-0.4rem;
		border-radius:0.266666rem;
		padding: 0.56rem 0 0.133333rem 0;
		float: left;
	}
	.feng4{
		width: 3.88rem;
		height: 4.626666rem;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 0;
	}
	.feng3{
		width: 1.773333rem;
		height:3.426666rem;
		position: absolute;
		top:9.333333rem;
		left: 0;
		z-index: 0;
	}
	.feng2{
		width: 3.88rem;
		height: 4.626666rem;
		position: absolute;
		top: 10.373333rem;
		right: 0;
		z-index: 0;
	}
	.feng1{
		width: 1.56rem;
		height: 3.2rem;
		position: absolute;
		top: 3.453333rem;
		right: 0;
		z-index:0;
	}
	
	.yin_s2{
		width: 8.56rem;
		/*height:6.666666rem;*/
		margin:0 auto;
		background: #FFADB4;
		border-radius:0.266666rem;
		position: relative;
		 z-index: 1;
		 padding: 0.213333rem 0;
		 float: left;
		 /*margin-left: 0.72rem;*/
	}
	
	.yin_s2_f{
		width: 8.56rem;
		/*height:6.666666rem;*/
		margin:0 auto;
		background: #FFADB4;
		border-radius:0.266666rem;
		position: relative;
		z-index: 1;
		
		 
	}
	
	.img_box_2 p{
		font-size: 0.426666rem;
		position:absolute;
		right: 3.106666rem;
		top: 0.226666rem;
		color: #BABABA;
	}
	.img_box_2 img{
		 width: 0.4rem;
		 height: 0.4rem;
		 position: absolute;
		 left: 3.133333rem;
		 top: 0.333333rem;
	}
	#inp{
		border: none;
		height: 100%;
		width: 60%;
		margin-left: 1.8rem;
		text-align: center;
	}
	
	.img_box_2{
		width: 9.36rem;
		height: 1.066666rem;
		margin: 0.28rem auto;
		background:url('../../../static/img/sousuokaung.png');
		background-size:100% 100%;background-repeat:no-repeat;
		position: relative;
		 z-index: 1;
	}
	
	.shu{
		width: 0.053333rem;
		height: 1.133333rem;
		float: left;
		background: #D6F1FF;
		margin-top: 1.44rem;
	}
	.yin_box_c img{
		 width: 0.92rem;
		 height: 0.88rem;
		 margin-left: 0.023333rem;
		 margin-bottom:0.466666rem;
	}
	.yin_box_c{
		 width: 3.04rem;
		 height:100%;
		 text-align: center;
		 float: left;
		 padding-top: 0.746666rem;
		 color: #4DB1E5;
	}
	
	.yin_box{
		 width: 9.36rem;
		 height: 4.093333rem;
		 background: white;
		 border-radius:0.266666rem;
		 position: absolute;
         top: 0.2rem;
         left: -0.4rem;
         padding-left: 0.133333rem;
	}
	
	.img_box p a{
		 font-size: 0.373333rem;
	}
	.img_box p{
		 font-size: 0.32rem;
		 float: left;
		 line-height:0.85rem;
		 margin-left: 0.133333rem;
	}
	.img_box img{
		 width: 0.32rem;
		 height: 0.306666rem;
		 float: left;
		 margin-top: 0.28rem;
	}
	
	.yin{
		 width: 8.56rem;
		 height:4.493333rem;
		 border-radius:0.266666rem;
		 background: #FFADB4;
		 margin: 0 auto;
		 position: relative;
		 z-index: 1;
	}
	
	.img_box{
		width: 8.786666rem;
		height:0.893333rem;
		margin: 0.1806666rem auto 0.256666rem auto;
		background: url('../../../static/img/huodongjiezhi.png');
		background-size:100% 100%;background-repeat:no-repeat;
		padding-left: 0.36rem;
	}
	.hello{
		position: relative;
		float: left;
	}
	.top_img{
		width: 100%;
		height: 5.626666rem;
		position: relative;
		z-index: 1;
		
	}
	
</style>
