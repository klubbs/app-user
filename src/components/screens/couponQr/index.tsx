import React, { useState, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/appStackTypes';
import { EstablishmentCardQr } from '../../components/CardEstablishmentQr';
import {
  BottomContainer, TopContainer, Wrapper, FlatListComponent, AnimatedWrapper, BackgroundCoupon,
  SubtitleHelp, ImageInfluencer, EmptyImage
} from './styles';
import { MasterCouponDetailQrModal } from '../../screensModals/masterCouponDetailQrModal';
import { IMasterCouponQrDetails } from './@types';
import { AuthContext } from '../../../contexts/authContext';
import { UserIcon } from '../../../../assets/icons/user_icon';
import { isIphoneX } from '../../../utils/iphoneHelper';


export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const { user } = useContext(AuthContext)

  const [activeMasterCoupon, setActiveMasterCoupon] = useState<IMasterCouponQrDetails | null>(null)

  function handlePressableCoupon(item: IMasterCouponQrDetails) {
    setActiveMasterCoupon(item)
  }

  function RenderEstablishmentCard({ item }: { item: IMasterCouponQrDetails }): JSX.Element {
    return (
      <AnimatedWrapper>
        <EstablishmentCardQr
          onLongPress={() => handlePressableCoupon(item)}
          off={item.master_coupon_off_percentual}
          image={item.establishment_image}
        />
      </AnimatedWrapper>
    )
  }

  function RenderInfluencerImage(): JSX.Element {

    return (
      <>
        {
          route.params.influencer_image !== ''
          && <ImageInfluencer source={{ uri: route.params.influencer_image }} />
        }
        {!route.params.influencer_image &&
          <EmptyImage>
            <UserIcon width={25} height={25} fill={colors.COLOR_BLACK40} />
          </EmptyImage>
        }
      </>
    )
  }

  return (
    <Wrapper>
      <RenderInfluencerImage />
      <BackgroundCoupon />
      <TopContainer>
        <QRCode
          value={`${route?.params?.coupon_id}|${user?.id}`}
          logo={require('../../../../assets/images/klubbsLogoCircle.png')}
          size={isIphoneX() ? 195 : 180}
          color={colors.COLOR_SECUNDARY_BLACK}
        />
      </TopContainer>

      <BottomContainer>

        <FlatListComponent
          data={route.params.master_coupons as IMasterCouponQrDetails[]}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (<RenderEstablishmentCard item={item as IMasterCouponQrDetails} />)
          }}
        />
        <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      </BottomContainer>
      {
        activeMasterCoupon && <MasterCouponDetailQrModal data={activeMasterCoupon} onClose={() => setActiveMasterCoupon(null)} />
      }
    </Wrapper>
  );
}
