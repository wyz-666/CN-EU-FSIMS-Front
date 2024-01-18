<template>
    <div class="grid p-fluid">
        <div class="layout-topbar">
            <router-link to="/" class="layout-topbar-logo">
                <img alt="Logo" :src="topbarImage()" />
                <div class=title_bar>
                    <span class="title_cn">食品安全智慧管理与决策支持系统</span>
                    <span class="title_en">Food Safety Intelligent Management and Decision Support System</span>
                </div>

            </router-link>

            <ul class="layout-topbar-menu hidden lg:flex origin-top">
                <li>
                    <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
                </li>
                <li>
                    <button class="p-link layout-topbar-button" @click="home">
                        <i class="pi pi-calendar"></i>
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button class="p-link layout-topbar-button">
                        <i class="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button class="p-link layout-topbar-button">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="col-12 xl:col-3" style="margin-top:10vh">
            <div class="grid p-fluid">
                <div class="col-12 xl:col-12">

                    <p v-if="lan == 'CN'" class="title">全产业链信息</p>
                    <p v-else class="title">Problem information</p>

                </div>
                <div class="col-12 xl:col-6">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span v-if="lan == 'CN'" class="block text-800 font-medium mb-3 font-bold"
                                    style="font-size:18px">全产业链总数</span>
                                <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food supply
                                    chain</span>
                                <div style="font-size:20px;font-weight:bold">69</div>
                            </div>
                            <!-- <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                            </div> -->
                        </div>

                        <span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
                        <span v-else class="text-500">Increased since last visit</span>
                        <span class="text-green-500 font-medium" style="font-size:20px">2 </span>
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span v-if="lan == 'CN'" class="block text-800 font-medium mb-3 font-bold"
                                    style="font-size:18px">全产业链完成数量</span>
                                <span v-else class="block text-500 font-medium mb-3 font-bold">Food Supply Chain
                                    Completion</span>
                                <div style="font-size:20px;font-weight:bold">32</div>
                            </div>
                            <!-- <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                style="width:2.5rem;height:2.5rem">
                                <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                            </div> -->
                        </div>
                        <span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
                        <span v-else class="text-500">Increased since last visit</span>
                        <span class="text-green-500 font-medium" style="font-size:20px">6 </span>
                    </div>
                </div>
                <div class="col-12 xl:col-12">
                    <p v-if="lan == 'CN'" class="title">食品安全问题</p>
                    <p v-else class="title">Problem information</p>
                </div>

                <div class="col-12 xl:col-12">
                    <div class="card">
                        <div class="col-12 xl:col-12">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold"
                                            style="font-size:18px">食品安全问题总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:20px">69</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-500">比昨日增长 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-red-500 font-medium" style="font-size:20px">2 </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-12">
                            <h5 v-if="lan == 'CN'">食品安全问题详情</h5>
                            <h5 v-else>Node Status</h5>
                            <DataTable :value="food_security" :scrollable="true" scrollHeight="230px" :loading="loading2"
                                scrollDirection="both" class="mt-3">
                                <Column field="time" :header="lan === 'CN' ? '时间' : 'Time'" :style="{ width: '10px' }">
                                </Column>
                                <Column field="content" :header="lan === 'CN' ? '问题内容' : 'Content'"
                                    headerStyle="width: 10rem">
                                </Column>
                            </DataTable>
                        </div>
                        <div class="col-12 xl:col-12">
                            <h5 v-if="lan == 'CN'" style="margin-left:30%">近半年食品安全问题统计</h5>
                            <h5 v-else>Node Status</h5>
                            <Chart type="line" :data="basicData" :height="130" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 xl:col-6" style="margin-top:10vh">
            <div class="grid p-fluid">
                <div class="card">
                    <div class="grid p-fluid">
                        <div class="col-12 xl:col-12">
                            <p v-if="lan == 'CN'" class="title" style="font-size:40px">全产业链统计</p>
                            <p v-else class="title">Food supply chain information</p>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">牧场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">1</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">牧场员工数 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">5 </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">屠宰场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">3</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">屠宰场员工数 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">18</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">包装场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">3</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">包装场员工数 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">20</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">运输车辆总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">35</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">运输车驾驶员 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">42</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成饲养牛总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">320</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">20</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成屠宰牛总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">210</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">18</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成运输批次</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">180</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增</span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">20</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-12">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:35%;font-size:30px">近一周产业链生产统计</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="basicData2" :height="150" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

        <div class="col-12 xl:col-3" style="margin-top:10vh">
            <div class="grid p-fluid">
                <div class="col-12 xl:col-12">
                    <p v-if="lan == 'CN'" class="title">区块链信息</p>
                    <p v-else class="title">Blockchain information</p>
                </div>


                <div class="col-12 xl:col-12">
                    <div class="card mb-0">
                        <div class="grid p-fluid">
                            <div class="col-12 xl:col-12">
                                <span v-if="lan == 'CN'" class="block_height_font" style="font-size:25px">
                                    当前区块高度
                                </span>
                                <span v-else class="block_height_font">
                                    Block Height
                                </span>
                            </div>
                            <div class="col-12 xl:col-12">
                                <span class="block_height_number" style="font-size:35px;margin-left:40%">
                                    297
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-12 xl:col-12">
                    <p v-if="lan == 'CN'" class="title">地理舆情问题</p>
                    <p v-else class="title">Problem information</p>
                </div>
                <div class="col-12 xl:col-12">
                    <div class="card">
                        <div class="col-12 xl:col-12">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold"
                                            style="font-size:18px">地理舆情问题总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                            supply
                                            chain</span>
                                        <div style="font-size:20px">69</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-500">比昨日增长 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-red-500 font-medium" style="font-size:20px">2 </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-12">
                            <h5 v-if="lan == 'CN'">地理舆情问题详情</h5>
                            <h5 v-else>Node Status</h5>
                            <DataTable :value="food_security" :scrollable="true" scrollHeight="230px" :loading="loading2"
                                scrollDirection="both" class="mt-3">
                                <Column field="time" :header="lan === 'CN' ? '时间' : 'Time'" :style="{ width: '10px' }">
                                </Column>
                                <Column field="content" :header="lan === 'CN' ? '问题内容' : 'Content'"
                                    headerStyle="width: 10rem">
                                </Column>
                            </DataTable>
                        </div>
                        <div class="col-12 xl:col-12">
                            <h5 v-if="lan == 'CN'" style="margin-left:30%">近半年地理舆情问题统计</h5>
                            <h5 v-else>Node Status</h5>
                            <Chart type="line" :data="basicData3" :height="130" />
                        </div>
                    </div>
                </div>



            </div>
        </div>
        <!-- <div class="col12 xl:col-12">
             <div class="card">

             </div>
        </div> -->
    </div>
    <!-- </div> -->
