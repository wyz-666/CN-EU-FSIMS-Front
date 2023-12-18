<template>
    <div class="grid p-fluid">

        <div class="col">
            <div class="card mb-0 ">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span v-if="lan == 'CN'" class="block text-700 font-medium mb-3  ">包装车间温度</span>
                        <span v-else class="block text-700 font-medium mb-3  ">Packaging workshop temperature</span>
                        <div v-if="lan == 'CN'" class="text-900 font-medium text-xl">10摄氏度</div>
                        <div v-else class="text-900 font-medium text-xl">10 degrees Celsius</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>

                <span v-if="lan == 'CN'" class="text-green-500 font-medium">正常</span>
                <span v-else class="text-green-500 font-medium">Normal</span>
            </div>
        </div>
        <div class="col">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span v-if="lan == 'CN'" class="block text-700 font-medium mb-3 align-items-center ">今日真空包装数量</span>
                        <span v-else class="block text-700 font-medium mb-3 align-items-center ">Today’s vacuum packaging quantity</span>
                        <div class="text-900 font-medium text-xl">18</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>

                <span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
                <span v-else class="text-500">New from yesterday</span>
                <span class="text-green-500 font-medium">2 </span>
            </div>
        </div>
        <div class="col">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span v-if="lan == 'CN'" class="block text-700 font-medium mb-3">真空包装总数量</span>
                        <span v-else class="block text-700 font-medium mb-3">Total quantity of vacuum packaging</span>
                        <div class="text-900 font-medium text-xl">207</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>

                <span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
                <span v-else class="text-500">New from yesterday</span>
                <span class="text-green-500 font-medium">24</span>
            </div>
        </div>

        <div class="col">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span v-if="lan == 'CN'" class="block text-700 font-medium mb-3 align-items-center ">今日气调包装数量</span>
                        <span v-else class="block text-700 font-medium mb-3 align-items-center ">今日气调包装数量</span>
                        <div class="text-900 font-medium text-xl">18</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>

                <span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
                <span v-else class="text-500">较昨日新增 </span>
                <span class="text-green-500 font-medium">2 </span>
            </div>
        </div>
        <div class="col">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span v-if="lan == 'CN'" class="block text-700 font-medium mb-3">气调包装总数量</span>
                        <span v-else class="block text-700 font-medium mb-3">气调包装总数量</span>
                        <div class="text-900 font-medium text-xl">207</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>

                <span v-if="lan == 'CN'" class="text-500">较昨日减少 </span>
                <span v-else class="text-red-500 font-medium">12</span>
            </div>
        </div>

        <div class="grid">
            <div class="col-12 xl:col-6">
                <div class="card" style="height: 65vh">
                    <TabView>
                      <TabPanel :header="lan === 'CN' ? '牛肉品质监测' : 'Beef Quality Monitoring'">
                        <DataTable :value="beef" scrollable scrollHeight="50vh" tableStyle="min-width: 30rem">
                          <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                          <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                          <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                          <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                            <template #body>
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                              </div>
                            </template>
                          </Column>
                          <Column :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                              <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text @click="editProduct(slotProps.data)" />
                            </template>
                          </Column>
                        </DataTable>
                      </TabPanel>
                      <TabPanel :header="lan === 'CN' ? '鸡肉品质监测' : 'Chicken Quality Monitoring'">
                        <DataTable :value="chicken" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                          <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                          <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                          <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                          <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                            <template #body>
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                              </div>
                            </template>
                          </Column>
                          <Column :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                              <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text @click="editProduct(slotProps.data)" />
                            </template>
                          </Column>
                        </DataTable>
                      </TabPanel>
                      <TabPanel :header="lan === 'CN' ? '水产品品质监测' : 'Aquatic Products Quality Monitoring'">
                        <DataTable :value="fish" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                          <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                          <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                          <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                          <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                            <template #body>
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                              </div>
                            </template>
                          </Column>
                          <Column :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                              <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text @click="editProduct(slotProps.data)" />
                            </template>
                          </Column>
                        </DataTable>
                      </TabPanel>
                    </TabView>
                </div>

            </div>

          <div class="col-12 xl:col-6">
            <div class="card" style="height: 65vh;">
              <TabView>
                <TabPanel :header="lan === 'CN' ? '监测详情' : 'Monitoring Details'">
                  <TreeTable :value="detail" v-model:expandedKeys="expandedKeys" scrollable scrollHeight="450px"
                             :tableProps="{ style: { minWidth: '40rem' } }">
                    <template #header>
                      {{ lan === 'CN' ? '详细指标' : 'Detailed Indicators' }}
                    </template>
                    <Column field="name" :header="lan === 'CN' ? '指标' : 'Indicator'" expander></Column>
                    <Column field="size" :header="lan === 'CN' ? '正常范围' : 'Normal Range'"></Column>
                    <Column field="type" :header="lan === 'CN' ? '当前数值' : 'Current Value'"></Column>
                  </TreeTable>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>



        <!-- <div class="col-12 xl:col-1">

        </div> -->


    </div>
