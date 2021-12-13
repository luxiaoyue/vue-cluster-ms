<template>
    <div id="detail">
        <el-card >
            <div style="margin-top: 10px;">
			    <el-page-header @back="goBack" content="节点列表" ></el-page-header>
		    </div>
            <div style="margin:10px">
                节点: {{node.id}}
            </div>
            <div  v-if="showChart" v-show="isshow">
                <el-row>
                    <el-col :span="6">
                        <pie-chart v-bind:recordData="cpuData"></pie-chart>
                    </el-col>
                    <el-col :span="6">
                        <pie-chart v-bind:recordData="memData"></pie-chart>
                    </el-col>
                    <el-col :span="6">
                        <pie-chart v-bind:recordData="swapData"></pie-chart>
                    </el-col>
                    <el-col :span="6">
                    <pie-chart v-bind:recordData="taskData"></pie-chart>
                    </el-col>
                </el-row>
            </div>
            <div v-if="showChart" v-show="!isshow">
                <el-row>
                    <el-col :span="6">
                        <line-chart v-bind:recordData="cpulist"></line-chart>
                    </el-col>
                    <el-col :span="6">
                        <line-chart v-bind:recordData="memlist"></line-chart>
                    </el-col>
                    <el-col :span="6">
                        <line-chart v-bind:recordData="swaplist"></line-chart>
                    </el-col>
                    <el-col :span="6">
                        <line-chart v-bind:recordData="tasklist"></line-chart>
                    </el-col>
                </el-row>
            </div>
            <div class="changeShow">
                 <el-button type="primary" @click="change()" plain>切换</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    import pieChart from '../../components/pieChart.vue';
    import lineChart from '../../components/lineChart.vue';
	export default {
        components: { pieChart,lineChart },
		name: 'Main',
		data() {
			return {
                showChart:false,
				node: {
                    id: null,
                    cpu: null,
                    mem: null,
                    swap:null,
                    task:null
                },
                id:'',
                isshow:true,
                cpuData:  {
                    title: 'cpu使用',
                    name: 'cpu使用情况',
                    data: [
                        ["us", 1],
                        ["sy",0],
                        ["ni", 0],
                        ["id",0],
                        ["wa", 0],
                        ["hi", 0],
                        ["si",0],
                        ["st", 0]
                    ]
                },
                 memData:  {
                    title: 'mem使用',
                    name: 'mem使用情况',
                    data: [
                    ]
                },
                swapData:  {
                    title: 'swap使用',
                    name: 'swap使用情况',
                    data: [
                    ]
                },
                taskData:  {
                    title: 'task使用',
                    name: 'task使用情况',
                    data: [
                    ]
                },
                cpulist : {
                    title : "cpu使用",
                    xAxis:"x",
                    yAxis:"y",
                    data:[
                        ["us", 1],
                         ["sy",0],
                        ["ni", 0],
                        ["id",0],
                        ["wa", 0],
                        ["hi", 0],
                        ["si",0],
                        ["st", 0]
                    ]
                },
                memlist : {
                    title : "mem使用",
                    xAxis:"x",
                    yAxis:"y",
                    data:[]
                },
                swaplist : {
                    title : "swap使用",
                    xAxis:"x",
                    yAxis:"y",
                    data:[   
                    ]
                },
                tasklist : {
                    title : "task使用",
                    xAxis:"x",
                    yAxis:"y",
                    data:[]
                },
			}
        },      
        mounted() {
            var node = this.$route.params.node;
            //console.log("detail");
            //console.log(node);
            this.id=node.id;
            this.node=node;
            this.loadNode(this.id);
            this.initialWebsocket(this.id);
     
        },
		methods: {
            loadNode(id){
                this.axios.get(`http://192.168.0.125:3000/data/${id}`).then(r=>{
                     this.showChart=true;
					//console.log(r.data);
                    let json=r.data;
					if(json.length===0) return;
                    this.showChart=true;
                    //this.cpuData.data=this.changeData(json[0].info.cpu);
                    this.ydChange(json[0].info.cpu);
                   // console.log(this.cpuData.data);
                    this.memData.data=this.changeData(json[0].info.mem);
                    this.swapData.data=this.changeData(json[0].info.swap);
                    this.taskData.data=this.changeData(json[0].info.task);
                    this.cpulist.data=this.changeList(json[0].info.cpu);
                    this.memlist.data=this.changeList(json[0].info.mem);
                    this.swaplist.data=this.changeList(json[0].info.swap);
                    this.tasklist.data=this.changeList(json[0].info.task);
			    }) 
            },
            initialWebsocket(id){
                this.ws = new WebSocket(`ws://192.168.0.125:3000/websocket/${id}`);
                this.ws.onopen = this.wsOpen;
                this.ws.onclose = this.wsClose;
                this.ws.onerror = this.wsError;
                this.ws.onmessage = this.wsMessage;
            },
            initialData(data){

            },
            //对象转化为二维数组
            changeData(obj){ 
                const list=[];
                for(const key in obj){
                    const tmp=[];
                    tmp.push(key);
                    tmp.push(obj[key]);
                    list.push(tmp);
                } 
                return list;
               
            },
            //对象转化为一维数组
            changeList(obj){ 
                const list=[];
                for(const key in obj){  
                    list.push(obj[key]);
                }
                return list;
            },
            //切换函数
			change(){
                if(this.isshow){
                    this.isshow=false;
                }else{
                    this.isshow=true;
                }
		    },
            //websocket 部分
            wsMessage(event) {
				let json = JSON.parse(event.data);
				if(json.length===0) return;
                
                //console.log(json);
                //this.cpuData.data=this.changeData(json[0].info.cpu);
                // this.ydChange(json[0].info.cpu);
                //先清空
                this.cpuData.data.splice(0,this.cpuData.data.length);
                this.cpuData.data.push(...this.changeData(json[0].info.cpu));
                //console.log(this.cpuData.data);
                this.memData.data.splice(0,this.memData.data.length);
                this.memData.data.push(...this.changeData(json[0].info.mem));
                //this.memData.data=this.changeData(json[0].info.mem);
                this.swapData.data.splice(0,this.swapData.data.length);
                this.swapData.data.push(...this.changeData(json[0].info.swap));
                //this.swapData.data=this.changeData(json[0].info.swap);
                this.taskData.data.splice(0,this.taskData.data.length);
                this.taskData.data.push(...this.changeData(json[0].info.task));
                //this.taskData.data=this.changeData(json[0].info.task);
                //this.cpulist.data=this.changeList(json[0].info.cpu);
                //this.ydChange(json[0].info.cpu)
                this.cpulist.data.splice(0,this.cpulist.data.length);
                this.cpulist.data.push(...this.changeList(json[0].info.cpu));
               // this.memlist.data=this.changeList(json[0].info.mem);
                this.memlist.data.splice(0,this.memlist.data.length);
                this.memlist.data.push(...this.changeList(json[0].info.mem));
                //this.swaplist.data=this.changeList(json[0].info.swap);
                this.swaplist.data.splice(0,this.swaplist.data.length);
                this.swaplist.data.push(...this.changeList(json[0].info.swap));
                //this.tasklist.data=this.changeList(json[0].info.task);
                this.tasklist.data.splice(0,this.tasklist.data.length);
                this.tasklist.data.push(...this.changeList(json[0].info.task));
                
			},
            ydChange(data){
                //this.$set()
                this.showChart=false;
                console.log(`====================yd cpu====================`)
                for(const index in this.cpuData.data){
                    const key= this.cpuData.data[index][0];
                    this.cpuData.data[index][1]=data[key];
                }
                this.showChart=true;
                console.log(this.cpuData.data);
            },
			wsOpen() {
				//console.log('websocket-连接已经建立');
			},
			wsClose() {
				//console.log('websocket-连接已经关闭');
			},
			wsError() {
				//console.log('websocket-出现错误');
			},

            goBack(){
				this.$router.go(-1);
			},
	    }
    }
</script>
<style scoped>

    #datail{    
        background:#FFF;
        width:100%;
        height:500px;
        opacity:1;
    }
    .changeShow{
        /* margin-right: 50px; */
        float:right;
    }

</style>

