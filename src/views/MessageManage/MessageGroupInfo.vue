<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="房间号：某活动 某组织等">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.roomId" placeholder="房间号：某活动 某组织等"></el-input>
        </el-form-item>
        <el-form-item label="消息来源">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.fromId" placeholder="消息来源"></el-input>
        </el-form-item>
        <el-form-item label="消息去向">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.toId" placeholder="消息去向"></el-input>
        </el-form-item>
        <el-form-item label="图片地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.url" placeholder="图片地址"></el-input>
        </el-form-item>
        <el-form-item label="名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="APP主键">
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
	      </el-date-picker>
	      
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="handleAddMessageGroupInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="房间号：某活动 某组织等">
        <template slot-scope="scope">
          <span>{{scope.row.roomId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="消息来源">
        <template slot-scope="scope">
          <span>{{scope.row.fromId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="消息去向">
        <template slot-scope="scope">
          <span>{{scope.row.toId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="图片地址">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.url">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="状态 0-已发送 1-已阅读 2-未阅读">
        <template slot-scope="scope">
          <span>{{scope.row.seeStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="类型：1-文本 2-图片">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
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
          <el-button type="success" size="mini" @click="handleEditMessageGroupInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteMessageGroupInfo(scope.row)">删除</el-button>
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
      <el-form ref="messageGroupInfoForm" :model="messageGroupInfoParam" :rules="messageGroupInfoRules" status-icon label-width="130px">
        <el-form-item label="房间号：某活动 某组织等" prop="roomId">
           <el-input v-model="messageGroupInfoParam.roomId"></el-input>
        </el-form-item>
        <el-form-item label="消息来源" prop="fromId">
           <el-input v-model="messageGroupInfoParam.fromId"></el-input>
        </el-form-item>
        <el-form-item label="消息去向" prop="toId">
           <el-input v-model="messageGroupInfoParam.toId"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="message">
          <tinymce v-model="messageGroupInfoParam.message" :id="tid_message" ref="tinymce_message"/>
        </el-form-item>
        <el-form-item label="图片地址" prop="url">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadurl">
            <img v-if="messageGroupInfoParam.url" :src="messageGroupInfoParam.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="状态 0-已发送 1-已阅读 2-未阅读" prop="seeStatus">
           <el-input type="number" v-model="messageGroupInfoParam.seeStatus"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="类型：1-文本 2-图片" prop="type">
           <el-input type="number" v-model="messageGroupInfoParam.type"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
           <el-input type="number" v-model="messageGroupInfoParam.sorts"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
           <el-input v-model="messageGroupInfoParam.name"></el-input>
        </el-form-item>
        <el-form-item label="APP主键" prop="appId">
           <el-input v-model="messageGroupInfoParam.appId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="messageGroupInfoParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="messageGroupInfoParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人id" prop="createId">
           <el-input v-model="messageGroupInfoParam.createId"></el-input>
        </el-form-item>



      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { pageListMessageGroupInfo, listMessageGroupInfo, detailMessageGroupInfo, saveMessageGroupInfo, updateMessageGroupInfo, delMessageGroupInfo } from '@/api/MessageGroupInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //主键
    roomId: null, //房间号：某活动 某组织等
    fromId: null, //消息来源
    toId: null, //消息去向
    message: null, //消息内容
    url: null, //图片地址
    seeStatus: null, //状态 0-已发送 1-已阅读 2-未阅读
    type: null, //类型：1-文本 2-图片
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
    name: 'messageGroupInfo',
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
	     messageGroupInfoRules: {
	       roomId: [{ required: true, trigger: 'change', message: '房间号：某活动 某组织等不能为空' }],
	       fromId: [{ required: true, trigger: 'change', message: '消息来源不能为空' }],
	       toId: [{ required: true, trigger: 'change', message: '消息去向不能为空' }],
	       message: [{ required: true, trigger: 'change', message: '消息内容不能为空' }],
	       url: [{ required: true, trigger: 'change', message: '图片地址不能为空' }],
	       seeStatus: [{ required: true, trigger: 'change', message: '状态 0-已发送 1-已阅读 2-未阅读不能为空' }],
	       type: [{ required: true, trigger: 'change', message: '类型：1-文本 2-图片不能为空' }],
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
          roomId: null, //房间号：某活动 某组织等
          fromId: null, //消息来源
          toId: null, //消息去向
          message: null, //消息内容
          url: null, //图片地址
          seeStatus: null, //状态 0-已发送 1-已阅读 2-未阅读
          type: null, //类型：1-文本 2-图片
          sorts: null, //排序
          name: null, //名称
          appId: null, //APP主键
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        messageGroupInfoParam: Object.assign({}, defaultParam),
        tid_message: 'tinymce_message' + new Date().getMilliseconds(),
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
      this.pageListMessageGroupInfo()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListMessageGroupInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListMessageGroupInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListMessageGroupInfo()
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
      picUploadurl(file) {
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
              this.messageGroupInfoParam.url = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListMessageGroupInfo() {
        this.listLoading = true
        pageListMessageGroupInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddMessageGroupInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.messageGroupInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce_message.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditMessageGroupInfo(item) {
        this.dialogStatus = 'update'
        this.messageGroupInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce_message.setContent(item.message)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.messageGroupInfoForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.messageGroupInfoParam.id == null) {
		          saveMessageGroupInfo(this.messageGroupInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMessageGroupInfo()
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
		          updateMessageGroupInfo(this.messageGroupInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMessageGroupInfo()
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
      handleDeleteMessageGroupInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMessageGroupInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListMessageGroupInfo()
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
</style>
