<template>
  <div class="grid">
    <div class="col-12">
      <div class="card md-0">
        <div class="grid">
          <div class="col-12">
            <div class="col-12 xl:col-12">
              <Toolbar v-if="usertype === 1">
                <template #center>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <Dropdown id="dropdown" v-model="slaughter" :options="slaughters" optionLabel="name"
                      placeholder="请选择屠宰场" />
                  </span>
                </template>
                
              </Toolbar>
            </div>
            <div class="col-12 xl:col-12">
              <p v-if="lan == 'CN'" style="font-size: xx-large;font-weight: bold;text-align: center;">环境监测</p>
              <p v-else style="font-size: large;font-weight: bold;text-align: center;">Environmental monitoring</p>
            </div>
          </div>
          <div class="col-3">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'" style="font-size:large">预冷间温度</span>
                    <span v-else>Cooling room</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">{{ pre_cool_shop_1 }}℃</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <div v-if="pre_cool_shop_1_state === 1">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="success" :value="'正常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                    <div v-else-if="pre_cool_shop_1_state === 2">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="danger" :value="'异常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 col-offset-1">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'" style="font-size:large">预冷间湿度</span>
                    <span v-else>Cooling room</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">{{ pre_cool_shop_2 }}%</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <div v-if="pre_cool_shop_2_state === 1">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="success" :value="'正常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                    <div v-else-if="pre_cool_shop_2_state === 2">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="danger" :value="'异常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3 col-offset-1">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'" style="font-size:large">副产物温度</span>
                    <span v-else>Cold storage</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">{{ pre_cool_shop_3 }}℃</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <div v-if="pre_cool_shop_3_state === 1">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="success" :value="'正常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                    <div v-else-if="pre_cool_shop_3_state === 2">
                      <div class="flex flex-wrap gap-2">
                        <Tag class="mr-2" severity="danger" :value="'异常'" style="font-size: 16px; padding: 8px 12px;">
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-8">
            <div class="grid">
              <div class="col-12">
                <div class="card">
                  <div class="grid">
                    <div class="col-2">
                      <h5 v-if="lan == 'CN'">屠宰场车间数据</h5>
                      <h5 v-else>Pasture situation</h5>
                    </div>
                    <div class="col-2">
                      <h5 v-if="lan == 'CN'" style="font-size: medium;margin-top: 8%;margin-left: 50%;">时间范围:</h5>
                      <h5 v-else>Pasture situation</h5>
                    </div>
                    <div class="col-3">
                      <Calendar id="calendar-24h" v-model="startTime" showTime hourFormat="24" />

                    </div>
                    <div class="col-1">
                      <h5 style="margin-top: 10%;">-</h5>
                    </div>
                    <div class="col-3">
                      <Calendar id="calendar-24h" v-model="endTime" showTime hourFormat="24" />
                    </div>

                    <div class="col-1">
                      <Toast />
                      <Button label="查询" class="p-button-text" @click="queryShopData" style="font-size:small" />
                    </div>
                  </div>
                  <TabView>
                    <TabPanel :header="lan === 'CN' ? '屠宰车间' : 'create procedure'">
                      <Dropdown id="dropdown" v-model="slaughterShopTime" :options="slaughterShopTimes"
                        optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                      <Button label="展示" class="p-button-text" @click="showslaughterShop" />
                      <DataTable :value="slaughterShopData" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                        <Column field="name" header="指标" sortable></Column>
                        <Column field="value" header="当前值" sortable></Column>
                        <Column field="min" header="最小值" sortable></Column>
                        <Column field="max" header="最大值" sortable></Column>
                        <Column field="state" header="状态" sortable>
                          <template #body="rowData">
                            <div v-if="rowData.data.state === 1">
                              <Tag class="mr-2" severity="success" :value="'正常'"
                                style="font-size: 10px; padding: 6px 8px;">
                              </Tag>
                            </div>
                            <div v-else-if="rowData.data.state === 2">
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="danger" :value="'异常'"
                                  style="font-size: 10px; padding: 6px 8px;">
                                </Tag>
                              </div>
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '分割车间' : 'create procedure'">
                      <Dropdown id="dropdown" v-model="divShopTime" :options="divShopTimes" optionLabel="time_record_at"
                        placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                      <Button label="展示" class="p-button-text" @click="showdivShop" />
                      <DataTable :value="divShopData" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                        <Column field="name" header="指标" sortable></Column>
                        <Column field="value" header="当前值" sortable></Column>
                        <Column field="min" header="最小值" sortable></Column>
                        <Column field="max" header="最大值" sortable></Column>
                        <Column field="state" header="状态" sortable>
                          <template #body="rowData">
                            <div v-if="rowData.data.state === 1">
                              <Tag class="mr-2" severity="success" :value="'正常'"
                                style="font-size: 10px; padding: 6px 8px;">
                              </Tag>
                            </div>
                            <div v-else-if="rowData.data.state === 2">
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="danger" :value="'异常'"
                                  style="font-size: 10px; padding: 6px 8px;">
                                </Tag>
                              </div>
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '排酸车间' : 'create procedure'">
                      <Dropdown id="dropdown" v-model="acidShopTime" :options="acidShopTimes" optionLabel="time_record_at"
                        placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                      <Button label="展示" class="p-button-text" @click="showacidShop" />
                      <DataTable :value="acidShopData" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                        <Column field="name" header="指标" sortable></Column>
                        <Column field="value" header="当前值" sortable></Column>
                        <Column field="min" header="最小值" sortable></Column>
                        <Column field="max" header="最大值" sortable></Column>
                        <Column field="state" header="状态" sortable>
                          <template #body="rowData">
                            <div v-if="rowData.data.state === 1">
                              <Tag class="mr-2" severity="success" :value="'正常'"
                                style="font-size: 10px; padding: 6px 8px;">
                              </Tag>
                            </div>
                            <div v-else-if="rowData.data.state === 2">
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="danger" :value="'异常'"
                                  style="font-size: 10px; padding: 6px 8px;">
                                </Tag>
                              </div>
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '冷冻库' : 'create procedure'">
                      <Dropdown id="dropdown" v-model="frozenShopTime" :options="frozenShopTimes"
                        optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                      <Button label="展示" class="p-button-text" @click="showfrozenShop" />
                      <DataTable :value="frozenShopData" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                        <Column field="name" header="指标" sortable></Column>
                        <Column field="value" header="当前值" sortable></Column>
                        <Column field="min" header="最小值" sortable></Column>
                        <Column field="max" header="最大值" sortable></Column>
                        <Column field="state" header="状态" sortable>
                          <template #body="rowData">
                            <div v-if="rowData.data.state === 1">
                              <Tag class="mr-2" severity="success" :value="'正常'"
                                style="font-size: 10px; padding: 6px 8px;">
                              </Tag>
                            </div>
                            <div v-else-if="rowData.data.state === 2">
                              <div class="flex flex-wrap gap-2">
                                <Tag class="mr-2" severity="danger" :value="'异常'"
                                  style="font-size: 10px; padding: 6px 8px;">
                                </Tag>
                              </div>
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </TabPanel>
                  </TabView>
                </div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="grid">
                    <div class="col-2">
                      <h5 v-if="lan == 'CN'">屠宰场水质数据</h5>
                      <h5 v-else>Pasture situation</h5>
                    </div>
                    <div class="col-2">
                      <h5 v-if="lan == 'CN'" style="font-size: medium;margin-top: 8%;margin-left: 50%;">时间范围:</h5>
                      <h5 v-else>Pasture situation</h5>
                    </div>
                    <div class="col-3">
                      <Calendar id="calendar-24h" v-model="startTime" showTime hourFormat="24" />

                    </div>
                    <div class="col-1">
                      <h5 style="margin-top: 10%;">-</h5>
                    </div>
                    <div class="col-3">
                      <Calendar id="calendar-24h" v-model="endTime" showTime hourFormat="24" />
                    </div>

                    <div class="col-1">
                      <Toast />
                      <Button label="查询" class="p-button-text" @click="queryWaterQulityData" style="font-size:small" />
                    </div>
                  </div>
                  <Dropdown id="dropdown" v-model="waterQulityTime" :options="waterQulityTimes"
                    optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
                  <Button label="展示" class="p-button-text" @click="showwaterQulity" />
                  <DataTable v-model:expandedRows="expandedRows" :value="waterQulityData" responsiveLayout="scroll"
                    scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
                    <template #header>
                      <div class="table-header-container">
                        <span v-if="flag" class="text-xl text-900 font-bold">屠宰场水质数据</span>
                        <span v-else class="text-xl text-900 font-bold">High-risk food</span>
                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                      </div>
                    </template>
                    <Column expander="true" headerStyle="width: 3rem" />
                    <Column v-if="flag" field="project" header="项目" style="min-width: 200px"></Column>
                    <Column v-else field="project" header="From"></Column>
                    <template #expansion="rowData">
                      <div class="orders-subtable">
                        <DataTable :value="rowData.data.data">
                          <Column field="name" header="指标" sortable></Column>
                          <Column field="value" header="当前值" sortable></Column>
                          <Column field="normal" header="标准值" sortable></Column>
                          <Column field="state" header="状态" sortable>
                            <template #body="rowData">
                              <div v-if="rowData.data.state === 1">
                                <Tag class="mr-2" severity="success" :value="'正常'"
                                  style="font-size: 10px; padding: 6px 8px;">
                                </Tag>
                              </div>
                              <div v-else-if="rowData.data.state === 2">
                                <div class="flex flex-wrap gap-2">
                                  <Tag class="mr-2" severity="danger" :value="'异常'"
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
          <div class="col-12 xl:col-4">
            <div class="grid">
              <div class="col-12">
                <div class="card">
                  <TabView>
                    <TabPanel :header="lan === 'CN' ? '排酸间' : 'create procedure'">
                      <Carousel :value="ppictures" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
                        class="custom-carousel" :circular="true" :autoplayInterval="8000">
                        <template #item="slotProps">
                          <div class="product-item">
                            <div class="product-item-content">
                              <div class="mb-3">
                                <img :src="'images/product' + slotProps.data.name" :alt="slotProps.data.name" width="300"
                                  class="product-image" />
                              </div>
                            </div>
                          </div>
                        </template>
                      </Carousel>
                    </TabPanel>
                    <TabPanel :header="lan === 'CN' ? '胴体' : 'create procedure'">
                      <Carousel :value="dpictures" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
                        class="custom-carousel" :circular="true" :autoplayInterval="8000">
                        <template #item="slotProps">
                          <div class="product-item">
                            <div class="product-item-content">
                              <div class="mb-3">
                                <img :src="'images/product' + slotProps.data.name" :alt="slotProps.data.name" width="250"
                                  class="product-image" style="margin-left:10%" />
                                <!-- <img :src="'http://pic.bizhi360.com/bbpic/92/1692.jpg'" :alt="slotProps.data.name" width="250"
                                  class="product-image" style="margin-left:10%" /> -->
                              </div>
                            </div>
                          </div>
                        </template>
                      </Carousel>
                    </TabPanel>
                  </TabView>
                </div>
              </div>
              <div class="col-12">
                <div class="card">
                  <h5 v-if="lan == 'CN'">屠宰场光照记录</h5>
                  <h5 v-else>Work clothes disinfection record</h5>
                  <!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

                  <DataTable :value="LightData" :scrollable="true" scrollHeight="400px" :loading="loading2"
                    scrollDirection="both" class="mt-3">
                    <Column field="time_record_at" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '250px' }">
                    </Column>
                    <Column field="sla_env_lig_rec_1" :header="lan === 'CN' ? '屠宰' : 'Method'" :style="{ width: '100px' }"
                      frozen>
                    </Column>
                    <Column field="sla_env_lig_rec_2" :header="lan === 'CN' ? '车间' : 'Concentration'"
                      :style="{ width: '100px' }" :frozen="idFrozen"></Column>
                    <Column field="sla_env_lig_rec_3" :header="lan === 'CN' ? '检疫' : 'Duration'"
                      :style="{ width: '100px' }">
                    </Column>
                    <Column field="sla_env_lig_rec_4" :header="lan === 'CN' ? '预冷' : 'Duration'"
                      :style="{ width: '100px' }">
                    </Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
