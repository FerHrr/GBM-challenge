import React from "react";
import { useStyles, useStylesTooltip } from "./style";
import {
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  Tooltip,
  ListItemText,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import clsx from "clsx";
import { DrawerItem } from "../../interfaces/ui";
import { logout } from "../../services/Firebase";

interface Props {
  drawerOpen: boolean;
  menuData: DrawerItem[];
  selected: string;
  handleSelectRoute: (item: DrawerItem) => void;
  isLanding: boolean;
}

const DesktopDrawer: React.FC<Props> = ({
  drawerOpen,
  menuData,
  selected,
  handleSelectRoute,
  isLanding,
}) => {
  const classes = useStyles();
  const classesTooltip = useStylesTooltip();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={drawerOpen}
      hidden={isLanding}
      className={clsx(classes.drawer, {
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
      color="primary"
    >
      <List>
        <ListItem key={"imgIcon"} style={{ height: "60px" }}>
          <ListItemText
            primaryTypographyProps={{ style: { fontSize: "14px" } }}
          />
        </ListItem>
        {menuData.map(
          (item) =>
            item.hidden &&
            (drawerOpen ? (
              <ListItem
                onClick={() => handleSelectRoute(item)}
                button
                selected={selected === item.path}
                key={item.key}
                className={classes.listItem}
              >
                <ListItemIcon className={classes.itemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ style: { fontSize: "14px" } }}
                  primary={item.title}
                />
              </ListItem>
            ) : (
              <Tooltip
                title={item.title ? item.title : ""}
                classes={classesTooltip}
                arrow
                key={item.key}
                placement="right"
              >
                <ListItem
                  onClick={() => handleSelectRoute(item)}
                  button
                  className={classes.listItem}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: { fontSize: "14px" } }}
                    primary={item.title}
                  />
                </ListItem>
              </Tooltip>
            ))
        )}
        {!drawerOpen ? (
          <>
            <Tooltip
              title={"Salir"}
              classes={classesTooltip}
              arrow
              key={11}
              placement="right"
            >
              <ListItem
                button
                className={classes.listItem}
                onClick={() => logout()}
              >
                <ListItemIcon>
                  <ExitToApp className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ style: { fontSize: "14px" } }}
                  primary={"Salir"}
                />
              </ListItem>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
      </List>
    </Drawer>
  );
};

export default DesktopDrawer;
