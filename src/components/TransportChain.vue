<template>
    <div class="grid">
        <div class="col-12">
            <div class="card md-0">
                <div class="grid">
                    <div class="col-12">
                        <div class="card">
                            <DataTable :value="products" scrollable scrollHeight="40vh" tableStyle="min-width: 10rem">
                                <Column field="number" header="产品编号" sortable></Column>
                                <Column field="batch_number" header="批次编号" sortable></Column>
                                <Column field="type_name" header="产品" sortable></Column>
                                <Column field="pack_method_name" header="包装方法" sortable></Column>
                                <Column field="shelf_life" header="货架期" sortable></Column>    
                                <Column field="weight" header="产品重量" sortable></Column>                                
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
// import NodeService from '../service/NodeService';
export default {
    data() {
        return {
            lan: this.$store.state.language,
            flag: true,
            value: 40,
            monitorService: null,
            startTime: '',
            endTime: '',
            house_number: '',
            products: '',
            pid: '',
            next_pid: '',





        }
    },
    methods: {
        getProduct() {
            var type = 6
            console.log("next_pid:",this.next_pid)
            axios.get('http://182.92.99.82:8081/fsims/user/productsbypid', { params: { pid: this.pid, type: type, next_pid: this.next_pid } }).then(res => {
                console.log('product:', res.data);
                //this.products = res.data.data.package_products_info;
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
        const data = this.$route.query.data;
        const dataObject = JSON.parse(data)
        console.log("数据", dataObject)
        this.startTime = dataObject.start_time
        this.endTime = dataObject.end_time
        this.house_number = dataObject.house_number
        this.pid = dataObject.pid
        this.next_pid = dataObject.next_pid
        EventBus.on('language-change', this.languageChangeListener);
        this.getProduct();
    },
    computed: {

    },
    created() {
        // this.nodeService = new NodeService();
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