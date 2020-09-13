import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    width: width * 0.39,
    height: '100%',
    maxHeight: height * 0.29,
    margin: 8,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardImageContainer: {
    height: '100%',
    width: '100%',
    maxHeight: 140,
    backgroundColor: 'white',
    elevation: 2,
  },
  cardImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '100%',
    width: '100%',
    maxHeight: 140,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 5,
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    height: 40,
  },
  cardTextPrice: {
    fontSize: 12,
    fontWeight: '700',
    width: '100%',
    height: 20,
  },
  menuList: {
    backgroundColor: 'white',
    height,
  },
  cardListContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  cardListImage: {
    width: 64,
    height: 64,
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 10,
  },
  cardListTextContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingRight: 5,
  },
  cardListTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
  },
  cardListDescText: {
    fontSize: 14,
    fontWeight: 'normal',
    width: '100%',
    textAlign: 'justify',
    marginTop: 5,
    marginBottom: 5,
  },
  cardListPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
  },
  cardListButtonContainer: {
    // backgroundColor: '#AB84C8',
    alignSelf: 'flex-end',
    width: 72,
    height: 28,
    elevation: 3,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 10,
  },
  cardListButton: {
    color: 'white',
    backgroundColor: '#AB84C8',
    width: '100%',
    height: '100%',
    paddingTop: 3,
    paddingBottom: 2,
  },
  cardListButtonText: {
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    marginTop: 10,
    borderColor: '#E3E3E7',
  },
  footerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
  },
  separator: {
    height: 1,
    width: width - 20,
    backgroundColor: '#E3E3E7',
    marginLeft: 10,
    marginRight: 10,
  },
  counterButtonContainer: {
    alignSelf: 'flex-end',
    width: 72,
    height: 28,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    elevation: 3,
    paddingTop: 2,
  },
  counterButtonContainerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height,
    width,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  imageContainer: {
    height: 0.9 * width,
    width: 0.9 * width,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  modalImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  menuTextTitle: {
    paddingLeft: 0.05 * width,
    fontWeight: 'bold',
    fontSize: 18,
  },
  priceTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0.05 * width,
    marginRight: 0.05 * width,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E3E3E7',
  },
  descText: {
    paddingLeft: 0.05 * width,
    paddingRight: 0.05 * width,
    color: '#AEAEB0',
    textAlign: 'justify',
    height: '36%',
    paddingTop: 10,
  },
  priceText: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonAddCart: {
    width: 0.9 * width,
    height: 42,
    alignSelf: 'center',
    backgroundColor: '#AB84C8',
    borderRadius: 3,
    elevation: 3,
  },
  buttonAddCartText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    paddingTop: 6,
  },
  handle: {
    alignSelf: 'center',
    height: 8,
    width: 64,
    borderRadius: 5,
    backgroundColor: '#AB84C8',
    marginTop: 10,
    elevation: 2,
  },
});

export default styles;
