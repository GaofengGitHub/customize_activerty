import React from 'react';
import loadingbg from './assets/img/loadingbg.jpg';
import activeBg from './assets/img/activeBg.jpg';
import titleImg from './assets/img/titleImg.png';
import {  Toast,NavBar, Icon } from 'antd-mobile';

import './App.css';
import './assets/css/animate.min.css';
import MusicPlay from './components/MuiscPlay';
import ActivityMethod from './components/ActivityMethod';
import ResultModel from './components/ResultModel';
import Lottery from './components/Lottery';
import {getCustomizeInfo} from './utils/Data';
import { store } from '.';
import {downDrawTimes,setDrawTimes} from  './actions/lottery';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,activeBg,
      MusicPlay:{showMusicPlay:true,audioSrc:null,location:null},
      titleImg:{showTitleImg:true,titleImgSrc:titleImg,location:{top:"0.2rem"},titileImgBox:"titileImgBox animated"},
      ActivityMethod:{showActivityMethod:true,activityMethodSrc:null,location:null,activityMethodClass:null},
      Lottery:{
        lotteryIsShow:"1",
        type:null,
        location:null,
        prizeBgUrl:null,
        blueLightUrl:null,
        yellowLightUrl:null,
        rawitemBgUrl:null,
        startBtnImgUrl:null,
        startBtnImgClickedUrl:null,
        rawList:null
      },
      rawRate:null,
      AlreadyIn:{
        showAlreadyIn:true,
        participateNum:""
      },
      LotterOpp:{
        showLotterOpp:true,
        lotterOppTimes:""
      },
      showOrHideResultModel:"",
      awardInfo:null
    };
    this.Lottery=null;
    this.AppBox = "AppBox";
    this.title = "参与活动赢大奖";
    this.audioDom = null;
    this.alreadyInLocation = {bottom:"2.6rem",left:"0rem"};
    this.chanceLocation = {bottom:"1.9rem",left:"0rem"};
  }

  componentWillMount(){
    getCustomizeInfo("9ddb754766e843b8a3674860be68d7b2","1234",(res)=>{
      console.log(`定制化页面数据====${JSON.stringify(res)}`);
      if(res.success){
        this.setState({loading:false});
        if(res.data.template.activityBgUrl!=""){
          this.setState({activeBg:res.data.template.activityBgUrl});
        }
        this.setState({MusicPlay:{showMusicPlay:res.data.template.musicPlayIsShow==1?true:false,audioSrc:res.data.template.audioSrcUrl,location:{left:"0.5rem",top:"0.5rem"}}});
        this.setState({titleImg:{showTitleImg:res.data.template.titleImgIsShow==1?true:false,titleImgSrc:res.data.template.titleImgUrl,titileImgBox:"titileImgBox animated slideInDown",location:{top:"0.2rem"}}});
        this.setState({ActivityMethod:{showActivityMethod:res.data.template.activityMethodIsShow==1?true:false,activityMethodSrc:res.data.template.activityMethodImgUrl,activityMethodClass:"pulseInfi",location:{right:"0.1rem",top:"0.1rem"}}});
        this.setState({
          Lottery:{
            lotteryIsShow:res.data.templateType.lotteryIsShow,
            type:res.data.templateType.type,
            location:{left:"0rem",top:"5.6rem"},
            prizeBgUrl:res.data.templateType.prizeBgUrl,
            blueLightUrl:res.data.templateType.blueLightUrl,
            yellowLightUrl:res.data.templateType.yellowLightUrl,
            rawitemBgUrl:res.data.templateType.rawitemBgUrl,
            startBtnImgUrl:res.data.templateType.startBtnImgUrl,
            startBtnImgClickedUrl:res.data.templateType.startBtnImgClickedUrl,
            rawList:res.data.templateType.rawList.map((item,index) => ({"imageUrl":item.imageUrl,"awardName":item.awardName,"rawId":item.id}))
          }
        })
        this.setState({AlreadyIn:{showAlreadyIn:res.data.template.participateNumIsShow==1?true:false,participateNum:res.data.template.participateNum}});
        this.setState({LotterOpp:{showLotterOpp:res.data.template.lotterOppIsShow==1?true:false,lotterOppTimes:res.data.template.lotterOppTimes}});
        store.dispatch(setDrawTimes(res.data.template.lotterOppTimes))

      }else{
        Toast.info("获取页面失败",1);
      }
    },(error)=>{
        Toast.info("请求出错，请联系管理员",1)
    })
  }

  static componentDidMount() {

  }

  handleLotteryResultModel(awardInfo){
    console.log(`handleLotteryResultModel ${JSON.stringify(awardInfo)}`)
    this.setState((prevState,props) => {
      console.log(parseInt(prevState.LotterOpp.lotterOppTimes));
      // let times=parseInt(prevState.LotterOpp.lotterOppTimes);
      store.dispatch(downDrawTimes(prevState.LotterOpp.lotterOppTimes))
      // times--;
      // if(times<0){
      //   times=0;
      // }
      return {showOrHideResultModel:"fadeInDown",awardInfo,LotterOpp:{showLotterOpp:true,lotterOppTimes:store.getState().lottery.drawTimes}}
    }
    );
    
  }
  handleCloseResultModel(){
    this.setState({showOrHideResultModel:"fadeOutUp"});
  }

  

  render() {
    if(this.state.Lottery.lotteryIsShow=='1'){
      const defaultLottery=<Lottery location={this.state.Lottery.location} prizeBg={this.state.Lottery.prizeBgUrl} blueLight={this.state.Lottery.blueLightUrl} yellowLight={this.state.Lottery.yellowLightUrl} rawItemBg={this.state.Lottery.rawitemBgUrl} startBtnImg={this.state.Lottery.startBtnImgUrl} startBtnImgClicked={this.state.Lottery.startBtnImgClickedUrl} rawList={this.state.Lottery.rawList} rawRate={this.state.rawRate} handleLotteryResultModel={this.handleLotteryResultModel.bind(this)}/>;
      switch(this.state.Lottery.type){
        case "12grid":
          this.Lottery=defaultLottery;
        break;
        default:
          this.Lottery=defaultLottery;
        break;
      }
      
    }else{
      this.Lottey=<React.Fragment></React.Fragment>;
    }
    if(this.state.loading){
      // Toast.loading('Loading...', 0);
      return (
        <div className="App" style={{height:`${window.screen.height}px`}}>
          <img src={loadingbg} />
        </div>);
    }else{
      // Toast.hide();
      return (
        <div className={this.AppBox} style={{height:`${window.screen.height}px`}}>
          <NavBar
            mode="light"
            // icon={<Icon type="left" />}
            // onLeftClick={() => console.log('onLeftClick')}
            // rightContent={[
            //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            //   <Icon key="1" type="ellipsis" />,
            // ]}
          >{this.title}</NavBar>
          <div className="content" >
            <img src={this.state.activeBg} />
            {this.state.MusicPlay.showMusicPlay?<MusicPlay audioSrc={this.state.MusicPlay.audioSrc} location={this.state.MusicPlay.location} />:<React.Fragment></React.Fragment>}
            {this.state.titleImg.showTitleImg?<img src={this.state.titleImg.titleImgSrc} className={this.state.titleImg.titileImgBox} style={this.state.titleImg.location}/>:<React.Fragment></React.Fragment>}
            {this.state.ActivityMethod.showActivityMethod?<ActivityMethod activertyMethodImgSrc={this.state.ActivityMethod.activityMethodSrc} activityMethodClass={this.state.ActivityMethod.activityMethodClass} location={this.state.ActivityMethod.location}/>:<React.Fragment></React.Fragment>}
            {this.Lottery}
            {this.state.AlreadyIn.showAlreadyIn?<p className="alreadyIn" style={this.alreadyInLocation}>已有 {this.state.AlreadyIn.participateNum} 人参与</p>:<React.Fragment></React.Fragment>}
            {this.state.LotterOpp.showLotterOpp?<p className="chance" style={this.chanceLocation}>您今天还有 {this.state.LotterOpp.lotterOppTimes} 次抽奖机会</p>:<React.Fragment></React.Fragment>}
            <ResultModel class={this.state.showOrHideResultModel} handleCloseResultModel={this.handleCloseResultModel.bind(this)}  awardInfo={this.state.awardInfo} />
          </div>
          
        </div>);
    }
    
  }
}



export default App;
