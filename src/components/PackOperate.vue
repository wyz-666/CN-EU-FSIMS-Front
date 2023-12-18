<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-12">
                    <div class="grid">
                        <div class="col-2">
                            <p v-if="lan == 'CN'" style="font-size: xx-large;font-weight: bold;text-align: center;">A包装厂
                            </p>
                            <p v-else style="font-size: x-large;font-weight: bold;text-align: center;">A Packing Factory
                            </p>
                        </div>
                        <div class="col-8">
                            <p style="font-size: xx-large;font-weight: bold;text-align: center;">{{ currentTime }}
                            </p>
                        </div>
                        <div class="col-1">
                            <p v-if="lan == 'CN'" style="font-size: medium;text-align: center;margin-top: 20%;">
                                packop123
                            </p>
                            <p v-else style="font-size: large;text-align: center;">packop123
                            </p>
                        </div>
                        <div class="col-1">
                            <p v-if="lan == 'CN'" style="font-size: medium;text-align: center;margin-top: 20%;">退出登录
                            </p>
                            <p v-else style="font-size: large;text-align: center;">log out
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-3">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日入场生牛数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">18</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:3rem;height:3rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日宰杀生牛数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">17</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:3rem;height:3rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日病牛数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">1</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:3rem;height:3rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">昨日存仓生牛数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">18</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                    style="width:3rem;height:3rem">
                                    <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="col-8">
                    <div class="card" style="height: 40vh">
                        <DataTable :value="receive" scrollable scrollHeight="30vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">入场确认</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column v-if="flag" field="product_number" header="产品编号"></Column>
                            <Column v-else field="product_number" header="Batch"></Column>
                            <Column v-if="flag" field="pre_pid" header="产品阶段标识"></Column>
                            <Column v-else field="pre_pid" header="Meat"></Column>
                            <Column v-if="flag" field="source" header="来源地"></Column>
                            <Column v-else field="source" header="Reason 1"></Column>
                            <Column v-if="flag" field="starttime" header="入场时间"></Column>
                            <Column v-else field="starttime" header="start time"></Column>
                            <Column v-if="flag" field="state" header="状态">

                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 0">
                                        <Button @click="handleButtonClick(rowData.data)"
                                            style="font-size: 12px; padding: 6px 10px;">确认接收</button>
                                    </div>
                                    <div v-else-if="rowData.data.state === 1">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已接收'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                </template>

                            </Column>
                            <Column v-else field="state" header="State">
                                <template #body="rowData">
                                    <div v-if="risk.data.state == 0">
                                        <button @click="confirmReceive(rowData.data)">确认接收</button>
                                    </div>
                                    <div v-else-if="risk.data.state == 1">
                                        已接收
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card" style="height: 40vh">
                        <div class="grid">
                            <TabView>
                                <TabPanel :header="lan === 'CN' ? '阶段创建' : 'create procedure'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="pre_pid" style="font-size: 18px; "
                                                class="mr-2">上一阶段</label>
                                            <label v-else for="pre_pid" font-size="x-large" class="mr-2">pre_pid</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="上一阶段编号" />
                                            <InputText v-else id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input pre_pid" />
                                        </div>

                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="type" style="font-size: 18px;"
                                                class="mr-2">类型</label>
                                            <label v-else for="type" font-size="x-large" class="mr-2">type</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入type" />
                                            <InputText v-else id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input type" />
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">数量</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入数量" />
                                            <InputText v-else id="number" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input number" />
                                        </div>
                                    </div>
                                    <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" />
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '数据提交' : 'commit'">
                                    <div class="col-12">
                                        <label v-if="lan == 'CN'" for="username" font-size=12px class="mr-2">数据文件</label>
                                        <label v-else for="username" font-size="x-large" class="mr-2">file</label>
                                        <InputText v-if="lan == 'CN'" id="username" v-model="username" size="large"
                                            placeholder="请拖入数据文件" />
                                        <InputText v-else id="username" v-model="username" size="large"
                                            placeholder="please input username" />
                                    </div>
                                    <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" />
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '入库' : 'inwarehouse'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="pre_pid" style="font-size: 18px; "
                                                class="mr-2">阶段编号</label>
                                            <label v-else for="pre_pid" font-size="x-large" class="mr-2">pre_pid</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="阶段编号" />
                                            <InputText v-else id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input pre_pid" />
                                        </div>

                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="type" style="font-size: 18px;"
                                                class="mr-2">类型</label>
                                            <label v-else for="type" font-size="x-large" class="mr-2">type</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入type" />
                                            <InputText v-else id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input type" />
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">数量</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入数量" />
                                            <InputText v-else id="number" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input number" />
                                        </div>
                                    </div>
                                    <Button :label="lan === 'CN' ? '入库' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" />
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '出库' : 'sendtonext'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="pre_pid" style="font-size: 18px; "
                                                class="mr-2">产品编号</label>
                                            <label v-else for="pre_pid" font-size="x-large" class="mr-2">pre_pid</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="产品编号" />
                                            <InputText v-else id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input pre_pid" />
                                        </div>

                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="type" style="font-size: 18px;"
                                                class="mr-2">类型</label>
                                            <label v-else for="type" font-size="x-large" class="mr-2">type</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入type" />
                                            <InputText v-else id="type" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input type" />
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">目的地</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="username" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入目的地" />
                                            <InputText v-else id="number" v-model="pre_pid" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input number" />
                                        </div>
                                    </div>
                                    <Button :label="lan === 'CN' ? '出库' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card" style="height: 40vh">
                        <DataTable :value="warehouse" scrollable scrollHeight="40vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">仓库</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column v-if="flag" field="product_number" header="产品编号"></Column>
                            <Column v-else field="product_number" header="Batch"></Column>
                            <Column v-if="flag" field="pre_pid" header="产品阶段标识"></Column>
                            <Column v-else field="pre_pid" header="Meat"></Column>
                            <Column v-if="flag" field="type" header="类型"></Column>
                            <Column v-else field="type" header="type"></Column>
                            <Column v-if="flag" field="destination" header="目的地"></Column>
                            <Column v-else field="destination" header="destination"></Column>
                            <Column v-if="flag" field="starttime" header="入库时间"></Column>
                            <Column v-else field="starttime" header="starttime"></Column>
                            <Column v-if="flag" field="leavetime" header="出库时间"></Column>
                            <Column v-else field="leavetime" header="leavetime"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 0">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'待发送'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 1">
                                        <div class="flex flex-wrap gap-2" >
                                            <Tag class="mr-2" severity="success" :value="'已送达'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>

                            <Column v-else field="state" header="state"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            currentTime: '',
            lan: this.$store.state.language,
            flag: true,
            value: 40,
            monitorService: null,
            warehouse: [
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛肚",
                    "destination": "上海盒马",
                    "starttime": "2023-12-15 00:22:50",
                    "leavetime": "2023-12-16 09:22:50",
                    "state": 1,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛腩",
                    "destination": "北京沃尔玛仓库",
                    "starttime": "2023-12-15 00:22:50",
                    "leavetime": "2023-12-16 09:22:50",
                    "state": 1,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛百叶",
                    "destination": "",
                    "starttime": "2023-12-15 00:22:50",
                    "leavetime": "",
                    "state": 0,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛肚",
                    "destination": "",
                    "starttime": "2023-12-15 00:22:50",
                    "leavetime": "",
                    "state": 0,
                },
            ],
            receive: [
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛肚",
                    "source": "A屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 0,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛百叶",
                    "source": "B屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 1,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛腩",
                    "source": "A屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 0,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛腩",
                    "source": "A屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 0,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛腩",
                    "source": "A屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 0,
                },
                {
                    "product_number": "1111",
                    "pre_pid": "1111",
                    "type": "牛腩",
                    "source": "A屠宰场",
                    "starttime": "2023-12-15 11:10:50",
                    "state": 0,
                }
            ],
            cloth: null,



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
}</style>