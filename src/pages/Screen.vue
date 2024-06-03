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

                <!-- <div class="col-12 xl:col-12">

                    <p v-if="lan == 'CN'" class="title">全产业链信息</p>
                    <p v-else class="title">Problem information</p>

                </div> -->
                <!-- <div class="col-12 xl:col-6">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span v-if="lan == 'CN'" class="block text-800 font-medium mb-3 font-bold"
                                    style="font-size:18px">全产业链总数</span>
                                <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food
                                    supply
                                    chain</span>
                                <div style="font-size:20px;font-weight:bold">{{ allFoodChainNum }}</div>
                            </div>
                            
                        </div>

                        <span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
                        <span v-else class="text-500">Increased since last visit</span>
                        <span class="text-green-500 font-medium" style="font-size:20px">1 </span>
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
                                <div style="font-size:20px;font-weight:bold">{{ overFoodChainNum }}</div>
                            </div>
                        </div>
                        <span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
                        <span v-else class="text-500">Increased since last visit</span>
                        <span class="text-green-500 font-medium" style="font-size:20px">0 </span>
                    </div>
                </div> -->

                <!-- <div class="col-12 xl:col-12">
                    <p v-if="lan == 'CN'" class="title">食品安全问题</p>
                    <p v-else class="title">Problem information</p>
                </div> -->
                <div class="col-12 xl:col-12">
                    <div class="card">
                        <div class="col-12 xl:col-12">
                            <p class="title">洁净度分析</p>
                        </div>
                        <Carousel :value="clearpicture" :numVisible="1" :numScroll="1"
                            :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true"
                            :autoplayInterval="8081">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content">
                                        <div class="mb-3">
                                            <img :src="slotProps.data.source"
                                                :alt="slotProps.data.source" width="320" class="product-image" />
                                                <p class="title">分析结果{{ slotProps.data.result }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>
                <div class="col-12 xl:col-12">
                    <div class="card">
                        <div class="col-12 xl:col-12">
                            <p class="title">淋巴结</p>
                        </div>
                        <Carousel :value="lbpictures" :numVisible="1" :numScroll="1"
                            :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true"
                            :autoplayInterval="8081">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content">
                                        <div class="mb-3">
                                            <img :src="slotProps.data.img_path"
                                                :alt="slotProps.data.img_path" width="320" class="product-image" />
                                            <p class="title">{{slotProps.data.grade}}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                        
                    </div>
                </div>
                
            </div>
        </div>

        <div class="col-12 xl:col-6" style="margin-top:10vh">
            <div class="grid p-fluid">
                <div class="card">
                    <div class="grid p-fluid">
                        <div class="col-12 xl:col-12">
                            <p v-if="lan == 'CN'" class="title" style="font-size:25px">全产业链统计</p>
                            <p v-else class="title">Food supply chain information</p>
                        </div>
                        <!-- <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">牧场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">{{ this.NumPasture }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">牧场员工数 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">{{ this.NumPackStaff }} </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">屠宰场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">{{ this.NumSlaughter }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">屠宰场员工数 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">{{ this.NumSlaughterStaff }}</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">包装场总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">{{ this.NumPack }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">包装场员工数</span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">{{ this.NumPackStaff }}</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-3">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">运输车辆总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">{{ this.NumVechicle }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">运输车驾驶员 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">{{ this.NumDriver }}</span>
                            </div>
                        </div> -->
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成饲养牛总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">1704</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">10</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成屠宰牛总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">21907</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">180</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-4">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" style="font-size:20px;font-weight:bold">已完成运输批次</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:30px;font-weight:bold">162</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-800">较昨日新增</span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-green-500 font-medium">1</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:40%;font-size:20px">独立采集点温度变化情况</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="itemps"  :height="120" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:20%;font-size:20px">畜棚监测站温度变化情况</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="btemps" :height="180" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:20%;font-size:20px">畜棚监测站湿度变化情况</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="bhumidity" :height="180" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:20%;font-size:20px">畜棚监测站二氧化碳变化情况</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="bco2" :height="180" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="card">
                                <h5 v-if="lan == 'CN'" style="margin-left:20%;font-size:20px">畜棚监测站空气露点变化情况</h5>
                                <h5 v-else>Node Status</h5>
                                <Chart type="line" :data="bdew" :height="180" />
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
                                    13074
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- <div class="col-12 xl:col-12">
                    <p v-if="lan == 'CN'" class="title">传感器信息</p>
                    <p v-else class="title">Problem information</p>
                </div> -->
                <div class="col-12 xl:col-12">
                    <div class="card" style="height:650px;">
                        <div class="col-12 xl:col-12">
                            <p v-if="lan == 'CN'" class="title">传感器信息</p>
                            <p v-else class="title">Problem information</p>
                        </div>
                        <div class="col-12 xl:col-12">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold"
                                            style="font-size:18px">在线传感器总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:20px">12</div>
                                    </div>
                                    <!-- <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                    </div> -->
                                </div>
                                <span v-if="lan == 'CN'" class="text-500">故障/离线 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-red-500 font-medium" style="font-size:20px">0 </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-12">

                            <h5 v-if="lan == 'CN'" style="margin-top: 5%;">传感器详情</h5>
                            <h5 v-else>Node Status</h5>

                            <DataTable :value="sensors" :scrollable="true" scrollHeight="300px" :loading="loading2"
                                scrollDirection="both" class="mt-3">
                                <!-- <Column field="device_code" :header="lan === 'CN' ? '设备编号' : 'DeviceCode'">
                                </Column> -->
                                <Column field="type" :header="lan === 'CN' ? '设备类型' : 'Type'">
                                </Column>
                                <Column field="location" :header="lan === 'CN' ? '位置' : 'Position'">
                                </Column>
                                <Column field="state" :header="lan === 'CN' ? '状态' : 'State'">
                                    <template #body="rowData">
                                        <div v-if="rowData.data.state === '正常'">
                                            <Tag class="mr-2" severity="success" :value="'正常'"></Tag>
                                        </div>
                                        <div v-else-if="rowData.data.state === '异常'">
                                            <div class="flex flex-wrap gap-2">
                                                <Tag class="mr-2" severity="warning" :value="'异常'"
                                                    style="font-size: 10px; padding: 6px 8px;"></Tag>
                                            </div>
                                        </div>
                                    </template>
                                </Column>
                                <Column>
                                    <template #body="rowData">
                                        <Toast />
                                        <Button @click="showData('right', rowData.data)" label="Primary"
                                            class="p-button-raised p-button-text"
                                            style="font-size: 12px;padding: 8px 8px;">详情</button>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>

                    </div>
                </div>
                <div class="col-12 xl:col-12">
                    <div class="card">
                        <div class="col-12 xl:col-12">
                            <p v-if="lan == 'CN'" class="title">安全问题预警</p>
                            <p v-else class="title">Problem information</p>
                        </div>
                        <div class="col-12 xl:col-12">
                            <div class="card mb-0">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold"
                                            style="font-size:18px">预警通知总数</span>
                                        <span v-else class="block text-500 font-medium mb-3 font-bold">Total number of
                                            food
                                            supply
                                            chain</span>
                                        <div style="font-size:20px">{{ safetycount }}</div>
                                    </div>
                                </div>
                                <span v-if="lan == 'CN'" class="text-500">比昨日增长 </span>
                                <span v-else class="text-500">Increased since last visit</span>
                                <span class="text-red-500 font-medium" style="font-size:20px">2 </span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-12">
                            <h5 v-if="lan == 'CN'">安全问题预警详情</h5>
                            <h5 v-else>Node Status</h5>
                            <DataTable :value="food_security" :scrollable="true" scrollHeight="230px"
                                :loading="loading2" scrollDirection="both" class="mt-3">
                                <Column field="event_time" :header="lan === 'CN' ? '时间' : 'Time'"
                                    :style="{ width: '10px' }">
                                </Column>
                                <Column field="content" :header="lan === 'CN' ? '问题内容' : 'Content'"
                                    headerStyle="width: 10rem">
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog header="传感器数据" v-model:visible="displayPosition" :containerStyle="{ width: '500vw', height: '80px' }"
        :position="position" :modal="true">
        <div class="card">
            <div class="grid">
                <DataTable :value="latest_sensor_data" scrollable scrollHeight="40vh" tableStyle="max-width: 20rem">
                    <Column v-if="flag" field="name" header="项目"></Column>
                    <Column v-else field="name" header="ProjectName"></Column>
                    <Column v-if="flag" field="value" header="值"></Column>
                    <Column v-else field="pid" header="PID"></Column>
                </DataTable>
            </div>
        </div>
    </Dialog>
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
            //new
            position: 'center',
            displayPosition: false,
            latest_sensor_data: '',
            // add
            lan: this.$store.state.language,
            flag: true,
            layout: "grid",
            dataviewValue: null,

            NumPasture: 0,
            NumSlaughter: 0,
            NumPack: 0,
            NumVechicle: 0,

            NumPastureStaff: 0,
            NumSlaughterStaff: 0,
            NumPackStaff: 0,
            NumDriver: 0,

            BlockHeight: 0,
            NumBatches: 0,

            NumCowFeedEnd: 0,
            NumCowSlaEnd: 0,
            allFoodChainNum: 0,
            overFoodChainNum: 0,

            uuid: localStorage.getItem("uuid"),
            chainService: null,
            foodChainService: null,
            block_data: null,
            
            itemps: {
                // labels: ['12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27','12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27','12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27','12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27','12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27', '12-28', '12-29', '12-30', '12-31'],
                labels:[],
                datasets: [
                    {
                        label: '冷冻库',
                        borderColor: '#F57C6E',
                        pointRadius: 0,
                        tension: .1,
                        borderWidth: 4,
                    },
                    {
                        label: '包装间',
                        borderColor: '#F2B56F',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '排酸库1',
                        borderColor: '#FAE69E',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '屠宰车间',
                        borderColor: '#84C3B7',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '分割车间',
                        borderColor: '#88D8DB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '热水刀具消毒池',
                        borderColor: '#71B7ED',
                        pointRadius: 0,
                        tension: .1
                    },
                    {
                        label: '排酸库2',
                        borderColor: '#B8AEEB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                ]
            },
            btemps:{
                labels:[],
                datasets:[
                    {
                        label: '牧场1',
                        borderColor: '#F57C6E',
                        pointRadius: 0,
                        tension: .1,
                        borderWidth: 4,
                    },
                    {
                        label: '待宰圈',
                        borderColor: '#84C3B7',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '牧场2',
                        borderColor: '#71B7ED',
                        pointRadius: 0,
                        tension: .1
                    },
                    {
                        label: '厂区外围',
                        borderColor: '#B8AEEB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    }
                ]
            },
            bco2:{
                labels:[],
                datasets:[
                    {
                        label: '牧场1',
                        borderColor: '#F57C6E',
                        pointRadius: 0,
                        tension: .1,
                        borderWidth: 4,
                    },
                    {
                        label: '待宰圈',
                        borderColor: '#84C3B7',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '牧场2',
                        borderColor: '#71B7ED',
                        pointRadius: 0,
                        tension: .1
                    },
                    {
                        label: '厂区外围',
                        borderColor: '#B8AEEB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    }
                ]
            },
            bhumidity:{
                labels:[],
                datasets:[
                    {
                        label: '牧场1',
                        borderColor: '#F57C6E',
                        pointRadius: 0,
                        tension: .1,
                        borderWidth: 4,
                    },
                    {
                        label: '待宰圈',
                        borderColor: '#84C3B7',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '牧场2',
                        borderColor: '#71B7ED',
                        pointRadius: 0,
                        tension: .1
                    },
                    {
                        label: '厂区外围',
                        borderColor: '#B8AEEB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    }
                ]
            },
            bdew:{
                labels:[],
                datasets:[
                    {
                        label: '牧场1',
                        borderColor: '#F57C6E',
                        pointRadius: 0,
                        tension: .1,
                        borderWidth: 4,
                    },
                    {
                        label: '待宰圈',
                        borderColor: '#84C3B7',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    },
                    {
                        label: '牧场2',
                        borderColor: '#71B7ED',
                        pointRadius: 0,
                        tension: .1
                    },
                    {
                        label: '厂区外围',
                        borderColor: '#B8AEEB',
                        pointRadius: 0,
                        borderWidth: 4,
                        tension: .1
                    }
                ]
            },
            safetycount: 0,
            sensors: [],
            lbpictures:[],
            clearpicture:[],
            dpictures: [
                {
                    name: "/d1.jpg"
                },
                {
                    name: "/d2.jpg"
                },
                {
                    name: "/d3.jpg"
                },
                {
                    name: "/d4.jpg"
                },
                {
                    name: "/d5.jpg"
                }
            ],
            ppictures: [
                {
                    name: "/p1.jpg"
                },
                {
                    name: "/p2.jpg"
                },
                {
                    name: "/p3.jpg"
                },
                {
                    name: "/p4.jpg"
                },
                {
                    name: "/p5.jpg"
                }
            ],
            food_security: [],
            peer_data: [
                {
                    "ip": '182.92.99.82',
                    "status": '正常运行'
                },
                {
                    "ip": '182.92.99.82',
                    "status": '正常运行'
                },
                {
                    "ip": '182.92.99.82',
                    "status": '正常运行'
                },
                {
                    "ip": '182.92.99.82',
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
        this.getTotalPasture();
        this.getTotalSlaughter();
        this.getTotalPack();
        this.getTotalVechicles();
        this.getDriver();
        this.getPackStaff();
        this.getPastureStaff();
        this.getSlaughterStaff();
        this.getLedgerInfo();
        this.getEndFeedCow();
        this.getEndSlaCow();
        this.getEndBatches();
        this.getSensors();
        this.getAllChain();
        this.getNotification();
        this.getiSensorTemps();
        this.getbSensorTemps();
        this.getbSensorHumidities();
        this.getbSensorDewpoints();
        this.getbSensorCo2();
        this.getlbimg();
        this.getimg();
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
        getEndBatches() {
            axios.get('http://182.92.99.82:8081/fsims/user/num_end_batches').then(res => {
                this.NumBatches = res.data.data;
            })
        },
        getEndFeedCow() {
            axios.get('http://182.92.99.82:8081/fsims/user/num_end_feed_cow').then(res => {
                this.NumCowFeedEnd = res.data.data;
            })
        },
        getEndSlaCow() {
            axios.get('http://182.92.99.82:8081/fsims/user/num_end_sla_cow').then(res => {
                this.NumCowSlaEnd = res.data.data;
            })
        },
        getLedgerInfo() {
            axios.get('http://182.92.99.82:8081/fsims/user/blockchain/ledgerinfo').then(res => {
                //console.log('res:', res.data.data.BCI.height)
                this.BlockHeight = res.data.data.BCI.height
            })
        },
        getPastureStaff() {
            const role = 'pastureoperator';
            const data = {
                role: role,
            }
            axios.get('http://182.92.99.82:8081/fsims/user/searchusers', { params: data }).then(res => {
                this.NumPastureStaff = res.data.data.count
            })
        },
        getSlaughterStaff() {
            const role = 'slaughteroperator';
            const data = {
                role: role,
            }
            axios.get('http://182.92.99.82:8081/fsims/user/searchusers', { params: data }).then(res => {
                this.NumSlaughterStaff = res.data.data.count
            })
        },
        getPackStaff() {
            const role = 'packoperator';
            const data = {
                role: role,
            }
            axios.get('http://182.92.99.82:8081/fsims/user/searchusers', { params: data }).then(res => {
                this.NumPackStaff = res.data.data.count
            })
        },
        getDriver() {
            axios.get('http://182.92.99.82:8081/fsims/user/searchtv').then(res => {
                this.NumDriver = res.data.data.count
            })
        },
        getTotalSlaughter() {
            axios.get('http://182.92.99.82:8081/fsims/user/slaughterhouses').then(res => {
                this.NumSlaughter = res.data.data.count;
                console.log("res.data.data.count", res.data.data.count);
            })
        },
        getTotalPasture() {
            axios.get('http://182.92.99.82:8081/fsims/user/pastures').then(res => {
                this.NumPasture = res.data.data.count;
                console.log("res.data.data.count", res.data.data.count);
            })
        },
        getTotalPack() {
            axios.get('http://182.92.99.82:8081/fsims/user/packagehouses').then(res => {
                this.NumPack = res.data.data.count;
                console.log("res.data.data.count", res.data.data.count);
            })
        },
        getTotalVechicles() {
            axios.get('http://182.92.99.82:8081/fsims/user/transportvehicles').then(res => {
                this.NumVechicle = res.data.data.count;
                console.log("res.data.data.count", res.data.data.count);
            })
        },
        getSensors() {
            axios.get('http://182.92.99.82:8081/fsims/user/query/allsensor').then(res => {
                this.sensors = res.data.data.sensors;
                console.log("传感器数据", res.data);
            })
        },
        getAllChain() {
            axios.get('http://182.92.99.82:8081/fsims/user/foodchains', { params: { uuid: this.uuid } }).then(res => {
                console.log('all_res:', res.data)
                this.allFoodChainNum = res.data.data.total_count;
                let chains = res.data.data.foodchains
                let overchain = 0;
                for (let i = 0; i < chains.length; i++) {
                    switch (chains[i].current_last_procedure) {
                        case 'pasture':
                            chains[i].state = 0
                            break;
                        case 'slaughter':
                            chains[i].state = 1
                            break;
                        case 'package':
                            chains[i].state = 2
                            break;
                        case 'end':
                            chains[i].state = 3
                            overchain++
                            break;
                    }
                }
                console.log("chains:", chains)
                this.overFoodChainNum = overchain
                this.allFoodChain = chains

            })
        },
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
            axios.get('http://182.92.99.82:8081/fsims/user/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('res:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
        getNotification() {
            axios.get('http://182.92.99.82:8081/fsims/user/getnotification', { params: { uuid: this.uuid } }).then(res => {
                console.log('notification:', res.data)
                this.safetycount = res.data.data.count
                let data = res.data.data.notifications
                for (let i = 0; i < data.length; i++) {
                    let result = data[i].proposal.replace(/\[(.*?)\];?/g, '$1, ');
                    data[i].proposal = result.slice(0, -2) + '超标';
                }
                this.food_security = res.data.data.notifications
                // console.log('test:', this.food_security)
            })
        },
        getiSensorTemps(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/isensor/temps').then(res => {
                // this.sensors = res.data;
                console.log("传感器温度数据", res.data);
                this.itemps.labels = res.data.data.time_points;
                for (let i=0;i<7;i++){
                    this.itemps.datasets[i].data = res.data.data.sensor_temps[i].temps
                }
            })
        },
        getbSensorTemps(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/bsensor/temps').then(res => {
                // this.sensors = res.data;
                console.log("蓄棚传感器温度数据", res.data);
                this.btemps.labels = res.data.data.time_points;
                for (let i=0;i<4;i++){
                    this.btemps.datasets[i].data = res.data.data.sensor_temps[i].temps
                }    
            })
        },
        getbSensorCo2(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/bsensor/co2s').then(res => {
                // this.sensors = res.data;
                console.log("蓄棚传感器co2数据", res.data);
                this.bco2.labels = res.data.data.time_points;
                for (let i=0;i<4;i++){
                    this.bco2.datasets[i].data = res.data.data.sensors_co2s[i].co2s
                }
            })
        },
        getbSensorHumidities(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/bsensor/humidities').then(res => {
                // this.sensors = res.data;
                console.log("蓄棚传感器湿度数据", res.data);
                
                this.bhumidity.labels = res.data.data.time_points;
                for (let i=0;i<4;i++){
                    this.bhumidity.datasets[i].data = res.data.data.sensors_humidities[i].humidities
                }
            })
        },
        getbSensorDewpoints(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/bsensor/dewpoints').then(res => {
                // this.sensors = res.data;
                console.log("蓄棚传感器空气露点数据", res.data);
                this.bdew.labels = res.data.data.time_points;
                for (let i=0;i<4;i++){
                    this.bdew.datasets[i].data = res.data.data.sensors_dewpoints[i].dewpoints
                }
            })
        },
        getlbimg(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/lymphnode').then(res => {
                console.log("图片", res.data);
                this.lbpictures[0] = res.data.data.imgs[0];
                this.lbpictures[1] = res.data.data.imgs[1];

            })
        },
        getimg(){
            axios.get('http://182.92.99.82:8081/fsims/user/query/imgs').then(res => {
                console.log("图片2", res.data);
                // var count = res.data.data.count;
                this.clearpicture[0] = res.data.data.imgs[86];
                this.clearpicture[1] = res.data.data.imgs[87];
                this.clearpicture[2] = res.data.data.imgs[88];
                this.clearpicture[3] = res.data.data.imgs[89];
                this.clearpicture[4] = res.data.data.imgs[90];
                // this.lbpictures = res.data.data.imgs
            })
        },
        showData(position, data) {
            let nameMappings = {
                'TimeStamp': '时间',
                'air_temperature': '空气温度/(℃)',
                'lllumination': '光照强度',
                'device_code': '设备编号',
                'co2': 'CO2',
                'air_humidity': '空气湿度',
                'nh3': 'NH3',
                'h2s': 'H2S',
                'atmospheric_pressure': '大气压强/(Pa)',
                'wind_speed': '风速/(m/s)',
                'co': 'CO',
                'air_dewpoint': '空气露点',
            }
            this.position = position;
            this.displayPosition = true
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/latestdata', { params: { device_code: data.device_code } }).then(res => {
                console.log('latestdata:', res.data.data)
                let sensor_data = Object.keys(res.data.data).map(
                    key => {
                        let name = nameMappings[key] || 'Unknown';
                        let value
                        if (res.data.data[key] === '') {
                            value = '/'
                        } else {
                            value = res.data.data[key];
                        }
                        return { name, value };
                    }
                )
                console.log("最新传感器数据", sensor_data)
                this.latest_sensor_data = sensor_data
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
}
</style>