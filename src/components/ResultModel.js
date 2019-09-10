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
import '../assets/css/components/ResultModel.css';
import gift from '../assets/img/gift.png';
import notAwardImg from '../assets/img/faiImg1-2.png';

class ResultModel extends React.PureComponent {
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
          {/* <div className="contentTitle">
            恭喜你获得了
          </div>
          <div className="awardImgBox">
            <div className="light">
            </div>
            <img src={gift} className="giftImg"/>
          </div>
          <div className="yellowText awardName">一等奖</div>
          <p className="awardInfo">价值100元礼品</p>
          <a className="closeBtn" onClick={this.props.handleCloseResultModel}>返回首页</a> */}
          <img src={notAwardImg} className="notAwardImg" />
          <a className="closeBtn" onClick={this.props.handleCloseResultModel}>再来一次</a>
        </div>
      </div>
    )
  }
}




ResultModel.defaultProps = {
};

export default ResultModel;
