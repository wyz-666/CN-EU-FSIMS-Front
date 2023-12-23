<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-12">
                    <div class="grid">
                        <div class="col-2">
                            <p v-if="lan == 'CN'"
                                style="font-size: xx-large;font-weight: bold;text-align: center;margin-top: 10%;;margin-left: 10%;">
                                {{ house }}
                            </p>
                            <p v-else style="font-size: x-large;font-weight: bold;text-align: center;">A SlaughterHouse
                            </p>
                        </div>
                        <div class="col-3 col-offset-2">
                            <div class="card mb-0 " style="height:10vh;">
                                <p style="font-size: xx-large;font-weight: bold;text-align: center;">{{ currentTime }}
                                </p>
                            </div>
                        </div>
                        <div class="col-1 col-offset-3">
                            <p v-if="lan == 'CN'" style="font-size: large;text-align: center;margin-top: 40%;">
                                {{ username }}
                            </p>
                            <p v-else style="font-size: large;text-align: center;">{{ username }}
                            </p>
                        </div>
                        <div class="col-1">
                            <!-- <p v-if="lan == 'CN'" style="font-size: large;text-align: center;margin-top: 40%;">退出登录
                            </p>
                            <p v-else style="font-size: large;text-align: center;">log out
                            </p> -->
                            <Button v-if="lan == 'CN'" label="退出登录" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                            <Button v-else label="log out" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                        </div>
                    </div>
                </div>
                <div class="col-3 ">
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
                                <div class="flex align-items-center justify-content-center bg-red-100 border-round"
                                    style="width:3rem;height:3rem">
                                    <i class="pi pi-exclamation-circle text-xl"></i>
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
                </div>
                <div class="col-12">
                    <div class="card" style="height: 50vh">
                        <DataTable :value="receive" scrollable scrollHeight="30vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">入场确认</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column v-if="flag" field="cow_number" header="牛编号"></Column>
                            <Column v-else field="cow_number" header="Number"></Column>
                            <Column v-if="flag" field="source_name" header="来源地"></Column>
                            <Column v-else field="source_name" header="Source"></Column>
                            <Column v-if="flag" field="operator" header="操作人"></Column>
                            <Column v-else field="operator" header="Operator"></Column>
                            <Column v-if="flag" field="receive_time" header="发送时间"></Column>
                            <Column v-else field="receive_time" header="Source"></Column>
                            <Column v-if="flag" field="confirm_time" header="确认时间"></Column>
                            <Column v-else field="confirm_time" header="Source"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="info" :value="'发送中'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已接收'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 3">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="danger" :value="'屠宰中'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 4">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="warning" :value="'已屠宰'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="State">
                            </Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button @click="confirmReceive(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info">确认接收</button>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <Toast />
                                        <Button @click="newSlaughterBatch(rowData.data)" label="Success"
                                            class="p-button-rounded p-button-success">开始屠宰</button>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card" style="height: 50vh">
                        <DataTable :value="slaughterBatch" scrollable scrollHeight="40vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">屠宰线</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column v-if="flag" field="batch_number" header="批次编号"></Column>
                            <Column v-else field="batch_number" header="Batch"></Column>
                            <Column v-if="flag" field="worker" header="操作人"></Column>
                            <Column v-else field="worker" header="type"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="danger" :value="'屠宰中'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已完成'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="state"></Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button @click="passBatch(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info">商品生产</button>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card" style="height: 50vh">
                        <div class="grid">
                            <TabView>
                                <TabPanel :header="lan === 'CN' ? '生产商品' : 'newProduct'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="batch_number" style="font-size: 18px; "
                                                class="mr-2">批次编号</label>
                                            <label v-else for="batch_number" font-size="x-large"
                                                class="mr-2">batch_number</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="batch_number" v-model="batch_number"
                                                size="large" style="font-size: large; text-align: left;"
                                                placeholder="阶段编号" />
                                            <InputText v-else id="batch_number" v-model="batch_number" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input batch_number" />
                                        </div>

                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="type" style="font-size: 18px;"
                                                class="mr-2">类型</label>
                                            <label v-else for="type" font-size="x-large" class="mr-2">type</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 10px;">
                                            <div class="flex flex-wrap gap-3">
                                                <div class="flex align-items-center">
                                                    <RadioButton v-model="product" inputId="product1" name="product1"
                                                        value=1 />
                                                    <label for="product1" class="ml-2">牛肉</label>
                                                </div>
                                                <div class="flex align-items-center">
                                                    <RadioButton v-model="product" inputId="product2" name="product2"
                                                        value=2 />
                                                    <label for="product2" class="ml-2">牛筋</label>
                                                </div>
                                                <div class="flex align-items-center">
                                                    <RadioButton v-model="product" inputId="product3" name="product3"
                                                        value=3 />
                                                    <label for="product3" class="ml-2">牛肚</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="weight" style="font-size: 18px;"
                                                class="mr-2">重量</label>
                                            <label v-else for="weight" font-size="x-large" class="mr-2">weight</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="weight" v-model="weight" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入重量" />
                                            <InputText v-else id="weight" v-model="weight" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input weight" />
                                        </div>
                                    </div>
                                    <Button :label="lan === 'CN' ? '生产' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" @click="newProduct" />
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '屠宰结束' : 'commit'">
                                    <div class="col-12">
                                        <label v-if="lan == 'CN'" for="batch_number" font-size=18px
                                            class="mr-2">批次编号</label>
                                        <label v-else for="batch_number" font-size="x-large" class="mr-2">Batch</label>
                                        <InputText v-if="lan == 'CN'" id="batch_number" v-model="batch_number" size="large"
                                            placeholder="请输入批次编号" />
                                        <InputText v-else id="batch_number" v-model="batch_number" size="large"
                                            placeholder="please input batch_number" />
                                    </div>
                                    <div class="col-12">
                                        <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                                            @uploader="myUploader" accept=".xlsx" :maxFileSize="1000000">
                                            <template #empty>
                                                <p>请上传数据文件(.xlsx)</p>
                                            </template>
                                        </FileUpload>
                                    </div>
                                    <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info"
                                        style="margin-top: 20px; margin-left: 30%;" @click="EndSlaughter"/>
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '出库' : 'sendtonext'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="product_number" style="font-size: 18px; "
                                                class="mr-2">产品编号</label>
                                            <label v-else for="product_number" font-size="x-large" class="mr-2">product_number</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="product_number" v-model="product_number" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入产品编号" />
                                            <InputText v-else id="cow_number" v-model="cow_number" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input pre_pid" />
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 35px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">目的地</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 30px;">
                                            <span class="p-float-label">
                                                <Dropdown id="dropdown" v-model="destination" :options="packhouse"
                                                    optionLabel="name" style="width: 50%;" />
                                                <label for="dropdown">包装厂</label>
                                            </span>
                                        </div>
                                    </div>
                                    <Button :label="lan === 'CN' ? '出库' : 'View Details'" severity="info"
                                        style="margin-top: 20%; margin-left: 30%;" @click="send" />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card" style="height: 50vh">
                        <DataTable :value="warehouse" scrollable scrollHeight="30vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">仓库</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column v-if="flag" field="product_number" header="产品编号"></Column>
                            <Column v-else field="product_number" header="Number"></Column>
                            <Column v-if="flag" field="pid" header="阶段编号"></Column>
                            <Column v-else field="pid" header="PID"></Column>
                            <Column v-if="flag" field="destination" header="目的地"></Column>
                            <Column v-else field="destination" header="Destination"></Column>
                            <Column v-if="flag" field="type" header="类型"></Column>
                            <Column v-else field="type" header="Type"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Tag class="mr-2" severity="primary" :value="'已入库'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="warning" :value="'发送中'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 3">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已接收'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="State"></Column>
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
import router from '../router'
import axios from 'axios';
import qs from 'qs'
import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            currentTime: '',
            lan: this.$store.state.language,
            username: localStorage.getItem("account"),
            uuid: localStorage.getItem("uuid"),
            house: '',
            housenumber: '',
            flag: true,
            monitorService: null,
            warehouse: null,
            receive: null,
            slaughterBatch: null,
            batch_number: '',
            type: '',
            weight: '',
            product: 0,
            packhouse:null,
            destination: null,
            product_number:'',




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
        getHouse() {
            axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('res:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
        loginout() {
            router.push('/')
        },
        getReceive() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/receiverecords', { params: { house_number: house_number } }).then(res => {
                console.log('receiverecords:', res.data.data.records)
                this.receive = res.data.data.records
            })
        },
        getBatch() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/batches', { params: { house_number: house_number } }).then(res => {
                console.log('batches:', res.data.data.records)
                this.slaughterBatch = res.data.data.records
            })
        },
        getPackhouse() {
            axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/packagehouses').then(res => {
                console.log('packhouse:', res.data.data)
                this.packhouse = res.data.data.houses
            })
        },
        confirmReceive(data) {
            console.log("data", data.cow_number);
            var cow_number = data.cow_number;
            axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/receiveconfirm', qs.stringify({ cow_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("receiveConfirm:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '已接收', detail: '接收一头牛', life: 3000 });
                    this.getReceive();
                } else {
                    this.$toast.add({ severity: 'error', summary: '接收失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        newSlaughterBatch(data) {
            var house_number = localStorage.getItem("house_number")
            var worker = localStorage.getItem("account")
            var pre_pid = data.pid
            var cow_number = data.cow_number
            axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/newbatch', qs.stringify({ house_number, worker, pre_pid, cow_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("newbatch:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '批次已创建', detail: '开始屠宰', life: 3000 });
                    this.getBatch();
                    this.getReceive();
                } else {
                    this.$toast.add({ severity: 'error', summary: '批次创建失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        passBatch(data) {
            console.log("batch_number:", data.batch_number)
            this.batch_number = data.batch_number
        },
        newProduct() {
            var batch_number = this.batch_number
            var worker = localStorage.getItem("account")
            var house_number = localStorage.getItem("house_number")
            var type = this.product
            var weight = this.weight
            //console.log("test:",typeof(this.product))
            axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/newproduct', qs.stringify({ batch_number, worker, house_number, type, weight }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("newproduct:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '已生产', detail: '', life: 3000 });
                    this.getReceive();
                } else {
                    this.$toast.add({ severity: 'error', summary: '生产失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        myUploader(event) {
            const file = event.files && event.files[0];
            console.log(file)
            if (file) {
                // 使用 FileReader 读取文件内容
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const fileContent = e.target.result;

                    // 使用 xlsx 库解析 Excel 文件
                    const workbook = XLSX.read(fileContent, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    // 将 Excel 表格数据转换为 JSON 格式
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    console.log('JSON Data:', jsonData);
                    this.jsonData=jsonData;
                    // 在这里处理 JSON 数据
                };
                fileReader.readAsBinaryString(file);
                this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
            }
        },
        EndSlaughter(){
            var envir_temperature = this.jsonData[0][1];
            var envir_lighting = this.jsonData[1][1];
            var shock_voltage = this.jsonData[2][1];
            var bleeding_time = this.jsonData[3][1];
            var ele_shock_time = this.jsonData[4][1];
            var knife_disinfection_time = this.jsonData[5][1];
            console.log("pm_envir_temperature",envir_temperature)
            var batch_number = this.batch_number
            var worker = localStorage.getItem('account')
            var house_number = localStorage.getItem('house_number')
            axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/endbatch', 
            qs.stringify({ 
                batch_number, 
                worker, 
                house_number,  
                envir_temperature, 
                envir_lighting, 
                shock_voltage,
                bleeding_time,
                ele_shock_time,
                knife_disinfection_time
            }), 
                {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("send:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '屠宰结束', detail: '已入库', life: 3000 });
                    this.getBatch();
                    this.getReceive();
                    this.getWarehouse();
                } else {
                    this.$toast.add({ severity: 'error', summary: '屠宰数据上传失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        getWarehouse() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/warehouserecords', { params: { house_number: house_number } }).then(res => {
                console.log('warehouserecords:', res.data)
                this.warehouse = res.data.data.records
            })
        },
        send() {
            console.log("destination", this.destination)
            console.log("product_number", this.product_number)
            console.log("packdata", this.destination.house_number)
            var product_number = this.product_number
            var operator = localStorage.getItem('account')
            var package_house_number = this.destination.house_number
            axios.post('http://127.0.0.1:8000/fsims/slaughteroperator/send', qs.stringify({ product_number, operator, package_house_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("send:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '已出库', detail: '发送至包装厂', life: 3000 });
                    this.getWarehouse();
                } else {
                    this.$toast.add({ severity: 'error', summary: '出库失败', detail: res.data.message, life: 3000 });
                }
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
        this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        setInterval(this.updateTime, 1000);
        this.getHouse();
        this.getReceive();
        this.getBatch();
        this.getWarehouse();
        this.getPackhouse();
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