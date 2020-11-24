<template>
  <div :class="classObj" class="dr-adsInfoForm">
    <div class="main-container">
      <ItemForm :device="device" :formState="itemForm" />
      <el-form
        :model="infoForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="分类一" prop="category1">
          <el-select
            v-model="categoryDefaultValue"
            placeholder="请选择"
            @change="handleChangeLevelOne"
          >
            <el-option
              v-for="item in categoryListLevelOne"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类二" prop="category2">
          <el-select
            v-model="categoryDefaultValue2"
            placeholder="请选择"
            @change="handleChangeLevelTwo"
          >
            <el-option
              v-for="item in categoryListLevelTwo"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类三" prop="category3">
          <el-select v-model="categoryDefaultValue3" placeholder="请选择">
            <el-option
              v-for="item in categoryListLevelThree"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品列表" prop="goodsList">

          <el-button @click="showItemForm">添加产品</el-button>

          <el-table
            :data="infoForm.goodsList"
            style="width: 100%"
          > 
            <el-table-column label="产品名称" prop="name"> </el-table-column>
            <el-table-column label="产品图片" prop="sImg"> </el-table-column>
            <el-table-column label="操作" prop="name"> </el-table-column>
            
          </el-table>
        </el-form-item>
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
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateAds, addOneAd, getOneAd, getCategoryList } from "@/api/goodsInfo";
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
      goodsList:[],
      rules: {
        name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("ads.name"),
            }),
            trigger: "blur",
          },
          {
            min: 2,
            max: 15,
            message: this.$t("validate.ranglengthandnormal", {
              min: 2,
              max: 15,
            }),
            trigger: "blur",
          },
        ],
        comments: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("main.comments_label"),
            }),
            trigger: "blur",
          },
          {
            min: 5,
            max: 30,
            message: this.$t("validate.ranglengthandnormal", {
              min: 5,
              max: 30,
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
          let params = this.infoForm;
          let categoryId=JSON.stringify([this.categoryDefaultValue,this.categoryDefaultValue2,this.categoryDefaultValue3]);
          let goodsList=JSON.stringify(this.infoForm.goodsList);
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
            addOneAd({
              categoryId:categoryId,
              goodsList:goodsList
            }).then((result) => {
              if (result.status === 200) {
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success",
                });
                this.$router.push(this.$root.adminBasePath + "/goodsInfo");
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

    getCategoryList().then((categoryList) => {
      this.categoryListAll = categoryList.data;

      this.categoryListLevelOne = categoryList.data
        .filter((item) => item.parentId == "0")
        .map((item) => ({
          value: item.name,
          label: item.name,
          parentId: item.parentId,
          id: item.id,
        }));
    });
  },
};
</script>
<style lang="scss">
.demo-ruleForm{
  margin-left:50px;
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