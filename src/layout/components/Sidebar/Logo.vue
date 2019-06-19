<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" @click="dialogFormVisible = true">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>

    <!-- 切换APP -->
    <el-dialog title="请选择一个APP工作台"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :show-close	= "true"
    append-to-body>
      <el-form ref="appConfigInfoForm2" :model="appConfigInfoParam"  :rules="appConfigInfoRules2" status-icon label-width="80px">
        <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="APP应用选择" :label-width="formLabelWidth" prop="id">
          <el-select class="filter-item" v-model="appConfigInfoParam.id" placeholder="请选择">
            <el-option v-for="item in  appOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="chooseAppConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!--  创建APP应用-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close	= "false"
      append-to-body
      width="50%">
      <el-form ref="appConfigInfoForm" :model="appConfigInfoParam" :rules="appConfigInfoRules" status-icon label-width="80px">
        <!-- <el-form-item label="代号" prop="codeName">
           <el-input v-model="appConfigInfoParam.codeName"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="name">
           <el-input v-model="appConfigInfoParam.name"></el-input>
        </el-form-item>
        <el-form-item label="logo图片" prop="logoPic">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadlogoPic">
            <img v-if="appConfigInfoParam.logoPic" :src="appConfigInfoParam.logoPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="二维码图片1" prop="qrcodePic1">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadqrcodePic1">
            <img v-if="appConfigInfoParam.qrcodePic1" :src="appConfigInfoParam.qrcodePic1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="二维码图片2" prop="qrcodePic2">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadqrcodePic2">
            <img v-if="appConfigInfoParam.qrcodePic2" :src="appConfigInfoParam.qrcodePic2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="引导图片1" prop="bootPic1">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadbootPic1">
            <img v-if="appConfigInfoParam.bootPic1" :src="appConfigInfoParam.bootPic1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="引导图片2" prop="bootPic2">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadbootPic2">
            <img v-if="appConfigInfoParam.bootPic2" :src="appConfigInfoParam.bootPic2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="引导图片3" prop="bootPic3">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadbootPic3">
            <img v-if="appConfigInfoParam.bootPic3" :src="appConfigInfoParam.bootPic3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverPic">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadcoverPic">
            <img v-if="appConfigInfoParam.coverPic" :src="appConfigInfoParam.coverPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="功能描述" prop="functionDesc">
          <tinymce v-model="appConfigInfoParam.functionDesc" :id="tid_functionDesc" ref="tinymce_functionDesc" />
        </el-form-item> -->
        <el-form-item label="注册协议" prop="registDesc">
          <tinymce v-model="appConfigInfoParam.registDesc" :id="tid_registDesc" ref="tinymce_registDesc" />
        </el-form-item>
        <el-form-item label="微信公众号" prop="wechatPublicNum">
           <el-input v-model="appConfigInfoParam.wechatPublicNum"></el-input>
        </el-form-item>
        <el-form-item label="客服热线" prop="customerHotline">
           <el-input v-model="appConfigInfoParam.customerHotline"></el-input>
        </el-form-item>
        <el-form-item label="加盟商" prop="allianceBusiness">
           <el-input v-model="appConfigInfoParam.allianceBusiness"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" prop="downloadLink">
           <el-input v-model="appConfigInfoParam.downloadLink"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalMan">
           <el-input v-model="appConfigInfoParam.legalMan"></el-input>
        </el-form-item>
        <el-form-item label="法人手机号" prop="legalMobile">
           <el-input v-model="appConfigInfoParam.legalMobile"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
           <el-input v-model="appConfigInfoParam.companyName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="appConfigInfoParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="appConfigInfoParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建人id" prop="createId">
           <el-input v-model="appConfigInfoParam.createId"></el-input>
        </el-form-item> -->



      </el-form>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="handleSaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {saveAppConfigInfo,selectOptions,queryAppinfoByToken} from '@/api/AppConfigInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  import { getTokenApp} from '@/utils/auth'
  import { mapGetters } from 'vuex'
  const defaultParam = {
    id: null, //主键
    codeName: null, //代号
    name: null, //名称
    logoPic: null, //logo图片
    qrcodePic1: null, //二维码图片1
    qrcodePic2: null, //二维码图片2
    bootPic1: null, //引导图片1
    bootPic2: null, //引导图片2
    bootPic3: null, //引导图片3
    coverPic: null, //封面图片
    functionDesc: null, //功能描述
    registDesc: null, //注册协议
    wechatPublicNum: null, //微信公众号
    customerHotline: null, //客服热线
    allianceBusiness: null, //加盟商
    downloadLink: null, //下载地址
    legalMan: null, //法人代表
    legalMobile: null, //法人手机号
    companyName: null, //公司名称
    status: null, //状态
    isDel: null, //删除
    createId: null, //创建人id
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

export default {
  name: 'SidebarLogo',
  directives: {waves },
  components: { Tinymce },
  // computed: {
  //   ...mapGetters([ // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
  //     'appInfo',
  //   ])
  // },
  props: {
    collapse: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      title: '',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      dialogFormVisible: false,
      isSetupApp: true, // true没有设置 false 已设置APP
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        appOptions:[],
        isDelOptions: [{ label: '正常', key: 0 }, { label: '删除', key: 1 }],
        statusOptions: [{ label: '审核中', key: 0 }, { label: '通过', key: 1 }, { label: '拒绝', key: 2 }],
        appConfigInfoRules2:{
          id: [{ required: true, trigger: 'change', message: '请指定一个APP工作台' }],
        },
 	      appConfigInfoRules: {
 	       codeName: [{ required: true, trigger: 'change', message: '代号不能为空' }],
 	       name: [{ required: true, trigger: 'change', message: '名称不能为空' }],
 	       logoPic: [{ required: true, trigger: 'change', message: 'logo图片不能为空' }],
 	       qrcodePic1: [{ required: true, trigger: 'change', message: '二维码图片1不能为空' }],
 	       qrcodePic2: [{ required: true, trigger: 'change', message: '二维码图片2不能为空' }],
 	       bootPic1: [{ required: true, trigger: 'change', message: '引导图片1不能为空' }],
 	       bootPic2: [{ required: true, trigger: 'change', message: '引导图片2不能为空' }],
 	       bootPic3: [{ required: true, trigger: 'change', message: '引导图片3不能为空' }],
 	       coverPic: [{ required: true, trigger: 'change', message: '封面图片不能为空' }],
 	       functionDesc: [{ required: true, trigger: 'change', message: '功能描述不能为空' }],
 	       registDesc: [{ required: true, trigger: 'change', message: '注册协议不能为空' }],
 	       wechatPublicNum: [{ required: true, trigger: 'change', message: '微信公众号不能为空' }],
 	       customerHotline: [{ required: true, trigger: 'change', message: '客服热线不能为空' }],
 	       allianceBusiness: [{ required: true, trigger: 'change', message: '加盟商不能为空' }],
 	       downloadLink: [{ required: true, trigger: 'change', message: '下载地址不能为空' }],
 	       legalMan: [{ required: true, trigger: 'change', message: '法人代表不能为空' }],
 	       legalMobile: [{ required: true, trigger: 'change', message: '法人手机号不能为空' }],
 	       companyName: [{ required: true, trigger: 'change', message: '公司名称不能为空' }],
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
           create: '初始化APP应用'
         },
         appConfigInfoParam: Object.assign({}, defaultParam),
         tid_functionDesc: 'tinymce_functionDesc' + new Date().getMilliseconds(),
         tid_registDesc: 'tinymce_registDesc' + new Date().getMilliseconds(),
    }
  },
  created() {
    // 查询当前用户存在APP
    const tokenApp = getTokenApp()
    this.appInfoOptions() // 显示APP下拉列表
    if(typeof(tokenApp) == "undefined" || tokenApp === ''){
      this.dialogFormVisible =  true
    }else{
      queryAppinfoByToken({token:tokenApp}).then(response => {
          console.dir(response)
          if(response.code === 600){
            this.title = response.data.name
            this.logo = response.data.logoPic
          }
      })
    }
  },
  methods:{
    appInfoOptions(e){
      selectOptions(this.appConfigInfoParam).then(response => {
        if(response.data.length > 0){
          this.appOptions = response.data
        }else{
          this.dialogVisible = true
        }
      })
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
    picUploadlogoPic(file) {
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
            this.appConfigInfoParam.logoPic = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    picUploadqrcodePic1(file) {
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
            this.appConfigInfoParam.qrcodePic1 = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    picUploadqrcodePic2(file) {
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
            this.appConfigInfoParam.qrcodePic2 = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    picUploadbootPic1(file) {
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
            this.appConfigInfoParam.bootPic1 = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    picUploadbootPic2(file) {
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
            this.appConfigInfoParam.bootPic2 = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    picUploadbootPic3(file) {
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
            this.appConfigInfoParam.bootPic3 = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
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
            this.appConfigInfoParam.coverPic = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    },
    // 初始化APP应用
    // 保存或更新
    handleSaveOrUpdate() {
      this.$refs.appConfigInfoForm.validate((valid) => {
        if (valid){
          // 主键为空 -> 新增
          if (this.appConfigInfoParam.id == null) {
            saveAppConfigInfo(this.appConfigInfoParam).then(response => {
              if (response.code === 600) {
                this.dialogVisible = false
                this.appInfoOptions() // 显示APP下拉列表
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

          }
        }
      })
    },
    // 选中APP
    chooseAppConfirm(e){
      this.$refs.appConfigInfoForm2.validate((valid) => {
        if (valid){
          this.$store.dispatch('user/chooseApp', this.appConfigInfoParam)
            .then(response => {
              if(response.code === 600){
                this.$message({
                  message: '设置成功',
                  type: 'success'
                })
                this.title = response.data.name
                this.logo = response.data.logoPic
                this.dialogFormVisible = false
              }
            })
            .catch((error) => {
              console.error(error);
            })
        }
      })
    },
  }
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

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
