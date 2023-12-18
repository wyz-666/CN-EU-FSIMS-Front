<template>
  <div class="grid">
    <div class="col-6">
      <div class="card md-0" style="height: 50vh;">
        <div class="grid">
          <div class="col">
            <p v-if="lan == 'CN'"
               style="font-size: x-large;font-weight: bold;margin-left: 20%;margin-top: 20%;">货架期统计</p>
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
          <!-- <div class="col-4">
              <div class="card" style="height: 15vh;">
                  <p style="font-size: 30px;color: rgb(246, 12, 32);text-align: center;">WARNING!</p>
                  <p style="font-size: 40px;margin-left: 15px%;margin-top: 15px;text-align: center;">03</p>
              </div>
          </div> -->
          <DataTable :value="shelf_day" scrollable scrollHeight="25vh" tableStyle="min-width: 57rem">
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">货架期临近统计</span>
                <span v-else class="text-xl text-900 font-bold">Shelf life approaching statistics</span>
              </div>
            </template>
            <Column v-if="flag" field="batch_id" header="批次"></Column>
            <Column v-else field="batch_id" header="Batch"></Column>
            <Column v-if="flag" field="type" header="肉类"></Column>
            <Column v-else field="type" header="Meat"></Column>
            <Column v-if="flag" field="day" header="货架期天数"></Column>
            <Column v-else field="day" header="Shelf life days"></Column>
            <Column v-if="flag" field="advice" header="处置建议"></Column>
            <Column v-else field="advice" header="Disposal proposal"></Column>
          </DataTable>
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card" style="height: 50vh">
        <div class="grid p-fluid">
          <div class="col-12 md:col-4">
            <OrderList v-model="information" listStyle="height:400px" dataKey="id">
              <template  v-if="flag" #header> 货架期统计</template>
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
              <Chart type="doughnut" :data="lan === 'CN' ? pieData : pieDataEn" :options="pieOptions" style="width: 72%" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card" style="height: 50vh;">
        <h5 v-if="flag">货架期动态变化图</h5>
        <h5 v-else>Dynamic shelf life change chart</h5>
        <Chart type="line" :data="lan === 'CN' ? lineData : lineDataEn" :options="lineOptions" />
      </div>
    </div>

    <div class="col-6">
      <div class="card" style="height: 50vh">
        <DataTable :value="risk" scrollable scrollHeight="45vh" tableStyle="min-width: 50rem">
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span v-if="flag" class="text-xl text-900 font-bold">高风险食品</span>
              <span v-else class="text-xl text-900 font-bold">High-risk food</span>
              <!-- <Button icon="pi pi-refresh" rounded raised /> -->
            </div>
          </template>
          <Column v-if="flag" field="batch_id" header="批次"></Column>
          <Column v-else field="batch_id" header="Batch"></Column>
          <Column v-if="flag" field="type" header="肉类"></Column>
          <Column v-else field="type" header="Meat"></Column>
          <Column v-if="flag" field="reason1" header="原因1"></Column>
          <Column v-else  field="reason2" header="Reason 1"></Column>
          <Column v-if="flag" field="reason1" header="原因2"></Column>
          <Column v-else  field="reason2" header="Reason 2"></Column>
          <Column v-if="flag" field="reason3" header="原因3"></Column>
          <Column v-else field="reason3" header="Reason 3"></Column>
          <Column v-if="flag" field="advice" header="处置建议"></Column>
          <Column v-else field="advice" header="Advice"></Column>
        </DataTable>
      </div>
    </div>

    <div class="col-12">
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
    </div>
  </div>
</template>

<script>
import EventBus from '../AppEventBus';
export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
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
      predict: [
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },
        {
          "batch_id": 1,
          "type": "牛肉",
          "data1": "数据1",
          "data2": "数据2",
          "data3": "数据3",
          "data4": "数据4",
          "sale": "7天",
          "predict": "丢弃"
        },


      ],
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
        labels: ["3月11日", "3月15日", "3月18日", "3月22日", "3月23日", "3月25日", "3月26日"],
        datasets: [
          {
            label: '第一',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
          },
          {
            label: '第二',
            data: [55, 43, 76, 12, 52, 55, 33],
            fill: false,
            backgroundColor: '#2f6666',
            borderColor: '#2f6666',
            tension: .4
          },
          {
            label: '第三',
            data: [12, 33, 56, 65, 33, 77, 23],
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
  },
  computed:{
    information() {
      return this.lan === 'CN' ? this.informationCn : this.informationEn;
    }
  }
}
</script>