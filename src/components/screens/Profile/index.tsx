import React, { useState } from 'react';
import { View, SafeAreaView, FlatList, SectionList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { WrapperTop, ContainerImage, ContainerPoints, MenuLogoutContainer, MenuTextLogout, ImageBorder, MenuText, MenuTextDescription, UserImage, Point, PointValues, MenuItemArrow, MenuItemContainer, MenuItemIcon, MenuTextContainer } from './styles';
import COLORS from '../../../../assets/constants/colors';
import { IMenu } from './params';


const Profile: React.FC = () => {

  const [menuData, setMenuData] = useState<IMenu[]>(
    [
      // #F48B29
      //#AC0D0D
      { id: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", color: "#FBE6C2" },
      { id: "2", text: "Preferências", description: "Controle suas preferências", icon: "settings", color: "#F0C929" }
    ]
  )

  const MenuItem = (params: IMenu) => {
    return (
      <MenuItemContainer >
        <MenuItemIcon >
          <Feather name={params.icon} color={COLORS.COLOR_YELLOW} size={16} />
        </MenuItemIcon>
        <MenuTextContainer>
          <MenuText>{params.text}</MenuText>
          <MenuTextDescription>{params.description}</MenuTextDescription>
        </MenuTextContainer>
        <MenuItemArrow >
          <Feather name={"chevron-right"} color={COLORS.COLOR_SECUNDARY_BLACK} size={18} />
        </MenuItemArrow>
      </MenuItemContainer>
    )
  }

  const MenuFooterItem = () => {
    return (
      <MenuLogoutContainer>
        <Feather name={'log-out'} size={16} color={COLORS.COLOR_BLACK40} />
        <MenuTextLogout>Sair</MenuTextLogout>
      </MenuLogoutContainer>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.COLOR_WHITE }} >
      <WrapperTop >
        <ContainerImage >
          <ImageBorder>
            <UserImage source={{ uri: "https://yt3.ggpht.com/ytc/AAUvwniRYZJAnDuZv0bHVkRWorCYYacm49zD_84SnCR1Pg=s900-c-k-c0x00ffffff-no-rj" }} />
          </ImageBorder>
        </ContainerImage>
        <ContainerPoints >
          <Point>Pontos</Point>
          <PointValues>1500</PointValues>
        </ContainerPoints>
      </WrapperTop>
      <View style={{ flex: 2 }}>
        <FlatList
          data={menuData}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={() => MenuFooterItem()}
          renderItem={({ item }) => MenuItem(item)}
        />

      </View>
    </SafeAreaView >
  );
}

export default Profile;
