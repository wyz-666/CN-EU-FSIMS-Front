<template>
	<div class="grid p-fluid">
		<div class="col-12 xl:col-8">
			<div class="grid p-fluid">
				<div class="col-12 xl:col-12">
					<p v-if="lan == 'CN'" class="title">食品供应链信息</p>
					<p v-else class="title">Food supply chain information</p>
				</div>
				<div class="col-12 xl:col-4">
					<div class="card mb-0">
						<div class="flex justify-content-between mb-3">
							<div>
								<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold">食品供应链总数</span>
								<span v-else class="block text-500 font-medium mb-3 font-bold">Total number of food supply
									chain</span>
								<div class="text-900 font-medium text-xl">69</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-blue-100 border-round"
								style="width:2.5rem;height:2.5rem">
								<i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
							</div>
						</div>

						<span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
						<span v-else class="text-500">Increased since last visit</span>
						<span class="text-green-500 font-medium">2 </span>
					</div>
				</div>
				<div class="col-12 xl:col-4">
					<div class="card mb-0">
						<div class="flex justify-content-between mb-3">
							<div>
								<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold">食品供应链完成数量</span>
								<span v-else class="block text-500 font-medium mb-3 font-bold">Food Supply Chain
									Completion</span>
								<div class="text-900 font-medium text-xl">32</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-orange-100 border-round"
								style="width:2.5rem;height:2.5rem">
								<i class="pi pi-map-marker text-orange-500 text-xl"></i>
							</div>
						</div>
						<span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
						<span v-else class="text-500">Increased since last visit</span>
						<span class="text-green-500 font-medium">6 </span>
					</div>
				</div>
				<div class="col-12 xl:col-4">
					<div class="card mb-0">
						<div class="flex justify-content-between mb-3">
							<div>
								<span v-if="lan == 'CN'" class="block text-500 font-medium mb-3 font-bold">食品供应链异常数量</span>
								<span v-else class="block text-500 font-medium mb-3 font-bold">Abnormal quantities in the
									food supply chain</span>
								<div class="text-900 font-medium text-xl">6</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
								style="width:2.5rem;height:2.5rem">
								<i class="pi pi-inbox text-cyan-500 text-xl"></i>
							</div>
						</div>
						<span v-if="lan == 'CN'" class="text-500">比上次访问增长 </span>
						<span v-else class="text-500">Increased since last visit</span>
						<span class="text-green-500 font-medium">2 </span>
					</div>
				</div>
				<div class="col-12 xl:col-12">
					<Toolbar>
						<template #start>
							<Button icon="pi pi-plus" class="mr-2" />
							<Toast />
							<DynamicDialog />
							<Button icon="pi pi-refresh" class="mr-2" />
							<!-- <Button icon="pi pi-upload" /> -->
						</template>

						<template #center>
							<span class="p-input-icon-left">
								<i class="pi pi-search" />
								<InputText :placeholder="lan === 'CN' ? '请输入供应链编号' : 'Enter Supply Chain ID'" />
							</span>
						</template>

						<template #end>
							<Button :label="lan === 'CN' ? '搜索' : 'Search'"></Button>
						</template>
					</Toolbar>
				</div>


				<div class="col-12 xl:col-12">
					<div class="card" style="height: 75vh;">
						<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="6">
							<template #grid="slotProps">
								<div class="col-12 xl:col-6">
									<div class="card card-w-title">
										<div class="grid">
											<div class="col-6">
												<h5 v-if="lan == 'CN'">食品供应链</h5>
												<h5 v-else>food supply chain</h5>
											</div>
											<div class="col-6">
												<Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
													raised @click="chainDetail" />
												<OverlayPanel ref="op2" appendTo="body" :showCloseIcon="true"
													id="overlay_panel" style="width: 900px;height: 80vh;margin-top: 4%;">
													<ScrollPanel style="width: 45vw; height: 80vh">
														<Timeline :value="customEvents" align="alternate"
															class="customized-timeline">
															<template #marker="slotProps">
																<span
																	class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2"
																	:style="{ backgroundColor: slotProps.item.color }">
																	<i :class="slotProps.item.icon"></i>
																</span>
															</template>
															<template #content="slotProps">
																<Card>
																	<template #title>
																		{{ slotProps.item.status }}
																	</template>
																	<template #subtitle>
																		{{ slotProps.item.date }}
																	</template>
																	<template #content>
																		<img v-if="slotProps.item.image"
																			:src="'images/product/' + slotProps.item.image"
																			:alt="slotProps.item.name" width="200"
																			class="shadow-2 mb-3" />
																		<p>{{ slotProps.item.description }}</p>
																		<Button
																			:label="lan === 'CN' ? '查看详情' : 'View Details'"
																			class="p-button-text"></Button>
																	</template>
																</Card>
															</template>
														</Timeline>
														<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up"
															:pt="{
																root: 'w-2rem h-2rem border-round-sm bg-primary hover:bg-primary',
																icon: {
																	class: 'text-base'
																}
															}" />
													</ScrollPanel>
												</OverlayPanel>
											</div>
										</div>

										<div class="text-3xl font-bold">{{ slotProps.data.id }}</div>
										<Steps :model="nestedRouteItems" :readonly="false" />
										<router-view />
									</div>
								</div>
							</template>
						</DataView>


					</div>

				</div>
			</div>


		</div>

		<div class="col-12 xl:col-4">
			<div class="grid p-fluid">
				<div class="col-12 xl:col-12">
					<p v-if="lan == 'CN'" class="title">区块链信息</p>
					<p v-else class="title">Blockchain information</p>
				</div>

				<div class="col-12 xl:col-12">
					<div class="card">
						<h5 v-if="lan == 'CN'">节点状态</h5>
						<h5 v-else>Node Status</h5>
						<DataTable :value="peer_data" :scrollable="true" scrollHeight="300px" :loading="loading2"
							scrollDirection="both" class="mt-3">
							<Column field="ip" :header="lan === 'CN' ? 'ip地址' : 'IP Address'" :style="{ width: '100px' }">
							</Column>
							<Column :header="lan === 'CN' ? '状态' : 'Status'" headerStyle="width: 10rem">
								<template #body>
									<div class="flex flex-wrap gap-2">
										<Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
									</div>
								</template>
							</Column>
						</DataTable>
					</div>
				</div>

				<div class="col-12 xl:col-12">
					<div class="card">
						<div class="grid p-fluid">
							<div class="col-12 xl:col-6">
								<span v-if="lan == 'CN'" class="block_height_font">
									当前区块高度
								</span>
								<span v-else class="block_height_font">
									Block Height
								</span>
							</div>
							<div class="col-12 xl:col-6">
								<span class="block_height_number">
									297
								</span>
							</div>
						</div>
					</div>

				</div>

				<div class="col-12 xl:col-12">
					<div class="card">
						<h5 v-if="lan == 'CN'">最近区块</h5>
						<h5 v-else>recent block</h5>
						<DataTable :value="block_data" :scrollable="true" scrollHeight="400px" :loading="loading2"
							scrollDirection="both" class="mt-3" selectionMode="single" dataKey="id"
							:metaKeySelection="false" @rowSelect="onRowSelect" @rowUnselect="onRowUnselect">
							<Column field="block_hash" :header="lan === 'CN' ? '区块哈希' : 'Block Hash'"
								:style="{ width: '200px' }"></Column>
							<Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '150px' }" frozen>
							</Column>
						</DataTable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChainService from '../service/ChainService';
