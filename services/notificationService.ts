
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { Notification, NotificationLog } from "../types";

export const NotificationService = {
  /**
   * Create a new notification for a target group
   */
  createNotification: async (title: string, message: string, targetGroup: 'all' | 'active' | 'visitors', adminId: string) => {
    const notification: Omit<Notification, 'id'> = {
      title,
      message,
      target_group: targetGroup,
      send_time: Date.now(),
      status: 'sent',
      created_by: adminId
    };
    const docRef = await addDoc(collection(db, "notifications"), notification);
    return { id: docRef.id, ...notification };
  },

  /**
   * Get all notifications for admin
   */
  getAllNotifications: async (): Promise<Notification[]> => {
    const q = query(collection(db, "notifications"), orderBy("send_time", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Notification));
  },

  /**
   * Get unread notifications for a user based on their role and activity
   */
  getUserNotifications: async (userId: string, role: string, isActive: boolean): Promise<Notification[]> => {
    // 1. Get all notifications relevant to the user
    const q = query(collection(db, "notifications"), orderBy("send_time", "desc"));
    const snap = await getDocs(q);
    const allNotifs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Notification));

    // 2. Filter by target group
    const filtered = allNotifs.filter(n => {
      if (n.target_group === 'all') return true;
      if (n.target_group === 'active' && isActive) return true;
      if (n.target_group === 'visitors' && role === 'visitor') return true;
      return false;
    });

    // 3. (Optional) Filter by read status from notification_logs if needed
    // For simplicity in this in-app push, we just show the most recent ones.
    return filtered;
  },

  /**
   * Log that a notification was delivered/seen
   */
  logDelivery: async (userId: string, notificationId: string) => {
    await addDoc(collection(db, "notification_logs"), {
      user_id: userId,
      notification_id: notificationId,
      delivered: true,
      clicked: false,
      timestamp: Date.now()
    });
  }
};
