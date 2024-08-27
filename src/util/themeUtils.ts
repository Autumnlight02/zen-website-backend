
export interface ZenTheme {
    name: string
    description: string
    image: string
    downloadUrl: string
    id: string
    homepage?: string
    readme: string
    preferences?: string
    isColorTheme: boolean
    author: string
    version: string
  }

const THEME_API = "https://zen-browser.github.io/theme-store/themes.json";

export async function getAllThemes() {
    // Fetch from the API
    const response = await fetch(THEME_API)
    const themes = await response.json() as {[id:string]:ZenTheme}
    // transform in to a ZenTheme[] as it is currently an object
    let themesArray: ZenTheme[] = [];
    for (let key in themes) {
      themesArray.push(themes[key]);
    }
    return themesArray;
  }

  export async function getThemeFromId(id: string) {
    return (await getAllThemes()).find((theme) => theme.id === id);
  }
  
  export async function getThemeMarkdown(theme: ZenTheme) {
    return (await fetch(theme.readme)).text();
  }
  
  export function getThemeAuthorLink(theme: ZenTheme): string {
    return `https://github.com/${theme.author}`;
  }
  