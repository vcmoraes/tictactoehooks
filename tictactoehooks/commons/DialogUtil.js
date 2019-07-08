import { Alert } from "react-native";

const showMessage = async ({
  message,
  textPositive = "OK",
  textNegative,
  actionPositive,
  actionNegative
}) =>
  new Promise(resolve => {
    if (!message) {
      return;
    }
    const buttons = [];
    if (textNegative) {
      buttons.push({
        text: textNegative,
        onPress: () => {
          actionNegative && actionNegative();
          resolve();
        }
      });
    }
    buttons.push({
      text: textPositive,
      onPress: () => {
        actionPositive && actionPositive();
        resolve();
      }
    });
    Alert.alert("", message, buttons, { cancelable: false });
  });

const showMessages = async messages => {
  for (const position in messages) {
    await showMessage(messages[position]);
  }
};

export default { showMessage, showMessages };
