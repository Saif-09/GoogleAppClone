export const openWebView = (url, navigation) => {
    navigation.navigate('WebView', {
        url: url
    })
}