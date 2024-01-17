<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
      </div>
      <div class="col-12 xl:col-6"
           style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4"
             style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">操作员管理</div>
            <span class="text-600 font-large">请添加</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">姓名</label>
            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Name"
                       style="padding:1rem;" />

            <label for="account" class="block text-900 text-xl font-medium mb-2">用户账号</label>
            <InputText id="account" v-model="number" type="text" class="w-full mb-3" placeholder="Account"
                       style="padding:1rem;" />

            <label for="selectType" class="block text-900 text-xl font-medium mb-2">请选择类型</label>
            <select id="selectType" v-model="selectedTypeRole" class="w-full mb-3" style="padding:1rem;">
              <option value="0" selected="selected">Please select your identity</option>
              <option value="1">1-超级管理员</option>
              <option value="4">4-牧场管理员</option>
              <option value="5">5-屠宰场管理员</option>
              <option value="6">6-包装厂管理员</option>
              <option value="7">7-运输厂管理员</option>
              <option value="8">8-商家管理员</option>
            </select>

            <label for="selectType" class="block text-900 text-xl font-medium mb-2">请选择角色</label>
            <select id="selectType" v-model="selectedFirstType" class="w-full mb-3" style="padding:1rem;" @change="onFirstTypeChange">
              <option value="0" selected="selected">Please select your identity</option>
              <option value="admin">admin</option>
              <option value="pastureoperator">pastureoperator</option>
              <option value="slaughteroperator">slaughteroperator</option>
              <option value="packoperator">packoperator</option>
              <option value="transportoperator">transportoperator</option>
              <option value="buyeroperator">buyeroperator</option>
            </select>

<!--            <label v-if="lan == 'CN'" for="userType" class="mr-2">角色</label>-->
<!--            <label v-else for="userType" class="mr-2">role</label>-->
<!--            <Dropdown v-if="lan == 'CN'" id="userType" v-model="selectedFirstRole" :options="items" optionLabel="name"-->
<!--                      class="custom-dropdown" placeholder="-&#45;&#45;&#45;&#45;请选择角色-&#45;&#45;&#45;&#45;" @change="onFirstTypeChange"/>-->
<!--            <Dropdown v-else id="userType" v-model="selectedFirstType" :options="itemsEn" optionLabel="name"-->
<!--                      class="custom-dropdown" placeholder="-&#45;&#45;&#45;&#45;Please Choose-&#45;&#45;&#45;&#45;"/>-->

            <label v-if="lan == 'CN'" for="company" class="mr-2">公司</label>
            <label v-else for="company" class="mr-2">Company</label>
            <Dropdown v-if="lan == 'CN'" id="company" v-model="selectedSecondType" :options="secondItems" optionLabel="name"
                      class="custom-dropdown" placeholder="-----请选择-----"/>
            <Dropdown v-else id="company" v-model="selectedSecondType" :options="itemsCompanyEn" optionLabel="name"
                      class="custom-dropdown" placeholder="-----Please Choose-----"/>
            <label for="phone" class="block text-900 text-xl font-medium mb-2">员工电话号码</label>
            <InputText id="phone" v-model="phone" type="text" class="w-full mb-3" placeholder="Phone Number"
                       style="padding:1rem;" />
            <div class="flex align-items-center justify-content-between mb-5">
              <!-- <div class="flex align-items-center">
                  <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                  <label for="rememberme1">记住账号</label>
              </div> -->
            </div>
            <div>
              <Button label="添加" class="w-full p-3 text-xl" @click="submit"></button>
<!--              <router-link to="/administration">-->
<!--              </router-link>-->
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs'
// import EventBus from '../AppEventBus';
// import router from '../router'
//import qs from 'qs';
export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      email: '',
      password: '',
      number:'',
      type:'',
      phone:'',
      checked: false,
      selectedFirstRole:null,
      selectedFirstType: null, // 角色
      selectedTypeRole: '',
      selectedDetail: '', // 第二个下拉列表的选中值
      secondItems: [],
      selectedSecondType: null,
      items: [
        {name: 'admin', value : '1'},
        {name: 'pastureoperator', value : '4'},
        {name: 'slaughteroperator', value : '5'},
        {name: 'packoperator', value : '6'},
        {name: 'transportoperator', value : '7'},
        {name: 'buyeroperator', value : '8'},
      ],
    }
  },
  computed: {
    logoColor() {
      if (this.$appState.darkTheme) return 'white';
      return 'dark';
    },
  },
  methods:{
    async  onFirstTypeChange(){
      let endpoint = '';
      console.log(this.selectedFirstType)
      switch (this.selectedFirstType){
        case 'pastureoperator':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/pastures';
          break;
        case 'slaughteroperator':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/slaughterhouses'
          break;
        case 'packoperator':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/packagehouses'
          break;
        case 'transportoperator':
          endpoint = 'http://127.0.0.1:8080/fsims/admin/transportvehicles'
          break;
        default:
          endpoint = ''
      }
      console.log(endpoint)
      if(endpoint){
        try {
          console.log("到达axios")
          const response = await axios.get(endpoint);
          this.secondItems = response.data.data.houses;
        }catch (error){
          console.error("获取数据出错", error);
        }
      }else{
        this.secondItems = "中欧系统"
      }
    },
    submit(){
      console.log(localStorage.getItem('token'))
      const name = this.email
      console.log(name)
      const account = this.number
      console.log(account)
      const type = this.selectedTypeRole
      console.log(type)
      const role = this.selectedFirstType
      console.log(role)
      const company = this.selectedSecondType.name
      console.log(company)
      const house_number = this.selectedSecondType.house_number
      console.log(house_number)
      const phone = this.phone
      console.log(phone)
      // const token = localStorage.getItem('token')
      // console.log(token)
      axios.post('http://127.0.0.1:8080/fsims/admin/addoperator', qs.stringify({name, account, role, company, phone, type, house_number}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
        console.log(res.data)
        if (res.data.statusCode != 200) {
          this.$toast.add({ severity: 'error', summary: '添加失败' , life: 3000 });
          return;
        }
        // localStorage.setItem('token',res.data.data.token) //将token存储在浏览器当中
        var message = account + 'added!'
        this.$toast.add({severity:'success', summary:'添加成功', detail:message, life:3000})
        this.$router.push({name: 'administration'});
      })
      console.log(localStorage.getItem('token'))
    }
  }
}
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>