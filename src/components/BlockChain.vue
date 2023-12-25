<template>
    <div class="grid p-fluid">

        <div class="col-2">
            <!-- <div class="card mb-0 ">
                <div class="lable_title">
                    <span>当前高度</span>
                </div>
                <div class="lable_text">
                    <span class="lable_text">534</span>
                </div>
            </div> -->
            <div class="card" style="height:14vh;">
                <div class="flex justify-content-between ">
                    <div>
                        <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">当前高度</span>
                        <span v-else style="font-size: small;font-weight: bold;">current altitude</span>
                        <div>
                            <p style="font-size: xx-large;margin-top:10%;text-align: center;">{{ height }}</p>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                <span class="text-green-500 font-medium">12</span>
            </div>
        </div>
        <div class="col-2 col-offset-1">
            <div class="card" style="height:14vh;">
                <div class="flex justify-content-between ">
                    <div>
                        <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">节点数量</span>
                        <span v-else style="font-size: small;font-weight: bold;">Num of nodes</span>
                        <div>
                            <p style="font-size: xx-large;margin-top:10%;text-align: center;">4</p>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                <span class="text-green-500 font-medium">0</span>
            </div>
        </div>
        <div class="col-2 col-offset-1">
            <div class="card" style="height:14vh;">
                <div class="flex justify-content-between ">
                    <div>
                        <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">交易总数</span>
                        <span v-else style="font-size: small;font-weight: bold;">Num of trans</span>
                        <div>
                            <p style="font-size: xx-large;margin-top:10%;text-align: center;">123</p>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                <span class="text-green-500 font-medium">34</span>
            </div>
        </div>
        <div class="col-2 col-offset-1">
            <div class="card" style="height:14vh;">
                <div class="flex justify-content-between ">
                    <div>
                        <span v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">链码数量</span>
                        <span v-else style="font-size: small;font-weight: bold;">Chain code quantity</span>
                        <div>
                            <p style="font-size: xx-large;margin-top:10%;text-align: center;">1</p>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-exclamation-circle text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span v-if="lan == 'CN'" class="text-500" style="margin-bottom:-5%;">较昨日新增 </span>
                <span v-else class="text-500" style="margin-bottom:-5%;">New from yesterday</span>
                <span class="text-green-500 font-medium">0</span>
            </div>
        </div>

        <!-- <div class="col-12 xl:col-6">
            <div class="card" style="height: 50vh">
                <DataTable :value="confirm" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span v-if="flag" class="text-xl text-900 font-bold">供应链状态确认</span>
                            <span v-else class="text-xl text-900 font-bold">Supply Chain Status Confirmation</span>
                        </div>
                    </template>
                    <Column field="hash" :header="lan === 'CN' ? '交易哈希' : 'Transaction Hash'"></Column>
                    <Column field="block" :header="lan === 'CN' ? '交易所在区块' : 'Transaction Block'"></Column>
                    <Column field="message" :header="lan === 'CN' ? '供应链状态确认信息' : 'Supply Chain Confirmation Message'">
                    </Column>
                </DataTable>
            </div>
        </div> -->

        <!-- <div class="col-12 xl:col-6">
            <div class="card" style="height: 50vh">
                <h5 v-if="lan == 'CN'" style="text-align: center;">最近一个月的交易量</h5>
                <h5 v-else style="text-align: center;">Transaction volume in the last month</h5>
                <Chart type="line" :data="transaction" :options="chartOptions" class="h-30rem" />
            </div>
        </div> -->

        <div class="col-12">
            <div class="card">
                <!-- <DataTable v-model:expandedRows="expandedRows" :value="latestBlock" responsiveLayout="scroll"
                    @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"> -->
                <DataTable :value="latestBlock" scrollable scrollHeight="30vh" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="table-header-container">
                            <span v-if="flag" class="text-xl text-900 font-bold">最近区块</span>
                            <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                            <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                        </div>
                    </template>
                    <!-- <Column expander :headerStyle="{ 'width': '3rem' }" /> -->
                    <Column v-if="flag" field="number" header="区块高度"></Column>
                    <Column v-else field="number" header="Height"></Column>
                    <Column v-if="flag" field="blockHash" header="区块哈希"></Column>
                    <Column v-else field="blockHash" header="BlockHash"></Column>
                    <Column v-if="flag" field="dataHash" header="数据哈希"></Column>
                    <Column v-else field="dataHash" header="DataHash"></Column>
                    <Column v-if="flag" field="createTime" header="出块时间"></Column>
                    <Column v-else field="createTime" header="CreateTime"></Column>
                    <Column v-if="flag" field="txNum" header="交易数量"></Column>
                    <Column v-else field="txNum" header="TxNum"></Column>
                    <!-- <template #expansion="rowData">
                        <div class="orders-subtable">
                            <DataTable :value="rowData.data.transactionList[0].transactionActionList">
                                <Column field="txId" header="交易编号" sortable></Column>
                                <Column field="timestamp" header="时间戳" sortable></Column>
                                <Column field="chaincodeId" header="链码" sortable></Column>
                            </DataTable>
                        </div>
                    </template> -->
                </DataTable>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <h5 v-if="lan == 'CN'" style="text-align: left;font-weight: bold;font-size: large;">区块链上查询</h5>
                <h5 v-else style="text-align: left;font-weight: bold;font-size: large;">Query on the blockchain</h5>
                <div class="grid">
                    <div class="col-12 xl:col-2">
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="区块高度"
                            class="w-full md:w-14rem" />
                    </div>
                    <div class="col-12 xl:col-8">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="info" :placeholder="lan === 'CN' ? '请输入查询值' : 'Enter search value'" />
                        </span>
                    </div>
                    <div class="col-12 xl:col-1">
                        <Button :label="lan === 'CN' ? '查询' : 'Search'" severity="success" @click="search" />
                    </div>
                </div>
            </div>


            <div v-if="dataShow" class="card">
                <!-- <DataTable v-model:expandedRows="expandedRows" :value="latestBlock" responsiveLayout="scroll"
                    @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"> -->
                <DataTable :value="searchResult" tableStyle="min-width: 50rem">
                    <template #header>
                        <div class="table-header-container">
                            <span v-if="flag" class="text-xl text-900 font-bold">查询结果</span>
                            <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                            <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                        </div>
                    </template>
                    <Column v-if="flag" field="number" header="区块高度"></Column>
                    <Column v-else field="number" header="Height"></Column>
                    <Column v-if="flag" field="blockHash" header="区块哈希"></Column>
                    <Column v-else field="blockHash" header="BlockHash"></Column>
                    <Column v-if="flag" field="dataHash" header="数据哈希"></Column>
                    <Column v-else field="dataHash" header="DataHash"></Column>
                    <Column v-if="flag" field="createTime" header="出块时间"></Column>
                    <Column v-else field="createTime" header="CreateTime"></Column>
                    <Column v-if="flag" field="txNum" header="交易数量"></Column>
                    <Column v-else field="txNum" header="TxNum"></Column>
                </DataTable>
            </div>

        </div>

    </div>
