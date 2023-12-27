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
                            <p v-else style="font-size: x-large;font-weight: bold;text-align: center;">A Packing Factory
                            </p>
                        </div>
                        <div class="col-8">
                            <p style="font-size: xx-large;font-weight: bold;text-align: center;">{{ currentTime }}
                            </p>
                        </div>
                        <div class="col-1">
                            <p v-if="lan == 'CN'" style="font-size: medium;text-align: center;margin-top: 42%;">
                                {{ username }}
                            </p>
                            <p v-else style="font-size: large;text-align: center;">{{ username }}
                            </p>
                        </div>
                        <div class="col-1">
                            <Button v-if="lan == 'CN'" label="退出登录" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                            <Button v-else label="log out" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
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
                            <Column v-if="flag" field="product_number" header="产品编号"></Column>
                            <Column v-else field="product_number" header="Product_Number"></Column>
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
                                            <Tag class="mr-2" severity="danger" :value="'包装中'"
                                                style="font-size: 12px; padding: 6px 10px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 4">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="warning" :value="'已包装'"
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
                                        <Button @click="newPackBatch(rowData.data)" label="Success"
                                            class="p-button-rounded p-button-success">开始包装</button>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-7">
                    <div class="card" style="height: 50vh">
                        <DataTable :value="packBatch" scrollable scrollHeight="40vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">包装线</span>
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
                                            <Tag class="mr-2" severity="danger" :value="'包装中'"
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
                <div class="col-5">
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
                                            <label v-if="lan == 'CN'" for="pack_method" style="font-size: 18px;"
                                                class="mr-2">包装方式</label>
                                            <label v-else for="pack_method" font-size="x-large"
                                                class="mr-2">pack_method</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 10px;">
                                            <div class="flex flex-wrap gap-3">
                                                <div class="flex align-items-center">
                                                    <RadioButton v-model="pack_method" inputId="pack_method1"
                                                        name="pack_method1" value=1 />
                                                    <label for="pack_method1" class="ml-2">袋装</label>
                                                </div>
                                                <div class="flex align-items-center">
                                                    <RadioButton v-model="pack_method" inputId="pack_method2"
                                                        name="pack_method2" value=2 />
                                                    <label for="pack_method2" class="ml-2">盒装</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 10px;">
                                            <label v-if="lan == 'CN'" for="shelf_life" style="font-size: 18px;"
                                                class="mr-2">货架期</label>
                                            <label v-else for="shelf_life" font-size="x-large"
                                                class="mr-2">shelf_life</label>
                                        </div>
                                        <div class="col-12 xl:col-8">
                                            <InputText v-if="lan == 'CN'" id="shelf_life" v-model="shelf_life" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入货架期" />
                                            <InputText v-else id="shelf_life" v-model="shelf_life" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input shelf_life" />
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
                                <TabPanel :header="lan === 'CN' ? '包装结束' : 'commit'">
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
                                        style="margin-top: 20px; margin-left: 30%;" @click="EndPackage" />
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '运输预处理' : 'sendtonext'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 15px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">运输车</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 10px;">
                                            <span class="p-float-label">
                                                <Dropdown id="dropdown" v-model="vehicle" :options="vehicles"
                                                    optionLabel="license_number" style="width: 50%;" />
                                                <label for="dropdown">车牌号</label>
                                            </span>
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 15px;">
                                            <label v-if="lan == 'CN'" for="number" style="font-size: 18px;"
                                                class="mr-2">目的地</label>
                                            <label v-else for="number" font-size="x-large" class="mr-2">number</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 10px;">
                                            <span class="p-float-label">
                                                <Dropdown id="dropdown" v-model="destination" :options="mall"
                                                    optionLabel="name" style="width: 50%;" />
                                                <label for="dropdown">商场</label>
                                            </span>
                                        </div>
                                        <DataTable :value="readyProducts" scrollable scrollHeight="30vh"
                                        tableStyle="max-width: 40rem">
                                        <Column v-if="flag" field="number" header="预备产品编号"></Column>
                                        <Column v-else field="number" header="ReadyProducts"></Column>
                                    </DataTable>
                                    </div>
                                    <Button :label="lan === 'CN' ? '预处理' : 'View Details'" severity="info"
                                        style="margin-top: 20%; margin-left: 30%;" @click="preTransport" />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12">
                    <div class="card" style="height: 50vh">
                        <DataTable :value="warehouse" scrollable scrollHeight="30vh" tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">仓库</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
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
                </div> -->
                <div class="col-12">
                    <div class="card" style="height: 50vh">
                        <DataTable v-model:selection="selectedProducts" :value="productShow" scrollable scrollHeight="30vh"
                            tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">产品</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column selectionMode="multiple" :headerStyle="{ 'width': '3em' }"></Column>
                            <Column v-if="flag" field="number" header="产品编号"></Column>
                            <Column v-else field="number" header="Number"></Column>
                            <Column v-if="flag" field="pack_method_name" header="包装方式"></Column>
                            <Column v-else field="pack_method_name" header="Pack_Method"></Column>
                            <Column v-if="flag" field="weight" header="重量"></Column>
                            <Column v-else field="weight" header="Weight"></Column>
                            <Column v-if="flag" field="shelf_life" header="货架期"></Column>
                            <Column v-else field="shelf_life" header="ShelfLife"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Tag class="mr-2" severity="warning" :value="'已生产'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="primary" :value="'已入库'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 3">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'预处理'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 4">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'运输中'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 5">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已运达'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="State"></Column>
                        </DataTable>
                        <div>
                            <Toast />
                            <Button :label="lan === 'CN' ? '添加运输' : 'View Details'" severity="info"
                                style="margin-top: 40px; margin-left: 70%;" @click="readyTransport" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
