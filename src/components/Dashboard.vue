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

		<div class="col-12 lg:col-6">


			<div class="card flex flex-column align-items-center">
				<h5 v-if="lan == 'CN'" class="align-self-start">物理危害</h5>
        <h5 v-else class="align-self-start">physical hazard</h5>
				<Chart type="radar" :data="radarData" :options="radarOptions" style="width: 60%" />
			</div>
		</div>

		<div class="col-12 lg:col-6">


			<div class="card flex flex-column align-items-center">
				<h5 v-if="lan == 'CN'" class="align-self-start">化学危害</h5>
        <h5 v-else class="align-self-start">chemical hazards</h5>
				<Chart type="radar" :data="radarData1" :options="radarOptions" style="width: 60%" />
			</div>
		</div>

		<div class="col-12 xl:col-8">
			<div class="card">
				<h5 v-if="lan == 'CN'" >牧场情况</h5>
        <h5 v-else>Pasture situation</h5>
        <TreeTable :value="treeTableValue" v-model:expandedKeys="expandedKeys" scrollable scrollHeight="450px">
          <template #header>
            {{ lan === 'CN' ? '结构化指标' : 'Structured Indicators' }}
          </template>
          <Column field="name" :header="lan === 'CN' ? '指标' : 'Indicator'" expander></Column>
          <Column field="size" :header="lan === 'CN' ? '正常范围' : 'Normal Range'"></Column>
          <Column field="type" :header="lan === 'CN' ? '当前数值' : 'Current Value'"></Column>
          <Column :header="lan === 'CN' ? '状态' : 'Status'" headerStyle="width: 10rem">
            <template #body>
              <div class="flex flex-wrap gap-2">
                <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
              </div>
            </template>
          </Column>
        </TreeTable>
      </div>

		</div>

		<div class="col-12 xl:col-4">
			<div class="card" style="height: 61.5vh;">
				<div class="flex align-items-center justify-content-between mb-4">
					<h5 v-if="lan == 'CN'">通知</h5>
          <h5 v-else>Notification</h5>
					<div>
						<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
							@click="$refs.menu1.toggle($event)"></Button>
						<Menu ref="menu1" :popup="true" :model="items"></Menu>
					</div>
				</div>

				<span v-if="lan == 'CN'" class="block text-600 font-medium mb-3">今天</span>
        <span v-else class="block text-600 font-medium mb-3">Today</span>
				<ul class="p-0 mx-0 mt-0 mb-4 list-none">
					<li class="flex align-items-center py-2 border-bottom-1 surface-border">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-dollar text-xl text-blue-500"></i>
						</div>
            <span class="text-900 line-height-3">
              {{ lan === 'CN' ? 'A牧场' : 'Ranch A' }}
              <span class="text-700">
                {{ lan === 'CN' ? '生产了' : 'produced' }}
                <span class="text-blue-500">500kg</span>
                {{ lan === 'CN' ? '牛肉' : 'of beef' }}
              </span>
            </span>

          </li>

					<li class="flex align-items-center py-2">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-download text-xl text-orange-500"></i>
						</div>
            <span class="text-700 line-height-3">
              {{ lan === 'CN' ? 'B 牧场' : 'Ranch B' }}
            <span class="text-blue-500 font-medium">2500$</span>
              {{ lan === 'CN' ? '销售了' : 'sold' }}
            </span>

          </li>
				</ul>

				<span v-if="lan == 'CN'" class="block text-600 font-medium mb-3">昨天</span>
        <span v-else class="block text-600 font-medium mb-3">Yesterday</span>
				<ul class="p-0 m-0 list-none">
					<li class="flex align-items-center py-2 border-bottom-1 surface-border">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-dollar text-xl text-blue-500"></i>
						</div>
						<span v-if="lan == 'CN'" class="text-900 line-height-3">饮水指标中汞含量超标1.0
						</span>
            <span v-else class="text-900 line-height-3">The mercury content in drinking water exceeds the standard by 1.0
						</span>
					</li>
					<li class="flex align-items-center py-2 border-bottom-1 surface-border">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-question text-xl text-pink-500"></i>
						</div>
						<span v-if="lan == 'CN'" class="text-900 line-height-3">新增一条工作服消毒记录
						</span>
            <span v-else class="text-900 line-height-3">Add a new work clothes disinfection record
						</span>
					</li>
					<li class="flex align-items-center py-2 border-bottom-1 surface-border">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-question text-xl text-pink-500"></i>
						</div>
						<span v-if="lan == 'CN'" class="text-900 line-height-3">新增一条场地消毒记录
						</span>
            <span v-else class="text-900 line-height-3">Add a new venue disinfection record
						</span>
					</li>
					<li class="flex align-items-center py-2 border-bottom-1 surface-border">
						<div
							class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
							<i class="pi pi-question text-xl text-pink-500"></i>
						</div>
						<span v-if="lan == 'CN'" class="text-900 line-height-3">新增一条运载车辆消毒记录
						</span>
            <span v-else class="text-900 line-height-3">Add a new transport vehicle disinfection record
						</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="col-12 xl:col-4">
			<div class="card">
				<h5 v-if="lan == 'CN'">工作服消毒记录</h5>
        <h5 v-else>Work clothes disinfection record</h5>
				<!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

        <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                   class="mt-3">
          <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
          <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
          <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column>
          <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }"></Column>
        </DataTable>
      </div>
		</div>
		<div class="col-12 xl:col-4">
			<div class="card">
				<h5 v-if="lan == 'CN'">场地消毒记录</h5>
        <h5 v-else>Site disinfection record</h5>
				<!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

        <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                   class="mt-3">
          <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
          <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
          <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column>
          <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{ width: '200px' }"></Column>
        </DataTable>
      </div>
		</div>

		<div class="col-12 xl:col-4">
			<div class="card">
				<h5 v-if="lan == 'CN'">运载车辆消毒记录</h5>
        <h5 v-else>Vehicle disinfection records</h5>
				<!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

        <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both"
                   class="mt-3">
          <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
          <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
          <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column>
          <!-- <Column field="duration" :header="lan === 'CN' ? '持续时间' : 'Duration'" :style="{width:'200px'}"></Column> -->
        </DataTable>
      </div>
		</div>



		<!-- <div class="card">
			<h5>Recent Sales</h5>
			<DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
				<Column style="width:15%">
					<template #header>
						Image
					</template>
					<template #body="slotProps">
						<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
					</template>
				</Column>
				<Column field="name" header="Name" :sortable="true" style="width:35%"></Column>
				<Column field="price" header="Price" :sortable="true" style="width:35%">
					<template #body="slotProps">
						{{formatCurrency(slotProps.data.price)}}
					</template>
				</Column>
				<Column style="width:15%">
					<template #header>
						View
					</template>
					<template #body>
						<Button icon="pi pi-search" type="button" class="p-button-text"></Button>
					</template>
				</Column>
			</DataTable>
		</div> -->
		<!-- <div class="card">
			<div class="flex justify-content-between align-items-center mb-5">
				<h5>Best Selling Products</h5>
				<div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
					<Menu ref="menu2" :popup="true" :model="items"></Menu>
				</div>
			</div>
			<ul class="list-none p-0 m-0">
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
						<div class="mt-1 text-600">Clothing</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-orange-500 h-full" style="width:50%"></div>
						</div>
						<span class="text-orange-500 ml-3 font-medium">%50</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-cyan-500 h-full" style="width:16%"></div>
						</div>
						<span class="text-cyan-500 ml-3 font-medium">%16</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-pink-500 h-full" style="width:67%"></div>
						</div>
						<span class="text-pink-500 ml-3 font-medium">%67</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
						<div class="mt-1 text-600">Office</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-green-500 h-full" style="width:35%"></div>
						</div>
						<span class="text-green-500 ml-3 font-medium">%35</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-purple-500 h-full" style="width:75%"></div>
						</div>
						<span class="text-purple-500 ml-3 font-medium">%75</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
						<div class="mt-1 text-600">Clothing</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-teal-500 h-full" style="width:40%"></div>
						</div>
						<span class="text-teal-500 ml-3 font-medium">%40</span>
					</div>
				</li>
			</ul>
		</div> -->

		<!-- <div class="col-12 xl:col-6">
		<div class="card">
			<h5>Sales Overview</h5>
			<Chart type="line" :data="lineData" :options="lineOptions" />
		</div>
		<div class="card">
			<div class="flex align-items-center justify-content-between mb-4">
				<h5>通知</h5>
				<div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
					<Menu ref="menu1" :popup="true" :model="items"></Menu>
				</div>
			</div>
			
			<span class="block text-600 font-medium mb-3">今天</span>
			<ul class="p-0 mx-0 mt-0 mb-4 list-none">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-dollar text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">A牧场
						<span class="text-700">生产了<span class="text-blue-500">500kg</span>牛肉 </span>
					</span>
				</li>
				<li class="flex align-items-center py-2">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-download text-xl text-orange-500"></i>
					</div>
					<span class="text-700 line-height-3">B 牧场<span class="text-blue-500 font-medium">2500$</span> 销售了</span>
				</li>
			</ul>

			<span class="block text-600 font-medium mb-3">昨天</span>
			<ul class="p-0 m-0 list-none">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-dollar text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">A牧场
						<span class="text-700">生产了<span class="text-blue-500">100kg</span>牛肉 </span>
					</span>
				</li>
				<li class="flex align-items-center py-2 border-bottom-1 surface-border">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-question text-xl text-pink-500"></i>
					</div>
					<span class="text-900 line-height-3">Jane Davis
						<span class="text-700">has posted a new questions about your product.</span>
					</span>
				</li>
			</ul>
		</div>
		
	</div> -->
	</div>
