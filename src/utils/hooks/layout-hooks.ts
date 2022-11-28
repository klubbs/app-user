import { useState, ComponentProps } from 'react';
import { View } from 'react-native';

export function useLayout() {
  const [layout, setLayout] = useState({ height: 0 });

  const onLayout: ComponentProps<typeof View>['onLayout'] = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout);
  };

  return [layout, onLayout] as const;
}
