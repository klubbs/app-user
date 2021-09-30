import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import CongratulationsCoupons from '../../../../assets/animations/congratulations_coupons.json';
import { AuthContext } from '../../../contexts/authContext';
import { IMenu } from './@types';
import { MenuItem } from '../../components/1MenuItem';
import Character from '../../../../assets/images/characters/character.png'
import {
  ContainerImage,
  ContainerPoints,
  IconLogout,
  MenuLogoutContainer,
  MenuTextLogout,
  Point,
  PointValues,
  SafeArea,
  UserImage,
  WrapperTop,
  ContainerScroll
} from './styles';


const INFLUENCER_KEY = "999";

const Profile: React.FC = () => {

  //TODO: Alterar para scroolView
  const MENU_DATA: IMenu[] = [
    // { key: "1", text: "Meus Dados", description: "Edite seus dados", icon: "user", logged: true, cb: () => { } },
    { key: "2", text: "Configurações", description: "Controle suas configurações", icon: "settings", logged: false, cb: () => navigation.navigate('Configurations') },
    { key: "3", text: "Dúvidas", description: "Precisa de alguma ajuda", icon: "help-circle", logged: false, cb: () => navigation.navigate('Help') },
    { key: INFLUENCER_KEY, text: "Influenciador", description: 'Gerencie sua influência', icon: "thumbs-up", logged: true, cb: () => navigation.navigate('Influencer') }
  ]

  const { user, isRegister, logout } = useContext(AuthContext)

  const animRef = useRef<LottieView>(null)

  const navigation = useNavigation();

  useEffect(() => {
    if (isRegister)
      animRef.current?.play()

  }, [isRegister])


  const handlelogout = async () => {

    Alert.alert('Quer sair ?', 'Mas volte logo, por favor !', [
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
              <Point>Entrar ou {'\n'}Cadastrar-se</Point>
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
          {
            user && <UserImage source={Character} />
          }
        </ContainerImage>
        <RenderPoints />
      </WrapperTop>

      <ContainerScroll>
        {
          MENU_DATA.map(item => {

            if (item.key === INFLUENCER_KEY && user?.influencer_id === null) {
              return <></>
            }

            return (
              <MenuItem key={item.key} icon={item.icon} description={item.description} text={item.text} cb={item.cb} logged={item.logged} />
            )
          })
        }
        {
          user &&
          <MenuLogoutContainer>
            <IconLogout onPress={handlelogout} />
            <MenuTextLogout>Sair</MenuTextLogout>
          </MenuLogoutContainer>
        }
      </ContainerScroll>

    </SafeArea >
  );
}

export default Profile;
