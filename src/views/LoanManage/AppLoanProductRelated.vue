<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="应用id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.appId" placeholder="应用id"></el-input>
        </el-form-item>
        <el-form-item label="贷超产品">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.loanProductId" placeholder="贷超产品"></el-input>
        </el-form-item>
        <el-form-item label="创建人id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.createId" placeholder="创建人id"></el-input>
        </el-form-item>
        <!-- <el-date-picker
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
	      </el-date-picker>-->

          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="handleAddAppLoanProductRelated">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="应用ID">
        <template slot-scope="scope">
          <span>{{scope.row.appId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="应用名称">
        <template slot-scope="scope">
           <i class="el-icon-time"></i>
          <span>{{scope.row.appConfigInfo.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="应用代号">
        <template slot-scope="scope">
          <span>{{scope.row.appConfigInfo.codeName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="" align="center" label="贷超产品ID">
        <template slot-scope="scope">
          <span>{{scope.row.loanProductId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="贷超产品">
        <template slot-scope="scope">
          <span>{{scope.row.loanMarketProduct.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="贷超LOGO">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.loanMarketProduct.logoPic">
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
          <!-- <el-button type="success" size="mini" @click="handleEditAppLoanProductRelated(scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="handleDeleteAppLoanProductRelated(scope.row)">删除</el-button>
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
      <el-form ref="appLoanProductRelatedForm" :model="appLoanProductRelatedParam" :rules="appLoanProductRelatedRules" status-icon label-width="80px">
        <!-- <el-form-item label="应用id" prop="appId">
           <el-select class="filter-item" v-model="appLoanProductRelatedParam.appId" placeholder="请选择">
             <el-option v-for="item in  appOptions" :key="item.key" :label="item.label" :value="item.key">
             </el-option>
           </el-select>
        </el-form-item> -->
        <el-form-item label="贷超产品" prop="loanProductId">
           <el-input v-model="appLoanProductRelatedParam.loanProductId" type="hidden"></el-input>

           <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in cities" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
           </el-checkbox-group>

        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="appLoanProductRelatedParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建人id" prop="createId">
           <el-input v-model="appLoanProductRelatedParam.createId"></el-input>
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
  import { pageListAppLoanProductRelated, listAppLoanProductRelated, detailAppLoanProductRelated, saveAppLoanProductRelated, updateAppLoanProductRelated, delAppLoanProductRelated } from '@/api/AppLoanProductRelated.js'
  import { selectOptions } from '@/api/AppConfigInfo.js'
  import { selectOptionsLoanMarketProduct } from '@/api/LoanMarketProduct.js'


  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //主键
    appId: null, //应用id
    loanProductId: null, //贷超产品
    isDel: null, //删除
    createId: null, //创建人id
    createTime: null, //创建时间
    updateTime: null, //更新时间
  }

  export default {
    name: 'appLoanProductRelated',
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
       appOptions:[],
       checkAll: false,
       checkedCities: [],
       cities: [],
       isIndeterminate: true,
	     appLoanProductRelatedRules: {
	       appId: [{ required: true, trigger: 'change', message: '应用id不能为空' }],
	       loanProductId: [{ required: true, trigger: 'change', message: '贷超产品不能为空' }],
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
          appId: null, //应用id
          loanProductId: null, //贷超产品
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        appLoanProductRelatedParam: Object.assign({}, defaultParam),
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
      this.pageListAppLoanProductRelated()
      // 获取APP列表
      selectOptions(this.listQuery).then(response => {
        if(response.code === 600){
          this.appOptions = response.data
        }
      })
      // 获取产品列表
      selectOptionsLoanMarketProduct(this.listQuery).then(response => {
        console.dir(response)
        if(response.code === 600){
          this.cities = response.data
        }
      })
    },
    methods: {
      handleCheckAllChange(val) {
        if(val){
          this.checkedCities = [] // 置空
          this.cities.map(item => {
            this.checkedCities.push(item.key)
          })
        }else{
          this.checkedCities = []
        }
        this.isIndeterminate = false
        // 赋值
        this.appLoanProductRelatedParam.loanProductId = this.checkedCities.join("|")
      },
      handleCheckedCitiesChange(value) {
        console.dir(this.checkedCities)
        // 赋值
        this.appLoanProductRelatedParam.loanProductId = this.checkedCities.join("|")
        return;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListAppLoanProductRelated()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListAppLoanProductRelated()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListAppLoanProductRelated()
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
      pageListAppLoanProductRelated() {
        this.listLoading = true
        pageListAppLoanProductRelated(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddAppLoanProductRelated() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.appLoanProductRelatedParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
        })
      },
      // 显示编辑弹窗
      handleEditAppLoanProductRelated(item) {
        this.dialogStatus = 'update'
        this.appLoanProductRelatedParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.appLoanProductRelatedForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.appLoanProductRelatedParam.id == null) {
		          saveAppLoanProductRelated(this.appLoanProductRelatedParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListAppLoanProductRelated()
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
		          updateAppLoanProductRelated(this.appLoanProductRelatedParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListAppLoanProductRelated()
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
      handleDeleteAppLoanProductRelated(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAppLoanProductRelated({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListAppLoanProductRelated()
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
