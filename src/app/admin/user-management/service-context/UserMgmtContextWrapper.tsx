// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { createContext, useState } from 'react';
import { TabsProps, message } from 'antd';
import {
  ContextWapper,
  Role,
  UserMgmtDataContextType,
} from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import TableRowAction from '../components/TableRowAction';
import { mergeClassName } from '@/common/utils';
import useRoles from '../../hooks/useRoles';
import { EditableTableColumnTypes } from '../../people/types';

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

// TODO: MOVE TO HELPER
const onboardingKeys = [
  'email',
  'full_name',
  'role',
  'title',
  'parastatal',
  'date_sent',
  '',
];
const personKeys = [
  'full_name',
  'role',
  'email',
  'title',
  'office',
  'parastatal',
  'last_active',
  'date_created',
  '',
];

const defaultColumns: (EditableTableColumnTypes[number] & {
  dataIndex: string;
})[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: 'full_name',
    width: 180,
    ellipsis: true,
    render: (value: any) => {
      return (
        <>
          {value ? (
            <div className="flex items-center gap-x-2.5">
              <div className="size-7 rounded-full bg-red-500" />
              <span>{value}</span>
            </div>
          ) : null}
        </>
      );
    },
  },
  {
    title: 'Role',
    className: '',
    dataIndex: 'role',
    ellipsis: true,
    width: 200,
  },
  {
    title: 'Email',
    className: '',
    dataIndex: 'email',
    ellipsis: true,
    width: 200,
  },
  {
    title: 'Title',
    className: '',
    dataIndex: 'title',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Office',
    className: '',
    dataIndex: 'office',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Parastatal',
    className: '',
    dataIndex: 'parastatal',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_active',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'date_created',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Date sent',
    className: '',
    dataIndex: 'date_sent',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Actions',
    className: '!pr-3',
    dataIndex: '',
    ellipsis: true,
    width: 65,
    render: (_: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));
export const initialNewRole = { name: '', _id: 0 };

function UserMgmtContextWrapper({ children }: ContextWapper) {
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

  const columns = defaultColumns
    .filter((itm) =>
      tabs.tabItem === 'pending'
        ? onboardingKeys.includes(itm.dataIndex)
        : personKeys.includes(itm.dataIndex)
    )
    .map((itm) => {
      if (tabs.tabItem === 'pending') {
        if (itm.dataIndex === 'email') {
          return {
            ...itm,
            render: (value: any) => {
              return (
                <>
                  {value ? (
                    <div className="flex items-center gap-x-2.5">
                      <div className="size-7 rounded-full bg-red-500" />
                      <span>{value}</span>
                    </div>
                  ) : null}
                </>
              );
            },
          };
        }
        if (itm.dataIndex === 'full_name') {
          return {
            ...itm,
          };
        }
      }
      return itm;
    });

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
        columns,
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

export default UserMgmtContextWrapper;
