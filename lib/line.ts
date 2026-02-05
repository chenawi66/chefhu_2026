
export async function sendLineNotification(message: string) {
    const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN; // User needs to set this

    if (!LINE_ACCESS_TOKEN) {
        console.log("Mock Line Notification:", message);
        console.log("To enable real notifications, set LINE_ACCESS_TOKEN in .env.local");
        return;
    }

    try {
        const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                messages: [
                    {
                        type: 'text',
                        text: message,
                    },
                ],
            }),
        });

        if (!response.ok) {
            console.error("Failed to send Line notification", await response.text());
        }
    } catch (error) {
        console.error("Error sending Line notification", error);
    }
}
