import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import logo from '../../assets/logo.png';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #141419;
  padding: 20px;
  padding-bottom: 10px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const CartContainer = styled(RectButton)`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.Text`
  color: white;
  background: #7159c1;
  text-align: center;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  font-size: 12px;
  position: absolute;
  top: -2px;
  right: 0;
`;
