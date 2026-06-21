// // import { subscription } from '@/lib/action/payment'
// // import { stripe } from '@/lib/stripe'
// // import { redirect } from 'next/navigation'



// // export default async function Success({ searchParams }) {
// //   const { session_id } = await searchParams

// //   if (!session_id)
// //     throw new Error('Please provide a valid session_id (`cs_test_...`)')

// //   const {
// //     status,
// //     metadata,
// //     customer_details: { email: customerEmail }
// //   } = await stripe.checkout.sessions.retrieve(session_id, {
// //     expand: ['line_items', 'payment_intent']
// //   })

// //   if (status === 'open') {
// //     return redirect('/')
// //   }

// //   if (status === 'complete') {

// //     // api call


// //     return (
// //       <section id="success">
// //         <p>
// //           We appreciate your business! A confirmation email will be sent to{' '}
// //           {customerEmail}. If you have any questions, please email{' '}
// //           <a href="mailto:orders@example.com">orders@example.com</a>.
// //         </p>
// //       </section>
// //     )
// //   }
// // }





// import { stripe } from "@/lib/stripe";
// import { redirect } from "next/navigation";

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams;

//   if (!session_id) {
//     throw new Error("Please provide a valid session_id");
//   }

//   const session = await stripe.checkout.sessions.retrieve(
//     session_id,
//     {
//       expand: ["line_items", "payment_intent"],
//     }
//   );

//   if (session.status === "open") {
//     return redirect("/");
//   }

//   if (session.status === "complete") {

//     await fetch("http://localhost:5000/purchase", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userEmail: session.customer_details?.email,
//         writerEmail: session.metadata?.writerEmail,
//         amount: session.amount_total / 100,
//       }),
//     });

//     return (
//       <section className="p-10">
//         <h1 className="text-3xl font-bold text-green-600">
//           Payment Successful
//         </h1>

//         <p>
//           Payment completed successfully.
//         </p>
//       </section>
//     );
//   }
// }



"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl border border-slate-100 rounded-3xl p-10 max-w-md w-full text-center"
      >

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800">
          Payment Successful 
        </h1>

        <p className="text-slate-500 mt-2 text-sm">
          Thank you for your purchase. Your ebook is now available in your library.
        </p>

        {/* Info Box */}
        <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-600">
          You will receive a confirmation email shortly.  
          If you face any issue, contact support.
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">

          <Link
            href="/ebooks"
            className="block w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Continue Reading
          </Link>

          <Link
            href="/dashboard"
            className="block w-full border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            Go to Dashboard
          </Link>

        </div>

        {/* Footer text */}
        <p className="text-xs text-slate-400 mt-6">
          Transaction completed securely via Stripe
        </p>

      </motion.div>
    </div>
  );
}