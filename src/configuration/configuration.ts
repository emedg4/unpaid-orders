export default () => ({
    app : {
        port: process.env.APP_PORT
    },
    rbmq: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        url: process.env.RABBITMQ_URL,
        queue:{
            unpaid_orders: process.env.UNPAID_ORDERS_QUEUE,
            toOrdersEngine: process.env.TO_ORDERS_ENGINE,

        }
    },
})

