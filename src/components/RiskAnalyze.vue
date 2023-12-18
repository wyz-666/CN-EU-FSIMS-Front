<template>
    <div class="grid p-fluid">
        <div class="col-12 xl:col-5">
            <!-- <div class="card" style="height: 60vh"> -->
            <div class="grid p-fluid">
                <div class="col-12">
                    <div class="card md-0" style="height: 32vh">
                        <div class="grid">
                            <div class="col-12 md:col-4" style="margin-top: 12%;">
                                <!-- <div class="card mb-0 "> -->
                                <div style="font-size:large;font-weight: bold;text-align: center;margin-bottom: 5%;">
                                    <span v-if="lan == 'CN'">地理风险指数</span>
                                    <span v-else>geographical risk index</span>
                                </div>
                                <div style="font-size:xx-large;font-weight: bold;text-align: center;">
                                    <span class="lable_text">99</span>
                                </div>
                                <!-- </div> -->
                            </div>
                            <div class="col-12 md:col-8">
                                <div class="card flex flex-column align-items-center  md-0">
                                    <h5  v-if="lan == 'CN'" class="align-self-center font-bold">地理信息风险统计</h5>
                                    <h5 v-else class="align-self-center font-bold">Geographic Risk Statistics</h5>
                                    <Chart type="doughnut" :data="lan === 'CN' ? pieData : pieDataEn" :options="pieOptions" style="width: 50%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="card md-0" style="height: 32vh">
                        <div class="grid">
                            <div class="col-12 md:col-4" style="margin-top: 12%;">
                                <!-- <div class="card mb-0 "> -->
                                <div style="font-size:large;font-weight: bold;text-align: center;margin-bottom: 5%;">
                                    <span v-if="lan == 'CN'">舆情风险指数</span>
                                    <span v-else>Public opinion risk index</span>
                                </div>
                                <div style="font-size:xx-large;font-weight: bold;text-align: center;">
                                    <span class="lable_text">98</span>
                                </div>
                                <!-- </div> -->
                            </div>
                            <div class="col-12 md:col-8">
                                <div class="card flex flex-column align-items-center md-0">
                                    <h5  v-if="lan == 'CN'" class="align-self-center font-bold">舆情信息风险统计</h5>
                                    <h5 v-else class="align-self-center font-bold">Public opinion information risk statistics</h5>
                                    <Chart type="doughnut" :data="lan === 'CN' ? pieData : pieDataEn" :options="pieOptions" style="width: 50%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <!-- </div> -->
        </div>

        <div class="col-12 xl:col-7">

            <div class="card" style="height: 67vh">
                <div id="container"></div>
            </div>

        </div>

        <div class="col-12">
            <div class="card" style="height: 47vh">
                <DataTable :value="geo_info" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">地理风险信息</span>
                            <span v-else class="text-xl text-900 font-bold">Geographic risk information</span>
                            <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                        </div>
                    </template>
                    <Column field="id" :header="lan === 'CN' ? '批次' : 'Batch'"></Column>
                    <Column field="position" :header="lan === 'CN' ? '地理位置' : 'Geographical Location'"></Column>
                    <Column field="influence_link" :header="lan === 'CN' ? '可能影响环节' : 'Possible Impact Link'"></Column>
                    <Column field="content" :header="lan === 'CN' ? '风险内容' : 'Risk Content'"></Column>
                    <Column field="rank" :header="lan === 'CN' ? '风险等级' : 'Risk Level'">
                    <template #body>
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '高' : 'High'"></Tag>
                      </div>
                    </template>
                  </Column>


                </DataTable>
            </div>

        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">

                <DataTable :value="infor" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="lan == 'CN'" class="text-xl text-900 font-bold">舆情信息监控</span>
                            <span v-else class="text-xl text-900 font-bold">Public opinion information monitoring</span>
                            <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                        </div>
                    </template>
                    <Column field="id" :header="lan === 'CN' ? '编号' : 'ID'"></Column>
                    <Column field="content" :header="lan === 'CN' ? '舆情信息内容' : 'Public Opinion Content'"></Column>
                    <Column field="step" :header="lan === 'CN' ? '影响环节' : 'Impact Step'"></Column>
                    <Column field="location" :header="lan === 'CN' ? '位置' : 'Location'"></Column>
                    <Column field="status" :header="lan === 'CN' ? '状态' : 'Status'"></Column>
                </DataTable>
            </div>

        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 47vh">
                <div>
                    <p v-if="lan == 'CN'" style="font-size: large;font-weight: bold;text-align: center;">最近一月舆情风险信息统计</p>
                    <p v-else style="font-size: large;font-weight: bold;text-align: center;">Public opinion risk information statistics for the past month</p>
                </div>
                <Chart type="line" :data="lan==='CN' ? lineData : lineDataEn" :options="lineOptions" class="h-30rem" />
            </div>
        </div>

        <!-- <div class="col-12 xl:col-5">
            <div class="card" style="height: 47vh">
                
            </div>
        </div>
        <div class="col-12 xl:col-7">
            <div class="card" style="height: 47vh">
                
            </div>
        </div> -->
    </div>
