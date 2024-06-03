<template>
  <div class="grid">
    <div class="col-6">
      <div class="card md-0">
        <div class="grid">
          <div class="col">
            <p v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;margin-left: 20%;margin-top: 20%;">货架期统计
            </p>
            <p v-else style="font-size: x-large;font-weight: bold;margin-left: 20%;margin-top: 20%;">Shelf life
              statistics</p>
          </div>
          <div class="col-4">
            <div class="card" style="height:14vh;">
              <div class="flex justify-content-between ">
                <div>
                  <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">正常</span>
                  <span v-else style="font-size: large;font-weight: bold;">Normal</span>
                  <div>
                    <p style="font-size: xx-large;margin-top:10%">97</p>
                  </div>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style="width:2.5rem;height:2.5rem">
                  <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                </div>
              </div>
              <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
              <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday </span>
              <span class="text-green-500 font-medium">12</span>
            </div>
          </div>
          <div class="col-4">
            <div class="card" style="height:14vh;">
              <div class="flex justify-content-between ">
                <div>
                  <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">警告</span>
                  <span v-else style="font-size: large;font-weight: bold;">Warning!</span>
                  <div>
                    <p style="font-size: xx-large;margin-top:10%">03</p>
                  </div>
                </div>
                <div class="flex align-items-center justify-content-center bg-red-100 border-round"
                  style="width:2.5rem;height:2.5rem">
                  <i class="pi pi-exclamation-circle  text-xl"></i>
                </div>
              </div>
              <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
              <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday </span>
              <span class="text-green-500 font-medium">1</span>
            </div>
          </div>

          <DataTable :value="data" scrollable scrollHeight="25vh" tableStyle="min-width: 50rem">
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span v-if="flag" class="text-xl text-900 font-bold">产品光谱数据</span>
                <span v-else class="text-xl text-900 font-bold">Product shelf life data</span>
              </div>
            </template>
            <Column v-if="flag" field="id" header="产品"></Column>
            <Column v-else field="id" header="Product"></Column>
            <Column header="光谱数据">
              <template #body="rowData">
                <Toast />
                <Button @click="showSpec('center', rowData.data)" label="Info"
                  class="p-button-rounded p-button-info" style="font-size: 12px;padding: 6px 6px;">查看光谱内容</button>
              </template>
              <!-- <Column v-if="flag" field="data" header="光谱数据（4℃）"></Column>
              <Column v-else field="data" header="Data"></Column> -->
            </Column>
            <Column>
              <template #body="rowData">
                <Toast />
                <Button @click="predict('center', rowData.data)" label="Primary"
                  class="p-button-raised p-button-text">货架期预测</button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card" style="height: 50vh">
        <div class="grid p-fluid">
          <div class="col-12 md:col-4">
            <OrderList v-model="information" listStyle="height:400px" dataKey="id">
              <template v-if="flag" #header> 货架期统计</template>
              <template v-else style="font-size: small;" #header> Shelf life statistics</template>
              <template #item="slotProps">
                <div class="flex flex-wrap p-2 align-items-center gap-3 mt-4 mb-4">
                  <div class="flex-1 flex flex-column gap-2">
                    <span class="font-bold text-900" style="font-size: small;">{{ slotProps.item.name
                      }}</span>
                  </div>
                  <span class="font-bold text-900" style="font-size: large;"> {{ slotProps.item.price
                    }}</span>
                </div>
              </template>
            </OrderList>
          </div>
          <div class="col-12 md:col-8">
            <div class="card flex flex-column align-items-center">
              <h5 v-if="flag" class="align-self-center font-bold">食品安全预警</h5>
              <h5 v-else class="align-self-center font-bold">Food safety warning</h5>
              <Chart type="doughnut" :data="lan === 'CN' ? pieData : pieDataEn" :options="pieOptions"
                style="width: 72%" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card" >
        <h5 v-if="flag">货架期动态变化图</h5>
        <h5 v-else>Dynamic shelf life change chart</h5>
        <Chart type="line" :data="lan === 'CN' ? lineData : lineDataEn" :options="lineOptions" :height="100"/>
      </div>
    </div>

    <!-- <div class="col-6">
      <div class="card" style="height: 50vh">
        <DataTable :value="risk" scrollable scrollHeight="45vh" tableStyle="min-width: 50rem">
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span v-if="flag" class="text-xl text-900 font-bold">高风险食品</span>
              <span v-else class="text-xl text-900 font-bold">High-risk food</span>
              
            </div>
          </template>
          <Column v-if="flag" field="batch_id" header="批次"></Column>
          <Column v-else field="batch_id" header="Batch"></Column>
          <Column v-if="flag" field="type" header="肉类"></Column>
          <Column v-else field="type" header="Meat"></Column>
          <Column v-if="flag" field="reason1" header="原因1"></Column>
          <Column v-else field="reason2" header="Reason 1"></Column>
          <Column v-if="flag" field="reason1" header="原因2"></Column>
          <Column v-else field="reason2" header="Reason 2"></Column>
          <Column v-if="flag" field="reason3" header="原因3"></Column>
          <Column v-else field="reason3" header="Reason 3"></Column>
          <Column v-if="flag" field="advice" header="处置建议"></Column>
          <Column v-else field="advice" header="Advice"></Column>
        </DataTable>
      </div>
    </div> -->

    <!-- <div class="col-12">
      <div class="card" style="height: 50vh">
        <DataTable :value="predict" scrollable scrollHeight="45vh" tableStyle="min-width: 50rem">
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span v-if="flag" class="text-xl text-900 font-bold">商品货架期数据</span>
              <span v-else class="text-xl text-900 font-bold">Product shelf life data</span>
            </div>
          </template>
          <Column v-if="flag" field="batch_id" header="批次"></Column>
          <Column v-else field="batch_id" header="Batch"></Column>
          <Column v-if="flag" field="type" header="肉类"></Column>
          <Column v-else field="type" header="Meat"></Column>
          <Column v-if="flag" field="data1" header="数据1"></Column>
          <Column v-else field="data1" header="Data1"></Column>
          <Column v-if="flag" field="data1" header="数据2"></Column>
          <Column v-else field="data1" header="Data2"></Column>
          <Column v-if="flag" field="data1" header="数据3"></Column>
          <Column v-else field="data1" header="Data3"></Column>
          <Column v-if="flag" field="data1" header="数据4"></Column>
          <Column v-else field="data1" header="Data4"></Column>
          <Column v-if="flag" field="sale" header="货架期"></Column>
          <Column v-else field="sale" header="Shelf life"></Column>
          <Column v-if="flag" field="predict" header="风险评估">
            <template #body>
              <div class="flex flex-wrap gap-2">
                <Tag class="mr-2" severity="success" value="Low"></Tag>
              </div>
            </template>
          </Column>
          <Column v-else field="predict" header="Risk assessment">
            <template #body>
              <div class="flex flex-wrap gap-2">
                <Tag class="mr-2" severity="success" value="Low"></Tag>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div> -->
  </div>
  <Dialog header="货架期预测结果" :loading="loading" v-model:visible="displayPosition"
    :containerStyle="{ width: '500vw', height: '80px' }" :position="position" :modal="true">
    <p class="m-0">预测结果为{{ this.result }}天</p>
    <template #footer>
      <Button label="确认" icon="pi pi-check" @click="closePosition" autofocus />
    </template>
  </Dialog>
  <Dialog header="货架期预测结果" :loading="loading" v-model:visible="displayPosition1"
    :containerStyle="{ width: '500vw', height: '80px' }" :position="position" :modal="true">
    <p class="m-0">{{ this.spec }}</p>
    <template #footer>
      <Button label="确认" icon="pi pi-check" @click="closePosition" autofocus />
    </template>
  </Dialog>
