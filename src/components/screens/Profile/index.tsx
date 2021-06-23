import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { IMenu } from './interfaces';
import { ContainerImage, ContainerPoints, ImageBorder, MenuItemArrow, MenuItemContainer, MenuItemIcon, MenuLogoutContainer, MenuText, MenuTextContainer, MenuTextDescription, MenuTextLogout, Point, PointValues, UserImage, WrapperTop } from './styles';



const Profile: React.FC = () => {

  const [menuData, setMenuData] = useState<IMenu[]>(
    [
      // #F48B29
      //#AC0D0D
      { id: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", color: "#FBE6C2" },
      { id: "2", text: "Preferências", description: "Controle suas preferências", icon: "settings", color: "#F0C929" }
    ]
  )

  const navigation = useNavigation();


  const [user, setUser] = useState(null)

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

  const RenderPoints: React.FC = () => {

    return (
      user
        ? <>
          <Point>Pontos</Point>
          <PointValues>1500</PointValues>
        </>
        :
        <TouchableOpacity onPress={() => navigation.navigate("WelcomeLogin")}>
          <Point>Entrar ou Cadastrar-se</Point>
        </TouchableOpacity>
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
          <RenderPoints />
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
