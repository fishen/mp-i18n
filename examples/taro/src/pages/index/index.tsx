import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { i18n } from 'mp-i18n';

@i18n({ isPage: true })
export default class Index extends Component<any, any> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  // componentDidMount() {
  //   const { hello, world, welcome } = this.state.$t;
  //   const hint = i18n.format(welcome, { hello, world });
  //   this.setState({ hint });
  //   console.log('decorate class', hint);
  // }

  // @i18n()
  // componentWillMount() {
  //   const { hello, world, welcome } = this.state.$t;
  //   const hint = i18n.format(welcome, { hello, world });
  //   this.setState({ hint });
  //   console.log('decorate method', hint);
  // }

  // componentDidMount() {
  //   i18n.load(this)
  //     .then(texts => {
  //       const { hello, world, welcome } = texts;
  //       const hint = i18n.format(welcome, { hello, world });
  //       this.setState({ hint });
  //     })
  //     .catch(console.error);
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { $t, hint } = this.state;
    return (
      <View className='index'>
        <View>1.{hint}</View>
        <View>2.{$t.hello}，{$t.world}。</View>
      </View>
    )
  }
}
