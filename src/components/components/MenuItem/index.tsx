import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';

import {
  MenuItemContainer,
  MenuText,
  MenuTextContainer,
  MenuTextDescription,
  MenuItemIcon,
} from './styles';
import { colors } from '../../../../assets/constants/colors';
import { AuthContext } from '../../../contexts/auth-context';
import { IMenu } from '../../screens/user-profile/@types';
import { ChevronIcon } from '../ChevronRight';

export const MenuItem: React.FC<IMenu> = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user || !props.logged ? (
        <MenuItemContainer onPress={props.cb}>
          <MenuItemIcon>
            <Feather name={props.icon} color={colors.COLOR_YELLOW} size={16} />
          </MenuItemIcon>
          <MenuTextContainer>
            <MenuText>{props.text}</MenuText>
            <MenuTextDescription>{props.description}</MenuTextDescription>
          </MenuTextContainer>
          <ChevronIcon />
        </MenuItemContainer>
      ) : (
        <></>
      )}
    </>
  );
};
