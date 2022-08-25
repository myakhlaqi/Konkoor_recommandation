<template>
    <v-container fluid>
        <v-layout>
            <v-flex xs12>
                <v-card class="pt-4">
                    <h6 class="text-xs-center IR_M f_16 primary--text">!به انتخاب معقول خوش آمدید</h6>
                    <p class="IR text-xs-center pr-3 pl-3" dir="rtl">
                        ما در اینجا با استفاده از روش سلسله مراتبی AHP بهترین گزینه را برای شما معرفی میکینم.</p>
                    <v-divider></v-divider>
                    <div class="pa-3 mt-2 pb-4">
                        <v-layout row wrap>
                            <v-flex xs12 sm6 dir="rtl" class="mt-2">
                                <v-card>
                                    <v-card-title class="header primary">
                                        <h3 class="custom_headline ma-1 IR_L">پروژه جدید</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <h5 class="IR_M f_14 " style="color: #272d4e;">برای شروع یک پروژه جدید این گزینه را انتخاب کنید.</h5>
                                        <ol class="IR pr-4">
                                            <li>پروژه جدید بسازید.</li>
                                            <li>رشته های مورد نظرتان را انتخاب کنید.</li>
                                            <li>معیارهای انتخاب را ارزش گزاری کنید.</li>
                                            <li>گزارش کامل و نتیحه نهایی را مشاهده کنید.</li>
                                        </ol>
                                    </v-card-text>
                                    <v-card-actions style="flex-direction: row-reverse">
                                        <v-btn flat class="blue--text btn_footer" route to="/projects/addProject">
                                            <v-icon class="blue--text" style="font-size: 18px" fa>flag-checkered
                                            </v-icon>
                                            <span style="font-size: 14px;padding-right: 8px">شروع</span>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 dir="rtl" class="mt-2">
                                <v-card>
                                    <v-card-title class="header primary">
                                        <h3 class="custom_headline ma-1 IR_L">پروژه ها</h3>
                                    </v-card-title>
                                    <v-card-text style="padding-bottom: 40px">
                                        <h5 class="IR_M f_14 " style="color: #272d4e;"> برای اشتراک در پروژه های قبلی این گزینه را انتخاب کنید.</h5>
                                        <ol class="IR pr-4">
                                            <li>قبلا یک پروژه را ساخته اید.</li>
                                            <li>معیارهای تان ارزش گزاری کنید.</li>
                                            <li>گزارش کامل و نتیحه نهایی را مشاهده کنید.</li>
                                        </ol>
                                    </v-card-text>
                                    <v-card-actions style="flex-direction: row-reverse">
                                        <v-btn flat class="blue--text btn_footer " route to="/projects">
                                            <v-icon class="blue--text" style="font-size: 18px" fa>flag-checkered
                                            </v-icon>
                                            <span style="font-size: 14px;padding-right: 8px">شروع</span>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
