<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="话题标签">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.topic" placeholder="话题标签"></el-input>
        </el-form-item>
        <el-form-item label="代号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.code" placeholder="代号"></el-input>
        </el-form-item>
        <el-form-item label="地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.addressDetail" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.coverImg" placeholder="封面图片"></el-input>
        </el-form-item>
        <el-form-item label="活动海报 多张海报用|分割">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.post" placeholder="活动海报 多张海报用|分割"></el-input>
        </el-form-item>

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
        <el-button type="primary" @click="handleAddTopicInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="300px" align="center" label="主键">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="话题标签">
        <template slot-scope="scope">
          <span>{{scope.row.topic}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="代号">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="350px" align="center" label="封面图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.coverImg">
        </template>
      </el-table-column> -->
      <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleEditTopicInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteTopicInfo(scope.row)">删除</el-button>
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
      <el-form ref="form" :model="topicInfoParam" :rules="topicInfoRules" status-icon label-width="80px">
        <el-form-item label="话题标签" prop="topic">
           <el-input v-model="topicInfoParam.topic"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="content">
          <tinymce v-model="topicInfoParam.content" :id="tid" ref="tinymce"/>
        </el-form-item>
        <el-form-item label="参与数量" prop="amount">
           <el-input type="number" v-model="topicInfoParam.amount"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="代号" prop="code">
           <el-input v-model="topicInfoParam.code"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
           <el-input type="number" v-model="topicInfoParam.latitude"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
           <el-input type="number" v-model="topicInfoParam.longitude"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
           <el-input v-model="topicInfoParam.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail">
           <el-input v-model="topicInfoParam.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUpload">
            <img v-if="topicInfoParam.coverImg" :src="topicInfoParam.coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动海报 多张海报用|分割" prop="post">
           <el-input v-model="topicInfoParam.post"></el-input>
        </el-form-item>
        <el-form-item label="举办状态：1-未开始 2-进行中 3-已结束" prop="holdStatus">
           <el-input type="number" v-model="topicInfoParam.holdStatus"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label=" 状态： 0-审核中 1-通过 2-拒绝" prop="status">
           <el-input type="number" v-model="topicInfoParam.status"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="收费类型： 1-免费 2-女免费男AA 3-女半价男AA" prop="chargeType">
           <el-input type="number" v-model="topicInfoParam.chargeType"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="收费方式" prop="chargeDesc">
           <el-input v-model="topicInfoParam.chargeDesc"></el-input>
        </el-form-item>
        <el-form-item label="是否取消 1-正常 2-取消" prop="isCancel">
           <el-input type="number" v-model="topicInfoParam.isCancel"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="取消原因" prop="cancelExplain">
           <el-input v-model="topicInfoParam.cancelExplain"></el-input>
        </el-form-item>
        <el-form-item label="是否删除 0-正常 1-删除" prop="isDel">
           <el-input type="number" v-model="topicInfoParam.isDel"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="会员id" prop="createId">
           <el-input v-model="topicInfoParam.createId"></el-input>
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
  import { pageListTopicInfo, listTopicInfo, detailTopicInfo, saveTopicInfo, updateTopicInfo, delTopicInfo } from '@/api/TopicInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //主键
    topic: null, //话题标签
    content: null, //介绍
    amount: null, //参与数量
    code: null, //代号
    latitude: null, //纬度
    longitude: null, //经度
    address: null, //地址
    addressDetail: null, //详细地址
    coverImg: null, //封面图片
    post: null, //活动海报 多张海报用|分割
    holdTime: null, //活动开始时间
    overTime: null, //活动结束时间
    holdStatus: null, //举办状态：1-未开始 2-进行中 3-已结束
    status: null, // 状态： 0-审核中 1-通过 2-拒绝
    chargeType: null, //收费类型： 1-免费 2-女免费男AA 3-女半价男AA
    chargeDesc: null, //收费方式
    isCancel: null, //是否取消 1-正常 2-取消
    cancelExplain: null, //取消原因
    isDel: null, //是否删除 0-正常 1-删除
    createId: null, //会员id
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

  export default {
    name: 'topicInfo',
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
	     topicInfoRules: {
	       topic: [{ required: true, trigger: 'blur', message: '话题标签不能为空' }],
	       content: [{ required: true, trigger: 'blur', message: '介绍不能为空' }],
	       amount: [{ required: true, trigger: 'blur', message: '参与数量不能为空' }],
	       code: [{ required: true, trigger: 'blur', message: '代号不能为空' }],
	       latitude: [{ required: true, trigger: 'blur', message: '纬度不能为空' }],
	       longitude: [{ required: true, trigger: 'blur', message: '经度不能为空' }],
	       address: [{ required: true, trigger: 'blur', message: '地址不能为空' }],
	       addressDetail: [{ required: true, trigger: 'blur', message: '详细地址不能为空' }],
	       coverImg: [{ required: true, trigger: 'blur', message: '封面图片不能为空' }],
	       post: [{ required: true, trigger: 'blur', message: '活动海报 多张海报用|分割不能为空' }],
	       holdTime: [{ required: true, trigger: 'blur', message: '活动开始时间不能为空' }],
	       overTime: [{ required: true, trigger: 'blur', message: '活动结束时间不能为空' }],
	       holdStatus: [{ required: true, trigger: 'blur', message: '举办状态：1-未开始 2-进行中 3-已结束不能为空' }],
	       status: [{ required: true, trigger: 'blur', message: ' 状态： 0-审核中 1-通过 2-拒绝不能为空' }],
	       chargeType: [{ required: true, trigger: 'blur', message: '收费类型： 1-免费 2-女免费男AA 3-女半价男AA不能为空' }],
	       chargeDesc: [{ required: true, trigger: 'blur', message: '收费方式不能为空' }],
	       isCancel: [{ required: true, trigger: 'blur', message: '是否取消 1-正常 2-取消不能为空' }],
	       cancelExplain: [{ required: true, trigger: 'blur', message: '取消原因不能为空' }],
	       isDel: [{ required: true, trigger: 'blur', message: '是否删除 0-正常 1-删除不能为空' }],
	       createId: [{ required: true, trigger: 'blur', message: '会员id不能为空' }],
	       createTime: [{ required: true, trigger: 'blur', message: '创建时间不能为空' }],
	       updateTime: [{ required: true, trigger: 'blur', message: '更新时间不能为空' }],
	      },
        dialogVisible: false,
        dialogStatus: 'create',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          pageSize: 10,
          id: null, //主键
          topic: null, //话题标签
          content: null, //介绍
          amount: null, //参与数量
          code: null, //代号
          latitude: null, //纬度
          longitude: null, //经度
          address: null, //地址
          addressDetail: null, //详细地址
          coverImg: null, //封面图片
          post: null, //活动海报 多张海报用|分割
          holdTime: null, //活动开始时间
          overTime: null, //活动结束时间
          holdStatus: null, //举办状态：1-未开始 2-进行中 3-已结束
          status: null, // 状态： 0-审核中 1-通过 2-拒绝
          chargeType: null, //收费类型： 1-免费 2-女免费男AA 3-女半价男AA
          chargeDesc: null, //收费方式
          isCancel: null, //是否取消 1-正常 2-取消
          cancelExplain: null, //取消原因
          isDel: null, //是否删除 0-正常 1-删除
          createId: null, //会员id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        topicInfoParam: Object.assign({}, defaultParam),
        tid: 'tinymce-' + new Date().getMilliseconds()
      }
    },
    created() {
      this.pageListTopicInfo()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListTopicInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListTopicInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListTopicInfo()
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
      picUpload(file) {
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
              this.topicInfoParam.coverImg = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListTopicInfo() {
        this.listLoading = true
        pageListTopicInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddTopicInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.topicInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditTopicInfo(item) {
        this.dialogStatus = 'update'
        this.topicInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce.setContent(item.content)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        // 主键为空 -> 新增
        if (this.topicInfoParam.id == null) {
          saveTopicInfo(this.topicInfoParam).then(response => {
            if (response.code === 600) {
              this.dialogVisible = false
              this.pageListTopicInfo()
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
          updateTopicInfo(this.topicInfoParam).then(response => {
            if (response.code === 600) {
              this.dialogVisible = false
              this.pageListTopicInfo()
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
      },
      // 删除
      handleDeleteTopicInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTopicInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListTopicInfo()
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
