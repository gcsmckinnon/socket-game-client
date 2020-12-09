import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { UserContext } from '../Authentication/UserProvider';
import { GlobalStoreContext } from '../shared/Globals';
import { NotificationContext } from '../shared/Notifications';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Header from '../shared/Header';

const Game = () => {
  const { user } = useContext(UserContext);
  const [game, setGame] = useState({});
  const [client, setClient] = useState();
  const { globalStore } = useContext(GlobalStoreContext);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    const socketClient = new W3CWebSocket(`${globalStore.REACT_APP_SOCKET}/games/${user.token}`);

    socketClient.onopen = () => {
      setClient(socketClient);
    };

    socketClient.onmessage = parseMessage;
  }, []);

  const parseMessage = ({ data }) => {
    try {
      const { game: wsGame } = JSON.parse(data);
  
      if (wsGame) {
        setGame({ ...game, ...wsGame });

        if (wsGame.message) {
          try {
            setNotification({...wsGame.message});
          } catch (error) {
            console.log("ISSUE WITH MESSAGE: ", wsGame.message);
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      setNotification({
        type: 'danger',
        message: "There was an error connecting to the gamel"
      });
    }
  };

  const handleGuess = num => {
    if (client) {
      client.send(JSON.stringify({
        user,
        guess: num
      }));
    }
  }

  return (
    game && client ? (
      <Container>
        <Header title="Welcome to the GAME"/>

        <Row>
          <Col>
            <p>Guess a number between 1 and 10</p>
            {Array(10).fill(null).map((_, i) => (
              <Button
                className="btn-lg"
                key={i}
                style={{ margin: '0.5em' }}
                onClick={() => handleGuess(i + 1)}
              >{i + 1}</Button>
            ))}
          </Col>

          <Col>
            <ul>
              {game.scores ? game.scores.map((score, i) => (
                <li key={i}>
                  <Row>
                    <Col>{score.user.name}</Col>
                    <Col>{score.score}</Col>
                  </Row>
                </li>
              )) : null}
            </ul>
          </Col>
        </Row>

        <Row>
          <Col>
            <p><strong>Current Players:</strong></p>

            {game && game.players ? (
              game.players.map((player, i) => (
                <span key={i}>{player}<br/></span>
              ))
            ) : null}
          </Col>
        </Row>
      </Container>
    ) : null
  );
}
 
export default Game;