<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="主键" width="100">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色编码" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.rolesName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
      <el-form ref="paramForm" :model="param" :rules="paramRules" label-width="80px" label-position="left">
        <el-form-item label="角色名称" prop="rolesName">
          <el-input v-model="param.rolesName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="param.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="角色描述" prop="content">
          <el-input
            v-model="param.content"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入就角色描述"
          />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :expand-on-click-node="false"
            :data="routesData"
            :props="defaultProps"
            :default-expand-all="true"
            show-checkbox
            check-on-click-node
            node-key="id"
            class="permission-tree"
            :default-checked-keys="checkedKeys"
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
import { getRoutes2, getRoles, addRole, deleteRole, updateRole, checkedResArr } from '@/api/role'

const defaultParam = {
  id: null, // 主键
  rolesName: '', // 角色名称
  content: '', //  角色描述
  roleCode: '', // 角色编码
  routes: [], // 路由菜单
  resourcesIdArr: []// 选中的菜单节点
}

export default {
  data() {
    return {
      param: Object.assign({}, defaultParam),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      checkedKeys: [], // 选中的节点
      paramRules: {
        rolesName: [{ required: true, trigger: 'blur', message: '角色名称不能为空' }],
        content: [{ required: true, trigger: 'blur', message: '角色描述不能为空' }],
        roleCode: [{ required: true, trigger: 'blur', message: '角色编码不能为空' }]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes2()
    this.getRoles()
  },
  methods: {
    async getRoutes2() {
      const res = await getRoutes2()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles(this.listQuery)
      this.rolesList = res.data
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
    handleAddRole() { // 新增
      this.param = Object.assign({}, defaultParam)
      this.param.resourcesIdArr = []
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) { // 编辑
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.param = deepClone(scope.row)
      this.param.resourcesIdArr = []
      // console.dir(this.generateArr(this.generateRoutes(this.routes)))
      // 获取该角色拥有的路由菜单
      checkedResArr(this.param).then(response => {
        this.$refs.tree.setCheckedKeys([])// 取消选中
        this.checkedKeys = response.data
        this.checkStrictly = false
      })
      return
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    // 保存或者更新操作
    handleSaveOrUpdate() {
      this.$refs.paramForm.validate((valid) => {
        if (valid) {
          // 主键为空 -> 新增操作
          if (this.param.id == null) {
            // 获取选中的资源
            if (this.$refs.tree.getCheckedNodes().length > 0) {
              this.$refs.tree.getCheckedNodes().map(item => {
                this.param.resourcesIdArr.push(item.id)
              })
            }
            addRole(this.param).then(response => {
              if (response.code === 600) {
                this.dialogVisible = false
                this.getRoles()
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
              }
            })
          } else { // 存在主键 -> 更新操作
            // 获取选中的资源
            if (this.$refs.tree.getCheckedNodes().length > 0) {
              this.$refs.tree.getCheckedNodes().map(item => {
                this.param.resourcesIdArr.push(item.id)
              })
            }
            updateRole(this.param).then(response => {
              if (response.code === 600) {
                this.dialogVisible = false
                this.getRoles()
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
              }
            })
          }
        }
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          deleteRole(row).then(response => {
            if (response.code === 600) {
              this.dialogVisible = false
              this.getRoles()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })
          return
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
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
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
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
    }
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
    // }
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
