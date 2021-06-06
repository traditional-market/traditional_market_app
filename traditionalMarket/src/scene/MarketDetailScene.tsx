import {meta_types} from '@global_types';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
type Props = {
  route?: any;
  navigation?: any;
};
const MarketDetailScene = (props: Props) => {
  //@ts-ignore
  const data: meta_types.market_item = props.route?.params?.item;

  const open_naver_map = async () => {
    const deeplink = `nmap://search?query=${data.address_r}&appname=com.roadconstruct`;
    const navermap_uri = `https://m.map.naver.com/search2/search.naver?query=${data.address_r}`;

    const isSupportedURL = await Linking.canOpenURL(deeplink);
    if (isSupportedURL) {
      await Linking.openURL(deeplink);
    } else {
      Linking.openURL(navermap_uri);
    }
  };

  return (
    <View style={ST.container}>
      <ImageBackground
        style={ST.header}
        source={{
          uri: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        }}>
        <View style={ST.header_wrapper}>
          <Text style={ST.header__text}>{data.market_name}</Text>
        </View>
      </ImageBackground>
      <View style={ST.item_container}>
        <Text style={ST.item_header__text}>시장 정보</Text>
        <View style={ST.item_body}>
          <Text style={ST.item_body__label}>시장 이름</Text>
          <Text style={ST.item_body__value}>{data.market_name}</Text>
        </View>
      </View>
      <View style={ST.item_container}>
        <Text style={ST.item_header__text}>주소</Text>
        <View style={ST.item_body}>
          <Text style={ST.item_body__label}>도로명</Text>
          <Text style={ST.item_body__value}>{data.address_r}</Text>
        </View>
        <View style={ST.item_body}>
          <Text style={ST.item_body__label}>지번</Text>
          <Text style={ST.item_body__value}>{data.address_j}</Text>
        </View>
      </View>
      <View style={ST.item_container}>
        <Text style={ST.item_header__text}>추가 정보</Text>
        <View style={ST.item_body}>
          <Text style={ST.item_body__label}>노점 수</Text>
          <Text style={ST.item_body__value}>{data.street_score}</Text>
        </View>
        <View style={ST.item_body}>
          <Text style={ST.item_body__label}>주요 상품</Text>
          <Text style={ST.item_body__value}>{data.main_product}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => open_naver_map()}
        style={ST.naver_map_btn}>
        <Text style={ST.naver_map_btn__text}>네이버 지도로 보기</Text>
      </TouchableOpacity>
    </View>
  );
};
const ST = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgb(250,250,250)',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 200,
    elevation: 11,
    marginBottom: 20,
  },
  header_wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  header__text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },

  item_container: {
    borderRadius: 11,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'rgb(245,245,245)',
    // elevation: 5,
  },

  item_header__text: {
    fontWeight: 'bold',
  },
  item_body: {
    marginTop: 10,
    marginBottom: 10,
  },
  item_body__label: {
    color: 'gray',
    fontSize: 12,
  },
  item_body__value: {
    fontSize: 15,
  },
  naver_map_btn: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#2db400',
  },
  naver_map_btn__text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default MarketDetailScene;
