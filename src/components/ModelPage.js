/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import '../assets/css/components/ModelPage.css';
import arr_r from '../assets/img/kqjt.png';
import djq from '../assets/img/djq.png';
import close from '../assets/img/close.png';

class ModelPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeTab:"manule"};
    this.audioDom = null;
  }

  handleTab(tab){
    if(tab=="manule"){
      this.setState({activeTab:"manule"})
    }else if(tab=="award"){
      this.setState({activeTab:"award"})
    }
  }
  

  render(){
    return (
      <div className={`modelBox animated ${this.props.class}`}>
        <div className="modelContent">
          <ul className="topTab clearfix">
            <li className={`fl_l ${this.state.activeTab=="manule"?"active":""}`} onClick={this.handleTab.bind(this,"manule")}>
              <a>活动说明</a>
            </li>
            <li className={`fl_l ${this.state.activeTab=="award"?"active":""}`} onClick={this.handleTab.bind(this,"award")}>
              <a>我的奖品</a>
            </li>
            <img src={close} className="close" onClick={this.props.handleCloseModel}/>
          </ul>
          <div className={`manuleTab ${this.state.activeTab=="manule"?"active":""}`}>
            <div className="card">
              <div className="cardHead">活动奖品</div>
              <div className="cardBody">
                <ul>
                  <li>一等奖：价值100元礼品</li>
                  <li>一等奖：价值100元礼品</li>
                  <li>一等奖：价值100元礼品</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="cardHead">活动时间</div>
              <div className="cardBody">
                <p><span >2019年06月26日 10:38</span>&nbsp;-&nbsp;<span >2019年07月03日 10:38</span></p>
              </div>
            </div>
            <div className="card">
              <div className="cardHead">主办单位</div>
              <div className="cardBody">
                <p className="yellowText">高峰</p>
              </div>
            </div>
            <div className="card">
              <div className="cardHead">活动规则</div>
              <div className="cardBody">
                <p>每人每日有3次抽奖机会</p>
              </div>
            </div>
            <div className="card">
              <div className="cardHead">活动说明</div>
              <div className="cardBody">
                <p>点击“开始抽奖”后，九宫格开始转动，最终光圈停留的格子为您所中的奖品。</p>
              </div>
            </div>
          </div>
          <div className={`awardTab ${this.state.activeTab=="award"?"active":""}`}>
            <ul>
              <li className="awardCard clearfix">
                <div className="fl_r awardCard-r">
                  <img src={arr_r}/>
                </div>
                <div className="awardCard-l fl_l">
                  <div>一等奖：价值100元礼品</div>
                  <p>兑奖期限：2019.06.26至2019.07.03</p>
                  <p className="yellowText">未核销</p>
                </div>
                <img src={djq} className="djq"/>
              </li>
              <li className="awardCard clearfix">
                <div className="fl_r awardCard-r">
                  <img src={arr_r}/>
                </div>
                <div className="awardCard-l fl_l">
                  <div>一等奖：价值100元礼品</div>
                  <p>兑奖期限：2019.06.26至2019.07.03</p>
                  <p className="yellowText">未核销</p>
                </div>
                <img src={djq} className="djq"/>
              </li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
}




ModelPage.defaultProps = {
};

export default ModelPage;
