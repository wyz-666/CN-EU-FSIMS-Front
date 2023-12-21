<template>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-公司管理系统-屠宰场</h2>
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
        <Button label="合作屠宰场" severity="success" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作包装厂" severity="success" @click="toPacketAdmin"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="合作运输厂" severity="success" @click="toTransportAdmin"/>
      </div>
    </div>
  </div>
  <div class="card grid p-fluid larger-font">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="slaughtername" class="mr-2">屠宰场</label>
        <InputText id="slaughtername" v-model="slaughtername" placeholder="请输入屠宰场名"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="legalperson" class="mr-2">负责人</label>
        <InputText id="legalperson" v-model="legalperson" placeholder="请输入uuid"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="address" class="mr-2">地址</label>
        <InputText id="address" v-model="address" placeholder="请输入地址"></InputText>
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
        <Button label="新增合作屠宰场" icon="pi pi-plus" @click="addSlaughter"/>
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
      <Column field="name" :header="lan === 'CN' ? '屠宰场名称' : 'slaughter name'"></Column>
      <Column field="legal_person" :header="lan === 'CN' ? '法人' : 'legal_person'"></Column>
      <Column field="address" :header="lan === 'CN' ? '地址' : 'address'"></Column>
      <Column field="house_number" :header="lan === 'CN' ? '编号' : 'house_number'"></Column>
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
      slaughtername: '',
      address: '',
      legalperson:'',
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
    this.fetchSlaughters()
  },
  methods: {
    addSlaughter(){
      this.$router.push({name: 'addSlaughter'});
    },
    toPastureAdmin(){
      this.$router.push({name:'companyAdmin'});
    },
    toPacketAdmin() {
      this.$router.push({name: 'packetadmin'});
    },
    toTransportAdmin() {
      this.$router.push({name: 'transportadmin'});
    },
    refresh() {
      window.location.reload()
    },
    fetchSlaughters() {
      axios.get('http://127.0.0.1:8080/fsims/admin/searchsla').then(response => {
        this.products = response.data.data.houses;
        console.log(this.products)
      }).catch(error => {
        console.error("获取用户数据时出错", error)
      })
    },
    search() {
      const name = this.slaughtername ? this.slaughtername : '';
      const legal_person = this.legalperson ? this.legalperson : '';
      const address = this.address ? this.address : '';
      const data = {
        name : name,
        legal_person : legal_person,
        address : address
      }
      console.log(data)
      axios.get('http://127.0.0.1:8080/fsims/admin/searchsla', {params:data}).then(
          response => {
            console.log(response.data);
            this.products = response.data.data.houses;
          }
      ).catch(error => {
        console.error(error);
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