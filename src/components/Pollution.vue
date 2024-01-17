<template>
    <div class="grid p-fluid">
      <div class="col-5 xl:col-2">
        <h5>请选择记录时间</h5>
      </div>
      <div class="col-7 xl:col-7">
        <Calendar id="calendar-24h" v-model="RecordTime" showTime hourFormat="24" />
      </div>
        <div class="col-4">
            <div class="card" style="height:23vh ;">
                <div class="grid">
                    <div class="col-12">
                        <div class="lable_title">
                            <span v-if="lan == 'CN'">污水处理总量</span>
                            <span v-else>Wastewater Treated</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'"  style="font-size: large;font-weight: bold;">正常</span>
                                    <span v-else style="font-size: medium;font-weight: bold;">Normal</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%;margin-bottom: 5%;">{{ waterweight1 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%;margin-bottom: 5%;">120 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:50%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:50%;">New from yesterday </span>
                            <span v-if="lan == 'CN'" class="text-green-500 font-medium">{{ waterweight2 + '吨' }}</span>
                            <span v-else class="text-green-500 font-medium">12 tons</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">污染超标</span>
                                    <span v-else style="font-size: small;font-weight: bold;">Pollution excess</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%">{{ waterweight3 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%">20 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                            <span v-if="lan == 'CN'" class="text-red-500 font-medium">{{ waterweight4 + '吨' }}</span>
                            <span v-else class="text-red-500 font-medium">2 tons</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card" style="height:23vh ;">
                <div class="grid">
                    <div class="col-12">
                        <div class="lable_title">
                            <span v-if="lan == 'CN'">废渣处理总量</span>
                            <span v-else>Waste Sludge Processed</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">正常</span>
                                    <span v-else style="font-size: small;font-weight: bold;">Normal</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%;margin-bottom: 5%;">{{ residueweight1 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%;margin-bottom: 5%;">180 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:50%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:50%;">New from yesterday</span>
                            <span v-if="lan == 'CN'" class="text-green-500 font-medium">{{ residueweight2 + '吨' }}</span>
                            <span v-else class="text-green-500 font-medium">12 tons</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">污染超标</span>
                                    <span v-else style="font-size: small;font-weight: bold;">Pollution excess</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%">{{ residueweight3 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%">13 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                            <span v-if="lan == 'CN'" class="text-red-500 font-medium">{{ residueweight4 + '吨' }}</span>
                            <span v-else class="text-red-500 font-medium">2 tons</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card" style="height:23vh ;">
                <div class="grid">
                    <div class="col-12">
                        <div class="lable_title">
                            <span v-if="lan == 'CN'">恶臭污染物处理总量</span>
                            <span v-else>Odor Treatment Total</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">正常</span>
                                    <span v-else style="font-size: small;font-weight: bold;">Normal</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%;margin-bottom: 5%;">{{ odorweight1 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%;margin-bottom: 5%;">170 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:50%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:50%;">New from yesterday</span>
                            <span v-if="lan == 'CN'" class="text-green-500 font-medium">{{ odorweight2 + '吨' }}</span>
                            <span v-else class="text-green-500 font-medium">12 tons</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card" style="height:14vh;">
                            <div class="flex justify-content-between ">
                                <div>
                                    <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">污染超标</span>
                                    <span v-else style="font-size: small;font-weight: bold;">Pollution excess</span>
                                    <div>
                                        <p v-if="lan == 'CN'" style="font-size: x-large;font-weight:bold;margin-top:10%">{{ odorweight3 + '吨' }}</p>
                                        <p v-else style="font-size: small;font-weight:bold;margin-top:10%">30 tons</p>
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:2.5rem;height:2.5rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                            <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                            <span v-if="lan == 'CN'" class="text-red-500 font-medium">{{ odorweight4 + '吨' }}</span>
                            <span v-else class="text-red-500 font-medium">2 tons</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-7">
            <div class="card" >
                <h5 v-if="lan == 'CN'" style="text-align: center;">最近半月普通牧场污染物排放情况</h5>
                <h5 v-else style="text-align: center;">Pollutant emissions from common pastures in the past half month</h5>
                <Chart type="bar" :data="lan==='CN' ? farm:farmEn" :options="chartOptions" class="h-30rem" />
            </div>
        </div>
        <div class="col-12 xl:col-5">
            <div class="card" >
                <DataTable :value="confirm" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">污染物处置建议</span>
                            <span v-else class="text-xl text-900 font-bold">Pollutant Disposal Recommendations</span>
                        </div>
                    </template>
                    <Column field="id" :header="lan === 'CN' ? '批次' : 'Batch'"></Column>
                    <Column field="class" :header="lan === 'CN' ? '污染物种类' : 'Pollutant Type'"></Column>
                    <Column field="emissions" :header="lan === 'CN' ? '排放量' : 'Emission Volume'"></Column>
                    <Column field="status" :header="lan === 'CN' ? '状态' : 'Status'"></Column>
                    <Column field="advice" :header="lan === 'CN' ? '处置建议' : 'Disposal Advice'"></Column>

                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-7">
            <div class="card">
                <h5 v-if="lan == 'CN'" style="text-align: center;">最近半月屠宰场污染物排放情况</h5>
                <h5 v-else style="text-align: center;">Pollutant emissions from slaughterhouses in the past half month</h5>
                <Chart type="bar" :data="lan==='CN' ? farm:farmEn" :options="chartOptions" class="h-30rem" />
            </div>
        </div>
        <div class="col-12 xl:col-5">
            <div class="card" >
                <DataTable :value="confirm" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">污染物处置建议</span>
                            <span v-else class="text-xl text-900 font-bold">Pollutant Disposal Recommendations</span>
                        </div>
                    </template>
                    <Column field="id" :header="lan === 'CN' ? '批次' : 'Batch'"></Column>
                    <Column field="class" :header="lan === 'CN' ? '污染物种类' : 'Pollutant Type'"></Column>
                    <Column field="emissions" :header="lan === 'CN' ? '排放量' : 'Emission Volume'"></Column>
                    <Column field="status" :header="lan === 'CN' ? '状态' : 'Status'"></Column>
                    <Column field="advice" :header="lan === 'CN' ? '处置建议' : 'Disposal Advice'"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '../AppEventBus';
