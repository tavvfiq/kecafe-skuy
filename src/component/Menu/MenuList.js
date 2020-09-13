/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Text, View, VirtualizedList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import MenuCardList from './Menu.Card.List';
import styles from './menuStyle';
import headerStyle from '../Header/headerStyle';
import SearchComponent from '../Search/Search';
import backIcon from '../../assets/img/Arrow.png';
import MenuDetail from './MenuDetail';
import {getMenu} from '../../redux/action/menuAction';
import {API_URL} from '../../utils/environment';

const CustomHeader = ({navigation, categoryId}) => {
  return (
    <View style={headerStyle.container}>
      <View style={{...headerStyle.header, justifyContent: 'flex-start'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('AllMenu');
          }}
          android_ripple={{color: 'rgba(0,0,0,0.2)', radius: 15, borderless: true}}
          style={{width: 22, height: 22, alignSelf: 'center', marginRight: 15}}>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              tintColor: 'black',
              resizeMode: 'cover',
              alignSelf: 'center',
            }}
            source={backIcon}
          />
        </Pressable>

        <Text style={headerStyle.headerText}>
          {categoryId === 1
            ? 'Main Course'
            : categoryId === 2
            ? 'Dessert'
            : categoryId === 3
            ? 'Beverage'
            : categoryId === 4
            ? 'Snack'
            : 'All Menu'}
        </Text>
      </View>
      <SearchComponent categoryId={categoryId} />
    </View>
  );
};

const handleFetch = (pageInfo, loading, dispatch) => {
  if (pageInfo.nextPage !== undefined && pageInfo.nextPage !== '' && !loading.menuList) {
    dispatch(getMenu(`${API_URL}${pageInfo.nextPage}`, 'ALL'));
  }
};

const MenuList = React.memo((props) => {
  const [selectedId, setSelectedId] = useState(0);
  const showRef = useRef();
  const {navigation} = props;
  const categoryId = props.route.params;
  const {menu, pageInfo, loading} = useSelector((state) => state.menuState);
  const dispatch = useDispatch();

  const handleCardClicked = (id) => {
    setSelectedId(id);
    showRef.current.showModal();
  };

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(
        getMenu(
          `${API_URL}/menu?search=&filter=${categoryId}&sortby=price&order=ASC&page=1&limit=12`,
          'ALL'
        )
      );
    }
  }, [dispatch]);

  let idx = menu.findIndex((data) => data.id === selectedId);
  if (idx < 0) {
    idx = 0;
  }

  return (
    <>
      {menu.length !== 0 ? <MenuDetail menu={menu[idx]} ref={showRef} /> : null}
      <VirtualizedList
        windowSize={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        legacyImplementation={true}
        data={menu}
        getItem={(data, index) => {
          return data[index];
        }}
        getItemCount={(data) => data.length}
        renderItem={({item}) => {
          return <MenuCardList key={item.id} handleCardClicked={handleCardClicked} menu={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        style={styles.menuList}
        ListHeaderComponent={() => {
          return <CustomHeader navigation={navigation} categoryId={categoryId} />;
        }}
        ListFooterComponent={() => {
          return (
            <>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Whoops, you have reach the bottom:)</Text>
              </View>
            </>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        stickyHeaderIndices={[0]}
        initialNumToRender={12}
        onEndReached={() => {
          handleFetch(pageInfo, loading, dispatch);
        }}
        onEndReachedThreshold={0.1}
      />
    </>
  );
});

export default MenuList;
