export const buildLinksFromLocation = (location: string) => {
  let to = '';

  const paths = location.split('/');

  return paths.reduce((accum, el, index) => {
    let name = '';

    if (el !== '') {
      to += `/${el}`;
      name = el;
    } else {
      name = 'home';
    }

    if (index !== paths.length - 1) {
      accum.push({ name, to });
    }

    return accum;
  }, [] as { name: string; to: string }[]);
};
