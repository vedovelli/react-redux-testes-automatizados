import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlanets } from '../store/actions';
import { userPlanetList } from '../store/selectors/planets-selectors';
import Filters from './filters';
import Deck from '../components/planets/deck/main';

export default function Planets() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(store => store.planets);
  const list = useSelector(userPlanetList);

  useEffect(() => {
    dispatch(fetchPlanets());
  }, [dispatch]);

  return (
    <>
      {error ? <h4>So sorry...</h4> : null}
      {loading ? <h4>Loading...</h4> : null}
      {!loading ? (
        <>
          <div className="mb-5">
            <Filters />
          </div>
          <Deck dataSource={list} />
        </>
      ) : null}
    </>
  );
}
