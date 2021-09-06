import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import CongratulationsCoupons from '../../../../assets/animations/congratulations_coupons.json';
import { AuthContext } from '../../../contexts/authContext';
import { IMenu } from './types';
import { MenuItem } from '../../component/menuItem';
import {
  ContainerImage,
  ContainerPoints,
  IconLogout,
  IconUser,
  ImageBorder,
  MenuLogoutContainer,
  MenuTextLogout,
  Point,
  PointValues,
  SafeArea,
  UserImage,
  WrapperTop
} from './styles';


const Profile: React.FC = () => {

  const MENU_DATA: IMenu[] = [
    // { key: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", logged: true, cb: () => { } },
    { key: "2", text: "Configurações", description: "Controle suas configurações", icon: "settings", logged: false, cb: () => { } },
    { key: '3', text: "Influenciador", description: 'Gerencie sua influência', icon: "thumbs-up", logged: true, cb: () => navigation.navigate('Influencer') }
  ]

  const { user, isRegister, logout } = useContext(AuthContext)

  const animRef = useRef<LottieView>(null)

  const navigation = useNavigation();

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

  function MenuFooterItem() {

    return (
      user && <MenuLogoutContainer>
        <IconLogout onPress={handlelogout} />
        <MenuTextLogout>Sair</MenuTextLogout>
      </MenuLogoutContainer>
    )

  }

  function RenderPoints(): JSX.Element {

    return (
      <ContainerPoints >
        {
          user
            ?
            <>
              <Point>Pontos</Point>
              <PointValues>Em breve</PointValues>
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

      <FlatList
        data={MENU_DATA}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20 }}
        contentContainerStyle={{ height: '30%' }}
        keyExtractor={item => item.key}
        ListFooterComponent={() => MenuFooterItem()}
        renderItem={({ item }) => <MenuItem key={item.key} icon={item.icon} description={item.description} text={item.text} cb={item.cb} logged={item.logged} />}
      />


    </SafeArea >
  );
}

export default Profile;
