<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid">
                <div class="col-2">
                    <div class="grid">
                        <div class="col-12">
                            <div class="card md-0 mt-0" style="height: 13vh;">
                                <p v-if="lan == 'CN'" class="lable_title">今日待宰批次总数</p>
                                <p v-else  style="font-size: small;" class="lable_title" >Today's Slaughter Count</p>
                                <p class="lable_text">23</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card md-0 mt-0" style="height: 13vh;">
                                <p v-if="lan == 'CN'" class="lable_title">今日工人总数</p>
                                <p v-else style="font-size: small;" class="lable_title">Total number of workers today</p>
                                <p class="lable_text">120</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card md-0 mt-0" style="height: 13vh;">
                                <p v-if="lan == 'CN'" class="lable_title">今日运输车总数</p>
                                <p v-else style="font-size: small;" class="lable_title">Total number of transport vehicles today</p>
                                <p class="lable_text">12</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-10">
                    <div class="card md-0" style="height: 45vh;">
                        <div class="grid">
                            <div class="col-6">
                                <div class="card" >
                                    <h5 v-if="lan == 'CN'" >无疫数量</h5>
                                    <h5 v-else>Disease-free quantity</h5>
                                    <Chart type="bar" :data="barData" :options="barOptions" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card">
                                    <h5 v-if="lan == 'CN'">有疫数量</h5>
                                    <h5 v-else>Number of infected people</h5>
                                    <Chart type="bar" :data="barData" :options="barOptions" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-12">
            <div class="card" style="height: 65vh">
                <TabView>
                  <TabPanel :header="lan === 'CN' ? '牛' : 'Cattle'">
                    <DataTable :value="data1" scrollable scrollHeight="50vh" tableStyle="min-width: 30rem">
                      <Column field="batch_id" :header="lan === 'CN' ? '待宰批次' : 'Slaughter Batch'"></Column>
                      <Column field="type" :header="lan === 'CN' ? '动物类型' : 'Animal Type'"></Column>
                      <Column field="food_duration" :header="lan === 'CN' ? '当前禁食时间' : 'Current Fasting Duration'"></Column>
                      <Column field="water_duration" :header="lan === 'CN' ? '当前禁水时间' : 'Current Water Fasting Duration'"></Column>
                      <Column field="check" :header="lan === 'CN' ? '检疫情况' : 'Quarantine Status'"></Column>
                      <Column field="check_id" :header="lan === 'CN' ? '检疫人员编号' : 'Quarantine Personnel ID'"></Column>
                      <Column :header="lan === 'CN' ? '状态' : 'Status'" headerStyle="width: 10rem">
                        <template #body>
                          <div class="flex flex-wrap gap-2">
                            <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                          </div>
                        </template>
                      </Column>
                      <Column field="date" :header="lan === 'CN' ? '完成时间' : 'Completion Time'"></Column>
                    </DataTable>
                  </TabPanel>
                  <TabPanel :header="lan === 'CN' ? '鸡' : 'Chicken'">
                    <DataTable :value="data1" scrollable scrollHeight="50vh" tableStyle="min-width: 30rem">
                      <Column field="batch_id" :header="lan === 'CN' ? '待宰批次' : 'Slaughter Batch'"></Column>
                      <Column field="type" :header="lan === 'CN' ? '动物类型' : 'Animal Type'"></Column>
                      <Column field="food_duration" :header="lan === 'CN' ? '当前禁食时间' : 'Current Fasting Duration'"></Column>
                      <Column field="water_duration" :header="lan === 'CN' ? '当前禁水时间' : 'Current Water Fasting Duration'"></Column>
                      <Column field="check" :header="lan === 'CN' ? '检疫情况' : 'Quarantine Status'"></Column>
                      <Column field="check_id" :header="lan === 'CN' ? '检疫人员编号' : 'Quarantine Personnel ID'"></Column>
                      <Column :header="lan === 'CN' ? '状态' : 'Status'" headerStyle="width: 10rem">
                        <template #body>
                          <div class="flex flex-wrap gap-2">
                            <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                          </div>
                        </template>
                      </Column>
                      <Column field="date" :header="lan === 'CN' ? '完成时间' : 'Completion Time'"></Column>
                    </DataTable>
                  </TabPanel>

                  <TabPanel :header="lan === 'CN' ? '鱼' : 'Fish'">
                    <DataTable :value="data1" scrollable scrollHeight="50vh" tableStyle="min-width: 30rem">
                      <Column field="batch_id" :header="lan === 'CN' ? '待宰批次' : 'Slaughter Batch'"></Column>
                      <Column field="type" :header="lan === 'CN' ? '动物类型' : 'Animal Type'"></Column>
                      <Column field="food_duration" :header="lan === 'CN' ? '当前禁食时间' : 'Current Fasting Duration'"></Column>
                      <Column field="water_duration" :header="lan === 'CN' ? '当前禁水时间' : 'Current Water Fasting Duration'"></Column>
                      <Column field="check" :header="lan === 'CN' ? '检疫情况' : 'Quarantine Status'"></Column>
                      <Column field="check_id" :header="lan === 'CN' ? '检疫人员编号' : 'Quarantine Personnel ID'"></Column>
                      <Column :header="lan === 'CN' ? '状态' : 'Status'" headerStyle="width: 10rem">
                        <template #body>
                          <div class="flex flex-wrap gap-2">
                            <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                          </div>
                        </template>
                      </Column>
                      <Column field="date" :header="lan === 'CN' ? '完成时间' : 'Completion Time'"></Column>
                    </DataTable>
                  </TabPanel>
                </TabView>
            </div>

        </div>

        <div class="col-12 xl:col-4">
            <div class="card">
                <h5 v-if="lan == 'CN'">待宰圈消毒记录</h5>
                <h5 v-else>Disinfection records of the slaughter pen</h5>
                <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                           class="mt-3">
                  <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
                  <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
                  <!-- <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column> -->
                  <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }"></Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-4">
            <div class="card">
                <h5 v-if="lan == 'CN'">地面冲洗记录</h5>
                <h5 v-else>Floor washing records</h5>
                <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                           class="mt-3">
                  <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
                  <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
                  <!-- <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column> -->
                  <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }"></Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-4">
            <div class="card">
                <h5 v-if="lan == 'CN'">运载车辆消毒记录</h5>
                <h5 v-else>Vehicle disinfection records</h5>
                <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                           class="mt-3">
                  <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
                  <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
                  <!-- <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column> -->
                  <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }"></Column>
                </DataTable>
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
            lan:this.$store.state.language,
            flag: true,
            monitorService: null,
            cloth: null,
            barData: {
                labels: ['3月10日', '3月11日', '3月12日', '3月13日', '3月14日', '3月15日', '3月16日'],
                datasets: [
                    {
                        label: '牛',
                        backgroundColor: '#2f4860',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: '鸡',
                        backgroundColor: '#00bb7e',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    },
                    {
                        label: '鱼',
                        backgroundColor: '#96ffbb',
                        data: [36, 76, 28, 28, 33, 27, 15]
                    },
                ]
            },
            barOptions: {
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
                        type: 'linear',
                        position: 'left',
                        grid: {
                            color: '#ebedef',
                        }
                    }
                }
            },
            data1: [
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
                {
                    "batch_id": "0023456",
                    "type": "牛",
                    "food_duration": "12",
                    "water_duration": "10",
                    "check": "正常",
                    "check_id": 123456,
                    "status": "正常",
                    "date": "2023-10-15 10:00:00"
                },
            ],

        }
    },
    mounted() {
        this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        this.languageChangeListener = () => {
        this.lan = this.$store.state.language;
        if(this.lan == 'CN') {
          this.flag = true
        }else {
          this.flag = false
        }
      };
      EventBus.on('language-change', this.languageChangeListener);
    },
    created() {
        this.monitorService = new MonitorService();
    }
}
</script>
    
<style lang="scss" scoped>
.lable_title {
    font-size: large;
    font-weight: bold;
    text-align: center;
    margin-top: 0%;
    margin-bottom: 3%;
}

.lable_text {
    font-size: xx-large;
    font-weight: bold;
    text-align: center;
}
</style>