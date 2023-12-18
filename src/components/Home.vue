<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="section-header1">
                    <h2 v-if="lan == 'CN'" class="section-title">系统模块</h2>
                    <h2 v-else class="section-title">system module</h2>
                    <span>Modules</span>
                </div>

                <DataView :value="lan === 'CN' ? dataviewValue:dataviewValueEn" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
                    :sortField="sortField">
                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                </div>
                                <div class="text-center">
                                    <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.name"
                                        class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-3xl font-bold">{{ slotProps.data.name }}</div>
                                    <div class="module_description">{{ slotProps.data.description }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>

    </div>
</template>

<script>
import ProductService from "../service/ProductService";
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            picklistValue: [[
                { name: 'San Francisco', code: 'SF' },
                { name: 'London', code: 'LDN' },
                { name: 'Paris', code: 'PRS' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Berlin', code: 'BRL' },
                { name: 'Barcelona', code: 'BRC' },
                { name: 'Rome', code: 'RM' },
            ], []],
            orderlistValue: [
                { name: 'San Francisco', code: 'SF' },
                { name: 'London', code: 'LDN' },
                { name: 'Paris', code: 'PRS' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Berlin', code: 'BRL' },
                { name: 'Barcelona', code: 'BRC' },
                { name: 'Rome', code: 'RM' },
            ],
            dataviewValue: null,
            dataviewValueEn:null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                { label: 'Price High to Low', value: '!price' },
                { label: 'Price Low to High', value: 'price' },
            ]
        }
    },
    productService: null,
    created() {
        this.productService = new ProductService();
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
        this.productService.getProducts().then(data => this.dataviewValue = data);
        this.productService.getProductsEn().then(data => this.dataviewValueEn= data);
    },
    methods: {
        onSortChange(event) {
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
</style>

<style>
.section-header1 {
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    padding-top: 1%;
}

.section-header1 .section-title {
    font-size: 45px;
    margin-bottom: -40px;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: #263238;
    position: relative;
}

.section-header1 .section-title:before {
    content: "";
    position: absolute;
    bottom: -8px;
    width: 80px;
    height: 2px;
    background: #50a6fc;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    transition: 0.3s;
}

.section-header1 span {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.07);
    z-index: 2;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    text-transform: capitalize;
    position: relative;
    /* position: absolute;
  top: 140px;
  left: 0; */
    width: 100%;
}

.module_name {

}

.module_description {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 1.5%;
}
</style>
