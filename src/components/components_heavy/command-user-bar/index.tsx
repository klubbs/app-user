import React, { useContext, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { LocationSelector } from '../../components/LocationSelector';
import { colors } from '../../../../assets/constants/colors';
import { ContainerLocation, SearchPressable, ContainerSearch, Input } from './styles';
import { HomeContext } from '../../../contexts/home-context';

const CommandUserBar: React.FC = () => {
  const { searchValue, setSearchValue, searchIsEnable } = useContext(HomeContext);

  const WIDTH_SEARCH_ANIM = searchIsEnable ? 250 : 35;
  const MARGIN_SEARCH_ANIM = searchIsEnable ? 40 : 0;

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const timeInMilisecondsToSearch = 1000;

    const timer = setTimeout(() => {
      console.log('Acho que deu bom');
    }, timeInMilisecondsToSearch);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function SearchBarRender() {
    return (
      <SearchPressable
        onPress={() => setSearchValue('')}
        animate={{
          width: WIDTH_SEARCH_ANIM,
          marginRight: MARGIN_SEARCH_ANIM,
        }}
        transition={{
          type: 'spring',
        }}
      >
        {searchIsEnable && <Input value={searchValue ?? ''} onChangeText={setSearchValue} />}
        {!searchIsEnable && <Feather name={'search'} size={16} color={colors.COLOR_BLACK40} />}
      </SearchPressable>
    );
  }

  return (
    <>
      <ContainerSearch>
        {SearchBarRender()}
        {searchIsEnable && (
          <Feather
            name={'x-circle'}
            size={16}
            color={colors.COLOR_BLACK40}
            onPress={() => setSearchValue(null)}
          />
        )}
      </ContainerSearch>
      {!searchIsEnable && (
        <ContainerLocation>
          <LocationSelector />
        </ContainerLocation>
      )}
    </>
  );
};

export { CommandUserBar };
