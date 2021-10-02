import { db } from './firebase';
import {
    collection,
    getDocs,
    query,
    setDoc,
    doc,
    where,
    addDoc,
} from './firebase';

export interface DbUser {
    name: string;
    userId: string;
    email: string;
    github: string;
    branch: string;
    rollNo: number;
    about: string;
}

export interface DbContribution {
    link: string;
    org: string;
    date: string;
    filedAt: string;
    github: string;
    userId: string;
    verified: boolean | null;
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
    about,
}: DbUser) {
    await setDoc(
        doc(db, 'users', userId),
        { name, userId, email, github, branch, rollNo, about },
        { merge: true }
    );
}

export async function addContributionToDatabase({
    link,
    org,
    date,
    github,
    userId,
}: {
    link: string;
    org: string;
    date: string;
    userId: string;
    github: string;
}): Promise<void> {
    await addDoc(collection(db, 'contributions'), {
        link,
        org,
        date: date,
        github,
        userId,
        verified: false,
        filedAt: new Date().toString(),
    });
}

export async function getMySubmissions(
    userId: string
): Promise<DbContribution[]> {
    const refCollection = collection(db, 'contributions');
    const q = query(refCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    var submissions: DbContribution[] = [];
    querySnapshot.docs.forEach((el) => {
        console.log(el.data());

        submissions.push(el.data() as DbContribution);
    });
    return submissions;
}
