<template>
    <div class="grid p-fluid">
        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">
                <div class="grid p-fluid">
                    <div class="col-12 md:col-4">
                        <OrderList v-model="information" listStyle="height:390px" dataKey="id">
                            <template v-if="lan == 'CN'" #header> 冷链运输状态统计</template>
                            <template v-else #header>Cold chain transportation status statistics</template>
                            <template #item="slotProps">
                                <div class="flex flex-wrap p-2 align-items-center gap-3">
                                    <div class="flex-1 flex flex-column gap-2">
                                        <span class="font-bold text-900">{{ slotProps.item.name }}</span>
                                    </div>
                                    <span class="font-bold text-900"> {{ slotProps.item.price }}</span>
                                </div>
                            </template>
                        </OrderList>
                    </div>
                    <div class="col-12 md:col-8">
                        <div class="card flex flex-column align-items-center">
                            <h5 v-if="lan == 'CN'" class="align-self-center font-bold">冷链运输状态</h5>
                            <h5 v-else class="align-self-center font-bold">Cold chain transportation status</h5>
                            <Chart type="doughnut" :data="pieData" :options="pieOptions" style="width: 72%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">
                <div id="container"></div>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">
                <DataTable :value="transport" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">冷链运输状态详细信息</span>
                            <span v-else class="text-xl text-900 font-bold">Cold chain transport status details</span>
                            <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                        </div>
                    </template>
                    <Column field="transport_id" :header="lan === 'CN' ? '运输编号' : 'Transport ID'"></Column>
                    <Column field="path" :header="lan === 'CN' ? '路径' : 'Path'"></Column>
                    <Column field="temperature" :header="lan === 'CN' ? '温度' : 'Temperature'"></Column>
                    <Column field="humidity" :header="lan === 'CN' ? '湿度' : 'Humidity'"></Column>
                    <Column field="load_time" :header="lan === 'CN' ? '装货时间' : 'Loading Time'"></Column>
                    <Column field="unload_time" :header="lan === 'CN' ? '卸货时间' : 'Unloading Time'"></Column>
                    <Column field="duration" :header="lan === 'CN' ? '运输时间' : 'Transport Duration'"></Column>
                </DataTable>
            </div>

        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">
                <DataTable :value="abnormal" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">异常信息通知</span>
                            <span v-else class="text-xl text-900 font-bold">Exception information notification</span>
                        </div>
                    </template>
                    <Column field="transport_id" :header="lan === 'CN' ? '运输编号' : 'Transport ID'"></Column>
                    <Column field="time" :header="lan === 'CN' ? '异常时间' : 'Abnormal Time'"></Column>
                    <Column field="content" :header="lan === 'CN' ? '异常内容' : 'Abnormal Content'"></Column>
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
            lan:this.$store.state.language,
            flag: true,
            pieOptions: null,
            pieDataCN: {
                labels: ['正常', '温度异常', '路径异常', '时间异常'],
                datasets: [
                    {
                        data: [300, 20, 10, 12],
                        backgroundColor: [
                            "#00DD00",
                            "#FF8800",
                            "#FF0088",
                            '#00FFFF'
                        ],
                        hoverBackgroundColor: [
                            "#00DD00",
                            "#FF8800",
                            "#FF0088",
                            "#00FFFF"
                        ]
                    }
                ]
            },
          pieDataEN: {
            labels: ['Normal', 'Temperature Anomaly', 'Path Anomaly', 'Time Anomaly'],
            datasets: [
              {
                data: [300, 20, 10, 12],
                backgroundColor: [
                  "#00DD00",
                  "#FF8800",
                  "#FF0088",
                  '#00FFFF'
                ],
                hoverBackgroundColor: [
                  "#00DD00",
                  "#FF8800",
                  "#FF0088",
                  "#00FFFF"
                ]
              }
            ]
          },

            informationCn: [
                {
                    "name": "正常：",
                    "category": "123",
                    "price": 100
                },
                {
                    "name": "温度异常",
                    "category": "123",
                    "price": 10
                },
                {
                    "name": "路径异常",
                    "category": "123",
                    "price": 12
                },
                {
                    "name": "时间异常",
                    "category": "123",
                    "price": 12
                },
            ],
          informationEn: [
            {
              "name": "Normal：",
              "category": "123",
              "price": 100
            },
            {
              "name": "Temperature Anomaly",
              "category": "123",
              "price": 10
            },
            {
              "name": "Path Anomaly",
              "category": "123",
              "price": 12
            },
            {
              "name": "Time Anomaly",
              "category": "123",
              "price": 12
            },
          ],
            transport: [
                {
                    "transport_id": 1,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
                {
                    "transport_id": 2,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
                {
                    "transport_id": 3,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
                {
                    "transport_id": 4,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
                {
                    "transport_id": 5,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
                {
                    "transport_id": 6,
                    "path": "北京-上海",
                    "temperature": 4,
                    "humidity": "60%",
                    "load_time": "2020-10-10",
                    "unload_time": "2020-10-11",
                    "duration": "24"
                },
            ],
            abnormal: [
                {
                    "transport_id": 1,
                    "time": "2020-10-10",
                    "content": "第一种异常"
                },
                {
                    "transport_id": 2,
                    "time": "2020-10-10",
                    "content": "第二种异常"
                },
                {
                    "transport_id": 3,
                    "time": "2020-10-10",
                    "content": "第三种异常"
                },
                {
                    "transport_id": 4,
                    "time": "2020-10-10",
                    "content": "第三种异常"
                },
                {
                    "transport_id": 5,
                    "time": "2020-10-10",
                    "content": "第三种异常"
                },
                {
                    "transport_id": 6,
                    "time": "2020-10-10",
                    "content": "第三种异常"
                },
            ]
        }
    },
    mounted() {
        this.pieOptions = this.setChartOptions();
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
      },
      pieData() {
        return this.lan === 'CN' ? this.pieDataCN : this.pieDataEN;
      }
    },
    methods: {
        setChartOptions() {

            return {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };
        }
    }
}
</script>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
// import { reactive } from "vue-demi";

// const state = reactive({
//     path: [],
//     current_position: [],
// });

//进行地图初始化
function initMap() {
    AMapLoader.load({
        key: "6f7d5a13e296f420990ce0039724acba", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    })
        .then((AMap) => {
            const map = new AMap.Map("container", {
                //设置地图容器id
                viewMode: "3D", //是否为3D地图模式
                zoom: 5, //初始化地图级别
                center: [115.496274,36.566297], //初始化地图中心点位置
            });
            //添加插件
            AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye"], function () {
                //异步同时加载多个插件
                map.addControl(new AMap.HawkEye()); //显示缩略图
                map.addControl(new AMap.Scale()); //显示当前地图中心的比例尺
            });
            var lineArr = [
            [
               ['116.397128', '39.916527'],
               ['121.48941', '31.40527']
            ],
            [
               ['121.48941', '31.40527'],
               ['112.48699', '37.94036']
            ],
            [
               ['108.93425', '34.23053'],
               ['121.48941', '31.40527']
            ],
            ];
            addPolyLine();
            // 折线
            function addPolyLine() {
                for(var i = 0;i<lineArr.length;i++){

                
                const polyline = new AMap.Polyline({
                    path: lineArr[i],
                    isOutline: true,
                    outlineColor: "#ffeeff",
                    borderWeight: 1,
                    strokeColor: "#3366FF",
                    strokeOpacity: 0.6,
                    strokeWeight: 5,
                    // 折线样式还支持 'dashed'
                    strokeStyle: "solid",
                    // strokeStyle是dashed时有效
                    strokeDasharray: [10, 5],
                    lineJoin: "round",
                    lineCap: "round",
                    zIndex: 50,
                    showDir:true,
                });
                map.add([polyline]);
            }
         }
        })
        .catch((e) => {
            console.log(e);
        });
}
initMap();
</script>


<style lang="scss" scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 400px;
}
</style>