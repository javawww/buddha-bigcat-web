<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item class="my-el-form-item" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          class="my-el-input"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item class="my-el-form-item" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            class="my-el-input"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">&nbsp;</span>
          <span>&nbsp;</span>
        </div>

        <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button> -->
        <el-button class="thirdparty-button" type="primary" @click="showRegistDialog=true">
          免费注册
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <!--  注册弹出框 -->
    <el-dialog title="免费注册（送50金币）" :visible.sync="showRegistDialog" :fullscreen="false" top="0vh">
      <el-form ref="paramForm" :model="param" :rules="registRules" status-icon label-width="80px" label-position="left">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="param.username" placeholder="请输入登录名称，必填" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="param.nickname" placeholder="请输入昵称，必填" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="picUpload"
          >
            <img v-if="param.avatar" :src="param.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="param.mobile" placeholder="请输入手机号，可以不填" />
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduction">
          <el-input
            v-model="param.introduction"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入自我介绍，可以不填"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="param.password" :type="passwordType" placeholder="请输入登录密码，必填" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="param.repassword" :type="passwordType" placeholder="请输入确认密码，必填" />
        </el-form-item>
        <el-form-item label="推荐人" prop="pid">
          <el-input v-model="param.pid" :disabled="true" placeholder="推荐人id" />
        </el-form-item>
        <div style="text-align:right;">
          <el-button type="danger" @click="showRegistDialog=false">关闭</el-button>
          <el-button type="primary" @click="handleSaveOrUpdate('paramForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { getTempAuthToken } from '@/api/uploadOss'
import { doregist } from '@/api/gloablapi'
import axios from 'axios'

const defaultParam = {
  id: null, // 主键
  username: '', // 登录名
  password: '', // 密码
  repassword: '', // 确认密码
  roleId: '', // 默认角色ID
  roleName: '', // 默认角色名称
  roleCode: '', // 默认角色编码
  nickname: '', // 昵称
  avatar: '', // 头像
  introduction: '', // 简介
  mobile: '', // 手机号
  pid: ''// 推荐人id
}

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能低于六位'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.param.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validMobile2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'))
      } else if (!validMobile(value)) {
        callback(new Error('请输入有效的手机号码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名为空' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      registRules: {
        username: [{ required: true, trigger: 'blur', min: 2, max: 20, message: '长度在3 - 20个字符' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
        nickname: [{ required: true, trigger: 'blur', min: 2, max: 5, message: '长度在3 - 5个字符' }],
        avatar: [{ required: true, trigger: 'blur', message: '请上传头像' }],
        mobile: [{ required: true, trigger: 'blur', validator: validMobile2 }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      showRegistDialog: false,
      redirect: undefined,
      otherQuery: {},
      param: Object.assign({}, defaultParam)
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 保存或者更新
    handleSaveOrUpdate(formName) {
      this.$refs.paramForm.validate((valid) => {
        if (valid) {
          // 主键为空 -> 新增操作
          if (this.param.id == null) {
            doregist(this.param).then(response => {
              console.dir(response)
              if (response.code === 600) {
                this.$alert('恭喜您，注册成功', '提示', {
                  confirmButtonText: '立即登录',
                  callback: action => {
                    this.loginForm.username = this.param.username // 登录账号
                    this.loginForm.password = this.param.password // 登录密码
                    // 执行登录
                    this.handleLogin()
                  }
                })
              }
            })
          } else { // 存在主键 -> 更新操作

          }
        }
      })
    },
    // ##############################图片上传 START ##############################
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
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
            this.param.avatar = oss.fileUploadUrl + '/' + oss.key
          })
          .catch(error => {
            console.log(error, '错误')
          })
      }).catch(err => {
        console.error(err)
      })
    }
    // ##############################图片上传 END ##############################
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .my-el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .my-el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .my-el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
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
