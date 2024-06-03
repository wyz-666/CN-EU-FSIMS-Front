<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-12">
                    <div class="card">
                        <DataTable v-model:expandedRows="expandedRows" :value="notifications" responsiveLayout="scroll"
                        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" scrollable scrollHeight="40vh"
                            tableStyle="min-width: 100rem" scrollDirection="both">
                            <template #header>
                                <div class="table-header-container">
                                    <span v-if="flag"  style="font-size: xx-large;">通知详情</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <!-- <Column expander :headerStyle="{ 'width': '3rem' }" /> -->
                            <Column expander="true" headerStyle="width: 3rem" />
                            <Column v-if="flag" field="source_name" header="来源" style="min-width: 200px"></Column>
                            <Column v-else field="source_name" header="From"></Column>
                            <!-- <Column v-if="flag" field="pid" header="产品阶段标识"></Column>
                        <Column v-else field="pid" header="PID"></Column> -->
                            <Column v-if="flag" field="content" header="内容"></Column>
                            <Column v-else field="content" header="Content"></Column>
                            <Column v-if="flag" field="event_time" header="事件时间"></Column>
                            <Column v-else field="event_time" header="EventTime"></Column>
                            <Column v-if="flag" field="notice_time" header="通知时间" sortable></Column>
                            <Column v-else field="notice_time" header="NoticeTime"></Column>
                            <Column v-if="flag" field="proposal" header="详情"></Column>
                            <Column v-else field="proposal" header="Content"></Column>
                            <Column v-if="flag" field="state" header="Proposal" sortable>
                                <template #body="rowData">
                                    <div v-if="rowData.data.risk_level === 1">
                                        <Tag class="mr-2" severity="primary" :value="'正常'"
                                            style="font-size: 14px; padding: 8px 10px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.risk_level === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="warning" :value="'中度'"
                                                style="font-size: 14px; padding: 8px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.risk_level === 3">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="danger" :value="'严重'"
                                                style="font-size: 14px; padding: 8px 10px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="state"></Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button @click="read(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info"
                                            style="font-size: 12px; padding: 10px 12px;">阅读</button>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="primary" :value="'已读'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <template #expansion="rowData">
                                <div class="orders-subtable">
                                    <DataTable :value="rowData.data.affected">
                                        <Column field="batch_number" header="批次编号" sortable></Column>
                                        <Column field="state" header="状态" sortable>
                                            <template #body="rowData">
                                                <div v-if="rowData.data.state === 1">
                                                    <Tag class="mr-2" severity="primary" :value="'进行中'"
                                                        style="font-size: 10px; padding: 6px 8px;"></Tag>
                                                </div>
                                                <div v-else-if="rowData.data.state === 2">
                                                    <div class="flex flex-wrap gap-2">
                                                        <Tag class="mr-2" severity="success" :value="'已结束'"
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


            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
    
<script>
import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
// import router from '../router'
import axios from 'axios';
import qs from 'qs'
// import * as XLSX from 'xlsx';
export default {
    data() {
        return {

            currentTime: '',
            username: localStorage.getItem("account"),
            uuid: localStorage.getItem("uuid"),
            lan: this.$store.state.language,
            flag: true,
            notifications: '',
            expandedRows:[]



        }
    },
    methods: {

        updateTime() {
            const now = new Date();
            // 格式化时间
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            // 更新 currentTime 数据
            this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },

        getNotification() {
            axios.get('http://182.92.99.82:8081/fsims/user/getnotification', { params: { uuid: this.uuid } }).then(res => {
                console.log('notification:', res.data)
                let data = res.data.data.notifications
                for(let i=0;i<data.length;i++){
                    let result = data[i].proposal.replace(/\[(.*?)\];?/g, '$1, ');
                    data[i].proposal = result.slice(0, -2)+'超标';
                }
                this.notifications = res.data.data.notifications
            })
        },
        read(data){
            console.log("id:",data.id)
            var id = data.id
            axios.post('http://182.92.99.82:8081/fsims/user/readnotification', qs.stringify({ id }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("send:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '已读', detail: '通知已阅读', life: 3000 });
                    this.getNotification();
                } else {
                    this.$toast.add({ severity: 'error', summary: '通知阅读失败', detail: res.data.message, life: 3000 });
                }
            })
        }
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

        this.getNotification();
        EventBus.on('language-change', this.languageChangeListener);
        this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        setInterval(this.updateTime, 1000);
    },

    computed: {
        slaughterhouse() {
            return this.lan === 'CN' ? this.slaughterhouseCN : this.slaughterhouseEN;
        }
    },
    created() {
        this.monitorService = new MonitorService();
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