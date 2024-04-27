/* eslint-disable no-console */
'use client';
// import CustomSelect from '@/common/components/CustomSelect';
import Title from '@/common/components/Title';
import React, { useState } from 'react';
import { Dropdown, Menu, message } from 'antd';
import { ArrowDown, CloseCircle } from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';
import useRoles from '../../hooks/useRoles';
// import useSession from '@/common/hooks/useSession';

const RoleTitle = ({ children }: any) => (
  <Title className="text-custom-gray_700">{children}</Title>
);

interface Permission {
  _id: string;
  name: string;
  code: string;
}

type PermissionType = 'parastatal' | 'office' | 'department';

function categorizePermissions(
  permissions: Permission[],
  permissionType: PermissionType
): string[] {
  const validTypes: string[] = [];

  switch (permissionType) {
    case 'parastatal':
      validTypes.push('parastatal', 'parastatals');
      break;
    case 'office':
      validTypes.push('office', 'offices');
      break;
    case 'department':
      validTypes.push('department', 'departments');
      break;
    default:
      break;
  }

  return permissions
    .filter((permission) =>
      validTypes.some((type) =>
        permission.name.toUpperCase().endsWith(type.toUpperCase())
      )
    )
    .map((permission) => permission.name.replace(/_/g, ' ')); // Replace underscore with space
}

