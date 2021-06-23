import React from 'react';
import { IInputLine } from './interfaces';
import { ContainerInput } from './styles';


const InputLine: React.FC<IInputLine> = (props) => {

  return (
    <ContainerInput
      autoCapitalize='none'
      placeholder={props.placeHolder ?? ""}
      keyboardType={props.keyboardType}
      returnKeyType={props.returnkeyType}
      maxLength={props.maxLength}
      onChangeText={(e) => props.onChangeText(e)}
      textContentType={props.contentType}
      secureTextEntry={props?.isPassword}
      value={props.value}
      {...props.style}
    />
  );
}

export default InputLine;
