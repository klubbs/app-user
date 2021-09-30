import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { StarFilledIcon } from '../../../../assets/icons/star-filled_icon';


const MAX_RATING = 5;

const Ratings: React.FC<{ rating: number }> = ({ rating }) => {


  const offStars = MAX_RATING - rating;

  function RenderRatings() {

    var rows = [];

    for (let index = 0; index < rating; index++) {
      rows.push(<StarFilledIcon
        width={11}
        height={11}
        fill={COLORS.COLOR_YELLOW_RATING}
        style={{ marginRight: 2 }}
        key={index}
      />)
    }

    return rows;
  }


  function RenderOffRatings() {

    var rows = [];

    for (let index = 0; index < offStars; index++) {
      rows.push(<StarFilledIcon width={11} height={11} fill={COLORS.COLOR_BLACK20} style={{ marginRight: 2 }} key={index} />)
    }

    return rows;
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {RenderRatings()}
      {RenderOffRatings()}
    </View>
  );
}

export { Ratings };
