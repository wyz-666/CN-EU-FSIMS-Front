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
            <div class="text-900 text-3xl font-medium mb-3">牧场废水指标</div>
            <span class="text-600 font-large"></span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="housenumber" class="block text-900 text-xl font-medium mb-2">牧场编号</label>
            <InputText id="housenumber" v-model="housenumber" type="text" class="w-full mb-3" placeholder="Pasture House Number"
                       style="padding:1rem;" />

            <label for="temperature" class="block text-900 text-xl font-medium mb-2">五日生化需氧量</label>
            <InputText id="temperature" v-model="bod" type="text" class="w-full mb-3" placeholder="BOD"
                       style="padding:1rem;" />

            <label for="humidity" class="block text-900 text-xl font-medium mb-2">化学需氧量</label>
            <InputText id="humidity" v-model="cod" type="text" class="w-full mb-3" placeholder="COD"
                       style="padding:1rem;" />

            <label for="wind" class="block text-900 text-xl font-medium mb-2">氨氮</label>
            <InputText id="wind" v-model="nh3" type="text" class="w-full mb-3" placeholder="NH3-N"
                       style="padding:1rem;" />

            <label for="Illuminance" class="block text-900 text-xl font-medium mb-2">总磷</label>
            <InputText id="Illuminance" v-model="tp" type="text" class="w-full mb-3" placeholder="TP"
                       style="padding:1rem;" />

            <label for="noise" class="block text-900 text-xl font-medium mb-2">悬浮物</label>
            <InputText id="noise" v-model="tss" type="text" class="w-full mb-3" placeholder="TSS"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">粪大肠菌群个数</label>
            <InputText id="illumination time" v-model="fcc" type="text" class="w-full mb-3" placeholder="FCC"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">蛔虫卵个数</label>
            <InputText id="illumination time" v-model="eggs" type="text" class="w-full mb-3" placeholder="Number of roundworm eggs"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">PH值</label>
            <InputText id="illumination time" v-model="ph" type="text" class="w-full mb-3" placeholder="Value of PH"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">流量</label>
            <InputText id="illumination time" v-model="flow" type="text" class="w-full mb-3" placeholder="Quantity of flow"
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
      bod:'',
      cod:'',
      nh3:'',
      tp:'',
      tss:'',
      fcc:'',
      egg:'',
      ph:'',
      flow:''
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