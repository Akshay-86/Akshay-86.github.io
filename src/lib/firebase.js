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
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "myportfolio-os.firebaseapp.com",
  projectId: "myportfolio-os",
  storageBucket: "myportfolio-os.firebasestorage.app",
  messagingSenderId: "863862721892",
  appId: "1:863862721892:web:123d9819abcb0ab289fe71",
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
    const docRef = await addDoc(collection(db, "projects"), {
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
    return docRef.id;
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
    const snap = await getDoc(doc(db, "config", ADMIN_DOC));
    if (snap.exists()) {
      return snap.data().passwordHash || null;
    }
    return null;
  } catch (e) {
    console.error("Firebase getAdminHash error:", e);
    return null;
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