import axios from "axios";
// import axios from "axios";
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            RecordTime: '',
            waterweight1:130,
            waterweight2:0,
            waterweight3:0,
            waterweight4:0,
            residueweight1:0,
            residueweight2:0,
            residueweight3:0,
            residueweight4:0,
            odorweight1:0,
            odorweight2:0,
            odorweight3:0,
            odorweight4:0,
            productsPerDay:[],
            dropdownValue: null,
            dropdownValues: [
                { name: '区块高度', code: 'B' },
                { name: '区块哈希', code: 'H' },

            ],
            confirm: [
                {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                },
                {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                }, {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                }, {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                }, {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                },
                {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                }, {
                    "id": "123",
                    "class": "污水",
                    "emissions": "3吨",
                    "status": "超标",
                    "advice": "填埋处理"
                },
            ],

            chartOptions: null,
            farm: {
                labels: ["3月11日", "3月12日", "3月13日", "3月14日", "3月15日", "3月16日", "3月17日", "3月18日", "3月19日", "3月20日", "3月21日", "3月22日", "3月23日", "3月24日"],
                datasets: [
                    {
                        type: 'bar',
                        label: '污水正常',
                        backgroundColor: '#376795',
                        data: [50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: '污水超标',
                        backgroundColor: '#72bcd5',
                        data: [21, 84, 24, 75, 37, 65, 34, 21, 84, 24, 75, 37, 65, 34]
                    },
                    {
                        type: 'bar',
                        label: '废渣正常',
                        backgroundColor: '#aadce0',
                        data: [41, 52, 24, 74, 23, 21, 32, 41, 52, 24, 74, 23, 21, 32]
                    }, {
                        type: 'bar',
                        label: '废渣超标',
                        backgroundColor: '#e76254',
                        data: [50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: '恶臭污染物正常',
                        backgroundColor: '#ef8a47',
                        data: [21, 84, 24, 75, 37, 65, 34, 21, 84, 24, 75, 37, 65, 34]
                    },
                    {
                        type: 'bar',
                        label: '恶臭污染物超标',
                        backgroundColor: '#ffd06f',
                        data: [41, 52, 24, 74, 23, 21, 32, 41, 52, 24, 74, 23, 21, 32]
                    }
                ]
            },
            farmEn: {
              labels: ["3.11", "3.12", "3.13", "3.14", "3.15", "3.16", "3.17", "3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24"],
              datasets: [
                {
                  type: 'bar',
                  label: 'Normal wastewater',
                  backgroundColor: '#376795',
                  data: [50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76, 42]
                },
                {
                  type: 'bar',
                  label: 'Wastewater excess',
                  backgroundColor: '#72bcd5',
                  data: [21, 84, 24, 75, 37, 65, 34, 21, 84, 24, 75, 37, 65, 34]
                },
                {
                  type: 'bar',
                  label: 'Normal residue',
                  backgroundColor: '#aadce0',
                  data: [41, 52, 24, 74, 23, 21, 32, 41, 52, 24, 74, 23, 21, 32]
                }, {
                  type: 'bar',
                  label: 'Residue excess',
                  backgroundColor: '#e76254',
                  data: [50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76, 42]
                },
                {
                  type: 'bar',
                  label: 'Normal foul',
                  backgroundColor: '#ef8a47',
                  data: [21, 84, 24, 75, 37, 65, 34, 21, 84, 24, 75, 37, 65, 34]
                },
                {
                  type: 'bar',
                  label: 'Four excess',
                  backgroundColor: '#ffd06f',
                  data: [41, 52, 24, 74, 23, 21, 32, 41, 52, 24, 74, 23, 21, 32]
                }
              ]
            },


        }
    },
    // methods(){
    //   fetchOdorResidueWater(){
    //     axios.get('http://127.0.0.1:8080/fsims/user/slaughter_all_trash').then(res=>{
    //       this.products = res.data.data.info;
    //     })
    //   }
    // },
  watch: {
    RecordTime(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchTrashPerDay();
      }
    }
  },
  methods: {
      fetchTrashPerDay(){
        const timestamp = parseInt(this.RecordTime.getTime() / 1000)
        const data = {
          time_stamp: timestamp
        }
        axios.get('http://127.0.0.1:8080/fsims/user/all_trash_perday', {params:data}).then(res=>{
          this.productsPerDay = res.data.data
        })
        console.log(this.productsPerDay)
        this.waterweight1 = this.productsPerDay["water_sla_and_pas_trash_pey_day_1"];
        this.waterweight2 = this.productsPerDay["water_sla_and_pas_trash_pey_day_2"]
        this.waterweight3 = this.productsPerDay["water_sla_and_pas_trash_pey_day_3"]
        this.waterweight4 = this.productsPerDay["water_sla_and_pas_trash_pey_day_4"]

        this.residueweight1 = this.productsPerDay["residue_sla_and_pas_trash_pey_day_1"]
        this.residueweight2 = this.productsPerDay["residue_sla_and_pas_trash_pey_day_2"]
        this.residueweight3 = this.productsPerDay["residue_sla_and_pas_trash_pey_day_3"]
        this.residueweight4 = this.productsPerDay["residue_sla_and_pas_trash_pey_day_4"]

        this.odorweight1 = this.productsPerDay["odor_sla_and_pas_trash_pey_day_1"]
        this.odorweight2 = this.productsPerDay["odor_sla_and_pas_trash_pey_day_2"]
        this.odorweight3 = this.productsPerDay["odor_sla_and_pas_trash_pey_day_3"]
        this.odorweight4 = parseInt(this.productsPerDay["odor_sla_and_pas_trash_pey_day_4"])

      },
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
        this.chartOptions = {
            plugins: {
                legend: {
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#abedef',
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };
    }
}

</script>

<style scoped>
.lable_normal {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
    margin-bottom: 3%;
    color: #03f703;
}

.lable_abnormal {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
    color: #f71f03;
}

.lable_title {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
    margin-bottom: 0%;
}
</style>