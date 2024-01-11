<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <div class=title_bar>
        <span class="title_cn">食品安全智慧管理与决策支持系统</span>
        <span class="title_en">Food Safety Intelligent Management and Decision Support System</span>
      </div>
      <!-- <span class="title_font">食品安全智慧管理与决策支持系统<br />Food Safety Intelligent Management and Decision Support System</span> -->
      <!-- <span class="title_font"></span> -->
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" v-styleclass="{
      selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
      leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true
    }">
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <SelectButton v-model="value" :options="options" aria-labelledby="basic" @change="onLanChange" />
      </li>
      <li>
        <button class="p-link layout-topbar-button" @click="screen">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <Avatar v-badge.danger="count" size="small" style="background-color:#ffffff;margin-top:20%;margin-left:10%">
          <button class="p-link layout-topbar-button" @click="notification">

            <i class="pi pi-user">

            </i>
            <!-- <span>Profile</span> -->
          </button>
        </Avatar>
      </li>
    </ul>
  </div>
</template>



<script>
import EventBus from './AppEventBus';
import axios from 'axios';
export default {
  data() {
    return {
      value: '中文',
      options: ['中文', 'English'],
      count:0
    }
  },
  updated() {

    // if (window.location.href.split("#")[1] == "/home") {
    // 	this.IsIndex = true
    // }
    // else {
    // 	this.IsIndex = false
    // }
    this.IsLogin = this.$store.state.isLogin;

    console.log("login?" + this.isLogin);
    // if (sessionStorage.getItem("userid") && sessionStorage.getItem("isLogin")) {
    // 	this.$store.state.isLogin = sessionStorage.getItem("isLogin");
    // 	this.$store.state.id = sessionStorage.getItem("userid");
    // 	this.$store.state.userName = sessionStorage.getItem("username");
    // 	this.$store.state.isAdmin = sessionStorage.getItem("isAdmin");
    // 	this.IsLogin = this.$store.state.isLogin;
    // }
    if (this.IsLogin == false) {
      //alert("请先登录");
      // this.$router.push("login")
    }

  },
  methods: {
    onLanChange(event) {
      if (event.value == '中文') {
        this.$store.state.language = 'CN'
      }
      else if (event.value == 'English') {
        this.$store.state.language = 'EN'
      }
      // alert(this.$store.state.language)
      EventBus.emit('language-change', event);
    },
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
    onTopbarMenuToggle(event) {
      this.$emit('topbar-menu-toggle', event);
    },
    topbarImage() {
      return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
    },
    screen() {
      this.$router.push('/Screen');
    },
    getNotificationCount() {
      var uuid = localStorage.getItem('uuid')
      axios.get('http://127.0.0.1:8000/fsims/pastureoperator/getnotificationcount', { params: { uuid: uuid } }).then(res => {
        console.log('count:', res.data)
        this.count = res.data.data
      })
    },
    notification(){
      this.$router.push('/Notification');
    }
  },
  mounted(){
    this.getNotificationCount();
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    }
  }
}
</script>

<style>
.title_cn {
  font-size: medium;
  text-align: center;
}

.title_en {
  font-size: small;
  text-align: center;
}

.title_bar {
  display: flex;
  flex-direction: column;
}
</style>