<template>
    <div>
        <v-text-field
                label="ایمیل"
                style="direction: rtl"
                class="IR f_16"
                v-model="authInput.email"
        ></v-text-field>
        <v-text-field v-if="!forgotPassword"
                      label="رمز عبور"
                      type="password"
                      style="direction: rtl"
                      class="IR f_16"
                      v-model="authInput.password"
        ></v-text-field>
        <v-btn @click.native="signIn" class="primary IR f_14 mt-4" block>
            {{forgotPassword ? 'ارسال لینک' : 'ورود'}}
        </v-btn>
        <v-btn class="accent--text IR f_12" flat block @click.native="forgotPassword=!forgotPassword">
            {{forgotPassword ? 'بازگشت' : 'رمز خود را فراموش کرده اید؟'}}
        </v-btn>
    </div>
</template>

<script>
    import auth from  '../../database/auth'
    import firebase from 'firebase'
    export default {
        data() {
            return {
                authInput: {
                    email: '',
                    password: '',
                },
                forgotPassword: false
            }
        },
        methods: {
            signIn: function () {

                if (this.forgotPassword) {


                    firebase.auth().sendPasswordResetEmail(this.authInput.email).then(function(result) {
                        alert('we have send password reset link. check your email.')
                    }, function(error) {
                        alert(error.message)
                        // An error happened.
                    });
                } else {
//                alert("Login 1");
                    auth.login(this.authInput);
                    if (auth.isAuthenticated.value) {
                        this.$router.push('/');
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>