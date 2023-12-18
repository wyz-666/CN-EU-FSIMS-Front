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
                        <span class="text-600 font-large">请注册</span>
                    </div>

                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">用户姓名</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
                            style="padding:1rem;" />

                        <label for="account" class="block text-900 text-xl font-medium mb-2">用户账号</label>
                        <InputText id="account" v-model="number" type="text" class="w-full mb-3" placeholder="Account"
                                   style="padding:1rem;" />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <label for="password2" class="block text-900 font-medium text-xl mb-2">请再次输入密码</label>
                        <Password id="password2" v-model="password" placeholder="Confirm Your Password" :toggleMask="true"
                                  class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
<!--                        <label for="name" class="block text-900 text-xl font-medium mb-2">操作人姓名</label>-->
<!--                        <InputText id="name" v-model="name" type="text" class="w-full mb-3" placeholder="Name"-->
<!--                            style="padding:1rem;" />-->
                      <label for="selectType" class="block text-900 text-xl font-medium mb-2">请选择你的身份类型</label>
                      <select id="selectType" v-model="selectedType" class="w-full mb-3" style="padding:1rem;">
                        <option value="0" selected="selected">Please select your identity</option>
                        <option value="1">1 - 管理员</option>
                        <option value="2">2 - 操作员</option>
                        <option value="3">3 - 用户</option>
                      </select>
                      <label for="company" class="block text-900 text-xl font-medium mb-2">操作人公司</label>
                        <InputText id="company" v-model="company" type="text" class="w-full mb-3" placeholder="Company"
                            style="padding:1rem;" />
                        <label for="phone" class="block text-900 text-xl font-medium mb-2">操作人电话</label>
                        <InputText id="phone" v-model="phone" type="text" class="w-full mb-3" placeholder="Phone"
                            style="padding:1rem;" />
                        <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                                <RadioButton v-model="checked" inputId="ingredient1" name="type" value="Cheese" />
                                <label for="ingredient1" class="ml-2">管理员</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="checked" inputId="ingredient2" name="type" value="Mushroom" />
                                <label for="ingredient2" class="ml-2">数据管理员</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="checked" inputId="ingredient3" name="type" value="Pepper" />
                                <label for="ingredient3" class="ml-2">普通用户</label>
                            </div>
                        </div>
                        <div class="flex align-items-center justify-content-between mb-5">
                            <!-- <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">记住账号</label>
                            </div> -->

                        </div>
                        <div>
                            <router-link to="/home">
                                <Button label="注册" class="w-full p-3 text-xl"></button>
                            </router-link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
}
</style>