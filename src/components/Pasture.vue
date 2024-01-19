<template>
	<div class="grid">
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3">牛数量</span>
						<span v-else class="block text-500 font-medium mb-3">Number of cattle</span>
						<div class="text-900 font-medium text-xl">152</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-blue-100 border-round"
						style="width:2.5rem;height:2.5rem">
						<i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
					</div>
				</div>

				<span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
				<span v-else class="text-500">New from yesterday</span>
				<span v-if="lan == 'CN'" class="text-green-500 font-medium">24 头</span>
				<span v-else class="text-green-500 font-medium">24 heads</span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3">鸡数量</span>
						<span v-else class="block text-500 font-medium mb-3">Number of chickens</span>
						<div class="text-900 font-medium text-xl">2100</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-orange-100 border-round"
						style="width:2.5rem;height:2.5rem">
						<i class="pi pi-map-marker text-orange-500 text-xl"></i>
					</div>
				</div>
				<span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
				<span v-else class="text-500">New from yesterday</span>
				<span v-if="lan == 'CN'" class="text-green-500 font-medium">240 只</span>
				<span v-else class="text-green-500 font-medium">240 pieces</span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3">工人数量</span>
						<span v-else class="block text-500 font-medium mb-3">Number of workers</span>
						<div class="text-900 font-medium text-xl">12</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
						style="width:2.5rem;height:2.5rem">
						<i class="pi pi-inbox text-cyan-500 text-xl"></i>
					</div>
				</div>
				<span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
				<span v-else class="text-500">New from yesterday</span>
				<span class="text-green-500 font-medium">0 </span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3">运输车数量</span>
						<span v-else class="block text-500 font-medium mb-3">Number of transport vehicles</span>
						<div class="text-900 font-medium text-xl">10</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-purple-100 border-round"
						style="width:2.5rem;height:2.5rem">
						<i class="pi pi-comment text-purple-500 text-xl"></i>
					</div>
				</div>
				<span v-if="lan == 'CN'" class="text-500">较昨日新增 </span>
				<span v-else class="text-500">New from yesterday</span>
				<span v-if="lan == 'CN'" class="text-green-500 font-medium">0 辆 </span>
				<span v-else class="text-green-500 font-medium">0 vehicles</span>
			</div>
		</div>
		<div class="col-6">
			<div class="card">
				<h5 v-if="lan == 'CN'" class="align-self-start">环境物理危害</h5>
				<h5 v-else class="align-self-start">physical hazard</h5>
				<TabView>
					<TabPanel v-for="phyData in phyDatas" :key="phyData.title" :header="phyData.title">
						<Chart type="radar" :data="phyData.content" :options="radarOptions"
							:canvasProps="{ 'height': '100', 'width': '100' }" />
					</TabPanel>
				</TabView>
			</div>
		</div>

		<div class="col-6">
			<div class="card">
				<h5 v-if="lan == 'CN'" class="align-self-start">环境化学危害</h5>
				<h5 v-else class="align-self-start">physical hazard</h5>
				<TabView>
					<TabPanel v-for="chemData in chemDatas" :key="chemData.title" :header="chemData.title">
						<Chart type="radar" :data="chemData.content" :options="radarOptions" />
					</TabPanel>
				</TabView>
			</div>
		</div>

		<div class="col-12 xl:col-8">
			<div class="card">
				<div class="grid">
					<div class="col-12">
                        <Dropdown v-if="usertype===1" id="dropdown" v-model="feedHeavyMetalTime" :options="feedHeavyMetalTimes"
							optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:10%" />
						<Button v-if="usertype===1" label="展示" class="p-button-text" @click="showfeedHeavyMetal" />
					</div>
					<div class="col-2">
						<h5 v-if="lan == 'CN'">牧场情况</h5>
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
						<Button label="查询" class="p-button-text" @click="query" />
					</div>
				</div>
				<TabView>
					<TabPanel :header="lan === 'CN' ? '饲料重金属' : 'create procedure'">
						<Dropdown id="dropdown" v-model="feedHeavyMetalTime" :options="feedHeavyMetalTimes"
							optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
						<Button label="展示" class="p-button-text" @click="showfeedHeavyMetal" />
						<DataTable v-model:expandedRows="expandedRows" :value="feedHeavyMetal" responsiveLayout="scroll"
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
					<TabPanel :header="lan === 'CN' ? '饲料毒素农药残留' : 'create procedure'">
						<Dropdown id="dropdown" v-model="feedMycotoxinsTime" :options="feedMycotoxinsTimes"
							optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
						<Button label="展示" class="p-button-text" @click="showfeedMycotoxins" />
						<DataTable v-model:expandedRows="expandedRows" :value="feedMycotoxins" responsiveLayout="scroll"
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
					<TabPanel :header="lan === 'CN' ? '牧场饮用水' : 'create procedure'">
						<Dropdown id="dropdown" v-model="waterRecordTime" :options="waterRecordTimes"
							optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
						<Button label="展示" class="p-button-text" @click="showwaterRecord" />
						<DataTable v-model:expandedRows="expandedRows" :value="waterRecord" responsiveLayout="scroll"
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
					<TabPanel :header="lan === 'CN' ? '牧场基本环境' : 'create procedure'">
						<DataTable :value="basicenvironment" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
							<Dropdown id="dropdown" v-model="basicenvironmentTime" :options="basicenvironmentTimes"
								optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
							<Button label="展示" class="p-button-text" @click="showbasicenvironment" />
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '缓冲区' : 'create procedure'">
						<DataTable :value="buffer" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
							<Dropdown id="dropdown" v-model="bufferTime" :options="bufferTimes" optionLabel="time_record_at"
								placeholder="请选择时间" style="width: 20%;margin-left:70%" />
							<Button label="展示" class="p-button-text" @click="showbuffer" />
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '场区' : 'create procedure'">
						<DataTable :value="area" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
							<Dropdown id="dropdown" v-model="areaTime" :options="areaTimes" optionLabel="time_record_at"
								placeholder="请选择时间" style="width: 20%;margin-left:70%" />
							<Button label="展示" class="p-button-text" @click="showarea" />
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '牛舍' : 'create procedure'">
						<DataTable :value="cowhouse" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
							<Dropdown id="dropdown" v-model="cowhouseTime" :options="cowhouseTimes"
								optionLabel="time_record_at" placeholder="请选择时间" style="width: 20%;margin-left:70%" />
							<Button label="展示" class="p-button-text" @click="showcowhouse" />
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
					</TabPanel>
					<TabPanel :header="lan === 'CN' ? '垫料' : 'create procedure'">
						<DataTable :value="paddle" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
							<Dropdown id="dropdown" v-model="paddleTime" :options="paddleTimes" optionLabel="time_record_at"
								placeholder="请选择时间" style="width: 20%;margin-left:70%" />
							<Button label="展示" class="p-button-text" @click="showpaddle" />
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
					</TabPanel>
				</TabView>
			</div>

		</div>

		<div class="col-12 xl:col-4">
			<div class="card">
				<h5 v-if="lan == 'CN'">牧场消毒记录</h5>
				<h5 v-else>Work clothes disinfection record</h5>
				<!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

				<DataTable :value="disinfectionRecord" :scrollable="true" scrollHeight="400px" :loading="loading2"
					scrollDirection="both" class="mt-3">
					<Column field="time_record_at" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }">
					</Column>
					<Column field="farm_dis_record_1" :header="lan === 'CN' ? '牧场消毒时间' : 'Date'"
						:style="{ width: '200px' }"></Column>
					<Column field="farm_dis_record_2" :header="lan === 'CN' ? '消毒剂种类' : 'Method'"
						:style="{ width: '200px' }">
					</Column>
					<Column field="farm_dis_record_3" :header="lan === 'CN' ? '消毒剂浓度' : 'Concentration'"
						:style="{ width: '200px' }"></Column>
				</DataTable>
			</div>
		</div>





	</div>
