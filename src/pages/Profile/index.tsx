import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { updateName } from "./services";
import Profileview from "./view";
interface Props {}
const ProfilePage: React.FC<Props> = ({}) => {
  const { user, update } = useContext(UserContext);

  const [userName, setUserName] = useState<string>(
    user ? String(user.displayName) : ""
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const MENSAJE_CONFIRMAR_ENTER = "Para confirmar los cambios presiona Enrer";

  useEffect(() => {
    if (user && userName === user.displayName) setShowMessage(true);
    else setShowMessage(false);
  }, [user, userName]);
  const handleUpdateName = async () => {
    if (userName === "") {
      setUserName(String(user.displayName));
    } else {
      await updateName(userName, String(user.uid));
      update({ ...user, displayName: userName });
    }
  };
  const handleTypingNewName = (name: string) => {
    if (user) {
      setUserName(name);
    }
  };

  return (
    <div>
      <Profileview
        userName={userName}
        showMessage={showMessage}
        MENSAJE_CONFIRMAR_ENTER={MENSAJE_CONFIRMAR_ENTER}
        email={String(user.email)}
        rol={String(user.rol)}
        handleUpdateName={handleUpdateName}
        handleTypingNewName={handleTypingNewName}
      />
    </div>
  );
};

export default ProfilePage;
