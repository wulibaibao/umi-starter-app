
export const menuIgnorePath = ['/login', '/sigup', '/~demos/:uuid', '/~docs', '/_demos/:uuid'];

export const ignorePathFilter = (i: any) => !menuIgnorePath.includes(i.path);
export const accessRouteFilter = (i: any) => !i.unaccessible;
export const isHideInMenu = (i: any) => i.hideInMenu !== true;
export const hideUnLayout = (i: any) => !i.layout;

export const filterRouteData = (routes: any) =>
  routes?.filter(ignorePathFilter).filter(hideUnLayout).filter(isHideInMenu).filter(accessRouteFilter);