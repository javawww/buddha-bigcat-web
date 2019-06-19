<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { defaultslash, roleResTree } from '@/api/gloablapi'

export default {
  name: 'App',
  created() {
    // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  mounted() {
    // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    // defaultslash().then(response => {
    // console.log('%c******默认斜杠接口访问结果******','color:#9900CC;font-size:16px')
    // console.dir(response)
    // })
  }
}
</script>
