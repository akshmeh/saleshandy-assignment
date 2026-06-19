import { create } from 'zustand';
import { Order, CartItem, Address } from '../types';
import { INITIAL_ORDERS } from '../mock/data';

interface OrderState {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentMethod: string,
    subtotal: number,
    shippingCost: number,
    discount: number,
    total: number
  ) => Order;
  getOrder: (orderNumber: string) => Order | undefined;
}

const loadOrdersState = (): Order[] => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem('client_orders');
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

const saveOrdersState = (orders: Order[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('client_orders', JSON.stringify(orders));
  }
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: loadOrdersState(),

  placeOrder: (items, shippingAddress, billingAddress, paymentMethod, subtotal, shippingCost, discount, total) => {
    const rndSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `PROD-${rndSuffix}`;
    const id = `ord-${Date.now()}`;
    const date = new Date().toISOString();
    
    const newOrder: Order = {
      id,
      orderNumber,
      date,
      items: [...items],
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      discount,
      total,
      status: 'pending',
      trackingNumber: `USPS-PROD-${Date.now().toString().slice(-7)}`,
      timeline: [
        {
          status: 'pending',
          title: 'Order Completed',
          description: 'Payment captured successfully. Your purchase awaits logistics processing.',
          timestamp: date
        }
      ]
    };

    set((state) => {
      const updated = [newOrder, ...state.orders];
      saveOrdersState(updated);
      return { orders: updated };
    });

    return newOrder;
  },

  getOrder: (orderNumber) => {
    return get().orders.find((o) => o.orderNumber === orderNumber);
  }
}));
