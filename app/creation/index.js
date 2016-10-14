import React, { Component } from 'react';  
import {
  StyleSheet,  
  Text,  
  View,  
  Image, 
  ListView, 
  TouchableHighlight,//透明点击层
  Dimensions,//用来获取屏幕宽度
} from 'react-native';  
import Icon from 'react-native-vector-icons/Ionicons';
import Mock from 'mockjs';
import request from '../common/request';
import config from '../common/config';
var width =Dimensions.get('window').width//获取屏幕宽度

var List = React.createClass({
    getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2//通过rowHasChanged获取内容是否被改变
    });
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  renderRow(row){
    return(
      //透明点击层
      <TouchableHighlight >
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{uri:row.thumb}}
            style={styles.thumb}>
            <Icon
              name='ios-play'
              size={28}
              style={styles.play} />
          </Image>

          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
              name='ios-heart-outline'
              size={28}
              style={styles.up} />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
              name='ios-chatboxes-outline'
              size={28}
              style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  componentDidMount(){
    this._fetchData()
  },

  _fetchData(){//这个方法是私有方法_
    request.get(config.api.base + config.api.creations,
      {accessToken:'123'})
      .then((data) => {
        var data = Mock.mock(data)
        if(data.success){
          this.setState({
            dataSource:this.state.dataSource.cloneWithRows(data.data)
          })
          console.log(data)
        }
      })
      .catch((error) => {
        console.warn(error);
      })
  },

	render(){
		return(
			<View style={styles.container}>
        <View style={styles.header}>
				  <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}//数据源
          renderRow={this.renderRow}//渲染子项
          enableEmptySections={true}//去除警告
          automaticallyAdjustContentInsets={false}//取消顶部分割线
        />
			</View>
			)
	}
})

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F5FCFF' 
  },  
  header:{
    paddingTop:25,
    paddingBottom:12,
    backgroundColor:'#ee735c'
  },
  headerTitle:{
    width:width,
    color:'#fff',
    fontSize:16,
    textAlign:'center',
    fontWeight:'600'
  },
  item:{
    width:width,
    marginBottom:10,
    backgroundColor:'#fff'
  },
  thumb:{
    width:width,
    height:width*0.56,
    resizeMode:'cover'
  },
  title:{
    padding:10,
    fontSize:18,
    color:'#333'
  },
  itemFooter:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#eee'
  },
  handleBox:{
    padding:10,
    flexDirection:'row',
    width:width/2-0.5,
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  play:{
    position:'absolute',
    bottom:14,
    right:14,
    width:46,
    height:46,
    paddingTop:9,
    paddingLeft:18,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:23,
    color:'#ed7b66'
  },
  handleText:{
    paddingLeft:12,
    fontSize:18,
    color:'#333'
  },
  up:{
    fontSize:22,
    color:'#333'
  },
  commentIcon:{
    fontSize:22,
    color:'#333'
  }

})

module.exports = List