import OrderItem from '../OrderItem/OrderItem';
import { FC, useEffect, useState } from 'react';
import { backendUrl, OrderType } from '../../../features/MyStepsComponent/MyStepsComponent';

import s from './OrdersList.module.css';

export type OrderStatus = 'NEW' | 'WORK' | 'PSYCHOLOGIST' | 'CANCELLED' | 'EXECUTED' | 'DELETED' ;

export interface IOrder {
    address: string;
    createdAt: string;
    id: number;
    name: string;
    orderStatus: OrderStatus;
    orderType: OrderType;
    phone: string;
    updatedAt: string;
    userId: string | null;
}

interface IOrdersList {
    phone: string;
}
const OrdersList: FC<IOrdersList> = ({ phone }) => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        if (phone) {
            fetch(`${backendUrl}/order/${phone}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }).then(async (response) => {
                if (response.ok) {
                    const json = await response.json();
                    setOrders(json)
                }
            });
        }
    }, [phone]);

    return (
        <div className={s.container}>
            {/*<div className={s.title}>МОИ ЗАЯВКИ</div>*/}
            {/*<div className={s.content}>*/}
            {/*    {!orders.length && 'Заявки отсутствуют'}*/}
            {/*    {orders.map((el) => <OrderItem key={el.id} order={el} />)}*/}
            {/*</div>*/}
            <div className={s.title}>ТЕЛЕФОН ДЛЯ СВЯЗИ:</div>
            <a href="tel:+79995941007">+7-999-59-41-007</ a>
        </div>
    );
};

export default OrdersList;
