<template>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-12 title">
      <h2>中欧-用户管理系统</h2>
    </div>
  </div>
  <div class="grid p-fluid">
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="username" class="mr-2">姓名</label>
        <label v-else for="username" class="mr-2">Name</label>
        <InputText v-if="lan == 'CN'" id="username" v-model="username" placeholder="请输入用户名"/>
        <InputText v-else id="username" v-model="username" placeholder="please input username"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="userType" class="mr-2">角色</label>
        <label v-else for="userType" class="mr-2">role</label>
        <Dropdown v-if="lan == 'CN'" id="userType" v-model="selectedFirstType" :options="items" optionLabel="name"
                  class="custom-dropdown" placeholder="-----请选择角色-----" @change="onFirstTypeChange"/>
        <Dropdown v-else id="userType" v-model="selectedFirstType" :options="itemsEn" optionLabel="name"
                  class="custom-dropdown" placeholder="-----Please Choose-----"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <div class="flex align-items-center mb-2">
        <label v-if="lan == 'CN'" for="company" class="mr-2">公司</label>
        <label v-else for="company" class="mr-2">Company</label>
        <Dropdown v-if="lan == 'CN'" id="company" v-model="selectedSecondType" :options="secondItems" optionLabel="name"
                  class="custom-dropdown" placeholder="-----请选择-----"/>
        <Dropdown v-else id="company" v-model="selectedSecondType" :options="itemsCompanyEn" optionLabel="name"
                  class="custom-dropdown" placeholder="-----Please Choose-----"/>
      </div>
    </div>
    <div class="col-12 xl:col-3">
      <Button v-if="lan == 'CN'" label="搜索" icon="pi pi-search" class="p-button-outlined" @click="search(selectedFirstType.name, selectedSecondType)"/>
      <Button v-else label="SEARCH" icon="pi pi-search" class="p-button-outlined" @click="search()"/>
    </div>
  </div>
  <div class="card grid p-fluid">
    <div class="col-12 xl:col-3">
      <Button v-if="lan == 'CN'" label="新增管理员" icon="pi pi-plus" @click="addUser"/>
      <Button v-else label="addUser" icon="pi pi-plus" @click="addUser"/>
    </div>
    <div class="col-12 xl:col-3">
      <Button v-if="lan == 'CN'" label="批量删除" icon="pi pi-trash" @click="batchDelete"/>
      <Button v-else label="delete in batches" icon="pi pi-trash" @click="batchDelete"/>
    </div>
    <div class="col-12 xl:col-3">
      <Button v-if="lan == 'CN'" label="刷新" icon="pi pi-refresh" @click="fresh"/>
      <Button v-else label="refresh" icon="pi pi-refresh" @click="refresh"/>
    </div>
    <div class="col-12 xl:col-3">
      <Toast position="top-center"/>
      <Button v-if="lan == 'CN'" label="查看日志" @click="viewLogs" icon="pi pi-search"
              />
      <Button v-else label="log" @click="viewLogs" icon="pi pi-search" />
    </div>
  </div>
  <div class="card">
    <DataTable v-model:selection="selectedProduct" :value="products" dataKey="uuid" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="uuid" header="UUID"></Column>
      <Column field="name" :header="lan === 'CN' ? '用户名' : 'username'"></Column>
      <Column field="role" :header="lan === 'CN' ? '角色' : 'role'"></Column>
      <Column field="type" :header="lan === 'CN' ? '类型' : 'type'"></Column>
      <Column field="account" :header="lan === 'CN' ? '账号' : 'account'"></Column>
      <Column field="company" :header="lan === 'CN' ? '公司' : 'company'"></Column>
      <Column field="phone" :header="lan === 'CN' ? '电话号码' : 'phone number'"></Column>
      <Column field="Operation" :header="lan === 'CN' ? '操作' : 'operation'">
        <template #body="slotProps">
          <div class="grid p-fluid">
            <div class="col-12 xl:col-6">
              <Toast position="top-center"/>
              <Button v-if="lan == 'CN'" label="重置密码" @click="resetPassword(slotProps.data)" icon="pi pi-lock"
                      class="p-button-text"/>
              <Button v-else label="reset password" @click="resetPassword(slotProps.data)" icon="pi pi-lock"
                      class="p-button-text"/>
            </div>
            <div class="col-12 xl:col-6">
              <Toast position="top-center"/>
              <Button v-if="lan == 'CN'" label="删除" @click="deleteUser(slotProps.data)" icon="pi pi-trash"
                      class="p-button-text"/>
              <Button v-else label="delete" @click="deleteUser(slotProps.data)" icon="pi pi-trash"
                      class="p-button-text"/>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import EventBus from '../AppEventBus'
