import React, { useState } from 'react';
import Title from './Title';
import { copyTextToClipboard } from '../utils';
import Link from './icons/Link';
import Tick from './icons/Tick';

type Props = {
  title: string;
  hasLink?: boolean;
  linkRef?: string;
};

function CustomModalTitle({ title, hasLink, linkRef }: Props) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const clickHandler = () => {
    if (!linkRef) return;
    setIsLinkCopied(true);
    copyTextToClipboard(
      window.location.origin + '/onboarding' + linkRef
    ).then(() => {
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 3000);
    });
  };

  return (
    <div className="mr-11 flex items-center justify-between">
      <Title tag="h2" className="text-xl leading-6">
        {title}
      </Title>
      {isLinkCopied ? (
        <div className="flex items-center gap-x-2 text-custom-green_100">
          <Title tag="span" className="text-inherit">
            link copied!!
          </Title>
          <span>
            <Tick size={18} className="animate-ping" />
          </span>
        </div>
      ) : null}
      {hasLink && !isLinkCopied ? (
        <button
          className="flex items-center gap-x-2 text-custom-purple_100"
          onClick={clickHandler}
        >
          <span className="text-inherit">
            <Link size={20} />
          </span>
          <Title tag="span" className="text-inherit">
            copy link
          </Title>
        </button>
      ) : null}
    </div>
  );
}

export default CustomModalTitle;
