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
                            <p style="font-size: xx-large;margin-top:10%;text-align: center;">534</p>
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

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 50vh">
              <DataTable :value="confirm" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                <template #header>
                  <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ lan === 'CN' ? '供应链状态确认' : 'Supply Chain Status Confirmation' }}</span>
                  </div>
                </template>
                <Column field="hash" :header="lan === 'CN' ? '交易哈希' : 'Transaction Hash'"></Column>
                <Column field="block" :header="lan === 'CN' ? '交易所在区块' : 'Transaction Block'"></Column>
                <Column field="message" :header="lan === 'CN' ? '供应链状态确认信息' : 'Supply Chain Confirmation Message'"></Column>
              </DataTable>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card" style="height: 50vh">
                <h5 v-if="lan == 'CN'" style="text-align: center;">最近一个月的交易量</h5>
                <h5 v-else style="text-align: center;">Transaction volume in the last month</h5>
                <Chart type="line" :data="transaction" :options="chartOptions" class="h-30rem" />
            </div>
        </div>

        <div class="col-12 xl:col-12">
            <div class="card" style="height: 50vh">
              <DataTable :value="recent" scrollable scrollHeight="500px" tableStyle="min-width: 50rem">
                <template #header>
                  <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ lan === 'CN' ? '最近区块' : 'Recent Blocks' }}</span>
                  </div>
                </template>
                <Column field="height" :header="lan === 'CN' ? '区块高度' : 'Block Height'"></Column>
                <Column field="pre_hash" :header="lan === 'CN' ? '前一区块哈希' : 'Previous Block Hash'"></Column>
                <Column field="auth" :header="lan === 'CN' ? '背书结点' : 'Endorsing Node'"></Column>
                <Column field="number" :header="lan === 'CN' ? '交易数' : 'Number of Transactions'"></Column>
                <Column field="date" :header="lan === 'CN' ? '创建时间' : 'Creation Time'"></Column>
              </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-12">
            <div class="card">
                <h5 v-if="lan == 'CN'" style="text-align: left;font-weight: bold;font-size: large;">区块链上查询</h5>
                <h5 v-else style="text-align: left;font-weight: bold;font-size: large;">Query on the blockchain</h5>
                <div class="grid">
                  <div class="col-12 xl:col-2">
                    <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name"
                            :placeholder="lan === 'CN' ? '区块高度' : 'Block Height'" class="w-full md:w-14rem" />
                  </div>
                  <div class="col-12 xl:col-8">
                    <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model="value1" :placeholder="lan === 'CN' ? '请输入查询值' : 'Enter search value'" />
                    </span>
                  </div>
                  <div class="col-12 xl:col-1">
                    <Button :label="lan === 'CN' ? '查询' : 'Search'" severity="success" />
                  </div>
                </div>
            </div>
            <!-- <div class="grid p-fluid">
                <div class="card">
                    <h5 style="text-align: left;font-weight: bold;font-size: large;">区块链上查询</h5>
                    <div class="col-12 xl:col-2">
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="区块高度"
                            class="w-full md:w-14rem" />
                    </div>
                    <div class="col-12 xl:col-8">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="value1" placeholder="Search" />
                        </span>
                    </div>

                </div>
            </div> -->
        </div>


    </div>
</template>

<script>
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            dropdownValue: null,
            dropdownValues: [
                { name: '区块高度', code: 'B' },
                { name: '区块哈希', code: 'H' },

            ],
            confirm: [
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },
                {
                    "hash": "6f7d5a13e296f420990ce0039724acba",
                    "block": "123",
                    "message": "供应链状态确认信息1"
                },

            ],
            recent: [
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
                {
                    "height": 522,
                    "pre_hash": "iOFeARZUiNK0WutTbglo0My/7x0c16A+CeeuU89sf8k=",
                    "auth": "Org1MSP;Org2MSP",
                    "number": 2,
                    "date": "2023-10-11 13:31:38"
                },
            ],
            chartOptions: null,
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
    mounted() {
        this.languageChangeListener = () => {
          this.lan = this.$store.state.language;
          if(this.lan == 'CN') {
            this.flag = true
          }else {
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