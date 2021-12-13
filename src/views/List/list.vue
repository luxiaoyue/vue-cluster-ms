<template>
    <div id="list">
        <el-card class="list-card" >
            <div>
                <span style="font-size:20px">
                    监控节点信息列表
                </span>
            </div>

             <el-table :data="tableData" style="width: 100%;margin-top:50px;margin:center">
                <el-table-column prop="id" label="节点ID" width="300">
                </el-table-column>
                 <el-table-column prop="cpu" label="cpu占用信息" width="150">
                </el-table-column>
                <el-table-column prop="mem" label="mem占用信息" width="150">
                </el-table-column>
                <el-table-column prop="swap" label="swap占用信息" width="150">
                </el-table-column>
                <el-table-column prop="task" label="task（running）" width="150">
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini" type="primary"
                        @click="handleSearch(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination id="pagination"  background layout="prev, pager, next" 
            :page-count="pageParams.maxPageNum"  
            :current-page.sync="pageParams.currPage"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange">
            </el-pagination>   
        </el-card>
    </div>

</template>
<script>
	export default {
		name: 'Main',
		data() {
			return {
				tableData: [],
                nodeData:[],
                pageParams: {
					maxPageNum: 1,
					pageSize: 6,
					currPage: 1
				},
			}
		},
        created() {
            this.loadData();
            this.initialWebsocket();
        },
		methods: {
            loadData(){
                this.axios.get(`http://192.168.0.125:3000/data/all`).then(r=>{
					console.log(r.data);
					this.changeF(r.data);
			    }) 
            },
            initialWebsocket(){
                this.ws = new WebSocket(`ws://192.168.0.125:3000/websocket/all` );
                this.ws.onopen = this.wsOpen;
                this.ws.onclose = this.wsClose;
                this.ws.onerror = this.wsError;
                this.ws.onmessage = this.wsMessage;
            },
            handleSearch(index, row) {
                let node=this.nodeData[index];
                this.$router.push({
					name: 'detail',
					params: {
						node: node,
					}
				});
             },
             handleSizeChange(val) {
			        console.log(`每页 ${val} 条`);
			},
             handleCurrentChange(val) {
				 //console.log(`当前页: ${val}`);
				// console.log(val);
				 let begin=(val-1)*5;
				 let end=val*5;
				 
				 if(end>this.tableData.length){
					 end=this.tableData.length;
				 }
				 let ddata=[];
				 for(let i=begin;i<end;i++){
					 ddata[i]=this.tableData[i];
				 };
				 this.tableData=ddata;
			},
            changeF(json){
               // let json = JSON.parse(data);
               
                this.nodeData=json;
                this.tableData=json.map(element=>{
                    const obj={};
                    obj.id=element.id;
                    obj.cpu=`${Math.floor(100- element.info.cpu.id)}%`;
                    obj.mem=`${Math.floor(element.info.mem.used/element.info.mem.total)}%`;
                    obj.swap=`${Math.floor(element.info.swap['used.']/element.info.swap.total)}%`;
                    obj.task=`${element.info.task.running}个`;
                    return obj;
                })
                let size=this.tableData.length;
				//this.pageParams.maxPageNum=Math.ceil(size/5);
            },
            wsMessage(event) {
				let json = JSON.parse(event.data);
                 this.changeF(json);

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
		}
	}
</script>
<style scoped>

    #list{    
        background:#FFF;
        width:100%;
        height:550px;
        opacity:1;
    }
    .list-card{
        margin-top: 10px;
    }

    #pagination {
		margin-top: 15px;
		align-content: center;
	}

</style>

