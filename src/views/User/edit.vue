<template>
  <div>
    <el-dialog title="编辑用户" :visible.sync="FormVisible" width="500px">
      <el-form
      label-position="left"
      :model="editFrom"
      size="mini"
      ref="FormEl"
      :rules="formRules">
        <el-form-item display label="用户名" label-width="80px" prop="username">
          <el-input label-position="left" v-model="editFrom.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input label-position="left" v-model="editFrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input label-position="left" v-model="editFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getById as getUserById,updateById as updateUserById} from '@/api/user'

export default {
  name: 'UserEdit',
  data () {
    return {
      FormVisible: false,
      editFrom: {
        username: '' ,
        email: '',
        mobile: ''
      },
      formRules: {
        email: [
          { required:true, message: '请输入邮箱', trigger: 'blur' }
        ],
        moblie: [
          { required:true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit() {
      this.$refs.FormEl.validate(valid => {
        if (!valid) {
          return
        }
        this.submitEdit()
      })
    },
    async submitEdit () {
      const { id,email,mobile } = this.editFrom
      const { meta } = await updateUserById(id,{
        email,
        mobile
      })
      if (meta.status === 200) {
        // 更新列表数据
        // 方式一：在当前组件调用父组件方法
        //    不建议，太依赖父组件
        //方式二： 事件方式，更推荐
        //在当前组件发布了，谁就可以去关注这个事假

        // 编辑成功，发布了一个自定义事件
        // 这个事件就表示：编辑成功
        // 使用这个组件的用户就可以根据自己的路要在编辑成功之后进行
        // 至于其他组件要编辑成功之后干嘛，我当前组件不关心了，
        // 水来用，谁去决定编辑成功之后
        // 隐藏对话框
        this.$emit('edit-success')
        this.FormVisible = false
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }

    },
    async showEditDialog (item) {
      // console.log(item)
      const { meta,data } = await getUserById(item.id)
      if (meta.status === 200) {
        this.editFrom = data
        this.FormVisible = true
      }
    }
  }
}
</script>

<style>
</style>
