<template>
    <div class="grid">
        <div class="col-12 xl:col-8">
            <div class="card">
                <div class="grid">
                    <div class="col-2">
                        <h5 v-if="lan == 'CN'">牧场情况</h5>
                        <h5 v-else>Pasture situation</h5>
                    </div>
                </div>
                <TabView>
                    <TabPanel :header="lan === 'CN' ? '饲料重金属' : 'create procedure'">
                        <DataTable v-model:expandedRows="expandedRows" :value="feedHeavyMetal" responsiveLayout="scroll"
                            scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
                                                        style="font-size: 10px; padding: 6px 8px;"></Tag>
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
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '饲料毒素农药残留' : 'create procedure'">
                        <DataTable v-model:expandedRows="expandedRows" :value="feedMycotoxins" responsiveLayout="scroll"
                            scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
                                                        style="font-size: 10px; padding: 6px 8px;"></Tag>
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
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '牧场饮用水' : 'create procedure'">
                        <DataTable v-model:expandedRows="expandedRows" :value="waterRecord" responsiveLayout="scroll"
                            scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
                                                        style="font-size: 10px; padding: 6px 8px;"></Tag>
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
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '牧场基本环境' : 'create procedure'">
                        <DataTable v-model:expandedRows="expandedRows" :value="environment" responsiveLayout="scroll"
                            scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
                                                        style="font-size: 10px; padding: 6px 8px;"></Tag>
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
                    </TabPanel>
                </TabView>
            </div>

        </div>

        <div class="col-12 xl:col-4">
            <div class="card">
                <h5 v-if="lan == 'CN'">牧场消毒记录</h5>
                <h5 v-else>Work clothes disinfection record</h5>
                <!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

                <DataTable :value="disinfectionRecord" :scrollable="true" scrollHeight="400px" :loading="loading2"
                    scrollDirection="both" class="mt-3">
                    <Column field="time_record_at" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }">
                    </Column>
                    <Column field="farm_dis_record_1" :header="lan === 'CN' ? '牧场消毒时间' : 'Date'"
                        :style="{ width: '200px' }"></Column>
                    <Column field="farm_dis_record_2" :header="lan === 'CN' ? '消毒剂种类' : 'Method'"
                        :style="{ width: '200px' }">
                    </Column>
                    <Column field="farm_dis_record_3" :header="lan === 'CN' ? '消毒剂浓度' : 'Concentration'"
                        :style="{ width: '200px' }"></Column>
                </DataTable>
            </div>
        </div>





    </div>
</template>

<script>

import EventBus from '../AppEventBus';
import axios from 'axios';

