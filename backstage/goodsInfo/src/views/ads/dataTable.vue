<template>
  <div>
    <el-table
      align="center"
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      
      <el-table-column prop="categoryId" label="分类" width="400"></el-table-column>
     
      
      <el-table-column prop="goodsList" label="产品" ></el-table-column>
  
    </el-table>
  </div>
</template>

<script>
import { delAds } from "@/api/goodsInfo";
import clipboard from "@/directive/clipboard/index.js";

export default {
  props: {
    dataList: Array
  },
  data() {
    return {
      green: { color: "#13CE66" },
      red: { color: "#FF4949" }
      // inputData: "hello"
    };
  },
  directives: {
    clipboard
  },
  methods: {
    inputData(index, rows) {
      let targetRow = rows[index];
      let adsStr = `
      {% ads name="${targetRow.name}" %}
      {{adsPannel.slider(${targetRow.name})}}
      `;
      return adsStr;
    },
    clipboardSuccess() {
      this.$message({
        message: "复制成功",
        type: "success",
        duration: 1500
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editAdsInfo(index, rows) {
      let rowData = rows[index];
      this.$store.dispatch("ads/adsInfoForm", {
        edit: true,
        formData: rowData
      });
      this.$router.push(
        this.$root.adminBasePath + "/ads/editAds/" + rowData._id
      );
    },
    deleteAds(index, rows) {
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          return delAds({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch("ads/getAdsList");
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
    }
  }
};
</script>