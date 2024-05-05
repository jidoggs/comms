import React from 'react';
import Title from './Title';
import { Link } from './icons';
import { copyTextToClipboard } from '../utils';

type Props = {
  title: string;
  hasLink?: boolean;
  linkRef?: string;
};

function CustomModalTitle({ title, hasLink, linkRef }: Props) {
  const clickHandler = () => {
    if (!linkRef) return;
    copyTextToClipboard('/onboarding/personal-info' + linkRef);
  };

  return (
    <div className="mr-11 flex items-center justify-between">
      <Title tag="h2" className="text-xl leading-6">
        {title}
      </Title>
      {hasLink ? (
        <button className="flex items-center gap-x-2" onClick={clickHandler}>
          <span className="text-custom-purple_100">
            <Link size={20} />
          </span>
          <Title tag="span" className="text-custom-purple_100">
            copy link
          </Title>
        </button>
      ) : null}
    </div>
  );
}

export default CustomModalTitle;
