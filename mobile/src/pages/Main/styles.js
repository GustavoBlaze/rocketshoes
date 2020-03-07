import styled from 'styled-components/native';
import { Dimensions, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2 - 4;
const thumbnailWidth = cardWidth;

export const Loading = styled(ActivityIndicator).attrs({
  size: 45,
  color: '#cacaca',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #191920;
`;

export const Container = styled.View`
  background: #191920;
  flex: 1;
  padding: 10px 20px;
  padding-bottom: 5px;
  flex-direction: column;
`;

export const ProductList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  margin-left: -4px;
  margin-right: -4px;
  padding-top: 7px;
`;

export const ProductContainer = styled.View`
  width: 50%;
  padding: 4px 4px;
`;

export const Product = styled.View`
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding: 4px;
  background: #fff;
  width: 100%;
  border-radius: 4px;
  height: ${thumbnailWidth + 160}px;
`;

export const Favorite = styled(Icon).attrs(props => ({
  name: 'favorite',
  size: 24,
  color: props.isFavorite ? '#7159c1' : '#cacaca',
}))`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
`;

export const ProductImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${thumbnailWidth}px;
  height: ${thumbnailWidth}px;
`;

export const ProductInformations = styled.View`
  flex: 1;
  padding: 10px;
  align-self: stretch;
`;

export const ProductName = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 15px;
  align-self: stretch;
  color: #333;
`;

export const ProductPrice = styled.Text`
  margin-top: 2px;
  padding-bottom: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const Button = styled(RectButton)`
  background: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ButtonIconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

export const ProductCount = styled.Text`
  font-size: 12px;
  color: white;
  margin-left: 5px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
  text-align: center;
  flex: 1;
  text-transform: uppercase;
  font-weight: bold;
`;
