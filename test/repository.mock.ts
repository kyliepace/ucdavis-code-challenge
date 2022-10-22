export const repositoryMockFactory = jest.fn().mockImplementation(() => ({
  findOne: jest.fn((entity) => entity),
  createQueryBuilder: jest.fn().mockImplementation(() => ({
    where,
    leftJoinAndSelect: jest.fn(() => ({
      where,
    })),
  })),
}));

const where = jest.fn(() => ({
  orderBy: jest.fn(() => ({
    getOne: jest.fn().mockResolvedValue({}),
  })),
  getMany: jest.fn().mockResolvedValue([]),
}));
