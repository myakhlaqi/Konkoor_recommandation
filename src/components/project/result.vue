<template>
    <v-layout row wrap class="main_contian">
        <v-flex xs12 dir="rtl">
            <v-card>
                <div class="wrapper pa-3 pt-4">
                    <v-card-title class="header">
                        <h6 class=" custom_headline IR_M f_16" style="color: #272d4e;">ارزش معیار های انتخاب</h6>
                    </v-card-title>
                    <div class="line" style="margin-right: 5px;margin-left: 5px"/>
                    <v-layout row wrap>

                        <v-flex xs12 sm6 md6 order-md2>
                            <div class="pa-2 pt-4 pb-0">
                                <v-card class="elevation-1">
                                    <v-list class="pa-0">
                                        <v-subheader id="List_title" class="choice_list accent--text IR f_16"><span>گزینه ها</span><span>اولویت</span>
                                        </v-subheader>
                                        <v-subheader single-line avatar v-if="choices"
                                                     v-for="choice in finalList"
                                                     v-bind:key="choice.rank"
                                                     class="choice_list">
                                            <v-list-tile-content>
                                                <v-list-tile-title
                                                        v-text="choice.title"
                                                        class="IR f_14 primary--text">
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-list-tile-title
                                                        v-text="choice.rank"
                                                        class="IR f_14 primary--text"
                                                        style="text-align: left;"></v-list-tile-title>
                                            </v-list-tile-action>
                                        </v-subheader>
                                    </v-list>
                                </v-card>
                            </div>
                        </v-flex>
                        <v-flex xs12 sm6 md6 order-md1>
                            <div class="pa-2 pt-4">
                                <v-card class="elevation-0 pa-2">
                                    <div class="combo_container">
                                        <p class="IR f_14">رتبه علمی در مقابل مسافت:</p>
                                        <v-select v-bind:items="states" v-model="setting.value1"
                                                  autocomplete
                                                  class="IR f_12 pr-4"
                                                  @input="valueChanged"
                                        >
                                        </v-select>
                                    </div>
                                    <div class="combo_container">
                                        <p class="IR f_14">رتبه علمی در مقابل زمان:</p>
                                        <v-select v-bind:items="states" v-model="setting.value2"
                                                  autocomplete
                                                  class="IR f_12 pr-4"
                                                  @input="valueChanged"
                                        >
                                        </v-select>
                                    </div>
                                    <div class="combo_container">
                                        <p class="IR f_14">مسافت در مقابل زمان:</p>
                                        <v-select v-bind:items="states" v-model="setting.value3"
                                                  autocomplete
                                                  class="IR f_12 pr-4"
                                                  @input="valueChanged"
                                        >
                                        </v-select>
                                    </div>
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
    import AHP from 'ahp'


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

            this.$bindAsObject('setting', firebase.database().ref(`choices/${this.id}/setting`), null);
//            this.test();
        },
        data () {
            return {
                states: [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 0.11, 0.12, 0.14, 0.17, 0.20, 0.25, 0.33, 0.5
                ],
            }
        },
        methods: {

            valueChanged(){
                // create a copy of the item
                let setting = {
                    name: this.setting.name,
                    x: this.setting.x,
                    y: this.setting.y,
                    value1: this.setting.value1,
                    value2: this.setting.value2,
                    value3: this.setting.value3,
                };
                firebase.database().ref(`choices/${this.id}`).child('setting').set(setting);
            },

            getDistance(city_x, city_y){
                let result = Math.sqrt(Math.pow((this.setting.x - city_x), 2) + Math.pow((this.setting.y - city_y), 2)).toFixed(3);
               console.log('city',result)
                if (result == 0) {
                    console.log('return ',1)
                    return 1;
                }else {
                    console.log('return ',result)
                    return result;
                }
            },


            getRankNumber(item1, min){
                return 9 * min / item1;
            },

            test(){

                let ahpContext = new AHP();
                ahpContext.addItems(['A', 'B', 'C', 'D']);
                ahpContext.addCriteria(['rank', 'distance', 'time']);

                ahpContext.setCriteriaRankByGivenScores([5, 6, 7]);
                ahpContext.setCriteriaItemRankByGivenScores('rank', [0.44, 0.3, 1, 0.89, 2.25, 3.38]);
                ahpContext.setCriteriaItemRankByGivenScores('distance', [0.11, 0.11, 1, 1, 9, 9]);
                ahpContext.setCriteriaItemRankByGivenScores('time', [0.11, 0.11, 1, 1, 9, 9]);


                let output = ahpContext.run();
                console.log(output);
            }
        },

        computed: {
            finalList()
            {
                let list = [];
                let Items = [];
                for (let choice of this.choices) {

                    let cash = {
                        title: choice.title,
                        rank: choice.uni_rank,
                        distance: this.getDistance(choice.city_x, choice.city_y),
                        time: choice.fac_time === 'روزانه' ? 2 : 1
                    };
                    Items.push(choice.title);
                    list.push(cash);
                }


                let minDistance = Math.min(...list.map(o => o.distance));
                let minRank = Math.min(...list.map(o => o.rank));


                let rank_Item_Criteria = [];
                let distance_Item_Criteria = [];
                let time_Item_Criteria = [];

                for (let i = 0; i < list.length; i++) {

                    let rankNum = this.getRankNumber(list[i].rank, minRank);
                    rank_Item_Criteria.push(rankNum);

                    let distanceNum = this.getRankNumber(list[i].distance, minDistance);
                    distance_Item_Criteria.push(distanceNum);

                    time_Item_Criteria.push(list[i].time);

                }

                let ahpContext = new AHP();
                ahpContext.addItems(Items);
                ahpContext.addCriteria(['rank', 'distance', 'time']);
                let setting = [this.setting.value1, this.setting.value2, this.setting.value3];


                console.log(rank_Item_Criteria);
                console.log(distance_Item_Criteria);
                console.log(time_Item_Criteria);
                console.log(setting);
                ahpContext.setCriteriaRankByGivenScores(setting);
                ahpContext.setCriteriaItemRankByGivenScores('rank', rank_Item_Criteria);
                ahpContext.setCriteriaItemRankByGivenScores('distance', distance_Item_Criteria);
                ahpContext.setCriteriaItemRankByGivenScores('time', time_Item_Criteria);


//                let analyticConcctext = ahpContext.debug();
//                for(let key in analyticConcctext){
//                    console.log(`${key}: `, analyticConcctext[key], '\n');
//                }

                let problem = ahpContext.findNextProblem();
                console.log(problem);

                let analyticContext = ahpContext.run().rankedScoreMap;

                let result = [];
                for (let key in analyticContext) {

                    let a = {
                        title: `${key}`,
                        rank: analyticContext[key].toFixed(3)
                    }


                    result.push(a);
                    console.log(`${key}: `, analyticContext[key], '\n');
                }
                return result.sort((a, b) => (b.rank - a.rank));
//                let output = ahpContext.run().rankedScoreMap;
//                return result;
                return list;
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

    .input-group--text-field.input-group--single-line {
        font-family: IR_L;
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

    .combo_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
    }
</style>