import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function POST(request) {

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });


console.log("USER SESSION =", userSession);

const user = userSession?.user;

console.log("USER =", user);

if (!userSession) {
    return Response.redirect(
      new URL("/login", request.url),
      302
    );
  }


    const formData = await request.formData();
    const price = formData.get('price')
    const title = formData.get('title')
    const productId = formData.get('productId')
    const writerEmail = formData.get("writerEmail");
   
     const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${userSession.session.token}`,
            
        },
        body: JSON.stringify({ 
        bookId: productId,
        userEmail:user.email,
          amount: price,
        
            writerEmail:writerEmail
        }),
      });
      const data = await res.json();
    
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
                name: title,
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user.id,
        userEmail: user.email,
          writerEmail: writerEmail, 
        title,
        productId,
       
      },
      mode: "payment",
      success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}





