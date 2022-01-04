import React,
{
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef
} from "react";

import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./style";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface IInputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFileed] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFileed(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}

        {...rest}
      />
    </Container>
  );
}


export default forwardRef(Input);