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
import '../assets/css/components/ActivityMethod.css';
import activertyMethodImg from '../assets/img/activertyMethod.png';
import ModelPage from './ModelPage';

class ActivityMethod extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {showOrHide:""};
    this.audioDom = null;
  }

  handleOpenMethodModel(){
    this.setState({showOrHide:"fadeInRight"});
  } 
  handleCloseModel(){
    this.setState({showOrHide:"fadeOutRight"});
  }

  render(){
    return (
        <div >
            <img src={this.props.activertyMethodImgSrc!==null?this.props.activertyMethodImgSrc:ActivityMethod.defaultProps.activertyMethodImgSrc} className={`activertyMethodBtn animated ${this.props.activityMethodClass!==null?this.props.activityMethodClass:ActivityMethod.defaultProps.activityMethodClass}`} style={this.props.location!==null?this.props.location:ActivityMethod.defaultProps.location} onClick={this.handleOpenMethodModel.bind(this)}/>
            <ModelPage class={this.state.showOrHide} handleCloseModel={this.handleCloseModel.bind(this)}/>
        </div>
    )
  }
}




ActivityMethod.defaultProps = {
  activertyMethodImgSrc:activertyMethodImg,
  activityMethodClass:"pulseInfi",//自定义永久动画效果
  location:{right:"0.1rem",top:"0.1rem"},
};

export default ActivityMethod;
