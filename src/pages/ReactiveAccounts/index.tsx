import React, { useState, useEffect } from "react";
import { User } from "../../interfaces";
import { getBlockedUsers, sendEmailToReactiveAccnt } from "./services";
import ReactiveAccountsView from "./view";
import { GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Roles, Rowss } from "./interfaces";

interface Props {}
const ReactiveAccountsPage: React.FC<Props> = ({}) => {
  const [allUsers, setAllUsers] = useState<User[]>();
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [rows, setRows] = useState<Rowss[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    refreshBlickedUsers();
  }, []);

  const refreshBlickedUsers = () => {
    getBlockedUsers().then((arrUsrs) => {
      if (arrUsrs && arrUsrs?.length > 0) {
        setAllUsers(arrUsrs);
      } else setAllUsers([]);
    });
  };

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

  const handleSelectUser = (rowId: number | null) => {
    if (rowId !== null) {
      if (allUsers) {
        setUserSelected(allUsers[rowId]);
        handleOpenModal();
      }
    } else {
      setUserSelected(null);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleReactiveAccount = () => {
    if (userSelected?.email && userSelected?.uid) {
      sendEmailToReactiveAccnt(userSelected?.email, userSelected?.uid);
      refreshBlickedUsers();
    }
  };

  const columns: GridColDef[] = [
    { field: "Nombre", headerName: "Nombre", width: 230 },
    { field: "Correo", headerName: "Correo", width: 230 },
    { field: "Rol", headerName: "Rol", width: 130 },
    {
      field: "action",
      headerName: "Activar Cuenta",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          handleSelectUser(Number(params.id));
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
        };
        return <Button onClick={onClick}>Click</Button>;
      },
      width: 130,
      align: "center",
    },
  ];

  return (
    <div>
      <ReactiveAccountsView
        userSelected={userSelected}
        columns={columns}
        rows={rows}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleReactiveAccount={handleReactiveAccount}
      />
    </div>
  );
};

export default ReactiveAccountsPage;