</template>

<script>
import EventBus from '../AppEventBus';
import axios from 'axios';
import qs from 'qs'
export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      position: 'center',
      displayPosition: false,
      data: '',
      result: '',
      spec:'',
      displayPosition1: false,
      risk: [
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "reason1": "原因1",
          "reason2": "原因2",
          "reason3": "原因3",
          "advice": "建议1"
        },

      ],
      shelf_day: [
        {
          "batch_id": 1,
          "type": "牛肉",
          "day": "1天",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "day": "1天",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "day": "1天",
          "advice": "建议1"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "day": "1天",
          "advice": "建议1"
        },
      ],
      // predict: [
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },
      //   {
      //     "batch_id": 1,
      //     "type": "牛肉",
      //     "data1": "数据1",
      //     "data2": "数据2",
      //     "data3": "数据3",
      //     "data4": "数据4",
      //     "sale": "7天",
      //     "predict": "丢弃"
      //   },


      // ],
      informationCn: [
        {
          "name": "正常",
          "category": "97",
          "price": 97
        },
        {
          "name": "警告",
          "category": "3",
          "price": 3
        },
        {
          "name": "安全预警",
          "category": "1",
          "price": 1
        },

      ],
      informationEn: [
        {
          "name": "Normal",
          "category": "97",
          "price": 97
        },
        {
          "name": "Warning",
          "category": "3",
          "price": 3
        },
        {
          "name": "Safety Warning",
          "category": "1",
          "price": 1
        },

      ],
      pieOptions: null,
      pieData: {
        labels: ['低风险', '中风险', '高风险'],
        datasets: [
          {
            data: [97, 3, 1],
            backgroundColor: [
              "#00DD00",
              "#FF8800",
              "#FF0088",
            ],
            hoverBackgroundColor: [
              "#00DD00",
              "#FF8800",
              "#FF0088",
            ]
          }
        ]
      },
      pieDataEn: {
        labels: ['Low', 'Mid', 'High'],
        datasets: [
          {
            data: [97, 3, 1],
            backgroundColor: [
              "#00DD00",
              "#FF8800",
              "#FF0088",
            ],
            hoverBackgroundColor: [
              "#00DD00",
              "#FF8800",
              "#FF0088",
            ]
          }
        ]
      },
      lineData: {
        labels: ["5月20日", "5月21日", "5月22日", "5月23日", "5月24日", "5月25日", "5月26日"],
        datasets: [
          {
            label: '第一',
            data: [45, 49, 50, 51, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
          },
          {
            label: '第二',
            data: [55, 43, 56, 42, 52, 55, 43],
            fill: false,
            backgroundColor: '#2f6666',
            borderColor: '#2f6666',
            tension: .4
          },
          {
            label: '第三',
            data: [30, 33, 36, 45, 33, 37, 23],
            fill: false,
            backgroundColor: '#2f1233',
            borderColor: '#2f1233',
            tension: .4
          },
        ]
      },
      lineDataEn: {
        labels: ["3.11", "3.15", "3.18", "3.22", "3.23", "3.25", "3.26"],
        datasets: [
          {
            label: 'First',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
          },
          {
            label: 'Second',
            data: [55, 43, 76, 12, 52, 55, 33],
            fill: false,
            backgroundColor: '#2f6666',
            borderColor: '#2f6666',
            tension: .4
          },
          {
            label: 'Third',
            data: [12, 33, 56, 65, 33, 77, 23],
            fill: false,
            backgroundColor: '#2f1233',
            borderColor: '#2f1233',
            tension: .4
          },
        ]
      },
    }
  },
  created() {
    this.getData();
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
    getData() {
      axios.get('http://182.92.99.82:8081/fsims/user/query/spectras').then(res => {
        console.log("光谱数据", res.data.data)
        this.data = res.data.data.spectras;
      })
    },
    predict(position, data) {
      this.position = position;
      this.displayPosition = true
      data = data.data
      console.log("传入数据", data)
      axios.post('http://182.92.99.82:8081/fsims/user/shelflife/forecast', qs.stringify({ data }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log("result:", res.data)
        this.result = res.data.data
      })
    },
    showSpec(position, data){
      this.position = position;
      this.displayPosition1 = true
      this.spec=data.data
    }
  },
  computed: {
    information() {
      return this.lan === 'CN' ? this.informationCn : this.informationEn;
    }
  }
}
</script>