import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ExtraView,
  OrderView,
  SaveOrderResponse,
} from '../../viewModels/interfaces';
import { find, filter, isEqual, remove, cloneDeep } from 'lodash';
import { OrderListInfo, OrderInfo } from '../../backendModels/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const isOrderEqual: Function = (orderToFind: OrderView) => (o: OrderView) =>
  o.dish.name === orderToFind.dish.name &&
  isEqual(o.extras, orderToFind.extras);

@Injectable()
export class OrderProvider {
  private readonly saveOrdersPath: string = 'ordermanagement/v1/order';
  private orders: OrderView[] = [];

  constructor(private http: HttpClient) {}

  public getOrderData(): any[] {
    return this.orders;
  }

  public getNumberOrders(): number {
    return this.orders.length;
  }

  public findOrder(order: OrderView): OrderView {
    return find(this.orders, isOrderEqual(order));
  }

  public addOrder(order: OrderView): void {
    const addOrder: OrderView = cloneDeep(order);
    addOrder.extras = filter(
      addOrder.extras,
      (extra: ExtraView) => extra.selected,
    );
    if (this.findOrder(addOrder)) {
      this.increaseOrder(addOrder);
    } else {
      this.orders.push(addOrder);
    }
  }

  public increaseOrder(order: OrderView): number {
    return (this.findOrder(order).orderLine.amount += 1);
  }

  public decreaseOrder(order: OrderView): number {
    return (this.findOrder(order).orderLine.amount -= 1);
  }

  public removeOrder(order: OrderView): OrderView[] {
    return remove(this.orders, isOrderEqual(order));
  }

  public removeAllOrders(): OrderView[] {
    this.orders = [];
    return this.orders;
  }

  public sendOrders(token: string): Observable<SaveOrderResponse> {
    const orderList: OrderListInfo = {
      booking: { bookingToken: token },
      orderLines: this.composeOrders(this.orders),
    };

    return this.http.post<SaveOrderResponse>(
      `${environment.restServiceRoot}${this.saveOrdersPath}`,
      orderList,
    );
  }

  composeOrders(orders: OrderView[]): OrderInfo[] {
    const composedOrders: OrderInfo[] = [];
    orders.forEach((order: OrderView) => {
      const extras: any[] = [];
      order.extras
        .filter((extra: ExtraView) => extra.selected)
        .forEach((extra: ExtraView) => extras.push({ id: extra.id }));
      composedOrders.push({
        orderLine: {
          dishId: order.dish.id,
          amount: order.orderLine.amount,
          comment: order.orderLine.comment,
        },
        extras: extras,
      });
    });
    return composedOrders;
  }
}
