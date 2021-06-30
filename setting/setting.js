const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const solarButton = document.getElementById('solar');
const body = document.body;


// Apply the cached theme on reload

const theme = localStorage.getItem('theme');
const isSolar = localStorage.getItem('isSolar');

if (theme) {
  body.classList.add(theme);
  isSolar && body.classList.add('solar');
}

// Button Event 

darkButton.onclick = () => {
  body.classList.replace('light', 'dark');
  localStorage.setItem('theme', 'dark');
};

lightButton.onclick = () => {
  body.classList.replace('dark', 'light');

  localStorage.setItem('theme', 'light');
};

// settings
const dropwaraper_btn = document.querySelector("dropdown-waraper");
const setting_show = document.queryselector("setting-show");
const menu_warppppper = document.querySelector("wrapper-setting");
const setting_menu_bar = document.querySelector("setting-menu-bar");

dropwaraper_btn.onclick = (()=>{
  menu_warppppper.classList.toggle("show");
  setting_show.classList.toggle("show");
});
setting_item.onclick = (()=>{
  setting_menu_bar.style.marginLeft = "-400px";
  setTimeout(()=>{
    drop_down_wrap.style.display = "block";
  }, 100);
});
setting_btn.onclick = (()=>{
  menu_bar.style.marginLeft = "0px";
  setting_drop.style.display = "none";
});

















