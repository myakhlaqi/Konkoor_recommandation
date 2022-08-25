<template>
    <div>
        <div v-if="!register" class="sign_up_form" dir="rtl">
            <div class="btn  btn--raised social-btn  google " style="border-color: #ea4335;" name="action"
                 @click="googleLogin">
                <span class="social-btn-text">ورود با گوگل </span>
                <span class="social-icon"> <v-icon dark fa style="font-size: 18px">google-plus</v-icon></span>
            </div>

            <div class="btn  btn--raised    social-btn  facebook" style="border-color: #3b5898;" name="action"
                 @click="facebookLogin">
                <span class="social-btn-text">ورود با فیس بوک </span>
                <span class="social-icon"> <v-icon dark fa style="font-size: 18px">facebook</v-icon></span>
            </div>

            <div class="btn  btn--raised social-btn choice" @click="register=true">
                <span class="social-btn-text">ثبت نام</span>
                <span class="social-icon"> <v-icon dark fa style="font-size: 18px">sign-in</v-icon></span>
            </div>
        </div>
        <form v-if="register" @submit.prevent="signUp">
            <v-text-field
                    name="input-1-3"
                    label="اسم و اسم خانوادگی"
                    style="direction: rtl"
                    class="IR f_16"
                    type="text"
                    v-model="authInput.name"
            ></v-text-field>
            <v-text-field
                    name="input-1-3"
                    label="اسم کاربری"
                    style="direction: rtl"
                    class="IR f_16"
                    type="email"
                    v-model="authInput.email"
            ></v-text-field>
            <v-text-field
                    name="input-10-2"
                    label="رمز عبور"
                    min="8"
                    type="password"
                    style="direction: rtl"
                    class="IR f_16"
                    v-model="authInput.password"
            ></v-text-field>
            <v-btn class="primary IR f_14 mt-4" block style="width: 100%">ثبت اطلاعات</v-btn>
        </form>
    </div>
</template>
<script>
    import auth from '../../database/auth'
    export default {
        data:function () {
          return{
              register:false,
              authInput:{
                  name:'',
                  password:'',
                  email:''
              }
          }
        },
        methods: {
            googleLogin: function (event) {
                auth.googleLogin();
            },
            facebookLogin: function (event) {
                auth.facebookLogin();
            },
            signUp:function (event) {
                auth.SignUp(this.authInput);
            }
        }

    }

</script>
<style scoped>

    .btn {
        background-color: #272d4e;
        width: 130px;
        text-align: center;
    }

    button + button {
        margin: 5px;
    }

    .social-btn {
        background-color: white;
        color: #3b5998;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;
        padding: 0;
        font-family: IR;
        width: 100%;
        cursor: pointer;
    }

    .social-icon {
        height: 100%;
        width: 40px;
        background-color: #3b5997;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .social-btn-text {
        margin-right: 20px;
    }

    .social-btn + .social-btn {
        margin-top: 8px;
    }

    .google .social-icon {
        background-color: #ea4335;

    }

    .google .social-btn-text {
        color: #ea4335;
    }

    .facebook .social-icon {
        background-color: #3b5898;
    }

    .facebook .social-btn-text {
        color: #3b5898;
    }

    .choice .social-icon {
        background-color: #008b8b;
    }

    .choice .social-btn-text {
        color: darkcyan;
    }

    .sign_up_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>