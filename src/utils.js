export const appedUrlParams = (url, params) => {
  if(!url || !params) return;
  url = new URL(url);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
}

export const isMobileView = () => window.innerWidth < 768;

export const scrollToTop = () => window.scrollTo(0, 0);
