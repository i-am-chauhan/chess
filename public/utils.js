const hideOverlay = function(id) {
  const element = getElementById(id);
  element.style.visibility = "hidden";
};

const closeOverlay = function(id) {
  const element = getElementById(id);
  element.style.display = "none";
};

const openOverlay = function(id, displayType = "block") {
  const element = getElementById(id);
  element.style.display = displayType;
};

const showOverlay = function(id) {
  const element = getElementById(id);
  element.style.visibility = "visible";
};

const parseCookie = function() {
    const cookie = document.cookie;
    const keyValuePairs = cookie.split("; ");
    const parsedCookie = {};
    keyValuePairs.forEach(keyValue => {
      const [key, value] = keyValue.split("=");
      parsedCookie[decodeURI(key)] = decodeURI(value);
    });
    return parsedCookie;
  };