const addCustomertoLoyalty = `
  INSERT INTO accountLoyaltyTier (accountId) VALUES (?)
`;

const checkLoyaltyStatus = `
  SELECT * FROM accountLoyaltyTier AS a 
  JOIN tiers t ON a.tierId = t.id
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
  updateTier,
  findMaxTierUpgrade,
};
