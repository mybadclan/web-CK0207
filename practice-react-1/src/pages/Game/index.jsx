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

  function updateGameScore(isTeamOne) {
    if (data.gameInfo.isOver) return;

    const originalScore = data.gameInfo.score;
    const updatedGameScore = isTeamOne
      ? {
          ...originalScore,
          teamOne: originalScore.teamOne + 1,
        }
      : { ...originalScore, teamTwo: originalScore.teamTwo + 1 };

    const gameMode = data.gameInfo.gameMode;

    function flipPlayer(player) {
      return player == "playerOne" ? "playerTwo" : "playerOne"
    }

    function computeNextServe({ onTieBreakOnly = false, useTiebreakHelper  = false}) {
      // should be called when we need to update the current serve
      // return a object with teamOne, teamTwo (with updated serves), and maybe a object
      // with tiebrake-related utility information

      const ignoreNonTieBreak = !!onTieBreakOnly
      if (ignoreNonTieBreak && gameMode == REGULAR_MODE) return {}

      const isTeamOneWithServe = !!useTiebreakHelper ? data.tiebrakeHelp.startedWithTeamOne : data.teamOne.currentlyServe != ""
      const teamOne = isTeamOneWithServe ? {
        ...data.teamOne,
        currentlyServe: "",
        lastServe: data.teamOne.currentlyServe,
      } : {
        ...data.teamOne,
        currentlyServe: flipPlayer(data.teamOne.lastServe),
      }

      const teamTwo = isTeamOneWithServe ? {
        ...data.teamTwo,
        currentlyServe: flipPlayer(data.teamTwo.lastServe),
      } : {
        ...data.teamTwo,
        currentlyServe: "",
        lastServe: data.teamTwo.currentlyServe,
      }

      if (gameMode == REGULAR_MODE || useTiebreakHelper) return {
        teamOne, teamTwo, tiebrakeHelp: {
          startedWithTeamOne: !isTeamOneWithServe,
          count: 0
        }
      }

      const tieBreakHelp = data.tiebrakeHelp
      const tieBreakCount = tieBreakHelp.count

      if (tieBreakCount % 2 == 0) return {
        teamOne, teamTwo, tiebrakeHelp: {
          ...tieBreakHelp,
          count: tieBreakCount + 1
        }
      }

      if (tieBreakCount % 2 != 0) return {
        tiebrakeHelp: {
          ...tieBreakHelp,
          count: tieBreakCount + 1
        }
      }
    }

    function wonGame() {
      if (gameMode === REGULAR_MODE)
        return updatedGameScore.teamOne === 4 || updatedGameScore.teamTwo === 4;
      const { teamOne, teamTwo } = updatedGameScore;

      if (gameMode === TIEBRAKE_MODE)
        return (
          Math.abs(teamOne - teamTwo) >= 2 &&
          (updatedGameScore.teamOne >= 7 || updatedGameScore.teamTwo >= 7)
        );
      if (gameMode === SUPERTIEBRAKE_MODE)
        return (
          Math.abs(teamOne - teamTwo) >= 2 &&
          (updatedGameScore.teamOne >= 10 || updatedGameScore.teamTwo >= 10)
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
          ...computeNextServe({})
        });

        return;
      }

      function wonSet() {
        if (gameMode === REGULAR_MODE) {
          return (
            Math.abs(updatedSetScore.teamOne - updatedSetScore.teamTwo) >= 2 &&
            (updatedSetScore.teamOne >= 6 || updatedSetScore.teamTwo >= 6)
          );
        }

        // if game was tiebrake or supertiebrake, that means the set was won
        return true;
      }

      // if set was won, maybe match was won or we're going to a super tiebrake
      if (wonSet()) {
        const { bestOfThreeSets, lastSetIsSupertiebrake } = data.gameInfo;
        const finalSet = bestOfThreeSets ? currentSet === 2 : true;

        const nextIsSuperTieBrake =
          data.currentSet === 1 && bestOfThreeSets && lastSetIsSupertiebrake;

        // if we're at final set and somebody won, so the game must have a winner
        // otherwise, we compute the team scores and see if somebody has 2 points (a 2 x 0 game maybe)
        // note: if the game is a best of 1, then the set is the final set

        const teamsSetScore = newSets.reduce((previous, current) => {
         return current.teamOne > current.teamTwo ?
           { ...previous, teamOne: previous.teamOne + 1 } :
           { ...previous, teamTwo: previous.teamTwo + 1 };
        }, { teamOne: 0, teamTwo: 0 });

        const wonMatch = finalSet || teamsSetScore.teamOne == 2 || teamsSetScore.teamTwo == 2;
        if (wonMatch) {
          // if game was a supertiebraker, we use the score from the supertiebraker game as
          // set score, otherwise, just use the regular set score
          if (gameMode === SUPERTIEBRAKE_MODE) {
            newSets[currentSet] = updatedGameScore;
          }

          setData({
            ...data,
            gameInfo: {
              ...data.gameInfo,
              sets: newSets,
              isOver: true
            },
          });
          return;
        }

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
            ...computeNextServe({ useTiebreakHelper: true })
          });

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
          ...computeNextServe({ useTiebreakHelper: true })
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
        ...computeNextServe({})
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
      ...computeNextServe({ onTieBreakOnly: true })
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
            isOver={data.gameInfo.isOver}
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

        <button className="btn btn-secondary">Desfazer ponto</button>

        <button className="btn btn-danger">Reiniciar partida</button>
      </Col>
    </Page>
  );
}
