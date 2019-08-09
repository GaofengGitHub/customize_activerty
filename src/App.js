import React from 'react';
import loadingbg from './assets/img/loadingbg.jpg';
import activeBg from './assets/img/activeBg.jpg';
import titleImg from './assets/img/titleImg.png';
import {  Toast,NavBar, Icon } from 'antd-mobile';

import './App.css';
import './assets/css/animate.min.css';
import MusicPlay from './components/MuiscPlay';
import ActivityMethod from './components/ActivityMethod';
import Lottery from './components/Lottery';
import {getCustomizeInfo} from './utils/Data';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,activeBg,
      MusicPlay:{showMusicPlay:true,audioSrc:null,location:null},
      titleImg:{showTitleImg:true,titleImgSrc:titleImg,location:{top:"0.2rem"},titileImgBox:"titileImgBox animated"},
      ActivityMethod:{showActivityMethod:true,activityMethodSrc:null,location:null,activityMethodClass:null},
      Lottery:{
        showLottery:true,
        type:null,
        location:null,
        data:{
          "prizeBg":"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgicHG2gUo3PDKigIw-gM4-gM.png",
			    "blueLight":"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgrsbUyAUo_IubMzAcOBw.png",
			    "yellowLight":"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgqMbUyAUo4ML2pAYwHDgc.png",
			    "rawItemBg":"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgtMbUyAUowvXEygIwhgE4hgE.png",
			    "startBtnImg":"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAg_8bUyAUooKvYsQMwhgE4hgE.png",
			    "startBtnImgClicked":"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAg_MbUyAUou8nkmAIwhgE4hgE.png",
			    "rawList":[{src:"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgy8bUyAUoh7Wd8gUwhgE4hgE.png",rawText:"谢谢参1与"}, {src:"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAg2rmmzwUojoWKmwYwhgE4hgE.png",rawText:"安慰奖"},{src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAglcvs2QUo1-zKtQQwhgE4hgE.png",rawText:"一等奖"} ,{src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgmcvs2QUovPiiRjCGATiGAQ.png",rawText:"二等奖"} ,{src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgncvs2QUo1biavwcwhgE4hgE.png",rawText:"三等奖"} , {src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgosvs2QUojPDKigYwhgE4hgE.png",rawText:"四等奖"}, {src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgpsvs2QUo_-if8gMwhgE4hgE.png",rawText:"五等奖"}, {src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgq8vs2QUooJa9iQYwhgE4hgE.png",rawText:"六等奖"},{src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgsMvs2QUo0M-eyAYwhgE4hgE.png",rawText:"七等奖"} ,{src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgtMvs2QUolPnr4gcwhgE4hgE.png",rawText:"八等奖"} , {src:"http://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgy8bUyAUoh7Wd8gUwhgE4hgE.png",rawText:"谢谢参与"}, {src:"https://7020498.h40.faiusr.com/4/461/ACgIABAEGAAgtMvs2QUolPnr4gcwhgE4hgE.png",rawText:"八等奖"}],
          "rawRate":["2%", "18%", "5%", "35%", "5%", "5%", "5%", "5%", "5%", "5%", "5%", "5%"]
        }
      }
    };
    this.Lottery=null;
    this.AppBox = "AppBox";
    this.title = "参与活动赢大奖";
    this.audioDom = null;
    this.alreadyInLocation = {bottom:"2.6rem",left:"0rem"};
    this.chanceLocation = {bottom:"1.9rem",left:"0rem"};
  }

  componentWillMount(){
    getCustomizeInfo("2ae5ce83e79145f99de96c01dd43ac3a",(res)=>{
      console.log(`定制化页面数据====${JSON.stringify(res)}`);
      if(res.success){
        this.setState({loading:false});
        if(res.data.activityBgUrl!=""){
          this.setState({activeBg:res.data.activityBgUrl});
        }
        this.setState({MusicPlay:{showMusicPlay:res.data.musicPlayIsShow==1?true:false,audioSrc:res.data.audioSrcUrl,location:{left:"0.5rem",top:"0.5rem"}}});
        this.setState({titleImg:{showTitleImg:res.data.titleImgIsShow==1?true:false,titleImgSrc:res.data.titleImgUrl,titileImgBox:"titileImgBox animated slideInDown",location:{top:"0.2rem"}}});
        this.setState({ActivityMethod:{showActivityMethod:res.data.activityMethodIsShow==1?true:false,activityMethodSrc:res.data.activityMethodImgUrl,activityMethodClass:"pulseInfi",location:{right:"0.1rem",top:"0.1rem"}}});

      }else{
        Toast.info("获取页面失败",1);
      }
    },(error)=>{
        Toast.info("请求出错，请联系管理员",1)
    })
  }

  static componentDidMount() {

  }

  

  render() {
    if(this.state.Lottery.showLottery){
      switch(this.state.Lottery.type){
        case "12grid":
          this.Lottery=<Lottery location={this.state.Lottery.location} data={this.state.Lottery.data}/>
        break;
        default:
          this.Lottery=<Lottery location={this.state.Lottery.location} data={this.state.Lottery.data}/>
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
            <p className="alreadyIn" style={this.alreadyInLocation}>已有 1 人参与</p>
            <p className="chance" style={this.chanceLocation}>您今天还有 3 次抽奖机会</p>
          </div>
          
        </div>);
    }
    
  }
}



export default App;
