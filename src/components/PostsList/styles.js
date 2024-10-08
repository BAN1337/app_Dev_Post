import styled from "styled-components/native";

export const Container = styled.View`
    margin: 8px 6px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18,18,18, 0.2);
    elevation: 3;
    padding: 11px;
`

export const HeaderPost = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 6px;
`

export const Name = styled.Text`
    color: #353840;
    font-size: 18px;
    font-weight: bold;
`

export const ContentView = styled.View`

`

export const Content = styled.Text`
    color: #353840;
    margin: 5px 0px;
`

export const Actions = styled.View`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`
export const LikeButton = styled.TouchableOpacity`
    width: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

export const LikeAmount = styled.Text`
    color: #e52246;
    margin-right: 3px;
`

export const TimePost = styled.Text`
    color: #121212;
`