import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.primary.light};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  /* font-weight: bold; */
  /* font-family: 'Jost-Bold'; */
  font-family: ${({theme}) => theme.fonts.family.jostBold};
`;