// import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
import axios from 'axios';
import NodeService from '../service/NodeService';
export default {
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2
        },
        {
          breakpoint: '10000000px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      lan: this.$store.state.language,
      flag: true,
      value: 40,
      slaughter:'',
      slaughters: [],
      usertype: 0,
      monitorService: null,
      startTime: '',
      endTime: '',
      slaughterShopData: [],
      slaughterShopTimes: [],
      slaughterShopTime: '',
      divShopData: [],
      divShopTimes: [],
      divShopTime: '',
      acidShopData: [],
      acidShopTimes: [],
      acidShopTime: '',
      frozenShopData: [],
      frozenShopTimes: [],
      frozenShopTime: '',
      staUniformData: [],
      nodeService: null,
      shopDataMappings: '',
      shopDataMax: '',
      shopDataMIN: '',
      waterQualityDataMappings: '',
      waterQualityDataMAX: '',
      waterQulityTimes: [],
      waterQulityTime: '',
      waterQulityData: [
        {
          project: "微生物指标",
          data: ''
        },
        {
          project: "感官性状和一般化学指标",
          data: ''
        },
        {
          project: "屠宰污水毒理性指标",
          data: ''
        },
        {
          project: "其他毒理性指标",
          data: ''
        },
      ],
      expandedRows: [],
      pre_cool_shop_1: 0,
      pre_cool_shop_2: 0,
      pre_cool_shop_3: 0,
      latestTime: '',
      pre_cool_shop_1_state: 1,
      pre_cool_shop_2_state: 1,
      pre_cool_shop_3_state: 1,
      LightData: [],
      dpictures: [
        {
          name: "/d1.jpg"
        },
        {
          name: "/d2.jpg"
        },
        {
          name: "/d3.jpg"
        },
        {
          name: "/d4.jpg"
        },
        {
          name: "/d5.jpg"
        }
      ],
      ppictures: [
        {
          name: "/p1.jpg"
        },
        {
          name: "/p2.jpg"
        },
        {
          name: "/p3.jpg"
        },
        {
          name: "/p4.jpg"
        },
        {
          name: "/p5.jpg"
        }
      ],






    }
  },
  methods: {
    getPreColdShopData() {
      var house_number='';
      if(this.usertype===1){
        house_number=this.slaughter.house_number
      }else{
        house_number = localStorage.getItem("house_number");
        console.log("house_number", house_number);
      }
      // 获取当前时间的秒级时间戳
      let end_timestamp = Math.floor(new Date().getTime() / 1000);

      // 获取当前时间前一天的秒级时间戳
      let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
      let start_timestamp = end_timestamp - oneDayInSeconds;
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/precoolshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        if (res.data.statusCode == 200) {
          console.log('PreColdShopData:', res.data)
          let len = res.data.data.count;
          this.pre_cool_shop_1 = res.data.data.shop_infos[len - 1].pre_cool_shop_1;
          this.pre_cool_shop_1_state = (this.pre_cool_shop_1 >= 0 && this.pre_cool_shop_1 <= 4) ? 1 : 2;
          this.pre_cool_shop_2 = res.data.data.shop_infos[len - 1].pre_cool_shop_2;
          this.pre_cool_shop_2_state = (this.pre_cool_shop_2 >= 85 && this.pre_cool_shop_2 <= 90) ? 1 : 2;
          this.pre_cool_shop_3 = res.data.data.shop_infos[len - 1].pre_cool_shop_3;
          this.pre_cool_shop_3_state = (this.pre_cool_shop_3 <= 3) ? 1 : 2;
          this.latestTime = res.data.data.shop_infos[len - 1].time_record_at;
        }
      })
    },
    getLight() {
      var house_number='';
      if(this.usertype===1){
        house_number=this.slaughter.house_number
      }else{
        house_number = localStorage.getItem("house_number");
        console.log("house_number", house_number);
      }
      // 获取当前时间的秒级时间戳
      let end_timestamp = Math.floor(new Date().getTime() / 1000);

      // 获取当前时间前一天的秒级时间戳
      let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
      let start_timestamp = end_timestamp - oneDayInSeconds;
      axios.get('http://127.0.0.1:8000/fsims/user/query/light', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        if (res.data.statusCode == 200) {
          console.log('LightData:', res.data)
          this.LightData = res.data.data.infos
          //let len = res.data.data.count;
        }

      })
    },
    queryShopData() {
      console.log("startTime:", this.startTime.getTime());
      console.log("endTime:", this.endTime.getTime());
      // console.log("test:",this.feedHeavyMetalMappings)
      var house_number='';
      if(this.usertype===1){
        house_number=this.slaughter.house_number
      }else{
        house_number = localStorage.getItem("house_number");
        console.log("house_number", house_number);
      }
      var start_timestamp = parseInt(this.startTime.getTime() / 1000);
      var end_timestamp = parseInt(this.endTime.getTime() / 1000);
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/slashop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('slaughter:', res.data)
        this.slaughterShopTimes = res.data.data.shop_infos
      })
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/divshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('div:', res.data)
        this.divShopTimes = res.data.data.shop_infos
      })
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/acidshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('slaughter:', res.data)
        this.acidShopTimes = res.data.data.shop_infos
      })
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/frozenshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('slaughter:', res.data)
        this.frozenShopTimes = res.data.data.shop_infos
      })
    },
    queryWaterQulityData() {
      console.log("startTime:", this.startTime.getTime());
      console.log("endTime:", this.endTime.getTime());
      // console.log("test:",this.feedHeavyMetalMappings)
      var house_number='';
      if(this.usertype===1){
        house_number=this.slaughter.house_number
      }else{
        house_number = localStorage.getItem("house_number");
        console.log("house_number", house_number);
      }
      var start_timestamp = parseInt(this.startTime.getTime() / 1000);
      var end_timestamp = parseInt(this.endTime.getTime() / 1000);
      axios.get('http://127.0.0.1:8000/fsims/user/query/sensor/waterquality', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('waterQuality:', res.data)
        if (res.data.statusCode == 200) {
          this.waterQulityTimes = res.data.data.infos
          this.$toast.add({ severity: 'success', summary: '查询成功', detail: '请查看', life: 3000 });
        } else {
          this.$toast.add({ severity: 'error', summary: '查询失败', detail: res.data.message, life: 3000 });
        }
      })
    },
    showslaughterShop() {
      console.log("test:", this.slaughterShopTime)
      var data = this.slaughterShopTime;
      let slaughterShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
        key => {
          let name = this.shopDataMappings[key];
          let value = data[key];
          let max;
          let min;
          let state;
          if (typeof (value) === 'number') {
            max = this.shopDataMax[key];
            min = this.shopDataMIN[key];
            if (typeof (max) === 'number' && typeof (min) === 'number') {
              state = (value >= min && value <= max) ? 1 : 2;
            } else if (typeof max === 'number') {
              // 如果只有最大值，进行最大值比较
              state = (value <= max) ? 1 : 2;
            } else if (typeof min === 'number') {
              // 如果只有最小值，进行最小值比较
              state = (value >= min) ? 1 : 2;
            }
          }
          return { name, value, max, min, state };
        }
      )
      this.slaughterShopData = slaughterShopData;
    },
    showdivShop() {
      console.log("test:", this.divShopTime)
      var data = this.divShopTime;
      let divShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
        key => {
          let name = this.shopDataMappings[key];
          let value = data[key];
          let max;
          let min;
          let state;
          if (typeof (value) === 'number') {
            max = this.shopDataMax[key];
            min = this.shopDataMIN[key];
            if (typeof (max) === 'number' && typeof (min) === 'number') {
              state = (value >= min && value <= max) ? 1 : 2;
            } else if (typeof max === 'number') {
              // 如果只有最大值，进行最大值比较
              state = (value <= max) ? 1 : 2;
            } else if (typeof min === 'number') {
              // 如果只有最小值，进行最小值比较
              state = (value >= min) ? 1 : 2;
            }
          }
          return { name, value, max, min, state };
        }
      )
      this.divShopData = divShopData;
    },
    showacidShop() {
      console.log("test:", this.acidShopTime)
      var data = this.acidShopTime;
      let acidShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
        key => {
          let name = this.shopDataMappings[key];
          let value = data[key];
          let max;
          let min;
          let state;
          if (typeof (value) === 'number') {
            max = this.shopDataMax[key];
            min = this.shopDataMIN[key];
            if (typeof (max) === 'number' && typeof (min) === 'number') {
              state = (value >= min && value <= max) ? 1 : 2;
            } else if (typeof max === 'number') {
              // 如果只有最大值，进行最大值比较
              state = (value <= max) ? 1 : 2;
            } else if (typeof min === 'number') {
              // 如果只有最小值，进行最小值比较
              state = (value >= min) ? 1 : 2;
            }
          }
          return { name, value, max, min, state };
        }
      )
      this.acidShopData = acidShopData;
    },
    showfrozenShop() {
      console.log("test:", this.frozenShopTime)
      var data = this.frozenShopTime;
      let frozenShopData = Object.keys(data).filter(key => this.shopDataMappings[key]).map(
        key => {
          let name = this.shopDataMappings[key];
          let value = data[key];
          let max;
          let min;
          let state;
          if (typeof (value) === 'number') {
            max = this.shopDataMax[key];
            min = this.shopDataMIN[key];
            if (typeof (max) === 'number' && typeof (min) === 'number') {
              state = (value >= min && value <= max) ? 1 : 2;
            } else if (typeof max === 'number') {
              // 如果只有最大值，进行最大值比较
              state = (value <= max) ? 1 : 2;
            } else if (typeof min === 'number') {
              // 如果只有最小值，进行最小值比较
              state = (value >= min) ? 1 : 2;
            }
          }
          return { name, value, max, min, state };
        }
      )
      this.frozenShopData = frozenShopData;
    },
    showwaterQulity() {
      console.log("test:", this.waterQulityTime)
      var data = this.waterQulityTime;
      let slaughter_water_micro_index = Object.keys(data.slaughter_water_micro_index).map(
        key => {
          let name = this.waterQualityDataMappings[key] || 'Unknown';
          let value = data.slaughter_water_micro_index[key];
          let normal = this.waterQualityDataMAX[key];
          let state = 1;
          if (value >= normal) {
            state = 2;
          }
          return { name, value, normal, state };
        }
      )
      let oap_gci_sla = Object.keys(data.oap_gci_sla).map(
        key => {
          let name = this.waterQualityDataMappings[key] || 'Unknown';
          let value = data.oap_gci_sla[key];
          let normal = this.waterQualityDataMAX[key];
          let state = 1;
          if (value >= normal) {
            state = 2;
          }
          return { name, value, normal, state };
        }
      )
      let toxin_index_sla = Object.keys(data.toxin_index_sla).filter(key => this.waterQualityDataMappings[key]).map(
        key => {
          let name = this.waterQualityDataMappings[key] || 'Unknown';
          let value = data.toxin_index_sla[key];
          let normal = this.waterQualityDataMAX[key];
          let state = 1;
          if (value >= normal) {
            state = 2;
          }
          return { name, value, normal, state };
        }
      )
      //console.log("test:",res.data.data.infos[len - 1].toxin_index_sla.slaughter_water_toxin_index)
      let slaughter_water_toxin_index = Object.keys(data.toxin_index_sla.slaughter_water_toxin_index).map(
        key => {
          let name = this.waterQualityDataMappings[key] || 'Unknown';
          let value = data.toxin_index_sla.slaughter_water_toxin_index[key];
          let normal = this.waterQualityDataMAX[key];
          let state = 1;
          if (value >= normal) {
            state = 2;
          }
          return { name, value, normal, state };
        }
      )
      this.waterQulityData[0].data = slaughter_water_micro_index;
      this.waterQulityData[1].data = oap_gci_sla;
      this.waterQulityData[2].data = toxin_index_sla;
      this.waterQulityData[3].data = slaughter_water_toxin_index;
    },
    getSlaughterhouse() {
      axios.get('http://127.0.0.1:8000/fsims/user/slaughterhouses').then(res => {
        console.log('slaughterhouse:', res.data.data)
        this.slaughters = res.data.data.houses
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
    this.getPreColdShopData();
    this.getLight();
    this.getSlaughterhouse();
    this.usertype = parseInt(localStorage.getItem('user_type'))
    this.nodeService.getShopDataMap().then(data => this.shopDataMappings = data);
    this.nodeService.getShopDataMAX().then(data => this.shopDataMax = data);
    this.nodeService.getShopDataMIN().then(data => this.shopDataMIN = data);
    this.nodeService.getwaterQualityDataMap().then(data => this.waterQualityDataMappings = data);
    this.nodeService.getwaterQualityDataMAX().then(data => this.waterQualityDataMAX = data);

  },
  computed: {

  },
  created() {
    this.nodeService = new NodeService();
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
<!-- <script setup>
import { ref } from "vue";

const value = ref(40);
</script> -->