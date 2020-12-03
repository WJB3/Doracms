<template>
  <div :class="classObj" class="dr-adsInfoForm">
    <div class="main-container">
      <ItemForm :device="device" :formState="itemForm" />
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :inline="true"
      >
        <el-row>
          <el-form-item label="品牌编码" prop="code">
            <el-input v-model="form.code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="品牌供应商" prop="business">
            <el-input
              v-model="form.business"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌归属地" prop="attribution">
            <el-input
              v-model="form.attribution"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sortId">
            <el-input-number
              size="small"
              v-model="form.sortId"
              :min="1"
              :max="50"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="上传图片" prop="img">
            <el-upload
              class="avatar-uploader"
              action="/api/upload/files"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :data="{ action: 'uploadimage' }"
            >
              <img
                v-if="form.img"
                :src="form.img"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :offset="18" style="margin-top: 40px">
            <el-form-item>
              <el-button
                size="medium"
                type="primary"
                @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <el-button size="medium" @click="backToList">{{
                $t("main.back")
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateAds, addOneAd, getOneAd } from "@/api/goodsInfo";
import ItemForm from "./itemForm";
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  data() {
    return {
      categoryDefaultValue: "",
      categoryDefaultValue2: "",
      categoryDefaultValue3: "",
      sidebarOpened: true,
      device: "desktop",
      goodsList: [],
      form: {
        code: "",
        name: "",
        business: "",
        attribution: "",
        img:"",
        sortId: 1,
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: "请输入产品品牌名称",
            }),
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: "请输入产品品牌编码",
            }),
            trigger: "blur",
          },
        ],
        business: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: "请输入产品品牌供应商",
            }),
            trigger: "blur",
          },
        ],
        attribution: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: "请输入产品品牌归属地",
            }),
            trigger: "blur",
          },
        ],
       
      },
      categoryListLevelOne: [],
      categoryListLevelTwo: [],
      categoryListLevelThree: [],
      categoryListAll: [],
    };
  },
  components: {
    ItemForm,
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.img = res.data.path;
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
    handleChangeLevelOne(name) {
      let copy = [].concat(this.categoryListLevelOne);
      let parentId = copy.filter((item) => item.id === name)[0].id;
      this.categoryListLevelTwo = this.categoryListAll
        .filter((item) => item.parentId == parentId)
        .map((item) => ({
          value: item.name,
          label: item.name,
          parentId: item.parentId,
          id: item.id,
        }));
    },
    handleChangeLevelTwo(name) {
      let copy = [].concat(this.categoryListLevelTwo);
      let parentId = copy.filter((item) => item.id === name)[0].id;
      this.categoryListLevelThree = this.categoryListAll
        .filter((item) => item.parentId == parentId)
        .map((item) => ({
          value: item.name,
          label: item.name,
          parentId: item.parentId,
          id: item.id,
        }));
    },
    backToList() {
      this.$router.push(this.$root.adminBasePath + "/goodsInfo");
    },
    changeType(type) {},
    showItemForm() {
      this.$store.dispatch("goodsInfo/showItemForm", { edit: false });
    },
    editAdsItemInfo(item) {
      this.$store.dispatch("ads/showAdsItemForm", {
        edit: true,
        formData: item,
      });
    },
    deleteAdsItem(item) {
      let oldFormState = this.$store.getters.adsInfoForm;
      let adsItems = oldFormState.formData.items;
      let newItems = _.filter(adsItems, (doc) => {
        return doc._id != item._id;
      });
      oldFormState.formData.items = newItems;
      this.$store.dispatch("goodsInfo/infoForm", oldFormState);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.form;
          if(!params.img){
            this.$message.error("品牌图片必传");
            return ;
          }
          // 更新
          if (this.infoForm.edit) {
            updateAds(params).then((result) => {
              if (result.status === 200) {
                this.$store.dispatch("goodsInfo/hideItemForm");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success",
                });
                this.$router.push(this.$root.adminBasePath + "/ads");
              } else {
                this.$message.error(result.message);
              }
            });
          } else {
            // 新增
            addOneAd(params).then((result) => {
              if (result.status === 200) {
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success",
                });
                this.$router.push(this.$root.adminBasePath + "/goodsBrand");
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
    },
  },
  computed: {
    ...mapGetters(["itemForm"]),
    infoForm() {
      return this.$store.getters.infoForm;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebarOpened,
        openSidebar: this.sidebarOpened,
        withoutAnimation: "false",
        mobile: this.device === "mobile",
      };
    },
  },
  mounted() {
    initEvent(this);
    // 针对手动页面刷新
    if (this.$route.params.id) {
      getOneAd(this.$route.params).then((result) => {
        if (result.status === 200) {
          if (result.data) {
            this.$store.dispatch("ads/adsInfoForm", {
              edit: true,
              formData: result.data,
            });
          } else {
            this.$message({
              message: this.$t("validate.error_params"),
              type: "warning",
              onClose: () => {
                this.$router.push(this.$root.adminBasePath + "/ads");
              },
            });
          }
        } else {
          this.$message.error(result.message);
        }
      });
    }
  },
};
</script>
<style lang="scss">
.demo-ruleForm {
  margin-left: 50px;
}
.dr-adsInfoForm {
  margin-top: 30px;
}
.el-tag {
  margin-right: 15px;
}

.dr-ads-item {
  color: #48576a;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  padding: 5px;
  position: relative;
  margin: 15px 0;
  .img {
    width: 70px;
    height: 70px;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .details {
    display: inline-block;
    margin-left: 80px;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style-type: none;
      }
    }
  }
  .options {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .el-icon-close {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 11px;
    cursor: pointer;
    color: #bfcbd9;
  }
}
</style>