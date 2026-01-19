"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoginSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const MAX_SESSIONS = 1; // <<-- مهم: فقط یک دستگاه همزمان مجاز است
exports.handleLoginSession = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "برای انجام این عملیات باید وارد حساب کاربری خود شوید.");
    }
    const { sessionId, deviceInfo } = data;
    const userId = context.auth.uid;
    const userRef = db.collection("users").doc(userId);
    try {
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError("not-found", "پروفایل کاربر یافت نشد.");
        }
        const userData = userDoc.data();
        let activeSessions = userData.activeSessions || [];
        // حذف نشست‌های قدیمی‌تر تا جا برای نشست جدید باز شود
        while (activeSessions.length >= MAX_SESSIONS) {
            activeSessions.sort((a, b) => a.loggedInAt - b.loggedInAt);
            activeSessions.shift(); // حذف قدیمی‌ترین نشست
        }
        // اضافه کردن نشست جدید
        activeSessions.push({
            sessionId,
            loggedInAt: Date.now(),
            deviceInfo: deviceInfo || "Unknown Device",
        });
        // به‌روزرسانی پروفایل کاربر در دیتابیس
        await userRef.update({ activeSessions });
        return { success: true, message: "نشست با موفقیت مدیریت شد." };
    }
    catch (error) {
        console.error("Error in handleLoginSession:", error);
        throw new functions.https.HttpsError("internal", "خطایی در سرور هنگام مدیریت نشست رخ داد.", error.message);
    }
});
//# sourceMappingURL=index.js.map