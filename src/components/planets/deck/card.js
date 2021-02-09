import React from 'react';
import PlanetDetails from './details';
import { motion } from 'framer-motion';

export default function Card({ planet }) {
  return (
    <motion.li
      layout
      className="col-span-1 flex flex-col text-center bg-gray-100 rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="flex-1 flex flex-col p-8">
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
          src={planet.photo}
          alt={planet.name}
          title={planet.name}
        />
        <div className="mt-8">
          <PlanetDetails planet={planet} />
        </div>
      </div>
    </motion.li>
  );
}
