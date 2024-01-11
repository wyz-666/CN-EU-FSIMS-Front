<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-12 xl:col-12 title">
                    <h2>预警通知</h2>
                </div>
                <div class="col-12">
                    <div class="card">
                        <DataTable v-model:value="notifications" responsiveLayout="scroll">
                            <template #header>
                                <div class="table-header-container">
                                    <span v-if="flag" class="text-xl text-900 font-bold">通知列表</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column expander :headerStyle="{ 'width': '3rem' }" />
                            <Column v-if="flag" field="source_name" header="来源"></Column>
                            <Column v-else field="source_name" header="HouseNumber"></Column>
                            <Column v-if="flag" field="event_time" header="时间"></Column>
                            <Column v-else field="event_time" header="Time"></Column>
                            <Column v-if="flag" field="content" header="内容"></Column>
                            <Column v-else field="content" header="Content"></Column>
                            <Column v-if="flag" field="proposal" header="详情"></Column>
                            <Column v-else field="proposal" header="Type"></Column>
                            <Column v-if="flag" field="risk_level" header="状态" sortable>
                                <template #body="rowData">
                                    <div v-if="rowData.data.risk_level === 1">
                                        <Tag class="mr-2" severity="primary" :value="'正常'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.risk_level === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="warning" :value="'中度'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.risk_level === 3">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="danger" :value="'严重'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="risk_level" header="State"></Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button label="Info" class="p-button-rounded  p-button-info"
                                            style="font-size: 10px; padding: 8px 10px;">知悉</button>
                                    </div>
                                </template>
                            </Column>
                            <template #expansion="rowData">
                                <DataTable :value="rowData.data.affected">
                                    <Column field="batch_number" header="批次编号"></Column>
                                    <Column field="state" header="状态"></Column>
                                </DataTable>
                            </template>
                        </DataTable>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <DataTable v-model:expandedRows="expandedRows" :value="feeding" responsiveLayout="scroll"
                            @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" scrollable scrollHeight="40vh"
                            tableStyle="min-width: 100rem" scrollDirection="both">
                            <template #header>
                                <div class="table-header-container">
                                    <span v-if="flag" class="text-xl text-900 font-bold">饲养记录</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column expander :headerStyle="{ 'width': '3rem' }" />
                            <Column v-if="flag" field="batch_number" header="批次编号" style="min-width: 200px"></Column>
                            <Column v-else field="batch_number" header="Batch"></Column>
                            <!-- <Column v-if="flag" field="pid" header="产品阶段标识"></Column>
                        <Column v-else field="pid" header="PID"></Column> -->
                            <Column v-if="flag" field="worker" header="工人"></Column>
                            <Column v-else field="worker" header="Worker"></Column>
                            <Column v-if="flag" field="state" header="状态" sortable>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Tag class="mr-2" severity="primary" :value="'饲养中'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'饲养结束'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="state"></Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button @click="getBatchNumber(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info"
                                            style="font-size: 10px; padding: 8px 10px;">结束饲养</button>
                                    </div>
                                </template>
                            </Column>
                            <template #expansion="rowData">
                                <div class="orders-subtable">
                                    <DataTable :value="rowData.data.cows">
                                        <Column field="number" header="牛编号" sortable></Column>
                                        <Column field="age" header="年龄" sortable></Column>
                                        <Column field="weight" header="体重" sortable></Column>
                                    </DataTable>
                                </div>
                            </template>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import EventBus from '../AppEventBus'
import axios from "axios";
//   import qs from 'qs';
// import {onBeforeRouteLeave} from "vue-router";
// import {callback} from "chart.js/helpers";
//import router from '../router'
export default {

    data() {
        return {
            lan: this.$store.state.language,
            flag: true,
            layout: "grid",
            dataviewValue: null,
            value: null,
            username: '',
            notifications: '',
            feeding:'',


        }
    },


    

    methods: {
        getNotification() {
            var uuid = localStorage.getItem('uuid')
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/getnotification', { params: { uuid: uuid } }).then(res => {
                console.log('count:', res.data.data)
                var data = res.data.data.notifications
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var proposalString = data[i].proposal.replace(/\[|\]/g, '');
                    data[i].proposal = proposalString.replace(/;/g, ',') + '超标';
                }

                this.notifications = res.data.data.notifications

            })
        },
        getFeeding() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/getfeedingrecords', { params: { house_number: house_number } }).then(res => {
                console.log('feedingres:', res.data)
                this.feeding = res.data.data.feeding_batches
            })
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
        EventBus.on('language-change', this.languageChangeListener);
        this.getNotification();
        this.getFeeding();

    },
}

</script>
<style scoped lang="scss">
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

.custom-dropdown {
    width: 400px;
}

.title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
}
</style>