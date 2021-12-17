import { User } from "../../interfaces";
import {
  fb,
  fbAuth,
  fbApp,
  firebaseConfig,
} from "../../services/Firebase/firebase";

const dbRef = fbApp.database().ref();

export const getUsers = async () => {
  let arrayUsers: User[] = [];
  let dataDB = await dbRef.child("Users").once("value");
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

export const changeRol = async (allUsers: User) => {
  await dbRef.child(`Users/`).set(allUsers);
  //   let res = await fb.auth().sendPasswordResetEmail(mail);
  //   console.log(`sendEmailToReactiveAccnt res:`, res);
};
