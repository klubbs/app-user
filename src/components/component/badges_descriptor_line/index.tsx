import React from 'react';

import { Feather } from '@expo/vector-icons';

import { ContainerBadge, Description, DescriptionPrincipal, ContainerDescription } from './styles';
import { IBadgesDescriptorLine } from './interfaces';

const BadgesDescriptorLine: React.FC<IBadgesDescriptorLine> = (props) => {
  return (
    <ContainerBadge>
      <Description>{props.text}</Description>
      <ContainerDescription>
        {props.icon && <Feather name={props?.icon} size={15} style={{ right: 5 }} color={props.color} />}
        <DescriptionPrincipal color={props.color}>{props.secundaryText}</DescriptionPrincipal>
      </ContainerDescription>
    </ContainerBadge>
  );
}

export default BadgesDescriptorLine;