</template>
    
<script>
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            lineData: {
                labels: ["3月11日", "3月15日", "3月18日", "3月22日", "3月23日", "3月25日", "3月26日"],
                datasets: [
                    {
                        label: '舆情风险信息',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }

                ]
            },
            lineDataEn: {
              labels: ["3.11", "3.15", "3.18", "3.22", "3.23", "3.25", "3.26"],
              datasets: [
                {
                  label: 'public opinion risk information',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: '#2f4860',
                  borderColor: '#2f4860',
                  tension: .4
                }

              ]
            },
            infor: [
                {
                    "id": "01",
                    "content": "xx企业负面消息",
                    "step": "普通牧场",
                    "location": "科尔沁草原牧场",
                    "status": "风险信息"
                },
                {
                    "id": "01",
                    "content": "xx企业负面消息",
                    "step": "普通牧场",
                    "location": "科尔沁草原牧场",
                    "status": "风险信息"
                },
                {
                    "id": "01",
                    "content": "xx企业负面消息",
                    "step": "普通牧场",
                    "location": "科尔沁草原牧场",
                    "status": "风险信息"
                },

            ],
            pieOptions: null,
            pieData: {
                labels: ['低风险', '中风险', '高风险'],
                datasets: [
                    {
                        data: [123, 20, 10],
                        backgroundColor: [
                            "#00DD00",
                            "#FF8800",
                            "#FF0088"
                        ],
                        hoverBackgroundColor: [
                            "#00DD00",
                            "#FF8800",
                            "#FF0088"
                        ]
                    }
                ]
            },
            pieDataEn: {
              labels: ['Low', 'Mid', 'High'],
              datasets: [
                {
                  data: [123, 20, 10],
                  backgroundColor: [
                    "#00DD00",
                    "#FF8800",
                    "#FF0088"
                  ],
                  hoverBackgroundColor: [
                    "#00DD00",
                    "#FF8800",
                    "#FF0088"
                  ]
                }
              ]
            },
            chartOptions: null,
            transaction: {
                labels: ["3月11日", "3月15日", "3月18日", "3月22日", "3月23日", "3月25日", "3月26日"],
                datasets: [
                    {
                        label: '',
                        data: [5, 7, 6, 2, 1, 3, 7],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }
                ]
            },
            geo_info: [
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
                {
                    "id": 123,
                    "position": "科尔沁草原牧场",
                    "influence_link": "普通牧场",
                    "content": "发生自然灾害沙尘暴",
                    "rank": "高"
                },
            ],

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
                center: [115.496274, 36.566297], //初始化地图中心点位置
            });
            //添加插件
            AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye"], function () {
                //异步同时加载多个插件
                map.addControl(new AMap.HawkEye()); //显示缩略图
                map.addControl(new AMap.Scale()); //显示当前地图中心的比例尺
            });
            // 单击
            // map.on("click", (e) => {
            //     // console.log(e);
            //     state.current_position = [e.lnglat.KL, e.lnglat.kT];
            //     state.path.push([e.lnglat.KL, e.lnglat.kT]);
            //     addMarker();

            //     addPolyLine();
            //     // 地图按照适合展示图层内数据的缩放等级展示
            //     // map.setFitView();
            // });

            // // 实例化点标记
            // function addMarker() {
            //     const marker = new AMap.Marker({
            //         icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            //         position: state.current_position,
            //         offset: new AMap.Pixel(-26, -54),
            //     });
            //     marker.setMap(map);
            // }
            var lineArr = [
                // [
                //    ['0', '39.916527'],
                //    ['121.48941', '31.40527']
                // ],
                // [
                //    ['121.48941', '31.40527'],
                //    ['112.48699', '37.94036']
                // ],
                // [
                //    ['108.93425', '34.23053'],
                //    ['121.48941', '31.40527']
                // ],
            ];
            addPolyLine();
            // 折线
            function addPolyLine() {
                for (var i = 0; i < lineArr.length; i++) {


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
                        showDir: true,
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
    height: 63vh;
}
</style>
<style scoped>
.lable_title {
    font-weight: bold;
    text-align: center;
    font-size: medium;
    margin-bottom: 3%;
}

.lable_text {
    font-weight: bold;
    text-align: center;
    font-size: xx-large;
}
</style>