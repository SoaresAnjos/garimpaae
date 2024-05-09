import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useState } from "react";
import { fetchOderAction } from "../../../redux/slices/orders/ordersSlice";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];



export default function OrdersList() {
  
const dispatch = useDispatch();

useState(()=>{
  dispatch(fetchOderAction())
}, []);

const {orders: {data: orders}, error, loading} = useSelector(state => state?.orders);

console.log(orders);


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      {/* order stats */}
      <OrdersStats />

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        Recent Oders
      </h3>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Order ID
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Payment Method
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Data do pedido
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Delivery Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Total
              </th>
              {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders?.map((order) => (
              <tr key={order?._id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {order?._id}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
            
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {order.email}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {order?.createdAt}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {order.createdAt}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {order.status}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {order.status}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  R$ {order.totalPrice}
                </td>
                {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {order.name}</span>
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
