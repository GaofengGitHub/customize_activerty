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
import '../assets/css/components/MusicPlay.css';
import wantDeadDontDare from "../Audio/wantDeadDontDare.mp3";

class MusicPlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {audioBoxAndAnimate:"audioBox audioAnimationPlay"};
    this.audioDom = null;
  }

  handlePlayMusicOrPause(){
    if(!this.audioDom.paused){
      this.audioDom.pause();
      this.setState({audioBoxAndAnimate:"audioBox audioAnimationPause"});
    }else{
      this.audioDom.play();
      this.setState({audioBoxAndAnimate:"audioBox audioAnimationPlay"});
    }
  }

  render(){
    return (
      <div className={this.state.audioBoxAndAnimate} onClick={this.handlePlayMusicOrPause.bind(this)} style={this.props.location}>
        <audio src={this.props.audioSrc!==null?this.props.audioSrc:MusicPlay.defaultProps.audioSrc} autoPlay={this.props.autoPlay!==null?this.props.autoPlay:MusicPlay.defaultProps.autoPlay} loop={this.props.loop!==null?this.props.loop:MusicPlay.defaultProps.loop}  ref={(audio)=>{
          this.audioDom=audio
        }}>
          {this.props.notSupportText!==null?this.props.notSupportText:MusicPlay.defaultProps.notSupportText}
        </audio> 
      </div>
    )
  }
}




MusicPlay.defaultProps = {
  location:{left:"0.5rem",top:"0.5rem"},
  audioSrc:wantDeadDontDare,
  autoPlay: true,
  loop:true,
  notSupportText: '您的浏览器不支持 audio 标签。'
};

export default MusicPlay;
