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
            <div class="text-900 text-3xl font-medium mb-3">运输工具管理</div>
            <span class="text-600 font-large">请添加</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="license_number" class="block text-900 text-xl font-medium mb-2">驾照</label>
            <InputText id="license_number" v-model="license_number" type="text" class="w-full mb-3" placeholder="license_number"
                       style="padding:1rem;" />

            <label for="driver" class="block text-900 text-xl font-medium mb-2">司机</label>
            <InputText id="driver" v-model="driver" type="text" class="w-full mb-3" placeholder="driver"
                       style="padding:1rem;" />

            <label for="driver_phone" class="block text-900 text-xl font-medium mb-2">司机电话号码</label>
            <InputText id="driver_phone" v-model="driver_phone" type="text" class="w-full mb-3" placeholder="driver_phone"
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
      driver_phone: '',
      license_number: '',
      driver: ''
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
      const driver = this.driver;
      const license_number = this.license_number;
      const driver_phone = this.driver_phone;
      axios.post('http://127.0.0.1:8080/fsims/admin/addtransportvehicle', qs.stringify({driver, license_number, driver_phone}),{
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
        this.$router.push({name: 'transportadmin'});
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