export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--card-outside-color":"#f8f9fa",
    "--heading":"#212930",
    "--badge-color":"#212930",
    "--repourl":"#17a2b8",
    
    "--background-card":"#dfe2e4" ,
    "--card-body-h3":"#000000",
    "--spand":"#306EC5",
    "--background-light": "#FFFFFF",
    "--color-scheme":"['#ff3333','#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']",
    "--stroke-color":"#e4e4e4",
    "--weatherDiv-color":"#ffffff",
    "--normalcolors":"#000000",
    "--chartfiller":"#0000000",
    "--fillpath":"000000",
    "--radii":"0px",
    "--width":"3px"
    
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--card-outside-color":"#636889",
    "--heading":"#E4D9FF",
    "--badge-color":"#E4D9FF",
    "--background-default": "#797C80",
    "--background-card":"#636889",
    "--background-light":"#2a2a2a",
    "--card-body-h3":"#f3f9f1",
    "--repourl":"#add8e6",
    "--spand":"#C0C0C0",
    "--color-scheme":"['#0000ff','#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']",
    "--stroke-color":"#262b38ad",
    "--weatherDiv-color":"#1b1b1b",
    "--normalcolors":"#ffffff",
    "--chartfiller":"#ffffff",
    "--fillpath":"#ffffff",
    "--radii":"0x",
    "--width":"30px",
    
  }
};
