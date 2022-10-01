import firebaseApp from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";

export default function SignedIn() {
  const [user, loading, error] = useAuthState(firebaseApp.auth());
  console.log(user, "|", loading, "|", error);
  const db = firebaseApp.firestore();
  const [tasks, taskloading, taskerror] = useCollection(firebaseApp.firestore().collection("tasks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  console.log(tasks, "|", taskloading, "|", taskerror);
  return (
    <>
      {tasks?.docs?.map((doc) => {
        const Accept = async () => {
          const id = doc.id;
          const userid = user.id;
          await db.collection("tasks").doc(db, "tasks", id).update({ status: "accepted", user: userid });
        };
        return (
          <div key={doc.id}>
            {console.log(doc.data())}
            <p>{doc.data().videolink}</p>
            <p>{doc.data().phone}</p>
            <button onClick={Accept}>Accept</button>
            {/*<p>{doc.data().location}</p>*/}
          </div>
        );
      })}
    </>
  );
}
