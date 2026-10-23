// Shows the logged-in user's order history, delivery date and tracking timeline.

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api/orders";
import { logout } from "../api/client";

// turns "2026-10-26" into "Monday 26 October 2026"
function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Account({ setCartItems }) {
  const navigate = useNavigate();

  // get the orders from Django
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  function handleLogout() {
    logout(); // remove token + saved cart
    setCartItems([]); // empty the cart on screen
    navigate("/login");
  }

  if (isLoading)
    return <p className="font-montserrat flex justify-center mt-24">Loading your orders...</p>;
  if (error)
    return <p className="font-montserrat flex justify-center mt-24">Could not load orders.</p>;

  return (
    <div className="font-montserrat flex justify-center mt-8 mb-16">
      <div className="w-[90%] md:w-[55%] flex flex-col gap-6">
        {/* title + logout */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">My Orders</h2>
          <button
            onClick={handleLogout}
            className="text-[12px] border border-[grey] rounded-full px-4 py-1"
          >
            Log out
          </button>
        </div>

        {/* no orders yet */}
        {orders.length === 0 && (
          <div className="flex flex-col gap-3 items-start">
            <p>You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-[black] text-white rounded-full px-5 py-2 text-[13px]"
            >
              Start shopping
            </button>
          </div>
        )}

        {/* one card per order */}
        {orders.map((order) => (
          <div key={order.id} className="shadow-md rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between text-[12px]">
              <p className="font-semibold">Order #{order.reference.slice(0, 8)}</p>
              <p className="bg-[#c2bdbd52] rounded-3xl px-3 py-1">{order.status_display}</p>
            </div>

            <p className="text-[11px] text-[grey]">
              {new Date(order.created_at).toLocaleDateString()} · Deliver to {order.address},{" "}
              {order.city}
            </p>

            {/* products in this order */}
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#f0f0f08a] rounded-xl pr-3 text-[12px]"
              >
                <img src={item.image} alt={item.name} className="size-14 object-contain" />
                <p className="flex-1">{item.name}</p>
                <p>x{item.quantity}</p>
                <p>₦{Number(item.price) * item.quantity}</p>
              </div>
            ))}

            <p className="text-right font-semibold">Total: ₦{Number(order.total)}</p>

            {/* estimated delivery date */}
            {order.status === "delivered" && (
              <p className="text-[12px] text-[green] font-semibold">Delivered</p>
            )}

            {order.status !== "delivered" && order.status !== "cancelled" && (
              <p className="text-[12px]">
                Estimated delivery:{" "}
                <span className="font-semibold">
                  {order.estimated_delivery
                    ? formatDate(order.estimated_delivery)
                    : "To be confirmed"}
                </span>
              </p>
            )}

            {/* tracking timeline */}
            <ol className="border-l-2 border-[#151ec7] pl-4 flex flex-col gap-2 text-[11px]">
              {order.events.map((e) => (
                <li key={e.created_at}>
                  <p className="font-semibold">{e.note}</p>
                  <p className="text-[grey]">{new Date(e.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;