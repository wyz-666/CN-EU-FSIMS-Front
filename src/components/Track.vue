<template>
    <div class="grid">
        <div class="col-3"> </div>
        <div class="col-6">
            <div class="card">
                <ScrollPanel style="width: 35vw; height: 50vh">
                    <Timeline :value="customEvents" align="alternate" class="customized-timeline">
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
                                    <img v-if="slotProps.item.image" :src="'images/product/' + slotProps.item.image"
                                        :alt="slotProps.item.name" width="200" class="shadow-2 mb-3" />
                                    <p>{{ slotProps.item.description }}</p>
                                    <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" class="p-button-text"></Button>
                                    <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" class="p-button-text"></Button>
                                </template>
                            </Card>
                        </template>
                    </Timeline>
                    <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" :pt="{
                        root: 'w-2rem h-2rem border-round-sm bg-primary hover:bg-primary',
                        icon: {
                            class: 'text-base'
                        }
                    }" />
                </ScrollPanel>
                <h4 v-if="lan == 'CN'">食品链</h4>
                <h4 v-else>food chain</h4>

                <!-- <h5>Custom Timeline</h5> -->


            </div>
        </div>
        <div class="col-3"> </div>
    </div>
</template>
    
<script>
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
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
            horizontalEvents: [
                '2020', '2021', '2022', '2023'
            ]
        }
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
    }
}
</script>
    
<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row !important;

            .p-timeline-event-content {
                text-align: left !important;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }

        .p-card {
            margin-top: 1rem;
            margin-left: 10%;
            margin-right: 10%;
        }
    }
}

// .description {
//     font-size: medium;
// }
</style>