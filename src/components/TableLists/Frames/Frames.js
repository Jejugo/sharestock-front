import React from 'react';
import { validator } from '../../../validations/indicators';
import FrameItem from './FrameItem/FrameItem';

const listClass = 'share__desc';

export default function Frames({ filteredItems, goToFundamentus }) {
  return (
    <>
      <section id="share-data" className="list__shares">
        {filteredItems.map((item, index) => (
          <FrameItem
            item={item}
            index={index}
            goToFundamentus={goToFundamentus}
            validator={validator}
            listClass={listClass}
          />
        ))}
      </section>
      <style jsx>{`
        .list__shares {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
