<template>
	<div class="grid">
		<!-- <div class="col-12">
			<div class="card">
				<h5>Tree</h5>
				<Tree :value="treeValue" selectionMode="checkbox" v-model:selectionKeys="selectedTreeValue"></Tree>
			</div>
		</div> -->
		<div class="col-12">
			<div class="card">
				<h5 v-if="lan == 'CN'">牧场情况</h5>
        <h5 v-else>Pasture situation</h5>
				<TreeTable :value="treeTableValue"  v-model:selectionKeys="selectedTreeTableValue">
					<template v-if="lan == 'CN'" #header>
						结构化指标
					</template>
          <template v-else #header>
            Structured indicators
          </template>
          <Column field="name" :header="lan === 'CN' ? '指标' : 'Indicator'" :expander="true"></Column>
          <Column field="size" :header="lan === 'CN' ? '正常范围' : 'Normal Range'"></Column>
          <Column field="type" :header="lan === 'CN' ? '当前数值' : 'Current Value'"></Column>
        </TreeTable>
			</div>
		</div>
	</div>
</template>

<script>
	import NodeService from '../service/NodeService'
  import EventBus from '../AppEventBus';
	export default {
		data() {
			return {
        lan:this.$store.state.language,
        flag: true,
				treeValue: null,
				selectedTreeValue: null,
				treeTableValue: null,
				selectedTreeTableValue: null,
			}
		},
		nodeService: null,
		created() {
			this.nodeService = new NodeService();
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
			this.nodeService.getTreeNodes().then(data => this.treeValue = data);
			this.nodeService.getTreeTableNodes().then(data => this.treeTableValue = data);
		},
	}
</script>