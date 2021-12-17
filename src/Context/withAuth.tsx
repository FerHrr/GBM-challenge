import React, { useEffect, useState } from "react";

import {
  fb,
  fbAuth,
  fbApp,
  firebaseConfig,
} from "../services/Firebase/firebase";

import { UserProvider } from "../Context/userContext";
import { User } from "../interfaces";
import HomePage from "../pages/Home";
import { getEmailName } from "../utilities";
import { isBlocked } from "../components/Login-Signup/service";
import LoadingComponent from "../components/Loading/Loading";

const dbRef = fbApp.database().ref();

const withAuth = (Component: any) => {
  const WrappedComponent: React.FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const ref = dbRef;

    const getUserData = async (user: User) => {
      const res: User = (
        await ref.child(`/Users/${user.uid}`).once("value")
      ).val();
      if (res) {
        if (res.isBlocked) {
          const obj: User = {
            logged: false,
          };
          setUser(obj);
        } else {
          const obj: User = {
            logged: true,
            displayName: res.displayName,
            email: res.email,
            uid: res.uid,
            isBlocked: false,
            rol: res.rol,
            notificationsRead: false,
          };
          setUser(obj);
        }
      } else {
        let userNm = user.email && getEmailName(user.email?.split("@")[0]);

        const obj: User = {
          logged: true,
          displayName: userNm,
          email: user.email,
          uid: user.uid,
          isBlocked: false,
          rol: "User",
          notificationsRead: false,
        };
        await ref.child(`Users/${user.uid}`).set({
          displayName: userNm,
          email: user.email,
          uid: user.uid,
          isBlocked: false,
          rol: "User",
          notificationsRead: false,
        });
        console.log(`obj:`, obj);
        setUser(obj);
        console.log("No data available");
      }

      // let result: User | undefined = undefined;
      // await get(child(dbRef, `Users/${user.uid}`))
      //   .then((snapshot) => {
      //     if (snapshot.exists()) {
      //       let result = snapshot.val() as User;
      //       const obj: User = {
      //         logged: true,
      //         displayName: result.displayName!,
      //         email: result.email!,
      //         uid: result.uid!,
      //         isBlocked: false,
      //         rol: result.rol!,
      //         notificationsRead: false,
      //       };
      //       console.log(`obj:`, obj);
      //       setUser(obj);
      //     } else {
      //       console.log("No data available");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    };

    useEffect(() => {
      fb.auth().onAuthStateChanged(async (user) => {
        console.log(`onAuthStateChanged user:`, user);
        if (user != undefined) {
          if (user.emailVerified) {
            let usr = getUserData(user) as User;

            console.log(`usr:`, usr);
          } else {
            setUser({
              logged: false,
            });
          }
        } else {
          setUser({
            logged: false,
          });
        }
      });
    }, [dbRef]);

    if (user == undefined) {
      return (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingComponent
            color={"success"}
            size={100}
            label={"Cargando..."}
          />
        </div>
      );
    } else if (user.logged) {
      return (
        <UserProvider user={user} update={setUser}>
          <Component />
        </UserProvider>
      );
    } else {
      return <Component />;
    }
  };
  return WrappedComponent;
};

export default withAuth;
