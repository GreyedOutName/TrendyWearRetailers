"use client"

import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useRouter } from "next/navigation";

const CheckoutSuccess = ({ 
  orderNumber = "#ORD-89247-XYZ", 
  customerEmail = "customer@example.com" 
}) => {
  const router = useRouter(); // ✅ THIS WAS MISSING

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-100 text-center">
          
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" strokeWidth={2} />
          </div>

          {/* Heading */}
          <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">
            Order confirmed
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Thank you for your purchase! We've received your order and will contact you as soon as your package is shipped.
          </p>

          {/* Order Details Summary */}
          {/*
          <div className="mt-8 bg-gray-50 rounded-lg p-4 text-left">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <dt className="text-gray-500">Order number</dt>
                <dd className="font-medium text-gray-900">{orderNumber}</dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="text-gray-500">Confirmation email</dt>
                <dd className="font-medium text-gray-900 truncate ml-4">
                  {customerEmail}
                </dd>
              </div>
            </dl>
          </div>
          */}

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => router.push("/orders")}
              className="flex-1 flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              Track Order
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/products-page")}
              className="flex-1 flex justify-center items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop More
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;