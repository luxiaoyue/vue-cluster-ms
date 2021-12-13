<template>
	<div class="main" >
		<div id="building">
			<el-container>
				<el-header height="60px">
					<div class="header-right">
						<div style="display: flex;align-items: center;">
							<span style="font-size: 15px;font-family: STXinwei">{{username}}</span>
							<el-divider direction="vertical"></el-divider>
							<img src="@/assets/signOut.png" style="width: 1.8vw;height: 1.8vw;" @click="logout" />
						</div>
					</div>
					<div class="header-left" >
						<div style="display: flex;align-items: center;">
							<img src="@/assets/icon.png" style="width: 2.8vw;height: 2.8vw;" />
							<span style="font-size: 24px;margin-left:5px;font-family: STXinwei">{{systemname}}</span>
						</div>
					</div>
				</el-header>
			</el-container>

			<el-container style="margin-top: 0px;">
				<el-aside width="200px">
					<div>
						<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
							<el-radio-button :label="false">展开</el-radio-button>
							<el-radio-button :label="true">收起</el-radio-button>
						</el-radio-group>
					</div>
					<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true">
						<el-menu-item index="/list">
							<i class="el-icon-menu"></i>
							<span slot="title">节点列表</span>
						</el-menu-item>
						<el-submenu index="1">
							<template slot="title">
							<i class="el-icon-location"></i>
							<span slot="title">首页</span>
							</template>
							<el-menu-item-group>
							<span slot="title">类型</span>
							<el-menu-item index="1-1">条形图</el-menu-item>
							<el-menu-item index="1-2">饼图</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">概览</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
						<el-menu-item index="3" disabled>
							<i class="el-icon-document"></i>
							<span slot="title">操作</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">设置</span>
						</el-menu-item>
					</el-menu>
					
				</el-aside>
				<el-main>
					<router-view v-if="isRouterAlive"></router-view>
				</el-main>
			</el-container>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Main',
		data() {
			return {
				username: "路小月",
				systemname:"分布式集群监管系统",
				userid: 12345,
				isRouterAlive: true,
				isCollapse: true,
				
			}
		},
		computed: {
            
		},
		provide() {
           
		},
		created() {
           
		},
		methods: {
			loadPrivilegeSet: function() {
			
			},
			reload: function() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				})
			},
			logout: function() {
				this.$store.commit('changeLogin', false);
				this.$store.commit('changeUser', null);
				this.$router.push({
					name: 'Login',
				});
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>

	#building{
		background:url("../assets/backpic.jpg");
		width:100%;		
		height:100%;		
		position:fixed;
		background-size:100% 100%;
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
</style>
