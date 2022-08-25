<template>
    <div>
        <v-btn block dark class="accent IR f_16" route to="projects/addProject"> پروژه جدید</v-btn>
        <v-layout wrap>
            <loading v-if="loading"></loading>
            <v-flex xs12 sm6 dir="rtl" v-if="!loading" class="mt-3" v-for="project in projects" :key="project.title">
                <v-card>
                    <v-card-title class="header primary">
                        <h3 class="custom_headline ma-1 IR_L">{{project.title}}</h3>
                        <v-btn icon class="white--text mt-0 mb-0 pa-0" @click.native.stop="showDialog(project)">
                            <v-icon ma-0 style="font-size: 18px;">clear</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <h6 class=" custom_headline IR_M primary--text">توضیحات:</h6>
                        <p class="IR  f_14">{{project.description}}</p>
                        <p class="IR  f_14 pt-2"> شهر: {{project.city.name}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <div>
                            <v-btn flat class="teal--text btn_footer" :to="'projects/project/'+project['.key']">
                                <v-icon class="teal--text f_14" fa>edit</v-icon>
                                <span style="font-size: 13px;padding-right: 8px">ویرایش</span>
                            </v-btn>
                            <span class="pipe">|</span>
                            <v-btn flat class="blue--text btn_footer" :to="'projects/project/'+project['.key']">
                                <v-icon class="blue--text" style="font-size: 18px">person</v-icon>
                                <span style="font-size: 13px;padding-right: 8px">ارزیابی</span>
                            </v-btn>
                        </div>
                        <v-btn flat class="blue--text btn_footer" :to="'projects/project/'+project['.key']">
                            <v-icon class="blue--text" style="font-size: 18px" fa>flag-checkered</v-icon>
                            <span style="font-size: 14px;padding-right: 8px">نتیجه</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" class="pa-5" width="600px">
            <v-card>
                <v-card-text class="headline IR pa-4" style="direction: rtl;font-size: 12px">
                    آیا میخواهید پروژه انتخاب شده را حذف کنید؟
                </v-card-text>
                <v-card-actions dir="rtl">
                    <v-spacer></v-spacer>
                    <v-btn class="pink--text darken-1" flat="flat" @click.native="delete_project">حذف پروژه</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import auth from '../../database/auth'
    import firebase from 'firebase';
    import loading from '../loading.vue'

    export default{
        components:{
          'loading':loading
        },

        created() {
            this.$bindAsArray('projects', firebase.database().ref(`projects/${auth.getUid()}`), null, () =>{this.loading=false});
        },
        data: function () {
            return {
                user: {},
                selectedProject: {},
                dialog: false,
                loading: true
            }
        },
        methods: {
            showDialog: function (project) {
                this.selectedProject = project;
                this.dialog = true;
            },
            delete_project: function () {
                this.$firebaseRefs.projects.child(this.selectedProject['.key']).remove()
                firebase.database().ref(`choices`).child(this.selectedProject['.key']).remove();
                this.selectedProject = {}
                this.dialog = false;
            }
        }
    }
</script>


<style>

    .layout.wrap {
        /*flex-direction: row-reverse;*/
        direction: rtl;
    }

    .custom_headline {
        line-height: 22px;
        font-size: 16px;
        color: white;
        padding-bottom: 3px;
        padding-top: 3px;
    }

    .card__actions {
        font-family: 'IR';
        font-size: 14px;
        background-color: #f7f7f9;
        padding: 0px;
        border: solid thin #e7e7e7;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .header {
        padding: 0 10px 0 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .card > *:first-child {
        border-radius: 0;
    }

    .btn_footer {
        border-radius: 0;
        margin: 0px;
        padding: 0;
        width: 40px;
        height: 35px;
        align-items: center;
    }


</style>