<template>
    <v-layout row wrap class="main_contian">
        <v-flex xs12 dir="rtl">
            <v-card>
                <div class="wrapper pa-3 pt-4">
                    <v-card-title class="header">
                        <h6 class=" custom_headline IR_M f_16 primary--text">رشته ها و دانشگاه ها</h6>
                    </v-card-title>
                    <div class="line" style="margin-right: 5px;margin-left: 5px"/>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md6 order-xs2 order-md1>
                            <div class="pa-2 pt-4">
                                <v-card class="elevation-0 pa-2">
                                    <v-select
                                            v-bind:items="cities"
                                            label="استان"
                                            item-text="name"
                                            return-object
                                            v-model="choice_city"
                                            autocomplete
                                            class="IR f_14"
                                            @input="cityChanged"
                                    >
                                    </v-select>
                                    <v-select
                                            v-bind:items="universities"
                                            label="دانشگاه"
                                            item-text="name"
                                            return-object
                                            v-model="university"
                                            autocomplete
                                            class="IR f_14"
                                            @input="uniChanged"
                                    ></v-select>
                                    <v-select
                                            v-bind:items="faculties"
                                            label="رشته"
                                            item-text="name"
                                            return-object
                                            v-model="faculty"
                                            autocomplete
                                            class="IR f_14"
                                    >
                                        <template slot="item" scope="data">
                                            <v-list-tile-content>
                                                <v-list-tile-title
                                                        v-html="data.item.name+' - '+data.item.period "></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>
                                    <div dir="ltr">
                                        <v-btn class="primary IR f_12" style="width: 120px" :disabled="disabled"
                                               @click.native="addChoice">
                                            ثبت
                                        </v-btn>
                                    </div>
                                </v-card>
                            </div>
                        </v-flex>
                        <v-flex xs12 sm6 md6 order-xs1 order-md2>
                            <div class="pa-2 pt-4">
                                <v-card class="elevation-1">
                                    <v-list class="pa-0">
                                        <v-subheader id="List_title" class="choice_list accent--text IR f_16"><span>گزینه های انتخاب شده</span><span>{{choices ? choices.length : 0}}/10</span>
                                        </v-subheader>
                                        <v-subheader avatar v-if="choices" v-for="choice in choices"
                                                     v-bind:key="choice.title"
                                                     class="choice_list">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-text="choice.title" class="IR f_14"
                                                                   style="color: #272d4e"></v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-btn icon class="pink--text"
                                                       @click.native="deleteChoice(choice['.key'])">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </v-list-tile-action>
                                            <div class="line"></div>
                                        </v-subheader>
                                    </v-list>
                                </v-card>
                            </div>
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
            this.$bindAsArray('choices', firebase.database().ref(`choices/${this.id}`).child('choices'));
        },
        data () {
            return {
                choice_city: null,
                university: null,
                faculty: null,
            }
        },
        computed: {

            cities(){
                return datasrc.cities;
            },
            universities(){
                if (this.choice_city) {
                    return this.choice_city.universities;
                } else {
                    return []
                }
            },
            faculties(){

                if (this.university) {
                    let re = [];
                    let facs = this.university.faculties;
                    for (let f of facs) {
                        let title = this.university.name + '/' + f.name + '/' + f.period;
                        let notInserted=!this.choices.find(x => x.title === title);
                        if(notInserted){
                            re.push(f);
                        }
                    }

                    return re
                } else {
                    return [];
                }
            },


            disabled(){
                return !(this.choice_city && this.university && this.faculty && this.choices.length < 10);
            }
        },
        methods: {
            cityChanged(){
                this.university = null;
                this.faculty = null;
            },
            uniChanged(){
                this.faculty = null;
            },
            addChoice(){
                if (this.choice_city && this.university && this.faculty) {
                    let choice = {
                        title: this.university.name + '/' + this.faculty.name + '/' + this.faculty.period,
                        city_x: this.choice_city.x,
                        city_y: this.choice_city.y,
                        uni_rank: this.university.rank,
                        fac_time: this.faculty.period,
                    }
                    this.$firebaseRefs.choices.push(choice);
                }
            },
            deleteChoice(choiceKey){
                this.$firebaseRefs.choices.child(choiceKey).remove();
            }
        }
    }
</script>
<style>
    .list__tile__title {
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        text-align: right;
    }

    .input-group--text-field label {
        right: 0;
        text-align: right;
        left: auto;
    }

    .list__tile--avatar {
        height: 40px;
    }

    #List_title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /*background-color: #eceeef;*/
    }

    .choice_list {
        border: solid thin #cfcdcf;
        border-bottom: 0px;
        height: 40px;
    }

    label {
        font-size: 20px;
    }
</style>