<template>
 <div class="login">
   
   <div class="loginForm">
     <div class="loginTitle">
     {{this.$root.sysTitle}}
   </div>
     <el-form :model="form" @keyup.13="onSubmit">
  <el-form-item>
    <el-input v-model="form.mobile" placeholder="请输入用户名">
      <i slot="prepend" class="iconfont icon-user"></i>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="form.password" type="password" placeholder="请输入密码">
      <i slot="prepend" class="iconfont icon-lock"></i>
    </el-input>
  </el-form-item>
  <el-button type="primary" @click="onSubmit" class="loginBtn btn-green">登录</el-button>
</el-form>
   </div>
   <div id="particles-js"></div>
 </div>
 
</template>

<script>

import Vue from 'vue';
import { Button, Form, FormItem, Input } from 'element-ui';
import { post } from '../utils/tools';
/* eslint-disable */
// require('exports-loader?particlesJS!particles.js');



Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

export default {
  data() {
    return {
      form: {
        mobile: '18514528452',
        password: 'abcd',
      },

    };
  },
  created() {
    if (localStorage.token) {
      this.$router.replace('/advertiser');
    }
    
  },
  mounted(){
    this.initBG();
  },
  methods: {
    onSubmit() {
      // const self = this;
      post('/user/login', this.form,true).then((res) => {
        const data = res.data;
    //     dealRespons.call(self, data, () => {
    //         // 触发打标签成功后删除列表中当前素材的交互
          if (data.status === 0) {
            localStorage.token = res.headers.authentication || Math.random().toString(36).substring(7);
            this.$router.replace('/authority');
            // localStorage.username = data.data.userName;
            // this.$root.username = data.data.userName;
          }
        });
      },
    initBG() {
      particlesJS('particles-js',
			{
				"particles": {
					"number": {
						"value": 200,
						"density": {
							"enable": true,
							"value_area": 800
						}
					},
					"color": {
						"value": "#ffffff"
					},
					"shape": {
						"type": "circle",
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 5
						},
						"image": {
							"src": "img/github.svg",
							"width": 100,
							"height": 100
						}
					},
					"opacity": {
						"value": 0.6,
						"random": false,
						"anim": {
							"enable": false,
							"speed": 1,
							"opacity_min": 0.1,
							"sync": false
						}
					},
					"size": {
						"value": 1,
						"random": true,
						"anim": {
							"enable": false,
							"speed": 20,
							"size_min": 0.1,
							"sync": false
						}
					},
					"line_linked": {
						"enable": true,
						"distance": 108,
						"color": "#b2bcd4",
						"opacity": .21,
						"width": 1
					},
					"move": {
						"enable": true,
						"speed": 3,
						"direction": "none",
						"random": false,
						"straight": false,
						"out_mode": "out",
						"attract": {
							"enable": false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
						"onhover": {
							"enable": true,
							"mode": "grab"
						},
						"onclick": {
							"enable": true,
							"mode": "push"
						},
						"resize": true
					},
					"modes": {
						"grab": {
							"distance": 120,
							"line_linked": {
								"opacity": 1
							}
						},
						"bubble": {
							"distance": 400,
							"size": 40,
							"duration": 2,
							"opacity": 8,
							"speed": 3
						},
						"repulse": {
							"distance": 300
						},
						"push": {
							"particles_nb": 4
						},
						"remove": {
							"particles_nb": 2
						}
					}
				},
				"retina_detect": true,
				"config_demo": {
					"hide_card": false,
					"background_color": "#b61924",
					"background_image": "",
					"background_position": "50% 50%",
					"background_repeat": "no-repeat",
					"background_size": "cover"
				}
			});
    },
  },
};

</script>

<style lang="scss">
.login{
  .loginForm{
    $width:380px;
    $height:340px;
  position: absolute;
  z-index: 9;
  width:$width;
  height:$height;
  left: 50%;
  top:50%;
  background: rgba(0,0,0,0.2);
  margin-left: - $width/2;
  margin-top: - $height/2;
  form{
    margin:0 60px;
  }
  .el-input-group__prepend{
    border-right:0; 
    padding-right:4px;
  }
  .el-input__inner{
    border-left:0; 
  }
  .loginTitle{
    padding-bottom: 20px;
    text-align: center;
    font-size: 24px;
    color:#fff;
    padding-top: 50px;
  }
  .iconfont{
    font-size: 20px;
  }
  .loginBtn{
    border-radius:30px;
    width:100%;
    height:40px;
    font-size: 16px;
    margin-top: 20px;
  }
  }
}
#particles-js{
  width: 100%;
  height: 100%;
  background: linear-gradient(23deg,#095163,#73c7c8); /* 标准的语法 */
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
}
</style>