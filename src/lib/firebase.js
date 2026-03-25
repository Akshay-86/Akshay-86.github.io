"use client";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocFromServer,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── Projects CRUD ──

export async function fetchProjects() {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("Firebase fetchProjects error:", e);
    return [];
  }
}

export async function addProject(project) {
  try {
    // Sanitize project name for Firestore document ID (slashes are not allowed in IDs)
    const docId = project.name.replace(/\//g, "-");
    await setDoc(doc(db, "projects", docId), {
      name: project.name,
      description: project.description || "",
      language: project.language || "Unknown",
      stargazers_count: parseInt(project.stars) || 0,
      html_url: project.url || "",
      startTime: project.startTime || "",
      endTime: project.endTime || "Ongoing",
      localTag: project.tag || "local",
      isLocal: true,
      private: false,
      createdAt: new Date().toISOString(),
    });
    return docId;
  } catch (e) {
    console.error("Firebase addProject error:", e);
    throw e;
  }
}

export async function updateProject(docId, updates) {
  try {
    await updateDoc(doc(db, "projects", docId), updates);
  } catch (e) {
    console.error("Firebase updateProject error:", e);
    throw e;
  }
}

export async function deleteProject(docId) {
  try {
    await deleteDoc(doc(db, "projects", docId));
  } catch (e) {
    console.error("Firebase deleteProject error:", e);
    throw e;
  }
}

// ── Admin Password Hash ──

const ADMIN_DOC = "admin-config";

export async function getAdminHash() {
  try {
    const snap = await getDocFromServer(doc(db, "config", ADMIN_DOC));
    if (snap.exists()) {
      return snap.data().passwordHash || null;
    }
    return null;
  } catch (e) {
    console.error("Firebase getAdminHash error:", e);
    throw new Error("Failed to reach database. You may be offline.");
  }
}

export async function setAdminHash(hash) {
  try {
    await setDoc(doc(db, "config", ADMIN_DOC), { passwordHash: hash }, { merge: true });
  } catch (e) {
    console.error("Firebase setAdminHash error:", e);
    throw e;
  }
}
