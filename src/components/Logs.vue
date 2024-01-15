<template>
  <div class="card grid p-fluid title">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-管理员日志系统</h2>
    </div>
  </div>
  <DataTable v-model:selection="selectedProduct" :value="products" dataKey="uuid" tableStyle="min-width: 50rem">
<!--    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>-->
    <Column field="TimeStamp" header="time"></Column>
    <Column field="UUID" :header="lan === 'CN' ? 'UUID' : 'UUID'"></Column>
    <Column field="type" :header="lan === 'CN' ? '类型' : 'type'"></Column>
    <Column field="Action" :header="lan === 'CN' ? '操作' : 'action'"></Column>
  </DataTable>
</template>
<script>
import axios from "axios";
import EventBus from '../AppEventBus'
export default {
  data() {
    return{
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      selectedProduct: null,
      products: []
    }
  },
  created() {
    this.fetchlogs();
  },
  methods: {
    fetchlogs() {
      axios.get('http://127.0.0.1:8000/fsims/admin/viewlog').then(response => {
        this.products = response.data.data.logs;
      }).catch(error => {
        console.error("获取用户数据时出错", error)
      })
    }
  },
  mounted() {
    this.languageChangeListener = () => {
      this.lan = this.$store.state.language;
      if (this.lan == 'CN') {
        this.flag = true
      } else {
        this.flag = false
      }
    };
    EventBus.on('language-change', this.languageChangeListener);
  }
}
</script>
<style>
.title {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}
</style>