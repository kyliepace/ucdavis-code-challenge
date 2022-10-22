export const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        getOne: jest.fn(),
      })),
    })),
    leftJoinAndSelect: jest.fn(() => ({
      where: jest.fn(() => ({
        getMany: jest.fn(),
      })),
    })),
  })),
}));
