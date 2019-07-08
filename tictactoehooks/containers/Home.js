import React, { useContext, useEffect, useCallback } from "react";
import { Text, Button, SafeAreaView } from "react-native";
import styled from "styled-components";
import TicTacContext from "../context/TicTacContext";
import {
  FIRST_PLAYER,
  SECOND_PLAYER,
  WITHOUT_WINNER
} from "../hooks/TicTacHooks";
import TicTacProvider from "../provider/TicTacProvider";
import _ from "lodash";
import DialogUtil from "../commons/DialogUtil";

const ContainerGame = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContainerTable = styled.View`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

const OptionGame = styled.View`
  flex-basis: 30%;
  height: 100px;
`;

const SelectArea = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const {
    cleanGame,
    game: { matrix, winnerPlayer, playing, count }
  } = useContext(TicTacContext);

  const showWinnerPlayer = useCallback(async () => {
    let message;
    switch (winnerPlayer) {
      case FIRST_PLAYER:
        message = "Jogador 1 venceu!";
        break;

      case SECOND_PLAYER:
        message = "Jogador 2 venceu!";
        break;

      case WITHOUT_WINNER:
        message = "Jogo empatado!";
        break;
    }
    const messages = [];
    messages.push({ message, actionPositive: cleanGame });
    if (count % 5 === 0) {
      messages.push({
        message: "Seja um profissional e compre nosso curso de Tic Tac Toe"
      });
    }
    await DialogUtil.showMessages(messages);
  }, [winnerPlayer, count, cleanGame]);

  const showRestartGame = useCallback(() => {
    DialogUtil.showMessage({
      message: "Deseja reiniciar o jogo ?",
      textPositive: "Sim",
      actionPositive: cleanGame,
      textNegative: "Não"
    });
  }, [cleanGame]);

  useEffect(() => {
    if (winnerPlayer) {
      showWinnerPlayer();
    }
  }, [winnerPlayer, showWinnerPlayer]);

  return (
    <ContainerGame>
      <ContainerTable>
        {_.map(matrix, (a, row) =>
          _.map(a, (b, column) => (
            <RenderItem key={`${row}-${column}`} postion={{ row, column }} />
          ))
        )}
      </ContainerTable>
      {playing && (
        <Button
          title="Reiniciar Jogo"
          onPress={showRestartGame}
          color="black"
        />
      )}
    </ContainerGame>
  );
};

const RenderItem = ({ postion }) => {
  const {
    setSelectedItem,
    game: { matrix }
  } = useContext(TicTacContext);
  const { row, column } = postion;
  const backgroundColor = (row + column) % 2 == 0 ? "#C0C0C0" : "#DCDCDC";
  return (
    <OptionGame backgroundColor={backgroundColor}>
      <SelectArea onPress={() => setSelectedItem(postion)}>
        <Text>{matrix[row][column]}</Text>
      </SelectArea>
    </OptionGame>
  );
};

export default () => (
  <TicTacProvider>
    <Home />
  </TicTacProvider>
);
