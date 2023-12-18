<template>
	<div class="layout-footer">
		<img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
		<span v-if="lan == 'CN'" class="font-medium ml-2">食品安全智慧管理与决策支持系统</span>
    <span v-else class="font-medium ml-2">Food safety intelligent management and decision support system</span>
	</div>
</template>

<script>
import EventBus from './AppEventBus';
	export default {
    data(){
      return{
        lan: this.$store.state.language,
        flag: true,
      }
    },
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
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