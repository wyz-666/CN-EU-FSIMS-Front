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
                            <p v-else style="font-size: x-large;font-weight: bold;text-align: center;">Kechin Pasture
                            </p>
                        </div>

                        <div class="col-3 col-offset-2">
                            <div class="card mb-0 " style="height:10vh;">
                                <p style="font-size: xx-large;font-weight: bold;text-align: center;">{{ currentTime }}
                                </p>
                            </div>
                        </div>
                        <div class="col-1 col-offset-3">
                            <p v-if="lan == 'CN'" style="font-size: large;text-align: center;margin-top: 42%;">
                                {{ username }}
                            </p>
                            <p v-else style="font-size: large;text-align: center;margin-top: 42%;">{{ username }}
                            </p>
                        </div>
                        <div class="col-1">
                            <!-- <p v-if="lan == 'CN'" style="font-size: large;text-align: center;margin-top: 40%;">退出登录
                            </p> -->
                            <Button v-if="lan == 'CN'" label="退出登录" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                            <Button v-else label="log out" class="p-button-text" style="margin-top: 35%;"
                                @click="loginout" />
                            <!-- <p v-else style="font-size: large;text-align: center;">log out
                            </p> -->
                        </div>
                    </div>
                </div>
                <div class="col-3">
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
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">牧场总牛数</span>
                                <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                                <div>
                                    <p style="font-size: xx-large;margin-top:10%;margin-left:80%;text-align: center;">302
                                    </p>
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
                                <span v-if="lan == 'CN'" style="font-size: x-large;font-weight: bold;">今日出栏生牛数</span>
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
                <div class="col-7">
                    <div class="card" style="height: 50vh">
                        <DataTable v-model:selection="selectedProducts3" :value="cows" scrollable scrollHeight="30vh"
                            tableStyle="min-width: 50rem">
                            <template #header>
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <span v-if="flag" class="text-xl text-900 font-bold">生牛入场</span>
                                    <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                </div>
                            </template>
                            <Column selectionMode="multiple" :headerStyle="{ 'width': '3em' }"></Column>
                            <Column v-if="flag" field="number" header="牛编号"></Column>
                            <Column v-else field="number" header="Number"></Column>
                            <Column v-if="flag" field="age" header="年龄"></Column>
                            <Column v-else field="age" header="Age"></Column>
                            <Column v-if="flag" field="weight" header="体重"></Column>
                            <Column v-else field="weight" header="Weight"></Column>
                            <Column v-if="flag" field="state" header="状态">
                                <template #body="rowData">
                                    <div v-if="rowData.data.state === 1">
                                        <Tag class="mr-2" severity="primary" :value="'未饲养'"
                                            style="font-size: 10px; padding: 6px 8px;"></Tag>
                                    </div>
                                    <div v-else-if="rowData.data.state === 2">
                                        <div class="flex flex-wrap gap-2">
                                            <Tag class="mr-2" severity="success" :value="'已饲养'"
                                                style="font-size: 10px; padding: 6px 8px;"></Tag>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column v-else field="state" header="State"></Column>
                        </DataTable>
                        <div>
                            <Toast />
                            <Button :label="lan === 'CN' ? '添加饲养' : 'View Details'" severity="info"
                                style="margin-top: 40px; margin-left: 70%;" @click="readyFedding" />
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="card" style="height: 40vh;margin-top: 10%;">
                        <div class="grid">
                            <TabView>
                                <TabPanel :header="lan === 'CN' ? '生牛入场' : 'create procedure'">
                                    <div class="grid">
                                        <div class="col-12 xl:col-4" style="margin-top: 40px;">
                                            <label v-if="lan == 'CN'" for="type" style="font-size: 18px;"
                                                class="mr-2">年龄</label>
                                            <label v-else for="age" font-size="x-large" class="mr-2">age</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 25px;">
                                            <InputText v-if="lan == 'CN'" id="age" v-model="age" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入牛龄" />
                                            <InputText v-else id="age" v-model="age" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input type" />
                                        </div>
                                        <div class="col-12 xl:col-4" style="margin-top: 25px;">
                                            <label v-if="lan == 'CN'" for="weight" style="font-size: 18px;"
                                                class="mr-2">体重</label>
                                            <label v-else for="weight" font-size="x-large" class="mr-2">weight</label>
                                        </div>
                                        <div class="col-12 xl:col-8" style="margin-top: 15px;">
                                            <InputText v-if="lan == 'CN'" id="weight" v-model="weight" size="large"
                                                style="font-size: large; text-align: left;" placeholder="请输入体重" />
                                            <InputText v-else id="weight" v-model="weight" size="large"
                                                style="font-size: large; text-align: left;"
                                                placeholder="please input weight" />
                                        </div>
                                    </div>
                                    <div>
                                        <Toast />
                                        <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info"
                                            style="margin-top: 40px; margin-left: 30%;" @click="addCow" />
                                    </div>
                                </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '阶段创建' : 'create procedure'">
                                    <DataTable :value="readyCows" scrollable scrollHeight="30vh"
                                        tableStyle="max-width: 40rem">
                                        <Column v-if="flag" field="number" header="预备饲养牛编号"></Column>
                                        <Column v-else field="number" header="readycow"></Column>
                                    </DataTable>
                                    <Button :label="lan === 'CN' ? '开始饲养' : 'View Details'" severity="info"
                                        style="margin-top: 30px; margin-left: 30%;" @click="newFeddingBatch" />
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
                <!-- <div class="col-12"> -->
                <div class="card">
                    <DataTable v-model:expandedRows="expandedRows" :value="feeding" responsiveLayout="scroll"
                        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse">
                        <template #header>
                            <div class="table-header-container">
                                <span v-if="flag" class="text-xl text-900 font-bold">饲养记录</span>
                                <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                                <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                            </div>
                        </template>
                        <Column expander :headerStyle="{ 'width': '3rem' }" />
                        <Column v-if="flag" field="batch_number" header="批次编号"></Column>
                        <Column v-else field="batch_number" header="Batch"></Column>
                        <Column v-if="flag" field="pid" header="产品阶段标识"></Column>
                        <Column v-else field="pid" header="PID"></Column>
                        <Column v-if="flag" field="worker" header="工人"></Column>
                        <Column v-else field="worker" header="Worker"></Column>
                        <Column v-if="flag" field="state" header="状态">
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
    <!-- </div> -->
