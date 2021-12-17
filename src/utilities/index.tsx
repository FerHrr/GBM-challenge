const getEmailName = (val: string): string => {
  let resAvatar = "";
  const mail = val;
  const name = mail?.split("@")[0] as string;
  resAvatar = name;
  const initials = name.split(".");
  for (var i = 0; i < initials.length; i++) {
    initials[i] = initials[i].charAt(0).toUpperCase() + initials[i].slice(1);
  }
  return initials.join().replaceAll(",", " ");
};

export { getEmailName };