import FoodChainService from "../service/FoodChainServcice"
import EventBus from '../AppEventBus';
// 食品供应链链数量
export default {
	data() {
		return {
			// add
			lan: this.$store.state.language,
			flag: true,
			layout: "grid",
			dataviewValue: null,

			chainService: null,
			foodChainService: null,
			block_data: null,
			peer_data: [
				{
					"ip": '127.0.0.1',
					"status": '正常运行'
				},
				{
					"ip": '127.0.0.1',
					"status": '正常运行'
				},
				{
					"ip": '127.0.0.1',
					"status": '正常运行'
				},
				{
					"ip": '127.0.0.1',
					"status": '正常运行'
				}
			],
			customEvents: [
				{
					status: '普通牧场',
					date: '15/10/2020 10:30',
					icon: 'pi pi-shopping-cart',
					description: '普通牧场',
					color: '#9C27B0',
					image: 'beef.jpg'
				},
				{
					status: '育肥',
					date: '15/10/2020 10:30',
					icon: 'pi pi-shopping-cart',
					description: '育肥',
					color: '#9C27B0',
					image: 'beef.jpg'
				},
				{
					status: '宰前管理',
					date: '15/10/2020 10:30',
					icon: 'pi pi-shopping-cart',
					description: '宰前管理',
					color: '#9C27B0',
					image: 'beef.jpg'
				},
				{
					status: '屠宰',
					date: '15/10/2020 10:30',
					icon: 'pi pi-shopping-cart',
					description: '屠宰',
					color: '#9C27B0',
					image: 'beef.jpg'
				},
				{
					status: '包装',
					date: '15/10/2020 14:00',
					icon: 'pi pi-cog',
					description: '包装科尔沁牛肉',
					color: '#673AB7',
					image: 'pack.jpeg'
				},
				{
					status: '冷链运输',
					date: '15/10/2020 16:15',
					icon: 'pi pi-envelope',
					description: '储藏科尔沁牛肉',
					color: '#FF9800',
					image: 'store.jpg'
				},
				{
					status: '售卖',
					date: '16/10/2020 10:00',
					icon: 'pi pi-check',
					description: '售卖科尔沁牛肉',
					color: '#607D8B',
					image: 'sell.jpeg'
				}
			],

			// end

			nestedRouteItemsCn: [
				{
					label: '牧场',
					to: '/pasture'
				},
				{
					label: '育肥',
					to: '/fattening'
				},
				{
					label: '屠宰',
					to: '/track'
				}

			],
			nestedRouteItemsEn: [
				{
					label: 'pasture',
					to: '/pasture'
				},
				{
					label: 'fatten',
					to: '/fattening'
				},
				{
					label: 'slaughter',
					to: '/track'
				}

			],

		}
	},
	created() {
		this.chainService = new ChainService();
		this.foodChainService = new FoodChainService();
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
		this.chainService.getRecentBlocks().then(data => this.block_data = data);
		this.foodChainService.getFoodChain().then(data => this.dataviewValue = data);
	},
	methods: {
		chainDetail() {
			this.$refs.op2.toggle(event);
		},
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
		},
		onContextRightClick(event) {
			this.$refs.contextMenu.show(event);
		},
		onRowSelect() {
			this.$router.push('/chain');
		}
	},
	computed: {
		nestedRouteItems() {
			return this.lan === 'CN' ? this.nestedRouteItemsCn : this.nestedRouteItemsEn;
		}
	}
}
</script>

<style>
.block_height_font {
	text-align: center;
	font-weight: 500;
	font-size: x-large;
}

.block_height_number {
	text-align: center;
	font-size: x-large;
	font-weight: 500;
}

.peer_title {
	font-weight: bold;
	text-align: center;
	font-size: large;
}

.peer_number {
	font-weight: bold;
	text-align: center;
	font-size: xx-large;
}

.title {
	text-align: center;
	font-size: x-large;
	font-weight: bold;
}</style>