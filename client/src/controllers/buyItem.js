import getCookie from "./cookieManagement";
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(id, quantity, address) {
    let reqUrl = 'http://localhost:5000/order/getQuantity';
    let reqOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body:JSON.stringify({id:id})
    }
    let result = await fetch(reqUrl, reqOptions);
    let response = await result.json();
    console.log(response);
    if (response.quantity >= quantity) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        let token = getCookie("jwtoken")
        reqUrl = 'http://localhost:5000/order/getDetails';
        reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: id, token: token })
        }
        result = await fetch(reqUrl, reqOptions);
        response = await result.json();

        if (!response) {
            alert("Server error. Are you online?");
            return;
        }
        let amount = response.amount * quantity
        if (amount > 60000)
            amount = 60000
        const options = {
            key: "rzp_test_w06JPcFHTKh036", // Enter the Key ID generated from the Dashboard, SECRET KEY : wgWzA0M3gQnLY9OtLU3mpZAI
            amount: amount * 100,
            currency: 'INR',
            name: "The Bicycle Emporium",
            description: "Test Transaction",
            handler: async function (response) {
                // const data = {
                //     razorpayPaymentId: response.razorpay_payment_id,
                //     razorpayOrderId: response.razorpay_order_id,
                //     razorpaySignature: response.razorpay_signature,
                // };
                alert("Payment successful...")

                reqUrl = 'http://localhost:5000/order/placeOrder';
                reqOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify({ id: id, token: token, quantity: quantity, address: address, paymentID: response.razorpay_payment_id })
                }
                result = await fetch(reqUrl, reqOptions);
                response = await result.json();
                if (response.status === 'success') {
                    alert("Order Placed...");
                }
                else {
                    alert("Oops!!!Something went wrong...");
                }
                // const result = await axios.post("http://localhost:5000/payment/success", data);

                // alert(result.data.msg);
            },
            prefill: {
                name: response.username,
                email: response.email,
                contact: response.contact,
            },
            theme: {
                color: "#61dafb",
            },
            "modal": {
                "ondismiss": function () {
                    alert("Payment failed...")
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    else{
        alert("We are extremely sorry,we don't have that much quantity...please try with less quantity.")
    }
}

export default displayRazorpay;