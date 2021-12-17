import React, { useEffect, useState } from "react";
import { User } from "../../interfaces";
import { Roles, Rowss } from "../ReactiveAccounts/interfaces";
import { changeRol, getUsers } from "./services";
import AccountAccessView from "./view";
import { FormControl, MenuItem, Select } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
interface Props {}
const RoleAccessPage: React.FC<Props> = ({}) => {
  const [allUsers, setAllUsers] = useState<User[]>();
  const [UsersRoles, setUsersRoles] = useState<Roles[]>([]);
  const [copyUsersRoles, setCopyUsersRoles] = useState<Roles[]>([]);
  const [existDiference, setExistDiference] = useState<boolean>(false);
  const [rows, setRows] = useState<Rowss[]>([]);
  const ROLES = ["Owner", "Administrator", "User"];
  const refreshBlockedUsers = () => {
    getUsers().then((arrUsrs) => {
      if (arrUsrs && arrUsrs?.length > 0) {
        setAllUsers(arrUsrs);
        let tmpArr: Roles[] = [];
        arrUsrs.forEach((rl: User) => {
          tmpArr.push(rl.rol as Roles);
        });
        setCopyUsersRoles(tmpArr);
        setUsersRoles(tmpArr);
      } else {
        setAllUsers([]);
        setCopyUsersRoles([]);
      }
    });
  };

  useEffect(() => {
    refreshBlockedUsers();
  }, []);

  useEffect(() => {
    if (allUsers && allUsers?.length > 0) {
      let tmpArrayUsers: Rowss[] = [];
      allUsers.forEach((usr, indx) => {
        tmpArrayUsers.push({
          id: indx,
          Nombre: usr.displayName,
          Correo: usr.email,
          Rol: usr.rol as Roles,
        });
      });
      if (tmpArrayUsers.length > 0) {
        setRows(tmpArrayUsers);
      } else setRows([]);
    } else setRows([]);
  }, [allUsers]);

  useEffect(() => {
    if (JSON.stringify(UsersRoles) === JSON.stringify(copyUsersRoles)) {
      setExistDiference(false);
    } else setExistDiference(true);
  }, [UsersRoles, copyUsersRoles]);

  const handleSaveChanges = () => {
    if (allUsers) {
      let copyTmpAllUsers: User[] = [...allUsers];
      let newUsersData: User = {};
      copyUsersRoles.forEach((val, indx) => {
        if (allUsers) {
          newUsersData = {
            ...newUsersData,
            [String(allUsers[indx].uid)]: {
              displayName: allUsers[indx].displayName,
              email: allUsers[indx].email,
              isBlocked: allUsers[indx].isBlocked,
              notificationsRead: allUsers[indx].notificationsRead,
              rol: val,
              uid: allUsers[indx].uid,
            },
          };
        }
        copyTmpAllUsers[indx].rol = val as
          | "Owner"
          | "Administrator"
          | "User"
          | null
          | undefined;
      });
      changeRol(newUsersData);
      refreshBlockedUsers();
    }
  };

  const columns: GridColDef[] = [
    { field: "Nombre", headerName: "Nombre", width: 230 },
    { field: "Correo", headerName: "Correo", width: 230 },
    { field: "Rol", headerName: "Rol", width: 130 },
    {
      field: "action",
      headerName: "Nuevo Rol",

      sortable: false,
      renderCell: (params) => {
        return (
          allUsers && (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                style={{ width: "150px" }}
                defaultValue={allUsers[Number(params.id)].rol}
                onChange={(e) => {
                  let tmpRoles = [...UsersRoles];
                  tmpRoles[Number(params.id)] = e.target.value as Roles;
                  setCopyUsersRoles(tmpRoles);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {ROLES.map((rol) => (
                  <MenuItem value={rol}>{rol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        );
      },
      width: 180,
      align: "center",
    },
  ];

  return (
    <div>
      <AccountAccessView
        rows={rows}
        columns={columns}
        existDiference={existDiference}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default RoleAccessPage;
