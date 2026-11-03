export const sendBrevoEmail = async ({ to, subject, text }) => {
    if (!process.env.BREVO_API_KEY || !process.env.SENDER_EMAIL) {
        throw new Error("Brevo email configuration is missing");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sender: {
                name: "FoodBite",
                email: process.env.SENDER_EMAIL
            },
            to: [{ email: to }],
            subject,
            textContent: text
        })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result.message || `Brevo failed with status ${response.status}`);
    }

    return result;
};