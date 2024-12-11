
export const menuIgnorePath = ['/', '/*', ''];

export const ignorePathFilter = (i: any) => !menuIgnorePath.includes(i.path);
export const accessRouteFilter = (i: any) => !i.unaccessible;
export const isHideInMenu = (i: any) => i.hideInMenu !== true;
export const hideUnLayout = (i: any) => !('layout' in i);
export const isLayoutFilter = (i: any) => !i.isLayout

export const filterRouteData = (routes: any) =>
  routes?.filter(isLayoutFilter).filter(ignorePathFilter).filter(hideUnLayout).filter(isHideInMenu).filter(accessRouteFilter);

export const filterRoutes = (routes: any) => Object.entries(routes)
    .map((ctx: any) => ctx.at(1))
    .filter(isLayoutFilter)
    .filter(isHideInMenu)
    .filter(hideUnLayout)
    .filter(ignorePathFilter)
    .filter(accessRouteFilter)
    .filter((ctx: any) => !ctx.path.startsWith('/sys'));