const addCustomertoLoyalty = `
  INSERT INTO accountLoyaltyTier (accountId) VALUES (?)
`;

const checkLoyaltyStatus = `
  SELECT * from accountLoyaltyTier 
  WHERE accountId = ?
`;

const updatePoints = `
  UPDATE accountLoyaltyTier
  SET points = ?
  WHERE accountId = ?
`;

const getTotalPoints = `
  SELECT points, tierId FROM accountLoyaltyTier
  WHERE accountId = ?
`;

const getNextTierPoints = `
  SELECT t.pointsThreshold FROM tiers t 
  JOIN accountloyaltytier a ON t.id = a.tierid
  WHERE a.accountid = ?;
`;

const updateTier = `
  UPDATE accountLoyaltyTier
  SET tierId = ?
  WHERE accountId = ?
`;

const findMaxTierUpgrade = `
  SELECT id, pointsThreshold FROM tiers 
  WHERE pointsThreshold <= ?
  ORDER BY pointsThreshold DESC
  LIMIT 1;
`;

module.exports = {
  addCustomertoLoyalty,
  checkLoyaltyStatus,
  updatePoints,
  getTotalPoints,
  getNextTierPoints,
  updateTier,
  findMaxTierUpgrade,
};