import axios from "axios";
// import {onBeforeRouteLeave} from "vue-router";
// import {callback} from "chart.js/helpers";
//import router from '../router'
export default {

  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      dataviewValue: null,
      value: null,
      username: '',
      selectedFirstType: '',
      selectedSecondType: '',
      secondItems:[],
      itemsEn: [
        {name: 'admin'},
        {name: 'customer'},
        {name: 'operator'}
      ],
      items: [
        {name: '未知', value: ''},
        {name: 'admin', value : '1'},
        {name: 'customer' , value : '2'},
        {name: 'pastureoperator', value : '4'},
        {name: 'slaughteroperator', value : '5'},
        {name: 'packoperator', value : '6'},
        {name: 'transportoperator', value : '7'},
      ],
      itemsCompany: [
        {name: '中欧系统'},
        {name: '科尔沁牧场'},
        {name: '屠宰场2'},
        {name: '包装厂1'},
        {name: '包装厂2'},
        {name: '运输厂1'},
        {name: '运输场2'},
        {name: '盒马生鲜'},
        {name: '山姆超市'},
      ],
      itemsCompanyEn: [
        {name: 'ShanNong'},
        {name: 'Horqin'},
        {name: 'Fudan'}
      ],
      filteredItems: [], // 过滤后的建议项
      filteredItemsCompany: [],
      selectedProduct: null,
      metaKey: true,
      products: []
    }
  },

  created() {
    this.fetchUsers()
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
  },

  methods: {
    async onFirstTypeChange(){
      let endpoint = '';
      switch (this.selectedFirstType.value){
        case '4':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/pastures';
          break;
        case '5':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/slaughterhouses'
          break;
        case '6':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/packagehouses'
          break;
        case '7':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/transportvehicles'
          break;
        default:
          endpoint = ''
      }
      if(endpoint){
        try {
          const response = await axios.get(endpoint);
          this.secondItems = response.data.data.houses;
        } catch (error){
          console.error("获取数据出错", error)
        }
      }
    },
    fetchUsers() {
      axios.get('http://127.0.0.1:8080/fsims/admin/allusers').then(response => {
        this.products = response.data.data.users;
      }).catch(error => {
        console.error("获取用户数据时出错", error)
      })
    },
    search(Role, House) {
      console.log('进入搜索')
      const name = this.username
      console.log('姓名')
      const role = Role ? Role : '';
      const company = House && House.name ? House.name : '';
      const house_number = House && House.house_number ? House.house_number : '';
      const data = {
        name: name,
        role: role,
        company: company,
        house_number: house_number
      }
      console.log(data)
      console.log(111111111111)
      axios.get('http://127.0.0.1:8080/fsims/admin/searchusers', {params:data}).then(
          response => {
            //处响应数据
            console.log(response.data);
            this.products = response.data.data.users;
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
    viewLogs(){
      this.$router.push({name: 'viewlogs'});
    },
    addUser() {
      this.$router.push({name: 'addUser'});
    },
    resetPassword(rowdata) {
      const type = rowdata.type
      const account = rowdata.account
      axios.post('http://127.0.0.1:8080/fsims/admin/reset', {type, account}).then(
          response => {
            if (response.data.statusCode === 200) {
              this.$toast.add({severity: 'success', summary: '成功', detail: '密码重置成功！', life: 3000});
            } else {
              this.$toast.add({severity: 'error', summary: '失败', detail: '密码重置失败。', life: 3000});
            }
            console.log('完整响应:', response); // 打印整个响应对象
          }
      ).catch(error => {
        console.error("获取用户数据时出错", error)
      })
    },
    fresh() {
      window.location.reload()
    },
    deleteUser(rowdata) {
      const type = rowdata.type
      const account = rowdata.account
      axios.post('http://127.0.0.1:8080/fsims/admin/deleteuser', {type, account}).then(
          response => {
            if (response.data.statusCode === 200) {
              this.$toast.add({severity: 'success', summary: '删除成功', detail: '用户删除成功！', life: 3000});
            } else {
              this.$toast.add({severity: 'error', summary: '失败', detail: '用户删除失败！', life: 3000});
            }
            console.log('完整响应:', response); // 打印整个响应对象
          }
      ).catch(error => {
        console.error("获取用户数据时出错", error)
      })
      var products_local = this.products;
      products_local.forEach(item => {
        if(item.account===account && item.type === type){
          var index = products_local.indexOf(item);
          products_local.splice(index, 1)
        }
      })
      this.products = products_local;
      console.log(products_local);
    }
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

.custom-dropdown {
  width: 400px;
}

.title {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}
</style>