import React, { useMemo } from 'react';
import Select, { CSSObjectWithLabel, Props as SelectProps } from 'react-select';
import { StylesProps } from 'react-select/dist/declarations/src/styles';

export interface ISelectOption<ValueType> {
  label: string;
  value: ValueType;
}

export const defaultNumberSelectOption: ISelectOption<number> = {
  label: 'Select...',
  value: 0,
};

export const defaultStringSelectOption: ISelectOption<string> = {
  label: 'Select...',
  value: '',
};

export interface CommonSelectProps<Option, IsMulti extends boolean>
  extends Partial<
    Omit<
      SelectProps<Option, IsMulti>,
      'value' | 'onChange' | 'options' | 'styles'
    >
  > {
  value: SelectProps<Option, IsMulti>['value'];
  onChange: SelectProps<Option, IsMulti>['onChange'];
  options: SelectProps<Option, IsMulti>['options'];
  styles?: Partial<
    Record<
      keyof StylesProps<Option, IsMulti, never>,
      Record<string, string | number>
    >
  >;
}

const stylesComponents: (keyof StylesProps<
  ISelectOption<unknown>,
  boolean,
  never
>)[] = [
  'clearIndicator',
  'control',
  'dropdownIndicator',
  'group',
  'groupHeading',
  'indicatorsContainer',
  'indicatorSeparator',
  'input',
  'loadingIndicator',
  'menu',
  'menuList',
  'menuPortal',
  'loadingMessage',
  'noOptionsMessage',
  'multiValue',
  'multiValueLabel',
  'multiValueRemove',
  'option',
  'placeholder',
  'singleValue',
  'valueContainer',
];

export const CommonSelect = <Option, IsMulti extends boolean>(
  props: CommonSelectProps<ISelectOption<Option>, IsMulti>,
) => {
  const defaultStyles: CommonSelectProps<Option, IsMulti>['styles'] =
    useMemo(() => {
      return {
        menu: {
          marginBlock: 0,
          zIndex: 100,
        },
      };
    }, []);

  return (
    <Select<Readonly<ISelectOption<Option>>, IsMulti>
      {...props}
      classNamePrefix={props.classNamePrefix || 'react-select'}
      styles={Object.fromEntries(
        stylesComponents.map((item) => [
          item,
          (baseStyles: CSSObjectWithLabel) => ({
            ...baseStyles,
            ...(defaultStyles[item] || {}),
            ...((props.styles && props.styles[item]) || {}),
          }),
        ]),
      )}
    />
  );
};
