const cities = [
    {
        id: 1,
        name: 'تهران',
        x: 525,
        y: 135,
        universities: [
            {
                id: 1,
                name: 'دانشگاه تهران',
                rank: 25,
                faculties: [
                    {
                        id: 1,
                        name: 'مهندسی نرم افزار',
                        period: 'روزانه'
                    },
                    {
                        id: 3,
                        name: 'فزیک',
                        period: 'شبانه'
                    }
                ]
            },
            {
                id: 2,
                name: 'دانشگاه امام خمینی',
                rank: 30,
                faculties: [
                    {
                        id: 4,
                        name: 'مهندسی کمپیوتر',
                        period: 'روزانه'
                    },
                    {
                        id: 5,
                        name: 'دارو سازی',
                        period: 'شبانه'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'تبریز',
        x: 135,
        y: 600,
        universities: [
            {
                id: 3,
                name: 'دانشگاه تبریز',
                rank: 35,
                faculties: [
                    {
                        id: 6,
                        name: 'مهندسی نرم افزار تبریز',
                        period: 'روزانه'
                    },
                    {
                        id: 7,
                        name: 'فزیک',
                        period: 'شبانه'
                    }
                ]
            },
            {
                id: 4,
                name: 'دانشگاه امام خمینی تبریز',
                rank: 40,
                faculties: [
                    {
                        id: 8,
                        name: 'مهندسی کمپیوتر',
                        period: 'روزانه'
                    },
                    {
                        id: 9,
                        name: 'دارو سازی',
                        period: 'شبانه'
                    }
                ]
            }
        ]
    }
];
export default {cities};