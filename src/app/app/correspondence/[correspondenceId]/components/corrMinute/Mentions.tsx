import React, { ChangeEvent, useState } from 'react';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import { User, iHandleKeyboard } from '@/types';
import CloseCircle from '@/common/components/icons/CloseCircle';

type CustomMentionProps = {
  data: Partial<User>[];
};

function CustomMention({ data = [] }: CustomMentionProps) {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Partial<User>[]>([]);
  const [searchResults, setSearchResults] = useState<Partial<User>[]>([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    const filtered = data.filter((item) => {
      return item?.firstname
        ?.toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setSearchResults(filtered);
  };

  const handleSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    res: Partial<User>
  ) => {
    setSearch(event.currentTarget.innerText);
    setSelectedUsers([...selectedUsers, res]);
    setSearch('');
    setSearchResults([]);
  };

  const actionsKeyboardHandler: iHandleKeyboard = (e) => {
    e.stopPropagation();
  };

  const handleRemove = (id: string) => {
    const filteredUsers = selectedUsers?.filter((user) => user?._id !== id);
    setSelectedUsers(filteredUsers);
  };

  return (
    <div className="mb-2">
      <div className="flex gap-1">
        <p>Primary:</p>
        <div className="flex gap-1">
          {selectedUsers?.map((user, idx) => (
            <div className="flex items-center gap-1" key={idx}>
              <CustomAvatar>{user?.firstname}</CustomAvatar>
              <p>{user?.firstname}</p>
              <CloseCircle
                onClick={() => handleRemove(user?._id as string)}
                cursor="pointer"
              />
            </div>
          ))}
        </div>
        <input
          className="!focus:ring-0 !focus:border-transparent border-0 !border-none !border-transparent"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {searchResults?.length > 0 && (
        <div>
          {searchResults?.map((result) => (
            <div
              key={result?._id}
              tabIndex={0}
              role="button"
              className="cursor-pointer"
              onKeyDown={actionsKeyboardHandler}
              onClick={(e) => handleSelect(e, result)}
            >
              <p>{result?.firstname}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomMention;
