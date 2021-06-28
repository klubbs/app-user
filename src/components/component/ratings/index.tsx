import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { StarFilledIcon } from '../../../../assets/icons/star-filled_icon';

// import { Container } from './styles';



const MAX_RATING = 5;

const Ratings: React.FC<{ rating: number }> = ({ rating }) => {


  const offStars = MAX_RATING - rating;

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        Array(rating).fill(<StarFilledIcon width={11} height={11} fill={COLORS.COLOR_YELLOW_RATING} style={{ marginRight: 2 }} />)
      }

      {
        Array(offStars).fill(<StarFilledIcon width={11} height={11} fill={COLORS.COLOR_BLACK20} style={{ marginRight: 2 }} />)
      }

    </View>
  );
}

export { Ratings };