</template>

<script>
import EventBus from '../AppEventBus';
import axios from 'axios';
export default {
    data() {
        return {
            lan: this.$store.state.language,
            flag: true,
            dropdownValue: { name: '区块高度' },
            height: '',
            dropdownValues: [
                { name: '区块高度' },
                // { name: '区块哈希' },

            ],
            //isLoading:false,
            dataShow: false,
            confirm: '',
            latestBlock: '',
            chartOptions: null,
            info: '',
            searchResult: null,
            transaction: {
                labels: ["3月11日", "3月15日", "3月18日", "3月22日", "3月23日", "3月25日", "3月26日"],
                datasets: [
                    {
                        label: '',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }
                ]
            },


        }
    },
    methods: {
        getLedgerInfo() {
            axios.get('http://127.0.0.1:8000/fsims/user/blockchain/ledgerinfo').then(res => {
                //console.log('res:', res.data.data.BCI.height)
                this.height = res.data.data.BCI.height
            })
        },
        getLatestBlock() {
            axios.get('http://127.0.0.1:8000/fsims/user/blockchain/latestblock').then(res => {
                console.log('latestblock:', res.data.data)
                this.latestBlock = res.data.data
            })
        },
        search() {
            console.log("select", this.dropdownValue)
            var res = this.dropdownValue.name
            var info = this.info
            let myArray = []
            if (res == '区块高度') {
                axios.get('http://127.0.0.1:8000/fsims/user/blockchain/blockByHeight', { params: { num: info } }).then(res => {
                    console.log('block:', res.data)
                    //this.searchResult. res.data.data
                    myArray.push(res.data.data)
                    this.searchResult = myArray
                    this.dataShow = true
                    console.log("isRes", this.dataShow)
                    console.log(this.searchResult.number)
                    //this.feeding = res.data.data.feeding_batches
                })
            }
            // else{
            //     axios.get('http://127.0.0.1:8000/fsims/user/blockchain/blockByHash', { params: { hash: info } }).then(res => {
            //         console.log('block:', res.data)
            //         //this.searchResult. res.data.data
            //         myArray.push(res.data.data)
            //         this.searchResult = myArray
            //         this.dataShow = true
            //         console.log("isRes", this.dataShow)
            //         console.log(this.searchResult.number)
            //         //this.feeding = res.data.data.feeding_batches
            //     })
            // }
            
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
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };
        this.getLedgerInfo();
        this.getLatestBlock();
    }
}

</script>

<style scoped>
.lable_title {
    font-weight: bold;
    text-align: center;
    font-size: medium;
    margin-bottom: 3%;
}

.lable_text {
    font-weight: bold;
    text-align: center;
    font-size: xx-large;
}
</style>