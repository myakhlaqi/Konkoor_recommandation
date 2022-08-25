<template>
    <v-layout row wrap class="main_contian">
        <v-flex xs12 dir="rtl">
            <v-card>
                <div class="wrapper pa-3 pt-4">
                    <v-card-title class="header">
                        <h6 class=" custom_headline IR_M f_16 primary--text">مشخصات پروژه</h6>
                    </v-card-title>
                    <div class="line" style="margin-right: 5px;margin-left: 5px"/>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md6>
                            <form class="pa-2 pt-4">
                                <v-card class="elevation-0 pa-2">
                                    <v-select
                                            v-bind:items="cities"
                                            v-model="project.city"
                                            label="استان"
                                            item-text="name"
                                            return-object
                                            autocomplete
                                            class="IR f_14"
                                            :rules="[err_City]"
                                    ></v-select>
                                    <v-text-field
                                            name="input-1"
                                            label="اسم"
                                            class="IR f_14"
                                            v-model="project.title"
                                            :rules="[err_Title]"
                                    ></v-text-field>
                                    <v-text-field
                                            name="input-2"
                                            label="توضیحات"
                                            class="IR f_14"
                                            v-model="project.description"
                                            :rules="[]"
                                    ></v-text-field>
                                    <div dir="ltr">
                                        <v-btn class="primary IR f_12" style="width: 120px" @click.native="Submit">ثبت
                                        </v-btn>
                                    </div>
                                </v-card>
                            </form>
                        </v-flex>
                    </v-layout>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import firebase from  'firebase'
    import auth from '../../database/auth'
    import datasrc from '../../database/data'

    export default {
        data () {
            return {
                project: {
                    title: '',
                    description: '',
                    city: {}
                },
                Title_errors: false,
                City_errors: false
            }
        },
        computed: {
            err_Title() {
                if (this.project.title.length < 2) {
                    this.Title_errors = true;
                    return 'فیلد اسم الزامی می باشد.'
                } else {
                    this.Title_errors = false;
                    return true;
                }
            },
            err_City() {
                if (!this.project.city.name) {
                    this.City_errors = true;
                    return 'فیلد شهر الزامی می باشد.'
                } else {
                    this.City_errors = false;
                    return true;
                }
            },
            cities(){
                return datasrc.cities;
            }
        },
        methods: {
            Submit: function () {
                if (!this.Title_errors && !this.City_errors) {
                    let pro = {
                        title: this.project.title,
                        description: this.project.description,
                        city: {
                            id: this.project.city.id,
                            name: this.project.city.name,
                            x: this.project.city.x,
                            y: this.project.city.y,
                        }
                    };
                    let init_setting = {
                        name: this.project.city.name,
                        x: this.project.city.x,
                        y: this.project.city.y,
                        value1: 5,
                        value2: 6,
                        value3: 7,
                    };
                    let newRef = firebase.database().ref(`projects/${auth.getUid()}`).push(pro).getKey();
                    firebase.database().ref(`choices/${newRef}`).child('setting').set(init_setting);
                    this.$router.push('/projects');
                } else {
                    alert('لطفا ورودی را تصحیح کنید.')
                }
            },
        }
    }
</script>
<style>
    .list__tile__title {
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        text-align: right;
        font-family: IR;
        font-size: 14px;
        color: #1e88e5;
    }

    .input-group--text-field label {
        right: 0;
        text-align: right;
        left: auto;
    }

    .input-group--text-field.input-group--single-line {
        font-family: IR;
        font-weight: 400;
    }

    .input-group__details {
        flex-direction: row-reverse;
        text-align: right;
    }
</style>