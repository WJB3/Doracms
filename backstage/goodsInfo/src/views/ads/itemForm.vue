<template>
  <div class="dr-adminGroupForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      :title="添加产品"
      :visible.sync="formState.show"
      :close-on-click-modal="false"
    >
      <el-form 
        :model="formState.formData"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input size="small" v-model="formState.formData.name"></el-input>
        </el-form-item>

        <el-form-item label="品牌" prop="brand">
          <el-select
            v-model="formState.formData.brand"
            placeholder="请选择"
            @change="handleChangeBrand"
          >
            <el-option
              v-for="item in brandList"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传图片" prop="sImg">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/files"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ action: 'uploadimage' }"
          >
            <img
              v-if="formState.formData.sImg"
              :src="formState.formData.sImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    formState: Object,
    device: String,
    brandListAll:Array
  },
  data() {
    return { 
      rules: {
        name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: "名称必填",
            }),
            trigger: "blur",
          }, 
        ],
        sImg: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label:  "图片链接必填"
            }),
            trigger: "blur",
          },
        ],
      },
      defaultValue:""
    };
  },
  computed: { 
    brandList(){
      return this.brandListAll.map((item)=>({
          value: item.name,
          label: item.name, 
          id: item.id,
      }))
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.formState.formData.sImg = res.data.path;
    },
    handleChangeBrand(value){

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error(this.$t("validate.limitUploadImgType"));
      }
      if (!isLt2M) {
        this.$message.error(
          this.$t("validate.limitUploadImgSize", { size: 2 })
        );
      }
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
    submitForm(formName, type = "") {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.formState.formData;
          let oldFormState = this.$store.getters.infoForm;
          let items = oldFormState.goodsList;
          // 更新
          if (this.formState.edit) {
            for (let i = 0; i < items.length; i++) {
              if (items[i]._id == params._id) items[i] = params;
            }
            this.$store.dispatch("goodsInfo/infoForm", oldFormState);
          } else {
            // 新增
            items.push(params);
            this.$store.dispatch("goodsInfo/infoForm", oldFormState);
          }
          this.$store.dispatch("goodsInfo/hideItemForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  
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
  width: 200px;
  height: 150px;
  line-height: 150px !important;
  text-align: center;
}

.avatar {
  width: 200px;
  height: 158px;
  display: block;
}
</style>

