import { db } from './firebase';
import { collection, getDocs, query, setDoc, doc, where } from './firebase';

export interface DbUser {
    name: string;
    userId: string;
    email: string;
    github: string;
    branch: string;
    rollNo: number;
}

export const getItemsinCollection = async (ref: string) => {
    const refCollection = collection(db, ref);
    const snapshots = await getDocs(refCollection);
    return snapshots.docs.map((doc) => doc.data());
};

export const searchCurrentUserInDatabase = async (
    userId: string
): Promise<DbUser | null> => {
    const refCollection = collection(db, 'users');
    const q = query(refCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size >= 1
        ? (querySnapshot.docs.at(0)?.data() as DbUser)
        : null;
};

export async function addUser({
    name,
    userId,
    email,
    github,
    branch,
    rollNo,
}: DbUser) {
    await setDoc(
        doc(db, 'users', userId),
        { name, userId, email, github, branch, rollNo },
        { merge: false }
    );
}
