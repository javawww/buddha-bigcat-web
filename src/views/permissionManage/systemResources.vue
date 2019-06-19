<template>
  <div class="app-container">
    <el-button type="primary" @click="saveResources">新增</el-button>

    <el-row :gutter="20" style="width: 100%;margin-top:30px;">
      <el-col :span="4">
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="routesData"
          :props="defaultProps"
          :default-expand-all="true"
          :expand-on-click-node="false"
          check-on-click-node
          show-checkbox
          node-key="id"
          class="permission-tree"
          @current-change="oncurrentChange"
          @check-change="oncheckChange"
          @node-click="onnodeClick"
          @check="oncheck"
        />
      </el-col>
      <el-col :span="16">
        <el-form ref="updateParamForm" :model="param" :rules="saveParamRules" status-icon label-width="80px" label-position="left">
          <el-form-item label="父菜单">
            <el-input v-model="param.ptitle" placeholder="" :disabled="true" />
          </el-form-item>
          <el-form-item label="父ID">
            <el-input v-model="param.pid" placeholder="" :disabled="true" />
          </el-form-item>
          <el-form-item label="主键">
            <el-input v-model="param.id" placeholder="" :disabled="true" />
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="param.path" placeholder="" />
          </el-form-item>
          <el-form-item label="组件">
            <el-input v-model="param.component" placeholder="" />
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="param.name" placeholder="" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="param.title" placeholder="" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input type="number" v-model="param.sorts" placeholder="" />
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="param.icon" placeholder="" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="param.content"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder=""
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="handleDelete">删除</el-button>
          <el-button type="primary" @click="handleUpdate">更新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form ref="saveParamForm" :model="saveParam" :rules="saveParamRules" status-icon label-width="80px" label-position="left">
        <el-form-item label="父标题" prop="ptitle">
          <el-input v-model="saveParam.ptitle" placeholder="" :disabled="true" />
        </el-form-item>
        <el-form-item label="父ID" prop="pid">
          <el-input v-model="saveParam.pid" placeholder="" :disabled="true" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="saveParam.path" placeholder="" />
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="saveParam.component" placeholder="" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="saveParam.name" placeholder="" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="saveParam.title" placeholder="" />
        </el-form-item>
        <el-form-item label="排序" prop="sorts">
          <el-input type="number" v-model="saveParam.sorts" placeholder="" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="saveParam.icon" placeholder="" />
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input
            v-model="saveParam.content"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">关闭</el-button>
        <el-button type="primary" @click="handleSaveOrUpdate">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes2, addRole, updateRole } from '@/api/role'
import { saveResources, updateResources, delResources, detailResources } from '@/api/systemResources'
const defaultParam = {
  id: null, // 主键
  path: '', // 路径
  component: '', // 组件
  name: '', // name
  title: '', // 标题
  icon: '', // 图标
  content: '', // 描述
  ptitle: '', // 父级标题
  pid: ''// 父级id
}

const saveDefaultParam = {
  id: null, // 主键
  path: '', // 路径
  component: '', // 组件
  name: '', // name
  title: '', // 标题
  icon: '', // 图标
  content: '', // 描述
  ptitle: '', // 父级标题
  pid: ''// 父级id
}

export default {
  data() {
    return {
      param: Object.assign({}, defaultParam),
      saveParam: Object.assign({}, saveDefaultParam),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: true,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listQuery: {
        page: 1,
        limit: 20,
        id: null // 编辑id
      },
      saveParamRules: {
        path: [{ required: true, trigger: 'blur', message: '路径不能为空' }],
        component: [{ required: true, trigger: 'blur', message: '组件不能为空' }],
        name: [{ required: true, trigger: 'blur', message: 'Name不能为空' }],
        title: [{ required: true, trigger: 'blur', message: '标题不能为空' }],
        icon: [{ required: false, trigger: 'blur', message: '图标不能为空' }],
        content: [{ required: false, trigger: 'blur', message: '说明不能为空' }]
      }
    }
  },
  computed: {
    routesData() {
      console.dir(this.routes)
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes2()
  },
  methods: {
    async getRoutes2() {
      const res = await getRoutes2()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (const route of routes) {
        // skip some route
        if (route.hidden) { continue }

        // const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        // if (route.children && onlyOneShowingChild && !route.alwaysShow) {
        //   route = onlyOneShowingChild
        // }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          id: route.id
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }

      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    // 新增
    saveResources() {
      this.saveParam.pid = this.param.id
      this.saveParam.ptitle = this.param.title
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.param = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.param.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.param.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.param.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.param.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.param.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Nmae: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    // onlyOneShowingChild(children = [], parent) {
    //   let onlyOneChild = null
    //   const showingChildren = children.filter(item => !item.hidden)
    //
    //   // When there is only one child route, the child route is displayed by default
    //   if (showingChildren.length === 1) {
    //     onlyOneChild = showingChildren[0]
    //     onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    //     return onlyOneChild
    //   }
    //
    //   // Show parent if there are no child route to display
    //   if (showingChildren.length === 0) {
    //     onlyOneChild = { ... parent, path: '', noShowingChildren: true }
    //     return onlyOneChild
    //   }
    //
    //   return false
    // },
    // [单选 START]========================
    oncheckChange(item, node, self) {
      if (node === true) { // 点击未选中复选框
        this.listQuery.id = item.id
        this.$refs.tree.setCheckedKeys([item.id])
      } else {
        if (this.listQuery.id === item.id) { // 点击已经选中复选框，保证至少一个选中
          this.$refs.tree.setCheckedKeys([item.id])
        }
      }
    },
    onnodeClick(item, node, self) {
      this.listQuery.id = item.id
      this.$refs.tree.setCheckedKeys([item.id])
    },
    // ====================================[单选 END]
    oncurrentChange(data, bool, child) {
      // console.log('当前选中节点变化[oncheckChange]');
    },
    oncheck(data, check) {
      detailResources(this.listQuery).then(response => {
        console.dir(response.data)
        this.param = response.data
        if (this.param.pid != null) {
          var parentNode = this.$refs.tree.getNode(this.param.pid)
          this.param.pid = parentNode.data.id
          this.param.ptitle = parentNode.data.title
        }
      })
    },
    // 保存或者更新
    handleSaveOrUpdate() {
      this.$refs.saveParamForm.validate((valid) => {
        if (valid) {
          // 主键为空 -> 新增操作
          if (this.saveParam.id === null) {
            saveResources(this.saveParam).then(response => {
              if (response.code === 600) {
                this.dialogVisible = false
                this.getRoutes2() // 刷新
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
              }
            })
          } else { // 存在主键 -> 更新操作

          }
        }
      })
    },
    // 更新操作
    handleUpdate() {
      this.$refs.updateParamForm.validate((valid) => {
        if (valid) {
          updateResources(this.param).then(response => {
            if (response.code === 600) {
              this.dialogVisible = false
              this.getRoutes2() // 刷新
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 删除一条数据
    handleDelete() {
      if (this.param.id === null) {
        this.$message({
          showClose: true,
          message: '请选中一条数据',
          type: 'error'
        })
        return
      }
      // 弹窗提示确认
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delResources(this.param).then(response => {
          if (response.code === 600) {
            this.getRoutes2() // 刷新
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        console.log('取消操作')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