</template>

<script>

import EventBus from '../AppEventBus';
import axios from 'axios';

// import ProductService from '../service/ProductService';
import NodeService from '../service/NodeService'
// import MonitorService from '../service/MonitorService';
// const expandedKeys = ref({});
export default {
	data() {
		return {
			// add:
			usertype: 0,
			lan: this.$store.state.language,
			flag: true,
			treeTableValue: null,
			nodeService: null,
			monitorService: null,
			cloth: null,
			startTime: '',
			endTime: '',
			radarOptions: {
				plugins: {
					legend: {
						labels: {
							color: '#495057',
						}
					}
				},
				scales: {
					r: {
						grid: {
							color: '#ebedef'
						}
					}
				}
			},

			phyDatas: [
				{
					title: '缓冲区',
					content: {
						labels: ['锌', '镉', '铅', '铬', '砷', '铜'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [200, 0.3, 250, 250, 30, 50]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [28, 48, 40, 19, 96, 27]
							}
						]
					},
				},
				{
					title: '场区',
					content: {
						labels: ['锌', '镉', '铅', '铬', '砷', '铜'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [200, 0.3, 250, 250, 30, 50]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [28, 48, 40, 19, 96, 27]
							}
						]
					}
				},
				{
					title: '牛舍',
					content: {
						labels: ['锌', '镉', '铅', '铬', '砷', '铜'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [200, 0.3, 250, 250, 30, 50]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [28, 48, 40, 19, 96, 27]
							}
						]
					}

				},
				{
					title: '牧场垫料',
					content: {
						labels: ['汞', '镉', '铅', '铬'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [2.0, 0.5, 30, 1.0]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [1, 0.3, 10, 0.5]
							}
						]
					}

				},
				{
					title: '水质',
					content: {
						labels: ['汞', '镉', '铅', '砷'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [0.001, 0.01, 0.05, 0.05]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [0.001, 0.01, 0.01, 0.01]
							}
						]
					}

				},


			],
			chemDatas: [
				{
					title: '缓冲区',
					content: {
						labels: ['NH3氨气', 'H2S硫化氢', 'PM10', 'TSP'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [2, 1, 0.5, 1]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [1, 0.5, 0.1, 1]
							}
						]
					},
				},
				{
					title: '场区',
					content: {
						labels: ['NH3氨气', 'H2S硫化氢', 'PM10', 'TSP'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [5, 2, 1, 1]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [3, 1, 0.5, 0.5]
							}
						]
					},
				},
				{
					title: '牛舍',
					content: {
						labels: ['NH3氨气', 'H2S硫化氢', 'PM10', 'TSP'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [20, 8, 2, 4]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [12, 6, 1, 2]
							}
						]
					},
				},
				{
					title: '水质',
					content: {
						labels: ['三氯甲烷', '一氯二溴甲烷', '三溴甲烷', '溴酸盐', '亚氯酸盐', '氯酸盐'],
						datasets: [
							{
								label: '标准范围',
								backgroundColor: 'rgba(179,181,198,0.2)',
								borderColor: 'rgba(179,181,198,1)',
								pointBackgroundColor: 'rgba(179,181,198,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(179,181,198,1)',
								data: [0.06, 0.1, 0.1, 0.01, 0.7, 0.7]
							},
							{
								label: '当前测量值',
								backgroundColor: 'rgba(255,99,132,0.2)',
								borderColor: 'rgba(255,99,132,1)',
								pointBackgroundColor: 'rgba(255,99,132,1)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgba(255,99,132,1)',
								data: [0.05, 0.05, 0.05, 0.01, 0.1, 0.1]
							}
						]
					},
				},
			],
			feedHeavyMetalMappings: '',
			feedHeavyMetalNormal: '',
			feedMycotoxinsMappings: '',
			feedMycotoxinsNormal: '',
			waterRecordMappings: '',
			waterRecordNormal: '',
			environmentMappings: '',
			environmentNormal: '',
			feedHeavyMetal: [
				{
					project: "砷元素",
					data: ''
				},
				{
					project: "铅元素",
					data: ''
				},
				{
					project: "镉元素",
					data: ''
				},
				{
					project: "铬元素",
					data: ''
				},
			],
			feedMycotoxins: [
				{
					project: "黄曲霉毒素B1",
					data: ''
				},
				{
					project: "玉米赤霉烯酮",
					data: ''
				},
				{
					project: "脱氧雪腐镰刀菌烯醇（呕吐毒素）",
					data: ''
				},
				{
					project: "T-2毒素 伏马毒素 赭曲霉毒素A",
					data: ''
				},
			],
			waterRecord: [
				{
					project: "感官性状和一般化学指标",
					data: ''
				},
				{
					project: "毒理性指标",
					data: ''
				},
				{
					project: "微生物指标",
					data: ''
				},
			],
			expandedRows: [],
			disinfectionRecord: [],
			feedHeavyMetalTime: '',
			feedHeavyMetalTimes: [],
			feedMycotoxinsTime: '',
			feedMycotoxinsTimes: [],
			waterRecordTime: '',
			waterRecordTimes: [],
			basicenvironmentTime: '',
			basicenvironmentTimes: [],
			basicenvironment: [],
			bufferTime: '',
			bufferTimes: [],
			buffer: [],
			areaTime: '',
			areaTimes: [],
			area: [],
			cowhouseTime: '',
			cowhouseTimes: [],
			cowhouse: [],
			paddleTime: '',
			paddleTimes: [],
			paddle: [],







			// end
			products: null,
			lineData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Revenue',
						data: [65, 59, 80, 81, 56, 55, 40],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860',
						tension: 0.4
					},
					{
						label: 'Sales',
						data: [28, 48, 40, 19, 86, 27, 90],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e',
						tension: 0.4
					}
				]
			},
			items: [
				{ label: 'Add New', icon: 'pi pi-fw pi-plus' },
				{ label: 'Remove', icon: 'pi pi-fw pi-minus' }
			],
			lineOptions: null,
		}
	},
	productService: null,
	themeChangeListener: null,
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
		this.getDisinfection();
		// this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
        
		// this.nodeService.getTreeNodes().then(data => this.treeValue = data);
		this.nodeService.getFeedHeavyMetalMap().then(data => this.feedHeavyMetalMappings = data);
		this.nodeService.getFeedHeavyMetalNormal().then(data => this.feedHeavyMetalNormal = data);
		this.nodeService.getFeedMycotoxinsMap().then(data => this.feedMycotoxinsMappings = data);
		this.nodeService.getFeedMycotoxinsNormal().then(data => this.feedMycotoxinsNormal = data);
		this.nodeService.getwaterRecordMap().then(data => this.waterRecordMappings = data);
		this.nodeService.getwaterRecordNormal().then(data => this.waterRecordNormal = data);
		this.nodeService.getenvironmentMap().then(data => this.environmentMappings = data);
		this.nodeService.getenvironmentNormal().then(data => this.environmentNormal = data);
		// this.productService.getProductsSmall().then(data => this.products = data);

		// this.themeChangeListener = (event) => {
		// 	if (event.dark)
		// 		this.applyDarkTheme();
		// 	else
		// 		this.applyLightTheme();
		// };
		// EventBus.on('change-theme', this.themeChangeListener);

		// if (this.isDarkTheme()) {
		// 	this.applyDarkTheme();
		// }
		// else {
		// 	this.applyLightTheme();
		// }
	},
	beforeUnmount() {
		EventBus.off('change-theme', this.themeChangeListener);
	},
	created() {
		// this.productService = new ProductService();
		this.nodeService = new NodeService();
		
		// this.monitorService = new MonitorService();
	},
	// computed: {
	// radarData() {
	// 	return this.lan === 'CN' ? this.radarDataCn : this.radarDataEn;
	// },
	// radarData1() {
	// 	return this.lan === 'CN' ? this.radarData1Cn : this.radarData1En;
	// }
	// },
	methods: {
		getDisinfection() {
			var house_number = localStorage.getItem("house_number");
			console.log("house_number", house_number);
			// 获取当前时间的秒级时间戳
			let end_timestamp = Math.floor(new Date().getTime() / 1000);

			// 获取当前时间前一天的秒级时间戳
			let oneDayInSeconds = 24 * 60 * 60; // 一天的秒数
			let start_timestamp = end_timestamp - oneDayInSeconds;
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/disinfectionrecord', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				if (res.data.statusCode == 200) {
					console.log('disinfectionRecord:', res.data)
					this.disinfectionRecord = res.data.data.pasture_disinfection_records
					//let len = res.data.data.count;
				}

			})
		},

		query() {
			console.log("startTime:", this.startTime.getTime());
			console.log("endTime:", this.endTime.getTime());
			// console.log("test:",this.feedHeavyMetalMappings)
			var house_number = localStorage.getItem("house_number");
			console.log("house_number", house_number);
			var start_timestamp = parseInt(this.startTime.getTime() / 1000);
			var end_timestamp = parseInt(this.endTime.getTime() / 1000);
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/heavymetal', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('heavymetal:', res.data)
				this.feedHeavyMetalTimes = res.data.data.feed_heavy_metal_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/mycotoxins', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {

				this.feedMycotoxinsTimes = res.data.data.feed_mycotoxins_records
				console.log('mycotoxins:', this.feedMycotoxinsTimes)
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/waterrecord', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('waterrecord:', res.data)
				this.waterRecordTimes = res.data.data.pasture_water_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/basicenvironment', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('basicenvironment:', res.data)
				this.basicenvironmentTimes = res.data.data.pasture_basic_environment_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/buffer', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('buffer:', res.data)
				this.bufferTimes = res.data.data.pasture_buffer_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/area', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('area:', res.data)
				this.areaTimes = res.data.data.pasture_area_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/cowhouse', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('cowhouse:', res.data)
				this.cowhouseTimes = res.data.data.pasture_cow_house_records
			})
			axios.get('http://127.0.0.1:8000/fsims/pastureoperator/query/sensor/paddingrequire', { params: { house_number: house_number, start_timestamp: start_timestamp, end_timestamp: end_timestamp } }).then(res => {
				console.log('paddingrequire:', res.data)
				this.paddleTimes = res.data.data.pasture_padding_require_records
			})

		},
		showfeedHeavyMetal() {
			console.log("test:", this.feedHeavyMetalTime)
			var data = this.feedHeavyMetalTime;
			//1
			let feed_as_info = Object.keys(data.pasture_feed_as_info).map(
				key => {
					let name = this.feedHeavyMetalMappings[key] || 'Unknown';
					let value = data.pasture_feed_as_info[key];
					let normal = this.feedHeavyMetalNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			//2
			let feed_pb_info = Object.keys(data.pasture_feed_pb_info).map(
				key => {
					let name = this.feedHeavyMetalMappings[key] || 'Unknown';
					let value = data.pasture_feed_pb_info[key];
					let normal = this.feedHeavyMetalNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			//3
			let feed_cd_info = Object.keys(data.pasture_feed_cd_info).map(
				key => {
					let name = this.feedHeavyMetalMappings[key] || 'Unknown';
					let value = data.pasture_feed_cd_info[key];
					let normal = this.feedHeavyMetalNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			//4
			let feed_cr_info = Object.keys(data.pasture_feed_cr_info).map(
				key => {
					let name = this.feedHeavyMetalMappings[key] || 'Unknown';
					let value = data.pasture_feed_cr_info[key];
					let normal = this.feedHeavyMetalNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.feedHeavyMetal[0].data = feed_as_info;
			this.feedHeavyMetal[1].data = feed_pb_info;
			this.feedHeavyMetal[2].data = feed_cd_info;
			this.feedHeavyMetal[3].data = feed_cr_info
		},
		showfeedMycotoxins() {
			console.log("test:", this.feedMycotoxinsTime)
			var data = this.feedMycotoxinsTime;
			let afb_1 = Object.keys(data.afb_1).map(
				key => {
					let name = this.feedMycotoxinsMappings[key] || 'Unknown';
					let value = data.afb_1[key];
					let normal = this.feedMycotoxinsNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			let don = Object.keys(data.don).map(
				key => {
					let name = this.feedMycotoxinsMappings[key] || 'Unknown';
					let value = data.don[key];
					let normal = this.feedMycotoxinsNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			let t2Toxin = Object.keys(data.t2Toxin).map(
				key => {
					let name = this.feedMycotoxinsMappings[key] || 'Unknown';
					let value = data.t2Toxin[key];
					let normal = this.feedMycotoxinsNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			let t_2_vom_zea = Object.keys(data.t_2_vom_zea).map(
				key => {
					let name = this.feedMycotoxinsMappings[key] || 'Unknown';
					let value = data.t_2_vom_zea[key];
					let normal = this.feedMycotoxinsNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.feedMycotoxins[0].data = afb_1;
			this.feedMycotoxins[1].data = don;
			this.feedMycotoxins[2].data = t2Toxin;
			this.feedMycotoxins[3].data = t_2_vom_zea
		},
		showwaterRecord() {
			console.log("test:", this.waterRecordTime)
			var data = this.waterRecordTime;
			let oap_gci = Object.keys(data.oap_gci).map(
				key => {
					let name = this.waterRecordMappings[key] || 'Unknown';
					let value = data.oap_gci[key];
					let normal = this.waterRecordNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			let tox_index = Object.keys(data.tox_index).map(
				key => {
					let name = this.waterRecordMappings[key] || 'Unknown';
					let value = data.tox_index[key];
					let normal = this.waterRecordNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			let micro_index = Object.keys(data.micro_index).map(
				key => {
					let name = this.waterRecordMappings[key] || 'Unknown';
					let value = data.micro_index[key];
					let normal = this.waterRecordNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)

			this.waterRecord[0].data = oap_gci;
			this.waterRecord[1].data = tox_index;
			this.waterRecord[2].data = micro_index;
		},
		showbasicenvironment() {
			console.log("test:", this.basicenvironmentTime)
			var data = this.basicenvironmentTime;
			let basicenvironment = Object.keys(data).filter(key => this.environmentMappings[key]).map(
				key => {
					let name = this.environmentMappings[key] || 'Unknown';
					let value = data[key];
					let normal = this.environmentNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.basicenvironment = basicenvironment;
		},
		showbuffer() {
			console.log("test:", this.bufferTime)
			var data = this.bufferTime;
			let buffer = Object.keys(data).filter(key => this.environmentMappings[key]).map(
				key => {
					let name = this.environmentMappings[key] || 'Unknown';
					let value = data[key];
					let normal = this.environmentNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.buffer = buffer;
		},
		showarea() {
			console.log("test:", this.areaTime)
			var data = this.areaTime;
			let area = Object.keys(data).filter(key => this.environmentMappings[key]).map(
				key => {
					let name = this.environmentMappings[key] || 'Unknown';
					let value = data[key];
					let normal = this.environmentNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.area = area;
		},
		showcowhouse() {
			console.log("test:", this.cowhouseTime)
			var data = this.cowhouseTime;
			let cowhouse = Object.keys(data).filter(key => this.environmentMappings[key]).map(
				key => {
					let name = this.environmentMappings[key] || 'Unknown';
					let value = data[key];
					let normal = this.environmentNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.cowhouse = cowhouse;
		},
		showpaddle() {
			console.log("test:", this.paddleTime)
			var data = this.paddleTime;
			let paddingrequire = Object.keys(data).filter(key => this.environmentMappings[key]).map(
				key => {
					let name = this.environmentMappings[key] || 'Unknown';
					let value = data[key];
					let normal = this.environmentNormal[key];
					let state = 1;
					if (value >= normal) {
						state = 2;
					}
					return { name, value, normal, state };
				}
			)
			this.paddle = paddingrequire;
		},
		// toggleApplications() {
		// 	console.log("ok")
		// 	let _expandedKeys = { ...expandedKeys.value };

		// 	if (_expandedKeys['0']) delete _expandedKeys['0'];
		// 	else _expandedKeys['0'] = true;

		// 	expandedKeys.value = _expandedKeys;
		// },
		// formatCurrency(value) {
		// 	return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		// },
		// isDarkTheme() {
		// 	return this.$appState.darkTheme === true;
		// },
		// applyLightTheme() {
		// 	this.lineOptions = {
		// 		plugins: {
		// 			legend: {
		// 				labels: {
		// 					color: '#495057'
		// 				}
		// 			}
		// 		},
		// 		scales: {
		// 			x: {
		// 				ticks: {
		// 					color: '#495057'
		// 				},
		// 				grid: {
		// 					color: '#ebedef',
		// 				}
		// 			},
		// 			y: {
		// 				ticks: {
		// 					color: '#495057'
		// 				},
		// 				grid: {
		// 					color: '#ebedef',
		// 				}
		// 			},
		// 		}
		// 	};
		// },
		// applyDarkTheme() {
		// 	this.lineOptions = {
		// 		plugins: {
		// 			legend: {
		// 				labels: {
		// 					color: '#ebedef'
		// 				}
		// 			}
		// 		},
		// 		scales: {
		// 			x: {
		// 				ticks: {
		// 					color: '#ebedef'
		// 				},
		// 				grid: {
		// 					color: 'rgba(160, 167, 181, .3)',
		// 				}
		// 			},
		// 			y: {
		// 				ticks: {
		// 					color: '#ebedef'
		// 				},
		// 				grid: {
		// 					color: 'rgba(160, 167, 181, .3)',
		// 				}
		// 			},
		// 		}
		// 	};
		// }
	}
}
</script>