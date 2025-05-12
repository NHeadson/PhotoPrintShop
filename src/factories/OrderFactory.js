import OrderModel from '@/models/OrderModel';

const createOrderModel = (data, id) => {
  if (!data) return null;

  const orderId = id || data.id;

  return new OrderModel(
    orderId,
    data.userId,
    data.items,
    data.orderDate,
    data.totalAmount,
    data.shippingAddress,
    data.status
  );
};

export default createOrderModel;