import router from '../router';
import axios from 'axios';
import qs from 'qs';
import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            currentTime: '',
            username: localStorage.getItem("account"),
            uuid: localStorage.getItem("uuid"),
            lan: this.$store.state.language,
            house: '',
            housenumber: '',
            flag: true,
            value: 40,
            monitorService: null,
            //warehouse: '',
            receive: null,
            packBatch: null,
            batch_number: '',
            pack_method: 0,
            type: '',
            weight: '',
            product: 0,
            shelf_life: '',
            productShow:'',
            selectedProducts:'',
            mall:'',
            vehicle:'',
            vehicles:'',
            destination:'',
            readyProducts:'',
            jsonData:'',






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
        loginout() {
            router.push('/')
        },
        getHouse() {
            axios.get('http://127.0.0.1:8000/fsims/packoperator/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('searchhouse:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
        getReceive() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/packoperator/receiverecords', { params: { house_number: house_number } }).then(res => {
                console.log('receiverecords:', res.data.data.records)
                this.receive = res.data.data.records
            })
        },
        getBatch() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/packoperator/batches', { params: { house_number: house_number } }).then(res => {
                console.log('batches:', res.data.data.records)
                this.packBatch = res.data.data.records
            })
        },
        confirmReceive(data) {
            console.log("data", data.product_number);
            var product_number = data.product_number;
            console.log("product_number", product_number)
            axios.post('http://127.0.0.1:8000/fsims/packoperator/receiveconfirm', qs.stringify({ product_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("receiveConfirm:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '已接收', detail: '接收产品', life: 3000 });
                    this.getReceive();
                } else {
                    this.$toast.add({ severity: 'error', summary: '接收失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        newPackBatch(data) {
            var house_number = localStorage.getItem("house_number")
            var worker = localStorage.getItem("account")
            var pre_pid = data.pid
            var product_number = data.product_number
            axios.post('http://127.0.0.1:8000/fsims/packoperator/newbatch', qs.stringify({ house_number, worker, pre_pid, product_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("newbatch:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '批次已创建', detail: '开始包装', life: 3000 });
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
            var shelf_life = this.shelf_life
            var pack_method = this.pack_method
            var weight = this.weight
            //console.log("test:",typeof(this.product))
            axios.post('http://127.0.0.1:8000/fsims/packoperator/newproduct', qs.stringify({ batch_number, worker, house_number, type, shelf_life, pack_method, weight }), {
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
                    this.jsonData = jsonData;
                    // 在这里处理 JSON 数据
                };
                fileReader.readAsBinaryString(file);
                this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
            }
        },
        EndPackage() {
            var pack_type = this.jsonData[0][1];
            var pack_temperature = this.jsonData[1][1];
            var batch_number = this.batch_number
            var worker = localStorage.getItem('account')
            var house_number = localStorage.getItem('house_number')
            axios.post('http://127.0.0.1:8000/fsims/packoperator/endbatch',
                qs.stringify({
                    batch_number,
                    worker,
                    house_number,
                    pack_type,
                    pack_temperature,

                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    console.log("send:", res.data)
                    if (res.data.statusCode == 200) {
                        this.$toast.add({ severity: 'success', summary: '包装结束', detail: '已入库，数据已上链', life: 5000 });
                        this.getBatch();
                        this.getReceive();
                        this.getWarehouse();
                    } else {
                        this.$toast.add({ severity: 'error', summary: '包装数据上传失败', detail: res.data.message, life: 5000 });
                    }
                })
        },
        getProducts() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/packoperator/productsrecords', { params: { house_number: house_number } }).then(res => {
                console.log('warehouserecords:', res.data)
                this.productShow = res.data.data.records
            })
        },
        getVehicles() {
            axios.get('http://127.0.0.1:8000/fsims/packoperator/transportvehicles').then(res => {
                console.log('vehicles:', res.data.data)
                this.vehicles = res.data.data
            })
        },
        getMall() {
            axios.get('http://127.0.0.1:8000/fsims/packoperator/malls').then(res => {
                console.log('malls:', res.data.data)
                this.mall = res.data.data.malls
            })
        },
        readyTransport(){
            const products = this.selectedProducts
            console.log(products)

            for (let i = 0; i < products.length; i++) {
                if (products[i].state != 2) {
                    this.$toast.add({ severity: 'error', summary: '添加错误', detail: '禁止重复添加', life: 3000 });
                    return
                }
            }
            this.$toast.add({ severity: 'success', summary: '添加成功', detail: '可以开始饲养', life: 3000 });
            this.readyProducts = products
            console.log(this.readyProducts)

        },
        preTransport(){
            var house_number = localStorage.getItem('house_number');
            var worker = localStorage.getItem('account');
            //console.log("vehicle",this.destination) 
            var tv_number = this.vehicle.tv_number
            var mall_number = this.destination.house_number
            var package_product_numbers = []
            for (let i = 0; i < this.readyProducts.length; i++) {
                package_product_numbers.push(this.readyProducts[i].number);
            }
            const formData = {
                house_number:house_number,
                tv_number:tv_number,
                worker:worker,
                mall_number:mall_number,
                package_product_numbers:package_product_numbers
            }
            console.log("formData:", JSON.stringify(formData));
            axios.post('http://127.0.0.1:8000/fsims/packoperator/pretransport', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log("pretransport:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '预处理成功', detail: '准备运输', life: 3000 });
                    this.getProducts();
                } else {
                    this.$toast.add({ severity: 'error', summary: '预处理失败', detail: res.data.message, life: 3000 });
                }
            })

        }
        // getWarehouse() {
        //     const house_number = localStorage.getItem('house_number')
        //     axios.get('http://127.0.0.1:8000/fsims/packoperator/warehouserecords', { params: { house_number: house_number } }).then(res => {
        //         console.log('warehouserecords:', res.data)
        //         this.warehouse = res.data.data.records
        //     })
        // },
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
        this.getProducts();
        this.getReceive();
        this.getBatch();
        this.getHouse();
        this.getVehicles();
        this.getMall();
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