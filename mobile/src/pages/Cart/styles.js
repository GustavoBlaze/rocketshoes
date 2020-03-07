import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #191920;
  flex: 1;
  padding: 20px;
  padding-top: 10px;
  flex-direction: column;
`;

export const Card = styled.View`
  flex-direction: column;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 12px;
  max-height: 90%;
`;

export const EmptyCartCard = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px 0;
  border-radius: 4px;
  margin-top: 12px;
  max-height: 90%;
`;

export const EmptyCartText = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  color: #cacaca;
  font-size: 30px;
`;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
  padding: 5px;
  margin-bottom: 15px;
`;

export const Product = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

export const ProductPreview = styled.View`
  flex-direction: row;
`;

export const ProductImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  height: 80px;
`;

export const ProductInformation = styled.View`
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
`;

export const ProductName = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 18px;
  margin-bottom: 5px;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  color: #000;
`;

export const DeleteButton = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const SubtotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  padding: 10px;
  border-radius: 4px;
`;

export const AmountContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const QuantityButton = styled.TouchableOpacity`
  padding: 2px;
`;

export const Input = styled.TextInput.attrs({
  editable: false,
})`
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  padding: 5px;
  width: 51px;
  font-size: 14px;
  line-height: 16px;
  color: #666;
  height: 26px;
  text-align: center;
  margin: 0 10px;
`;

export const SubtotalText = styled.Text`
  color: #000;
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
`;

export const TotalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const TotalHint = styled.Text`
  font-weight: bold;
  color: #999;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const TotalText = styled.Text`
  font-weight: bold;
  color: #000;
  font-size: 30px;
  text-transform: uppercase;
`;

export const Button = styled(RectButton)`
  padding: 13px;
  background: #7159c1;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;
