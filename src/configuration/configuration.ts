export default () => ({
    app : {
        port: process.env.APP_PORT
    },
    rbmq: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        unpaid_orders_queue: process.env.UNPAID_ORDERS_QUEUE,
        modify_order_queue: process.env.MODIFY_ORDER_QUEUE,
        url: process.env.RABBITMQ_URL
    },
    db: {
        host: process.env.DB_HOST,
        url: process.env.DB_URL,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        database: process.env.DATABASE,
    },
    validateOrders:{
        host: process.env.VALIDATE_PAYMENT_HOST,
        uri: process.env.VALIDATE_PAYMENT_URI,
        port: process.env.VALIDATE_PAYMENT_PORT,
        url: process.env.VALIDATE_PAYMENT_URL
    }
})

