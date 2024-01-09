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
                        <div v-if="lan == 'CN'" class="text-900 text-3xl font-medium mb-3">食品安全智慧管理与决策支持系统</div>
                        <div v-else class="text-900 text-3xl font-medium mb-3">Food Safety Intelligent Management and
                            Decision Support System</div>
                        <span v-if="lan == 'CN'" class="text-600 font-medium">请登录</span>
                        <span v-else class="text-600 font-medium">Please Login</span>
                    </div>

                    <div class="w-full md:w-10 mx-auto">
                        <label v-if="lan == 'CN'" for="email1" class="block text-900 text-xl font-medium mb-2">用户名</label>
                        <label v-else for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
                            style="padding:1rem;" />

                        <label v-if="lan == 'CN'" for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                        <label v-else for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label v-if="lan == 'CN'" for="rememberme1">记住账号</label>
                                <label v-else for="rememberme1">Remember Account</label>
                            </div>
                            <a v-if="lan == 'CN'" class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">注册账号</a>
                            <a v-else class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Register</a>
                            <a v-if="lan == 'CN'" class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">忘记密码?</a>
                            <a v-else class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Forget Password?</a>
                        </div>
                        <div>
                            <div>
                                <Toast />
                                <Button v-if="lan == 'CN'" label="登录" class="w-full p-3 text-xl" @click="login"></button>
                                <Button v-else label="登录" class="w-full p-3 text-xl" @click="login"></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../AppEventBus';
import router from '../router'

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
            if (this.lan == 'CN') {
                this.flag = true
            } else {
                this.flag = false
            }
        };
        EventBus.on('language-change', this.languageChangeListener);
    },
    methods: {
        login() {
            const account = this.email
            const password = this.password
            const type = 1
            console.log('account',account)
            axios.post('http://127.0.0.1:8080/fsims/user/login', { account, password , type}).then(res => {
                console.log(res.data.data.token)
                console.log('account',account)
                if (res.data.statusCode != 200) {
                    this.$toast.add({ severity: 'error', summary: '登录失败', detail: '密码错误', life: 3000 });
                    //不执行剩余内容
                    return;
                }
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('uuid',res.data.data.uuid)
                localStorage.setItem('user_type',res.data.data.user_type)
                console.log("user_type:",res.data)
                localStorage.setItem('account',account)
                // localStorage.setItem('password',password)
                var message = account + ' submitted'
                this.$toast.add({ severity: 'success', summary: '登录成功', detail: message, life: 3000 });
                router.push('/Screen')
            })
            .catch(error =>{
                console.error('Network error:', error);
            })

        }
    },
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
}
</style>