</template>
    
<script>
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            beef: [
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
            ],
            chicken: [
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": "正常"
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
            ],
            fish: [
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
                {
                    "id": "0023456",
                    "type": "真空包装",
                    "date": "2023/10/3015:00",
                    "status": 1
                },
            ],
            detail: [
                {
                    "key": "0",
                    "data": {
                        "name": "饮水指标",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "0-0",
                            "data": {
                                "name": "物理危害",
                                "size": "",
                                "type": ""
                            },
                            "children": [
                                {
                                    "key": "0-0-0",
                                    "data": {
                                        "name": "重金属",
                                        "size": "",
                                        "type": ""
                                    },
                                    "children": [
                                        {
                                            "key": "0-0-0-0",
                                            "data": {
                                                "name": "汞",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-0-0-0-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤0.01mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-0-0-0-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤0.01mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-0-0-1",
                                            "data": {
                                                "name": "镉",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-0-0-1-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤0.05mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-0-0-1-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤0.01mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-0-0-2",
                                            "data": {
                                                "name": "铅",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-0-0-2-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤0.10mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-0-0-2-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤0.10mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-0-0-3",
                                            "data": {
                                                "name": "铬",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-0-0-3-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤0.10mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-0-0-3-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤0.05mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-0-0-4",
                                            "data": {
                                                "name": "砷",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-0-0-4-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤0.20mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-0-0-4-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤0.02mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-0-0-5",
                                            "data": {
                                                "name": "铜",
                                                "size": "≤1.0mg/L",
                                                "type": "0.10mg/L"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "key": "0-0-1",
                                    "data": {
                                        "name": "五日生化需氧量",
                                        "size": "≤3.0mg/L",
                                        "type": "0.10mg/L"
                                    }
                                },
                                {
                                    "key": "0-0-2",
                                    "data": {
                                        "name": "化学耗氧量",
                                        "size": "≤4.0mg/L",
                                        "type": "0.10mg/L"
                                    }
                                }
                            ]
                        },
                        {
                            "key": "0-1",
                            "data": {
                                "name": "化学危害",
                                "size": "",
                                "type": ""
                            },
                            "children": [
                                {
                                    "key": "0-1-0",
                                    "data": {
                                        "name": "化合物",
                                        "size": "",
                                        "type": ""
                                    },
                                    "children": [
                                        {
                                            "key": "0-1-0-0",
                                            "data": {
                                                "name": "氟化物",
                                                "size": "",
                                                "type": ""
                                            },
                                            "children": [
                                                {
                                                    "key": "0-1-0-0-0",
                                                    "data": {
                                                        "name": "畜类",
                                                        "size": "≤2.0mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                },
                                                {
                                                    "key": "0-1-0-0-1",
                                                    "data": {
                                                        "name": "禽类",
                                                        "size": "≤2.0mg/L",
                                                        "type": "0.10mg/L"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "key": "0-1-0-1",
                                            "data": {
                                                "name": "氰化物",
                                                "size": "≤250mg/L",
                                                "type": "≤0.20mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-2",
                                            "data": {
                                                "name": "氯化物",
                                                "size": "≤250mg/L",
                                                "type": "≤0.20mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-3",
                                            "data": {
                                                "name": "硝酸盐",
                                                "size": "3.0mg/L",
                                                "type": "≤0.20mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-4",
                                            "data": {
                                                "name": "硫酸盐",
                                                "size": "≤250mg/L",
                                                "type": "≤0.20mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-5",
                                            "data": {
                                                "name": "六六六",
                                                "size": "≤0.001mg/L",
                                                "type": "≤0.20mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-6",
                                            "data": {
                                                "name": "滴滴涕",
                                                "size": "≤0.005mg/L",
                                                "type": "0.10mg/L"
                                            }
                                        },
                                        {
                                            "key": "0-1-0-7",
                                            "data": {
                                                "name": "氨氮",
                                                "size": "≤0.55mg/L",
                                                "type": "0.10mg/L"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "key": "0-2",
                            "data": {
                                "name": "感官性状",
                                "size": "",
                                "type": "0.10mg/L"
                            }
                        },
                        {
                            "key": "0-2",
                            "data": {
                                "name": "生物危害",
                                "size": "",
                                "type": "0.10mg/L"
                            }
                        }
                    ]
                },
                {
                    "key": "1",
                    "data": {
                        "name": "饲料指标",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "1-0",
                            "data": {
                                "name": "物理危害",
                                "size": "",
                                "type": ""
                            }
                        },
                        {
                            "key": "1-1",
                            "data": {
                                "name": "生物危害",
                                "size": "",
                                "type": ""
                            }
                        }
                    ]
                },
                {
                    "key": "2",
                    "data": {
                        "name": "舍区地面垫料标准",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "2-0",
                            "data": {
                                "name": "物理危害",
                                "size": "",
                                "type": ""
                            }
                        },
                        {
                            "key": "2-1",
                            "data": {
                                "name": "生物危害",
                                "size": "",
                                "type": ""
                            }
                        }
                    ]
                },
                {
                    "key": "3",
                    "data": {
                        "name": "牧场光照",
                        "size": "＞7h",
                        "type": "8h"
                    }
                },
                {
                    "key": "4",
                    "data": {
                        "name": "土壤指标",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "4-0",
                            "data": {
                                "name": "物理危害",
                                "size": "",
                                "type": ""
                            },
                            "children": [

                            ]
                        },
                        {
                            "key": "4-1",
                            "data": {
                                "name": "生物危害",
                                "size": "",
                                "type": ""
                            },
                            "children": [

                            ]
                        }
                    ]
                },
                {
                    "key": "5",
                    "data": {
                        "name": "污物排放指标",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "5-0",
                            "data": {
                                "name": "水",
                                "size": "",
                                "type": ""
                            }
                        },
                        {
                            "key": "5-1",
                            "data": {
                                "name": "废渣",
                                "size": "",
                                "type": ""
                            }
                        }
                    ]
                },
                {
                    "key": "6",
                    "data": {
                        "name": "新动物入场隔离时间",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "6-0",
                            "data": {
                                "name": "大动物",
                                "size": "≥45d",
                                "type": "50d"
                            }
                        },
                        {
                            "key": "6-1",
                            "data": {
                                "name": "小动物",
                                "size": "≥30d",
                                "type": "35d"
                            }
                        }
                    ]
                },
                {
                    "key": "7",
                    "data": {
                        "name": "环境指标",
                        "size": "",
                        "type": ""
                    },
                    "children": [
                        {
                            "key": "7-0",
                            "data": {
                                "name": "空气",
                                "size": "",
                                "type": ""
                            }
                        }
                    ]
                }
            ]
        }
    }
    ,
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
    }
}
</script>
    
<style lang="scss" scoped></style>