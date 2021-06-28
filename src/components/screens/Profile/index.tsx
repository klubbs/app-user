import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import CongratulationsCoupons from '../../../../assets/animations/congratulations_coupons.json';
import { default as colors, default as COLORS } from '../../../../assets/constants/colors';
import { AuthContext } from '../../../contexts/AuthContext';
import { OptionsScreenProps } from '../../../settings/navigation/interfaces/ITabParams';
import { IMenu } from './interfaces';
import { ContainerImage, ContainerPoints, ImageBorder, MenuItemArrow, MenuItemContainer, MenuItemIcon, MenuLogoutContainer, MenuText, MenuTextContainer, MenuTextDescription, MenuTextLogout, Point, PointValues, SafeArea, UserImage, WrapperTop } from './styles';


const Profile: React.FC<OptionsScreenProps> = ({ route }) => {

  const [menuData, setMenuData] = useState<IMenu[]>(
    [
      // #F48B29
      //#AC0D0D
      { id: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", color: "#FBE6C2" },
      { id: "2", text: "Preferências", description: "Controle suas preferências", icon: "settings", color: "#F0C929" }
    ]
  )

  const { user, isRegister, _signOut } = useContext(AuthContext)

  const animRef = useRef<LottieView>(null)
  const navigation = useNavigation();

  useEffect(() => {
    if (isRegister)
      animRef.current?.play()

  }, [isRegister])


  const handleSignOut = async () => {

    Alert.alert('Vai nos deixar ?', 'Quer realmente sair do melhor app de todos ! 🤣', [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => { }
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => { _signOut() }
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
          <Feather name={"chevron-right"} color={COLORS.COLOR_SECUNDARY_BLACK} size={18} />
        </MenuItemArrow>
      </MenuItemContainer>
    )
  }

  const MenuFooterItem = () => {
    return (
      user && <MenuLogoutContainer>
        <Feather name={'log-out'} size={16} color={COLORS.COLOR_BLACK40} onPress={handleSignOut} />
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
        <TouchableOpacity onPress={() => navigation.navigate("LoginWelcome")}>
          <Point>Entrar ou Cadastrar-se</Point>
        </TouchableOpacity>
    )
  }

  return (
    <SafeArea>
      {isRegister && <LottieView source={CongratulationsCoupons} loop={false} ref={animRef} />}
      <WrapperTop >
        <ContainerImage >
          <ImageBorder hasUser={user?.image}>
            {user?.image
              ? <UserImage source={{ uri: `${user?.image}` }} />
              :   <Feather name={'user'} color={colors.COLOR_BLACK40} size={35} />
            }
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
    </SafeArea >
  );
}

export default Profile;
