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
          <el-input placeholder="请输入内容" v-model="searchText">
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
      <el-table
      :data="users"
      stripe
      border
      style="width: 100%"
      :v-loading="tableLoading">
        <el-table-column type="index" label="编号" width="60"></el-table-column>
        <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="email" label="商品价格" width="180"></el-table-column>
        <el-table-column prop="mobile" label="商品状态" width="180"></el-table-column>
        <el-table-column prop="mobile" label="商品重量" width="180"></el-table-column>
        <el-table-column prop="mobile" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="mobile" label="操作"></el-table-column>

      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name:'',
  data () {
    return {}
  }
}
</script>
<style>

</style>
