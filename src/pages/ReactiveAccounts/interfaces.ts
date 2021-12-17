// export interface Column {
//   id: "name" | "code" | "population" | "size" | "density";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

export interface Rowss {
  id: number;
  Nombre?: string | null;
  Correo?: string | null;
  Rol?: Roles | undefined;
}

export interface Roles {
  Rol?: "Owner" | "Administrator" | "User" | null | undefined;
}
