<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="renderContent"
  ></el-tree>
</template>

<script>
import {
  deleteGoodsCategory,
  getOneGoodsCategory
} from "@/api/goodsCategory";

import _ from "lodash";
export default {
  props: {
    treeData: Array
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },

  methods: {
    append(store, data) {
      let formData = {};
      formData.parentId = data._id;
      formData.parentObj = data;
      this.$store.dispatch("goodsCategory/showGoodsCategoryForm", {
        edit: false,
        type: "children",
        formData: formData
      });
    },

    edit(store, data) {
      let rowData = data;
      getOneGoodsCategory({ id: rowData._id })
        .then(result => {
          if (result.status === 200) {
            let categoryInfo = result.data;
            if (!_.isEmpty(categoryInfo)) {
              this.$store.dispatch("goodsCategory/showGoodsCategoryForm", {
                edit: true,
                type: "children",
                formData: _.assign({}, categoryInfo, {
                  contentTemp: !_.isEmpty(categoryInfo.contentTemp)
                    ? categoryInfo.contentTemp._id
                    : ""
                })
              });
            }
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },

    remove(store, data) {
      this.$confirm("您确认要删除该类别吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return deleteGoodsCategory({
            ids: data._id
          });
        })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch("goodsCategory/getGoodsCategoryList");
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success"
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: right; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span style="float: left; margin-left: 20px">
            <el-button type="text" on-click={() => this.append(store, data)}>
              <svg-icon icon-class="icon_add" />
            </el-button>
            <el-button type="text" on-click={() => this.edit(store, data)}>
              <svg-icon icon-class="edit" />
            </el-button>
            <el-button type="text" on-click={() => this.remove(store, data)}>
              <svg-icon icon-class="icon_delete" />
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>