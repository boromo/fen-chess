import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { gameStateFromInputString } from '../../utils';
import { Game } from '../Game';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultBoard = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

export function App() {
  const {location: { pathname } } = window;
  const [_, urlInput = ''] = [pathname[0], pathname.substring(1)];
  const [fen, setFen] = React.useState('');
  const [input, setInput] = React.useState(urlInput)

  const startGame = (mode: 'new' | 'preFilled') => {
    setInput(mode === 'new' ? defaultBoard : fen)
  }

  return (
    <div className="App">
      <Container>
        {input ? (
          <Game gameState={gameStateFromInputString(input)} />
        ) : (
          <>
            <h3>FEN Chess Game</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  value={fen}
                  onChange={({ target: { value } }) => {
                    setFen(value);
                  }}
                  required
                  placeholder="Chess FEN input"
                />
                <Form.Text className="text-muted">Optionally input your chess positions using FEN notation</Form.Text>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="secondary" type="submit" onClick={() => startGame('preFilled')}>
                  Start with FEN
                </Button>
              </div>
            </Form>
            <div className="d-grid gap-2">
              <Form.Text className="text-muted">Or</Form.Text>
              <Button variant="primary" type="submit" size="lg" onClick={() => startGame('new')}>
                New Game
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
