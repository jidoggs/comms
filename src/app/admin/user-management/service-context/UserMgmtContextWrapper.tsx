// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { createContext, useState } from 'react';
import { message, TabsProps } from 'antd';
import { ContextWapper, Role, UserMgmtDataContextType } from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import useRoles from '../../hooks/useRoles';

export const UserMgmtDataContext = createContext<UserMgmtDataContextType>(null);

const tabItemList: TabsProps['items'] = [
  {
    key: 'roles-permissions',
    label: 'Roles & Permissions',
  },
  {
    key: 'users',
    label: 'Users',
  },
];

export const initialNewRole = { name: '', _id: 0 };

function PeopleListContextWrapper({ children }: ContextWapper) {
  const roleProps = useRoles({
    get_all: true,
    create: true,
    add_permission_to_role: true,
    update: true,
  });

  const {
    createRoleSwr,
    getListSwr,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    getItemSwr,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    updateItemSwr,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    deleteItemSwr,
    addPermissionSwr,
    getAllPermissionsSwr,
  } = roleProps;

  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
  });
  const dataSource =
    tabs.tabItem === 'pending' ? dummyPersonsPending : dummyPersons;

  const [newRoles, setNewRoles] = useState<Role[]>([]);
  const [updateRoleData, setUpdateRoleData] = useState({
    name: '',
    _id: 0,
  });
  const [updateNewRoleData, setUpdateNewRoleData] = useState(initialNewRole);
  const [editedRole, setEditedRole] = useState<any>();
  const [editRole, setEditRole] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<number>(0);

  const handleDelete = (id: string | number) => {
    console.log(id); //eslint-disable-line
  };
  const handleAdd = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { trigger: createRoleTrigger, isMutating: createRoleIsMutating } =
    createRoleSwr;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { trigger: addPermissionTrigger } = addPermissionSwr;

  const allRoles =
    getListSwr && getListSwr.data && (getListSwr.data.data as any);

  const allPermissions =
    getAllPermissionsSwr &&
    getAllPermissionsSwr.data &&
    getAllPermissionsSwr.data.data;

  const submitNewRole = () => {
    if (updateNewRoleData.name === '') {
      return null;
    } else {
      createRoleTrigger({
        data: { name: updateNewRoleData.name },
        type: 'post',
      }).then((res) => {
        message.success(res.message);
        setUpdateNewRoleData && setUpdateNewRoleData(initialNewRole);
      });
    }
  };

  const addRole = () => {
    const newRole = {
      _id: allRoles.length + 1,
      name: '', // Set to empty initially
      role: '', // Set to empty initially
      permissions: [],
    };
    setNewRoles && setNewRoles([newRole]);
  };

  const updateExitingRole = () => {
    createRoleTrigger({
      data: { name: updateRoleData.name },
      type: 'post',
    }).then((res) => {
      message.success(res.message);
    });
  };

  const handleNameChange = ({ name, _id }: any) => {
    setEditedRole &&
      setEditedRole({
        ...editedRole,
        name: name,
        _id: _id,
      });
  };

  const handleAddPermission = (permissionId: any) => {
    const specificPermission =
      Array.isArray(allPermissions) &&
      allPermissions.find((permis: any) => permis._id === permissionId);

    const updatedPermissions =
      editedRole && editedRole.permissions
        ? [...editedRole.permissions, permissionId]
        : [specificPermission._id];
    setEditedRole &&
      setEditedRole({
        ...editedRole,
        permissions: updatedPermissions,
      });
  };

  const handleRemovePermission = (permissionId: any) => {
    const updatedPermissions = editedRole.permissions.filter(
      (perm: any) => perm !== permissionId
    );
    setEditedRole &&
      setEditedRole({
        ...editedRole,
        permissions: updatedPermissions,
      });
  };

  const handleCancelPermission = (
    permission: string,
    type: 'parastatals' | 'offices' | 'departments'
  ) => {
    // Remove the permission from the role's permissions list
    // eslint-disable-next-line no-console
    console.log(`Removing permission "${permission}" from ${type}`);
  };

  const options = Array.isArray(allPermissions)
    ? allPermissions.map((permission: any) => permission)
    : [];

  return (
    <UserMgmtDataContext.Provider
      value={{
        ...tabs,
        handleAdd,
        // columns,
        dataSource,
        handleDelete,
        tabItemList,
        newRoles,
        setNewRoles,
        updateRoleData,
        setUpdateRoleData,
        updateNewRoleData,
        setUpdateNewRoleData,
        editedRole,
        setEditedRole,
        editRole,
        setEditRole,
        currentRole,
        allRoles,
        setCurrentRole,
        submitNewRole,
        addRole,
        updateExitingRole,
        handleNameChange,
        handleAddPermission,
        handleRemovePermission,
        handleCancelPermission,
        options,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default PeopleListContextWrapper;
