<template>
  <div class="grid">
    <div class="col-12">
      <div class="card md-0">
        <div class="grid">
          <div class="col-12">
            <div class="col-12 xl:col-12">
              <p v-if="lan == 'CN'" style="font-size: xx-large;font-weight: bold;text-align: center;">环境监测</p>
              <p v-else style="font-size: large;font-weight: bold;text-align: center;">Environmental monitoring</p>
            </div>
          </div>
          <div class="col-12 xl:col-3">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'">预冷间</span>
                    <span v-else>Cooling room</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">10°</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                    <span v-else class="lable_status" style="">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 xl:col-3">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'">冷却间</span>
                    <span v-else>Cooling room</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">2°</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                    <span v-else class="lable_status" style="">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 xl:col-3">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'">冷藏库</span>
                    <span v-else>Cold storage</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">-18°</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                    <span v-else class="lable_status" style="">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 xl:col-3">
            <div class="card mb-0 ">
              <div class="grid">
                <div class="col-4">
                  <div class="lable_title">
                    <span v-if="lan == 'CN'">冷冻库</span>
                    <span v-else>Freezer room</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_text">
                    <span class="lable_text">-28°</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="lable_status">
                    <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                    <span v-else class="lable_status" style="">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 xl:col-8">
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
						<Button label="查询" class="p-button-text" @click="query" style="font-size:small"/>
					</div>
				</div>
				<TabView>
					<TabPanel :header="lan === 'CN' ? '屠宰车间' : 'create procedure'">
						<DataTable v-model:expandedRows="expandedRows" :value="slaughterShopData" responsiveLayout="scroll"
							scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
														style="font-size: 10px; padding: 6px 8px;"></Tag>
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '分割车间' : 'create procedure'">
						<DataTable v-model:expandedRows="expandedRows" :value="divShopData" responsiveLayout="scroll"
							scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
														style="font-size: 10px; padding: 6px 8px;"></Tag>
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '排酸车间' : 'create procedure'">
						<DataTable v-model:expandedRows="expandedRows" :value="acidShopData" responsiveLayout="scroll"
							scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
														style="font-size: 10px; padding: 6px 8px;"></Tag>
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '冷冻库' : 'create procedure'">
						<DataTable v-model:expandedRows="expandedRows" :value="frozenShopData" responsiveLayout="scroll"
							scrollable scrollHeight="40vh" tableStyle="min-width: 10rem" scrollDirection="both">
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
														style="font-size: 10px; padding: 6px 8px;"></Tag>
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
					</TabPanel>
				</TabView>
			</div>

		</div>

		<div class="col-12 xl:col-4">
			<div class="card">
				<h5 v-if="lan == 'CN'">牧场消毒记录</h5>
				<h5 v-else>Work clothes disinfection record</h5>
				<!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

				<DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
					class="mt-3">
					<Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
					<Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen>
					</Column>
					<Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'"
						:style="{ width: '100px' }" :frozen="idFrozen"></Column>
					<Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }">
					</Column>
				</DataTable>
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
      lan: this.$store.state.language,
      flag: true,
      value: 40,
      monitorService: null,
      slaughterShopData:[],
      divShopData:[],
      acidShopData:[],
      frozenShopData:[],
      nodeService: null,
      shopDataMappings:'',
      shopDataMax:'',
      shopDataMIN:'',




    }
  },
  methods: {
    getPreColdShopData() {
      var house_number = localStorage.getItem("house_number");
      console.log("house_number", house_number);
      // 获取当前时间的秒级时间戳
      let end_timestamp = Math.floor(new Date().getTime() / 1000);

      // 获取当前时间前一天的秒级时间戳
      let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
      let start_timestamp = end_timestamp - oneDayInSeconds;
      axios.get('http://127.0.0.1:8000/fsims/slaughteroperator/query/sensor/precoolshop', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
        console.log('PreColdShopData:', res.data)


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
    EventBus.on('language-change', this.languageChangeListener);
    this.getPreColdShopData();

    this.nodeService.getShopDataMap().then(data => this.shopDataMappings=data);
    this.nodeService.getShopDataMAX().then(data => this.shopDataMax=data);
    this.nodeService.getShopDataMIN().then(data => this.shopDataMIN=data);
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