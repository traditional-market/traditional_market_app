import {meta_types} from '@global_types';
import {useNavigation} from '@react-navigation/core';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Alert} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

type Props = {
  drawerState: drawerState;
  closeDrawer: () => void;
};

const Drawer = ({drawerState, closeDrawer}: Props) => {
  const navigation = useNavigation();
  const handleTouchDrawer = () => {
    navigation.navigate('DETAIL', {item: drawerState.targetItem});
  };
  return (
    <View style={D_ST.container}>
      <TouchableOpacity
        onPress={() => closeDrawer()}
        style={D_ST.close_container}>
        <Text style={D_ST.close__text}>취소</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTouchDrawer()}
        style={D_ST.main_container}>
        <View style={D_ST.item_wrapper}>
          <View>
            <Text style={D_ST.head__text}>
              {drawerState.targetItem?.market_name}
            </Text>
            <Text style={D_ST.label__text}>
              {drawerState.targetItem?.address_r}
            </Text>
          </View>

          <View style={D_ST.footer}>
            <Text style={D_ST.footer__text}>클릭하여 자세히 보기</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const D_ST = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  close_container: {
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 5,
    bottom: 140,

    paddingHorizontal: 20,
    paddingVertical: 5,
    zIndex: 1,
    borderRadius: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close__text: {color: 'gray'},
  main_container: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 11,
    padding: 20,
    marginBottom: -20,
  },
  item_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 10,
  },
  head__text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label__text: {
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer__text: {
    color: 'gray',
    fontSize: 12,
  },
});

type drawerState = {
  isVisible: boolean;
  targetItem: meta_types.market_item | null;
};
const MapScene = () => {
  const [drawerState, setDrawerState] = useState<drawerState>({
    isVisible: false,
    targetItem: null,
  });
  const webViewRef = useRef<WebView | null>(null);

  type recieveType =
    | {type: 'CLICK_MARKER'; data: meta_types.market_item}
    | {type: 'CLICK_MAP'};
  const recivePostMessageFromWeb = (action: recieveType) => {
    switch (action.type) {
      case 'CLICK_MARKER': {
        setDrawerState({isVisible: true, targetItem: action.data});
        break;
      }
      case 'CLICK_MAP': {
        closeDrawer();
        break;
      }
      default: {
        return;
      }
    }
  };

  const handleOnMessage = useCallback(({nativeEvent: {data}}) => {
    try {
      var data_obj = JSON.parse(data);
      // console.log(data_obj);
      recivePostMessageFromWeb(data_obj);
    } catch {
      // toastAlert('현재 지도 서버에 문제가있습니다.');
    }
  }, []);

  const closeDrawer = useCallback(
    () =>
      setDrawerState({
        isVisible: false,
        targetItem: null,
      }),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        onMessage={handleOnMessage}
        source={{
          uri: 'https://f786825aa975.ngrok.io',
        }}
      />
      {drawerState.isVisible && (
        <Drawer drawerState={drawerState} closeDrawer={closeDrawer} />
      )}
    </View>
  );
};

export default MapScene;
