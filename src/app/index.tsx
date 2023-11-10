import { lazy } from 'react';

const Chess = lazy(() => import('ChessModule/ChessModule'));

export const App = () => {
  return (
    <div>
      sakdasb
      <Chess />
    </div>
  );
};
