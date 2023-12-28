<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-12">
                    <div class="grid">
                        <div class="col-2 ">
                            <p v-if="lan == 'CN'"
                                style="font-size: xx-large;font-weight: bold;margin-top: 10%;;margin-left: 10%;">{{ house }}
                            </p>
                            <p v-else style="font-size: x-large;font-weight: bold;text-align: center;">A Transport Company
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
                            <Button v-if="lan == 'CN'" label="退出登录" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                            <Button v-else label="log out" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                        </div>
                    </div>
                </div>
                <div class="col-2 col-offset-2">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日在途车辆</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:60%;text-align: center;">18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日送达车辆</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:60%;text-align: center;">12
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3 col-offset-1">
                    <div class="card mb-0 " style="height:14vh;">
                        <div class="flex justify-content-between ">
                            <div>
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">车辆总数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">32</p>
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
                    <div class="card">
                        <DataTable v-model:expandedRows="expandedRows" :value="batches" responsiveLayout="scroll"
                            @rowExpand="onRowExpand" @rowCollapse="onRowCollapse">
                            <template #header>
                                <div class="table-header-container">
                                    <span v-if="flag" class="text-xl text-900 font-bold">运输记录</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column expander :headerStyle="{ 'width': '3rem' }" />
                            <Column v-if="flag" field="batch_number" header="批次编号" sortable ></Column>
                            <Column v-else field="batch_number" header="Batch"></Column>
                            <Column v-if="flag" field="worker" header="工人" sortable ></Column>
                            <Column v-else field="worker" header="Worker"></Column>
                            <Column v-if="flag" field="mall" header="目的地" sortable >

                            </Column>
                            <Column v-else field="worker" header="Worker"></Column>
                            <Column v-if="flag" field="state" header="状态" sortable >
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 0">
                                        <Tag class="mr-2" severity="primary" :value="'待运输'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.state === 1">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'运输中'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已送达'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="state"></Column>
                            <Column>
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 0">
                                        <Toast />
                                        <Button @click="startTransport(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info">开始运输</button>
                                    </div>
                                    <div v-else-if="rowData.data.state === 1">
                                        <Toast />
                                        <Button @click="end(rowData.data)" label="Info"
                                            class="p-button-rounded  p-button-info">送达</button>
                                    </div>
                                </template>
                            </Column>

                            <template #expansion="rowData">
                                <div class="orders-subtable">
                                    <DataTable :value="rowData.data.products">
                                        <Column field="number" header="产品编号" sortable></Column>
                                        <Column field="type_name" header="类型" sortable></Column>
                                        <Column field="pack_method_name" header="包装方法" sortable></Column>
                                        <Column field="weight" header="重量" sortable></Column>
                                        <Column field="shelf_life" header="货架期" sortable></Column>
                                    </DataTable>
                                </div>
                            </template>
                        </DataTable>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card" style="height:50vh">
                        <DataTable :value="goods" scrollable scrollHeight="40vh" tableStyle="min-width: 100rem">
                            <template #header>
                                <div class="table-header-container">
                                    <span v-if="flag" class="text-xl text-900 font-bold">商场商品</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>

                                </div>
                            </template>

                            <Column v-if="flag" field="number" header="产品编码"></Column>
                            <Column v-else field="number" header="Height"></Column>
                            <Column v-if="flag" field="type_name" header="类型"></Column>
                            <Column v-else field="type_name" header="Type"></Column>
                            <Column v-if="flag" field="shelf_life" header="货架期"></Column>
                            <Column v-else field="shelf_life" header="ShelfLife"></Column>
                            <Column v-if="flag" field="weight" header="重量"></Column>
                            <Column v-else field="weight" header="Weight"></Column>
                            <Column v-if="flag" field="checkcode" header="校验码"></Column>
                            <Column v-else field="checkcode" header="CheckCode"></Column>
                        </DataTable>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card" style="height: 50vh">
                        <div class="grid">
                            <TabView>
                                <TabPanel :header="lan === 'CN' ? '送达' : 'sendtonext'">
                                    <div class="grid">
                                        <div class="col-12">
                                            <label v-if="lan == 'CN'" for="batch_number" font-size=18px
                                                class="mr-2">批次编号</label>
                                            <label v-else for="batch_number" font-size="x-large" class="mr-2">Batch</label>
                                            <InputText v-if="lan == 'CN'" id="batch_number" v-model="batch_number"
                                                size="large" placeholder="请输入批次编号" />
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

                                    </div>
                                    <div>
                                        <Toast />
                                        <Button :label="lan === 'CN' ? '出库' : 'View Details'" severity="info"
                                            style="margin-top: 20px; margin-left: 30%;" @click="endTransport" />
                                    </div>
                                </TabPanel>
                            </TabView>
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
import router from '../router'
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
            flag: true,
            value: 40,
            monitorService: null,
            house: '',
            receive: '',
            cloth: null,
            batches: '',
            batch_number: '',
            jsonData: '',
            goods:''



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

        getVehicle() {
            axios.get('http://127.0.0.1:8000/fsims/transportoperator/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('res:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
        async getBatch() {
            try {
                const house_number = localStorage.getItem('house_number');
                const response = await axios.get('http://127.0.0.1:8000/fsims/transportoperator/batches', { params: { house_number: house_number } });
                console.log('batches:', response.data.data.records);
                const batch = response.data.data.records;

                for (let i = 0; i < response.data.data.count; i++) {
                    const name = await (async () => {
                        try {
                            const res = await axios.get('http://127.0.0.1:8000/fsims/transportoperator/mall', { params: { mall_number: batch[i].mall_number } });
                            console.log('name:', res.data);
                            return res.data;
                        } catch (error) {
                            console.error('Error fetching mall:', error);
                            throw error;
                        }
                    })();
                    batch[i].mall = name.data;
                    console.log("batch[i].mall:", name.data);
                }

                this.batches = batch;
            } catch (error) {
                console.error('Error fetching batches:', error);
                // 处理错误
            }
        },
        startTransport(data) {
            console.log("data", data.batch_number);
            var batch_number = data.batch_number;
            var operator = localStorage.getItem("account");
            axios.post('http://127.0.0.1:8000/fsims/transportoperator/start', qs.stringify({ batch_number, operator }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("startTransport:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '开始运输', detail: '运输中', life: 3000 });
                    this.getBatch();
                } else {
                    this.$toast.add({ severity: 'error', summary: '运输失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        getGoods() {
            var num = "MALL-d7e423d6d29f5e611d067295bc12ab3de6a3f9826bd2dded14d7969fac52f2df"
            axios.get('http://127.0.0.1:8000/fsims/transportoperator/goods', { params: { mall_number: num } }).then(res => {
                console.log('res:', res.data)
                this.goods = res.data.data.records
            })
        },
        end(data) {
            this.batch_number = data.batch_number
        },
        endTransport() {
            var temperature = this.jsonData[0][1];
            var source = this.jsonData[1][1];
            var destination = this.jsonData[2][1];
            var humidity = this.jsonData[3][1];
            var batch_number = this.batch_number;
            var worker = localStorage.getItem("account");
            axios.post('http://127.0.0.1:8000/fsims/transportoperator/end',
                qs.stringify({
                    batch_number,
                    worker,
                    temperature,
                    source,
                    destination,
                    humidity,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    console.log("send:", res.data)
                    if (res.data.statusCode == 200) {
                        this.$toast.add({ severity: 'success', summary: '运输结束', detail: '已送达，数据已上链', life: 5000 });
                        this.getBatch();
                    } else {
                        this.$toast.add({ severity: 'error', summary: '运输数据上传失败', detail: res.data.message, life: 5000 });
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

        this.getVehicle();
        this.getBatch();
        this.getGoods();
        EventBus.on('language-change', this.languageChangeListener);
        this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        setInterval(this.updateTime, 1000);
    },

    computed: {
        slaughterhouse() {
            return this.lan === 'CN' ? this.slaughterhouseCN : this.slaughterhouseEN;
        },


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