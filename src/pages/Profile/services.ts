import { User } from "../../interfaces";
import {
  fb,
  fbAuth,
  fbApp,
  firebaseConfig,
} from "../../services/Firebase/firebase";

const dbRef = fbApp.database().ref();

export const getBlockedUsers = async () => {
  let arrayUsers: User[] = [];
  let dataDB = await dbRef
    .child("Users")
    .orderByChild("isBlocked")
    .equalTo(true)
    .once("value");
  console.log(`dataDB:`, dataDB.val());

  if (dataDB.val()) {
    if (Object.values(dataDB.val()).length > 0)
      Object.values(dataDB.val()).forEach((val) => {
        arrayUsers.push(val as User);
      });
    else arrayUsers = [];
    return arrayUsers;
  }
};

export const updateName = async (newName: string, uid: string) => {
  await dbRef.child(`Users/${uid}/displayName`).set(newName);
};
