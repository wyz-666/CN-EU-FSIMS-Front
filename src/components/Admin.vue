<template>
  <div class="grid p-fluid">
    <div class="col-12 xl:col-2">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="username" class="mr-2">姓名</label>
        <label v-else for="username" class="mr-2">Name</label>
        <InputText  v-if="lan == 'CN'" id="username" v-model="username" placeholder="请输入用户名" />
        <InputText  v-else id="username" v-model="username" placeholder="please input username" />
      </div>
    </div>
    <div class="col-12 xl:col-2">
      <div class="flex align-items-center mb-2">
        <label for="uuid" class="mr-2">UUID</label>
        <InputText v-if="lan == 'CN'" id="uuid" v-model="uuid" placeholder="请输入 uuid" />
        <InputText v-else id="uuid" v-model="uuid" placeholder="please input uuid" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="userType" class="mr-2">角色</label>
        <label v-else for="userType" class="mr-2">role</label>
        <Dropdown v-if="lan == 'CN'" id="userType" v-model="selectedType" :options="items" optionLabel="name" class="custom-dropdown" placeholder="-----请选择-----" />
        <Dropdown v-else id="userType" v-model="selectedType" :options="itemsEn" optionLabel="name" class="custom-dropdown" placeholder="-----Please Choose-----" />
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="company" class="mr-2">公司</label>
        <label v-else for="company" class="mr-2">Company</label>
        <Dropdown v-if="lan == 'CN'" id="company" v-model="selectedType" :options="itemsCompany" optionLabel="name" class="custom-dropdown" placeholder="-----请选择-----" />
        <Dropdown v-else id="company" v-model="selectedType" :options="itemsCompanyEn" optionLabel="name" class="custom-dropdown" placeholder="-----Please Choose-----" />
      </div>
    </div>
    <div class="col-12 xl:col-2">
      <Button v-if="lan == 'CN'" label="搜索" icon="pi pi-search" class="p-button-outlined" @click="search" />
      <Button v-else label="SEARCH" icon="pi pi-search" class="p-button-outlined" @click="search" />
    </div>
  </div>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-4">
      <Button v-if="lan == 'CN'" label="新增用户" icon="pi pi-plus" @click="addUser" />
      <Button v-else label="addUser" icon="pi pi-plus" @click="addUser" />
    </div>
    <div class="col-12 xl:col-4">
      <Button v-if="lan == 'CN'" label="批量删除" icon="pi pi-trash"  @click="batchDelete" />
      <Button v-else label="delete in batches" icon="pi pi-trash"  @click="batchDelete" />
    </div>
    <div class="col-12 xl:col-4">
      <Button v-if="lan == 'CN'" label="刷新" icon="pi pi-refresh"  @click="refresh" />
      <Button v-else label="refresh" icon="pi pi-refresh"  @click="refresh" />
    </div>
  </div>
  <div class="card">
    <DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="UUID" header="UUID"></Column>
      <Column field="Username" :header="lan === 'CN' ? '用户名' : 'username'"></Column>
      <Column field="Role" :header="lan === 'CN' ? '角色' : 'role'"></Column>
      <Column field="Company" :header="lan === 'CN' ? '公司' : 'company'"></Column>
      <Column field="PhoneNumber" :header="lan === 'CN' ? '电话号码' : 'phone number'"></Column>
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
          UUID:'FSIMS001',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '2',
          UUID:'FSIMS002',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '3',
          UUID:'FSIMS003',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '4',
          UUID:'FSIMS004',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '5',
          UUID:'FSIMS005',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '6',
          UUID:'FSIMS006',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '7',
          UUID:'FSIMS007',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '8',
          UUID:'FSIMS008',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '9',
          UUID:'FSIMS009',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '10',
          UUID:'FSIMS010',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '11',
          UUID:'FSIMS011',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '12',
          UUID:'FSIMS012',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '13',
          UUID:'FSIMS013',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '14',
          UUID:'FSIMS014',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '15',
          UUID:'FSIMS015',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
        },
        {
          id: '16',
          UUID:'FSIMS016',
          Username:'Along',
          Role:'Admin',
          Company:'复旦',
          PhoneNumber:'13245612',
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
</style>