const Permissions = ({ role }: any) => {
  //   const { isPrimaryAdmin } = useSession();
  const [selectedId, setSelectedId] = useState<string>('');
  const { updateItemSwr, getAllPermissionsSwr } = useRoles({
    get_all: true,
    update: true,
    _id: selectedId,
  });
  const { trigger: addPermissionTrigger } = updateItemSwr;

  const allPermissions =
    getAllPermissionsSwr &&
    getAllPermissionsSwr.data &&
    getAllPermissionsSwr.data.data;

  const options = Array.isArray(allPermissions)
    ? allPermissions.map(
        (permission: any) =>
          // permission.name.replace(/_/g, ' ')
          permission
      )
    : [];

  console.log('allPermissions', allPermissions);
  console.log('options', options);

  //   for (let i = 10; i < 36; i++) {
  //     options.push({
  //       label: i.toString(36) + i,
  //       value: i.toString(36) + i,
  //     });
  //   }

  //   const handleAddPermissionTrigger = (permission: string, role: any) => {
  //     console.log('permission', permission);
  //     // console.log('role', role);

  //     const datar = {
  //       name: role.name,
  //       status: 'add',
  //       permissions: [role._id],
  //       _id: selectedId,
  //       //   role: true,
  //       //   role: role.name,
  //     };
  //     console.log('datar', datar);

  //     addPermissionTrigger({
  //       data: datar,
  //       type: 'patch',
  //     }).then((res) => {
  //       message.success(res.message);
  //     });
  //   };

  const handleAddPermission = (
    permission: string,
    type: 'parastatals' | 'offices' | 'departments',
    role: any
  ) => {
    // Send the permission to the backend for the specific role and type (parastatals/offices/departments)
    // console.log(`Adding permission "${permission}" to ${type}`);
    console.log('selectedId', permission);

    setSelectedId(role._id);
    // handleAddPermissionTrigger(permission, role);

    const datar = {
      name: role.name,
      status: 'add',
      permissions: [permission],
      //   _id: selectedId,
      //   role: true,
      //   role: role.name,
    };
    // console.log('datar', datar);

    addPermissionTrigger({
      data: datar,
      type: 'patch',
    }).then((res) => {
      message.success(res.message);
    });
  };

  const handleCancelPermission = (
    permission: string,
    type: 'parastatals' | 'offices' | 'departments'
  ) => {
    // Remove the permission from the role's permissions list
    console.log(`Removing permission "${permission}" from ${type}`);
  };

  //   console.log('role?.permissions?.parastatals', role?.permissions?.parastatals);
  //   console.log('role', role);
  //   console.log(
  //     'role',
  //     role.permissions?.name?.endsWith('parastatals'.toUpperCase())
  //   );

  //   const submitNewPermission = () => {
  //     //   addPermissioTrigger({
  //     //     data: { name: updateRoleData.name },
  //     //     type: 'post',
  //     //   }).then((res) => {
  //     //     message.success(res.message);
  //     //   });
  //   };

  return (
    <div className="col-span-7 flex flex-col justify-between">
      {role.permissions ? (
        <div className="flex flex-col justify-between">
          <RoleTitle>Parastatal</RoleTitle>
          <div className="flex flex-row flex-wrap gap-2 py-2">
            {categorizePermissions(
              role.permissions,
              'parastatal' || 'parastatals'
            ).map((permission: any) => (
              <div
                key={permission}
                className="flex h-6 items-center rounded-md border border-custom-gray_400 p-1"
              >
                <Title>{permission}</Title>
                <button
                  onClick={() =>
                    handleCancelPermission(permission, 'parastatals')
                  }
                >
                  <CloseCircle size="18" />
                </button>
              </div>
            ))}
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }: any) =>
                    handleAddPermission(key.toString(), 'parastatals', role)
                  }
                >
                  {options.map((option) => (
                    <Menu.Item key={option?._id}>{option?.name}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <CustomButton
                type="primary"
                size="middle"
                className="flex !h-6 flex-row gap-1 !rounded-md !border !border-custom-gray_400 bg-custom-white_100"
              >
                <Title>Add</Title> <ArrowDown />
              </CustomButton>
            </Dropdown>
          </div>
        </div>
      ) : (
        ''
      )}
      {role.permissions ? (
        <div className="flex flex-col justify-between py-2">
          <RoleTitle>Offices</RoleTitle>
          <div className="flex flex-row flex-wrap gap-2 py-2">
            {categorizePermissions(
              role.permissions,
              'office' || 'offices'
            )?.map((permission: any) => (
              <div
                key={permission}
                className="flex h-6 items-center rounded-md border border-custom-gray_400 p-1"
              >
                <Title>{permission}</Title>
                {/* <button
                  onClick={() => handleCancelPermission(permission, 'offices')}
                >
                  <CloseCircle size="18" />
                </button> */}
              </div>
            ))}
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <Dropdown
                className="overflow-scroll"
                overlay={
                  <Menu
                    onClick={({ key }) =>
                      handleAddPermission(key.toString(), 'parastatals', role)
                    }
                  >
                    {options.map((option) => (
                      <Menu.Item key={option}>{option}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <CustomButton
                  type="primary"
                  size="middle"
                  className="flex !h-6 flex-row gap-1 !rounded-md !border !border-custom-gray_400 bg-custom-white_100"
                >
                  <Title>Add</Title> <ArrowDown />
                </CustomButton>
              </Dropdown>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {role.permissions ? (
        <div className="flex flex-col justify-between">
          <RoleTitle>Department</RoleTitle>
          <div className="flex flex-row flex-wrap gap-2 py-2">
            {categorizePermissions(
              role.permissions,
              'department' || 'departments'
            )?.map((permission: any) => (
              <div
                key={permission}
                className="flex h-6 items-center rounded-md border border-custom-gray_400 px-1"
              >
                <Title>{permission}</Title>
                <button
                  onClick={() =>
                    handleCancelPermission(permission, 'departments')
                  }
                >
                  <CloseCircle size="18" />
                </button>
              </div>
            ))}
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) =>
                    handleAddPermission(key.toString(), 'parastatals', role)
                  }
                >
                  {options.map((option) => (
                    <Menu.Item key={option}>{option}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <CustomButton
                type="primary"
                // size="small"
                className="flex !h-6 flex-row gap-1 !rounded-md !border !border-custom-gray_400  bg-custom-white_100"
              >
                <Title>Add</Title> <ArrowDown />
              </CustomButton>
            </Dropdown>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Permissions;
