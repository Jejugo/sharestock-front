import React from 'react';
import indicatorsValidator from '../../../validations/indicators';
import FrameItem from './FrameItem/FrameItem';
import * as S from './styles.js';

const listClass = 'share__desc';

export default function Frames({ filteredItems, goToFundamentus }) {
  return (
    <S.FrameList id="share-data" className="list__shares">
      {filteredItems.map((item, index) => (
        <FrameItem
          key={index}
          item={item}
          goToFundamentus={goToFundamentus}
          indicatorsValidator={indicatorsValidator}
          listClass={listClass}
        />
      ))}
    </S.FrameList>
  );
}
