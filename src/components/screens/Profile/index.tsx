import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import CongratulationsCoupons from '../../../../assets/animations/congratulations_coupons.json';
import { default as COLORS } from '../../../../assets/constants/colors';
import { AuthContext } from '../../../contexts/auth_context';
import { OptionsScreenProps } from '../../../settings/navigation/interfaces/ITabParams';
import { IMenu } from './interfaces';
import {
  ContainerFlat, ContainerImage,
  ContainerPoints, IconArrowRight, IconLogout, IconUser, ImageBorder,
  MenuItemArrow,
  MenuItemContainer,
  MenuItemIcon,
  MenuLogoutContainer,
  MenuText,
  MenuTextContainer,
  MenuTextDescription,
  MenuTextLogout,
  Point,
  PointValues,
  SafeArea,
  UserImage,
  WrapperTop
} from './styles';


const Profile: React.FC<OptionsScreenProps> = ({ route }) => {

  const { user, isRegister, logout } = useContext(AuthContext)
  const animRef = useRef<LottieView>(null)
  const navigation = useNavigation();

  const [menuData, setMenuData] = useState<IMenu[]>(
    [
      // #F48B29
      //#AC0D0D
      { id: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", color: "#FBE6C2" },
      { id: "2", text: "Preferências", description: "Controle suas preferências", icon: "settings", color: "#F0C929" }
    ]
  )

  useEffect(() => {
    if (isRegister)
      animRef.current?.play()

  }, [isRegister])


  const handlelogout = async () => {

    Alert.alert('Não se vá', 'Quer realmente nos deixar ?', [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => { }
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => logout()
      }
    ])

  }

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
          <IconArrowRight />
        </MenuItemArrow>
      </MenuItemContainer>
    )
  }

  const MenuFooterItem = () => {
    return (
      user && <MenuLogoutContainer>
        <IconLogout onPress={handlelogout} />
        <MenuTextLogout>Sair</MenuTextLogout>
      </MenuLogoutContainer>
    )
  }

  const RenderPoints: React.FC = () => {

    return (
      <ContainerPoints >
        {
          user
            ? <>
              <Point>Pontos</Point>
              <PointValues>1500</PointValues>
            </>
            :
            <TouchableOpacity onPress={() => navigation.navigate("LoginWelcome")}>
              <Point>Entrar ou Cadastrar-se</Point>
            </TouchableOpacity>
        }
      </ContainerPoints>
    )
  }

  return (
    <SafeArea>
      {isRegister && <LottieView source={CongratulationsCoupons} loop={false} ref={animRef} />}
      <WrapperTop >
        <ContainerImage >
          <ImageBorder selected={user?.image}>
            {user?.image
              ? <UserImage source={{ uri: `${user?.image}` }} />
              : <IconUser />
            }
          </ImageBorder>
        </ContainerImage>
        <RenderPoints />
      </WrapperTop>

      <ContainerFlat>
        <FlatList
          data={menuData}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={() => MenuFooterItem()}
          renderItem={({ item }) => MenuItem(item)}
        />

      </ContainerFlat>

    </SafeArea >
  );
}

export default Profile;
