import React from 'react';
import '../assets/css/components/Lottery.css';
import prizeBg from '../assets/img/prizeBg.png';
import rawItemBg from '../assets/img/rawBg.png';
import thanks from '../assets/img/thanks.png';
import anweijiang from '../assets/img/anweijiang.png';
import yidengjiang from '../assets/img/yidengjiang.png';
import erdengjiang from '../assets/img/erdengjiang.png';
import sandengjiang from '../assets/img/sandengjiang.png';
import sidengjiang from '../assets/img/sidengjiang.png';
import wudengjiang from '../assets/img/wudengjiang.png';
import liudengjiang from '../assets/img/liudengjiang.png';
import qidengjiang from '../assets/img/qidengjiang.png';
import badengjiang from '../assets/img/badengjiang.png';
import blueLight from '../assets/img/blueLight.png';
import yellowLight from '../assets/img/yellowLight.png';
import startBtnImg from '../assets/img/startRawLight.png';
import startBtnImgClicked from '../assets/img/startRaw.png';
import {drawLottey} from '../utils/Data';
import {  Toast } from 'antd-mobile';
import { store } from '..';



// Item组件--所有格子的操作都可以在此进行，如果这些操作都能与"activedId"关联就更好了
class RowItem extends React.PureComponent {
  render() {
    const { content, activedId,shadeShow,idx } = this.props;
    return (
      <div className={activedId === parseInt(idx) ? 'row__item row__item-active' : 'row__item'} id={`row_item_${idx}`} style={{background: `url(${Lottery.defaultProps.rawItemBg}) left top / 100% 100% no-repeat`}}>
        {/* {content} */}
        <div className="awardItem">
          <img  src={content.imageUrl} className="rawImg" />
          <p className="awardName11">{content.awardName}</p>
          {shadeShow?(activedId !== parseInt(idx) ? <div className="shadeItem"></div>:<React.Fragment></React.Fragment>):<React.Fragment></React.Fragment>}
          
        </div>
      </div>
    )
  }
}