// import ProductService from '../service/ProductService';
import NodeService from '../service/NodeService'
// import MonitorService from '../service/MonitorService';
// const expandedKeys = ref({});
export default {
    data() {
        return {





            // add:
            lan: this.$store.state.language,
            flag: true,
            treeTableValue: null,
            nodeService: null,
            monitorService: null,
            cloth: null,
            startTime: '',
            endTime: '',
            radarOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057',
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            },

            
            feedHeavyMetalMappings: '',
            feedHeavyMetalNormal: '',
            feedMycotoxinsMappings: '',
            feedMycotoxinsNormal: '',
            waterRecordMappings: '',
            waterRecordNormal: '',
            environmentMappings: '',
            environmentNormal: '',
            feedHeavyMetal: [
                {
                    project: "砷元素",
                    data: ''
                },
                {
                    project: "铅元素",
                    data: ''
                },
                {
                    project: "镉元素",
                    data: ''
                },
                {
                    project: "铬元素",
                    data: ''
                },
            ],
            feedMycotoxins: [
                {
                    project: "黄曲霉毒素B1",
                    data: ''
                },
                {
                    project: "玉米赤霉烯酮",
                    data: ''
                },
                {
                    project: "脱氧雪腐镰刀菌烯醇（呕吐毒素）",
                    data: ''
                },
                {
                    project: "T-2毒素 伏马毒素 赭曲霉毒素A",
                    data: ''
                },
            ],
            waterRecord: [
                {
                    project: "感官性状和一般化学指标",
                    data: ''
                },
                {
                    project: "毒理性指标",
                    data: ''
                },
                {
                    project: "微生物指标",
                    data: ''
                },
            ],
            environment: [
                {
                    project: "基本环境",
                    data: ''
                },
                {
                    project: "缓冲区",
                    data: ''
                },
                {
                    project: "场区",
                    data: ''
                },
                {
                    project: "牛舍",
                    data: ''
                },
                {
                    project: "垫料",
                    data: ''
                },

            ],
            expandedRows: [],
            disinfectionRecord: [],






            // end
            products: null,
            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4
                    },
                    {
                        label: 'Sales',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        backgroundColor: '#00bb7e',
                        borderColor: '#00bb7e',
                        tension: 0.4
                    }
                ]
            },
            items: [
                { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                { label: 'Remove', icon: 'pi pi-fw pi-minus' }
            ],
            lineOptions: null,
        }
    },
    productService: null,
    themeChangeListener: null,
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
        EventBus.on('language-change', this.languageChangeListener);
        this.getDisinfection();
        // this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        this.getPastureData();
        // this.nodeService.getTreeNodes().then(data => this.treeValue = data);
        this.nodeService.getFeedHeavyMetalMap().then(data => this.feedHeavyMetalMappings = data);
        this.nodeService.getFeedHeavyMetalNormal().then(data => this.feedHeavyMetalNormal = data);
        this.nodeService.getFeedMycotoxinsMap().then(data => this.feedMycotoxinsMappings = data);
        this.nodeService.getFeedMycotoxinsNormal().then(data => this.feedMycotoxinsNormal = data);
        this.nodeService.getwaterRecordMap().then(data => this.waterRecordMappings = data);
        this.nodeService.getwaterRecordNormal().then(data => this.waterRecordNormal = data);
        this.nodeService.getenvironmentMap().then(data => this.environmentMappings = data);
        this.nodeService.getenvironmentNormal().then(data => this.environmentNormal = data);
        
    },
    beforeUnmount() {
        EventBus.off('change-theme', this.themeChangeListener);
    },
    created() {  
        this.nodeService = new NodeService();
    },
    
    methods: {
        getDisinfection() {
            var house_number = localStorage.getItem("house_number");
            console.log("house_number", house_number);
            // 获取当前时间的秒级时间戳
            //let end_timestamp = Math.floor(new Date().getTime() / 1000);
            var endTimedata = new Date(this.endTime)
            var end_timestamp = parseInt(endTimedata.getTime() / 1000)+(8 * 60 * 60);
            // 获取当前时间前一天的秒级时间戳
            let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
            let start_timestamp = end_timestamp - oneDayInSeconds;
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/disinfectionrecord', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                if (res.data.statusCode == 200) {
                    console.log('disinfectionRecord:', res.data)
                    this.disinfectionRecord = res.data.data.pasture_disinfection_records
                    //let len = res.data.data.count;
                }

            })
        },

        getPastureData() {
            console.log("startTimedata:",this.startTime)
            var startTimedata = new Date(this.startTime)
            var endTimedata = new Date(this.endTime)
            console.log("startTime:", startTimedata.getTime());
            console.log("endTime:", endTimedata.getTime());
            // console.log("test:",this.feedHeavyMetalMappings)
            var house_number = this.house_number;
            console.log("house_number", house_number);
            var start_timestamp = parseInt(startTimedata.getTime() / 1000)+(8 * 60 * 60);
            var end_timestamp = parseInt(endTimedata.getTime() / 1000)+(8 * 60 * 60);
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/heavymetal', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('heavymetal:', res.data)
                let len = res.data.data.feed_heavy_metal_records.length
                let feed_as_info = Object.keys(res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_as_info).map(
                    key => {
                        let name = this.feedHeavyMetalMappings[key] || 'Unknown';
                        let value = res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_as_info[key];
                        let normal = this.feedHeavyMetalNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let feed_pb_info = Object.keys(res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_pb_info).map(
                    key => {
                        let name = this.feedHeavyMetalMappings[key] || 'Unknown';
                        let value = res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_pb_info[key];
                        let normal = this.feedHeavyMetalNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let feed_cd_info = Object.keys(res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_cd_info).map(
                    key => {
                        let name = this.feedHeavyMetalMappings[key] || 'Unknown';
                        let value = res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_cd_info[key];
                        let normal = this.feedHeavyMetalNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let feed_cr_info = Object.keys(res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_cr_info).map(
                    key => {
                        let name = this.feedHeavyMetalMappings[key] || 'Unknown';
                        let value = res.data.data.feed_heavy_metal_records[len - 1].pasture_feed_cr_info[key];
                        let normal = this.feedHeavyMetalNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.feedHeavyMetal[0].data = feed_as_info;
                this.feedHeavyMetal[1].data = feed_pb_info;
                this.feedHeavyMetal[2].data = feed_cd_info;
                this.feedHeavyMetal[3].data = feed_cr_info
            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/mycotoxins', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('mycotoxins:', res.data)
                let len = res.data.data.feed_mycotoxins_records.length
                let afb_1 = Object.keys(res.data.data.feed_mycotoxins_records[len - 1].afb_1).map(
                    key => {
                        let name = this.feedMycotoxinsMappings[key] || 'Unknown';
                        let value = res.data.data.feed_mycotoxins_records[len - 1].afb_1[key];
                        let normal = this.feedMycotoxinsNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let don = Object.keys(res.data.data.feed_mycotoxins_records[len - 1].don).map(
                    key => {
                        let name = this.feedMycotoxinsMappings[key] || 'Unknown';
                        let value = res.data.data.feed_mycotoxins_records[len - 1].don[key];
                        let normal = this.feedMycotoxinsNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let t2Toxin = Object.keys(res.data.data.feed_mycotoxins_records[len - 1].t2Toxin).map(
                    key => {
                        let name = this.feedMycotoxinsMappings[key] || 'Unknown';
                        let value = res.data.data.feed_mycotoxins_records[len - 1].t2Toxin[key];
                        let normal = this.feedMycotoxinsNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let t_2_vom_zea = Object.keys(res.data.data.feed_mycotoxins_records[len - 1].t_2_vom_zea).map(
                    key => {
                        let name = this.feedMycotoxinsMappings[key] || 'Unknown';
                        let value = res.data.data.feed_mycotoxins_records[len - 1].t_2_vom_zea[key];
                        let normal = this.feedMycotoxinsNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.feedMycotoxins[0].data = afb_1;
                this.feedMycotoxins[1].data = don;
                this.feedMycotoxins[2].data = t2Toxin;
                this.feedMycotoxins[3].data = t_2_vom_zea
            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/waterrecord', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('waterrecord:', res.data)
                let len = res.data.data.pasture_water_records.length
                let oap_gci = Object.keys(res.data.data.pasture_water_records[len - 1].oap_gci).map(
                    key => {
                        let name = this.waterRecordMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_water_records[len - 1].oap_gci[key];
                        let normal = this.waterRecordNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let tox_index = Object.keys(res.data.data.pasture_water_records[len - 1].tox_index).map(
                    key => {
                        let name = this.waterRecordMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_water_records[len - 1].tox_index[key];
                        let normal = this.waterRecordNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                let micro_index = Object.keys(res.data.data.pasture_water_records[len - 1].micro_index).map(
                    key => {
                        let name = this.waterRecordMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_water_records[len - 1].micro_index[key];
                        let normal = this.waterRecordNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )

                this.waterRecord[0].data = oap_gci;
                this.waterRecord[1].data = tox_index;
                this.waterRecord[2].data = micro_index;

            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/basicenvironment', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('basicenvironment:', res.data)
                let len = res.data.data.pasture_basic_environment_records.length
                let basicenvironment = Object.keys(res.data.data.pasture_basic_environment_records[len - 1]).filter(key => this.environmentMappings[key]).map(
                    key => {
                        let name = this.environmentMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_basic_environment_records[len - 1][key];
                        let normal = this.environmentNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.environment[0].data = basicenvironment;

            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/buffer', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('buffer:', res.data)
                let len = res.data.data.pasture_buffer_records.length
                let buffer = Object.keys(res.data.data.pasture_buffer_records[len - 1]).map(
                    key => {
                        let name = this.environmentMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_buffer_records[len - 1][key];
                        let normal = this.environmentNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.environment[1].data = buffer;

            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/area', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('area:', res.data)
                let len = res.data.data.pasture_area_records.length
                let area = Object.keys(res.data.data.pasture_area_records[len - 1]).map(
                    key => {
                        let name = this.environmentMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_area_records[len - 1][key];
                        let normal = this.environmentNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.environment[2].data = area;

            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/cowhouse', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('cowhouse:', res.data)
                let len = res.data.data.pasture_cow_house_records.length
                let cowhouse = Object.keys(res.data.data.pasture_cow_house_records[len - 1]).map(
                    key => {
                        let name = this.environmentMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_cow_house_records[len - 1][key];
                        let normal = this.environmentNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.environment[3].data = cowhouse;

            })
            axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/paddingrequire', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
                console.log('paddingrequire:', res.data)
                let len = res.data.data.pasture_padding_require_records.length
                let paddingrequire = Object.keys(res.data.data.pasture_padding_require_records[len - 1]).map(
                    key => {
                        let name = this.environmentMappings[key] || 'Unknown';
                        let value = res.data.data.pasture_padding_require_records[len - 1][key];
                        let normal = this.environmentNormal[key];
                        let state = 1;
                        if (value >= normal) {
                            state = 2;
                        }
                        return { name, value, normal, state };
                    }
                )
                this.environment[4].data = paddingrequire;

            })

        }

        
    }
}
</script>