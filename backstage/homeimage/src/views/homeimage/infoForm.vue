<template>
  <div :class="classObj" class="dr-InfoForm infoForm">
    <div class="main-container">
      <ItemForm :device="device" :formState="itemFormState" />

      <el-form
        :model="formState"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <el-form-item label="首页图片名称" prop="name">
          <el-input size="small" v-model="formState.name"></el-input>
        </el-form-item>

        <el-form-item label="首页图片列表" prop="imgList">
          <el-button
            size="small"
            type="primary"
            plain
            round
            @click="showItemForm"
            >添加图片</el-button
          >

          <div v-if="formState.imgList.length > 0" class="wrapper">
            <div
              class="homeimage-item"
              v-for="item in formState.imgList"
              :key="item._id"
            >
              <div class="img">
                <img :src="item.link" />
              </div>
              <i class="el-icon-close close-icon" @click="deleteItem(item)"></i>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { update, add, getOneAd } from "@/api/homeimage";
import ItemForm from "./itemForm";
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  data() {
    var validateImg = (rule, value, callback) => {
      
      if ((value||[]).length === 0) {
        callback(new Error("请选择图片"));
      } 
      callback();
    
    };
    return {
      sidebarOpened: true,
      device: "desktop",
      rules: {
        name: [
          {
            required: true,
            message: "请输入首页图片名称",
            trigger: "blur",
          },
        ],
        imgList: [
          {
            required: true,
            validator: validateImg,
            message: "请选择首页图片",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    ItemForm,
  },
  methods: {
    backToList() {
      this.$router.push(this.$root.adminBasePath + "/homeimage");
    },
    changeType(type) {},
    showItemForm() {
      this.$store.dispatch("homeimage/showItemForm", { edit: false });
    },

    deleteItem(item) {
      let oldFormState = this.$store.getters.infoFormState;
      let imgList = oldFormState.imgList;
      let newItems = _.filter(imgList, (doc) => {
        return doc._id !== item._id;
      });
      oldFormState.imgList = newItems;
      this.$store.dispatch("homeimage/homeimageInfoForm", oldFormState);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => { 
        if (valid) {
          let params = this.formState;
          // 更新
          if (this.formState.edit) {
            update(params).then((result) => {
              if (result.status === 200) {
                this.$store.dispatch("homeimage/hideItemForm");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success",
                });
                this.$router.push(this.$root.adminBasePath + "/homeimage");
              } else {
                this.$message.error(result.message);
              }
            });
          } else {
            // 新增
            add(params).then((result) => {
              if (result.status === 200) {
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success",
                });
                this.$router.push(this.$root.adminBasePath + "/homeimage");
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
    itemFormState() {
      return this.$store.getters.itemFormState;
    },
    formState() {
      return this.$store.getters.infoFormState;
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
            this.$store.dispatch("homeimage/InfoForm", {
              edit: true,
              formData: result.data,
            });
          } else {
            this.$message({
              message: this.$t("validate.error_params"),
              type: "warning",
              onClose: () => {
                this.$router.push(this.$root.adminBasePath + "/homeimage");
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
.dr-InfoForm {
  margin-top: 30px;
}
.el-tag {
  margin-right: 15px;
}

.dr-homeimage-item {
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
.infoForm {
  .wrapper {
    display: flex;
    flex-wrap: wrap;

    .homeimage-item {
      width: 23%;
      height: 300px;
      position: relative;
      border: 2px solid skyblue;
      border-radius: 4px;
      padding: 5px;
      margin: 1%;

      .img {
        height: 100%;
        width: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .close-icon {
        position: absolute;
        top: 15px;
        font-size: 20px;
        font-weight: 600;
        right: 15px;
      }
    }
  }
}
</style>