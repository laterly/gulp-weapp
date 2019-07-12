
function setSystemInfo() {
  let res = wx.getSystemInfoSync()
  let systemInfo = {};
  Object.assign(systemInfo,res);
  //自定义导航栏的信息
  systemInfo.statusBar = res.statusBarHeight;
  let custom = wx.getMenuButtonBoundingClientRect();
  systemInfo.custom = custom;
  systemInfo.customBar = custom.bottom + custom.top - res.statusBarHeight;
  return systemInfo;
}
export default setSystemInfo;