</template>

<script>
import { ref } from 'vue';
import EventBus from '@/AppEventBus';
import ProductService from '../service/ProductService';
import NodeService from '../service/NodeService'
import MonitorService from '../service/MonitorService';
const expandedKeys = ref({});
export default {
	data() {
		return {
			// add:
      lan:this.$store.state.language,
      flag: true,
			treeTableValue: null,
			nodeService: null,
			monitorService: null,
			cloth: null,
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
			radarDataCn: {
				labels: ['汞', '镉', '铅', '铬', '砷', '铜'],
				datasets: [
					{
						label: '标准范围',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [65, 59, 90, 81, 56, 55]
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
      radarDataEn: {
        labels: ['Hg', 'Cd', 'Pb', 'Cr', 'As', 'Cu'],
        datasets: [
          {
            label: 'Standard range',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55]
          },
          {
            label: 'Current measurement value',
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
			radarData1Cn: {
				labels: ['氟化物', '氰化物', '氯化物', '硝酸盐', '硫酸盐', '氨氮'],
				datasets: [
					{
						label: '标准范围',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [26, 33, 45, 65, 22, 55]
					},
					{
						label: '当前测量值',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [66, 25, 40, 39, 68, 87]
					}
				]
			},
      radarData1En: {
        labels: ['Fluoride', 'Cyanide', 'Chloride', 'Nitrate', 'Sulfate', 'NH3-N'],
        datasets: [
          {
            label: 'Standard range',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [26, 33, 45, 65, 22, 55]
          },
          {
            label: 'Current measurement value',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [66, 25, 40, 39, 68, 87]
          }
        ]
      },

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
      if(this.lan == 'CN') {
        this.flag = true
      }else {
        this.flag = false
      }
    };
    EventBus.on('language-change', this.languageChangeListener);
		this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);

		this.nodeService.getTreeNodes().then(data => this.treeValue = data);
		this.nodeService.getTreeTableNodes().then(data => this.treeTableValue = data);

		this.productService.getProductsSmall().then(data => this.products = data);

		this.themeChangeListener = (event) => {
			if (event.dark)
				this.applyDarkTheme();
			else
				this.applyLightTheme();
		};
		EventBus.on('change-theme', this.themeChangeListener);

		if (this.isDarkTheme()) {
			this.applyDarkTheme();
		}
		else {
			this.applyLightTheme();
		}
	},
	beforeUnmount() {
		EventBus.off('change-theme', this.themeChangeListener);
	},
	created() {
		this.productService = new ProductService();
		this.nodeService = new NodeService();
		this.monitorService = new MonitorService();
	},
  computed:{
    radarData() {
      return this.lan === 'CN' ? this.radarDataCn : this.radarDataEn;
    },
    radarData1(){
      return this.lan === 'CN' ? this.radarData1Cn : this.radarData1En;
    }
  },
	methods: {
		toggleApplications() {
			console.log("ok")
			let _expandedKeys = { ...expandedKeys.value };

			if (_expandedKeys['0']) delete _expandedKeys['0'];
			else _expandedKeys['0'] = true;

			expandedKeys.value = _expandedKeys;
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		},
		isDarkTheme() {
			return this.$appState.darkTheme === true;
		},
		applyLightTheme() {
			this.lineOptions = {
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
		},
		applyDarkTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#ebedef'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color: 'rgba(160, 167, 181, .3)',
						}
					},
					y: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color: 'rgba(160, 167, 181, .3)',
						}
					},
				}
			};
		}
	}
}
</script>