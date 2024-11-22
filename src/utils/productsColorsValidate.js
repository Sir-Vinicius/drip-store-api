const validateHexColors = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('O campo backgrounds e colors deve ser um array de cores hexadecimais');
  }

  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
  const invalidColors = value.filter(color => {
    if (typeof color !== 'string') {
      return true;
    }
    return !hexColorRegex.test(color);
  });

  if (invalidColors.length > 0) {
    throw new Error(
      `Cores hexadecimais inválidas encontradas: ${invalidColors.join(', ')}. ` +
      'As cores devem estar no formato #RGB ou #RRGGBB'
    );
  }

  return true;
};

module.exports = {
  validateHexColors

}