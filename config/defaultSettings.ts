import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */


const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: 'rgb(250, 173, 20)',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '后台',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '',
};

export default Settings;