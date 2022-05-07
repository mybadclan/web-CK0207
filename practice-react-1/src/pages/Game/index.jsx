import { Page, ScoreBoard, Players } from "../../components";
import { Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Score } from "../../components/Score";
import {
  REGULAR_MODE,
  SUPERTIEBRAKE_MODE,
  TIEBRAKE_MODE,
} from "../../constants/game-modes";

export function Game({ data = {}, setData = () => {} }) {
  console.log(data);

  function updateGameScore(isTeamOne) {
    const originalScore = data.gameInfo.score;
    const updatedGameScore = isTeamOne
      ? {
          ...originalScore,
          teamOne: originalScore.teamOne + 1,
        }
      : { ...originalScore, teamTwo: originalScore.teamTwo + 1 };

    const gameMode = data.gameInfo.gameMode;

    function wonGame() {
      if (gameMode === REGULAR_MODE)
        return updatedGameScore.teamOne === 4 || updatedGameScore.teamTwo === 4;
      const { teamOne, teamTwo } = updatedGameScore;

      if (gameMode === TIEBRAKE_MODE)
        return (
          Math.abs(teamOne - teamTwo) >= 2 &&
          (updatedGameScore.teamOne === 7 || updatedGameScore.teamTwo === 7)
        );
      if (gameMode === SUPERTIEBRAKE_MODE)
        return (
          Math.abs(teamOne - teamTwo) >= 2 &&
          (updatedGameScore.teamOne === 10 || updatedGameScore.teamTwo === 10)
        );
    }

    // if won game, we must update the set score and restart the game.
    if (wonGame()) {
      const { currentSet } = data;
      const originalSetScore = data.gameInfo.sets[currentSet];
      const updatedSetScore = isTeamOne
        ? {
            ...originalSetScore,
            teamOne: originalSetScore.teamOne + 1,
          }
        : { ...originalSetScore, teamTwo: originalSetScore.teamTwo + 1 };

      // if current game was tiebrake, that means a set was won
      // if current game was super tiebrake, that means set was won
      // if current game was regular game, maybe we won a set or we're going to a tiebrake

      const nextGameIsTieBrake =
        gameMode === REGULAR_MODE &&
        updatedSetScore.teamOne === 6 &&
        updatedSetScore.teamTwo === 6;
      const newSets = [...data.gameInfo.sets];
      newSets[currentSet] = updatedSetScore;

      if (nextGameIsTieBrake) {
        setData({
          ...data,
          gameInfo: {
            ...data.gameInfo,
            gameMode: TIEBRAKE_MODE,
            sets: newSets,
            score: {
              teamOne: 0,
              teamTwo: 0,
            },
          },
        });

        return;
      }

      function setWon() {
        if (gameMode === REGULAR_MODE) {
          return (
            Math.abs(updatedSetScore.teamOne - updatedSetScore.teamTwo) >= 2 &&
            (updatedSetScore.teamOne === 6 || updatedSetScore.teamTwo === 6)
          );
        }

        // if game was tiebrake or supertiebrake, that means the set was won
        return true;
      }

      // if set was won, maybe match was won or we're going to a super tiebrake
      if (setWon()) {
        const { bestOfThreeSets, lastSetIsSupertiebrake } = data.gameInfo;
        const finalSet = bestOfThreeSets ? currentSet === 2 : true;

        const nextIsSuperTieBrake =
          data.currentSet === 2 && bestOfThreeSets && lastSetIsSupertiebrake;

        if (nextIsSuperTieBrake) {
          // means match has no winner yet, so we just continue to a supertiebrake
          setData({
            ...data,
            currentSet: currentSet + 1,
            gameInfo: {
              ...data.gameInfo,
              gameMode: SUPERTIEBRAKE_MODE,
              sets: [...newSets, { teamOne: 0, teamTwo: 0 }],
              score: {
                teamOne: 0,
                teamTwo: 0,
              },
            },
          });

          return;
        }

        // if set was won, and we're at final set.. so game is over
        const wonMatch = finalSet;
        if (wonMatch) {
          // game has winner
          return;
        }

        setData({
          ...data,
          currentSet: currentSet + 1,
          gameInfo: {
            ...data.gameInfo,
            gameMode: REGULAR_MODE,
            sets: [...newSets, { teamOne: 0, teamTwo: 0 }],
            score: {
              teamOne: 0,
              teamTwo: 0,
            },
          },
        });

        return;
      }

      setData({
        ...data,
        gameInfo: {
          ...data.gameInfo,
          sets: newSets,
          score: {
            teamOne: 0,
            teamTwo: 0,
          },
        },
      });

      return;
    }

    // in case game wasn't won, so we didn't had to update the set, the only thing that changes
    // is the current game score, so we update the state accordingly

    // ...
    setData({
      ...data,
      gameInfo: {
        ...data.gameInfo,
        score: updatedGameScore,
      },
    });
  }

  return (
    <Page className={styles.game}>
      <ScoreBoard data={data}>
        <Col className="col-10">
          <Players players={data.teamOne} />
          <Players players={data.teamTwo} />
        </Col>
        <Col className="col-2 m-0 p-0">
          <Score
            mode={data.gameInfo.gameMode}
            sets={data.gameInfo.sets}
            score={data.gameInfo.score}
          ></Score>
        </Col>
      </ScoreBoard>

      <Col className="mt-4 d-flex align-items-center justify-content-between">
        <button
          onClick={() => updateGameScore(true)}
          className="btn btn-primary"
        >
          Ponto Time 1
        </button>

        <button
          onClick={() => updateGameScore(false)}
          className="btn btn-primary"
        >
          Ponto Time 2
        </button>

        <button className="btn btn-secondary">Desfazer ponto Time 1</button>
        <button className="btn btn-secondary">Desfazer ponto Time 2</button>

        <button className="btn btn-danger">Reiniciar partida</button>
      </Col>
    </Page>
  );
}
