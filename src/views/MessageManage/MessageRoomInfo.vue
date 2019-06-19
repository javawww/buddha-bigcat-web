<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="房间密码">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.passCode" placeholder="房间密码"></el-input>
        </el-form-item> -->
        <el-form-item label="代号标记">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.mark" placeholder="代号标记"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.coverPic" placeholder="图片"></el-input>
        </el-form-item> -->
        <el-form-item label="名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" placeholder="名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="APP主键">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.appId" placeholder="APP主键"></el-input>
        </el-form-item>
        <el-form-item label="创建人id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.createId" placeholder="创建人id"></el-input>
        </el-form-item>
        <el-date-picker
            style="width: 200px;" class="filter-item"
            v-model="listQuery.createTime"
            type="date"
            placeholder="创建时间"
            :picker-options="pickerOptions0">
        </el-date-picker>
        <el-date-picker
            style="width: 200px;" class="filter-item"
            v-model="listQuery.updateTime"
            type="date"
            placeholder="更新时间"
            :picker-options="pickerOptions0">
        </el-date-picker>
          <br>
          <el-date-picker
             style="width: 200px;" class="filter-item"
             v-model="listQuery.beginTime"
             type="date"
             placeholder="开始日期"
             :picker-options="pickerOptions0">
	      </el-date-picker>
	      <el-date-picker
	             style="width: 200px;" class="filter-item"
	             v-model="listQuery.endTime"
	             type="date"
	             placeholder="结束日期"
	             :picker-options="pickerOptions1">
	      </el-date-picker> -->

          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="handleAddMessageRoomInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="房间密码">
        <template slot-scope="scope">
          <span>{{scope.row.passCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="代号标记">
        <template slot-scope="scope">
          <span>{{scope.row.mark}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="收费金额">
        <template slot-scope="scope">
          <span>{{scope.row.charge}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.coverPic">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.sorts}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="APP主键">
        <template slot-scope="scope">
          <span>{{scope.row.appId}}</span>
        </template>
      </el-table-column>
	  <el-table-column width="" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
  	  <el-table-column width="" align="center" label="删除">
        <template slot-scope="scope">
          <el-tag>{{scope.row.isDel | isDelFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="创建人id">
        <template slot-scope="scope">
          <span>{{scope.row.createId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作"  width="" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleEditMessageRoomInfo(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleEnterMessageRoomInfo(scope.row)">进入房间</el-button>
          <!-- <el-button type="danger" size="mini" @click="handleDeleteMessageRoomInfo(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <el-form ref="messageRoomInfoForm" :model="messageRoomInfoParam" :rules="messageRoomInfoRules" status-icon label-width="130px">
        <el-form-item label="房间密码" prop="passCode">
           <el-input v-model="messageRoomInfoParam.passCode"></el-input>
        </el-form-item>
        <el-form-item label="代号标记" prop="mark">
           <el-input v-model="messageRoomInfoParam.mark"></el-input>
        </el-form-item>
        <el-form-item label="收费金额" prop="charge">
           <el-input type="number" v-model="messageRoomInfoParam.charge"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="coverPic">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadcoverPic">
            <img v-if="messageRoomInfoParam.coverPic" :src="messageRoomInfoParam.coverPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="messageRoomInfoParam.content" :id="tid_content" ref="tinymce_content"/>
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
           <el-input type="number" v-model="messageRoomInfoParam.sorts"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
           <el-input v-model="messageRoomInfoParam.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="APP主键" prop="appId">
           <el-input v-model="messageRoomInfoParam.appId"></el-input>
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="messageRoomInfoParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="messageRoomInfoParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建人id" prop="createId">
           <el-input v-model="messageRoomInfoParam.createId"></el-input>
        </el-form-item> -->



      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      :title="roomTitle"
      :visible.sync="roomDialogVisible"
      :close-on-click-modal="false"
      :show-close	="true"
      @close="handleRoomClose"
      top="0"
      width="70%"
      custom-class="myDialoyHeight">
      <el-container style="border: 1px solid #eee;height:750px;">

        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-row :gutter="20" v-for="(user,index) in onlineUserList" class="mybottomBorder">
            <el-col :span="10">
              <!-- <i>{{index}}</i> -->
              <img class="message-avatar" :src="user.avatar" alt="">
            </el-col>
            <el-col :span="10">
              <b>{{user.nickname}}</b>
            </el-col>
          </el-row>
        </el-aside>

        <el-container>
          <el-main id="new_message" style="margin:0px;">
            <!-- 别人模板 -->
            <div v-for="(item,index) in msgList">
              <div v-if="item.msgType=='other'" class="other">
                <el-row :gutter="20">
                  <el-col :span="4">
                    <img class="message-avatar" :src="item.user.avatar" alt="">
                    <b>{{item.user.nickname}}</b>
                  </el-col>
                  <el-col :span="16">
                    <div class="myMsgContent" v-html="item.msg"></div>
                  </el-col>
                  <el-col :span="4">
                    {{item.datetime}}
                  </el-col>
                </el-row>
              </div>
              <div v-if="item.msgType=='mine'" class="mine">
                <el-row :gutter="20">
                  <el-col :span="4">
                    {{item.datetime}}
                  </el-col>
                  <el-col :span="16">
                    <div class="myMsgContent" v-html="item.msg"></div>
                  </el-col>
                  <el-col :span="4">
                    <img class="message-avatar" :src="item.user.avatar" alt="">
                    <b>{{item.user.nickname}}</b>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-main>
          <el-footer height="350px">
            <el-form status-icon label-width="">
              <el-form-item label="内容" prop="content">
                <tinymce v-model="messageContent" :id="tid_roomContent" ref="tinymce_roomContent" :height="200"/>
              </el-form-item>
            </el-form>
          </el-footer>
        </el-container>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSendMessage">发 送</el-button>
        <el-button type="danger" @click="roomDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { pageListMessageRoomInfo, listMessageRoomInfo, detailMessageRoomInfo, saveMessageRoomInfo, updateMessageRoomInfo, delMessageRoomInfo } from '@/api/MessageRoomInfo.js'
  import { pageListMessageGroupInfo, listMessageGroupInfo, detailMessageGroupInfo, saveMessageGroupInfo, updateMessageGroupInfo,
    delMessageGroupInfo,roomUserAdd,roomUserDelete,roomUserList ,chatList} from '@/api/MessageGroupInfo.js'
  import { detailSystemAdmin} from '@/api/SystemAdmin.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  import SockJS from  'sockjs-client';
  import  Stomp from 'stompjs';
  import { getTokenMemberId } from '@/utils/auth'
  import {DateTime} from '@/utils/DataTime'

  const defaultParam = {
    id: null, //主键
    passCode: null, //房间密码
    mark: null, //代号标记
    charge: null, //收费金额
    coverPic: null, //图片
    content: null, //内容
    sorts: null, //排序
    name: null, //名称
    appId: null, //APP主键
    status: null, //状态
    isDel: null, //删除
    createId: null, //创建人id
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

  export default {
    name: 'messageRoomInfo',
    directives: {waves },
    components: { Tinymce },
    data() {
      return {
	       pickerOptions0: {
	       disabledDate: (time) => {
	          if (this.value2 != '') {
	            return time.getTime() > Date.now() || time.getTime() > this.value2
	          } else {
	            return time.getTime() > Date.now()
	          }
	        }
	      },
	     pickerOptions1: {
	        disabledDate: (time) => {
	          return time.getTime() < this.value1 || time.getTime() > Date.now()
	        }
	     },
	     isDelOptions: [{ label: '正常', key: 0 }, { label: '删除', key: 1 }],
       statusOptions: [{ label: '审核中', key: 0 }, { label: '通过', key: 1 }, { label: '拒绝', key: 2 }],
	     messageRoomInfoRules: {
	       passCode: [{ required: true, trigger: 'change', message: '房间密码不能为空' }],
	       mark: [{ required: true, trigger: 'change', message: '代号标记不能为空' }],
	       charge: [{ required: true, trigger: 'change', message: '收费金额不能为空' }],
	       coverPic: [{ required: true, trigger: 'change', message: '图片不能为空' }],
	       content: [{ required: true, trigger: 'change', message: '内容不能为空' }],
	       sorts: [{ required: true, trigger: 'change', message: '排序不能为空' }],
	       name: [{ required: true, trigger: 'change', message: '名称不能为空' }],
	       appId: [{ required: true, trigger: 'change', message: 'APP主键不能为空' }],
	       status: [{ required: true, trigger: 'change', message: '状态不能为空' }],
	       isDel: [{ required: true, trigger: 'change', message: '删除不能为空' }],
	       createId: [{ required: true, trigger: 'change', message: '创建人id不能为空' }],
	       createTime: [{ required: true, trigger: 'change', message: '创建时间不能为空' }],
	       updateTime: [{ required: true, trigger: 'change', message: '更新时间不能为空' }],
	      },
        dialogVisible: false,
        dialogStatus: 'create',
        textMap: {
          update: '编辑',
          create: '新增'
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          pageSize: 10,
          id: null, //主键
          passCode: null, //房间密码
          mark: null, //代号标记
          charge: null, //收费金额
          coverPic: null, //图片
          content: null, //内容
          sorts: null, //排序
          name: null, //名称
          appId: null, //APP主键
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        messageRoomInfoParam: Object.assign({}, defaultParam),
        tid_content: 'tinymce_content' + new Date().getMilliseconds(),
        // 在线交流
        messageGroupInfoParam:{
          roomId:null,//房间id
          fromId:null,//登录会员id
          toId:null,//房间id
        },
        systemAdminInfoParam:{id:null},
        messageContent:'',
        tid_roomContent: 'tinymce_roomContent' + new Date().getMilliseconds(),
        roomTitle:'房间标题',
        roomDialogVisible:false,
        stompClient:'',
        timer:'',
        currentRoomId:'',//当前房间ID
        tokenMemberId: null,//当前登录会员
        onlineUserList:[],//在线列表
        onlineTimer:'',//定时器
        msgList:[],//发送消息列表
      }
    },
    filters: {
      statusFilter(level) {
        const statusArr = ['审核中', '通过', '拒绝']
        return statusArr[level]
      },
      isDelFilter(level) {
        const isDelArr = ['正常', '删除']
        return isDelArr[level]
      }
    },
    created() {
      this.pageListMessageRoomInfo()
    },
    mounted(){
      // this.initWebSocket()
      this.tokenMemberId = getTokenMemberId()
    },
    beforeDestroy() {
      clearInterval(this.onlineTimer);
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListMessageRoomInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListMessageRoomInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListMessageRoomInfo()
      },
      // 图片上传前验证
      // 一般情况下只需要实现以下函数即可
      // 图片上传前验证
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // 上传图片到OSS 同时派发一个事件给父组件监听
      picUploadcoverPic(file) {
        getTempAuthToken().then(res => {
          const originName = file.file.name
          // 设置文件名
          let fileName = new Date().getTime() + Math.ceil(Math.random() * 100000)
          const index1 = originName.lastIndexOf('.')
          const index2 = originName.length
          fileName += originName.substring(index1, index2)
          const oss = res.data
          oss.key = oss.dir + fileName
          // oss.fileUploadUrl = 'http://hasaki-business.oss-cn-shenzhen.aliyuncs.com'
          console.log('oss dir value  is : ', oss)
          // 图片通过表单方式上传，所以要声明一个表单对象
          var ossData = new FormData()
          ossData.append('name', file.file.name)
          // key就代表文件层级和阿里云上的文件名
          ossData.append('key', oss.key)
          ossData.append('policy', oss.policy)
          ossData.append('OSSAccessKeyId', oss.accessKeyId)
          // 阿里云正常返回204，然后返回信息是空的，想看到返回信息强制让它返回201，返回一个xml文件可以提取有用的信息
          ossData.append('success_action_status', oss.successActionStatus)
          ossData.append('signature', oss.signature)
          ossData.append('file', file.file, file.file.name)
          axios.post(oss.fileUploadUrl, ossData, {
            headers: { 'Content-Type': 'multipart/form-data; boundary={boundary}' }
          })
            .then(res => {
              this.messageRoomInfoParam.coverPic = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListMessageRoomInfo() {
        this.listLoading = true
        pageListMessageRoomInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddMessageRoomInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.messageRoomInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce_content.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditMessageRoomInfo(item) {
        this.dialogStatus = 'update'
        this.messageRoomInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce_content.setContent(item.content)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.messageRoomInfoForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.messageRoomInfoParam.id == null) {
		          saveMessageRoomInfo(this.messageRoomInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMessageRoomInfo()
		            } else {
		              this.$message({
		                message: response.msg,
		                type: 'error'
		              })
		            }
		          }).catch(error => {
		            console.log('发生错误了')
		            console.dir(error)
		          })
		        } else {
		          // 有主键 -> 更新
		          updateMessageRoomInfo(this.messageRoomInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMessageRoomInfo()
		            } else {
		              this.$message({
		                message: response.msg,
		                type: 'error'
		              })
		            }
		          }).catch(error => {
		            console.log('发生错误了')
		            console.dir(error)
		          })
		        }
        	}
        })
      },
      // 删除
      handleDeleteMessageRoomInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMessageRoomInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListMessageRoomInfo()
            } else {
              this.$message({
                message: response.msg,
                type: 'error'
              })
            }
          }).catch(error => {
            console.log('发生错误了')
            console.dir(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 进入房间
      handleEnterMessageRoomInfo(item){
        this.roomDialogVisible = true
        this.roomTitle = item.name
        this.currentRoomId = item.id
        // 查询历史消息
        this.messageGroupInfoParam.toId = item.id
        this.messageGroupInfoParam.fromId = this.tokenMemberId
        chatList(this.messageGroupInfoParam).then(response => {
          console.log('历史消息列表');

          if(response.code===600){
            this.msgList=response.data
            console.dir(this.msgList);
            // 滚动最底部
            this.$nextTick(() => {
              var container = this.$el.querySelector("#new_message");
              container.scrollTop = container.scrollHeight;
            })
          }
        })
        // 初始化订阅 WS
        this.initWebSocket()
      },
      // 初始化WEBSOCKE
      initWebSocket(e){
        // 建立连接对象
        // let socket = new SockJS('/chat/websocket')
        // let socket = new SockJS('/chat/websocket');
        // debugger;
        console.log("socket=======================>")
        // console.dir(socket);
        // 获取STOMP子协议的客户端对象
        // this.stompClient = Stomp.over(socket);
        this.stompClient = Stomp.client('wss://chat.ywq157.com/websocket') // 正式环境
        // this.stompClient = Stomp.client('ws://192.168.8.178:8002/websocket') // 本地环境
        // this.stompClient.heartbeat.outgoing = 0 // 客户端不发送
        // this.stompClient.heartbeat.incoming = 10000     // 客户端每10s接收一次数据从服务器
        // 定义客户端的认证信息,按需求配置
        let headers = { Authorization:'' }
        this.stompClient.connect(headers, res => {
          console.log('连接成功后');
          console.dir(res);
          // 记录用户进入聊天室
          this.messageGroupInfoParam.roomId = this.currentRoomId
          this.messageGroupInfoParam.toId = this.currentRoomId
          this.messageGroupInfoParam.fromId = this.tokenMemberId
          roomUserAdd(this.messageGroupInfoParam).then(response => {
            console.log('记录会员进入聊天室');
            console.dir(response)
            if(response.code===600){
              // 订阅房间消息
              this.stompClient.subscribe('/topic/chat-group/' + this.currentRoomId,(msg) => {
                console.log('接收到群消息')
                let msgBody = JSON.parse(msg.body)
                console.dir(msgBody)

                //发送消息
                this.systemAdminInfoParam.id = msgBody.from // 发消息的会员id
                let date = new DateTime()
                let datetime = date.getDate() + date.getTime()
                // 查询发消息会员信息
                detailSystemAdmin(this.systemAdminInfoParam).then(response => {
                  console.log('会员信息===>');
                  console.dir(response);
                  if(response.code===600){
                    if(msgBody.from===this.tokenMemberId){
                      console.log('自己看到的');
                      let mineMsg = {
                        from:msgBody.from,
                        msg:msgBody.msg,
                        msgType:'mine',
                        user:response.data,
                        datetime:datetime,
                      }
                      this.msgList.push(mineMsg)
                    }else{
                      console.log('别人看到的');
                      let otherMsg = {
                        from:msgBody.from,
                        msg:msgBody.msg,
                        msgType:'other',
                        user:response.data,
                        datetime:datetime,
                      }
                      this.msgList.push(otherMsg)
                    }
                  }
                })
              })
              // 获取在线列表
              this.onlineTimer = setInterval(this.roomUserList, 3000)
            }
          })
        },(err) =>{
          // 连接发生错误时的处理函数
           console.log('失败')
           console.log(err)
        })
      },
      roomUserList(){
        roomUserList(this.messageGroupInfoParam).then(response => {
          console.log('当前在线列表');
          console.dir(response);
          this.onlineUserList = response.data
        })
      },
      // 发送消息
      handleSendMessage(e){
        // 判断消息内容
        console.log('发送消息内容');
        console.dir(this.messageContent);
        if(this.messageContent===''){
          this.$message({
            message: '消息内容不能为空',
            type: 'warning'
          });
          return
        }
        var msg = {
              method: 'group',
              from: getTokenMemberId(),
              to: this.currentRoomId,
              msg: this.messageContent,
              param: {
                type: 1
              }
            }
        // 保存消息到数据库START
        this.messageGroupInfoParam.message = this.messageContent
        saveMessageGroupInfo(this.messageGroupInfoParam).then(response => {
          if(response.code===600){
            // 清空消息
            this.$nextTick(() => {
              this.$refs.tinymce_roomContent.setContent('')
              var container = this.$el.querySelector("#new_message");
              container.scrollTop = container.scrollHeight;
            })
          }
        })
        this.stompClient.send("/app/chat-group/"+ this.currentRoomId , {}, JSON.stringify(msg))
      },
      handleRoomClose(e){
        // this.roomDialogVisible = false
        // 退出房间
        roomUserDelete(this.messageGroupInfoParam).then(response => {
          clearInterval(this.onlineTimer)
          this.msgList = []
          console.log('退出房间了')
          console.dir(response)
        })
      }
    },
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    min-width: 178px;
    height: 178px;
    display: block;
  }

  .other{
    /* border:1px solid blue; */
      background-color:#AEDD81;
  }
  .mine{
    /* border:1px solid green; */
    background-color:#84AF9B;
  }
  .message-avatar{
    min-width: 58px;
    height: 58px;
    display: block;
  }

  .mybottomBorder{
    border-bottom:1px solid red;
  }
  .myDialoyHeight{
    height:100%;
  }
</style>
