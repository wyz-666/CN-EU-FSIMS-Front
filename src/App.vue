<template>
    <div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

        <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
    </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import EventBus from './AppEventBus';
export default {
    emits: ['change-theme'],
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu: this.getMenuItems(this.$store.state.language),
            // menu: [
            //     {
            //         label: '功能模块',
            //         items: [
            //             {
            //                 label: '功能总览', icon: 'pi pi-fw pi-home', to: '/home'
            //             },
            //             {
            //                 label: '全产业链流程监控', icon: 'pi pi-fw pi-home',
            //                 items: [
            //                     {
            //                         label: '饲养', icon: 'pi pi-fw pi-bookmark',
            //                         items: [
            //                             {
            //                                 label: '普通牧场', icon: 'pi pi-fw pi-bookmark', to: '/pasture'
            //                             },
            //                             {
            //                                 label: '育肥厂', icon: 'pi pi-fw pi-bookmark', to: '/fattening'
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         label: '生产', icon: 'pi pi-fw pi-bookmark',
            //                         items: [
            //                             {
            //                                 label: '宰前管理', icon: 'pi pi-fw pi-bookmark', to: '/pre_slaughter'
            //                             },
            //                             {
            //                                 label: '屠宰', icon: 'pi pi-fw pi-bookmark', to: '/slaughter'
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         label: '销售', icon: 'pi pi-fw pi-bookmark',
            //                         items: [
            //                             {
            //                                 label: '包装', icon: 'pi pi-fw pi-bookmark', to: '/pack'
            //                             },
            //                             {
            //                                 label: '冷链运输', icon: 'pi pi-fw pi-bookmark', to: '/transport'
            //                             },
            //                             {
            //                                 label: '售卖', icon: 'pi pi-fw pi-bookmark', to: '/sell'
            //                             },
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 label: '数据追溯', icon: 'pi pi-fw pi-home', to: '/produce'
            //             },
            //             {
            //                 label: '危害评估', icon: 'pi pi-fw pi-home', to: '/sell'
            //             },
            //             {
            //                 label: '食品安全/货架期', icon: 'pi pi-fw pi-home', to: '/predict'
            //             },
            //             {
            //                 label: '污染建议', icon: 'pi pi-fw pi-home', to: '/suggest'
            //             },
            //             // {
            //             //     label: '食品安全预警', icon: 'pi pi-fw pi-home', to: '/alert'
            //             // },
            //             {
            //                 label: '供应链风险分析', icon: 'pi pi-fw pi-home', to: '/analyze'
            //             },
            //             {
            //                 label: '区块链详情', icon: 'pi pi-fw pi-home', to: '/chain'
            //             },
            //         ]
            //     },
            // ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        },
    },
    methods: {
        getMenuItems(language){
          return[
            {
              label: language === 'CN' ? '功能模块' : 'Functional Modules',
              items: [
                {
                  label: language === 'CN' ? '功能总览' : 'Overview',
                  icon: 'pi pi-fw pi-home',
                  to: '/home'
                },
                {
                  label: language === 'CN' ? '公司管理' : 'CompanyAdmin',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/companyAdmin'
                },
                {
                  label: language === 'CN' ? '普通用戶管理' : 'Common user management',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/administration'
                },
                {
                  label: language === 'CN' ? '屠宰场员工管理' : 'Slaughterhouse staff management',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/operator'
                },
                {
                  label: language === 'CN' ? '包装场员工管理' : 'Packaging yard staff management',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/packet'
                },
                {
                  label: language === 'CN' ? '冷链司机管理' : 'Cold chain driver management',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/driver'
                },
                {
                  label: language === 'CN' ? '全产业链流程监控' : 'Full Supply Chain Monitoring',
                  icon: 'pi pi-fw pi-home',
                  items: [
                    {
                      label: language === 'CN' ? '饲养' : 'Breeding',
                      icon: 'pi pi-fw pi-bookmark',
                      items: [
                        {
                          label: language === 'CN' ? '普通牧场' : 'Ordinary Pasture',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/pasture'
                        },
                        {
                          label: language === 'CN' ? '育肥厂' : 'Fattening Factory',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/fattening'
                        }
                      ]
                    },
                    {
                      label: language === 'CN' ? '生产' : 'Production',
                      icon: 'pi pi-fw pi-bookmark',
                      items: [
                        {
                          label: language === 'CN' ? '宰前管理' : 'Pre-Slaughter Management',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/pre_slaughter'
                        },
                        {
                          label: language === 'CN' ? '屠宰' : 'Slaughter',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/slaughter'
                        }
                      ]
                    },
                    {
                      label: language === 'CN' ? '销售' : 'Sales',
                      icon: 'pi pi-fw pi-bookmark',
                      items: [
                        {
                          label: language === 'CN' ? '包装' : 'Packaging',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/pack'
                        },
                        {
                          label: language === 'CN' ? '冷链运输' : 'Cold Chain Transportation',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/transport'
                        },
                        {
                          label: language === 'CN' ? '售卖' : 'Selling',
                          icon: 'pi pi-fw pi-bookmark',
                          to: '/sell'
                        },
                      ]
                    }
                  ]
                },
                {
                  label: language === 'CN' ? '数据追溯' : 'Data Traceability',
                  icon: 'pi pi-fw pi-home',
                  to: '/produce'
                },
                {
                  label: language === 'CN' ? '危害评估' : 'Hazard Assessment',
                  icon: 'pi pi-fw pi-home',
                  to: '/sell'
                },
                {
                  label: language === 'CN' ? '食品安全/货架期' : 'Food Safety/Shelf Life',
                  icon: 'pi pi-fw pi-home',
                  to: '/predict'
                },
                {
                  label: language === 'CN' ? '污染建议' : 'Pollution Advice',
                  icon: 'pi pi-fw pi-home',
                  to: '/suggest'
                },
                // {
//     label: language === 'CN' ? '食品安全预警' : 'Food Safety Alert',
//     icon: 'pi pi-fw pi-home',
//     to: '/alert'
// },
                {
                  label: language === 'CN' ? '供应链风险分析' : 'Supply Chain Risk Analysis',
                  icon: 'pi pi-fw pi-home',
                  to: '/analyze'
                },
                {
                  label: language === 'CN' ? '区块链详情' : 'Blockchain Details',
                  icon: 'pi pi-fw pi-home',
                  to: '/chain'
                },
                {
                  label: language === 'CN' ? '牧场管理' : 'Pasture Operate',
                  icon: 'pi pi-fw pi-home',
                  to: '/pastureoperate'
                },
                {
                  label: language === 'CN' ? '屠宰场管理' : 'Slaughter Operate',
                  icon: 'pi pi-fw pi-home',
                  to: '/slaughteroperate'
                },
                {
                  label: language === 'CN' ? '包装场管理' : 'Pack Operate',
                  icon: 'pi pi-fw pi-home',
                  to: '/packoperate'
                },
                {
                  label: language === 'CN' ? '运输管理' : 'Transport Operate',
                  icon: 'pi pi-fw pi-home',
                  to: '/coldtransport'
                }
              ]
            }
          ]
        },
        updateMenuLanguage() {
          this.menu = this.getMenuItems(this.lan);
        },
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
                    if (this.mobileMenuActive === true) {
                        this.overlayMenuActive = true;
                    }

                    this.overlayMenuActive = !this.overlayMenuActive;
                    this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
        },
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
  mounted() {
      this.languageChangeListener = () => {
      this.lan = this.$store.state.language;
      this.updateMenuLanguage();
      if(this.lan == 'CN') {
        this.flag = true
      }else {
        this.flag = false
      }
    };
    EventBus.on('language-change', this.languageChangeListener);
  },
  computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
                'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