</template>

<script>
// import AppTopBar from '../AppTopbar.vue';
// import AppMenu from '../AppMenu.vue';
// import AppConfig from '../AppConfig.vue';
// import AppFooter from '../AppFooter.vue';
// import App from '../App.vue';
import ChainService from '../service/ChainService';
import FoodChainService from "../service/FoodChainServcice"
import EventBus from '../AppEventBus';
import axios from 'axios';
// 食品供应链链数量
export default {
    data() {
        return {
            // add
            lan: this.$store.state.language,
            flag: true,
            layout: "grid",
            dataviewValue: null,
            uuid: localStorage.getItem("uuid"),
            chainService: null,
            foodChainService: null,
            block_data: null,
            basicData: {
                labels: ['7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '食品安全问题数',
                        data: [13, 10, 5, 12, 5, 7],
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: .4
                    }
                ]
            },
            basicData2: {
                labels: ['12-25', '12-26', '12-27', '12-28', '12-29', '12-30', '12-31'],
                datasets: [
                    {
                        label: '已出栏牛数量',
                        data: [12, 15, 20, 17, 24, 12, 37],
                        fill: false,
                        borderColor: '#FBB45D',
                        tension: .4
                    },
                    {
                        label: '已屠宰牛数量',
                        data: [28, 18, 24, 19, 16, 27, 20],
                        fill: false,
                        borderColor: '#EF8183',
                        tension: .4
                    },
                    {
                        label: '已运输批次',
                        data: [28, 38, 50, 19, 36, 27, 30],
                        fill: false,
                        borderColor: '#699ED4',
                        tension: .4
                    }
                ]
            },
            basicData3: {
                labels: ['7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '地理舆情问题数',
                        data: [13, 10, 5, 12, 5, 7],
                        fill: false,
                        borderColor: '#F58422',
                        tension: .4
                    }
                ]
            },
            food_security: [
                {
                    "time": '2023-12-30',
                    "content": '牧场饲料xxx含量超标'
                },
                {
                    "time": '2023-12-30',
                    "content": '牧场饲料xxx含量超标'
                },
                {
                    "time": '2023-12-30',
                    "content": '牧场饲料xxx含量超标'
                },
                {
                    "time": '2023-12-30',
                    "content": '牧场饲料xxx含量超标'
                },
                {
                    "time": '2023-12-30',
                    "content": '牧场饲料xxx含量超标'
                },

            ],
            peer_data: [
                {
                    "ip": '127.0.0.1',
                    "status": '正常运行'
                },
                {
                    "ip": '127.0.0.1',
                    "status": '正常运行'
                },
                {
                    "ip": '127.0.0.1',
                    "status": '正常运行'
                },
                {
                    "ip": '127.0.0.1',
                    "status": '正常运行'
                }
            ],

            customEvents: [
                {
                    status: '普通牧场',
                    date: '15/10/2020 10:30',
                    icon: 'pi pi-shopping-cart',
                    description: '普通牧场',
                    color: '#9C27B0',
                    image: 'beef.jpg'
                },
                {
                    status: '育肥',
                    date: '15/10/2020 10:30',
                    icon: 'pi pi-shopping-cart',
                    description: '育肥',
                    color: '#9C27B0',
                    image: 'beef.jpg'
                },
                {
                    status: '宰前管理',
                    date: '15/10/2020 10:30',
                    icon: 'pi pi-shopping-cart',
                    description: '宰前管理',
                    color: '#9C27B0',
                    image: 'beef.jpg'
                },
                {
                    status: '屠宰',
                    date: '15/10/2020 10:30',
                    icon: 'pi pi-shopping-cart',
                    description: '屠宰',
                    color: '#9C27B0',
                    image: 'beef.jpg'
                },
                {
                    status: '包装',
                    date: '15/10/2020 14:00',
                    icon: 'pi pi-cog',
                    description: '包装科尔沁牛肉',
                    color: '#673AB7',
                    image: 'pack.jpeg'
                },
                {
                    status: '冷链运输',
                    date: '15/10/2020 16:15',
                    icon: 'pi pi-envelope',
                    description: '储藏科尔沁牛肉',
                    color: '#FF9800',
                    image: 'store.jpg'
                },
                {
                    status: '售卖',
                    date: '16/10/2020 10:00',
                    icon: 'pi pi-check',
                    description: '售卖科尔沁牛肉',
                    color: '#607D8B',
                    image: 'sell.jpeg'
                }
            ],

            // end

            nestedRouteItemsCn: [
                {
                    label: '牧场',
                    to: '/pasture'
                },
                {
                    label: '育肥',
                    to: '/fattening'
                },
                {
                    label: '屠宰',
                    to: '/track'
                }

            ],
            nestedRouteItemsEn: [
                {
                    label: 'pasture',
                    to: '/pasture'
                },
                {
                    label: 'fatten',
                    to: '/fattening'
                },
                {
                    label: 'slaughter',
                    to: '/track'
                }

            ],

        }
    },
    created() {
        this.chainService = new ChainService();
        this.foodChainService = new FoodChainService();
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
        this.chainService.getRecentBlocks().then(data => this.block_data = data);
        this.foodChainService.getFoodChain().then(data => this.dataviewValue = data);
        this.getHouse();
    },
    methods: {
        chainDetail() {
            this.$refs.op2.toggle(event);
        },
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
        onContextRightClick(event) {
            this.$refs.contextMenu.show(event);
        },
        onRowSelect() {
            this.$router.push('/chain');
        },
        topbarImage() {
            return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
        },
        home() {
            
            this.$router.push('/home');
        },
        getHouse() {
            axios.get('http://127.0.0.1:8000/fsims/user/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('res:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
    },
    computed: {
        nestedRouteItems() {
            return this.lan === 'CN' ? this.nestedRouteItemsCn : this.nestedRouteItemsEn;
        }
    },

}
</script>

<style>
.block_height_font {
    text-align: center;
    font-weight: 500;
    font-size: x-large;
}

.block_height_number {
    text-align: center;
    font-size: x-large;
    font-weight: 500;
}

.peer_title {
    font-weight: bold;
    text-align: center;
    font-size: large;
}

.peer_number {
    font-weight: bold;
    text-align: center;
    font-size: xx-large;
}

.title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
}</style>