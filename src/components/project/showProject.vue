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
                                            label="استان فعلی"
                                            item-text="name"
                                            return-object
                                            v-model="project.city"
                                            autocomplete
                                            class="IR f_16"
                                    ></v-select>
                                    <v-text-field
                                            name="input-1"
                                            label="اسم پروژه"
                                            class="IR f_16"
                                            v-model="project.title"
                                    ></v-text-field>
                                    <v-text-field
                                            name="input-2"
                                            label="توضیحات"
                                            class="IR f_16"
                                            v-model="project.description"
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

        props: {
            id: {
                type: String,
                default: function () {
                    return 'null';
                }
            }
        },

        created() {
            this.$bindAsObject('project',  firebase.database().ref(`projects/${auth.getUid()}`).child(this.id));
        },
        data () {
            return {
                Title_errors: false,
                City_errors: false
            }
        },
        computed: {
            cities(){
                return datasrc.cities;
            }
        },
        methods: {
            Submit: function () {
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