class Lottery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 被选中的格子的ID
      activedId: '',
      // 中奖ID
      prizeId: null,
      // 获得prizeId之后计算出的动画次数
      times: 0,
      // 当前动画次数
      actTimes: 0,
      // 是否正在抽奖
      isRolling: false,
      blueLight:Lottery.defaultProps.blueLight,
      yellowLight:Lottery.defaultProps.yellowLight,
      startBtnImg:Lottery.defaultProps.startBtnImg,
      showShade:false
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.blueLight!==nextProps.blueLight){
      this.setState({blueLight: nextProps.blueLight,yellowLight: nextProps.yellowLight,startBtnImg: nextProps.startBtnImg},()=>{
      });
    }
      
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props.blueLight)
  //   console.log(nextProps.blueLight)
  //   if (this.props.blueLight !== nextProps.blueLight) {
  //     return true;
  //   }
    
  //   return false;
  // }
  componentDidMount(){
    setInterval(()=>{
        this.setState((prevState)=>({"blueLight":prevState.yellowLight,"yellowLight":prevState.blueLight}))
    },500)

  }
  rnd(rate){
    //	console.log("rate="+rate)//rate=["2%", '18%', '5%', '35%', '40%']
    var random = Math.floor(Math.random() * 100);
    if(random==0){
      random=1
    }else if(random==101){
      random=100
    }
  //random=1;
  //	console.log("random="+random);
    var myRandom = [];
    var randomList = [];
    var randomParent = [];
    for(var i = 0; i < 100; i++) {
      myRandom.push(parseInt([i]) + 1);
    }
  //	console.log("myRandom="+myRandom)//myRandom=[1-100]
    for(var i = 0; i < rate.length; i++) {
      var temp = [];
      var start = 0;
      var end = 0;
      randomList.push(parseInt(rate[i].split('%')[0]));//randomList=[2]
      for(var j = 0; j < randomList.length; j++) {
        start += randomList[j - 1] || 0
        end += randomList[j]
      }
      temp = myRandom.slice(start, end);
      randomParent.push(temp)
    }
  //	console.log("randomList="+randomList)
  //	console.log("randomParent="+randomParent)
    for(var i = 0; i < randomParent.length; i++) {
      
  //		console.log("i"+randomParent[i])
  //		console.log($.inArray(random, randomParent[i]))
      if(randomParent[i].indexOf(random)!= -1) {
  //			console.log(i+1)
        return(i + 1)
      }
    }
  }
  handleBegin() {
    // console.log(store.getState().lottery.drawTimes)
    if(store.getState().lottery.drawTimes>0){
      // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
      if (!this.state.isRolling) {
        if(!this.state.showShade){
          // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
          this.setState({
            activedId: '',
            prizeId: null,
            times: 0,
            actTimes: 0,
            isRolling: true,
            startBtnImg:Lottery.defaultProps.startBtnImg,
            showShade:true
          }, () => {
              setTimeout(()=>{
                this.setState({startBtnImg:Lottery.defaultProps.startBtnImgClicked})
              },500)

            // 状态还原之后才能开始真正的抽奖
            this.handlePlay(this.props.rawRate!==null?this.props.rawRate:Lottery.defaultProps.rawRate)
          })
        }
      }
    }else{
      Toast.info("很遗憾，您没有多余的抽奖次数",1)
    }
    
  }
  handlePlay(rateArr) {
    let prize;
    let drawTimes;
    drawTimes=1;
    drawLottey("9ddb754766e843b8a3674860be68d7b2","1234",drawTimes,(res)=>{
      console.log(`点击抽奖====${JSON.stringify(res)}`);
      if(res.success){
        if(drawTimes==1){
            console.log(`props.rawList==${JSON.stringify(this.props.rawList)}`)
            prize=this.props.rawList.findIndex(value => value.rawId==res.data.awardIds[0]);
            console.log(`prize==${prize}`)
        }
        // 根据概率获取一个中奖ID
        // let prize = this.rnd(rateArr);
        // console.log("prize"+prize);

        // 随机获取一个中奖ID
        // let prize = Math.floor(Math.random() * 12)
        // console.log(prize)
        this.setState({
          prizeId: prize,
          activedId: 0
        })
        // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
        let times = this.props.rawList.length * Math.floor(Math.random() * 5 + 4)
        this.setState({
          times: times
        })
        // 抽奖正式开始↓↓
        this.begin = setInterval(() => {
          let num;

          if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
            // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
            clearInterval(this.begin)
            this.setState({
              isRolling: false
            })
            setTimeout(()=>{
              this.setState({
                showShade: false
              },()=>{
                
              })
            },1000)
            let awardInfo=this.props.rawList[this.state.prizeId];
            awardInfo.msg=res.msg;
            if(res.data.isPrize){
              awardInfo.isPrize=true;
            }else{
              awardInfo.isPrize=false;
            }
            this.props.handleLotteryResultModel(awardInfo);

            return
          }

          // 以下是动画执行时对id的判断
          if (this.state.activedId === '') {
            num = 0
            this.setState({
              activedId: num
            })
          } else {
            num = this.state.activedId
            if (num === 11) {
              num = 0
              this.setState({
                activedId: num
              })
            } else {
              num = num + 1
              this.setState({
                activedId: num
              })
            }
          }

          this.setState({
            actTimes: this.state.actTimes + 1
          })


        }, 40)

      }else{
        Toast.info(`${res.msg}`,1);
      }
    },(error)=>{
        Toast.info("请求出错，请联系管理员",1)
    })
    
  }
  render() {
    const { activedId } = this.state;
    const list = (this.props.rawList !==null && this.props.rawList.length==12)? this.props.rawList:Lottery.defaultProps.rawList;
    return (
    <div className="prize" style={this.props.location!==null?this.props.location:Lottery.defaultProps.location}>
        <div className="prize__container" style={{height:`${window.screen.width*0.8}px`,background: `url(${this.props.prizeBg!=null?this.props.prizeBg:Lottery.defaultProps.prizeBg}) left top / 100% 100% no-repeat`}}>
        <div className="container__area">
            <div className="begin__btn" onClick={() => this.handleBegin()} style={{background: `url(${this.state.startBtnImg}) left top / 100% 100% no-repeat`}}>
            {/* 点击开始 */}
            </div>
            <div className="area__row">
            <RowItem content={list[0]} activedId={activedId} shadeShow={this.state.showShade} idx="0"/>
            <RowItem content={list[1]} activedId={activedId} shadeShow={this.state.showShade} idx="1"/>
            <RowItem content={list[2]} activedId={activedId} shadeShow={this.state.showShade} idx="2"/>
            <RowItem content={list[3]} activedId={activedId} shadeShow={this.state.showShade} idx="3"/>
            </div>
            <div className="area__row">
            <RowItem content={list[11]} activedId={activedId} shadeShow={this.state.showShade} idx="11"/>
            <RowItem content={list[4]} activedId={activedId} shadeShow={this.state.showShade} idx="4"/>
            </div>
            <div className="area__row">
            <RowItem content={list[10]} activedId={activedId} shadeShow={this.state.showShade} idx="10"/>
            <RowItem content={list[5]} activedId={activedId} shadeShow={this.state.showShade} idx="5"/>
            </div>
            <div className="area__row">
            <RowItem content={list[9]} activedId={activedId} shadeShow={this.state.showShade} idx="9"/>
            <RowItem content={list[8]} activedId={activedId} shadeShow={this.state.showShade} idx="8"/>
            <RowItem content={list[7]} activedId={activedId} shadeShow={this.state.showShade} idx="7"/>
            <RowItem content={list[6]} activedId={activedId} shadeShow={this.state.showShade} idx="6"/>
            </div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(0% + 0.2rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(16.6% - 0.2rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(33.2% - 0.25rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(49.8% - 0.25rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(66.4% - 0.25rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(83% - 0.25rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "0px", left: "calc(100% - 0.45rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(16.6% - 0.2rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.blueLight})  center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(33.2% - 0.25rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(49.8% - 0.25rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(66.4% - 0.25rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(83% - 0.25rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(100% - 0.45rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(83% - 0.25rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(66.4% - 0.25rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(49.8% - 0.25rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(33.2% - 0.25rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(16.6% - 0.2rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(100% - 0.45rem)", left: "calc(0% + 0rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(83% - 0.25rem)", left: "calc(0% + 0rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(66.4% - 0.25rem)", left: "calc(0% + 0rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(49.8% - 0.25rem)", left: "calc(0% + 0rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(33.2% - 0.25rem)", left: "calc(0% + 0rem)",background:`url(${this.state.yellowLight}) center center / 100% 100% no-repeat`}}></div>
            <div className="theRealFlashLight" style={{top: "calc(16.6% - 0.2rem)", left: "calc(0% + 0rem)",background:`url(${this.state.blueLight}) center center / 100% 100% no-repeat`}}></div>
            
        </div>  
        </div>
    </div>
    );
  }
}

Lottery.defaultProps = {
    location:{left:"0rem",top:"5.6rem"},
    prizeBg,
    blueLight,
    yellowLight,
    rawItemBg,
    startBtnImg,
    startBtnImgClicked,
    rawList:[{imageUrl:thanks,awardName:"谢谢参与"}, {imageUrl:anweijiang,awardName:"安慰奖"},{imageUrl:yidengjiang,awardName:"一等奖"} ,{imageUrl:erdengjiang,awardName:"二等奖"} ,{imageUrl:sandengjiang,awardName:"三等奖"} , {imageUrl:sidengjiang,awardName:"四等奖"}, {imageUrl:wudengjiang,awardName:"五等奖"}, {imageUrl:liudengjiang,awardName:"六等奖"},{imageUrl:qidengjiang,awardName:"七等奖"} ,{imageUrl:badengjiang,awardName:"八等奖"} , {imageUrl:thanks,awardName:"谢谢参与"}, {imageUrl:badengjiang,awardName:"八等奖"}],
    rawRate:["2%", '18%', '5%', '35%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%']
};

export default Lottery;