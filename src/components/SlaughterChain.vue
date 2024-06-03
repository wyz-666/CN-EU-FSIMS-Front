<template>
    <div class="grid">
        <div class="col-12">
            <div class="card md-0">
                <div class="grid">


                    <div class="col-12">
                        <div class="card">
                            <div class="grid">
                                <div class="col-2">
                                    <h5 v-if="lan == 'CN'">屠宰场车间数据</h5>
                                    <h5 v-else>Pasture situation</h5>
                                </div>
                            </div>
                            <TabView>
                                <TabPanel :header="lan === 'CN' ? '屠宰车间' : 'create procedure'">
                                    <Dropdown id="dropdown" v-model="slaughterShopTime" :options="slaughterShopTimes"
                                        optionLabel="time_record_at" placeholder="请选择时间"
                                        style="width: 20%;margin-left:70%" />
                                    <Button label="展示" class="p-button-text" @click="showslaughterShop" />
                                    <DataTable :value="slaughterShopData" scrollable scrollHeight="40vh"
                                        tableStyle="min-width: 10rem">
                                        <Column field="name" header="指标" sortable></Column>
                                        <Column field="value" header="当前值" sortable></Column>
                                        <Column field="min" header="最小值" sortable></Column>
                                        <Column field="max" header="最大值" sortable></Column>
                                        <Column field="state" header="状态" sortable>
                                            <template #body="rowData">
                                                <div v-if="rowData.data.state === 1">
                                                    <Tag class="mr-2" severity="success" :value="'正常'"
                                                        style="font-size: 10px; padding: 6px 8px;">
                                                    </Tag>
                                                </div>
                                                <div v-else-if="rowData.data.state === 2">
                                                    <div class="flex flex-wrap gap-2">
                                                        <Tag class="mr-2" severity="danger" :value="'异常'"
                                                            style="font-size: 10px; padding: 6px 8px;">
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '分割车间' : 'create procedure'">
                                    <Dropdown id="dropdown" v-model="divShopTime" :options="divShopTimes"
                                        optionLabel="time_record_at" placeholder="请选择时间"
                                        style="width: 20%;margin-left:70%" />
                                    <Button label="展示" class="p-button-text" @click="showdivShop" />
                                    <DataTable :value="divShopData" scrollable scrollHeight="40vh"
                                        tableStyle="min-width: 10rem">
                                        <Column field="name" header="指标" sortable></Column>
                                        <Column field="value" header="当前值" sortable></Column>
                                        <Column field="min" header="最小值" sortable></Column>
                                        <Column field="max" header="最大值" sortable></Column>
                                        <Column field="state" header="状态" sortable>
                                            <template #body="rowData">
                                                <div v-if="rowData.data.state === 1">
                                                    <Tag class="mr-2" severity="success" :value="'正常'"
                                                        style="font-size: 10px; padding: 6px 8px;">
                                                    </Tag>
                                                </div>
                                                <div v-else-if="rowData.data.state === 2">
                                                    <div class="flex flex-wrap gap-2">
                                                        <Tag class="mr-2" severity="danger" :value="'异常'"
                                                            style="font-size: 10px; padding: 6px 8px;">
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '排酸车间' : 'create procedure'">
                                    <Dropdown id="dropdown" v-model="acidShopTime" :options="acidShopTimes"
                                        optionLabel="time_record_at" placeholder="请选择时间"
                                        style="width: 20%;margin-left:70%" />
                                    <Button label="展示" class="p-button-text" @click="showacidShop" />
                                    <DataTable :value="acidShopData" scrollable scrollHeight="40vh"
                                        tableStyle="min-width: 10rem">
                                        <Column field="name" header="指标" sortable></Column>
                                        <Column field="value" header="当前值" sortable></Column>
                                        <Column field="min" header="最小值" sortable></Column>
                                        <Column field="max" header="最大值" sortable></Column>
                                        <Column field="state" header="状态" sortable>
                                            <template #body="rowData">
                                                <div v-if="rowData.data.state === 1">
                                                    <Tag class="mr-2" severity="success" :value="'正常'"
                                                        style="font-size: 10px; padding: 6px 8px;">
                                                    </Tag>
                                                </div>
                                                <div v-else-if="rowData.data.state === 2">
                                                    <div class="flex flex-wrap gap-2">
                                                        <Tag class="mr-2" severity="danger" :value="'异常'"
                                                            style="font-size: 10px; padding: 6px 8px;">
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '冷冻库' : 'create procedure'">
                                    <Dropdown id="dropdown" v-model="frozenShopTime" :options="frozenShopTimes"
                                        optionLabel="time_record_at" placeholder="请选择时间"
                                        style="width: 20%;margin-left:70%" />
                                    <Button label="展示" class="p-button-text" @click="showfrozenShop" />
                                    <DataTable :value="frozenShopData" scrollable scrollHeight="40vh"
                                        tableStyle="min-width: 10rem">
                                        <Column field="name" header="指标" sortable></Column>
                                        <Column field="value" header="当前值" sortable></Column>
                                        <Column field="min" header="最小值" sortable></Column>
                                        <Column field="max" header="最大值" sortable></Column>
                                        <Column field="state" header="状态" sortable>
                                            <template #body="rowData">
                                                <div v-if="rowData.data.state === 1">
                                                    <Tag class="mr-2" severity="success" :value="'正常'"
                                                        style="font-size: 10px; padding: 6px 8px;">
                                                    </Tag>
                                                </div>
                                                <div v-else-if="rowData.data.state === 2">
                                                    <div class="flex flex-wrap gap-2">
                                                        <Tag class="mr-2" severity="danger" :value="'异常'"
                                                            style="font-size: 10px; padding: 6px 8px;">
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                    <div class="col-12 xl:col-4">
                        <div class="card">
                            <h5 v-if="lan == 'CN'">屠宰场光照记录</h5>
                            <h5 v-else>Work clothes disinfection record</h5>
                            <!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

                            <DataTable :value="LightData" :scrollable="true" scrollHeight="400px" :loading="loading2"
                                scrollDirection="both" class="mt-3">
                                <Column field="time_record_at" :header="lan === 'CN' ? '时间' : 'Date'"
                                    :style="{ width: '250px' }">
                                </Column>
                                <Column field="sla_env_lig_rec_1" :header="lan === 'CN' ? '屠宰' : 'Method'"
                                    :style="{ width: '100px' }" frozen>
                                </Column>
                                <Column field="sla_env_lig_rec_2" :header="lan === 'CN' ? '车间' : 'Concentration'"
                                    :style="{ width: '100px' }" :frozen="idFrozen"></Column>
                                <Column field="sla_env_lig_rec_3" :header="lan === 'CN' ? '检疫' : 'Duration'"
                                    :style="{ width: '100px' }">
                                </Column>
                                <Column field="sla_env_lig_rec_4" :header="lan === 'CN' ? '预冷' : 'Duration'"
                                    :style="{ width: '100px' }">
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                    <div class="col-12 xl:col-8">
                        <div class="card">
                            <div class="grid">
                                <div class="col-2">
                                    <h5 v-if="lan == 'CN'">屠宰场水质数据</h5>
                                    <h5 v-else>Pasture situation</h5>
                                </div>
                            </div>
                            <Dropdown id="dropdown" v-model="waterQulityTime" :options="waterQulityTimes"
                                optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                            <Button label="展示" class="p-button-text" @click="showwaterQulity" />
                            <DataTable v-model:expandedRows="expandedRows" :value="waterQulityData"
                                responsiveLayout="scroll" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem"
                                scrollDirection="both">
                                <template #header>
                                    <div class="table-header-container">
                                        <span v-if="flag" class="text-xl text-900 font-bold">屠宰场水质数据</span>
                                        <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                    </div>
                                </template>
                                <Column expander="true" headerStyle="width: 3rem" />
                                <Column v-if="flag" field="project" header="项目" style="min-width: 200px"></Column>
                                <Column v-else field="project" header="From"></Column>
                                <template #expansion="rowData">
                                    <div class="orders-subtable">
                                        <DataTable :value="rowData.data.data">
                                            <Column field="name" header="指标" sortable></Column>
                                            <Column field="value" header="当前值" sortable></Column>
                                            <Column field="normal" header="标准值" sortable></Column>
                                            <Column field="state" header="状态" sortable>
                                                <template #body="rowData">
                                                    <div v-if="rowData.data.state === 1">
                                                        <Tag class="mr-2" severity="success" :value="'正常'"
                                                            style="font-size: 10px; padding: 6px 8px;">
                                                        </Tag>
                                                    </div>
                                                    <div v-else-if="rowData.data.state === 2">
                                                        <div class="flex flex-wrap gap-2">
                                                            <Tag class="mr-2" severity="danger" :value="'异常'"
                                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                                        </div>
                                                    </div>
                                                </template>
                                            </Column>
                                        </DataTable>
                                    </div>
                                </template>
                            </DataTable>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <DataTable :value="products" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                                <Column field="number" header="产品编号" sortable></Column>
                                <Column field="batch_number" header="批次编号" sortable></Column>
                                <Column field="type_name" header="产品名字" sortable></Column>
                                <Column field="weight" header="产品重量" sortable></Column>                                
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script>
// import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
import axios from 'axios';
import NodeService from '../service/NodeService';
export default {
    data() {
        return {
            lan: this.$store.state.language,
            flag: true,
            value: 40,
            monitorService: null,
            startTime: '',
            endTime: '',
            house_number: '',
            slaughterShopData: [],
            slaughterShopTimes: [],
            slaughterShopTime: '',
            divShopData: [],
            divShopTimes: [],
            divShopTime: '',
            acidShopData: [],
            acidShopTimes: [],
            acidShopTime: '',
            frozenShopData: [],
            frozenShopTimes: [],
            frozenShopTime: '',
            staUniformData: [],
            nodeService: null,
            shopDataMappings: '',
            shopDataMax: '',
            shopDataMIN: '',
            waterQualityDataMappings: '',
            waterQualityDataMAX: '',
            waterQulityTimes: [],
            waterQulityTime: '',
            waterQulityData: [
                {
                    project: "微生物指标",
                    data: ''
                },
                {
                    project: "感官性状和一般化学指标",
                    data: ''
                },
                {
                    project: "屠宰污水毒理性指标",
                    data: ''
                },
                {
                    project: "其他毒理性指标",
                    data: ''
                },
            ],
            expandedRows: [],
            pre_cool_shop_1: 0,
            pre_cool_shop_2: 0,
            pre_cool_shop_3: 0,
            latestTime: '',
            pre_cool_shop_1_state: 1,
            pre_cool_shop_2_state: 1,
            pre_cool_shop_3_state: 1,
            LightData: [],
            products: '',
            pid: '',
            next_pid: '',





        }
    },
    methods: {
        getLight() {
            var house_number = this.house_number;
            console.log("house_number", house_number);
            // 获取当前时间的秒级时间戳
            var endTimedata = new Date(this.endTime);
            var end_timestamp = parseInt(endTimedata.getTime() / 1000) ;
            // 获取当前时间前一天的秒级时间戳
            let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
            let start_timestamp = end_timestamp - oneDayInSeconds;

            axios.get('http://182.92.99.82:8081/fsims/user/query/light', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {

                console.log('LightData:', res.data)
                this.LightData = res.data.data.infos
                //let len = res.data.data.count;


            })
        },
        getProduct() {
            var type = 4
            axios.get('http://182.92.99.82:8081/fsims/user/productsbypid', { params: { pid: this.pid, type: type, next_pid: this.next_pid } }).then(res => {
                console.log('product:', res.data);
                this.products = res.data.data.slaughter_products_info;
            })
        },
        getShopData() {
            console.log("startTimedata:", this.startTime)
            var startTimedata = new Date(this.startTime)
            var endTimedata = new Date(this.endTime)
            var house_number = this.house_number;
            console.log("house_number", house_number);
            var start_timestamp = parseInt(startTimedata.getTime() / 1000) ;
            var end_timestamp = parseInt(endTimedata.getTime() / 1000) ;
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/slashop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('slaughter:', res.data)
                this.slaughterShopTimes = res.data.data.shop_infos
            })
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/divshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('div:', res.data)
                this.divShopTimes = res.data.data.shop_infos
            })
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/acidshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('slaughter:', res.data)
                this.acidShopTimes = res.data.data.shop_infos
            })
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/frozenshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('slaughter:', res.data)
                this.frozenShopTimes = res.data.data.shop_infos
            })
        },
        getWaterQulityData() {
            console.log("startTimedata:", this.startTime)
            var startTimedata = new Date(this.startTime)
            var endTimedata = new Date(this.endTime)
            console.log("startTime:", startTimedata.getTime());
            console.log("endTime:", endTimedata.getTime());
            // console.log("test:",this.feedHeavyMetalMappings)
            var house_number = this.house_number;
            console.log("house_number", house_number);
            var start_timestamp = parseInt(startTimedata.getTime() / 1000) ;
            var end_timestamp = parseInt(endTimedata.getTime() / 1000) ;
            axios.get('http://182.92.99.82:8081/fsims/user/query/sensor/waterquality', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('waterQuality:', res.data)
                if (res.data.statusCode == 200) {
                    this.waterQulityTimes = res.data.data.infos
                    this.$toast.add({ severity: 'success', summary: '查询成功', detail: '请查看', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', summary: '查询失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        showslaughterShop() {
            console.log("test:", this.slaughterShopTime)
            var data = this.slaughterShopTime;
            let slaughterShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
                key => {
                    let name = this.shopDataMappings[key];
                    let value = data[key];
                    let max;
                    let min;
                    let state;
                    if (typeof (value) === 'number') {
                        max = this.shopDataMax[key];
                        min = this.shopDataMIN[key];
                        if (typeof (max) === 'number' && typeof (min) === 'number') {
                            state = (value >= min && value <= max) ? 1 : 2;
                        } else if (typeof max === 'number') {
                            // 如果只有最大值，进行最大值比较
                            state = (value <= max) ? 1 : 2;
                        } else if (typeof min === 'number') {
                            // 如果只有最小值，进行最小值比较
                            state = (value >= min) ? 1 : 2;
                        }
                    }
                    return { name, value, max, min, state };
                }
            )
            this.slaughterShopData = slaughterShopData;
        },
        showdivShop() {
            console.log("test:", this.divShopTime)
            var data = this.divShopTime;
            let divShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
                key => {
                    let name = this.shopDataMappings[key];
                    let value = data[key];
                    let max;
                    let min;
                    let state;
                    if (typeof (value) === 'number') {
                        max = this.shopDataMax[key];
                        min = this.shopDataMIN[key];
                        if (typeof (max) === 'number' && typeof (min) === 'number') {
                            state = (value >= min && value <= max) ? 1 : 2;
                        } else if (typeof max === 'number') {
                            // 如果只有最大值，进行最大值比较
                            state = (value <= max) ? 1 : 2;
                        } else if (typeof min === 'number') {
                            // 如果只有最小值，进行最小值比较
                            state = (value >= min) ? 1 : 2;
                        }
                    }
                    return { name, value, max, min, state };
                }
            )
            this.divShopData = divShopData;
        },
        showacidShop() {
            console.log("test:", this.acidShopTime)
            var data = this.acidShopTime;
            let acidShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
                key => {
                    let name = this.shopDataMappings[key];
                    let value = data[key];
                    let max;
                    let min;
                    let state;
                    if (typeof (value) === 'number') {
                        max = this.shopDataMax[key];
                        min = this.shopDataMIN[key];
                        if (typeof (max) === 'number' && typeof (min) === 'number') {
                            state = (value >= min && value <= max) ? 1 : 2;
                        } else if (typeof max === 'number') {
                            // 如果只有最大值，进行最大值比较
                            state = (value <= max) ? 1 : 2;
                        } else if (typeof min === 'number') {
                            // 如果只有最小值，进行最小值比较
                            state = (value >= min) ? 1 : 2;
                        }
                    }
                    return { name, value, max, min, state };
                }
            )
            this.acidShopData = acidShopData;
        },
        showfrozenShop() {
            console.log("test:", this.frozenShopTime)
            var data = this.frozenShopTime;
            let frozenShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
                key => {
                    let name = this.shopDataMappings[key];
                    let value = data[key];
                    let max;
                    let min;
                    let state;
                    if (typeof (value) === 'number') {
                        max = this.shopDataMax[key];
                        min = this.shopDataMIN[key];
                        if (typeof (max) === 'number' && typeof (min) === 'number') {
                            state = (value >= min && value <= max) ? 1 : 2;
                        } else if (typeof max === 'number') {
                            // 如果只有最大值，进行最大值比较
                            state = (value <= max) ? 1 : 2;
                        } else if (typeof min === 'number') {
                            // 如果只有最小值，进行最小值比较
                            state = (value >= min) ? 1 : 2;
                        }
                    }
                    return { name, value, max, min, state };
                }
            )
            this.frozenShopData = frozenShopData;
        },
        showwaterQulity() {
            console.log("test:", this.waterQulityTime)
            var data = this.waterQulityTime;
            let slaughter_water_micro_index = Object.keys(data.slaughter_water_micro_index).map(
                key => {
                    let name = this.waterQualityDataMappings[key] || 'Unknown';
                    let value = data.slaughter_water_micro_index[key];
                    let normal = this.waterQualityDataMAX[key];
                    let state = 1;
                    if (value >= normal) {
                        state = 2;
                    }
                    return { name, value, normal, state };
                }
            )
            let oap_gci_sla = Object.keys(data.oap_gci_sla).map(
                key => {
                    let name = this.waterQualityDataMappings[key] || 'Unknown';
                    let value = data.oap_gci_sla[key];
                    let normal = this.waterQualityDataMAX[key];
                    let state = 1;
                    if (value >= normal) {
                        state = 2;
                    }
                    return { name, value, normal, state };
                }
            )
            let toxin_index_sla = Object.keys(data.toxin_index_sla).filter(key => this.waterQualityDataMappings[key]).map(
                key => {
                    let name = this.waterQualityDataMappings[key] || 'Unknown';
                    let value = data.toxin_index_sla[key];
                    let normal = this.waterQualityDataMAX[key];
                    let state = 1;
                    if (value >= normal) {
                        state = 2;
                    }
                    return { name, value, normal, state };
                }
            )
            //console.log("test:",res.data.data.infos[len - 1].toxin_index_sla.slaughter_water_toxin_index)
            let slaughter_water_toxin_index = Object.keys(data.toxin_index_sla.slaughter_water_toxin_index).map(
                key => {
                    let name = this.waterQualityDataMappings[key] || 'Unknown';
                    let value = data.toxin_index_sla.slaughter_water_toxin_index[key];
                    let normal = this.waterQualityDataMAX[key];
                    let state = 1;
                    if (value >= normal) {
                        state = 2;
                    }
                    return { name, value, normal, state };
                }
            )
            this.waterQulityData[0].data = slaughter_water_micro_index;
            this.waterQulityData[1].data = oap_gci_sla;
            this.waterQulityData[2].data = toxin_index_sla;
            this.waterQulityData[3].data = slaughter_water_toxin_index;
        },

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
        const data = this.$route.query.data;

        const dataObject = JSON.parse(data)
        console.log("数据", dataObject)
        this.startTime = dataObject.start_time
        this.endTime = dataObject.end_time
        this.house_number = dataObject.house_number
        this.pid = dataObject.pid
        this.next_pid = dataObject.next_pid
        EventBus.on('language-change', this.languageChangeListener);
        this.getShopData();
        this.getWaterQulityData();
        this.getLight();
        this.getProduct();

        this.nodeService.getShopDataMap().then(data => this.shopDataMappings = data);
        this.nodeService.getShopDataMAX().then(data => this.shopDataMax = data);
        this.nodeService.getShopDataMIN().then(data => this.shopDataMIN = data);
        this.nodeService.getwaterQualityDataMap().then(data => this.waterQualityDataMappings = data);
        this.nodeService.getwaterQualityDataMAX().then(data => this.waterQualityDataMAX = data);

    },
    computed: {

    },
    created() {
        this.nodeService = new NodeService();
    }
}
</script>
      
<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
}

.lable_title {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
}

.lable_text {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
}

.lable_status {
    color: darkseagreen;
    font-weight: 500;
    text-align: center;
    font-size: x-large;
}

.env_title {
    font-weight: bold;
    text-align: center;
    font-size: large;
}

.env_text {
    font-weight: bold;
    text-align: center;
    font-size: large;
}
</style>
  <!-- <script setup>
  import { ref } from "vue";
  
  const value = ref(40);
  </script> -->