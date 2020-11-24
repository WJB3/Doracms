<template>
  <div class="dr-AdminResourceForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      title="填写分类信息"
      :visible.sync="dialogState.show"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogState.formData"
        :rules="cateRules"
        ref="cateRuleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-show="dialogState.cate_type==='children' && !dialogState.edit"
          :label="$t('goodsCategory.parentType')"
          prop="label"
        >
          <el-input size="small" :disabled="true" v-model="dialogState.formData.parentObj.name"></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input size="small" v-model="dialogState.formData.name"></el-input>
        </el-form-item>
         <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('cateRuleForm')"
          >{{dialogState.edit ? "编辑" : "添加"}}</el-button>
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  addGoodsCategory,
  updateGoodsCategory
} from "@/api/goodsCategory";
import settings from "@root/publicMethods/settings";
import _ from "lodash";
export default {
  props: ["dialogState", "forderlist"],
  data() {
    return {
      server_api: settings.server_api,
      cateRules: {
        name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("goodsCategory.cate_name")
            }),
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: this.$t("validate.rangelength", { min: 2, max: 20 }),
            trigger: "blur"
          }
        ],
       
      }
    };
  },
  methods: {   
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("---formdatas--", this);
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            updateGoodsCategory(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("goodsCategory/hideGoodsCategoryForm");
                this.$store.dispatch("goodsCategory/getGoodsCategoryList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.message);
              }
            });
          } else {
            // 新增
            addGoodsCategory(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("goodsCategory/hideGoodsCategoryForm");
                this.$store.dispatch("goodsCategory/getGoodsCategoryList");
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px !important;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 158px;
  display: block;
}
</style>