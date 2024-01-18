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
            <div class="text-900 text-3xl font-medium mb-3">牧场管理</div>
            <span class="text-600 font-large">请添加</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">牧场名</label>
            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Name"
                       style="padding:1rem;" />

            <label for="account" class="block text-900 text-xl font-medium mb-2">地址</label>
            <InputText id="account" v-model="address" type="text" class="w-full mb-3" placeholder="Pasture Address"
                       style="padding:1rem;" />

            <label for="account" class="block text-900 text-xl font-medium mb-2">状态</label>
            <InputText id="account" v-model="state" type="text" class="w-full mb-3" placeholder="State"
                       style="padding:1rem;" />

            <label for="account" class="block text-900 text-xl font-medium mb-2">法人</label>
            <InputText id="account" v-model="legalperson" type="text" class="w-full mb-3" placeholder="legalperson"
                       style="padding:1rem;" />
            <div>
              <Button label="添加" class="w-full p-3 text-xl" @click="submit"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';
// import EventBus from '../AppEventBus';
// import router from '../router'

export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      email: '',
      password: '',
      address: '',
      number:'',
      type:'',
      phone:'',
      state:'',
      legalperson:''
    }
  },
  computed: {
    logoColor() {
      if (this.$appState.darkTheme) return 'white';
      return 'dark';
    },
  },
  methods:{
    submit(){
     const name = this.email;
     const address = this.address;
     const state = this.state;
     const legal_person = this.legalperson;
     axios.post('http://127.0.0.1:8080/fsims/admin/addpasture', qs.stringify({name, address, state, legal_person}),{
      headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
     }).then(res => {
        if (res.data.statusCode != 200) {
          this.$toast.add({ severity: 'error', summary: '添加失败' , life: 3000 });
          //不执行剩余内容
          return;
        }
        var message = name + 'added!';
        this.$toast.add({severity:'success', summary:'添加成功', detail:message, life:3000})
        this.$router.push({name: 'companyAdmin'});
      })
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