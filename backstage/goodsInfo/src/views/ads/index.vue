<template>
  <div :class="classObj" class="ads">
    <div class="main-container">
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="ads"></TopBar>
          <DataTable :dataList="list.docs"></DataTable>
          <Pagination :device="device" :pageInfo="list.pageInfo" pageType="ads"></Pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import InfoForm from "./infoForm";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  name: "index",
  data() {
    return {
      sidebarOpened: true,
      device: "desktop"
    };
  },
  components: {
    DataTable,
    TopBar,
    InfoForm,
    Pagination
  },
  methods: mapActions([]),
  computed: {
    ...mapGetters(["list"]),
    formState() {
      return this.$store.getters.infoForm;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebarOpened,
        openSidebar: this.sidebarOpened,
        withoutAnimation: "false",
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    initEvent(this);
    this.$store.dispatch("goodsInfo/getList");
  }
};
</script>

<style lang="">
</style>