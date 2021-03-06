import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { AddButton } from './add-button';
import { RetroInput } from './retro-input';
import { RetroItem } from './retro-item';

export const COLUMN_TYPES = { KEEP_DOING: 'keepDoing', STOP_DOING: 'stopDoing', START_DOING: 'startDoing' };

export function RetroColumn({ type, items, addItem, removeItem, onLikeItem, onUnlikeItem, myPlayerId }) {
  const [addMode, setAddMode] = useState(false);

  const headers = {
    [COLUMN_TYPES.KEEP_DOING]: 'Keep Doing',
    [COLUMN_TYPES.STOP_DOING]: 'Stop Doing',
    [COLUMN_TYPES.START_DOING]: 'Start Doing'
  };

  const headerText = headers[type];

  function handleAdd(text) {
    setAddMode(false);
    addItem(text);
  }

  return (
    <Fragment>
      <div
        className={classNames('notification', {
          'is-info': type === COLUMN_TYPES.KEEP_DOING,
          'is-warning': type === COLUMN_TYPES.STOP_DOING,
          'is-success': type === COLUMN_TYPES.START_DOING
        })}>
        <div className="columns is-mobile is-vcentered">
          <div className="is-size-4 is-size-5-touch column">{headerText}</div>
          <div className="column is-1">
            <AddButton onClick={() => setAddMode(true)} />
          </div>
        </div>
      </div>
      {addMode && <RetroInput onClose={() => setAddMode(false)} onSubmit={text => handleAdd(text)} />}
      {items.map(item => (
        <RetroItem
          key={item.id}
          item={item}
          onRemove={() => removeItem(item.id)}
          onLike={() => onLikeItem(item.id)}
          onUnlike={() => onUnlikeItem(item.id)}
          hasVoted={item.votes.some(i => i.playerId === myPlayerId)}
        />
      ))}
    </Fragment>
  );
}
