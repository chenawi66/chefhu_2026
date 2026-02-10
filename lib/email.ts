import nodemailer from 'nodemailer';

export async function sendEmailNotification(reservationDetails: any) {
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        console.log("⚠️ Email 設定未完成，僅顯示於終端機");
        console.log("若要啟用真實郵件發送，請在 .env.local 設定 GMAIL_USER 和 GMAIL_APP_PASSWORD");
        console.log("----------------------------------------");
        console.log("📧 模擬發送郵件給:", "chenawi66@gmail.com");
        console.log("主旨: 🔔 新的乙級學徒練工坊預約！");
        console.log("內容:", JSON.stringify(reservationDetails, null, 2));
        console.log("----------------------------------------");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: GMAIL_USER,
        to: 'chenawi66@gmail.com', // 寄給您的信箱
        subject: '🔔 新的乙級學徒練工坊預約！ - 待確認',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #22c55e;">🍽️ 新的預約請求</h2>
        <p>有人剛剛填寫了預約表單，請確認以下資訊：</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>👤 姓名：</strong> ${reservationDetails.name}</p>
        <p><strong>📞 電話：</strong> ${reservationDetails.phone}</p>
        <p><strong>🤝 其他三位：</strong> ${reservationDetails.relationship}</p>
        <p><strong>📅 日期：</strong> ${reservationDetails.date}</p>
        <p><strong>⏰ 時間：</strong> ${reservationDetails.time}</p>
        <p><strong>👥 人數：</strong> ${reservationDetails.guests} 人 (固定)</p>
        <p><strong>💰 總收費：</strong> ${reservationDetails.guests * 380} 元 (食材費每人 380 元)</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">此郵件由乙級學徒練工坊系統自動發送。</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
}
