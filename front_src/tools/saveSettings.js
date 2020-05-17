function saveSettings({notifications}){
    localStorage.setItem('settings',JSON.stringify({notifications}));
}