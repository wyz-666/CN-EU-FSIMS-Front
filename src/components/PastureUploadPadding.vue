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
            <div class="text-900 text-3xl font-medium mb-3">牧场垫料数据</div>
            <span class="text-600 font-large"></span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="housenumber" class="block text-900 text-xl font-medium mb-2">牧场编号</label>
            <InputText id="housenumber" v-model="housenumber" type="text" class="w-full mb-3" placeholder="Pasture House Number"
                       style="padding:1rem;" />

            <label for="temperature" class="block text-900 text-xl font-medium mb-2">汞</label>
            <InputText id="temperature" v-model="hg" type="text" class="w-full mb-3" placeholder="Hg"
                       style="padding:1rem;" />

            <label for="humidity" class="block text-900 text-xl font-medium mb-2">铅</label>
            <InputText id="humidity" v-model="pb" type="text" class="w-full mb-3" placeholder="Pb"
                       style="padding:1rem;" />

            <label for="wind" class="block text-900 text-xl font-medium mb-2">铬</label>
            <InputText id="wind" v-model="cr" type="text" class="w-full mb-3" placeholder="Cr"
                       style="padding:1rem;" />

            <label for="Illuminance" class="block text-900 text-xl font-medium mb-2">镉</label>
            <InputText id="Illuminance" v-model="cd" type="text" class="w-full mb-3" placeholder="Cd"
                       style="padding:1rem;" />

            <label for="noise" class="block text-900 text-xl font-medium mb-2">总大肠菌群数</label>
            <InputText id="noise" v-model="ttc" type="text" class="w-full mb-3" placeholder="Total number of coliform bacteria"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">细菌总数</label>
            <InputText id="illumination time" v-model="tbc" type="text" class="w-full mb-3" placeholder="Total bacterial count"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">黄曲霉素B1</label>
            <InputText id="illumination time" v-model="afb1" type="text" class="w-full mb-3" placeholder="Aflatoxin"
                       style="padding:1rem;" />

            <label for="illumination time" class="block text-900 text-xl font-medium mb-2">沙门菌数</label>
            <InputText id="illumination time" v-model="stc" type="text" class="w-full mb-3" placeholder="Salmonella"
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
// import qs from 'qs';
// import EventBus from '../AppEventBus';
// import router from '../router'

export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      housenumber:'',
      hg:'',
      pb:'',
      cd:'',
      cr:'',
      ttc:'',
      tbc:'',
      afb1:'',
      stc:''
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

      const jsonData = {
        house_number:this.housenumber,
        time_stamp:time_stamp,
        padding_require_1:parseFloat(this.hg),
        padding_require_2:parseFloat(this.pb),
        padding_require_3:parseFloat(this.cr),
        padding_require_4:parseFloat(this.cd),
        padding_require_5:parseFloat(this.ttc),
        padding_require_6:parseFloat(this.tbc),
        padding_require_7:parseFloat(this.afb1),
        padding_require_8:parseFloat(this.stc),
      }
      console.log("JSON", jsonData)
      axios.post('http://127.0.0.1:8080/fsims/pastureoperator/addpasturepaddingrequire', JSON.stringify(jsonData),{
        headers: {
          'Content-Type': 'application/json'
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