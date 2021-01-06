<template>
  <div class="dr-adminUserForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      title="请填写产品信息"
      :visible.sync="dialogState.show"
      :close-on-click-modal="false"
      :fullscreen="true"
    >
      <el-form
        :model="dialogState.formData"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input size="small" v-model="dialogState.formData.name"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="model">
          <el-input
            size="small"
            v-model="dialogState.formData.model"
          ></el-input>
          <div style="color: red">注意每个型号使用逗号隔开!!!</div>
        </el-form-item>
        <el-form-item label="产品单位" prop="unit">
          <el-input size="small" v-model="dialogState.formData.unit"></el-input>
        </el-form-item>
         <el-form-item label="产品品牌" prop="brand_id">
          <el-select
            v-model="dialogState.formData.brand_id"
            placeholder="请选择"
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
        <el-form-item label="产品分类" prop="category">
          <template>
            <el-select
              v-model="categoryValue.one"
              placeholder="请选择"
              @change="handleChangeCategory1"
            >
              <el-option
                v-for="item in categoryList.one"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="categoryValue.two"
              placeholder="请选择"
              @change="handleChangeCategory2"
            >
              <el-option
                v-for="item in categoryList.two"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
              <el-select
              v-model="categoryValue.three"
              placeholder="请选择" 
            >
              <el-option
                v-for="item in categoryList.three"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="产品图片" prop="imgList">
          <el-upload
            class=""
            action="/api/upload/files"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ action: 'uploadimage' }"
          >
            <div style="display: flex">
              <img
                v-for="(item, i) in dialogState.formData.imgList"
                :key="i"
                class="avatar"
                :src="item.url"
              />

              <i class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
            </div>
          </el-upload>
        </el-form-item>
       
        <el-form-item label="产品市场价" prop="mark_price">
          <el-input-number v-model="dialogState.formData.mark_price" controls-position="right"  ></el-input-number>
        </el-form-item>

        <el-form-item label="是否有效产品" prop="is_work">
          <el-switch
            :on-text="$t('main.radioOn')"
            :off-text="$t('main.radioOff')"
            v-model="dialogState.formData.is_work"
          ></el-switch>
        </el-form-item>
      
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
            >{{
              dialogState.edit
                ? $t("main.form_btnText_update")
                : $t("main.form_btnText_save")
            }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import settings from "@root/publicMethods/settings";
import {
  checkUserName,
  checkEmail,
  checkName,
  checkPwd,
  checkPhoneNum,
} from "@/utils/validate";
import { addAdminUser, updateAdminUser, getBrandList,getCategoryList,getCaList } from "@/api/adminUser";
import { stringify } from 'querystring';

export default {
  props: {
    dialogState: Object,
    groups: Array,
    device: String, 
  },
  watch:{
     dialogState:{
        handler(newName, oldName) { 
          if(!newName.edit){
            return ;
          }
          const category_list=JSON.parse(newName.formData.category_list);
          this.categoryList.two = this.categoryList.all
          .filter((item) => item.parentId == category_list.one.id)
          .map((item) => ({
            value: item.name,
            label: item.name,
            parentId: item.parentId,
            id: item.id,
          }));
          this.categoryList.three = this.categoryList.all
          .filter((item) => item.parentId == category_list.two.id)
          .map((item) => ({
            value: item.name,
            label: item.name,
            parentId: item.parentId,
            id: item.id,
          }));
          this.categoryValue={
            one:Number(category_list.one.id),
            two:Number(category_list.two.id),
            three:Number(category_list.three.id)
          }
    　　},
    　　immediate: true,
        deep: true,
     }
  },
  data() {
    return {
      server_api: settings.server_api,
      countryCode: [
        { value: "86", label: "中国 +86" },
        { value: "886", label: "台湾 +886" },
        { value: "81", label: "日本 +81" },
      ],
      rules: {
         
        name: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur",
          }, 
        ],
         model: [
          {
            required: true,
            message: "请输入产品型号",
            trigger: "blur",
          }, 
        ],   
         unit: [
          {
            required: true,
            message: "请输入产品单位",
            trigger: "blur",
          }, 
        ],  
        brand_id: [
          {
            required: true,
            message: "请输入产品品牌",
            trigger: "change",
          }, 
           {
            validator: (rule, value, callback) => { 
              console.log(value)
              if (value===undefined) {
                callback(
                  new Error(
                    "请输入产品品牌"
                  )
                );
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],  
      },
      brandListAll: [],
      categoryList:{
        all:[],
        one:[],
        two:[],
        three:[]
      }, 
      categoryValue:{
        one:"",
        two:"",
        three:""
      }

    };
  },
  methods: {
    handleChangeCategory1(name) {
      let copy = [].concat(this.categoryList.one);
      let parentId = copy.filter((item) => item.id === name)[0].id;
      this.categoryList.two = this.categoryList.all
        .filter((item) => item.parentId == parentId)
        .map((item) => ({
          value: item.name,
          label: item.name,
          parentId: item.parentId,
          id: item.id,
        }));
    },
    handleChangeCategory2(name) {
      let copy = [].concat(this.categoryList.two);
      let parentId = copy.filter((item) => item.id === name)[0].id;
      this.categoryList.three = this.categoryList.all
        .filter((item) => item.parentId == parentId)
        .map((item) => ({
          value: item.name,
          label: item.name,
          parentId: item.parentId,
          id: item.id,
        }));
    },
    handleAvatarSuccess(res, file) {
      let imageUrl = res.data.path;
      this.$store.dispatch("adminUser/showAdminUserForm", {
        edit: this.dialogState.edit,
        formData: Object.assign({}, this.dialogState.formData, {
          imgList: [...this.dialogState.formData.imgList, { url: imageUrl }],
        }),
      });
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
    confirm() {
      this.$store.dispatch("adminUser/hideAdminUserForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.dialogState.formData);
       
          if(params.imgList.length===0){
            this.$message.error('产品图片必填');
            return ;
          }
          if(!this.categoryValue.three){
            this.$message.error('产品分类必填');
            return ;
          }
          
          // 更新
          if (this.dialogState.edit) {
            updateAdminUser({
              ...params,
              category_id:this.categoryValue.three,
              category_list:JSON.stringify({
                one:{id:this.categoryValue.one,name:this.categoryList.one.find(item=>this.categoryValue.one).label},
                two:{id:this.categoryValue.two,name:this.categoryList.two.find(item=>this.categoryValue.two).label},
                three:{id:this.categoryValue.three,name:this.categoryList.three.find(item=>this.categoryValue.three).label},
              }),
              is_work:params.is_work?1:0,
              imgList:JSON.stringify(params.imgList)
            }).then((result) => {
              if (result.status === 200) {
                this.$store.dispatch("adminUser/hideAdminUserForm");
                this.$store.dispatch("adminUser/getAdminUserList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success",
                });
              } else {
                this.$message.error(result.message);
              }
            });
          } else {
            // 新增
            addAdminUser({
              ...params,
              category_id:this.categoryValue.three,
              category_list:JSON.stringify({
                one:{id:this.categoryValue.one,name:this.categoryList.one.find(item=>this.categoryValue.one).label},
                two:{id:this.categoryValue.two,name:this.categoryList.two.find(item=>this.categoryValue.two).label},
                three:{id:this.categoryValue.three,name:this.categoryList.three.find(item=>this.categoryValue.three).label},
              }),
              is_work:params.is_work?1:0,
              imgList:JSON.stringify(params.imgList)
            }).then((result) => {
              if (result.status === 200) {
                this.$store.dispatch("adminUser/hideAdminUserForm");
                this.$store.dispatch("adminUser/getAdminUserList");
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success",
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
    },
    resetForm(formName) {
      this.dialogState.formData = {};
    },
  },
  computed: {
    brandList() {
      return this.brandListAll.map((item) => ({
        value: item.name,
        label: item.name,
        id: item.id,
      }));
    },
    
  },
  mounted() {
    getCaList().then(()=>{
      
    })
    getBrandList({ isPaging: "0" }).then((brandList) => {
      this.brandListAll = brandList.data;
    });
    getCategoryList().then((categoryList) => {
      this.categoryList.all = categoryList.data;

      this.categoryList.one = categoryList.data
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
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border: 1px dashed #d9d9d9;
}
</style>