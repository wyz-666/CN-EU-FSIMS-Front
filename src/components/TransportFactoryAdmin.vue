<template>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-公司管理系统-运输公司</h2>
    </div>
  </div>
  <div class="card grid p-fluid larger-font">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作牧场" severity="success" @click="toPastureAdmin"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作屠宰场" severity="success" @click="toSlaughterAdmin"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作包装厂" severity="success" @click="toPacketAdmin"/>
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
        <label for="license_number" class="mr-2">驾照</label>
        <InputText id="license_number" v-model="license_number" placeholder="驾照"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="driver" class="mr-2">司机</label>
        <InputText id="driver" v-model="driver" placeholder="请输入司机"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="driver_phone" class="mr-2">司机电话号码</label>
        <InputText id="driver_phone" v-model="driver_phone" placeholder="请输入司机电话号码"></InputText>
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
        <Button label="新增司机" icon="pi pi-plus" @click="addDriver"/>
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
      <Column field="tv_number" :header="lan === 'CN' ? '运输工具编号' : 'tv number'"></Column>
      <Column field="license_number" :header="lan === 'CN' ? '驾照编号' : 'license_number'"></Column>
      <Column field="driver" :header="lan === 'CN' ? '司机' : 'driver'"></Column>
      <Column field="driver_phone" :header="lan === 'CN' ? '司机电话号码' : 'driver_phone'"></Column>
    </DataTable>
  </div>
</template>

<script>
import EventBus from '../AppEventBus'
import axios from "axios";
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
      driver_phone: '',
      driver: '',
      license_number: '',
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

  created() {
    this.fetchTransportCompany()
  },

  methods: {
    search(){
      const license_number = this.license_number ? this.license_number : '';
      const driver = this.driver ? this.driver : '';
      const driver_phone = this.driver_phone ? this.driver_phone : '';
      const data = {
        license_number: license_number,
        driver : driver,
        driver_phone : driver_phone
      }
      console.log(data)
      axios.get('http://127.0.0.1:8000/fsims/admin/searchtv', {params:data}).then(
          response => {
            console.log(response.data);
            this.products = response.data.data.tvs;
          }
      ).catch(error => {
        console.error(error);
      })
    },
    addDriver() {
      this.$router.push({name:'addtransport'})
    },
    toPastureAdmin() {
      this.$router.push({name: 'companyAdmin'});
    },
    toSlaughterAdmin() {
      this.$router.push({name: 'slaughteradmin'});
    },
    toPacketAdmin() {
      this.$router.push({name: 'packetadmin'});
    },
    refresh() {
      window.location.reload()
    },

    fetchTransportCompany(){
      axios.get('http://127.0.0.1:8000/fsims/admin/searchtv').then(response => {
        console.log(response.data);
        this.products = response.data.data.tvs;
      }).catch(error => {
        console.error("获取用户数据时出错", error)
      })
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