export const appData = [
  {
    "id": 0,
    "slug": "home",
    "head": {
      "titel": "Nwp-Studio",
      "sub": "Application Home",
      "bg": "https://nwp-cgn.de/img/poser/imgA01.png",
      "uri": "img/compass.png"
    },
    "link": {
      "path": "/",
      "name": "Start",
      "icon": "home"
    }
  },
  {
    "id": 1,
    "slug": "start",
    "head": {
      "titel": "Nwp-Studio",
      "sub": "Application Start Page",
      "bg": "https://nwp-cgn.de/img/poser/imgA02.png",
      "uri": "img/device-computer.png"
    },
    "link": {
      "path": "/application",
      "name": "Start",
      "icon": "home"
    }
  },
  {
    "id": 2,
    "slug": "jedit",
    "head": {
      "titel": "Nwp-Components",
      "sub": "Svelte WindiCss",
      "bg": "https://nwp-cgn.de/img/poser/imgA06.png"
    },
    "link": {
      "path": "/jedit",
      "name": "Jedit",
      "icon": "pen"
    }
  },
  {
    "id": 3,
    "slug": "classic",
    "head": {
      "titel": "Blackburn-Studio",
      "sub": "Classic BB- Sessions",
      "bg": "https://nwp-cgn.de/img/poser/imgA08.png"
    },
    "link": {
      "path": "/bb",
      "name": "Classic",
      "icon": "film"
    }
  },
  {
    "id": 4,
    "slug": "user",
    "head": {
      "titel": "Nwp-User",
      "sub": "User-Profil",
      "bg": "https://nwp-cgn.de/img/poser/imgA03.png",
      "link": "<a class=\"inline-block py-4 px-8 text-xs text-blue-600 hover:text-white font-semibold leading-none bg-white hover:bg-blue-600 border hover:border-white rounded transition duration-300\" href=\"/\">Start</a>"
    },
    "link": {
      "path": "/user",
      "name": "User",
      "icon": "user"
    }
  }
];  
export const navData = appData.map((x) => x.head);
export const pageData = appData.map((x) => x.head);

export default appData;

