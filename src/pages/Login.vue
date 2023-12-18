<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'images/logo-' + logoColor + '.svg'" alt="Sakai logo" class="mb-7"
                    style="width:81px; height:60px;">
            </div>
            <div class="col-12 xl:col-6"
                style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4"
                    style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">食品安全智慧管理与决策支持系统</div>
                        <span class="text-600 font-medium">请登录</span>
                    </div>

                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">用户名</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
                            style="padding:1rem;" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">记住账号</label>
                            </div>
                          <router-link :to="{ name: 'Register' }" class="font-medium no-underline ml-2 text-left cursor-pointer" style="color: var(--primary-color)">
                            注册账号
                          </router-link>
                          <a  href="#" class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">忘记密码?</a>
                        </div>
                        <div>
                            <router-link to="/home">
                                <Button label="登录" class="w-full p-3 text-xl"></button>
                            </router-link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan: this.$store.state.language,
            flag: true,
            email: '',
            password: '',
            checked: false
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
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

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}</style>