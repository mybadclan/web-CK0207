import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export function useGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const [game, setGame] = useState({});

  useEffect(() => {
    const { search } = location;

    if (!search) {
      navigate('/')
    } else {
      const searchParams = new URLSearchParams(search);
      const game = searchParams.get('game');

      setGame(JSON.parse(game));
    }

  }, [location, navigate]);

  return useMemo(() => game, [game]);
}