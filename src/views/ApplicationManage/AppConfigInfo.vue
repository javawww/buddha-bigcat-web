<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="代号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.codeName" placeholder="代号"></el-input>
        </el-form-item>
        <el-form-item label="名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" placeholder="名称"></el-input>
        </el-form-item>
      <!--   <el-form-item label="微信公众号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.wechatPublicNum" placeholder="微信公众号"></el-input>
        </el-form-item>
        <el-form-item label="客服热线">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.customerHotline" placeholder="客服热线"></el-input>
        </el-form-item>
        <el-form-item label="加盟商">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.allianceBusiness" placeholder="加盟商"></el-input>
        </el-form-item>
        <el-form-item label="下载地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.downloadLink" placeholder="下载地址"></el-input>
        </el-form-item> -->
        <el-form-item label="法人代表">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.legalMan" placeholder="法人代表"></el-input>
        </el-form-item>
        <!-- <el-form-item label="法人手机号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.legalMobile" placeholder="法人手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="创建人id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.createId" placeholder="创建人id"></el-input>
        </el-form-item> -->
          <br>
          <!-- <el-date-picker
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
        <el-button type="primary" @click="handleAddAppConfigInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="代号">
        <template slot-scope="scope">
          <span>{{scope.row.codeName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="logo图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.logoPic">
        </template>
      </el-table-column>
      <!-- <el-table-column width="" align="center" label="二维码图片1">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.qrcodePic1">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="二维码图片2">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.qrcodePic2">
        </template>
      </el-table-column> -->
      <el-table-column width="" align="center" label="引导图片1">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.bootPic1">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="引导图片2">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.bootPic2">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="引导图片3">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.bootPic3">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="封面图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.coverPic">
        </template>
      </el-table-column>
    <!--  <el-table-column width="" align="center" label="微信公众号">
        <template slot-scope="scope">
          <span>{{scope.row.wechatPublicNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="客服热线">
        <template slot-scope="scope">
          <span>{{scope.row.customerHotline}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="加盟商">
        <template slot-scope="scope">
          <span>{{scope.row.allianceBusiness}}</span>
        </template>
      </el-table-column>
       <el-table-column width="" align="center" label="下载地址">
        <template slot-scope="scope">
          <span>{{scope.row.downloadLink}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="" align="center" label="法人代表">
        <template slot-scope="scope">
          <span>{{scope.row.legalMan}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="法人手机号">
        <template slot-scope="scope">
          <span>{{scope.row.legalMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="公司名称">
        <template slot-scope="scope">
          <span>{{scope.row.companyName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="访问地址">
        <template slot-scope="scope">
          <span>{{scope.row.appLink}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="扫码图片访问">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.appPic">
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
      <!-- <el-table-column width="" align="center" label="创建人id">
        <template slot-scope="scope">
          <span>{{scope.row.createId}}</span>
        </template>
      </el-table-column> -->
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
          <el-button type="success" size="mini" @click="handleEditAppConfigInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteAppConfigInfo(scope.row)">删除</el-button>
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
      <el-form ref="appConfigInfoForm" :model="appConfigInfoParam" :rules="appConfigInfoRules" status-icon label-width="130px">
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
        <el-form-item label="扫码图片访问" prop="appPic">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadappPic">
            <img v-if="appConfigInfoParam.appPic" :src="appConfigInfoParam.appPic" class="avatar">
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
        <el-form-item label="访问地址" prop="appLink">
           <el-input v-model="appConfigInfoParam.appLink"></el-input>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { pageListAppConfigInfo, listAppConfigInfo, detailAppConfigInfo, saveAppConfigInfo, updateAppConfigInfo, delAppConfigInfo } from '@/api/AppConfigInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
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
    appLink: null, //访问地址
    appPic: null, //扫码图片访问
    status: null, //状态
    isDel: null, //删除
    createId: null, //创建人id
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

  export default {
    name: 'appConfigInfo',
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
         appLink: [{ required: true, trigger: 'change', message: '访问地址不能为空' }],
	       appPic: [{ required: true, trigger: 'change', message: '扫码图片访问不能为空' }],
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
          appLink: null, //访问地址
          appPic: null, //扫码图片访问
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        appConfigInfoParam: Object.assign({}, defaultParam),
        tid_functionDesc: 'tinymce_functionDesc' + new Date().getMilliseconds(),
        tid_registDesc: 'tinymce_registDesc' + new Date().getMilliseconds(),
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
      this.pageListAppConfigInfo()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListAppConfigInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListAppConfigInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListAppConfigInfo()
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
      picUploadappPic(file) {
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
              this.appConfigInfoParam.appPic = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListAppConfigInfo() {
        this.listLoading = true
        pageListAppConfigInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddAppConfigInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.appConfigInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce_functionDesc.setContent('')
          this.$refs.tinymce_registDesc.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditAppConfigInfo(item) {
        this.dialogStatus = 'update'
        this.appConfigInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce_functionDesc.setContent(item.functionDesc)
          this.$refs.tinymce_registDesc.setContent(item.registDesc)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.appConfigInfoForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.appConfigInfoParam.id == null) {
		          saveAppConfigInfo(this.appConfigInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListAppConfigInfo()
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
		          updateAppConfigInfo(this.appConfigInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListAppConfigInfo()
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
      handleDeleteAppConfigInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAppConfigInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListAppConfigInfo()
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
