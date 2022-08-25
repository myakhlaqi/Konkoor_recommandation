<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm4 offset-sm4 class="mt-5">
                <v-card class="pt-5">
                    <h6 class="pb-2 text-xs-center IR_M f_16 primary--text">
                        به انتخاب معقول خوش آمدید</h6>
                    <v-divider></v-divider>
                    <v-slide-x-transition>
                        <div class="ma-4 mt-5 pb-2">
                            <sign-in v-if="show"></sign-in>
                            <sign-up v-if="!show"></sign-up>
                        </div>
                    </v-slide-x-transition>
                    <v-card-actions style="justify-content: space-between">
                        <v-spacer></v-spacer>
                        <v-btn class="accent--text" flat @click.native="show = !show">
                            {{ show ? 'ثبت نام' : 'ورود' }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>


    import Signin from './Signin.vue'
    import Signup from './Signup.vue'

    export default {
        components: {
            'sign-in': Signin,
            'sign-up': Signup,
        },
        data: () => ({
            show: false,
            e1: false,
            e2: false,
            e3: false,
            e4: false,
            password: 'Password'
        }),

    }

</script>
<style>
    .input-group__input .icon {
        margin-left: 20px;
    }

    .input-group--text-field.input-group--dirty label {
        font-size: 16px;
    }
</style>