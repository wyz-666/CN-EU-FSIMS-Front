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
            <div class="text-900 text-3xl font-medium mb-3">牧场基本环境数据</div>
            <span class="text-600 font-large"></span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="housenumber" class="block text-900 text-xl font-medium mb-2">牧场编号</label>
            <InputText id="housenumber" v-model="housenumber" type="text" class="w-full mb-3" placeholder="Pasture House Number"
                       style="padding:1rem;" />

            <label for="temperature" class="block text-900 text-xl font-medium mb-2">温度</label>
            <InputText id="temperature" v-model="temperature" type="text" class="w-full mb-3" placeholder="Pasture Temperature"
                       style="padding:1rem;" />

            <label for="humidity" class="block text-900 text-xl font-medium mb-2">相对湿度</label>
            <InputText id="humidity" v-model="humidity" type="text" class="w-full mb-3" placeholder="Relative Humidity"
                       style="padding:1rem;" />

            <label for="wind" class="block text-900 text-xl font-medium mb-2">风速</label>
            <InputText id="wind" v-model="wind" type="text" class="w-full mb-3" placeholder="Speed Of Wind"
                       style="padding:1rem;" />

            <label for="Illuminance" class="block text-900 text-xl font-medium mb-2">照度</label>
            <InputText id="Illuminance" v-model="illuminance" type="text" class="w-full mb-3" placeholder="Illuminance"
                       style="padding:1rem;" />

            <label for="noise" class="block text-900 text-xl font-medium mb-2">噪声</label>
            <InputText id="noise" v-model="noise" type="text" class="w-full mb-3" placeholder="Noise"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">光照时间</label>
            <InputText id="illumination time" v-model="illtime" type="text" class="w-full mb-3" placeholder="Illumination Time"
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
      housenumber:'',
      temperature:'',
      humidity:'',
      wind:'',
      illuminance:'',
      noise:'',
      illtime:'',
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
      const currentTimeStamp = new Date().getTime();
      const time_stamp = Math.floor(currentTimeStamp / 1000); //当前时间戳

      const house_number = this.housenumber;
      const environment_1 = this.temperature;
      const environment_2 = this.humidity;
      const environment_3 = this.wind;
      const environment_4 = this.illuminance;
      const environment_5 = this.noise;
      const environment_6 = this.illtime;

      axios.post('http://127.0.0.1:8000/fsims/pastureoperator/addpasturebasicenvironment', qs.stringify(time_stamp, house_number, environment_1, environment_2, environment_3, environment_4
          , environment_5, environment_6),{
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
        this.$router.push({name: 'pasturedataupload'});
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