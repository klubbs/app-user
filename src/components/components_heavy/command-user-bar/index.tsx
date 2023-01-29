import React, { useContext, useEffect, useState } from 'react';
import { LocationSelector } from '../../components/LocationSelector';
import {
  ContainerLocation,
  SearchPressable,
  ContainerSearch,
  Input,
  ContainerInTop,
  Container,
  SubtitleSearch,
  SearchValue,
  ConfirmPressableSearch,
  XCircle,
  SearchIcon,
} from './styles';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';

import { HomeContext } from '../../../contexts/home-context';
import { StoreService } from '../../../services/store-service';
import { NotificationsFlash } from '../../../utils/flash-notifications';

const CommandUserBar: React.FC = () => {
  const { searchValue, setSearchValue, searchIsEnable, setRestaurants, getRestaurants } =
    useContext(HomeContext);

  const [searchCallback, setSearchCallback] = useState('');

  const WIDTH_SEARCH_ANIM = searchIsEnable ? 250 : 35;
  const MARGIN_SEARCH_ANIM = searchIsEnable ? 40 : 0;

  useEffect(() => {
    if (!searchValue) {
      setSearchCallback(searchValue ?? '');
      return;
    }

    const timeInMilisecondsToSearch = 500;

    const timer = setTimeout(() => {
      setSearchCallback(searchValue);
    }, timeInMilisecondsToSearch);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function handleChangeText(value: string) {
    if (!value) {
      setSearchValue(null);
      return;
    }

    setSearchValue(value);
  }

  function SearchBarRender() {
    return (
      <SearchPressable
        onPress={() => setSearchValue(null)}
        animate={{
          width: WIDTH_SEARCH_ANIM,
          marginRight: MARGIN_SEARCH_ANIM,
        }}
        transition={{
          type: 'spring',
        }}
      >
        {searchIsEnable && <Input value={searchValue ?? ''} onChangeText={handleChangeText} />}
        {!searchIsEnable && <SearchIcon />}
      </SearchPressable>
    );
  }

  async function handleCloseSearch() {
    setSearchValue('');

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Balanced,
    });

    await getRestaurants(location.coords.latitude, location.coords.longitude);
  }

  async function handleSearch() {
    try {
      if (!searchValue) {
        return;
      }

      const responseStores = await StoreService.searchStore(searchValue);

      setRestaurants(responseStores);
    } catch (error) {
      NotificationsFlash.disconnectedWire();
    }
  }

  return (
    <Container>
      <ContainerInTop>
        <ContainerSearch>
          {SearchBarRender()}
          {searchIsEnable && <XCircle onPress={handleCloseSearch} />}
        </ContainerSearch>
        {!searchIsEnable && (
          <ContainerLocation>
            <LocationSelector />
          </ContainerLocation>
        )}
      </ContainerInTop>
      {searchCallback && (
        <React.Fragment>
          <SubtitleSearch>Buscar por</SubtitleSearch>
          <ConfirmPressableSearch onPress={handleSearch}>
            <SearchValue>{searchCallback}</SearchValue>
          </ConfirmPressableSearch>
        </React.Fragment>
      )}
    </Container>
  );
};

export { CommandUserBar };
