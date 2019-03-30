<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片头 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>仅限管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 操作选项 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
          placeholder="请输入内容"
          v-model="searchText"
          @keyup.enter.native="handleSearch(loadUsers(1))">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 卡片内容 -->
      <!--
      表格组件
      data是表格的数据
      stripe斑马纹
      el-table-column 表格列组件
        你只需要设计表格列 列名+列值
        v-loading 是element-ui 扩展的一个自定义指令，用于添加loading加载效果
      -->
      <el-table :data="users" stripe border="" style="width: 100%" :v-loading="tableLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @click="handleChangeState(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <!--
          自定义表格列
        -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$refs.userEditEl.showEditDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-check"
              @click="$refs.userEditRoleEl.showEditRoleDialog(scope.row)"
            >分类角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
        分页组件
        background 带有背景色
        layout 分页结构 prev 显示上一页 pager, next 显示下一页
        total 数据总条数
        current-change 页面改变户触发事件
      -->
      <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="loadUsers"
      :page-size="5"></el-pagination>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- !分页组件 -->
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="500px">
      <el-form
        label-position="left"
        :model="addFromData"
        size="mini"
        ref="addFormEl"
        :rules="addFromRules"
      >
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input label-position="left" v-model="addFromData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input label-position="left" v-model="addFromData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input label-position="left" v-model="addFromData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input label-position="left" v-model="addFromData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户框 -->
    <UserEdit ref="userEditEl" v-on:edit-success="loadUsers"></UserEdit>
    <!-- 编辑用户角色 -->
    <UserEditRole ref="userEditRoleEl"></UserEditRole>
  </div>
</template>
<script>
// import { getUserList, addUser } from "@/api/user"
import * as User from "@/api/user";
import UserEdit from "./edit";
import UserEditRole from "./edit-role";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      value1: true,
      value2: true,
      searchText: "",
      addFormVisible: false,
      addFromData: {
        username: "",
        password: "",
        email: "",
        moblie: ""
      },
      pagesize: 10,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // tableLoading: true,
      addFromRules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        moblie: [{ required: true, message: "请输入电话", trigger: "blur" }]
      },
      total: 0
    };
  },
  async created() {
    // 2
    window.console.log("2.token存在");
    // 除了登录接口，其他接口都需要身份令牌
    // 所以有需要授权（提供token）的接口需要像下面
    // window.console.log(data)
    this.loadUsers();
    this.handleCurrentChange();
  },
  methods: {
    async loadUsers(page = 1) {
      this.tableLoading = true;
      const { data } = await User.getUserList({
        pagenum: page,
        pagesize: this.pagesize,
        query: this.searchText
      });
      this.users = data.users;
      this.total = data.total;
      this.tableLoading = false; //取消 loading 效果
    },
    async handleAdd() {
      const { meta } = await User.addUser(this.addFromData);
      if (meta.status === 201) {
        // 清空表单
        this.$refs.addFormEl.resetFields();
        this.addFormVisible = false; // 隐藏对话框
        setTimeout(() => {
          this.loadUsers(); // 重新加载
        }, 1000);
      }
    },
    handleSearch() {
      // this.loadUsers()   //回车直接调用
    },
    handleSizeChange(size) {
      window.console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(page = 1) {
      window.console.log(`当前页: ${page}`);
      this.loadUsers(page);
    },
    handleEdit() {},
    handleDelete(item) {
      // console.log(item)
      this.$confirm("确定删除吗", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 确定
          const { meta } = await User.deleteById(item.id);
          // this.$router.replace("/users")
          if (meta.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.loadUsers();
          }
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 监听开关的change事件
    async handleChangeState(item) {
      // window.console.log(item)
      const { meta, data } = await User.changeState(item.id, item.mg_state);
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: `${data.mg_state ? "启用" : "禁用"}用户登录成功`
        });
      }
    }
  },
  components: {
    UserEdit,
    UserEditRole
  }
};
</script>
<style scoped>
.el-card {
  height: 100%;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
