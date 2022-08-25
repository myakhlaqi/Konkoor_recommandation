<template>
    <v-tabs id="mobile-tabs-5" fixed light>

        <v-tabs-bar slot="activators" class="grey lighten-3">
            <v-tabs-slider class="accent"></v-tabs-slider>
            <v-tabs-item href="#1" class="accent--text">
                <span class="IR"> پروژه</span>
            </v-tabs-item>
            <v-tabs-item href="#2" class="accent--text">
                <span class="IR">گزینه ها</span>
            </v-tabs-item>
            <v-tabs-item href="#3" class="accent--text">
                <span class="IR">ارزیابی</span>
            </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content key="1" id="1">
            <v-card flat>
                <showProject :id="project['.key']"></showProject>
            </v-card>
        </v-tabs-content>
        <v-tabs-content key="2" id="2">
            <v-card flat>
                <choice :id="project['.key']"></choice>
            </v-card>
        </v-tabs-content>
        <v-tabs-content key="3" id="3">
            <v-card flat>
                <result :id="project['.key']"></result>
            </v-card>
        </v-tabs-content>
    </v-tabs>
</template>
<script>
    import showProject from  './showProject.vue';
    import choice from  './choice.vue';
    import result from  './result.vue';
    import firebase from 'firebase'
    import auth from "../../database/auth";

    export default {
        props: ['id'],

        created() {
            this.$bindAsObject('project',  firebase.database().ref(`projects/${auth.getUid()}`).child(this.id));
        },
        components: {
            'showProject': showProject,
            'choice': choice,
            'result': result
        },

        data () {
            return {
                tabs: ['پروژه', 'گزینه ها', 'ارزیابی'],
                active: null
            }
        }
    }
</script>
<style>
    .tabs__container {
        flex-direction: row-reverse;
        margin: 0;
    }

    .tabs--fixed .tabs__li {
        min-width: 80px;
        max-width: 80px;
        flex: 0 1 80px;
    }

    .tabs__bar {
        height: 40px;
    }

    .application .theme--light.tabs .tabs__item.tabs__item--active {
        color: cornflowerblue;
    }
</style>