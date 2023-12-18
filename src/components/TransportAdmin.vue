<template>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-公司管理系统-运输公司</h2>
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
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <label for="transport" class="mr-2">运输公司</label>
        <InputText id="transport" v-model="transport" placeholder="请输入运输公司名"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <label for="principal" class="mr-2">负责人</label>
        <InputText id="principal" v-model="principal" placeholder="请输入uuid"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <Button label="搜索" icon="pi pi-search" class="p-button-outlined" @click="search" />
      </div>
    </div>
  </div>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <Button label="新增运输公司" icon="pi pi-plus" @click="addTransport"/>
      </div>
    </div>
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <Button label="批量删除" icon="pi pi-trash" @click="batchDelete"/>
      </div>
    </div>
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <Button label="刷新" icon="pi pi-refresh" @click="refresh"/>
      </div>
    </div>
  </div>
  <div class="card">
    <DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="Username" :header="lan === 'CN' ? '包装厂名称' : 'slaughter name'"></Column>
      <Column field="Principal" :header="lan === 'CN' ? '负责人' : 'principal'"></Column>
      <Column field="PhoneNumber" :header="lan === 'CN' ? '电话号码' : 'phone number'"></Column>
      <Column field="Livestock" :header="lan === 'CN' ? '出货量' : 'Livestock'"></Column>
      <Column field="Operation" :header="lan === 'CN' ? '操作' : 'operation'">
        <template #body="slotProps" >
          <div class="grid p-fluid">
            <div class="col-12 xl:col-4">
              <Button v-if="lan == 'CN'" label="重置密码" @click="resetPassword(slotProps.data)" icon="pi pi-lock" class="p-button-text" />
              <Button v-else label="reset password" @click="resetPassword(slotProps.data)" icon="pi pi-lock" class="p-button-text" />
            </div>
          </div>
          <div class="grid p-fluid">
            <div class="col-12 xl:col-4">
              <Button v-if="lan == 'CN'" label="日志" @click="viewLog(slotProps.data)" icon="pi pi-search" class="p-button-text" />
              <Button v-else label="log" @click="viewLog(slotProps.data)" icon="pi pi-search" class="p-button-text" />
            </div>
          </div>
          <div class="grid p-fluid">
            <div class="col-12 xl:col-4">
              <Button v-if="lan == 'CN'" label="删除" @click="deleteProduct(slotProps.data)" icon="pi pi-trash" class="p-button-text" />
              <Button v-else label="delete" @click="deleteProduct(slotProps.data)" icon="pi pi-trash" class="p-button-text" />
            </div>
          </div>
        </template>
      </Column>
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
      itemsEn: [
        { name: 'admin' },
        { name: 'customer' },
        { name: 'operator' }
      ],
      items: [
        { name: '管理员' },
        { name: '客户' },
        { name: '操作员' }
      ],
      itemsCompany: [
        { name: '山农大' },
        { name: '科尔沁' },
        { name: '复旦大学' }
      ],
      itemsCompanyEn: [
        { name: 'ShanNong' },
        { name: 'Horqin' },
        { name: 'Fudan' }
      ],
      filteredItems: [], // 过滤后的建议项
      filteredItemsCompany: [],
      selectedProduct: null,
      metaKey: true,
      products: [
        {
          id: '1',
          Username:'科尔沁牧场',
          Principal:'唐龙',
          PhoneNumber:'13245612',
          Livestock:'2000'
        },
        {
          id: '2',
          Username:'科尔沁牧场',
          Principal:'唐龙',
          PhoneNumber:'13245612',
          Livestock:'2000'
        },
        {
          id: '3',
          Username:'科尔沁牧场',
          Principal:'唐龙',
          PhoneNumber:'13245612',
          Livestock:'2000'
        },
        {
          id: '4',
          Username:'科尔沁牧场',
          Principal:'唐龙',
          PhoneNumber:'13245612',
          Livestock:'2000'
        },
        {
          id: '5',
          Username:'科尔沁牧场',
          Principal:'唐龙',
          PhoneNumber:'13245612',
          Livestock:'2000'
        },
      ]
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