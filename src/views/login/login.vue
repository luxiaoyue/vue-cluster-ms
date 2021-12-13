<template>
	<div id="login">
		<el-container>
				<el-header height="60px">
					<div class="header-left" >
						<div style="display: flex;align-items: center;">
							<img src="@/assets/icon.png" style="width: 2.8vw;height: 2.8vw;" />
							<span style="font-size: 24px;margin-left:5px;font-family: STXinwei">{{systemname}}</span>
						</div>
					</div>
				</el-header>
			</el-container>
		<div class="content">
			<div class="pic">
				<img :src="require('@/assets/login_pic.png')" width="450" height="400">
			</div>
			<el-card class="login">
				<ul class="sidebar">
					<h2>登录</h2>
				</ul>
				<el-input v-model="account" placeholder="账号" class="acount"></el-input>
				<el-input v-model="password" placeholder="请输入密码" show-password class="password"></el-input>
				<!-- <el-checkbox v-model="ifAlwaysLogin" class="checkbox">记住登录</el-checkbox> -->
				<el-button type="primary" class="submit" @click="login">登录</el-button>
				<div class="toolBar">
					<el-link type="primary" class="forget">忘记密码</el-link>
					<el-link type="primary" class="new" @click="adduser">注册新账号</el-link>
				</div>
			</el-card>
		</div>
		<div class="footer">
			<p>
				<a>关于我们</a> |
				<a>服务条款</a> |
				<a>隐私政策</a> |
				<a>客服中心</a> |
				<a>联系我们</a> |
				<a>帮助中心</a> |
				©2020 - 2020 XXXX Inc. All Rights Reserved.
			</p>
		</div>


	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				systemname:"分布式集群监管系统",
				account: '',
				password: '',
				ifAlwaysLogin: '',
				fit: 'contain'
			}
		},
		create() {
			//this.login();
		},
		methods: {
			adduser:function(){
				this.$router.push({
					name: 'Register',
				});
			},
			login: function() {
				//console.log(returnCitySN['cip']);
				this.axios.post(`http://192.168.0.125:3000/login`, {
						username: this.account,
						password: this.password,
				}).then(r => {
					console.log(r)
					if (r.data.msg === 'success') {

						this.$message({
							message: '登陆成功',
							type: 'success'
						});
						this.$router.push({
							name: 'main',
						});
					} else {
						this.$message.error('对不起,账号或者密码错误!');
					}
				})
			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	#login{
		background:url("../../assets/backpic.jpg");
		width:100%;		
		height:100%;		
		position:fixed;
		background-size:100% 100%;
	}
	body {
		font-size: 14px;
	}

	.el-header {
		position: relative;
		width: 100%;
		height: 75px;
		background-color:#080808;
		color: #FFFFFF;
		text-align: center;
		line-height: 75px;
		/* box-shadow: 0px 5px 5px #3291F8; */
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
    	width: 150px;
    	min-height: 200px;
  	}
	.header-right {
		float: right;
	}

	.header-img {
		margin-right: 10px;
		margin-left: 10px;
		margin-top: 12.5px;
	}

	.header-left {
		float: left;
		font-size: 30px;
	}

	::-webkit-scrollbar {
		display: none;
	}


	
	.content {
		width: 1100px;
		height: 500px;
		margin: auto;
		margin-top: 120px;
	}

	.content .text {
		float: left;
		margin-top: 40px;
		margin-left: 40px;
		line-height: 200%;
	}

	.content .text h1 {
		color: #1d5494;
		margin-bottom: 20px;
	}

	.content .pic {
		float: left;
		margin-top: 25px;
		margin-left: 100px;
		margin-right: 120px;
	}

	.content .login {
		float: left;
		width: 350px;
		height: 450px;
	}

	.content .login .sidebar {
		border-bottom: 1px solid #1d5494;
		height: 50px;
		line-height: 50px;
	}

	.content .login .acount {
		margin: 40px 5px 10px;
		width: 300px;
		height: 35px;
		font-family: "微软雅黑";
	}

	.content .login .password {
		margin: 14px 5px 10px;
		width: 300px;
		height: 35px;
		font-family: "微软雅黑";
	}

	.content .login .checkbox {
		float: left;
		margin-top: 18px;
		margin-left: 10px;
	}

	.content .login .submit {
		margin: 40px 5px 10px;
		width: 300px;
		height: 40px;
		font-size: 16px;
		color: white;
		font-family: "微软雅黑";
	}

	.content .login .toolBar {
		margin-top: 80px;
	}

	.content .login .forget {
		float: left;
		margin-left: 10px;
	}

	.content .login .new {
		float: right;
		margin-right: 10px;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		line-height: 40px;
		border-top: 1px solid #d6dfea;
		background: #eff4fa;
		text-align: center;
		color: #b6b6b6;
		letter-spacing: 0.5px;
	}

	.footer a {
		color: #8590a6;
		text-decoration: none;
	}

	.footer a:hover {
		text-decoration: underline;
	}
</style>
