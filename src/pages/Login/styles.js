import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #353840;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    color: #fff;
    font-size: 55px;
    font-weight: bold;
    font-style: italic;
`

export const Input = styled.TextInput`
    width: 80%;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    font-size: 17px;
`

export const Button = styled.TouchableOpacity`
    width: 80%;
    justify-content: center;
    align-items: center;
    background-color: #428cfd;
    margin-top: 10px;
    border-radius: 8px;
    padding: 10px;
`

export const TextButton = styled.Text`
    color: #fff;
    font-size: 20px;
`

export const SignUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`

export const SignUpTextButton = styled.Text`
    color: #ddd;
    font-size: 15px;
    font-style: italic;
`