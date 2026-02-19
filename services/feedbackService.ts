
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserFeedback, FeedbackCategory } from "../types";

export const FeedbackService = {
  /**
   * Submit feedback using the same simple logic as notifications
   */
  submitFeedback: async (userId: string, userName: string, mobile: string, category: FeedbackCategory, message: string, imageUrl?: string) => {
    // Sanitize data to prevent Firebase errors (No undefined values allowed)
    const feedbackData = {
      user_id: String(userId || "unknown"),
      user_name: String(userName || "کاربر نوش"),
      user_mobile: String(mobile || "بدون شماره"),
      category: String(category || "suggestion"),
      message: String(message || ""),
      image_url: String(imageUrl || ""),
      status: 'new',
      created_at: Date.now(),
      device: String(navigator.userAgent || "Web Browser")
    };

    const docRef = await addDoc(collection(db, "user_feedback"), feedbackData);
    return { id: docRef.id, ...feedbackData };
  },

  /**
   * Get all feedback for admin
   */
  getAllFeedback: async (): Promise<UserFeedback[]> => {
    const q = query(collection(db, "user_feedback"), orderBy("created_at", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as UserFeedback));
  },

  /**
   * Mark feedback as reviewed
   */
  markAsReviewed: async (feedbackId: string) => {
    const ref = doc(db, "user_feedback", feedbackId);
    await updateDoc(ref, { status: 'reviewed' });
  }
};
