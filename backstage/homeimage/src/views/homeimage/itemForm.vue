<template>
  <div class="dr-adminGroupForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      :title="$t('homeimage.typePic')"
      :visible.sync="formState.show"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="itemType == '1'"  
        :model="formState" 
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
       
        <el-form-item :label="$t('homeimage.upload')"  >
          <el-upload
            class="avatar-uploader"
            action="/api/upload/files"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{action:'uploadimage'}"
          >
            <img v-if="formState.img" :src="formState.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
          >{{formState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}</el-button>
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
    device: String
  },
  data() {
    return {
       
    };
  },
  computed: {
    itemType() {
      return this.$store.getters.infoFormState.type;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {  
      console.log( res.data.path);
      this.formState.img = res.data.path;
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
 
 
      this.$refs[formName].validate(valid => { 
        if (valid) {
          let params = this.formState;
          let oldFormState = this.$store.getters.itemFormState;
          let item = oldFormState;
          // 更新
          if (this.formState.edit) { 
            this.$store.dispatch("homeimage/homeimageInfoForm", oldFormState);
          } else {
            // 新增 
            this.$store.dispatch("homeimage/addImage", {img:params.img});
          }
          this.$store.dispatch("homeimage/hideItemForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
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

