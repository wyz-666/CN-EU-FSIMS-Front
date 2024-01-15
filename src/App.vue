<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="filteredMenu" @menuitem-click="onMenuItemClick" />

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
      lan: this.$store.state.language,
      flag: true,
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: this.getMenuItems(this.$store.state.language),
      //menu:'',
      usertype: 0,
      userPermissionLevel: '',
      // menu: [{
      //   label: this.$store.state.language === 'CN' ? '功能模块' : 'Functional Modules',
      //   items: [
      //     {
      //       label: this.$store.state.language === 'CN' ? '功能总览' : 'Overview',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/home'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '公司管理' : 'CompanyAdmin',
      //       icon: 'pi pi-fw pi-bookmark',
      //       to: '/companyAdmin'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '普通用戶管理' : 'Common user management',
      //       icon: 'pi pi-fw pi-bookmark',
      //       to: '/administration'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '屠宰场员工管理' : 'Slaughterhouse staff management',
      //       icon: 'pi pi-fw pi-bookmark',
      //       to: '/operator'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '包装场员工管理' : 'Packaging yard staff management',
      //       icon: 'pi pi-fw pi-bookmark',
      //       to: '/packet'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '冷链司机管理' : 'Cold chain driver management',
      //       icon: 'pi pi-fw pi-bookmark',
      //       to: '/driver'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '全产业链流程监控' : 'Full Supply Chain Monitoring',
      //       icon: 'pi pi-fw pi-home',
      //       items: [
      //         {
      //           label: this.$store.state.language === 'CN' ? '饲养' : 'Breeding',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {
      //               label: this.$store.state.language === 'CN' ? '普通牧场' : 'Ordinary Pasture',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/pasture'
      //             },
      //             {
      //               label: this.$store.state.language === 'CN' ? '育肥厂' : 'Fattening Factory',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/fattening'
      //             }
      //           ]
      //         },
      //         {
      //           label: this.$store.state.language === 'CN' ? '生产' : 'Production',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {
      //               label: this.$store.state.language === 'CN' ? '宰前管理' : 'Pre-Slaughter Management',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/pre_slaughter'
      //             },
      //             {
      //               label: this.$store.state.language === 'CN' ? '屠宰' : 'Slaughter',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/slaughter'
      //             }
      //           ]
      //         },
      //         {
      //           label: this.$store.state.language === 'CN' ? '销售' : 'Sales',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {
      //               label: this.$store.state.language === 'CN' ? '包装' : 'Packaging',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/pack'
      //             },
      //             {
      //               label: this.$store.state.language === 'CN' ? '冷链运输' : 'Cold Chain Transportation',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/transport'
      //             },
      //             {
      //               label: this.$store.state.language === 'CN' ? '售卖' : 'Selling',
      //               icon: 'pi pi-fw pi-bookmark',
      //               to: '/sell'
      //             },
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '数据追溯' : 'Data Traceability',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/produce'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '危害评估' : 'Hazard Assessment',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/sell'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '食品安全/货架期' : 'Food Safety/Shelf Life',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/predict'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '污染建议' : 'Pollution Advice',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/suggest'
      //     },
      //     // {
      //     //     label: language === 'CN' ? '食品安全预警' : 'Food Safety Alert',
      //     //     icon: 'pi pi-fw pi-home',
      //     //     to: '/alert'
      //     // },
      //     {
      //       label: this.$store.state.language === 'CN' ? '供应链风险分析' : 'Supply Chain Risk Analysis',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/analyze'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '区块链详情' : 'Blockchain Details',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/chain'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '牧场管理' : 'Pasture Operate',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/pastureoperate'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '屠宰场管理' : 'Slaughter Operate',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/slaughteroperate'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '包装场管理' : 'Pack Operate',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/packoperate'
      //     },
      //     {
      //       label: this.$store.state.language === 'CN' ? '运输管理' : 'Transport Operate',
      //       icon: 'pi pi-fw pi-home',
      //       to: '/coldtransport'
      //     }
      //   ]
      // }
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
    getMenuItems(language) {
      return [
        {
          label: language === 'CN' ? '功能模块' : 'Functional Modules',
          items: [
            {
              label: language === 'CN' ? '功能总览' : 'Overview',
              icon: 'pi pi-fw pi-home',
              to: '/home',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '公司管理' : 'CompanyAdmin',
              icon: 'pi pi-fw pi-bookmark',
              to: '/companyAdmin',
              minPermissionLevel: 'admin'
            },
            {
              label: language === 'CN' ? '用戶管理' : 'Common user management',
              icon: 'pi pi-fw pi-bookmark',
              to: '/administration',
              minPermissionLevel: 'admin'
            },
            {
              label: language === 'CN' ? '全产业链流程监控' : 'Full Supply Chain Monitoring',
              icon: 'pi pi-fw pi-home',
              minPermissionLevel: 'user',
              items: [
                {
                  label: language === 'CN' ? '牧场' : 'Pasture',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/pasture',
                  minPermissionLevel: 'pastureop'
                  // items: [
                  //   {
                  //     label: language === 'CN' ? '普通牧场' : 'Ordinary Pasture',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/pasture',
                  //     minPermissionLevel: 'user'
                  //   },
                  //   {
                  //     label: language === 'CN' ? '育肥厂' : 'Fattening Factory',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/fattening',
                  //     minPermissionLevel: 'user'
                  //   }
                  // ]
                },
                {
                  label: language === 'CN' ? '屠宰' : 'Slaughter',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/slaughter',
                  minPermissionLevel: 'slaughterop'
                  // items: [
                  //   {
                  //     label: language === 'CN' ? '宰前管理' : 'Pre-Slaughter Management',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/pre_slaughter',
                  //     minPermissionLevel: 'user'
                  //   },
                  //   {
                  //     label: language === 'CN' ? '屠宰' : 'Slaughter',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/slaughter',
                  //     minPermissionLevel: 'user'
                  //   }
                  // ]
                },
                {
                  label: language === 'CN' ? '包装' : 'Pack',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/pack',
                  minPermissionLevel: 'packageop'
                  // items: [
                  //   {
                  //     label: language === 'CN' ? '包装' : 'Packaging',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/pack',
                  //     minPermissionLevel: 'user'
                  //   },
                  //   {
                  //     label: language === 'CN' ? '冷链运输' : 'Cold Chain Transportation',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/transport',
                  //     minPermissionLevel: 'user'
                  //   },
                  //   {
                  //     label: language === 'CN' ? '售卖' : 'Selling',
                  //     icon: 'pi pi-fw pi-bookmark',
                  //     to: '/sell',
                  //     minPermissionLevel: 'user'
                  //   },
                  // ]
                },
                {
                  label: language === 'CN' ? '冷链运输' : 'Transport',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/transport',
                  minPermissionLevel: 'transportop'
                }
              ]
            },
            {
              label: language === 'CN' ? '数据追溯' : 'Data Traceability',
              icon: 'pi pi-fw pi-home',
              to: '/produce',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '危害评估' : 'Hazard Assessment',
              icon: 'pi pi-fw pi-home',
              to: '/sell',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '食品安全/货架期' : 'Food Safety/Shelf Life',
              icon: 'pi pi-fw pi-home',
              to: '/predict',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '污染建议' : 'Pollution Advice',
              icon: 'pi pi-fw pi-home',
              to: '/suggest',
              minPermissionLevel: 'user'
            },
            // {
            //     label: language === 'CN' ? '食品安全预警' : 'Food Safety Alert',
            //     icon: 'pi pi-fw pi-home',
            //     to: '/alert'
            // },
            {
              label: language === 'CN' ? '供应链风险分析' : 'Supply Chain Risk Analysis',
              icon: 'pi pi-fw pi-home',
              to: '/analyze',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '区块链详情' : 'Blockchain Details',
              icon: 'pi pi-fw pi-home',
              to: '/chain',
              minPermissionLevel: 'user'
            },
            {
              label: language === 'CN' ? '牧场管理' : 'Pasture Operate',
              icon: 'pi pi-fw pi-home',
              to: '/pastureoperate',
              minPermissionLevel: 'pastureop'
            },
            {
              label: language === 'CN' ? '屠宰场管理' : 'Slaughter Operate',
              icon: 'pi pi-fw pi-home',
              to: '/slaughteroperate',
              minPermissionLevel: 'slaughterop'
            },
            {
              label: language === 'CN' ? '包装场管理' : 'Pack Operate',
              icon: 'pi pi-fw pi-home',
              to: '/packoperate',
              minPermissionLevel: 'packageop'
            },
            {
              label: language === 'CN' ? '运输管理' : 'Transport Operate',
              icon: 'pi pi-fw pi-home',
              to: '/coldtransport',
              minPermissionLevel: 'transportop'
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
    },
    filterMenuByPermission(items) {
      return items.reduce((acc, item) => {
        if (this.hasPermission(item.minPermissionLevel)) {
          const filteredItem = { ...item };
          if (item.items) {
            // 递归处理子菜单
            filteredItem.items = this.filterMenuByPermission(item.items);
          }
          acc.push(filteredItem);
        }
        return acc;
      }, []);
    },
    hasPermission(minPermissionLevel) {
      // 判断用户是否有权限访问该菜单项
      console.log("minPermissionLevel", minPermissionLevel)
      const permissionLevels = ['user', 'admin', 'pastureop', 'slaughterop', 'packageop', 'transportop'];
      const userPermissionIndex = permissionLevels.indexOf(this.userPermissionLevel);
      var minPermissionIndex = permissionLevels.indexOf(minPermissionLevel);
      console.log("userPermissionIndex", userPermissionIndex)
      console.log("minPermissionIndex", minPermissionIndex)
      if (minPermissionIndex == -1) {
        return minPermissionIndex == -1;
      } else if (minPermissionIndex == 0) {
        return true
      } else {
        return userPermissionIndex == minPermissionIndex
      }
    },
  },
  mounted() {
    this.languageChangeListener = () => {
      this.lan = this.$store.state.language;
      this.updateMenuLanguage();
      if (this.lan == 'CN') {
        this.flag = true
      } else {
        this.flag = false
      }
    };
    this.usertype = localStorage.getItem('user_type')
    console.log("type", this.usertype)
    switch (this.usertype) {
      case '1':
        this.userPermissionLevel = 'admin'
        break;

      case '4':
        this.userPermissionLevel = 'pastureop'
        break;
      case '5':
        this.userPermissionLevel = 'slaughterop'
        break;
      case '6':
        this.userPermissionLevel = 'packageop'
        break;
      case '7':
        this.userPermissionLevel = 'transportop'
        break;
    }
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
    },
    filteredMenu() {
      return this.filterMenuByPermission(this.menu);
    },

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
