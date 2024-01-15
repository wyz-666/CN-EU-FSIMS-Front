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
            <div class="text-900 text-3xl font-medium mb-3">屠宰场当日恶臭污染物处理</div>
            <span class="text-600 font-large"></span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="housenumber" class="block text-900 text-xl font-medium mb-2">屠宰场编号</label>
            <InputText id="housenumber" v-model="housenumber" type="text" class="w-full mb-3" placeholder="Pasture House Number"
                       style="padding:1rem;" />

            <label for="temperature" class="block text-900 text-xl font-medium mb-2">当日污染物总量</label>
            <InputText id="temperature" v-model="residue" type="text" class="w-full mb-3" placeholder="Pasture Temperature"
                       style="padding:1rem;" />

            <label for="humidity" class="block text-900 text-xl font-medium mb-2">相对昨日新增</label>
            <InputText id="humidity" v-model="residueadd" type="text" class="w-full mb-3" placeholder="Relative Humidity"
                       style="padding:1rem;" />

            <label for="wind" class="block text-900 text-xl font-medium mb-2">当日超标总量</label>
            <InputText id="wind" v-model="overresidue" type="text" class="w-full mb-3" placeholder="Speed Of Wind"
                       style="padding:1rem;" />

            <label for="Illuminance" class="block text-900 text-xl font-medium mb-2">超标相对昨日新增</label>
            <InputText id="Illuminance" v-model="overresidueadd" type="text" class="w-full mb-3" placeholder="Illuminance"
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
      residue:'',
      residueadd:'',
      overresidue:'',
      overresidueadd:'',
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
      console.log("当前时间戳", time_stamp)
      const jsonData = {
        house_number: this.housenumber,
        time_stamp:time_stamp,
        req_slaughter_odor_pollutants_per_day_1: parseFloat(this.residue),
        req_slaughter_odor_pollutants_per_day_2: parseFloat(this.residueadd),
        req_slaughter_odor_pollutants_per_day_3: parseFloat(this.overresidue),
        req_slaughter_odor_pollutants_per_day_4: parseFloat(this.overresidueadd),
      }
      console.log(jsonData)
      axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/upload/slaughterwasteodor', JSON.stringify(jsonData),{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.statusCode != 200) {
          this.$toast.add({ severity: 'error', summary: '添加失败' , life: 3000 });
          return;
        }
        var message = name + 'added!';
        this.$toast.add({severity:'success', summary:'添加成功', detail:message, life:3000})
        this.$router.push({name: 'slaughterdataupload'});
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