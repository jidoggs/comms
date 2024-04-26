function getRandomPermissions() {
  const options = [
    'Can create',
    'Can edit',
    'Can delete',
    'Can add users',
    'Can edit user details',
    'Can disable users',
    'Can remove users',
  ];

  const numPermissions = Math.floor(Math.random() * options.length) + 1;
  const randomPermissions = [];

  for (let i = 0; i < numPermissions; i++) {
    const randomIndex = Math.floor(Math.random() * options.length);
    randomPermissions.push(options[randomIndex]);
  }

  return randomPermissions;
}

export const roles = [
  {
    id: 1,
    name: 'Main Administrator',
    role: '',
    permissions: {
      parastatals: {
        view: false,
      },
      offices: {
        view: true,
        officeData: getRandomPermissions(),
      },
      departments: {
        view: true,
        departmentData: getRandomPermissions(),
      },
    },
  },
  {
    id: 2,
    name: 'Super Administrator',
    role: '',
    permissions: {
      parastatals: {
        view: true,
        parastatalData: getRandomPermissions(),
      },
      offices: {
        view: true,
        officeData: getRandomPermissions(),
      },
      departments: {
        view: true,
        departmentData: getRandomPermissions(),
      },
    },
  },
];
