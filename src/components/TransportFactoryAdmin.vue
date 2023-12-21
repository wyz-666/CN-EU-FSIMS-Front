<template>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-公司管理系统-牧场</h2>
    </div>
  </div>
  <div class="card grid p-fluid larger-font">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作牧场" severity="success" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作屠宰场" severity="success" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作包装厂" severity="success" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作运输厂" severity="success" />
      </div>
    </div>
  </div>
  <div class="card grid p-fluid larger-font">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="pasturename" class="mr-2">牧场</label>
        <InputText id="pasturename" v-model="pasturename" placeholder="请输入牧场名"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="principal" class="mr-2">负责人</label>
        <InputText id="principal" v-model="principal" placeholder="请输入uuid"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="principal" class="mr-2">地址</label>
        <InputText id="principal" v-model="principal" placeholder="请输入uuid"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="搜索" icon="pi pi-search" class="p-button-outlined" @click="search" />
      </div>
    </div>
  </div>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-6">
      <div class="flex align-items-center mb-2">
        <Button label="新增合作牧场" icon="pi pi-plus" @click="addPasture"/>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="flex align-items-center mb-2">
        <Button label="刷新" icon="pi pi-refresh" @click="refresh"/>
      </div>
    </div>
  </div>
  <div class="card">
    <DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" :header="lan === 'CN' ? '牧场名称' : 'pasture name'"></Column>
      <Column field="legal_person" :header="lan === 'CN' ? '法人' : 'legal_person'"></Column>
      <Column field="address" :header="lan === 'CN' ? '地址' : 'address'"></Column>
      <Column field="house_number" :header="lan === 'CN' ? '编号' : 'house_number'"></Column>
    </DataTable>
  </div>
</template>

<script>
import EventBus from '../AppEventBus'
export default {

  data(){
    return{
      lan:this.$store.state.language,
      flag: true,
      layout: "grid",
      dataviewValue: null,
      value: null,
      products: [],
      selectedProduct: null,
    }
  },
  mounted() {
    this.languageChangeListener = () => {
      this.lan = this.$store.state.language;
      if(this.lan == 'CN') {
        this.flag = true
      }else {
        this.flag = false
      }
    };
    EventBus.on('language-change', this.languageChangeListener);
  },
  methods: {
    refresh() {
      window.location.reload()
    },
    search(event) {
      // 事件对象包含用户输入的查询字符串
      this.filteredItems = this.items.filter(item => {
        return item.name.toLowerCase().includes(event.query.toLowerCase());
      });
    },
    searchCompany(event) {
      // 事件对象包含用户输入的查询字符串
      this.filteredItemsCompany = this.itemsCompany.filter(item => {
        return item.name.toLowerCase().includes(event.query.toLowerCase());
      });
    },
  },
}

</script>
<style scoped lang="scss">
.block_height_font {
  text-align: center;
  font-weight: 500;
  font-size: x-large;
}

.block_height_number {
  text-align: center;
  font-size: x-large;
  font-weight: 500;
}

.peer_title {
  font-weight: bold;
  text-align: center;
  font-size: large;
}

.peer_number {
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
}

.custom-dropdown{
  width: 400px;
}
.title {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}

.larger-font {
  font-size: 1.2em; /* 或者你可以使用具体的像素值，如 16px */
}
</style>