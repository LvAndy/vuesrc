const getters = {
  isMobile: (state) => state.app.isMobile,
  lang: (state) => state.app.lang,
  theme: (state) => state.app.theme,
  color: (state) => state.app.color,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.name,
  welcome: (state) => state.user.welcome,
  role: (state) => state.user.role,
  userInfo: (state) => state.user.info,
  addRouters: (state) => state.permission.addRouters,
  multiTab: (state) => state.app.multiTab,
  teamName: (state) => state.teamInfo.teamName,
  adminName: (state) => state.teamInfo.adminName,
  projects: (state) => state.teamInfo.projects,
}

export default getters
