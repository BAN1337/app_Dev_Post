import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #353840;
`

export const UploadButton = styled.TouchableOpacity`
    margin-top: 20%;
    background-color: #fff;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    z-index: 8;
`

export const UploadText = styled.Text`
    font-size: 55px;
    position: absolute;
    color: #e52246;
    opacity: 0.5;
    z-index: 99;
`

export const Avatar = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
`

export const Name = styled.Text`
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
`

export const Email = styled.Text`
    color: #fff;
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 20px;
    font-size: 18px;
    font-style: italic;
`

export const Button = styled.TouchableOpacity`
    margin-top: 16px;
    background-color: ${props => props.bg};
    width: 80%;
    height: 50px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`

export const ButtonText = styled.Text`
    font-size: 18px;
    color: ${props => props.color};
    font-weight: bold;
    font-style: italic;
`

export const Modal = styled.Modal`
    align-self: flex-end;
`

export const ModalContainer = styled.KeyboardAvoidingView`
    background-color: #fff;
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 0;
    justify-content: center;
    align-items: center;
`

export const ButtonBack = styled.TouchableOpacity`
    flex-direction: row;
    position: absolute;
    left: 15px;
    top: 15px;
    align-items: center;
`

export const Input = styled.TextInput`
    background-color: #ddd;
    width: 90%;
    border-radius: 4px;
    padding: 10px;
    font-size: 17px;
    color: #121212;
    text-align: center;
`