// Paystack sends the user back to this page after paying.
// We ask Django to confirm the payment (Django also emails the receipt),
// then empty the cart.

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../api/orders";

function PaymentCallback({ setCartItems }) {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const reference = params.get("reference"); // Paystack adds ?reference=... to the URL

  // ask Django to verify this payment
  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify", reference],
    queryFn: () => verifyPayment(reference),
    enabled: !!reference,
    retry: false,
  });

  // when payment is confirmed: empty the cart and refresh order history
  useEffect(() => {
    if (data?.status === "success") {
      setCartItems([]);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  }, [data]);

  const box =
    "font-montserrat flex flex-col items-center justify-center gap-4 h-[100vh] text-center p-6";

  if (!reference) return <p className={box}>No payment reference found.</p>;
  if (isLoading) return <p className={box}>Confirming your payment...</p>;

  if (isError)
    return (
      <div className={box}>
        <p>We couldn't confirm your payment.</p>
        <p className="text-[12px] text-[grey]">Reference: {reference}</p>
        <Link to="/cart" className="underline">
          Back to cart
        </Link>
      </div>
    );

  return (
    <div className={box}>
      <h2 className="font-bold text-2xl">Payment successful</h2>
      <p className="text-[12px] text-[grey]">
        We've emailed your receipt. If you can't see it, check your spam folder.
      </p>
      <Link to="/account" className="bg-[black] text-white rounded-full px-6 py-2 text-[13px]">
        View my orders
      </Link>
    </div>
  );
}

export default PaymentCallback;