<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="登录名">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.roleCode" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.mobile" placeholder="手机号"></el-input>
        </el-form-item>

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
        <el-button type="primary" @click="handleAddSystemAdmin">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="登录名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="角色编码">
        <template slot-scope="scope">
          <span>{{scope.row.roleCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="头像图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="等级">
        <template slot-scope="scope">
          <span>{{scope.row.grade}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="经验值">
        <template slot-scope="scope">
          <span>{{scope.row.gradeValue}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="积分">
        <template slot-scope="scope">
          <span>{{scope.row.integral}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="余额">
        <template slot-scope="scope">
          <span>{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="删除">
        <template slot-scope="scope">
          <span>{{scope.row.isDel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleEditSystemAdmin(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteSystemAdmin(scope.row)">删除</el-button>
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
      width="50%">
      <el-form ref="systemAdminForm" :model="systemAdminParam" :rules="systemAdminRules" status-icon label-width="80px">
        <!-- <el-form-item label="推荐人id" prop="pid">
           <el-input type="number" v-model="systemAdminParam.pid"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item> -->
        <el-form-item label="登录名" prop="name">
           <el-input v-model="systemAdminParam.name"></el-input>
        </el-form-item>
      <!--  <el-form-item label="密码" prop="password">
           <el-input v-model="systemAdminParam.password"></el-input>
        </el-form-item>
         <el-form-item label="等级" prop="grade">
           <el-input type="number" v-model="systemAdminParam.grade"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="经验值" prop="gradeValue">
           <el-input type="number" v-model="systemAdminParam.gradeValue"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item> -->
        <el-form-item label="积分" prop="integral">
           <el-input type="number" v-model="systemAdminParam.integral"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="账户余额" prop="balance">
           <el-input type="number" v-model="systemAdminParam.balance"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <!-- <el-form-item label="余额密码" prop="balancePwd">
           <el-input v-model="systemAdminParam.balancePwd"></el-input>
        </el-form-item>

        <el-form-item label="角色名称" prop="roleName">
           <el-input v-model="systemAdminParam.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色id" prop="roleId">
           <el-input type="number" v-model="systemAdminParam.roleId"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
           <el-input v-model="systemAdminParam.roleCode"></el-input>
        </el-form-item> -->
        <el-form-item label="角色" prop="roleId">
          <el-select class="filter-item" v-model="systemAdminParam.roleId" placeholder="请选择">
            <el-option v-for="item in  rolesOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
           <el-input v-model="systemAdminParam.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像图片" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadavatar">
            <img v-if="systemAdminParam.avatar" :src="systemAdminParam.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <tinymce v-model="systemAdminParam.introduction" :id="tid" ref="tinymce"/>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
           <el-input v-model="systemAdminParam.mobile"></el-input>
        </el-form-item>
        <!-- <el-form-item label="电话" prop="tel">
           <el-input v-model="systemAdminParam.tel"></el-input>
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="systemAdminParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="systemAdminParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建人" prop="createId">
           <el-input type="number" v-model="systemAdminParam.createId"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
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
  import { pageListSystemAdmin, listSystemAdmin, detailSystemAdmin, saveSystemAdmin, updateSystemAdmin, delSystemAdmin } from '@/api/SystemAdmin.js'
  import { selectOptions } from '@/api/role.js'

  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //
    pid: null, //推荐人id
    name: null, //登录名
    password: null, //密码
    grade: null, //等级
    gradeValue: null, //经验值
    integral: null, //积分 1积分=1元
    balance: null, //账户余额
    balancePwd: null, //余额密码
    roleName: null, //角色名称
    roleId: null, //角色id
    roleCode: null, //角色编码
    nickname: null, //昵称
    avatar: null, //头像图片
    introduction: null, //简介
    mobile: null, //手机号
    tel: null, //电话
    status: null, //状态
    isDel: null, //删除
    createId: null, //创建人
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

  export default {
    name: 'systemAdmin',
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
       rolesOptions:[],
	     systemAdminRules: {
	       pid: [{ required: true, trigger: 'change', message: '推荐人id不能为空' }],
	       name: [{ required: true, trigger: 'change', message: '登录名不能为空' }],
	       password: [{ required: true, trigger: 'change', message: '密码不能为空' }],
	       grade: [{ required: true, trigger: 'change', message: '等级不能为空' }],
	       gradeValue: [{ required: true, trigger: 'change', message: '经验值不能为空' }],
	       integral: [{ required: true, trigger: 'change', message: '积分 1积分=1元不能为空' }],
	       balance: [{ required: true, trigger: 'change', message: '账户余额不能为空' }],
	       balancePwd: [{ required: true, trigger: 'change', message: '余额密码不能为空' }],
	       roleName: [{ required: true, trigger: 'change', message: '角色名称不能为空' }],
	       roleId: [{ required: true, trigger: 'change', message: '角色id不能为空' }],
	       roleCode: [{ required: true, trigger: 'change', message: '角色编码不能为空' }],
	       nickname: [{ required: true, trigger: 'change', message: '昵称不能为空' }],
	       avatar: [{ required: true, trigger: 'change', message: '头像图片不能为空' }],
	       introduction: [{ required: true, trigger: 'change', message: '简介不能为空' }],
	       mobile: [{ required: true, trigger: 'change', message: '手机号不能为空' }],
	       tel: [{ required: true, trigger: 'change', message: '电话不能为空' }],
	       status: [{ required: true, trigger: 'change', message: '状态不能为空' }],
	       isDel: [{ required: true, trigger: 'change', message: '删除不能为空' }],
	       createId: [{ required: true, trigger: 'change', message: '创建人不能为空' }],
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
          id: null, //
          pid: null, //推荐人id
          name: null, //登录名
          password: null, //密码
          grade: null, //等级
          gradeValue: null, //经验值
          integral: null, //积分 1积分=1元
          balance: null, //账户余额
          balancePwd: null, //余额密码
          roleName: null, //角色名称
          roleId: null, //角色id
          roleCode: null, //角色编码
          nickname: null, //昵称
          avatar: null, //头像图片
          introduction: null, //简介
          mobile: null, //手机号
          tel: null, //电话
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        systemAdminParam: Object.assign({}, defaultParam),
        tid: 'tinymce-' + new Date().getMilliseconds()
      }
    },
    created() {
      this.pageListSystemAdmin()
      // 获取角色列表
      selectOptions(this.listQuery).then(response => {
        if(response.code === 600){
          this.rolesOptions = response.data
        }
      })
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListSystemAdmin()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListSystemAdmin()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListSystemAdmin()
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
      picUploadavatar(file) {
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
              this.systemAdminParam.avatar = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListSystemAdmin() {
        this.listLoading = true
        pageListSystemAdmin(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddSystemAdmin() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.systemAdminParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditSystemAdmin(item) {
        this.dialogStatus = 'update'
        this.systemAdminParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce.setContent(item.introduction)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        // 主键为空 -> 新增
        this.$refs.systemAdminForm.validate((valid) => {
          if (valid){
            if (this.systemAdminParam.id == null) {
              saveSystemAdmin(this.systemAdminParam).then(response => {
                if (response.code === 600) {
                  this.dialogVisible = false
                  this.pageListSystemAdmin()
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
              updateSystemAdmin(this.systemAdminParam).then(response => {
                if (response.code === 600) {
                  this.dialogVisible = false
                  this.pageListSystemAdmin()
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
      handleDeleteSystemAdmin(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSystemAdmin({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListSystemAdmin()
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