</template>
    
<script>
import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
import router from '../router'
import axios from 'axios';
import qs from 'qs'
export default {
    data() {
        return {

            currentTime: '',
            username: localStorage.getItem("account"),
            uuid: localStorage.getItem("uuid"),
            lan: this.$store.state.language,
            house: '',
            housenumber: '',
            age: '',
            weight: '',
            flag: true,
            value: 40,
            monitorService: null,
            feeding: '',
            cows: '',
            cloth: null,
            selectedProducts3: null,
            readyCows: null



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
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/searchhouse', { params: { uuid: this.uuid } }).then(res => {
                console.log('res:', res.data)
                this.house = res.data.data.house
                this.housenumber = res.data.data.house_number
                localStorage.setItem("house_number", res.data.data.house_number)
            })
        },
        addCow() {
            // const age = this.age;
            // const weight = this.weight;
            // console.log("age", age)
            // const house_number = localStorage.getItem('house_number')
            // console.log("house_number", house_number)

            var age = this.age
            var weight = this.weight
            var house_number = localStorage.getItem('house_number')

            axios.post('http://127.0.0.1:8000/fsims/pastureoperator/addcow', qs.stringify({ age, weight, house_number }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log("addcowres:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '生牛入场成功', detail: '入场成功', life: 3000 });
                    this.getCowList();
                } else {
                    this.$toast.add({ severity: 'error', summary: '生牛入场失败', detail: res.data.message, life: 3000 });
                }
            })
        },
        getCowList() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/getcow', { params: { house_number: house_number } }).then(res => {
                console.log('res:', res.data)
                this.cows = res.data.data
            })
        },
        getFeeding() {
            const house_number = localStorage.getItem('house_number')
            axios.get('http://127.0.0.1:8000/fsims/pastureoperator/getfeedingrecords', { params: { house_number: house_number } }).then(res => {
                console.log('feedingres:', res.data)
                this.feeding = res.data.data.feeding_batches
            })
        },
        readyFedding() {
            const readyFedding = this.selectedProducts3
            console.log(readyFedding)

            for (let i = 0; i < readyFedding.length; i++) {
                if (readyFedding[i].state == 2) {
                    this.$toast.add({ severity: 'error', summary: '添加错误', detail: '已饲养，禁止重复添加', life: 3000 });
                    return
                }
            }
            this.$toast.add({ severity: 'success', summary: '添加成功', detail: '可以开始饲养', life: 3000 });
            this.readyCows = readyFedding
            console.log(this.readyCows)
        },
        newFeddingBatch() {
            var house_number = localStorage.getItem('house_number');
            var worker = localStorage.getItem('account');
            var pre_pid = '';
            var cow_numbers = [];
            for (let i = 0; i < this.readyCows.length; i++) {
                cow_numbers.push(this.readyCows[i].number);
            }
            const formData = {
                house_number: house_number,
                worker: worker,
                pre_pid: pre_pid,
                cow_numbers: cow_numbers,
            };
            console.log("formData:", JSON.stringify(formData));
            // console.log("cow_numbers", cow_numbers)
            // var input = qs.stringify({ house_number, worker, pre_pid, cow_numbers })
            //console.log("input", input)
            axios.post('http://127.0.0.1:8000/fsims/pastureoperator/newfeedingbatch', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log("newfeedingbatch:", res.data)
                if (res.data.statusCode == 200) {
                    this.$toast.add({ severity: 'success', summary: '生牛饲养成功', detail: '入场成功', life: 3000 });
                    this.getCowList();
                    this.getFeeding();
                } else {
                    this.$toast.add({ severity: 'error', summary: '生牛饲养失败', detail: res.data.message, life: 3000 });
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
        this.getHouse();
        this.getCowList();
        this.getFeeding();
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