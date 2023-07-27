const addCustomertoLoyalty = `
  INSERT INTO accountLoyaltyTier (accountId) VALUES (?)
`;

module.exports = {
  addCustomertoLoyalty,
};
