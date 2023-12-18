<template>
  <div class="grid p-fluid">
    <div class="col-12 xl:col-4">
      <h3>中欧-冷链司机管理</h3>
    </div>
  </div>
  <div class="card grid p-fluid larger-font">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="username" class="mr-2">姓名</label>
        <InputText id="username" v-model="username" placeholder="请输入姓名"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="UUID" class="mr-2">UUID</label>
        <InputText id="UUID" v-model="uuid" placeholder="请输入uuid"></InputText>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label for="apartment" class="mr-2">公司</label>
        <Dropdown id="apartment" v-model="selectedType" :options="itemsApart" optionLabel="name" class="custom-dropdown" placeholder="-----请选择-----"></Dropdown>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <Button label="搜索" icon="pi pi-search" class="p-button-outlined" @click="search" />
      </div>
    </div>
  </div>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-4">
      <div class="flex align-items-center mb-2">
        <Button label="新增司机" icon="pi pi-plus" @click="addDriver"/>
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
      <Column field="UUID" header="UUID"></Column>
      <Column field="Username" :header="lan === 'CN' ? '姓名' : 'username'"></Column>
      <Column field="PhoneNumber" :header="lan === 'CN' ? '电话号码' : 'phone number'"></Column>
      <Column field="Apartment" :header="lan === 'CN' ? '部门' : 'apartment'"></Column>
      <Column field="LicenseNumber" :header="lan === 'CN' ? '车牌号' : 'license number'"></Column>
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
      itemsApart: [
        { name: '屠宰场A' },
        { name: '屠宰场B' },
        { name: '屠宰场C' }
      ],
      selectedProduct: null,
      products:[
        {
          id: '1',
          UUID:'FSIMS001',
          Username:'Along',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁D-12345",
        },
        {
          id: '2',
          UUID:'FSIMS002',
          Username:'Wlong',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁A-12345",
        },
        {
          id: '3',
          UUID:'FSIMS003',
          Username:'Xlong',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁B-12345",
        },
        {
          id: '4',
          UUID:'FSIMS004',
          Username:'Ylong',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁C-11345",
        },
        {
          id: '5',
          UUID:'FSIMS001',
          Username:'Zlong',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁D-11345",
        },
        {
          id: '6',
          UUID:'FSIMS021',
          Username:'Along',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁E-11345",
        },
        {
          id: '7',
          UUID:'FSIMS101',
          Username:'Along',
          PhoneNumber:'13245612',
          Apartment:'运输厂A',
          LicenseNumber:"鲁C-11345",
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
  methods:{
    addDriver(){
      this.$router.push({ name: 'addDriver' });
    }
  }
}
</script>
<style>
.custom-dropdown{
  width: 500px;
}

.larger-font {
  font-size: 1.2em; /* 或者你可以使用具体的像素值，如 16px */
}
</style>
