/* eslint-disable @typescript-eslint/no-unused-expressions */

import { User } from "../../interfaces";
import { fbAuth, fbApp, fb } from "../../services/Firebase/firebase";
import { MessagesError } from "./interface";

const dbRef = fbApp.database().ref();

const login = async (
  username: string,
  pass: string,
  opportunities: number
): Promise<MessagesError> => {
  let count: number = opportunities;
  let mess = {
    message: "",
    display: false,
    count: 0,
    error: false,
    userBlocked: false,
  };
  let res = await fbAuth
    .signInWithEmailAndPassword(username, pass)
    .then((res) => {
      if (res) {
        if (res.user?.emailVerified) {
          let userBlocked = res.user.email ? isBlocked(res.user.email) : false;
          if (!userBlocked) {
            window.location.href = "/";
            return {
              message: "",
              display: false,
              count: 0,
              error: true,
            };
          } else {
            return {
              message: "La cuenta se encuentra bloqueada",
              display: true,
              count: 0,
              error: false,
              userBlocked: false,
            };
          }
          // return true;
        } else {
          return {
            message: "Por favor verifica tu correo",
            display: true,
            count: 0,
            error: false,
          };
          // return false;
        }
      }
      return {
        message: "El correo no se encuentra registrado",
        display: true,
        count: 0,
        error: true,
      };
      // return false;
    })
    .catch((e) => {
      count++;
      if (
        e.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        return {
          message: "El correo no se encuentra registrado",
          display: true,
          count: 0,
          error: true,
        };
      } else {
        return {
          message: "",
          display: false,
          count: count,
          error: true,
        };
      }
    });
  // console.log(`res:`, res);
  // debugger;
  return res;
  // return count;
};

const blockedUser = async (mail: string) => {
  console.log(`**blockedUser**`);
  console.log(`mail:`, mail);
  let uidS: string | null | undefined = "";
  await dbRef
    .child(`Users`)
    .orderByChild("email")
    .equalTo(mail)
    .once("value")
    .then((res) => {
      let r: User = res.val();
      uidS = Object.values(r)[0].uid;
    })
    .catch((e) => console.log(`error:`, e));
  console.log(`uidS:`, uidS);
  await dbRef.child(`Users/${uidS}/isBlocked`).set(true);
};

const isBlocked = async (mail: string) => {
  let isBlockedV: boolean | null | undefined = false;
  let res = (
    await dbRef.child(`Users`).orderByChild("email").equalTo(mail).once("value")
  ).val();
  console.log(`res:`, res);

  // dbRef
  //   .child(`Users`)
  //   .orderByChild("email")
  //   .equalTo(mail)
  //   .once("value")
  //   .then((res) => {
  //     debugger;
  //     let r: User = res.val();
  //     console.log(
  //       `Object.values(r)[0].isBlocked:`,
  //       Object.values(r)[0].isBlocked
  //     );

  //     isBlockedV = r ? Object.values(r)[0].isBlocked : false;
  //     debugger;
  //   })
  //   .catch((e) => console.log(`error:`, e));
  console.log(`isBlocked:`, isBlockedV);
  return isBlockedV;
};
const isUser = async () => {
  let user: boolean | null | undefined = false;
  fb.auth().onAuthStateChanged(async (usr) => {
    console.log(`usr:`, usr);
    debugger;
    if (usr) {
      user = true;
    } else {
      user = false;
    }
  });
  console.log(`usuario:`, user ? "existe" : "no existe");
  return user;
};

const doSignUp = async (email: string, password: string) => {
  const res = await fbApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      fbApp.auth().signOut();
      res.user?.sendEmailVerification();
      const status = {
        status: undefined,
        message:
          "Se ha enviado un correo electrónico de verificación, verifique su correo electrónico",
      };
      return status;
    })
    .catch((error) => {
      const status = {
        status: "error",
        message: error.message,
      };
      return status;
    });
  return res;
};

export { login, blockedUser, isBlocked, doSignUp, isUser };
