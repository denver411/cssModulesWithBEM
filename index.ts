type modifiers = { [key: string]: string | boolean };

export const cssModulesToBem = (block: string, cssModule: { [key: string]: string }) => (element: string | modifiers, modifiers?: modifiers) => {
  let mods: modifiers | undefined;
  let baseClass = block;

  if (element && typeof element === 'object') {
    mods = element;
  }

  if (element && typeof element === 'string') {
    baseClass += `__${element}`;
  }

  if (modifiers) {
    mods = modifiers;
  }

  const withModifiers =
    mods != null
      ? Object.keys(mods).map(modifierType => {
        // @ts-ignore
        const modifierValue = mods[modifierType];

        return typeof modifierValue === 'boolean' ? `${baseClass}_${modifierType}` : `${baseClass}_${modifierType}_${modifierValue}`;
      })
      : [];

  const classes = withModifiers.length > 0 ? withModifiers : [baseClass];

  return classes.map(className => cssModule[className]).join(' ');
};
