<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;justify-content: space-between">
      <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="父id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.parentId" placeholder="父id"></el-input>
        </el-form-item>
        <el-form-item label="公众平台union id">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.unionId" placeholder="公众平台union id"></el-input>
        </el-form-item>
        <el-form-item label="微信openid">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.openId" placeholder="微信openid"></el-input>
        </el-form-item>
        <el-form-item label="推荐码">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.recommendCode" placeholder="推荐码"></el-input>
        </el-form-item>
        <el-form-item label="微信access token">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.accessToken" placeholder="微信access token"></el-input>
        </el-form-item>
        <el-form-item label="密码">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.email" placeholder="邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.avatar" placeholder="头像图片"></el-input>
        </el-form-item>
        <el-form-item label="微信地区">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.country" placeholder="微信地区"></el-input>
        </el-form-item>
        <el-form-item label="真实头像图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.realAvatar" placeholder="真实头像图片"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.realName" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.identityFront" placeholder="身份证正面图片"></el-input>
        </el-form-item>
        <el-form-item label="身份证反面图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.identityBack" placeholder="身份证反面图片"></el-input>
        </el-form-item>
        <el-form-item label="名片图片">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.businessCard" placeholder="名片图片"></el-input>
        </el-form-item>
        <el-form-item label="最后登录ip">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.lastLoginIp" placeholder="最后登录ip"></el-input>
        </el-form-item>
        <el-date-picker
            style="width: 200px;" class="filter-item"
            v-model="listQuery.lastLoginTime"
            type="date"
            placeholder="最后登录时间"
            :picker-options="pickerOptions0">
        </el-date-picker>
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
        <el-button type="primary" @click="handleAddMemberInfo">新增</el-button>
      </div>
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column width="" align="center" label="父id">
        <template slot-scope="scope">
          <span>{{scope.row.parentId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="公众平台union id">
        <template slot-scope="scope">
          <span>{{scope.row.unionId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="微信openid">
        <template slot-scope="scope">
          <span>{{scope.row.openId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="推荐码">
        <template slot-scope="scope">
          <span>{{scope.row.recommendCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="微信access token">
        <template slot-scope="scope">
          <span>{{scope.row.accessToken}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="密码">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="邮箱地址">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="等级：0-7颗星 默认0颗 其他根据认证审核">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="是否管理员 1-非管理员 2-平台管理员">
        <template slot-scope="scope">
          <span>{{scope.row.isAdmin}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="是否认证 0-待认证 1-认证通过 2-认证驳回">
        <template slot-scope="scope">
          <span>{{scope.row.isCertification}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="是否隐私保护 1-公开 2-隐私保护">
        <template slot-scope="scope">
          <span>{{scope.row.isPrivacy}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="头像图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="微信地区">
        <template slot-scope="scope">
          <span>{{scope.row.country}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="真实头像图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.realAvatar">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="性别 0-未知 1-男性 -女性">
        <template slot-scope="scope">
          <span>{{scope.row.gender}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="纬度，范围为 -90~90，负数表示南纬">
        <template slot-scope="scope">
          <span>{{scope.row.latitude}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="经度，范围为 -180~180，负数表示西经">
        <template slot-scope="scope">
          <span>{{scope.row.longitude}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="真实姓名">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="身份证正面图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.identityFront">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="身份证反面图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.identityBack">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="名片图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="scope.row.businessCard">
        </template>
      </el-table-column>
      <el-table-column width="" align="center" label="最后登录ip">
        <template slot-scope="scope">
          <span>{{scope.row.lastLoginIp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="最后登录时间">
        <template slot-scope="scope">
          <span>{{scope.row.lastLoginTime}}</span>
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
          <el-button type="success" size="mini" @click="handleEditMemberInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteMemberInfo(scope.row)">删除</el-button>
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
      <el-form ref="memberInfoForm" :model="memberInfoParam" :rules="memberInfoRules" status-icon label-width="80px">
        <el-form-item label="父id" prop="parentId">
           <el-input v-model="memberInfoParam.parentId"></el-input>
        </el-form-item>
        <el-form-item label="公众平台union id" prop="unionId">
           <el-input v-model="memberInfoParam.unionId"></el-input>
        </el-form-item>
        <el-form-item label="微信openid" prop="openId">
           <el-input v-model="memberInfoParam.openId"></el-input>
        </el-form-item>
        <el-form-item label="推荐码" prop="recommendCode">
           <el-input v-model="memberInfoParam.recommendCode"></el-input>
        </el-form-item>
        <el-form-item label="微信access token" prop="accessToken">
           <el-input v-model="memberInfoParam.accessToken"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
           <el-input v-model="memberInfoParam.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
           <el-input v-model="memberInfoParam.email"></el-input>
        </el-form-item>
        <el-form-item label="等级：0-7颗星 默认0颗 其他根据认证审核" prop="level">
           <el-input type="number" v-model="memberInfoParam.level"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="是否管理员 1-非管理员 2-平台管理员" prop="isAdmin">
           <el-input type="number" v-model="memberInfoParam.isAdmin"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="是否认证 0-待认证 1-认证通过 2-认证驳回" prop="isCertification">
           <el-input type="number" v-model="memberInfoParam.isCertification"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="是否隐私保护 1-公开 2-隐私保护" prop="isPrivacy">
           <el-input type="number" v-model="memberInfoParam.isPrivacy"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduction">
          <tinymce v-model="memberInfoParam.introduction" :id="tid_introduction" ref="tinymce_introduction"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
           <el-input v-model="memberInfoParam.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像图片" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadavatar">
            <img v-if="memberInfoParam.avatar" :src="memberInfoParam.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="微信地区" prop="country">
           <el-input v-model="memberInfoParam.country"></el-input>
        </el-form-item>
        <el-form-item label="真实头像图片" prop="realAvatar">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadrealAvatar">
            <img v-if="memberInfoParam.realAvatar" :src="memberInfoParam.realAvatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="手机号" prop="mobile">
           <el-input v-model="memberInfoParam.mobile"></el-input>
        </el-form-item>
        <el-form-item label="性别 0-未知 1-男性 -女性" prop="gender">
           <el-input type="number" v-model="memberInfoParam.gender"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="纬度，范围为 -90~90，负数表示南纬" prop="latitude">
           <el-input type="number" v-model="memberInfoParam.latitude"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="经度，范围为 -180~180，负数表示西经" prop="longitude">
           <el-input type="number" v-model="memberInfoParam.longitude"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
           <el-input v-model="memberInfoParam.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面图片" prop="identityFront">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadidentityFront">
            <img v-if="memberInfoParam.identityFront" :src="memberInfoParam.identityFront" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="身份证反面图片" prop="identityBack">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadidentityBack">
            <img v-if="memberInfoParam.identityBack" :src="memberInfoParam.identityBack" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="名片图片" prop="businessCard">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUploadbusinessCard">
            <img v-if="memberInfoParam.businessCard" :src="memberInfoParam.businessCard" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> 
        <el-form-item label="最后登录ip" prop="lastLoginIp">
           <el-input v-model="memberInfoParam.lastLoginIp"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
           <el-input type="number" v-model="memberInfoParam.sorts"><i slot="prefix" class="el-input__icon el-icon-goods"></i></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
           <el-input v-model="memberInfoParam.name"></el-input>
        </el-form-item>
        <el-form-item label="APP主键" prop="appId">
           <el-input v-model="memberInfoParam.appId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="memberInfoParam.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除" prop="isDel">
          <el-select class="filter-item" v-model="memberInfoParam.isDel" placeholder="请选择">
            <el-option v-for="item in  isDelOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人id" prop="createId">
           <el-input v-model="memberInfoParam.createId"></el-input>
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
  import { pageListMemberInfo, listMemberInfo, detailMemberInfo, saveMemberInfo, updateMemberInfo, delMemberInfo } from '@/api/MemberInfo.js'
  import Tinymce from '@/components/Tinymce' // 富文本编辑器
  import waves from '@/directive/waves' // 水波纹指令
  import axios from 'axios' // 异步请求
  import { getTempAuthToken } from '@/api/uploadOss' // 上传图片TOKEN
  const defaultParam = {
    id: null, //主键
    parentId: null, //父id
    unionId: null, //公众平台union id
    openId: null, //微信openid
    recommendCode: null, //推荐码
    accessToken: null, //微信access token
    password: null, //密码
    email: null, //邮箱地址
    level: null, //等级：0-7颗星 默认0颗 其他根据认证审核
    isAdmin: null, //是否管理员 1-非管理员 2-平台管理员
    isCertification: null, //是否认证 0-待认证 1-认证通过 2-认证驳回
    isPrivacy: null, //是否隐私保护 1-公开 2-隐私保护
    introduction: null, //自我介绍
    nickName: null, //昵称
    avatar: null, //头像图片
    country: null, //微信地区
    realAvatar: null, //真实头像图片
    mobile: null, //手机号
    gender: null, //性别 0-未知 1-男性 -女性
    latitude: null, //纬度，范围为 -90~90，负数表示南纬
    longitude: null, //经度，范围为 -180~180，负数表示西经
    realName: null, //真实姓名
    identityFront: null, //身份证正面图片
    identityBack: null, //身份证反面图片
    businessCard: null, //名片图片
    lastLoginIp: null, //最后登录ip
    lastLoginTime: null, //最后登录时间
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
    name: 'memberInfo',
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
	     memberInfoRules: {
	       parentId: [{ required: true, trigger: 'change', message: '父id不能为空' }],
	       unionId: [{ required: true, trigger: 'change', message: '公众平台union id不能为空' }],
	       openId: [{ required: true, trigger: 'change', message: '微信openid不能为空' }],
	       recommendCode: [{ required: true, trigger: 'change', message: '推荐码不能为空' }],
	       accessToken: [{ required: true, trigger: 'change', message: '微信access token不能为空' }],
	       password: [{ required: true, trigger: 'change', message: '密码不能为空' }],
	       email: [{ required: true, trigger: 'change', message: '邮箱地址不能为空' }],
	       level: [{ required: true, trigger: 'change', message: '等级：0-7颗星 默认0颗 其他根据认证审核不能为空' }],
	       isAdmin: [{ required: true, trigger: 'change', message: '是否管理员 1-非管理员 2-平台管理员不能为空' }],
	       isCertification: [{ required: true, trigger: 'change', message: '是否认证 0-待认证 1-认证通过 2-认证驳回不能为空' }],
	       isPrivacy: [{ required: true, trigger: 'change', message: '是否隐私保护 1-公开 2-隐私保护不能为空' }],
	       introduction: [{ required: true, trigger: 'change', message: '自我介绍不能为空' }],
	       nickName: [{ required: true, trigger: 'change', message: '昵称不能为空' }],
	       avatar: [{ required: true, trigger: 'change', message: '头像图片不能为空' }],
	       country: [{ required: true, trigger: 'change', message: '微信地区不能为空' }],
	       realAvatar: [{ required: true, trigger: 'change', message: '真实头像图片不能为空' }],
	       mobile: [{ required: true, trigger: 'change', message: '手机号不能为空' }],
	       gender: [{ required: true, trigger: 'change', message: '性别 0-未知 1-男性 -女性不能为空' }],
	       latitude: [{ required: true, trigger: 'change', message: '纬度，范围为 -90~90，负数表示南纬不能为空' }],
	       longitude: [{ required: true, trigger: 'change', message: '经度，范围为 -180~180，负数表示西经不能为空' }],
	       realName: [{ required: true, trigger: 'change', message: '真实姓名不能为空' }],
	       identityFront: [{ required: true, trigger: 'change', message: '身份证正面图片不能为空' }],
	       identityBack: [{ required: true, trigger: 'change', message: '身份证反面图片不能为空' }],
	       businessCard: [{ required: true, trigger: 'change', message: '名片图片不能为空' }],
	       lastLoginIp: [{ required: true, trigger: 'change', message: '最后登录ip不能为空' }],
	       lastLoginTime: [{ required: true, trigger: 'change', message: '最后登录时间不能为空' }],
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
          parentId: null, //父id
          unionId: null, //公众平台union id
          openId: null, //微信openid
          recommendCode: null, //推荐码
          accessToken: null, //微信access token
          password: null, //密码
          email: null, //邮箱地址
          level: null, //等级：0-7颗星 默认0颗 其他根据认证审核
          isAdmin: null, //是否管理员 1-非管理员 2-平台管理员
          isCertification: null, //是否认证 0-待认证 1-认证通过 2-认证驳回
          isPrivacy: null, //是否隐私保护 1-公开 2-隐私保护
          introduction: null, //自我介绍
          nickName: null, //昵称
          avatar: null, //头像图片
          country: null, //微信地区
          realAvatar: null, //真实头像图片
          mobile: null, //手机号
          gender: null, //性别 0-未知 1-男性 -女性
          latitude: null, //纬度，范围为 -90~90，负数表示南纬
          longitude: null, //经度，范围为 -180~180，负数表示西经
          realName: null, //真实姓名
          identityFront: null, //身份证正面图片
          identityBack: null, //身份证反面图片
          businessCard: null, //名片图片
          lastLoginIp: null, //最后登录ip
          lastLoginTime: null, //最后登录时间
          sorts: null, //排序
          name: null, //名称
          appId: null, //APP主键
          status: null, //状态
          isDel: null, //删除
          createId: null, //创建人id
          createTime: null, //创建时间
          updateTime: null, //更新时间
        },
        memberInfoParam: Object.assign({}, defaultParam),
        tid_introduction: 'tinymce_introduction' + new Date().getMilliseconds(),
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
      this.pageListMemberInfo()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.pageListMemberInfo()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.pageListMemberInfo()
      },
      // 搜索
      handleFilter() {
        this.listQuery.page = 1
        this.pageListMemberInfo()
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
              this.memberInfoParam.avatar = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      picUploadrealAvatar(file) {
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
              this.memberInfoParam.realAvatar = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      picUploadidentityFront(file) {
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
              this.memberInfoParam.identityFront = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      picUploadidentityBack(file) {
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
              this.memberInfoParam.identityBack = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      picUploadbusinessCard(file) {
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
              this.memberInfoParam.businessCard = oss.fileUploadUrl + '/' + oss.key
            })
            .catch(error => {
              console.log(error, '错误')
            })
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载数据
      pageListMemberInfo() {
        this.listLoading = true
        pageListMemberInfo(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 显示添加弹窗
      handleAddMemberInfo() {
        this.dialogStatus = 'create'
        this.dialogVisible = true
        this.memberInfoParam = Object.assign({}, defaultParam)
        this.$nextTick(() => {
          this.$refs.tinymce_introduction.setContent('')
        })
      },
      // 显示编辑弹窗
      handleEditMemberInfo(item) {
        this.dialogStatus = 'update'
        this.memberInfoParam = item
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce_introduction.setContent(item.introduction)
        })
      },
      // 保存或更新
      handleSaveOrUpdate() {
        this.$refs.memberInfoForm.validate((valid) => {
        	if (valid){
        		// 主键为空 -> 新增
		        if (this.memberInfoParam.id == null) {
		          saveMemberInfo(this.memberInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMemberInfo()
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
		          updateMemberInfo(this.memberInfoParam).then(response => {
		            if (response.code === 600) {
		              this.dialogVisible = false
		              this.pageListMemberInfo()
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
      handleDeleteMemberInfo(item) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMemberInfo({ id: item.id }).then(response => {
            if (response.code === 600) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.pageListMemberInfo()
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
