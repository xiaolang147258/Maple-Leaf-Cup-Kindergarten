<template>
  <!--规则-->
  <div id="hello" style="width:100%;background:#F8515E;padding:0.266666rem 0;">
     <div class="yin">
     	  <div class="yin_box">
     	  	 <img src="../../../static/img/xin/pa.png" alt="" />
     	  	 <img style="height: 14.04rem;" src="../../../static/img/xin/huodongxiangqing.png" alt="" />  
     	  	   
     	  </div>  
     </div>  
        
     <van-popup v-model="show1s"><van-loading type="spinner" /></van-popup>
     <div class="xuan_xiang_box_c"></div>
  </div>
</template>

<script>

import store from '../../vuex/store.js'
import router from '../../router/index.js'
import axios from 'axios'
export default {
  
  data () {
    return {
    	show1s:false,
    }
  },
  methods:{
  	
  },
  mounted(){
  	  window.scrollTo(0,0);  
  	  store.state.btn_show = true;
  	  store.state.bottom_1 = false;store.state.bottom_2 = true;store.state.bottom_3 = false;
     
//	    window.setTimeout(()=>{
	  	     var a = document.documentElement.clientHeight+'px';
           $("#hello").css('min-height',a)
//	    },500)
	    
  },
  
}
</script>

<style scoped>
	.yin_box img{
		width: 8.2rem;
		height: 11.253333rem;
	}
	.yin_box{
		   width:9.36rem;
		   padding: 0.573333rem 0.533333rem;
		   margin-left: -0.4rem;
		   border-radius:0.266666rem;
		   background: white;
		   padding-left: 0.703333rem;
		   /*height: 11.666666rem;*/
	}
	  .yin{
	  	  width: 8.56rem;
	  	  background: #FFADB4;
	  	  border-radius:0.266666rem;
	  	  padding: 0.213333rem 0;
	  	  margin: 0 auto;
	  }
</style>
