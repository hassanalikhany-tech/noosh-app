
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserFeedback, FeedbackCategory } from "../types";

export const FeedbackService = {
  /**
   * Submit feedback from a user
   */
  submitFeedback: async (userId: string, userName: string, mobile: string, category: FeedbackCategory, message: string, imageUrl?: string) => {
    const feedback: Omit<UserFeedback, 'id'> = {
      user_id: userId,
      user_name: userName,
      user_mobile: mobile,
      category,
      message,
      image_url: imageUrl,
      status: 'new',
      created_at: Date.now(),
      device: navigator.userAgent
    };
    const docRef = await addDoc(collection(db, "user_feedback"), feedback);
    return { id: docRef.id, ...feedback };
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
