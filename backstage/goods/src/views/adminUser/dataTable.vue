<template>
  <div>
    <el-table 
      v-loading="loading"
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="model"
        label="产品型号"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="brand_items"
        label="产品品牌"
        show-overflow-tooltip
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row.brand_items[0].name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="产品单位"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column
        prop="mark_price"
        label="市场价"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column
        prop="is_work"
        label="是否有效"
        show-overflow-tooltip
        width="200"
      >
        <template slot-scope="scope">
          <svg-icon
            v-show="scope.row.is_work"
            :style="green"
            icon-class="check-circle-fill"
          />
          <svg-icon
            v-show="!scope.row.is_work"
            :style="red"
            icon-class="minus-circle-fill"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="category_list"
        label="分类三"
        show-overflow-tooltip
        width="200"
      >
        <template slot-scope="scope">
          {{ JSON.parse(scope.row.category_list).three.name }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('adminUser.lb_options')" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            round
            @click="editUserInfo(scope.$index, dataList)"
          >
            <svg-icon icon-class="edit" />
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            round
            @click="deleteUser(scope.$index, dataList)"
          >
            <svg-icon icon-class="icon_delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from "lodash";
import { getOneAdminUser, deleteAdminUser } from "@/api/adminUser";
export default {
  props: {
    dataList: Array,
  },
  data() {
    return {
      loading: false,
      multipleSelection: [],
      green: { color: "#13CE66" },
      red: { color: "#FF4949" },
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editUserInfo(index, rows) {
      let rowData = rows[index];
      getOneAdminUser({ id: rowData._id })
        .then((result) => {
          let adminUserInfo = result.data;
          this.$store.dispatch("adminUser/showAdminUserForm", {
            edit: true,
            formData: {
              ...adminUserInfo,
              is_work:adminUserInfo.is_work?true:false,
              imgList:JSON.parse(adminUserInfo.imgList), 
              category_list:adminUserInfo.category_list
            },
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info"),
          });
        });
    },
    deleteUser(index, rows) {
      this.$confirm(
        this.$t("adminUser.scr_del_ask"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning",
        }
      )
        .then(() => {
          return deleteAdminUser({
            ids: rows[index]._id,
          });
        })
        .then((result) => {
          if (result.status === 200) {
            this.$store.dispatch("adminUser/getAdminUserList");
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success",
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info"),
          });
        });
    },
  },
};
</script>