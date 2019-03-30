<template>
  <div>
    <el-dialog title="用户角色" :visible.sync="FormVisible" width="500px">
      <el-form label-position="left" :model="editFrom" size="mini" ref="FormEl" :rules="formRules">
        <el-form-item display label="用户名" label-width="80px" prop="username">
          <el-input label-position="left" v-model="editFrom.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="80px" prop="email">
          <!--
              el-select 会自动让 el-option 的value 与 editForm.rid 相等的被选中
          -->
          <el-select v-model="editFrom.rid" placeholder="请选择">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { getById as getUserById } from "@/api/user";
import { getRoleList, updateUserRoleByUserId} from "@/api/role";


export default {
  name: "UserEditRole",
  data() {
    return {
      roleId: 30,
      FormVisible: false,
      editFrom: {
        username: "",
        email: "",
        mobile: "",
        rid: 0
      },
      roles: [],
      formRules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        moblie: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleEdit() {
      this.$refs.FormEl.validate(valid => {
        if (!valid) {
          return;
        }
        this.submitEdit();
      });
    },
    async submitEdit() {
      const { id: userId, rid: roleId } = this.editFrom;
      const { meta } = await updateUserRoleByUserId(userId, roleId);
      if (meta.status === 200) {
        this.$emit("edit-role-success");
        this.FormVisible = false;
        this.$message({
          type: "success",
          message: "分配用户角色成功"
        });
      }

      // const { meta } = await getRoleList(id, {
      //   email,
      //   mobile
      // });
      // if (meta.status === 200) {
      //   this.$emit("edit-role-success");
      //   this.FormVisible = false;
      //   this.$message({
      //     type: "success",
      //     message: "分配成功"
      //   });
      // }
    },
    async showEditRoleDialog(item) {
      // console.log(item)
      const { meta, data } = await getUserById(item.id);
      if (meta.status === 200) {
        this.editFrom = data;
        this.FormVisible = true;
      }
      const { meta: roleMeta, data: roleData } = await getRoleList();
      if (roleMeta.status === 200) {
        this.roles = roleData;
      }
    }
  }
};
</script>

<style>
</style>
