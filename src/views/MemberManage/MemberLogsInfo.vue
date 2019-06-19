<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="手机品牌">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.brand" placeholder="手机品牌"></el-input>
        </el-form-item>
        <el-form-item label="手机型号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.model" placeholder="手机型号"></el-input>
        </el-form-item>
        <el-form-item label="设备像素比">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.pixelRatio" placeholder="设备像素比"></el-input>
        </el-form-item>
        <el-form-item label="应用设置的语言">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.language" placeholder="应用设置的语言"></el-input>
        </el-form-item> -->
        <el-form-item label="引擎版本号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.version" placeholder="引擎版本号"></el-input>
        </el-form-item>
        <el-form-item label="操作系统版本">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.system" placeholder="操作系统版本"></el-input>
        </el-form-item>
        <el-form-item label="客户端平台ios、android">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.platform" placeholder="客户端平台ios、android"></el-input>
        </el-form-item>
        <el-form-item label="客户端基础库版本">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.sdkVersion" placeholder="客户端基础库版本"></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.ipAddress" placeholder="IP地址"></el-input>
        </el-form-item>
        <el-form-item label="会员主键">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.memberId" placeholder="会员主键"></el-input>
        </el-form-item>
        <el-form-item label="会员名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.memberName" placeholder="会员名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="名称">
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
	      </el-date-picker> -->

          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="handleAddMemberLogsInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <!-- <el-table-column width="" align="center" label="手机品牌">
        <template slot-scope="scope">
          <span>{{scope.row.brand}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="" align="center" label="手机型号">
        <template slot-scope="scope">
          <span>{{scope.row.model}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="设备像素比">
        <template slot-scope="scope">
          <span>{{scope.row.pixelRatio}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="应用设置的语言">
        <template slot-scope="scope">
          <span>{{scope.row.language}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="引擎版本号">
        <template slot-scope="scope">
          <span>{{scope.row.version}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="操作系统版本">
        <template slot-scope="scope">
          <span>{{scope.row.system}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="客户端平台ios、android">
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="客户端基础库版本">
        <template slot-scope="scope">
          <span>{{scope.row.sdkVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="IP地址">
        <template slot-scope="scope">
          <span>{{scope.row.ipAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="会员主键">
        <template slot-scope="scope">
          <span>{{scope.row.memberId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="会员名称">
        <template slot-scope="scope">
          <span>{{scope.row.memberName}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="" align="center" label="排序">
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
      </el-table-column> -->
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
      </el-table-column> -->
      <el-table-column align="center" label="操作"  width="" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="mini" @click="handleEditMemberLogsInfo(scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="handleDeleteMemberLogsInfo(scope.row)">删除</el-button>
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
      <el-form ref="memberLogsInfoForm" :model="memberLogsInfoParam" :rules="memberLogsInfoRules" status-icon label-width="80px">
        <el-form-item label="手机品牌" prop="brand">
           <el-input v-model="memberLogsInfoParam.brand"></el-input>
        </el-form-item>
        <el-form-item label="手机型号" prop="model">
           <el-input v-model="memberLogsInfoParam.model"></el-input>
        </el-form-item>
        <el-form-item label="设备像素比" prop="pixelRatio">
           <el-input v-model="memberLogsInfoParam.pixelRatio"></el-input>
        </el-form-item>
        <el-form-item label="应用设置的语言" prop="language">
           <el-input v-model="memberLogsInfoParam.language"></el-input>
        </el-form-item>
        <el-form-item label="引擎版本号" prop="version">
           <el-input v-model="memberLogsInfoParam.version"></el-input>
        </el-form-item>
        <el-form-item label="操作系统版本" prop="system">
           <el-input v-model="memberLogsInfoParam.system"></el-input>
        </el-form-item>
        <el-form-item label="客户端平台ios、android" prop="platform">
           <el-input v-model="memberLogsInfoParam.platform"></el-input>
        </el-form-item>
        <el-form-item label="客户端基础库版本" prop="sdkVersion">
           <el-input v-model="memberLogsInfoParam.sdkVersion"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddress">
           <el-input v-model="memberLogsInfoParam.ipAddress"></el-input>
        </el-form-item>
        <el-form-item label="会员主键" prop="memberId">
           <el-input v-model="memberLogsInfoParam.memberId"></el-input>
        </el-form-item>
        <el-form-item label="会员名称" prop="memberName">
           <el-input v-model="memberLogsInfoParam.memberName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
           <el-input type="number" v-model="memberLogsInfoParam.sorts"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
           <el-input v-model="memberLogsInfoParam.name"></el-input>
        </el-form-item>
        <el-form-item label="APP主键" prop="appId">
           <el-input v-model="memberLogsInfoParam.appId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="memberLogsInfoParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="memberLogsInfoParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人id" prop="createId">
           <el-input v-model="memberLogsInfoParam.createId"></el-input>
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
  import { pageListMemberLogsInfo, listMemberLogsInfo, detailMemberLogsInfo, saveMemberLogsInfo, updateMemberLogsInfo, delMemberLogsInfo } from '@/api/MemberLogsInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //主键
    brand: null, //手机品牌
    model: null, //手机型号
    pixelRatio: null, //设备像素比
    screenWidth: null, //屏幕宽度
    screenHeight: null, //屏幕高度
    language: null, //应用设置的语言
    version: null, //引擎版本号
    system: null, //操作系统版本
    platform: null, //客户端平台ios、android
    sdkVersion: null, //客户端基础库版本
    ipAddress: null, //IP地址
    memberId: null, //会员主键
    memberName: null, //会员名称
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
    name: 'memberLogsInfo',
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
	     memberLogsInfoRules: {
	       brand: [{ required: true, trigger: 'change', message: '手机品牌不能为空' }],
	       model: [{ required: true, trigger: 'change', message: '手机型号不能为空' }],
	       pixelRatio: [{ required: true, trigger: 'change', message: '设备像素比不能为空' }],
	       screenWidth: [{ required: true, trigger: 'change', message: '屏幕宽度不能为空' }],
	       screenHeight: [{ required: true, trigger: 'change', message: '屏幕高度不能为空' }],
	       language: [{ required: true, trigger: 'change', message: '应用设置的语言不能为空' }],
	       version: [{ required: true, trigger: 'change', message: '引擎版本号不能为空' }],
	       system: [{ required: true, trigger: 'change', message: '操作系统版本不能为空' }],
	       platform: [{ required: true, trigger: 'change', message: '客户端平台ios、android不能为空' }],
	       sdkVersion: [{ required: true, trigger: 'change', message: '客户端基础库版本不能为空' }],
	       ipAddress: [{ required: true, trigger: 'change', message: 'IP地址不能为空' }],
	       memberId: [{ required: true, trigger: 'change', message: '会员主键不能为空' }],
	       memberName: [{ required: true, trigger: 'change', message: '会员名称不能为空' }],
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
          brand: null, //手机品牌
          model: null, //手机型号
          pixelRatio: null, //设备像素比
          screenWidth: null, //屏幕宽度
          screenHeight: null, //屏幕高度
          language: null, //应用设置的语言
          version: null, //引擎版本号
          system: null, //操作系统版本
          platform: null, //客户端平台ios、android
          sdkVersion: null, //客户端基础库版本
          ipAddress: null, //IP地址
          memberId: null, //会员主键
          memberName: null, //会员名称
          sorts: null, //排序
          name: null, //名称
          appId: null, //APP主键
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        memberLogsInfoParam: Object.assign({}, defaultParam),
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
      this.pageListMemberLogsInfo()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListMemberLogsInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListMemberLogsInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListMemberLogsInfo()
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
      // 加载数据
      pageListMemberLogsInfo() {
        this.listLoading = true
        pageListMemberLogsInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddMemberLogsInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.memberLogsInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
        })
      },
      // 显示编辑弹窗
      handleEditMemberLogsInfo(item) {
        this.dialogStatus = 'update'
        this.memberLogsInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.memberLogsInfoForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.memberLogsInfoParam.id == null) {
		          saveMemberLogsInfo(this.memberLogsInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMemberLogsInfo()
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
		          updateMemberLogsInfo(this.memberLogsInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMemberLogsInfo()
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
      handleDeleteMemberLogsInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMemberLogsInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListMemberLogsInfo()
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
