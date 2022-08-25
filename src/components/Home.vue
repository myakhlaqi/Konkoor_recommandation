<template>
    <div>
        <v-navigation-drawer right temporary v-model="drawer"  light overflow absolute>
            <v-list class="pa-0 text-xs-right" dir="rtl">
                <v-list-tile avatar tag="div" class="primary pb-2" style="padding-top: 100px">
                    <v-list-tile-content>
                        <v-list-tile-title class="f_16 pb-2 white--text">{{username}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile @click.native="SignOut">
                    <v-list-tile-action>
                        <v-icon fa style="font-size: 18px">sign-out</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>خروج</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="primary" dark>
            <v-toolbar-title class="IR_M">{{appName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-breadcrumbs icons divider="/" class="custom_breadCrumb IR">
                    <v-breadcrumbs-item v-for="(crumb,index) in $breadcrumbs" :key="crumb.meta.breadcrumb"
                                        :disabled="index===($breadcrumbs.length - 1)" router :to="crumb.meta.path">
                        {{ crumb.meta.breadcrumb }}
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
                <router-view></router-view>
            </v-container>
        </main>
    </div>
</template>

<script>
    import auth from '../database/auth'
    export default {
        data () {
            return {
                drawer: false,
                mini: false,
                right: true,
                appName: 'انتخاب معقول',
            }
        },
        computed:{
            username(){
                return auth.getUser().displayName
            }
        },
        methods: {
            SignOut(){
                auth.logout()
            }
        },
    }
</script>

<style>


    .custom_breadCrumb {
        justify-content: flex-start;
        direction: rtl;
        background-color: #eceeef;
        border: solid #a9a9a9 thin;
        margin-bottom: 20px;
        /*padding: 5px 15px 5px 5px;*/
    }

    .breadcrumbs__item {
        font-size: 13px;
        height: 30px;
    }

    .toolbar__title {
        font-size: 16px;
        margin-left: 25px;
    }
</style>
