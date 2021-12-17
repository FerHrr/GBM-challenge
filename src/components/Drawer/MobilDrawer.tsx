import {
   AppBar,
   IconButton,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   SwipeableDrawer,
   Toolbar,
   Typography,
 } from "@material-ui/core";
 import { ExitToApp, MenuOutlined, NightsStay } from "@material-ui/icons";
 import React from "react";
//  import { User } from "../../interfaces/auth";
 import { DrawerItem } from "../../interfaces/ui";
//  import { AntSwitch } from "../AntSwitch";
 import { ReactComponent as Logo } from "../../assets/f-letter.svg";
//  import { useStylesMobile } from "./style";
 
 interface Props {
  //  drawerOpen: boolean;
  //  themeMode: string;
  //  menuData: DrawerItem[];
  //  selected: string;
  //  user: User | null;
  //  handleDrawerOpen: () => void;
  //  handleDrawerClose: () => void;
  //  handleSelectRoute: (item: DrawerItem) => void;
  //  handleSignOut: () => Promise<void>;
  //  handleChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //  isLanding: boolean
 }
 
 const MobileDrawer: React.FC<Props> = ({
  //  drawerOpen,
  //  menuData,
  //  selected,
  //  themeMode,
  //  user,
  //  handleChangeMode,
  //  handleSelectRoute,
  //  handleSignOut,
  //  handleDrawerOpen,
  //  handleDrawerClose,
  //  isLanding,
 }) => {
  //  const classes = useStylesMobile();
   return (
     <div 
    //  hidden={isLanding}
     >
       {/* <AppBar className={classes.appbar} position="fixed">
         <Toolbar>
           <IconButton
             color="inherit"
             aria-label="open drawer"
             onClick={handleDrawerOpen}
             edge="start"
           >
             <MenuOutlined />
           </IconButton>
           <Logo className={classes.fridaLogo} />
           <Typography variant="h6">rida Admin</Typography>
         </Toolbar>
       </AppBar>
       <SwipeableDrawer
         anchor="left"
         open={drawerOpen}
         onClose={handleDrawerClose}
         onOpen={handleDrawerOpen}
       >
         <List className={classes.swipeDrawer}>
           {menuData.map(
             (item) =>
               !item.hidden && (
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
               )
           )}
           {user && (
             <ListItem
               button
               key={11}
               onClick={handleSignOut}
               className={classes.listItem}
             >
               <ListItemIcon className={classes.itemIcon}>
                 <ExitToApp className={classes.icon} />
               </ListItemIcon>
               <ListItemText
                 primaryTypographyProps={{ style: { fontSize: "14px" } }}
                 primary={"Sign Out"}
               />
             </ListItem>
           )}
           <ListItem key={10} className={classes.switchContainer}>
             <ListItemIcon style={{ marginLeft: "3px" }}>
               <AntSwitch
                 checked={themeMode === "dark"}
                 onChange={handleChangeMode}
               />
             </ListItemIcon>
             <ListItemText>
               <NightsStay className={classes.icon} />
             </ListItemText>
           </ListItem>
         </List>
       </SwipeableDrawer> */}
     </div>
   );
 };
 
 export default MobileDrawer;
 